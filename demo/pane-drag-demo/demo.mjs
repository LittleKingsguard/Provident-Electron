// src/renderer/store-graph-references.ts
function storeGraphReferences(rows) {
  return { rows };
}

// src/renderer/store-core-graph.ts
var TIER_TOKENS = ["temp", "mem", "file", "secure"];
var NODE_FLAGS = ["temp", "mem", "file"];
var STEP_IDS = [
  "A-PARSE",
  "B-SECURE-GATE",
  "C-TOP",
  "D-ANCHOR",
  "E-LINK",
  "F-CACHE",
  "G-RESOLVE-LEAF",
  "H-FLAG"
];
var EVENT_CAUSES = [
  "set",
  "commit",
  "clear",
  "sweep",
  "remove",
  "repair",
  "descendant",
  "severed"
];
var DURABILITY_RANK = { file: 3, mem: 2, temp: 1 };
var REGISTER_ROOT_CAP_MEM = 1024;
var REGISTER_ROOT_CAP_TEMP = 4096;
var AMPLIFIER_SUBSCRIPTION_CAP = 64;
var SEAM_KEYS = [
  "reset",
  "seed",
  "parentLinkCountOf",
  "cacheEntryFor",
  "nodeFor",
  "anchorFor",
  "linkFor",
  "failNextCacheRebuild"
];
function isTierToken(value) {
  return typeof value === "string" && TIER_TOKENS.includes(value);
}
function isFlagToken(value) {
  return typeof value === "string" && NODE_FLAGS.includes(value);
}
function isRecordObject(value) {
  return typeof value === "object" && value !== null;
}
function parseName(raw) {
  if (typeof raw !== "string" || raw.length === 0) return { token: null, segments: [] };
  const segments = raw.split(".");
  for (const segment of segments) if (segment.length === 0) return { token: null, segments: [] };
  return { token: isTierToken(segments[0]) ? segments[0] : null, segments };
}
function miss(name) {
  return { found: false, value: void 0, tier: null, cache: null, name };
}
function snapshotValue(value) {
  const seen = /* @__PURE__ */ new Map();
  const copy = (candidate) => {
    if (candidate === null || typeof candidate !== "object") return candidate;
    const already = seen.get(candidate);
    if (already !== void 0) return already;
    if (Array.isArray(candidate)) {
      const out2 = [];
      seen.set(candidate, out2);
      for (const item of candidate) out2.push(copy(item));
      return out2;
    }
    const out = /* @__PURE__ */ Object.create(null);
    seen.set(candidate, out);
    for (const key of Object.keys(candidate)) {
      out[key] = copy(candidate[key]);
    }
    return out;
  };
  return copy(value);
}
function serializationFailureOf(value) {
  const seen = /* @__PURE__ */ new Set();
  const inspect = (candidate) => {
    if (candidate === void 0 || candidate === null) return null;
    const kind = typeof candidate;
    if (kind === "string" || kind === "boolean") return null;
    if (kind === "number") return Number.isFinite(candidate) ? null : "serialize-failed";
    if (kind === "bigint" || kind === "function" || kind === "symbol") return "serialize-failed";
    if (seen.has(candidate)) return "serialize-failed";
    seen.add(candidate);
    try {
      if (Array.isArray(candidate)) {
        for (const item of candidate) {
          const failure = inspect(item);
          if (failure !== null) return failure;
        }
        return null;
      }
      for (const key of Object.keys(candidate)) {
        const failure = inspect(candidate[key]);
        if (failure !== null) return failure;
      }
    } catch {
      return "validate-failed";
    } finally {
      seen.delete(candidate);
    }
    return null;
  };
  return inspect(value);
}
function createGraphStoreError(message, reason) {
  const error = new Error(message);
  error.name = "GraphLoadError";
  error.reason = reason;
  return error;
}
function createGraphStore(options = {}) {
  const nodes = /* @__PURE__ */ new Map();
  const declared = /* @__PURE__ */ new Map();
  const rootHolders = /* @__PURE__ */ new Map();
  const registerEntries = /* @__PURE__ */ new Map();
  const staleEntries = /* @__PURE__ */ new Set();
  const values = [];
  const severLog = /* @__PURE__ */ new Map();
  const handles = /* @__PURE__ */ new Map();
  let subscriptions = [];
  let refCounter = 0;
  let injectArmed = false;
  const seamEnabled = options.enableTestSeam === true;
  const crossing = options.crossing ?? null;
  const declaredInput = options.declarations === void 0 ? { rows: [] } : options.declarations;
  const declaredRows = isRecordObject(declaredInput) && Array.isArray(declaredInput.rows) ? declaredInput.rows : [];
  const reservedNames = Array.isArray(options.reservedNamespaces) ? options.reservedNamespaces : [];
  const constraints = Array.isArray(options.constraints) ? options.constraints : [];
  function loadDeclarations() {
    const seen = /* @__PURE__ */ new Set();
    for (const raw of declaredRows) {
      if (!isRecordObject(raw)) throw createGraphStoreError("a declared row is a record", "malformed-name");
      const name = raw.name;
      if (typeof name !== "string" || name.length === 0) {
        throw createGraphStoreError("a declared row carries no name, a non-string or an empty name", "malformed-name");
      }
      const segments = name.split(".");
      for (const segment of segments) {
        if (segment.length === 0) throw createGraphStoreError("a declared name carries an empty segment", "malformed-name");
      }
      if (segments[0] === "secure") {
        throw createGraphStoreError("a declared name carries the secure first segment", "secure-refused");
      }
      const qualified = isTierToken(segments[0]) && segments.length >= 2;
      const root2 = qualified ? segments[1] : segments[0];
      if (root2.includes("*") || root2.includes("?")) {
        throw createGraphStoreError("a malformed or ambiguous top-level pattern", "malformed-pattern");
      }
      for (const reserved of reservedNames) {
        if (typeof reserved === "string" && reserved === root2) {
          throw createGraphStoreError("a declared name collides with a reserved namespace key", "reserved-namespace");
        }
      }
      if (seen.has(name)) throw createGraphStoreError("a top-level name declared twice", "undeclared-name");
      seen.add(name);
      const prior = declared.get(root2);
      const spelling = { name, reserved: raw.reserved === true };
      declared.set(root2, {
        root: root2,
        names: prior === void 0 ? [spelling] : [...prior.names, spelling]
      });
    }
  }
  function holdersOf(rootName) {
    const held = rootHolders.get(rootName);
    if (held === void 0) return [];
    return held.filter((holder) => holder.parentLink === null);
  }
  function liveHolders(rootName) {
    return rootHolders.get(rootName)?.filter((holder) => holder.parentLink === null && nodes.get(holder.ref) !== void 0) ?? [];
  }
  function holderOf(rootName, token) {
    const held = liveHolders(rootName);
    if (held.length === 0) return null;
    const sorted = [...held].sort((a, b) => (DURABILITY_RANK[b.flag] ?? 0) - (DURABILITY_RANK[a.flag] ?? 0));
    if (token !== null && token !== "secure") {
      for (const node of sorted) if (node.flag === token) return node;
      return null;
    }
    return sorted[0];
  }
  function holders() {
    const out = [];
    for (const rootName of rootHolders.keys()) for (const holder of liveHolders(rootName)) out.push(holder);
    return out;
  }
  function setHolder(rootName, node) {
    const held = holdersOf(rootName);
    const next = [];
    for (const existing of held) if (existing.ref !== node.ref) next.push(existing);
    next.push(node);
    rootHolders.set(rootName, next);
  }
  function dropHolder(rootName, ref) {
    const held = holdersOf(rootName);
    rootHolders.set(rootName, held.filter((node) => node.ref !== ref));
  }
  function registerRows() {
    const rows = [];
    for (const declaration of declared.values()) {
      const holder = holderOf(declaration.root, null);
      if (holder === null) continue;
      rows.push({ name: declaration.root, nodeRef: holder.ref, constraintId: null, reserved: declaration.names.some((spelling) => spelling.reserved), derived: true });
    }
    return rows;
  }
  function entryIsLive(entry) {
    const matched = nodes.get(entry.matchedRef);
    if (matched === void 0) return false;
    if (matched.flag !== entry.matchedTier) return false;
    for (const holder of liveHolders(entry.name)) if (holder.ref === entry.matchedRef) return true;
    return false;
  }
  function rebuildEntriesAtInvalidation(name) {
    const node = holderOf(name, null);
    if (node === null) {
      registerEntries.delete(name);
      staleEntries.delete(name);
      return;
    }
    const entry = { name, matchedRef: node.ref, matchedTier: node.flag };
    if (injectArmed) {
      injectArmed = false;
      staleEntries.add(name);
      if (!registerEntries.has(name)) registerEntries.set(name, entry);
      return;
    }
    registerEntries.set(name, entry);
    staleEntries.delete(name);
  }
  function mintRef() {
    refCounter += 1;
    return `graph-node-${refCounter}`;
  }
  function linkEntry(name, matchedRef, matchedTier) {
    return { name, matchedRef, matchedTier };
  }
  function anchorOf(ownerRef, key) {
    const owner = nodes.get(ownerRef);
    if (owner === void 0) return null;
    for (const anchor of owner.anchors) if (anchor.key === key) return anchor;
    return null;
  }
  function withAnchor(ownerRef, key, link) {
    const owner = nodes.get(ownerRef);
    if (owner === void 0) return;
    const kept = [];
    for (const anchor of owner.anchors) if (anchor.key !== key) kept.push(anchor);
    nodes.set(ownerRef, {
      ref: owner.ref,
      flag: owner.flag,
      localName: owner.localName,
      anchors: [...kept, { owner: ownerRef, key, link }],
      parentLink: owner.parentLink
    });
  }
  function valueOf(ref) {
    for (const entry of values) if (entry.ref === ref) return entry.value;
    return void 0;
  }
  function hasValueEntry(ref) {
    for (const entry of values) if (entry.ref === ref) return true;
    return false;
  }
  function setValue(ref, name, value) {
    for (const entry of values) {
      if (entry.ref === ref) {
        entry.value = value;
        return;
      }
    }
    values.push({ name, ref, value, active: false });
  }
  function dropValue(ref) {
    for (let i = values.length - 1; i >= 0; i -= 1) if (values[i]?.ref === ref) values.splice(i, 1);
  }
  function descendantsOf(node) {
    const out = [];
    for (const anchor of node.anchors) {
      if (anchor.link === null || anchor.link.to === null) continue;
      const child = nodes.get(anchor.link.to);
      if (child !== void 0) out.push(child);
    }
    return out;
  }
  function detach(ref) {
    const node = nodes.get(ref);
    if (node === void 0) return;
    dropValue(ref);
    if (node.parentLink === null) {
      for (const rootName of rootHolders.keys()) dropHolder(rootName, ref);
      return;
    }
    const parent = nodes.get(node.parentLink.from);
    if (parent !== void 0) {
      const kept = [];
      for (const anchor of parent.anchors) {
        if (anchor.link === null || anchor.link.to !== ref) kept.push(anchor);
      }
      nodes.set(parent.ref, {
        ref: parent.ref,
        flag: parent.flag,
        localName: parent.localName,
        anchors: kept,
        parentLink: parent.parentLink
      });
    }
  }
  function dropSubtree(ref) {
    const node = nodes.get(ref);
    nodes.delete(ref);
    dropValue(ref);
    if (node === void 0) return;
    for (const anchor of node.anchors) {
      if (anchor.link !== null && anchor.link.to !== null) dropSubtree(anchor.link.to);
    }
  }
  function subtreeOf(ref) {
    const node = nodes.get(ref);
    if (node === void 0) return [];
    const out = [node];
    for (const anchor of node.anchors) {
      if (anchor.link !== null && anchor.link.to !== null) out.push(...subtreeOf(anchor.link.to));
    }
    return out;
  }
  function climbToBound(node, requested) {
    void requested;
    let current = node;
    for (; ; ) {
      if (isRootRef(current.ref)) break;
      const parent = parentOf(current);
      if (parent === null) break;
      current = parent;
    }
    return current;
  }
  function isRootRef(ref) {
    for (const rootName of rootHolders.keys()) {
      for (const holder of liveHolders(rootName)) if (holder.ref === ref) return true;
    }
    return false;
  }
  function parentOf(node) {
    if (node.parentLink === null) return null;
    return nodes.get(node.parentLink.from) ?? null;
  }
  function parentPathOf(rootName, tail, ref) {
    if (tail.length <= 1) return null;
    const walked = anchorWalk(rootName, [rootName, ...tail.slice(0, tail.length - 1)], null, false);
    if (walked.deepest === null) return null;
    if (walked.deepest.ref === ref) return null;
    return walked.deepest;
  }
  function rootParts(segments) {
    const first = segments[0] ?? "";
    if (isTierToken(first) && first !== "secure") {
      const tail = segments.slice(1);
      const top = tail.length > 0 ? tail[0] : first;
      return { qualified: true, rootName: top, tail: tail.length > 0 ? tail : [first], token: first };
    }
    return { qualified: false, rootName: first, tail: segments.slice(0, 1), token: null };
  }
  function anchorWalk(rootName, tail, token, autoMint, value, pin = null) {
    if (pin !== null) {
      const pinned = nodes.get(pin);
      if (pinned === void 0) return { deepest: null, node: null, target: null, severed: false, firstMissing: tail[tail.length - 1] ?? null, tierOnly: false };
      const pinnedWalk = walkFrom(rootName, pinned, tail, autoMint, value);
      return { ...pinnedWalk, node: pinnedWalk.node, target: pinnedWalk.node, tierOnly: false };
    }
    const held = liveHolders(rootName);
    const wanted = token === null ? null : DURABILITY_RANK[token] ?? 0;
    const sorted = [...held].sort((a, b) => (DURABILITY_RANK[b.flag] ?? 0) - (DURABILITY_RANK[a.flag] ?? 0));
    if (autoMint) {
      let exact = null;
      for (const candidate of sorted) {
        if (token !== null && candidate.flag === token) {
          exact = candidate;
          break;
        }
      }
      const start = exact ?? sorted[0];
      if (start === void 0) return { deepest: null, node: null, target: null, severed: false, firstMissing: tail[tail.length - 1] ?? null, tierOnly: false };
      const mintedWalk = walkFrom(rootName, start, tail, true, value);
      return { ...mintedWalk, target: mintedWalk.node, tierOnly: false };
    }
    const eligible = sorted.filter((candidate) => wanted === null || (DURABILITY_RANK[candidate.flag] ?? 0) >= wanted);
    const candidates = eligible.length > 0 ? eligible : sorted;
    let first = null;
    let matchedName = false;
    for (let index = 0; index < candidates.length; index += 1) {
      const attempt = walkFrom(rootName, candidates[index], tail, false, value);
      if (first === null) first = attempt;
      if (token === null || attempt.node === null) return { ...attempt, target: attempt.node, tierOnly: false };
      if (attempt.node.flag === token) return { ...attempt, target: attempt.node, tierOnly: false };
      matchedName = true;
    }
    if (first === null) return { deepest: null, node: null, target: null, severed: false, firstMissing: tail[tail.length - 1] ?? null, tierOnly: false };
    return { ...first, target: null, tierOnly: matchedName };
  }
  function walkFrom(rootName, start, tail, autoMint, value) {
    let current = start;
    for (let index = tail[0] === start.localName ? 1 : 0; index < tail.length; index += 1) {
      const segment = tail[index];
      const last = index === tail.length - 1;
      const anchor = anchorOf(current.ref, segment);
      if (anchor !== null && anchor.link !== null && anchor.link.to !== null) {
        const child = nodes.get(anchor.link.to);
        if (child !== void 0) {
          current = child;
          if (last) return { deepest: current, node: current, severed: false, firstMissing: null };
          continue;
        }
      }
      if (anchor !== null && anchor.link !== null && anchor.link.to === null) {
        return { deepest: current, node: null, severed: true, firstMissing: segment };
      }
      if (!autoMint) return { deepest: current, node: null, severed: false, firstMissing: segment };
      current = makeChild(current, segment, start.flag, rootName, value, last);
      if (last) return { deepest: current, node: current, severed: false, firstMissing: null };
    }
    if (autoMint) setValue(current.ref, current.localName, value);
    return { deepest: current, node: current, severed: false, firstMissing: null };
  }
  function makeChild(parent, segment, flag, rootName, value, written) {
    const ref = mintRef();
    const link = { from: parent.ref, to: ref, cache: linkEntry(rootName, ref, flag), constraint: null };
    const child = { ref, flag, localName: segment, anchors: [], parentLink: link };
    nodes.set(ref, child);
    withAnchor(parent.ref, segment, link);
    if (written) setValue(ref, segment, value);
    return child;
  }
  function resolvePath(raw) {
    const parsed = parseName(raw);
    if (parsed.segments.length === 0) return null;
    const { rootName, tail } = rootParts(parsed.segments);
    if (!declared.has(rootName) && liveHolders(rootName).length === 0) return null;
    const token = parsed.token;
    const walked = anchorWalk(rootName, tail, token, false);
    let stale = false;
    if (walked.node !== null) {
      const entry = registerEntries.get(rootName);
      stale = entry !== void 0 && staleEntries.has(rootName) && !entryIsLive(entry);
    }
    return { rootName, token: token ?? "temp", tail, node: walked.node, deepest: walked.deepest, severed: walked.severed, firstMissing: walked.firstMissing, stale };
  }
  function deepestExisting(raw) {
    const parsed = parseName(raw);
    if (parsed.segments.length === 0) return null;
    const { rootName, tail } = rootParts(parsed.segments);
    return anchorWalk(rootName, tail, parsed.token, false).deepest;
  }
  function refusalOf(reason, step, segment, owner, name) {
    return {
      status: "refused",
      reason,
      step,
      segment,
      owner,
      diagnostic: { reason, step, segment, owner },
      name
    };
  }
  function walkName(raw) {
    const parsed = parseName(raw);
    if (parsed.segments.length === 0) {
      return { answer: refusalOf("malformed-name", "A-PARSE", null, null, typeof raw === "string" ? raw : ""), leaf: null, rootName: "", tail: [], token: null };
    }
    if (parsed.segments[0] === "secure") {
      return { answer: refusalOf("secure-refused", "B-SECURE-GATE", null, null, raw), leaf: null, rootName: "", tail: [], token: null };
    }
    const name = raw;
    const tiered = isTierToken(parsed.segments[0]) && parsed.segments[0] !== "secure";
    if (tiered && parsed.segments.length < 2) {
      return { answer: refusalOf("malformed-name", "A-PARSE", null, null, name), leaf: null, rootName: "", tail: [], token: null };
    }
    const { rootName, tail } = rootParts(parsed.segments);
    if (!declared.has(rootName) && liveHolders(rootName).length === 0) {
      if (tiered) {
        return { answer: refusalOf("undeclared-name", "C-TOP", parsed.segments[1], null, name), leaf: null, rootName: "", tail: [], token: null };
      }
      return { answer: refusalOf("malformed-name", "A-PARSE", null, null, name), leaf: null, rootName: "", tail: [], token: null };
    }
    if (holdersOf(rootName).length === 0) return { answer: miss(name), leaf: null, rootName, tail, token: parsed.token };
    const walked = anchorWalk(rootName, tail, parsed.token, false);
    if (walked.deepest === null) return { answer: miss(name), leaf: null, rootName, tail, token: parsed.token };
    const segment = walked.firstMissing ?? tail[tail.length - 1];
    if (walked.severed) {
      return { answer: refusalOf("severed-link", "E-LINK", segment, walked.deepest.ref, name), leaf: null, rootName, tail, token: parsed.token };
    }
    if (walked.node === null) {
      if (tail.length === 1 && tail[0] === rootName) return { answer: miss(name), leaf: null, rootName, tail, token: parsed.token };
      return { answer: refusalOf("no-such-anchor", "D-ANCHOR", segment, walked.deepest.ref, name), leaf: null, rootName, tail, token: parsed.token };
    }
    const leaf = walked.node;
    if (!hasValueEntry(leaf.ref)) {
      return { answer: miss(name), leaf: null, rootName, tail, token: parsed.token };
    }
    if (parsed.token !== null && parsed.token !== "secure" && leaf.flag !== parsed.token) {
      const record = refusalOf("tier-filter-miss", "H-FLAG", segment, leaf.ref, name);
      return { answer: { ...record, flag: leaf.flag, requested: parsed.token }, leaf: null, rootName, tail, token: parsed.token };
    }
    const entry = registerEntries.get(rootName);
    if (entry !== void 0 && staleEntries.has(rootName) && !entryIsLive(entry)) {
      return { answer: refusalOf("rebuild-failed", "F-CACHE", segment, leaf.ref, name), leaf: null, rootName, tail, token: parsed.token };
    }
    return {
      answer: { found: true, value: valueOf(leaf.ref), tier: leaf.flag, flag: leaf.flag, cache: tierHandleFor(leaf.flag), name },
      leaf,
      rootName,
      tail,
      token: parsed.token
    };
  }
  function resolveRead(raw) {
    return walkName(raw).answer;
  }
  function deliver(subscriber, event) {
    try {
      subscriber.listener(event);
    } catch {
    }
  }
  function emit(name, flag, value, cleared, cause, origin) {
    if (!EVENT_CAUSES.includes(cause)) return 0;
    const exact = [];
    const ancestors = [];
    for (const subscriber of subscriptions) {
      if (!subscriber.live) continue;
      if (subscriber.name === name) exact.push(subscriber);
      else if (subscriber.subtree && origin !== void 0 && origin.startsWith(`${subscriber.name}.`)) ancestors.push(subscriber);
    }
    for (const subscriber of exact) deliver(subscriber, { name, flag, value, cleared, cause });
    for (const ancestor of ancestors) {
      deliver(ancestor, { name: ancestor.name, flag, value: void 0, cleared: [], cause: "descendant", origin, subtree: true });
    }
    return 1;
  }
  function receiptFor(name, state, status, reason) {
    const out = {
      status,
      name: typeof name === "string" ? name : "",
      cleared: state.cleared,
      repaired: state.repaired,
      rows: state.rows,
      crossings: state.crossings,
      events: state.events
    };
    if (reason !== void 0) out["reason"] = reason;
    if (state.diagnostic !== void 0) out["diagnostic"] = state.diagnostic;
    return out;
  }
  function refuse(name, reason, step, segment, owner) {
    return receiptFor(name, {
      cleared: [],
      repaired: [],
      rows: [],
      crossings: 0,
      events: 0,
      diagnostic: { reason, step, segment, owner }
    }, "refused", reason);
  }
  function crossingPut(name) {
    if (crossing === null) return;
    try {
      crossing.put({ name, value: stableGraphTranslation() });
    } catch {
    }
  }
  function stableGraphTranslation() {
    const entries = [];
    const seen = /* @__PURE__ */ new Set();
    const visit = (node, path) => {
      const reference = `${node.flag}.${path}`;
      if (!seen.has(reference)) {
        seen.add(reference);
        const value = valueOf(node.ref);
        if (value !== void 0) entries.push([reference, stableJsonValue(value, /* @__PURE__ */ new Set(), 0)]);
      }
      for (const anchor of node.anchors) {
        if (anchor.link === null || anchor.link.to === null) continue;
        const child = nodes.get(anchor.link.to);
        if (child === void 0) continue;
        visit(child, `${path}.${anchor.key}`);
      }
    };
    for (const rootName of rootHolders.keys()) {
      for (const holder of liveHolders(rootName)) visit(holder, holder.localName);
    }
    entries.sort((a, b) => a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0);
    const out = /* @__PURE__ */ Object.create(null);
    for (const entry of entries) out[entry[0]] = entry[1];
    return JSON.stringify(out);
  }
  function stableJsonValue(value, seen, depth) {
    if (value === null) return null;
    const kind = typeof value;
    if (kind === "string" || kind === "boolean") return value;
    if (kind === "number") {
      if (Object.is(value, -0)) return "-0";
      if (Number.isNaN(value)) return "NaN";
      return Number.isFinite(value) ? value : String(value);
    }
    if (kind === "undefined") return void 0;
    if (kind === "bigint" || kind === "symbol" || kind === "function") return String(value);
    if (depth > 8 || seen.has(value)) return "<circular>";
    seen.add(value);
    if (Array.isArray(value)) {
      const out2 = value.map((item) => stableJsonValue(item, seen, depth + 1));
      seen.delete(value);
      return out2;
    }
    const out = /* @__PURE__ */ Object.create(null);
    for (const key of Object.keys(value).sort()) {
      const rendered = stableJsonValue(value[key], seen, depth + 1);
      if (rendered !== void 0) out[key] = rendered;
    }
    seen.delete(value);
    return out;
  }
  function rootNodeAt(token, rootName) {
    const holder = holderOf(rootName, token) ?? holderOf(rootName, null);
    if (holder === null) return null;
    return nodes.get(holder.ref) ?? holder;
  }
  function leafRecordFor(root2) {
    const record = /* @__PURE__ */ Object.create(null);
    if (root2 !== null) {
      for (const anchor of root2.anchors) {
        if (anchor.link === null || anchor.link.to === null) continue;
        const child = nodes.get(anchor.link.to);
        if (child !== void 0) record[anchor.key] = valueOf(child.ref);
      }
    }
    return record;
  }
  function leafNodeAt(root2, key) {
    if (root2 === null) return null;
    const anchor = anchorOf(root2.ref, key);
    if (anchor === null || anchor.link === null || anchor.link.to === null) return null;
    return nodes.get(anchor.link.to) ?? null;
  }
  function nodeAtPath(parsed) {
    return anchorWalk(parsed.rootName, [parsed.rootName, ...parsed.tail.slice(1)], parsed.token, false).node;
  }
  function captureConstraintSlots(op, parsed) {
    const slots = [];
    for (const member of constraints) {
      if (member === null || typeof member !== "object") continue;
      if (!Array.isArray(member.evaluatedOn) || !member.evaluatedOn.includes(op)) continue;
      if (typeof member.matchedSet !== "string" || member.matchedSet !== parsed.rootName) continue;
      if (typeof member.constraint !== "function") continue;
      const isSelf = parsed.tail.length === 1;
      let current;
      if (isSelf) {
        const root2 = holderOf(parsed.rootName, parsed.token);
        current = root2 !== null ? valueOf(root2.ref) : void 0;
      } else {
        current = leafRecordFor(rootNodeAt(parsed.token, parsed.rootName));
      }
      slots.push({ member, isSelf, current });
    }
    return slots;
  }
  function evaluateConstraints(op, parsed, slots) {
    const repairedNames = [];
    const repairEvents = [];
    for (const slot of slots) {
      const member = slot.member;
      const feedback = {};
      let changed;
      let next;
      if (slot.isSelf) {
        const root2 = holderOf(parsed.rootName, parsed.token);
        changed = root2 !== null ? valueOf(root2.ref) : void 0;
        next = changed;
      } else {
        const written = nodeAtPath(parsed);
        changed = written !== null ? valueOf(written.ref) : void 0;
        next = leafRecordFor(rootNodeAt(parsed.token, parsed.rootName));
      }
      if (member.constraint(changed, slot.current, next, feedback) === true) continue;
      if (typeof member.repair !== "function") {
        return {
          refused: true,
          reason: typeof feedback.reason === "string" ? feedback.reason : "validate-failed",
          repairedNames: [],
          repairEvents: []
        };
      }
      if (slot.isSelf) {
        member.repair(next, feedback);
        const root2 = holderOf(parsed.rootName, parsed.token);
        repairedNames.push(parsed.name);
        repairEvents.push({ name: parsed.name, flag: parsed.token, value: root2 !== null ? valueOf(root2.ref) : next, cleared: [], cause: "repair" });
      } else {
        const pre = deepCopyOf(next);
        member.repair(next, feedback);
        const root2 = rootNodeAt(parsed.token, parsed.rootName);
        for (const key of Object.keys(next)) {
          const refName = `${parsed.token}.${parsed.rootName}.${key}`;
          const landed = next[key];
          if (!Object.prototype.hasOwnProperty.call(pre, key)) {
            if (root2 !== null) {
              mintRecordLeaf(root2, parsed.token, key, landed);
              repairedNames.push(refName);
              repairEvents.push({ name: refName, flag: parsed.token, value: landed, cleared: [], cause: "repair" });
            }
          } else if (!deepEqualOf(pre[key], landed)) {
            const leaf = leafNodeAt(root2, key);
            if (leaf !== null) {
              setValue(leaf.ref, leaf.localName, landed);
              repairedNames.push(refName);
              repairEvents.push({ name: refName, flag: parsed.token, value: landed, cleared: [], cause: "repair" });
            }
          }
        }
      }
    }
    return { refused: false, repairedNames, repairEvents };
  }
  function deepCopyOf(value) {
    const seen = /* @__PURE__ */ new Map();
    const copy = (candidate) => {
      if (candidate === null || typeof candidate !== "object") return candidate;
      const already = seen.get(candidate);
      if (already !== void 0) return already;
      if (Array.isArray(candidate)) {
        const out2 = [];
        seen.set(candidate, out2);
        for (const item of candidate) out2.push(copy(item));
        return out2;
      }
      const out = /* @__PURE__ */ Object.create(null);
      seen.set(candidate, out);
      for (const key of Object.keys(candidate)) {
        out[key] = copy(candidate[key]);
      }
      return out;
    };
    return copy(value);
  }
  function deepEqualOf(a, b) {
    if (a === b) return true;
    if (a === null || b === null || typeof a !== "object" || typeof b !== "object") return false;
    if (Array.isArray(a) !== Array.isArray(b)) return false;
    const ka = Object.keys(a);
    const kb = Object.keys(b);
    if (ka.length !== kb.length) return false;
    for (const key of ka) {
      if (!Object.prototype.hasOwnProperty.call(b, key)) return false;
      if (!deepEqualOf(a[key], b[key])) return false;
    }
    return true;
  }
  function mintRecordLeaf(root2, token, key, value) {
    return makeChild(root2, key, token, root2.localName, value, true);
  }
  function journalBefore() {
    return {
      nodes: new Map(nodes),
      values: values.map((entry) => ({ ...entry })),
      rootHolders: new Map([...rootHolders.entries()].map(([name, held]) => [name, [...held]])),
      declared: new Map(declared),
      refCounter
    };
  }
  function revertTo(journal) {
    nodes.clear();
    for (const [ref, node] of journal.nodes) nodes.set(ref, node);
    values.length = 0;
    for (const entry of journal.values) values.push({ ...entry });
    rootHolders.clear();
    for (const [name, held] of journal.rootHolders) rootHolders.set(name, [...held]);
    declared.clear();
    for (const [name, declaration] of journal.declared) declared.set(name, declaration);
    refCounter = journal.refCounter;
  }
  function refusalOfFeedback(name, reason) {
    return receiptFor(name, { cleared: [], repaired: [], rows: [], crossings: 0, events: 0 }, "refused", reason);
  }
  function routingOf(opts) {
    if (opts !== void 0 && opts !== null && !isRecordObject(opts)) return refuse("", "malformed-name", "A-PARSE", null, null);
    const record = isRecordObject(opts) ? opts : {};
    const explicit = record.onRepeat ?? record.onDuplicate;
    if (explicit !== void 0 && explicit !== "edit" && explicit !== "refuse") return refuse("", "malformed-name", "A-PARSE", null, null);
    return { onRepeat: explicit ?? "edit" };
  }
  function parseWrite(raw) {
    const parsed = parseName(raw);
    if (parsed.segments.length === 0) return refuse(raw, "malformed-name", "A-PARSE", null, null);
    if (parsed.segments[0] === "secure") return refuse(raw, "secure-refused", "B-SECURE-GATE", null, null);
    if (!isTierToken(parsed.segments[0])) return refuse(raw, "malformed-name", "A-PARSE", null, null);
    const parts = rootParts(parsed.segments);
    const token = parsed.segments[0] === "mem" ? "mem" : parsed.segments[0] === "file" ? "file" : "temp";
    return { name: raw, token, segments: parsed.segments, rootName: parts.rootName, tail: parts.tail };
  }
  function rootIsKnown(rootName) {
    return declared.has(rootName) || liveHolders(rootName).length > 0;
  }
  function ctopWriteRefusal(parsed, raw) {
    if (parsed.tail.length > 1 && !rootIsKnown(parsed.rootName)) {
      const top = parsed.segments[1] ?? parsed.rootName;
      return refuse(raw, "undeclared-name", "C-TOP", top, null);
    }
    return null;
  }
  function rootCapReached(token) {
    if (token !== "mem" && token !== "temp") return false;
    let count = 0;
    for (const rootName of rootHolders.keys()) {
      for (const holder of liveHolders(rootName)) if (holder.flag === token) count += 1;
    }
    return count >= (token === "mem" ? REGISTER_ROOT_CAP_MEM : REGISTER_ROOT_CAP_TEMP);
  }
  function writeRowsFor(node, path, out) {
    out.push({ name: path, flag: node.flag, nodeRef: node.ref });
    for (const anchor of node.anchors) {
      if (anchor.link === null || anchor.link.to === null) continue;
      const child = nodes.get(anchor.link.to);
      if (child === void 0) continue;
      writeRowsFor(child, `${path}.${anchor.key}`, out);
    }
  }
  function serializationFailure(ref) {
    for (const node of subtreeOf(ref)) {
      const failure = serializationFailureOf(valueOf(node.ref));
      if (failure !== null) return failure;
    }
    return null;
  }
  function replicate(old, flag, path, affected) {
    const ref = mintRef();
    nodes.set(ref, { ref, flag, localName: old.localName, anchors: [], parentLink: null });
    affected.push({ name: path, flag, ref });
    const carried = valueOf(old.ref);
    if (hasValueEntry(old.ref)) setValue(ref, old.localName, carried);
    for (const anchor of old.anchors) {
      if (anchor.link === null || anchor.link.to === null) continue;
      const child = nodes.get(anchor.link.to);
      if (child === void 0) continue;
      const childRebuilt = replicate(child, flag, `${path}.${anchor.key}`, affected);
      withAnchor(ref, anchor.key, { from: ref, to: childRebuilt.ref, cache: linkEntry(old.localName, childRebuilt.ref, flag), constraint: null });
    }
    return nodes.get(ref);
  }
  function editNode(raw, parsed, node, value, cause) {
    const prior = valueOf(node.ref);
    const state = { cleared: [], repaired: [], rows: [{ name: parsed.name, flag: node.flag, nodeRef: node.ref }], crossings: 0, events: 0 };
    if (cause !== "set" || prior !== value) {
      const op = cause === "set" ? "set" : "commit";
      const slots = captureConstraintSlots(op, parsed);
      const journal = slots.length > 0 ? journalBefore() : null;
      setValue(node.ref, node.localName, value);
      const outcome = evaluateConstraints(op, parsed, slots);
      if (outcome.refused) {
        if (journal !== null) revertTo(journal);
        return refusalOfFeedback(parsed.name, outcome.reason ?? "validate-failed");
      }
      state.events += emit(parsed.name, node.flag, value, [], cause, parsed.name);
      for (const repairEvent of outcome.repairEvents) {
        state.events += emit(repairEvent.name, repairEvent.flag, repairEvent.value, repairEvent.cleared, "repair");
      }
      state.repaired.push(...outcome.repairedNames);
    }
    rebuildEntriesAtInvalidation(parsed.rootName);
    return receiptFor(raw, state, "committed");
  }
  function regenerationReceipt(raw, parsed, value, staleTarget) {
    const requested = parsed.token;
    const target = nodes.get(staleTarget.ref) ?? staleTarget;
    if (target.parentLink !== null) {
      const parent = nodes.get(target.parentLink.from);
      if (parent !== void 0 && isRootRef(parent.ref) === false && (DURABILITY_RANK[requested] ?? 0) > (DURABILITY_RANK[parent.flag] ?? 0)) {
        return refuse(raw, "durability-inversion", "G-RESOLVE-LEAF", parsed.tail[parsed.tail.length - 1] ?? null, parent.ref);
      }
    }
    if (requested === "file") {
      const failure = serializationFailureOf(value);
      if (failure !== null) return refuse(raw, failure, "G-RESOLVE-LEAF", null, target.ref);
    }
    const slots = captureConstraintSlots("commit", parsed);
    const journal = slots.length > 0 ? journalBefore() : null;
    const doomed = [];
    for (const holder of rootHolders.get(parsed.rootName) ?? []) {
      if (nodes.get(holder.ref) === void 0) continue;
      if ((DURABILITY_RANK[holder.flag] ?? 0) >= (DURABILITY_RANK[requested] ?? 0)) continue;
      const lower = anchorWalk(parsed.rootName, [parsed.rootName, ...parsed.tail.slice(1)], holder.flag, true, void 0, holder.ref);
      if (lower.node === null) continue;
      doomed.push({ path: `${holder.flag}.${parsed.tail.join(".")}`, ref: lower.node?.ref ?? holder.ref });
    }
    const affected = [];
    const rebuilt = replicate(target, requested, target.localName, affected);
    const parentLink = target.parentLink;
    const targetName = target.localName;
    detach(target.ref);
    if (parentLink !== null) {
      const parent = nodes.get(parentLink.from);
      if (parent !== void 0) {
        withAnchor(parent.ref, targetName, {
          from: parent.ref,
          to: rebuilt.ref,
          cache: linkEntry(parsed.rootName, rebuilt.ref, rebuilt.flag),
          constraint: null
        });
      }
    } else if (target.parentLink === null) {
      setHolder(targetName, rebuilt);
    }
    const leafNode = anchorWalk(parsed.rootName, [parsed.rootName, ...parsed.tail.slice(1)], requested, false).node ?? rebuilt;
    setValue(leafNode.ref, leafNode.localName, value);
    const cleared = [];
    for (const entry of doomed) {
      if (entry.ref === leafNode.ref) continue;
      detach(entry.ref);
      if (!cleared.includes(entry.path)) cleared.push(entry.path);
    }
    const outcome = evaluateConstraints("commit", parsed, slots);
    if (outcome.refused) {
      if (journal !== null) revertTo(journal);
      return refusalOfFeedback(parsed.name, outcome.reason ?? "validate-failed");
    }
    if (requested === "file") crossingPut(parsed.name);
    const state = {
      cleared: [...new Set(cleared)],
      repaired: [],
      rows: affected.map((row) => ({ name: row.name, flag: row.flag, nodeRef: row.ref })),
      crossings: requested === "file" ? 1 : 0,
      events: 0
    };
    for (const row of affected) state.events += emit(row.name, row.flag, value, state.cleared, "commit", row.name);
    for (const path of state.cleared) state.events += emit(path, requested, void 0, [], "clear", path);
    for (const repairEvent of outcome.repairEvents) {
      state.events += emit(repairEvent.name, repairEvent.flag, repairEvent.value, repairEvent.cleared, "repair");
    }
    state.repaired.push(...outcome.repairedNames);
    rebuildEntriesAtInvalidation(parsed.rootName);
    return receiptFor(raw, state, "committed");
  }
  function heldAtLowerTier(parsed, requested) {
    for (const holder of rootHolders.get(parsed.rootName) ?? []) {
      if (nodes.get(holder.ref) === void 0) continue;
      if ((DURABILITY_RANK[holder.flag] ?? 0) >= (DURABILITY_RANK[requested] ?? 0)) continue;
      const lower = anchorWalk(parsed.rootName, [parsed.rootName, ...parsed.tail.slice(1)], holder.flag, true, void 0, holder.ref);
      if (lower.node !== null) return true;
    }
    return false;
  }
  function clearLowerCopies(parsed, requested, state) {
    const doomed = [];
    for (const holder of rootHolders.get(parsed.rootName) ?? []) {
      if (nodes.get(holder.ref) === void 0) continue;
      if ((DURABILITY_RANK[holder.flag] ?? 0) >= (DURABILITY_RANK[requested] ?? 0)) continue;
      const lower = anchorWalk(parsed.rootName, [parsed.rootName, ...parsed.tail.slice(1)], holder.flag, true, void 0, holder.ref);
      doomed.push({ path: `${holder.flag}.${parsed.tail.join(".")}`, ref: lower.node?.ref ?? holder.ref });
    }
    for (const target of doomed) {
      detach(target.ref);
      if (!state.cleared.includes(target.path)) state.cleared.push(target.path);
    }
    for (const path of state.cleared) state.events += emit(path, requested, void 0, [], "clear", path);
  }
  function locateWriteTarget(rootName, tail, requested) {
    let current = null;
    let currentRank = -1;
    for (const holder of holdersOf(rootName)) {
      const walk = walkFrom(rootName, holder, [rootName, ...tail.slice(1)], false, void 0);
      if (walk.deepest === null) continue;
      const rank = DURABILITY_RANK[walk.deepest.flag] ?? 0;
      if (rank <= currentRank) continue;
      currentRank = rank;
      current = walk.deepest;
    }
    if (current === null) return null;
    if (current.flag === requested) return null;
    let subtree = current;
    for (; ; ) {
      const parent = parentOf(subtree) ?? parentPathOf(rootName, tail, subtree.ref);
      if (parent === null) break;
      if (isRootRef(parent.ref)) {
        subtree = parent;
        break;
      }
      subtree = parent;
    }
    return subtree;
  }
  function mintNewHolder(parsed, requested, value, bound) {
    if (bound.node !== null && (DURABILITY_RANK[requested] ?? 0) > bound.rank) {
      return refuse(parsed.name, "durability-inversion", "G-RESOLVE-LEAF", parsed.tail[parsed.tail.length - 1] ?? null, bound.node.ref);
    }
    const slots = captureConstraintSlots("commit", parsed);
    const journal = slots.length > 0 ? journalBefore() : null;
    if (!declared.has(parsed.rootName)) {
      declared.set(parsed.rootName, { root: parsed.rootName, names: [{ name: parsed.name, reserved: false }] });
    }
    const ref = mintRef();
    const fresh = { ref, flag: requested, localName: parsed.rootName, anchors: [], parentLink: null };
    nodes.set(ref, fresh);
    setHolder(parsed.rootName, fresh);
    setValue(ref, parsed.rootName, value);
    const walkTail = [parsed.rootName, ...parsed.tail.slice(1)];
    const holderWalk = anchorWalk(parsed.rootName, walkTail, requested, true, value);
    const reached = holderWalk.node ?? fresh;
    const raised = false;
    const state = { cleared: [], repaired: [], rows: [], crossings: requested === "file" ? 1 : 0, events: 0 };
    writeRowsFor(reached, parsed.name, state.rows);
    const outcome = evaluateConstraints("commit", parsed, slots);
    if (outcome.refused) {
      if (journal !== null) revertTo(journal);
      return refusalOfFeedback(parsed.name, outcome.reason ?? "validate-failed");
    }
    state.events += emit(parsed.name, requested, value, [], "commit", parsed.name);
    for (const repairEvent of outcome.repairEvents) {
      state.events += emit(repairEvent.name, repairEvent.flag, repairEvent.value, repairEvent.cleared, "repair");
    }
    state.repaired.push(...outcome.repairedNames);
    if (raised) clearLowerCopies(parsed, requested, state);
    if (requested === "file") {
      crossingPut(parsed.name);
      state.crossings = 1;
    }
    rebuildEntriesAtInvalidation(parsed.rootName);
    return receiptFor(parsed.name, state, "committed");
  }
  function mintBound(parsed, requested) {
    const parentTail = [parsed.rootName, ...parsed.tail.slice(1, parsed.tail.length - 1)];
    let best = null;
    let bestRank = -1;
    for (const holder of holdersOf(parsed.rootName)) {
      if (holder.flag === requested) continue;
      const reached = anchorWalk(parsed.rootName, parentTail, holder.flag, false, void 0, holder.ref).node;
      if (reached === null) continue;
      if (reached.localName === parsed.tail[0]) continue;
      const rank = DURABILITY_RANK[reached.flag] ?? 0;
      if (rank > bestRank) {
        bestRank = rank;
        best = reached;
      }
    }
    return { rank: bestRank, node: best };
  }
  function commitOp(raw, value, opts) {
    const parsed = parseWrite(raw);
    if (!("token" in parsed)) return parsed;
    const routing = routingOf(opts);
    if (!("onRepeat" in routing)) return routing;
    const f1 = ctopWriteRefusal(parsed, raw);
    if (f1 !== null) return f1;
    const requested = parsed.token;
    const tierHolder = holderOf(parsed.rootName, requested);
    if (tierHolder === null) {
      if (rootCapReached(requested)) {
        return refuse(raw, "cap-exceeded", "G-RESOLVE-LEAF", parsed.tail[parsed.tail.length - 1] ?? null, null);
      }
      const leafWalk = anchorWalk(parsed.rootName, [parsed.rootName, ...parsed.tail.slice(1)], null, false);
      const located2 = locateWriteTarget(parsed.rootName, parsed.tail, requested);
      const heldAtAnotherTier = located2 !== null && (DURABILITY_RANK[requested] ?? 0) > (DURABILITY_RANK[located2.flag] ?? 0);
      if (heldAtAnotherTier && leafWalk.node !== null) {
        if (requested === "file") {
          const failureAtRoot = serializationFailureOf(value);
          if (failureAtRoot !== null) return refuse(raw, failureAtRoot, "G-RESOLVE-LEAF", null, located2.ref);
        }
        return regenerationReceipt(raw, parsed, value, located2);
      }
      if (requested === "file") {
        const failure = serializationFailureOf(value);
        if (failure !== null) return refuse(raw, failure, "G-RESOLVE-LEAF", null, null);
      }
      const deepest2 = leafWalk.deepest;
      if (deepest2 !== null && (DURABILITY_RANK[requested] ?? 0) > (DURABILITY_RANK[deepest2.flag] ?? 0)) {
        return refuse(raw, "durability-inversion", "G-RESOLVE-LEAF", leafWalk.firstMissing ?? parsed.tail[parsed.tail.length - 1] ?? null, deepest2.ref);
      }
      return mintNewHolder(parsed, requested, value, mintBound(parsed, requested));
    }
    const walkTail = [parsed.rootName, ...parsed.tail.slice(1)];
    const walked = anchorWalk(parsed.rootName, walkTail, null, false);
    if (walked.severed) {
      return refuse(raw, "severed-link", "E-LINK", walked.firstMissing ?? parsed.name, walked.deepest?.ref ?? null);
    }
    const target = walked.target;
    const lastSegment = parsed.tail[parsed.tail.length - 1];
    if (target !== null && routing.onRepeat === "refuse" && target.flag === requested) {
      return refuse(raw, "duplicate-path-tier", "G-RESOLVE-LEAF", lastSegment, target.ref);
    }
    if (target !== null && target.flag !== requested) {
      return regenerationReceipt(raw, parsed, value, target);
    }
    if (target !== null && target.flag === requested && heldAtLowerTier(parsed, requested)) {
      return regenerationReceipt(raw, parsed, value, target);
    }
    if (target !== null) return editNode(raw, parsed, target, value, "commit");
    const located = locateWriteTarget(parsed.rootName, parsed.tail, requested);
    if (located !== null) return regenerationReceipt(raw, parsed, value, located);
    const deepest = walked.deepest;
    if (deepest === null) return refuse(raw, "undeclared-name", "C-TOP", parsed.rootName, null);
    if ((DURABILITY_RANK[requested] ?? 0) > (DURABILITY_RANK[deepest.flag] ?? 0)) {
      return refuse(raw, "durability-inversion", "G-RESOLVE-LEAF", walked.firstMissing ?? lastSegment, deepest.ref);
    }
    if (requested === "file") {
      const failure = serializationFailureOf(value);
      if (failure !== null) return refuse(raw, failure, "G-RESOLVE-LEAF", null, deepest.ref);
    }
    const slots = captureConstraintSlots("commit", parsed);
    const journal = slots.length > 0 ? journalBefore() : null;
    const childWalk = anchorWalk(parsed.rootName, walkTail, requested, true, value);
    const minted = childWalk.node;
    if (minted === null) return refuse(raw, "undeclared-name", "C-TOP", parsed.rootName, null);
    const raised = true;
    const state = { cleared: [], repaired: [], rows: [], crossings: requested === "file" ? 1 : 0, events: 0 };
    writeRowsFor(minted, parsed.name, state.rows);
    const outcome = evaluateConstraints("commit", parsed, slots);
    if (outcome.refused) {
      if (journal !== null) revertTo(journal);
      return refusalOfFeedback(parsed.name, outcome.reason ?? "validate-failed");
    }
    state.events += emit(parsed.name, requested, value, [], "commit", parsed.name);
    for (const repairEvent of outcome.repairEvents) {
      state.events += emit(repairEvent.name, repairEvent.flag, repairEvent.value, repairEvent.cleared, "repair");
    }
    state.repaired.push(...outcome.repairedNames);
    if (raised) clearLowerCopies(parsed, requested, state);
    rebuildEntriesAtInvalidation(parsed.rootName);
    return receiptFor(raw, state, "committed");
  }
  function setOrMint(raw, value, opts) {
    const parsed = parseWrite(raw);
    if (!("token" in parsed)) return parsed;
    const routing = routingOf(opts);
    if (!("onRepeat" in routing)) return routing;
    const f1 = ctopWriteRefusal(parsed, raw);
    if (f1 !== null) return f1;
    const walked = anchorWalk(parsed.rootName, [parsed.rootName, ...parsed.tail.slice(1)], parsed.token, false);
    if (walked.severed) {
      return refuse(raw, "severed-link", "E-LINK", walked.firstMissing ?? parsed.name, walked.deepest?.ref ?? null);
    }
    const target = walked.node;
    if (target === null) {
      return refuse(raw, "undeclared-name", "G-RESOLVE-LEAF", walked.firstMissing ?? parsed.tail[parsed.tail.length - 1] ?? null, walked.deepest?.ref ?? null);
    }
    if (target.flag !== parsed.token) {
      return refuse(raw, "undeclared-name", "G-RESOLVE-LEAF", parsed.tail[parsed.tail.length - 1] ?? null, target.ref);
    }
    return editNode(raw, parsed, target, value, "set");
  }
  function removeOp(raw) {
    const parsed = parseWrite(raw);
    if (!("token" in parsed)) return parsed;
    for (const row of declared.values()) {
      for (const spelling of row.names) {
        if (spelling.reserved && spelling.name === parsed.name) return refuse(raw, "reserved-name", "C-TOP", null, null);
      }
    }
    const walked = anchorWalk(parsed.rootName, [parsed.rootName, ...parsed.tail.slice(1)], parsed.token, false);
    if (walked.severed) {
      return refuse(raw, "severed-link", "E-LINK", walked.firstMissing ?? parsed.name, walked.deepest?.ref ?? null);
    }
    const target = walked.node;
    if (target === null) {
      return refuse(raw, "undeclared-name", "G-RESOLVE-LEAF", walked.firstMissing ?? parsed.tail[parsed.tail.length - 1] ?? null, walked.deepest?.ref ?? null);
    }
    const slots = captureConstraintSlots("remove", parsed);
    const journal = slots.length > 0 ? journalBefore() : null;
    const cleared = [];
    const lowerCleared = [];
    for (const holder of holdersOf(parsed.rootName)) {
      if ((DURABILITY_RANK[holder.flag] ?? 0) > (DURABILITY_RANK[parsed.token] ?? 0)) continue;
      const candidate = anchorWalk(parsed.rootName, [parsed.rootName, ...parsed.tail.slice(1)], holder.flag, false, void 0, holder.ref);
      if (candidate.node === null) continue;
      cleared.push(`${holder.flag}.${parsed.tail.join(".")}`);
      if ((DURABILITY_RANK[holder.flag] ?? 0) < (DURABILITY_RANK[parsed.token] ?? 0)) {
        lowerCleared.push(`${holder.flag}.${parsed.tail.join(".")}`);
      }
      detach(candidate.node.ref);
    }
    const state = { cleared: [...new Set(cleared)], repaired: [], rows: [], crossings: 0, events: 0 };
    const outcome = evaluateConstraints("remove", parsed, slots);
    if (outcome.refused) {
      if (journal !== null) revertTo(journal);
      return refusalOfFeedback(parsed.name, outcome.reason ?? "validate-failed");
    }
    for (const path of [...new Set(lowerCleared)]) state.events += emit(path, parsed.token, void 0, [], "clear", path);
    state.events += emit(parsed.name, parsed.token, void 0, state.cleared, "remove", parsed.name);
    for (const repairEvent of outcome.repairEvents) {
      state.events += emit(repairEvent.name, repairEvent.flag, repairEvent.value, repairEvent.cleared, "repair");
    }
    state.repaired.push(...outcome.repairedNames);
    rebuildEntriesAtInvalidation(parsed.rootName);
    return receiptFor(raw, state, "committed");
  }
  function clearOp(raw) {
    const parsed = parseWrite(raw);
    if (!("token" in parsed)) return parsed;
    const walked = anchorWalk(parsed.rootName, [parsed.rootName, ...parsed.tail.slice(1)], parsed.token, false);
    if (walked.severed) {
      return refuse(raw, "severed-link", "E-LINK", walked.firstMissing ?? parsed.name, walked.deepest?.ref ?? null);
    }
    const target = walked.node;
    if (target === null) {
      return refuse(raw, "undeclared-name", "G-RESOLVE-LEAF", walked.firstMissing ?? parsed.tail[parsed.tail.length - 1] ?? null, walked.deepest?.ref ?? null);
    }
    dropValue(target.ref);
    const state = { cleared: [parsed.name], repaired: [], rows: [], crossings: 0, events: 0 };
    state.events += emit(parsed.name, target.flag, void 0, [], "clear", parsed.name);
    rebuildEntriesAtInvalidation(parsed.rootName);
    return receiptFor(raw, state, "committed");
  }
  function sweepOp(raw) {
    const parsed = parseWrite(raw);
    if (!("token" in parsed)) return parsed;
    const walked = anchorWalk(parsed.rootName, [parsed.rootName, ...parsed.tail.slice(1)], parsed.token, false);
    if (walked.severed) {
      return refuse(raw, "severed-link", "E-LINK", walked.firstMissing ?? parsed.name, walked.deepest?.ref ?? null);
    }
    const target = walked.node;
    if (target === null) {
      return refuse(raw, "undeclared-name", "G-RESOLVE-LEAF", walked.firstMissing ?? parsed.tail[parsed.tail.length - 1] ?? null, walked.deepest?.ref ?? null);
    }
    const swept = [];
    const collectSwept = (node, logical) => {
      swept.push({ path: `${parsed.token}.${logical}`, ref: node.ref });
      for (const anchor of node.anchors) {
        if (anchor.link === null || anchor.link.to === null) continue;
        const child = nodes.get(anchor.link.to);
        if (child === void 0) continue;
        collectSwept(child, `${logical}.${anchor.key}`);
      }
    };
    collectSwept(target, parsed.tail.join("."));
    for (const { ref } of swept) dropValue(ref);
    const state = { cleared: swept.map((entry) => entry.path), repaired: [], rows: [], crossings: 0, events: 0 };
    for (const entry of swept) state.events += emit(entry.path, parsed.token, void 0, [], "sweep", entry.path);
    rebuildEntriesAtInvalidation(parsed.rootName);
    return receiptFor(raw, state, "committed");
  }
  function severOp(raw, anchorKey) {
    const parsed = parseWrite(raw);
    if (!("token" in parsed)) return parsed;
    if (typeof anchorKey !== "string" || anchorKey.length === 0) return refuse(raw, "malformed-name", "A-PARSE", null, null);
    const ownerWalk = anchorWalk(parsed.rootName, parsed.tail, null, false);
    const owner = ownerWalk.node ?? ownerWalk.deepest;
    if (owner === null) return refuse(raw, "undeclared-name", "C-TOP", parsed.rootName, null);
    const anchor = anchorOf(owner.ref, anchorKey);
    if (anchor === null) return refuse(raw, "no-such-anchor", "D-ANCHOR", anchorKey, owner.ref);
    const logKey = `${owner.ref}::${anchorKey}`;
    if (anchor.link === null || anchor.link.to === null) {
      const previous = severLog.get(logKey) ?? [];
      return receiptFor(raw, { cleared: [...previous], repaired: [], rows: [], crossings: 0, events: 0 }, "committed");
    }
    const target = nodes.get(anchor.link.to);
    const ownerName = parsed.tail[0];
    const released = [];
    if (target !== void 0) {
      for (const held of referenceNamesOf(ownerName, anchorKey, target.ref)) {
        released.push(`${parsed.token}.${held}`);
      }
    }
    dropSubtree(anchor.link.to);
    severLog.set(logKey, released);
    withAnchor(owner.ref, anchorKey, {
      from: owner.ref,
      to: null,
      cache: linkEntry(parsed.rootName, anchor.link.cache.matchedRef, anchor.link.cache.matchedTier),
      constraint: null
    });
    const state = { cleared: released, repaired: [], rows: [], crossings: 0, events: 0 };
    for (const reference of released) {
      const held = target === void 0 ? "file" : target.flag;
      state.events += emit(reference, held, void 0, released, "severed");
    }
    for (const subscriber of subscriptions) if (released.includes(subscriber.name)) subscriber.live = false;
    rebuildEntriesAtInvalidation(parsed.rootName);
    return receiptFor(raw, state, "committed");
  }
  function referenceNamesOf(rootLocal, anchorKey, targetRef) {
    const out = [];
    const walk = (ref, path) => {
      const node = nodes.get(ref);
      if (node === void 0) return;
      out.push(path);
      for (const anchor of node.anchors) {
        if (anchor.link === null || anchor.link.to === null) continue;
        walk(anchor.link.to, `${path}.${anchor.key}`);
      }
    };
    walk(targetRef, `${rootLocal}.${anchorKey}`);
    return out;
  }
  function exportOf(raw) {
    const answer = resolveRead(raw);
    const record = answer;
    if (record["status"] === "refused") return record["reason"];
    const read = answer;
    if (read.found === false) return miss(read.name);
    return { found: true, value: snapshotValue(read.value), tier: read.tier, flag: read.tier, cache: void 0, name: read.name };
  }
  function tierHandleFor(flag) {
    const existing = handles.get(flag);
    if (existing !== void 0) return existing;
    const handle = {
      tier: flag,
      get(name) {
        const answer = resolveRead(name);
        if (answer["status"] === "refused") return { found: false, value: void 0, name: typeof name === "string" ? name : "" };
        const read = answer;
        if (read.found === false) return { found: false, value: void 0, name: read.name };
        return { found: true, value: read.value, name: read.name };
      },
      has(name) {
        const walk = resolvePath(name);
        return walk !== null && walk.node !== null && walk.node.flag === flag;
      },
      set(name, value, opts) {
        return setOrMint(name, value, opts);
      },
      clear(name) {
        return clearOp(name);
      }
    };
    handles.set(flag, handle);
    return handle;
  }
  function hydrateRows(rows) {
    if (!Array.isArray(rows)) return;
    const touchedRoots = /* @__PURE__ */ new Set();
    for (const row of rows) {
      if (row === null || typeof row !== "object" || Array.isArray(row)) continue;
      const candidate = row;
      if (typeof candidate.name !== "string") continue;
      const parsed = parseWrite(candidate.name);
      if (!("token" in parsed)) continue;
      if (parsed.token !== "file" || parsed.segments.length < 2) continue;
      let root2 = holderOf(parsed.rootName, "file");
      if (root2 === null) {
        const ref = mintRef();
        root2 = { ref, flag: "file", localName: parsed.rootName, anchors: [], parentLink: null };
        nodes.set(ref, root2);
        setHolder(parsed.rootName, root2);
        if (!declared.has(parsed.rootName)) {
          declared.set(parsed.rootName, { root: parsed.rootName, names: [{ name: candidate.name, reserved: false }] });
        }
      }
      let current = root2;
      let acc = `file.${parsed.rootName}`;
      for (let index = 1; index < parsed.tail.length; index += 1) {
        const segment = parsed.tail[index];
        acc = `${acc}.${segment}`;
        const anchor = anchorOf(current.ref, segment);
        let target = anchor !== null && anchor.link !== null && anchor.link.to !== null ? nodes.get(anchor.link.to) ?? null : null;
        if (target === null) {
          const ref = mintRef();
          const link = { from: current.ref, to: ref, cache: linkEntry(parsed.rootName, ref, "file"), constraint: null };
          const child = { ref, flag: "file", localName: segment, anchors: [], parentLink: link };
          nodes.set(ref, child);
          withAnchor(current.ref, segment, link);
          target = child;
        }
        current = target;
      }
      setValue(current.ref, current.localName, candidate.value);
      emit(candidate.name, "file", candidate.value, [], "commit", candidate.name);
      touchedRoots.add(parsed.rootName);
    }
    for (const rootName of touchedRoots) rebuildEntriesAtInvalidation(rootName);
  }
  loadDeclarations();
  const store = {
    resolve(name) {
      return resolveRead(name);
    },
    set(name, value, opts) {
      return setOrMint(name, value, opts);
    },
    commit(name, value, opts) {
      return commitOp(name, value, opts);
    },
    remove(name) {
      return removeOp(name);
    },
    clear(name) {
      return clearOp(name);
    },
    sweep(name) {
      return sweepOp(name);
    },
    export(name) {
      return exportOf(name);
    },
    sever(from, anchorKey) {
      return severOp(from, anchorKey);
    },
    subscribe(name, listener, opts) {
      if (typeof name === "string" && name.split(".")[0] === "secure") return refuse(name, "secure-refused", "B-SECURE-GATE", null, null);
      if (typeof name !== "string" || name.length === 0) return refuse(name, "malformed-name", "A-PARSE", null, null);
      if (typeof listener !== "function") return refuse(name, "malformed-name", "A-PARSE", null, null);
      const subtree = isRecordObject(opts) && opts.subtree === true;
      if (subtree) {
        let amplifiers = 0;
        for (const subscriber of subscriptions) if (subscriber.subtree) amplifiers += 1;
        if (amplifiers >= AMPLIFIER_SUBSCRIPTION_CAP) return refuse(name, "cap-exceeded", "G-RESOLVE-LEAF", null, null);
      }
      const record = { name, subtree, listener, live: true };
      subscriptions.push(record);
      return {
        name,
        subtree,
        unsubscribe() {
          if (!record.live) return false;
          record.live = false;
          subscriptions = subscriptions.filter((candidate) => candidate !== record);
          return true;
        }
      };
    },
    tiers: Object.freeze({
      temp: tierHandleFor("temp"),
      mem: tierHandleFor("mem"),
      file: tierHandleFor("file")
    }),
    get register() {
      return { rows: registerRows() };
    },
    // THE READ-ONLY VIEW OF THE CALLER-SUPPLIED MEMBERS, BY IDENTITY (RE-DERIVED 2026-10-03:
    // the members are code features — the very array the caller supplied, never a copy, never
    // mutated here, no install path).
    constraints,
    // THE BOOT-HYDRATION SEAM (`HYDRATE-1`, frozen-surface field 2 — PRODUCTION-PRESENT,
    // NEVER a test-seam key: the G2 boot wiring calls it after the Y-1 hand-off; the census's
    // eight test-seam keys stay absent from production constructions, hydrate is not one of
    // them). It mints the file-tier nodes the handed-off record names, FIRES the store's
    // event surface BY DESIGN (the boot-load events ARE the consumer-notification channel —
    // readiness is delivered by the events, never by a return value), NEVER crosses, NEVER
    // evaluates the constraint table, skips malformed rows and returns void.
    hydrate(rows) {
      hydrateRows(rows);
    }
  };
  if (seamEnabled) {
    store["reset"] = () => {
      nodes.clear();
      rootHolders.clear();
      registerEntries.clear();
      staleEntries.clear();
      values.length = 0;
      subscriptions = [];
    };
    store["seed"] = (rows) => {
      if (!Array.isArray(rows)) return;
      for (const row of rows) {
        if (!isRecordObject(row)) continue;
        commitOp(row.name, row.value, void 0);
      }
    };
    store["parentLinkCountOf"] = (nodeRef) => {
      let count = 0;
      for (const node of nodes.values()) {
        if (node.parentLink !== null && node.parentLink.to === nodeRef) count += 1;
      }
      return count;
    };
    store["cacheEntryFor"] = (name) => {
      if (typeof name !== "string") return null;
      const entry = registerEntries.get(name);
      if (entry === void 0) return null;
      return { name: entry.name, matchedRef: entry.matchedRef, matchedTier: entry.matchedTier };
    };
    store["nodeFor"] = (nodeRef) => {
      const node = nodes.get(nodeRef);
      return node === void 0 ? null : node;
    };
    store["anchorFor"] = (owner, key) => anchorOf(owner, key);
    store["linkFor"] = (owner, key) => {
      const anchor = anchorOf(owner, key);
      return anchor === null ? null : anchor.link;
    };
    store["failNextCacheRebuild"] = () => {
      injectArmed = true;
    };
  }
  void storeGraphReferences;
  void STEP_IDS;
  void SEAM_KEYS;
  void isFlagToken;
  return store;
}

// node_modules/provident-ssr/dist/core/errors.js
var LinkConfigError = class extends Error {
  code;
  linkId;
  config;
  detail;
  constructor(code, linkId, config, detail) {
    super();
    this.name = "LinkConfigError";
    this.code = code;
    this.linkId = linkId;
    this.config = config;
    this.detail = detail ?? { conflicting: [], currentCell: [] };
  }
};
var SingleParentError = class extends Error {
  nodeId;
  constructor(nodeId, message) {
    super(message);
    this.name = "SingleParentError";
    this.nodeId = nodeId;
  }
};
var CycleError = class extends Error {
  nodeId;
  constructor(nodeId, message) {
    super(message);
    this.name = "CycleError";
    this.nodeId = nodeId;
  }
};
var ApplyError = class extends Error {
  code;
  detail;
  constructor(code, detail) {
    super();
    this.name = "ApplyError";
    this.code = code;
    this.detail = detail;
  }
};

// node_modules/provident-ssr/dist/core/link.js
var linkSeq = 0;
function mintLinkId() {
  linkSeq += 1;
  return `link-${linkSeq}`;
}
var DEFAULT_PARENT_CHILD = {
  name: "parent-child",
  parent: { count: 1 },
  children: { min: 1, max: Infinity, orderKey: "unique" },
  roles: ["parent", "child"]
};
var DEFAULT_COMPONENT = {
  name: "component",
  roles: ["source", "target", "duplex"]
};
var DEFAULT_PLACEMENT = {
  name: "placement",
  roles: ["container", "content"]
};
function baseFor(name) {
  if (name === "component")
    return DEFAULT_COMPONENT;
  if (name === "placement")
    return DEFAULT_PLACEMENT;
  return DEFAULT_PARENT_CHILD;
}
function effectiveOrder(a) {
  return a.options.priority ?? a.options.order;
}
var Link = class _Link {
  id;
  config;
  anchors;
  constructor(config, id) {
    const name = config?.name ?? "parent-child";
    const base = baseFor(name);
    this.config = config ? { ...base, ...config } : { ...base };
    this.id = id ?? mintLinkId();
    this.anchors = [];
  }
  anchorsOf(role, target) {
    return this.anchors.filter((a) => a.role === role && (target === void 0 || a.target === target));
  }
  parents() {
    return this.anchorsOf("parent");
  }
  children() {
    return this.anchorsOf("child");
  }
  sources() {
    return this.anchorsOf("source");
  }
  targets() {
    return this.anchorsOf("target");
  }
  addAnchor(a) {
    if (a.target instanceof _Link) {
      throw new LinkConfigError("role-mismatch", this.id, this.config, {
        intendedAnchor: { role: a.role, target: a.target, options: a.options },
        conflicting: [],
        currentCell: this.anchors.slice()
      });
    }
    if (!this.config.roles.includes(a.role)) {
      throw new LinkConfigError("role-mismatch", this.id, this.config, {
        intendedAnchor: { role: a.role, target: a.target, options: a.options },
        conflicting: [],
        currentCell: this.anchors.slice()
      });
    }
    if (a.role === "parent" && this.config.parent) {
      const existing = this.anchors.filter((x) => x.role === "parent");
      if (existing.length + 1 > this.config.parent.count) {
        throw new LinkConfigError("count-exceeded", this.id, this.config, {
          intendedAnchor: { role: "parent", target: a.target, options: a.options },
          conflicting: existing,
          currentCell: this.anchors.slice()
        });
      }
    }
    if (a.role === "child" && this.config.children) {
      const eff = effectiveOrder(a);
      if (eff !== void 0) {
        const conflicting = this.anchors.filter((x) => x.role === "child" && x !== a && effectiveOrder(x) === eff);
        if (conflicting.length > 0) {
          throw new LinkConfigError("unique-order", this.id, this.config, {
            intendedAnchor: { role: "child", target: a.target, options: a.options },
            conflicting,
            currentCell: this.anchors.slice()
          });
        }
      }
    }
    this.anchors.push(a);
  }
  removeAnchor(a) {
    const idx = this.anchors.indexOf(a);
    if (idx === -1)
      return;
    if (a.role === "parent" && this.config.parent) {
      const count = this.anchors.filter((x) => x.role === "parent").length;
      if (count - 1 < this.config.parent.count) {
        throw new LinkConfigError("count-underflow", this.id, this.config, {
          intendedAnchor: { role: "parent", target: a.target, options: a.options },
          conflicting: [a],
          currentCell: this.anchors.slice()
        });
      }
    }
    if (a.role === "child" && this.config.children) {
      const count = this.anchors.filter((x) => x.role === "child").length;
      if (count - 1 < this.config.children.min) {
        throw new LinkConfigError("count-underflow", this.id, this.config, {
          intendedAnchor: { role: "child", target: a.target, options: a.options },
          conflicting: [a],
          currentCell: this.anchors.slice()
        });
      }
    }
    this.anchors.splice(idx, 1);
  }
  setOrder(a, priority) {
    if (!Number.isFinite(priority)) {
      throw new LinkConfigError("unique-order", this.id, this.config, {
        intendedAnchor: { role: a.role, target: a.target, options: { ...a.options, priority } },
        conflicting: [],
        currentCell: this.anchors.slice()
      });
    }
    if (a.role === "child" && this.config.children) {
      const conflicting = this.anchors.filter((x) => x.role === "child" && x !== a && effectiveOrder(x) === priority);
      if (conflicting.length > 0) {
        throw new LinkConfigError("unique-order", this.id, this.config, {
          intendedAnchor: { role: "child", target: a.target, options: { ...a.options, priority } },
          conflicting,
          currentCell: this.anchors.slice()
        });
      }
    }
    a.options.priority = priority;
  }
  destroy() {
    const snap = this.anchors.slice();
    this.anchors.length = 0;
    for (const a of snap) {
      if (typeof a.target === "object" && a.target !== null) {
        const owner = a.target;
        if (owner && Array.isArray(owner.anchors)) {
          const i = owner.anchors.indexOf(a);
          if (i !== -1)
            owner.anchors.splice(i, 1);
        }
        if (owner && typeof owner.__onLinkDissolve === "function") {
          owner.__onLinkDissolve(a);
        }
      }
    }
  }
};

// node_modules/provident-ssr/dist/core/constants.js
var MAX_COMPILE_DEPTH = 8;

// node_modules/provident-ssr/dist/core/registry.js
function createScope() {
  return {
    registered: /* @__PURE__ */ new Set(),
    byId: /* @__PURE__ */ new Map(),
    handlerDefs: /* @__PURE__ */ new Map(),
    translateUserData: void 0,
    contentNodes: /* @__PURE__ */ new Set(),
    defPrototypes: /* @__PURE__ */ new Map(),
    defRootPrototypes: /* @__PURE__ */ new Map(),
    mintedByLayer: /* @__PURE__ */ new Map(),
    cascadeFlags: /* @__PURE__ */ new Map(),
    pendingDestroy: []
  };
}
var DEFAULT_SCOPE = createScope();
var allScopes = /* @__PURE__ */ new Set([DEFAULT_SCOPE]);
function createIsolatedScope() {
  const s = createScope();
  allScopes.add(s);
  return s;
}
var registered = DEFAULT_SCOPE.registered;
function registerHandlerDef(name, def, scope = DEFAULT_SCOPE) {
  scope.handlerDefs.set(name, { ...def, format: def.format ?? "legacy" });
}
function handlerDef(name, scope = DEFAULT_SCOPE) {
  return scope.handlerDefs.get(name);
}
function setTranslateUserData(value, scope = DEFAULT_SCOPE) {
  scope.translateUserData = value;
}
function getTranslateUserData(scope = DEFAULT_SCOPE) {
  return scope.translateUserData;
}
function compileHandlerBody(src) {
  const fn = new Function(`return (${src})`)();
  if (typeof fn !== "function") {
    throw new Error(`legacy-handler-body: "${src}" does not evaluate to a function`);
  }
  return fn;
}
var sweepScheduled = false;
function markCascadeExplicit(node) {
  scopeOf(node).cascadeFlags.set(node, { prototypeRooted: chainTerminatesAtComponent(node) });
}
function isPlacementOwned(node) {
  return node.anchors.some((a) => a.role === "content");
}
function chainTerminatesAtComponent(node) {
  const seen = /* @__PURE__ */ new Set();
  for (let cur = node; cur && !seen.has(cur.id); cur = cur.parent) {
    seen.add(cur.id);
    const child = cur.childAnchor();
    if (!child)
      continue;
    const pa = child.link.anchorsOf("parent")[0];
    if (!pa || typeof pa.target !== "string")
      continue;
    if (pa.target === "component")
      return true;
    if (pa.target === "rootNode" || pa.target === "contentNodes")
      return false;
  }
  return false;
}
function scopeOf(node) {
  return node.graphScope ?? DEFAULT_SCOPE;
}
function registerDefPrototypes(link, protos, scope = DEFAULT_SCOPE) {
  scope.defPrototypes.set(link, protos);
}
function defPrototypesFor(link, scope = DEFAULT_SCOPE) {
  return scope.defPrototypes.get(link) ?? [];
}
function registerDefRootPrototype(link, root2, scope = DEFAULT_SCOPE) {
  scope.defRootPrototypes.set(link, root2);
}
function defRootPrototypeFor(link, scope = DEFAULT_SCOPE) {
  return scope.defRootPrototypes.get(link);
}
function defPrototypeEntries(scope = DEFAULT_SCOPE) {
  return [...scope.defPrototypes.entries()];
}
function defRootPrototypeEntries(scope = DEFAULT_SCOPE) {
  return [...scope.defRootPrototypes.entries()];
}
function defNameForLink(link) {
  for (const role of ["source", "duplex"]) {
    for (const a of link.anchorsOf(role)) {
      if (typeof a.target === "string" && a.target.length > 0)
        return a.target;
    }
  }
  return void 0;
}
function registerMinted(nodeId, origin, scope = DEFAULT_SCOPE) {
  scope.mintedByLayer.set(nodeId, origin);
}
function unregisterMinted(nodeId, scope = DEFAULT_SCOPE) {
  scope.mintedByLayer.delete(nodeId);
}
function mintedByOrigin(origin, scope = DEFAULT_SCOPE) {
  const out = [];
  for (const [id, o] of scope.mintedByLayer) {
    if (o === origin)
      out.push(id);
  }
  return out;
}
function registerContentNode(node) {
  scopeOf(node).contentNodes.add(node);
}
function unregisterContentNode(node) {
  scopeOf(node).contentNodes.delete(node);
}
function isContentNode(node) {
  return scopeOf(node).contentNodes.has(node);
}
function resolveNodeRef(id, scope = DEFAULT_SCOPE) {
  return scope.byId.get(id);
}
function registerNode(node) {
  const scope = scopeOf(node);
  scope.registered.add(node);
  scope.byId.set(node.id, node);
}
function scheduleSweep(force = false) {
  if (sweepScheduled && !force)
    return;
  sweepScheduled = true;
  setTimeout(() => {
    sweepScheduled = false;
    runSweep();
  }, 0);
}
function runSweep() {
  for (const scope of allScopes) {
    const batch = scope.pendingDestroy.splice(0);
    for (const node of batch) {
      const flag = scope.cascadeFlags.get(node);
      scope.cascadeFlags.delete(node);
      if (node.destroyed)
        continue;
      if (node.state === "in-tree" || node.state === "prototype")
        continue;
      if (isContentNode(node))
        continue;
      finalizeDestroyed(node, flag);
    }
  }
  for (const scope of allScopes) {
    const visited = /* @__PURE__ */ new Set();
    const dirty = [...scope.registered].filter((n) => !n.destroyed && n.dirty.has("remote"));
    const depthOf = (n) => {
      let d = 0;
      let cur = n.parent;
      while (cur) {
        d++;
        cur = cur.parent;
      }
      return d;
    };
    dirty.sort((x, y) => depthOf(x) - depthOf(y));
    for (const node of dirty) {
      if (visited.has(node.id))
        continue;
      node.compileRemote(visited);
      node.dirty.delete("remote");
    }
    for (const node of scope.registered) {
      if (node.destroyed)
        continue;
      if (node.dirty.has("anchor-populate")) {
        node.reconcileAnchors();
        node.dirty.delete("anchor-populate");
      }
      if (node.dirty.has("remote"))
        node.dirty.delete("remote");
      if (node.dirty.has("sweep-candidate"))
        node.dirty.delete("sweep-candidate");
    }
  }
}
function evictDestroyedNode(node) {
  const scope = scopeOf(node);
  scope.registered.delete(node);
  if (scope.byId.get(node.id) === node)
    scope.byId.delete(node.id);
  unregisterContentNode(node);
  unregisterMinted(node.id, scope);
}
function drainPendingDestroy(scope) {
  const scopes = scope ? [scope] : [...allScopes];
  for (const s of scopes) {
    const batch = s.pendingDestroy.splice(0);
    for (const node of batch) {
      const flag = s.cascadeFlags.get(node);
      s.cascadeFlags.delete(node);
      if (node.destroyed)
        continue;
      if (node.state === "in-tree" || node.state === "prototype")
        continue;
      if (isContentNode(node))
        continue;
      finalizeDestroyed(node, flag);
    }
  }
}
var finalizeHooks = [];
function onNodeFinalized(hook) {
  finalizeHooks.push(hook);
  return () => {
    const i = finalizeHooks.indexOf(hook);
    if (i !== -1)
      finalizeHooks.splice(i, 1);
  };
}
function finalizeDestroyed(node, flag) {
  if (node.destroyed)
    return;
  node.destroyed = true;
  node.dirty.add("sweep-candidate");
  const cascade = flag !== void 0;
  for (const kid of node.children) {
    if (kid.destroyed)
      continue;
    if (cascade) {
      if (flag.prototypeRooted)
        continue;
      if (isPlacementOwned(kid))
        continue;
      if (kid.state === "prototype")
        continue;
      if (isContentNode(kid))
        unregisterContentNode(kid);
      if (kid.runtimeMinted) {
        kid.markDestroyed();
        evictDestroyedNode(kid);
        for (const hook of finalizeHooks)
          hook(kid);
        continue;
      }
      finalizeDestroyed(kid, flag);
      continue;
    }
    if (isContentNode(kid))
      continue;
    if (kid.state === "in-tree" || kid.state === "prototype")
      continue;
    finalizeDestroyed(kid);
  }
  evictDestroyedNode(node);
  for (const hook of finalizeHooks)
    hook(node);
}
function markPending(node) {
  const scope = scopeOf(node);
  if (!scope.pendingDestroy.includes(node)) {
    scope.pendingDestroy.push(node);
    scheduleSweep();
  }
}

// node_modules/provident-ssr/dist/core/resolve.js
function providerValueFor(owner, anchor, name) {
  const hook = owner.layers.find((l) => l.id === `hook-${name}`);
  if (hook !== void 0 && hook.value !== void 0)
    return hook.value;
  return anchor.value;
}
function providerValueFromLink(link) {
  for (const a of link.anchorsOf("source")) {
    if (a.owner === void 0)
      continue;
    const v = typeof a.target === "string" ? providerValueFor(a.owner, a, a.target) : a.value;
    if (v !== void 0)
      return v;
  }
  for (const a of link.anchorsOf("duplex")) {
    if (a.owner === void 0)
      continue;
    const v = typeof a.target === "string" ? providerValueFor(a.owner, a, a.target) : a.value;
    if (v !== void 0)
      return v;
  }
  return void 0;
}
function hookAnchorFor(node, name) {
  return node.anchors.find((a) => (a.role === "source" || a.role === "duplex") && typeof a.target === "string" && a.target === name);
}
function isDefShapedValue(v) {
  if (typeof v !== "object" || v === null || Array.isArray(v))
    return false;
  const o = v;
  return typeof o.type === "string" || o.content !== void 0 || typeof o.name === "string" && typeof o.body === "string";
}
function hookWriteGuard(node, name) {
  const anchor = hookAnchorFor(node, name);
  if (!anchor)
    return { ok: false, code: "hook-name-unresolved" };
  if (anchor.options.seam !== void 0 || isDefShapedValue(anchor.value)) {
    return { ok: false, code: "hook-seam-exempt" };
  }
  return { ok: true, anchor };
}
function providersOn(owner, name) {
  const out = [];
  for (const a of owner.anchors) {
    if (typeof a.target !== "string")
      continue;
    if ((a.role === "source" || a.role === "duplex") && a.target === name) {
      out.push({ anchor: a, owner });
    }
  }
  return out;
}
function chainTokenKind(target) {
  if (target === "rootNode")
    return { kind: "token", token: "rootNode" };
  if (target === "component")
    return { kind: "token", token: "component" };
  if (target === "contentNodes")
    return { kind: "token", token: "contentNodes" };
  return { kind: "token", token: "other" };
}
function chainKindOf(owner) {
  const seen = /* @__PURE__ */ new Set();
  let cur = owner;
  while (cur !== null && !seen.has(cur.id)) {
    seen.add(cur.id);
    const child = cur.childAnchor();
    if (!child)
      return { kind: "unplaced" };
    const parentAnchor = child.link.anchorsOf("parent")[0];
    if (!parentAnchor)
      return { kind: "unplaced" };
    const target = parentAnchor.target;
    if (typeof target === "string")
      return chainTokenKind(target);
    if (target === null)
      return { kind: "unplaced" };
    const ownerNode = target;
    if (ownerNode.destroyed)
      return { kind: "destroyed-owner" };
    cur = ownerNode;
  }
  return { kind: "loop" };
}
function isViable(kind, owner) {
  if (!kind)
    return false;
  if (kind.kind === "token" && kind.token === "rootNode")
    return true;
  if (kind.kind === "token")
    return false;
  if (kind.kind === "unplaced") {
    return owner.anchors.some((a) => (a.role === "source" || a.role === "duplex") && typeof a.target === "string");
  }
  return false;
}
function fallbackTermination(node, name, slice, viable, kinds) {
  const hub = node.hubFor;
  if (hub) {
    const link = hub.linkFor(name, "component");
    const providers = [];
    for (const a of link.anchors) {
      if (a.role !== "source" && a.role !== "duplex")
        continue;
      if (typeof a.target !== "string" || a.target !== name)
        continue;
      const owner = a.owner;
      if (!owner)
        continue;
      const kind = chainKindOf(owner);
      if (isViable(kind, owner))
        continue;
      providers.push({ anchor: a, owner });
    }
    if (providers.length > 0) {
      const reason = kindDropReason(chainKindOf(providers[0].owner));
      return reason ? { kind: "term", reason } : { kind: "none" };
    }
  }
  const fallback = [];
  for (const s of slice) {
    if (viable.has(s.id))
      continue;
    for (const p of providersOn(s, name))
      fallback.push(p);
  }
  if (fallback.length > 0) {
    const first = fallback[0];
    const reason = first && kindDropReason(kinds.get(first.owner.id));
    return reason ? { kind: "term", reason } : { kind: "none" };
  }
  return { kind: "none" };
}
function fitReference(node, name, slice, viable, kinds) {
  const fit = (hits) => hits.length === 0 ? { kind: "none" } : { kind: "hits", hits, referenceName: name };
  const own = providersOn(node, name);
  if (own.length > 0)
    return fit(own);
  const sliceSet = /* @__PURE__ */ new Set();
  for (const s of slice)
    sliceSet.add(s.id);
  const descendants = [];
  const stack = [];
  for (const c of node.children)
    if (sliceSet.has(c.id))
      stack.push(c);
  while (stack.length > 0) {
    const d = stack.pop();
    if (viable.has(d.id))
      descendants.push(...providersOn(d, name));
    for (const c of d.children)
      if (sliceSet.has(c.id))
        stack.push(c);
  }
  if (descendants.length > 0)
    return fit(descendants);
  for (let cur = node.parent; cur; cur = cur.parent) {
    if (!viable.has(cur.id))
      continue;
    const up = providersOn(cur, name);
    if (up.length > 0)
      return fit(up);
  }
  return fallbackTermination(node, name, slice, viable, kinds);
}
function kindDropReason(kind) {
  if (!kind)
    return "owner-terminated";
  if (kind.kind === "token" && kind.token === "component")
    return "prototype-terminated";
  return "owner-terminated";
}
function isFanOutBlowup(nextArms, hits, prevArms) {
  return nextArms > 2 * Math.max(hits, 1) * Math.max(prevArms, 1);
}
function resolvePathTargets(node, pathAncestors, bindings, unresolved) {
  for (const a of node.anchors) {
    if (a.role !== "target" || typeof a.target !== "string")
      continue;
    if (bindings[a.target] !== void 0)
      continue;
    const hit = nearestPathProvider(node, pathAncestors, a.target);
    if (hit)
      bindings[a.target] = hit.anchor.value;
    else
      unresolved.push({ referenceName: a.target, code: "unresolved-reference" });
  }
}
function nearestPathProvider(node, pathAncestors, name) {
  const own = providersOn(node, name);
  if (own.length > 0)
    return own[0];
  for (const anc of pathAncestors) {
    const hit = providersOn(anc, name);
    if (hit.length > 0)
      return hit[0];
  }
  return void 0;
}
function placementChangeIrrelevant(node, chosenName, changedLinkName) {
  if (chosenName === null)
    return false;
  if (changedLinkName === chosenName)
    return false;
  const names = [];
  for (const a of node.anchors) {
    if (a.role !== "content" || typeof a.target !== "string")
      continue;
    names.push(a.target);
  }
  const chosenIdx = names.indexOf(chosenName);
  if (chosenIdx === -1)
    return false;
  const changedIdx = names.indexOf(changedLinkName);
  return changedIdx !== -1 && changedIdx > chosenIdx;
}
function activePlacementOf(states) {
  for (const cs of states) {
    if (cs.activePlacement !== void 0)
      return cs.activePlacement;
  }
  return null;
}
function resolveArms(target, names, slice, viable, kinds) {
  const leaf = { bindings: {}, unresolved: [], keys: [], trace: [] };
  return resolveNames(target, names, leaf, slice, viable, kinds, /* @__PURE__ */ new Set(), 0);
}
function resolveNames(node, names, partial, slice, viable, kinds, path, depth) {
  if (depth > MAX_COMPILE_DEPTH || path.has(node.id)) {
    return [{ ...partial, keys: [...partial.keys], trace: [...partial.trace], drop: { reason: "loop" } }];
  }
  path.add(node.id);
  let arms = [{ ...partial, trace: [...partial.trace] }];
  for (const name of names) {
    const fit = fitReference(node, name, slice, viable, kinds);
    const next = [];
    for (const arm of arms) {
      for (const branch of continueArm(node, name, fit, arm, slice, viable, kinds, path, depth)) {
        next.push(branch);
      }
    }
    const hits = fit.kind === "hits" ? fit.hits.length : 1;
    if (isFanOutBlowup(next.length, hits, arms.length)) {
      console.warn(`fan-out-blowup at ${node.id}: "${name}" resolved ${next.length} arms from ${hits} provider(s) across ${arms.length} arm(s) \u2014 the 2\xD7 linear bound is breached (the DEFECT #22-class shape)`);
    }
    arms = next;
  }
  path.delete(node.id);
  return arms;
}
function continueArm(node, name, fit, arm, slice, viable, kinds, path, depth) {
  if (arm.drop)
    return [arm];
  if (fit.kind === "none") {
    arm.unresolved.push({ referenceName: name, code: "unresolved-reference" });
    return [{ ...arm, keys: [...arm.keys], trace: [...arm.trace] }];
  }
  if (fit.kind === "term") {
    return [{ ...arm, keys: [...arm.keys], trace: [...arm.trace], drop: { reason: fit.reason } }];
  }
  const outs = [];
  const hits = fit.hits;
  const stepped = hits.length === 1 ? [
    {
      arm,
      value: hits[0].anchor.value,
      owner: hits[0].owner,
      key: ""
    }
  ] : hits.map((h, i) => ({
    arm: { ...arm, bindings: { ...arm.bindings }, unresolved: [...arm.unresolved], keys: [...arm.keys], trace: [...arm.trace] },
    value: h.anchor.value,
    owner: h.owner,
    key: `#f:${h.owner.id}#${i}`
  }));
  for (const step of stepped) {
    step.arm.bindings[name] = step.value;
    const keyed = step.key !== "" ? [...step.arm.keys, step.key] : step.arm.keys;
    const traced = step.owner !== node ? [...step.arm.trace, step.owner.id] : step.arm.trace;
    if (step.owner !== node) {
      const ownerNames = step.owner.anchors.filter((a) => a.role === "target" && typeof a.target === "string").map((a) => a.target);
      if (ownerNames.length > 0) {
        const sub = resolveNames(step.owner, ownerNames, { ...step.arm, keys: keyed, trace: traced }, slice, viable, kinds, path, depth + 1);
        outs.push(...sub);
        continue;
      }
    }
    outs.push({ ...step.arm, keys: keyed, trace: traced });
  }
  return outs;
}

// node_modules/provident-ssr/dist/core/debug.js
var enabled = false;
function compilePassLogEnabled() {
  return enabled;
}
function logCompilePass(nodes, focusNodeId) {
  if (!enabled)
    return;
  const focus = focusNodeId !== void 0 ? ` focus=${focusNodeId}` : "";
  console.info(`[compile] pass over ${nodes.length} node(s)${focus}: ${nodes.map((n) => `${n.id}(${n.state})`).join(" ")}`);
}

// node_modules/provident-ssr/dist/core/derived.js
function derivedInvalid(expr) {
  let shown = "<non-JSON value>";
  try {
    shown = JSON.stringify(expr) ?? "<non-JSON value>";
  } catch {
  }
  const err = new Error(`derived-invalid: malformed derived expression: ${shown}`);
  err.code = "derived-invalid";
  return err;
}
var BARE_ROOTS = ["content", "type", "pathKey", "placement"];
function validatePath(path) {
  if (typeof path !== "string" || path.length === 0)
    throw derivedInvalid(path);
  const parts = path.split(".");
  const root2 = parts[0];
  if (root2 === "props" || root2 === "bindings" || root2 === "css") {
    if (parts.length !== 2 || parts[1] === "")
      throw derivedInvalid(path);
    return;
  }
  if (root2 === "children" || root2 === "unresolved") {
    if (parts.length !== 2 || parts[1] !== "length")
      throw derivedInvalid(path);
    return;
  }
  if (BARE_ROOTS.includes(root2)) {
    if (parts.length !== 1)
      throw derivedInvalid(path);
    return;
  }
  throw derivedInvalid(path);
}
function validateExpr(expr) {
  if (expr === null || typeof expr === "string" || typeof expr === "number" || typeof expr === "boolean")
    return;
  if (typeof expr !== "object" || expr === null || Array.isArray(expr))
    throw derivedInvalid(expr);
  const o = expr;
  const keys = Object.keys(o);
  if (keys.length !== 1)
    throw derivedInvalid(expr);
  const form = keys[0];
  if (form === "$") {
    validatePath(o.$);
    return;
  }
  if (form === "$concat") {
    if (!Array.isArray(o.$concat) || o.$concat.length === 0)
      throw derivedInvalid(expr);
    for (const e of o.$concat)
      validateExpr(e);
    return;
  }
  if (form === "$if") {
    const body = o.$if;
    if (typeof body !== "object" || body === null || Array.isArray(body))
      throw derivedInvalid(expr);
    if (!("cond" in body))
      throw derivedInvalid(expr);
    const cond = body.cond;
    if (cond === void 0)
      throw derivedInvalid(expr);
    validateExpr(cond);
    if (!("then" in body) || body.then === void 0)
      throw derivedInvalid(expr);
    for (const k of ["then", "else"]) {
      if (k in body && body[k] !== void 0) {
        validateExpr(body[k]);
      }
    }
    return;
  }
  if (form === "$eq" || form === "$gt") {
    const pair = o[form];
    if (!Array.isArray(pair) || pair.length !== 2)
      throw derivedInvalid(expr);
    validateExpr(pair[0]);
    validateExpr(pair[1]);
    return;
  }
  throw derivedInvalid(expr);
}
function validateDerived(derived) {
  if (derived === void 0)
    return;
  if (typeof derived !== "object" || derived === null || Array.isArray(derived))
    throw derivedInvalid(derived);
  const decl = derived;
  const props = decl.props;
  if (props !== void 0) {
    if (typeof props !== "object" || props === null || Array.isArray(props))
      throw derivedInvalid(props);
    const record = props;
    for (const key of Object.keys(record)) {
      if (key === "id")
        throw derivedInvalid(record[key]);
      validateExpr(record[key]);
    }
  }
  const css = decl.css;
  if (css !== void 0) {
    if (typeof css !== "object" || css === null || Array.isArray(css))
      throw derivedInvalid(css);
    for (const key of Object.keys(css)) {
      validateExpr(css[key]);
    }
  }
}
function isTruthy(v) {
  if (v === false || v === null || v === void 0)
    return false;
  if (v === 0 || v === "")
    return false;
  return true;
}
function deepEquals(a, b) {
  if (a === b)
    return true;
  if (a === null || a === void 0 || b === null || b === void 0) {
    return (a === null || a === void 0) && (b === null || b === void 0);
  }
  if (Array.isArray(a)) {
    if (!Array.isArray(b) || a.length !== b.length)
      return false;
    for (let i = 0; i < a.length; i += 1) {
      if (!deepEquals(a[i], b[i]))
        return false;
    }
    return true;
  }
  if (typeof a === "object") {
    if (typeof b !== "object" || Array.isArray(b))
      return false;
    const ka = Object.keys(a).sort();
    const kb = Object.keys(b).sort();
    if (ka.length !== kb.length)
      return false;
    for (let i = 0; i < ka.length; i += 1) {
      if (ka[i] !== kb[i])
        return false;
      if (!deepEquals(a[ka[i]], b[kb[i]]))
        return false;
    }
    return true;
  }
  return false;
}
function concatPart(v) {
  if (v === null || v === void 0)
    return "";
  if (typeof v === "object")
    return JSON.stringify(v);
  return String(v);
}
function pathSourcePresent(path, ctx) {
  if (path.startsWith("bindings.") && path.length > "bindings.".length) {
    const key = path.slice("bindings.".length);
    return key.length > 0 && Object.prototype.hasOwnProperty.call(ctx.cs.bindings, key);
  }
  if (path.startsWith("props.") && path.length > "props.".length) {
    const key = path.slice("props.".length);
    return key.length > 0 && (ctx.node.props ?? {})[key] !== void 0;
  }
  return false;
}
function nullIsAuthored(expr, ctx) {
  if (expr === null)
    return true;
  if (typeof expr === "object" && expr !== null && !Array.isArray(expr)) {
    const o = expr;
    if (typeof o.$ === "string")
      return pathSourcePresent(o.$, ctx);
  }
  return false;
}
function pathValue(path, ctx) {
  const root2 = path.split(".")[0];
  switch (root2) {
    case "content":
      return ctx.node.content ?? null;
    case "type":
      return ctx.node.type;
    case "pathKey":
      return ctx.cs.pathKey;
    case "placement": {
      if (typeof ctx.cs.activePlacement === "string")
        return ctx.cs.activePlacement;
      const anchor = ctx.cs.anchors.find((a) => a.role === "container");
      return anchor && typeof anchor.target === "string" ? anchor.target : null;
    }
    case "children":
      return path === "children.length" ? ctx.cs.children.length : null;
    case "unresolved":
      return path === "unresolved.length" ? ctx.cs.unresolved.length : null;
    case "props": {
      const key = path.slice("props.".length);
      return key.length > 0 ? ctx.node.props[key] ?? null : null;
    }
    case "css": {
      const key = path.slice("css.".length);
      return key.length > 0 ? ctx.node.css[key] ?? null : null;
    }
    case "bindings": {
      const key = path.slice("bindings.".length);
      return key.length > 0 ? ctx.cs.bindings[key] ?? null : null;
    }
    default:
      return null;
  }
}
function evaluateDerived(expr, ctx) {
  if (expr === null || typeof expr === "string" || typeof expr === "number" || typeof expr === "boolean")
    return expr;
  if (typeof expr !== "object" || expr === null || Array.isArray(expr))
    return null;
  const o = expr;
  if ("$" in o && typeof o.$ === "string")
    return pathValue(o.$, ctx);
  if ("$concat" in o && Array.isArray(o.$concat)) {
    return o.$concat.map((e) => concatPart(evaluateDerived(e, ctx))).join("");
  }
  if ("$if" in o && typeof o.$if === "object" && o.$if !== null) {
    const body = o.$if;
    if (!("cond" in body))
      return null;
    const cond = evaluateDerived(body.cond, ctx);
    if (isTruthy(cond)) {
      return "then" in body ? evaluateDerived(body.then, ctx) : null;
    }
    return "else" in body && body.else !== void 0 ? evaluateDerived(body.else, ctx) : null;
  }
  if ("$eq" in o && Array.isArray(o.$eq)) {
    const pair = o.$eq;
    return deepEquals(evaluateDerived(pair[0], ctx), evaluateDerived(pair[1], ctx));
  }
  if ("$gt" in o && Array.isArray(o.$gt)) {
    const pair = o.$gt;
    const a = evaluateDerived(pair[0], ctx);
    const b = evaluateDerived(pair[1], ctx);
    if (typeof a === "number" && typeof b === "number")
      return a > b;
    if (typeof a === "string" && typeof b === "string")
      return a > b;
    return null;
  }
  return null;
}
function applyDerived(node, cs) {
  const decl = node.derived;
  if (!decl)
    return void 0;
  let evaluatedProps;
  const props = decl.props;
  if (props) {
    const evaluated = {};
    for (const key of Object.keys(props)) {
      const value = evaluateDerived(props[key], { node, cs });
      if (value === void 0)
        continue;
      if (value === null && !nullIsAuthored(props[key], { node, cs }))
        continue;
      evaluated[key] = value;
    }
    if (Object.keys(evaluated).length > 0)
      evaluatedProps = { ...cs.props, ...evaluated };
  }
  let evaluatedCss;
  const css = decl.css;
  if (css?.classes !== void 0) {
    const value = evaluateDerived(css.classes, { node, cs });
    if (value !== void 0 && value !== null) {
      const host = Array.isArray(cs.css.classes) ? cs.css.classes : [];
      const injected = Array.isArray(value) ? value.slice() : [value];
      evaluatedCss = { ...cs.css, classes: [...host, ...injected] };
    }
  }
  if (!evaluatedProps && !evaluatedCss)
    return void 0;
  return {
    ...evaluatedProps ? { props: evaluatedProps } : {},
    ...evaluatedCss ? { css: evaluatedCss } : {}
  };
}

// node_modules/provident-ssr/dist/core/ops.js
function toNode(value) {
  return value;
}
function detachNodeSafe(node) {
  const ca = node.childAnchor();
  if (!ca) {
    markPending(node);
    return;
  }
  const link = ca.link;
  const idx = link.anchors.indexOf(ca);
  if (idx !== -1)
    link.anchors.splice(idx, 1);
  const nIdx = node.anchors.indexOf(ca);
  if (nIdx !== -1)
    node.anchors.splice(nIdx, 1);
  markPending(node);
  if (link.anchorsOf("child").length === 0) {
    const pa = link.anchorsOf("parent")[0];
    if (pa && typeof pa.target === "object" && pa.target !== null) {
      const owner = pa.target;
      const oi = owner.anchors.indexOf(pa);
      if (oi !== -1)
        owner.anchors.splice(oi, 1);
    }
    link.anchors.length = 0;
  }
}
function placementAttach(node, container, names, hub) {
  const attachZone = names[0];
  if (typeof attachZone !== "string" || attachZone.length === 0) {
    throw new ApplyError("placement-target-blocked", { detail: "placement-attach requires at least one requested container name" });
  }
  for (const name of names) {
    if (typeof name !== "string" || name.length === 0)
      continue;
    if (node.anchors.some((a) => a.role === "content" && a.target === name))
      continue;
    node.addAnchor("content", name, {}, hub.linkFor(name, "placement"));
  }
  let containerAnchorMinted = false;
  const existing = container.anchors.find((a) => a.role === "container" && a.target === attachZone);
  if (!existing) {
    if (ancestorConsumesZone(container, attachZone)) {
      console.warn(`[placement-attach] placement-name-vetoed: an ancestor of ${container.id} already offers zone "${attachZone}"; container anchor skipped (P3 \xA71.3)`);
    } else {
      container.addAnchor("container", attachZone, {}, hub.linkFor(attachZone, "placement"));
      containerAnchorMinted = true;
    }
  }
  return { containerAnchorMinted, attachZone };
}
function derivePlacementTrigger(linkName, containerAnchorMinted) {
  return { kind: "placement", linkName, direction: containerAnchorMinted ? "container-added" : "content-added" };
}
function layerApply(op, ctx) {
  const target = toNode(op.target);
  if (target.layers.some((l) => l.id === op.layerId))
    return { minted: [], doorways: [target.id] };
  const minted = [];
  const link = target.familyLinkFor();
  const scope = ctx.graphScope ?? scopeOf(target);
  let priority = link.anchorsOf("child").reduce((m, a) => Math.max(m, a.options.priority ?? 0), -1) + 1;
  for (const nd of op.nodes ?? []) {
    const { anchors, ...data } = nd;
    if (anchors !== void 0) {
      console.warn(`layer-apply-anchors-rejected at ${target.id}: seed anchors are not minted by layer-apply (v1 mints family children only)`);
    }
    const node = new Node(data, target.hubFor ?? ctx.hub ?? void 0, void 0, false, scope);
    node.originLayer = op.layerId;
    registerMinted(node.id, op.layerId, scope);
    minted.push(node.id);
    node.addAnchor("child", node, { priority }, link);
    priority += 1;
  }
  const decls = (op.decls ?? []).map((d) => d.role === "child" ? { ...d, options: { ...d.options ?? {}, origin: op.layerId } } : d);
  target.addLayer({ id: op.layerId, sourceName: op.sourceName, anchors: decls, ...op.preserveByReversal !== void 0 ? { preserveByReversal: op.preserveByReversal } : {} });
  return { minted, doorways: [target.id, ...minted] };
}
function rowsMint(op, ctx) {
  const target = toNode(op.target);
  const layerId = `hook-${target.id}-${op.hookName}-rows`;
  const hub = target.hubFor ?? ctx.hub ?? void 0;
  const scope = ctx.graphScope ?? scopeOf(target);
  if (op.mintKind === "placement" && op.placementName === void 0) {
    throw new ApplyError("rows-placement-name-missing", { hookName: op.hookName });
  }
  const rows = op.rows;
  if (rows !== void 0 && !Array.isArray(rows)) {
    throw new ApplyError("rows-shape-invalid", { hookName: op.hookName, reason: "non-array rows" });
  }
  const rowList = rows ?? [];
  for (const row of rowList) {
    if (row === null || typeof row !== "object" || Array.isArray(row)) {
      throw new ApplyError("rows-shape-invalid", { hookName: op.hookName, reason: "non-object row" });
    }
  }
  const protoLink = hub.linkFor(op.prototypeName, "component");
  const protos = defPrototypesFor(protoLink, scope);
  let shape;
  if (protos.length > 0) {
    shape = protos[0];
  } else {
    shape = defRootPrototypeFor(protoLink, scope);
  }
  if (shape === void 0) {
    console.warn(`rows-prototype-unresolved at ${target.id}: prototype "${op.prototypeName}" has no def prototypes; rows-mint rejected`);
    throw new ApplyError("rows-prototype-unresolved", { prototypeName: op.prototypeName });
  }
  const batches = target.batches ?? {};
  const preRecord = batches[op.hookName] ?? null;
  const existing = target.layers.find((l) => l.id === layerId);
  if (rowList.length === 0) {
    if (existing !== void 0) {
      target.rowsTeardown(layerId);
      target.removeLayer(layerId);
    }
    delete batches[op.hookName];
    return { minted: [], doorways: [target.id], layerId, reused: [], removed: [], preRecord: null };
  }
  const keyField = op.keyField;
  let keyed = false;
  if (keyField !== void 0) {
    const reserved = /* @__PURE__ */ new Set(["anchors", "type", "css", "children", "props", "content", "handlers"]);
    const invalid = (reason) => {
      console.warn(`batch-keyfield-invalid at ${target.id}: ${reason}; rows-mint degraded to the plain whole-batch path`);
    };
    if (typeof keyField !== "string" || keyField.length === 0 || reserved.has(keyField)) {
      invalid(`keyField "${String(keyField)}" is not a legal declared column`);
    } else if (!rowList.every((r) => {
      const v = r[keyField];
      return v !== void 0 && v !== null && (typeof v === "string" || typeof v === "number" || typeof v === "boolean");
    })) {
      invalid(`a row lacks a primitive "${keyField}" value`);
    } else if (preRecord !== null && preRecord.keyField !== void 0 && preRecord.keyField !== keyField) {
      invalid(`the batch record's keyField ("${preRecord.keyField}") differs from the op's ("${keyField}")`);
    } else if (preRecord !== null && (preRecord.prototypeName !== op.prototypeName || (preRecord.placementName ?? void 0) !== op.placementName)) {
      invalid(`the batch record's prototype/zone mismatch the op`);
    } else {
      keyed = true;
    }
  }
  if (!keyed) {
    if (existing !== void 0) {
      target.rowsTeardown(layerId);
      target.removeLayer(layerId);
    }
    const minted2 = [];
    const fam2 = target.familyLinkFor();
    let priority2 = fam2.anchorsOf("child").reduce((m, a) => Math.max(m, a.options.priority ?? 0), -1) + 1;
    for (const row of rowList) {
      const mintedNode = mintRowNode(row, shape, hub, fam2, layerId, priority2, target, op, scope);
      priority2 += 1;
      minted2.push(mintedNode.id);
    }
    const decls2 = minted2.map((_, i) => ({ role: "child", target, options: { priority: i, origin: layerId } }));
    target.addLayer({ id: layerId, sourceName: op.sourceName ?? "rows-mint", anchors: decls2, ...op.preserveByReversal !== void 0 ? { preserveByReversal: op.preserveByReversal } : {} });
    const batch2 = {
      prototypeName: op.prototypeName,
      rows: op.rows,
      layerId,
      mintKind: op.mintKind,
      ...op.placementName !== void 0 ? { placementName: op.placementName } : {}
    };
    batches[op.hookName] = batch2;
    return { minted: minted2, doorways: [target.id, ...minted2], layerId, reused: [], removed: [], preRecord: null };
  }
  const kf = keyField;
  const existingNodes = /* @__PURE__ */ new Map();
  const unmatchable = [];
  for (const id of mintedByOrigin(layerId, scope)) {
    const n = scope.byId.get(id);
    if (!n)
      continue;
    if (n.parent !== target)
      continue;
    const keyAnchor = n.anchors.find((a) => a.role === "source" && a.target === kf);
    if (!keyAnchor) {
      unmatchable.push(n);
      continue;
    }
    existingNodes.set(keyAnchor.value, n);
  }
  const seen = /* @__PURE__ */ new Set();
  const rowsToApply = [];
  for (const row of rowList) {
    const key = row[kf];
    if (seen.has(key)) {
      console.warn(`duplicate-identifier at ${target.id}: rows-mint keyed on "${kf}" saw the identifier ${JSON.stringify(key)} twice; keep-first`);
      continue;
    }
    seen.add(key);
    rowsToApply.push(row);
  }
  const inputKeys = new Set(rowsToApply.map((r) => r[kf]));
  const removed = [];
  for (const [key, node] of existingNodes) {
    if (!inputKeys.has(key))
      removed.push({ key, nodeId: node.id });
  }
  for (const node of unmatchable)
    removed.push({ key: void 0, nodeId: node.id });
  for (const { nodeId } of removed) {
    const node = scope.byId.get(nodeId);
    if (!node)
      continue;
    detachNodeSafe(node);
    node.originLayer = void 0;
    unregisterMinted(node.id, scope);
  }
  const fam = target.familyLinkFor();
  let priority = fam.anchorsOf("child").reduce((m, a) => Math.max(m, a.options.priority ?? 0), -1) + 1;
  const minted = [];
  const reused = [];
  for (const row of rowsToApply) {
    const key = row[kf];
    const node = existingNodes.get(key);
    if (node) {
      if (reconcileRowFields(node, row, kf, target, hub))
        reused.push(node.id);
    } else {
      const mintedNode = mintRowNode(row, shape, hub, fam, layerId, priority, target, op, scope);
      priority += 1;
      minted.push(mintedNode.id);
    }
  }
  const decls = [...fam.anchorsOf("child")].filter((a) => {
    const owner = typeof a.target === "object" && a.target !== null ? a.target : void 0;
    return owner !== void 0 && owner.originLayer === layerId;
  }).sort((x, y) => (x.options.priority ?? 0) - (y.options.priority ?? 0)).map((a, i) => ({ role: "child", target, options: { priority: a.options.priority ?? i, origin: layerId } }));
  target.addLayer({ id: layerId, sourceName: op.sourceName ?? "rows-mint", anchors: decls, ...op.preserveByReversal !== void 0 ? { preserveByReversal: op.preserveByReversal } : {} });
  const batch = {
    prototypeName: op.prototypeName,
    rows: op.rows,
    layerId,
    mintKind: op.mintKind,
    ...op.placementName !== void 0 ? { placementName: op.placementName } : {},
    keyField: kf
  };
  batches[op.hookName] = batch;
  return { minted, reused, removed, layerId, preRecord, doorways: [target.id, ...minted] };
}
var RESERVED_CONSTRUCTION_KEYS = /* @__PURE__ */ new Set(["anchors", "type", "css", "children", "props", "content", "handlers"]);
function mintRowNode(rowObj, shape, hub, fam, layerId, priority, target, op, scope) {
  const { id: _rowId, anchors: _rowAnchors, ...fields } = rowObj;
  if (_rowAnchors !== void 0) {
    console.warn(`rows-mint-anchors-rejected at ${target.id}: row anchors are not admitted by rows-mint (smuggled edges never materialize); ignored`);
  }
  const node = new Node({ ...fields, type: fields.type ?? shape.type, css: fields.css ?? shape.css }, hub, void 0, false, scope);
  node.originLayer = layerId;
  registerMinted(node.id, layerId, scope);
  node.addAnchor("child", node, { priority }, fam);
  for (const key of Object.keys(rowObj)) {
    if (RESERVED_CONSTRUCTION_KEYS.has(key))
      continue;
    const fieldLink = hub.linkFor(key, "component");
    const anchor = node.addAnchor("source", key, {}, fieldLink);
    if (anchor !== null)
      anchor.value = rowObj[key];
  }
  if (op.mintKind === "placement" && op.placementName !== void 0) {
    node.addAnchor("content", op.placementName, {}, hub.linkFor(op.placementName, "placement"));
  }
  return node;
}
function reconcileRowFields(node, row, keyField, target, hub) {
  for (const k of ["type", "css", "props", "content", "children", "handlers"]) {
    if (row[k] === void 0)
      continue;
    const current = k === "type" ? node.type : node.base[k];
    const differs = k === "css" || k === "props" ? JSON.stringify(row[k]) !== JSON.stringify(current) : row[k] !== current;
    if (differs) {
      console.warn(`rows-reuse-shape-ignored at ${target.id}: row field "${k}" differs from the reused node's frozen shape; the shape stays (drop keyField for a whole-op replace)`);
    }
  }
  let changed = false;
  const rowFields = /* @__PURE__ */ new Set();
  for (const key of Object.keys(row)) {
    if (key === keyField || RESERVED_CONSTRUCTION_KEYS.has(key))
      continue;
    rowFields.add(key);
    const existingAnchor = node.anchors.find((a) => a.role === "source" && a.target === key);
    if (existingAnchor) {
      if (existingAnchor.value !== row[key]) {
        existingAnchor.value = row[key];
        changed = true;
      }
    } else {
      const fieldLink = hub?.linkFor(key, "component");
      if (fieldLink) {
        const anchor = node.addAnchor("source", key, {}, fieldLink);
        if (anchor !== null) {
          anchor.value = row[key];
          changed = true;
        }
      }
    }
  }
  for (const a of [...node.anchors]) {
    if (a.role !== "source" || typeof a.target !== "string")
      continue;
    if (a.target === keyField)
      continue;
    if (!rowFields.has(a.target)) {
      node.removeAnchor(a);
      changed = true;
    }
  }
  return changed;
}
function rowsClear(op, ctx) {
  const target = toNode(op.target);
  const batches = target.batches ?? {};
  const record = batches[op.hookName];
  if (record === void 0)
    return { doorways: [target.id] };
  const scope = ctx.graphScope ?? scopeOf(target);
  const minted = mintedByOrigin(record.layerId, scope);
  delete batches[op.hookName];
  target.rowsTeardown(record.layerId);
  target.removeLayer(record.layerId);
  return { doorways: [target.id], layerId: record.layerId, minted };
}

// node_modules/provident-ssr/dist/core/legacy-handlers.js
var views = /* @__PURE__ */ new WeakMap();
var dispatchWarnState;
function unsupportedQueryWarn() {
  if (dispatchWarnState !== void 0) {
    if (dispatchWarnState.warnedUnsupported)
      return;
    dispatchWarnState.warnedUnsupported = true;
  }
  console.warn("[legacy-bridge] legacy-query-unsupported: the query asked for a key outside the honest vocabulary (type / id / classes / props / predicate); no match returned \u2014 never a silent broad match");
}
function matchQuery(node, query) {
  let unsupported = false;
  for (const [key, value] of Object.entries(query)) {
    switch (key) {
      case "type":
        if (typeof value !== "string" || node.type !== value)
          return false;
        break;
      case "id":
        if (typeof value !== "string" || node.css.id !== value)
          return false;
        break;
      case "classes": {
        const want = Array.isArray(value) ? value : typeof value === "string" ? [value] : null;
        if (want === null)
          return false;
        const classes = Array.isArray(node.css?.classes) ? node.css.classes : [];
        for (const c of want) {
          if (!classes.includes(c))
            return false;
        }
        break;
      }
      case "props": {
        if (typeof value !== "object" || value === null || Array.isArray(value))
          return false;
        for (const [k, v] of Object.entries(value)) {
          if (node.props[k] !== v)
            return false;
        }
        break;
      }
      default:
        unsupported = true;
    }
  }
  return unsupported ? "unsupported" : true;
}
function componentsOf(node, side) {
  const map = /* @__PURE__ */ new Map();
  for (const a of node.anchors) {
    if (typeof a.target !== "string")
      continue;
    const isSide = side === "target" ? a.role === "target" : a.role === "source" || a.role === "duplex";
    if (isSide && !map.has(a.target))
      map.set(a.target, { reference: a.target });
  }
  return map;
}
function cssValue(key, value) {
  if (key === "style" && typeof value === "object" && value !== null && !Array.isArray(value)) {
    return serializeStyle(value);
  }
  return value;
}
function mutationFrom(payload) {
  const mutation = [];
  if (payload.type !== void 0)
    mutation.push({ targetProp: "type", mode: "replace", value: payload.type });
  if (payload.content !== void 0)
    mutation.push({ targetProp: "content", mode: "replace", value: payload.content });
  if (payload.props !== void 0 && typeof payload.props === "object" && payload.props !== null && !Array.isArray(payload.props)) {
    for (const [key, value] of Object.entries(payload.props)) {
      mutation.push({ targetProp: `props.${key}`, mode: "replaceAll", value });
    }
  }
  if (payload.css !== void 0 && typeof payload.css === "object" && payload.css !== null && !Array.isArray(payload.css)) {
    for (const [key, value] of Object.entries(payload.css)) {
      mutation.push({ targetProp: `css.${key}`, mode: "replaceAll", value: cssValue(key, value) });
    }
  }
  if (payload.handlers !== void 0)
    mutation.push({ targetProp: "handlers", mode: "replace", value: payload.handlers });
  return mutation;
}
function nodeDataFrom(entry) {
  if (entry instanceof NodeViewImpl) {
    const css = { ...entry.css };
    if (typeof css.style === "object" && css.style !== null)
      css.style = serializeStyle(css.style);
    return { type: entry.type, content: entry.content, props: { ...entry.props }, css };
  }
  return entry;
}
var NodeViewImpl = class {
  node;
  svc;
  constructor(node, svc) {
    this.node = node;
    this.svc = svc;
  }
  get parent() {
    const p = this.node.parent;
    return p ? getNodeView(p, this.svc) : null;
  }
  get children() {
    return this.node.children.map((c) => getNodeView(c, this.svc));
  }
  get css() {
    const css = { ...this.node.css };
    if (typeof css.style === "string")
      css.style = parseStyle(css.style);
    return css;
  }
  get data() {
    return {
      type: this.node.type,
      props: { ...this.node.props },
      css: this.css,
      content: this.node.content,
      handlers: this.node.handlers
    };
  }
  get state() {
    return this.node.state;
  }
  get id() {
    return this.node.id;
  }
  get type() {
    return this.node.type;
  }
  get props() {
    return { ...this.node.props };
  }
  get content() {
    return this.node.content;
  }
  get handlers() {
    return this.node.handlers;
  }
  get targetComponents() {
    return componentsOf(this.node, "target");
  }
  get sourceComponents() {
    return componentsOf(this.node, "source");
  }
  findNode(query) {
    const all = this.findNodes(query);
    return all.length > 0 ? all[0] : null;
  }
  findNodes(query) {
    const out = [];
    const order = [this.node];
    for (let i = 0; i < order.length; i++) {
      order.push(...order[i].children);
    }
    for (const n of order) {
      const match = typeof query === "function" ? query(getNodeView(n, this.svc)) : matchQuery(n, query);
      if (match === "unsupported") {
        unsupportedQueryWarn();
        return [];
      }
      if (match === true)
        out.push(getNodeView(n, this.svc));
    }
    return out;
  }
  receiveNextState(payload) {
    const nodeRef = this.node.id;
    const { children, ...rest } = payload ?? {};
    if (children !== void 0) {
      if (!Array.isArray(children)) {
        return { status: "rejected", error: { code: "children-shape-invalid", detail: "receiveNextState({children}) requires a NodeData[] payload" } };
      }
      const layerId = `legacy-kids-${nodeRef}`;
      const decls = children.map((_, i) => ({ role: "child", target: this.node, options: { priority: i } }));
      const result = this.svc.clientAPI.apply(nodeRef, {
        kind: "layer-apply",
        target: this.node,
        layerId,
        sourceName: "legacy-bridge",
        decls,
        nodes: children.map((c) => nodeDataFrom(c))
      });
      const restMutation = mutationFrom(rest);
      if (restMutation.length > 0 && result.status === "applied") {
        this.svc.clientAPI.apply(nodeRef, { kind: "state-slice", mutation: restMutation });
      }
      return result;
    }
    return this.svc.clientAPI.apply(nodeRef, { kind: "state-slice", mutation: mutationFrom(rest) });
  }
};
function getNodeView(node, services) {
  let v = views.get(node);
  if (!v) {
    v = new NodeViewImpl(node, services);
    views.set(node, v);
  }
  return v;
}
function eventStub(ctx, event, args) {
  const stub = {
    type: event,
    preventDefault() {
    },
    stopPropagation() {
    },
    target: ctx.node ? getNodeView(ctx.node, { clientAPI: ctx.clientAPI, supervisor: ctx.supervisor, tree: ctx.tree }) : void 0,
    isTrusted: false
  };
  if (args.length > 0)
    stub.value = args[0];
  return stub;
}
function legacyContext(ctx) {
  const node = ctx.node;
  dispatchWarnState = { warnedUnsupported: false };
  const svc = { clientAPI: ctx.clientAPI, supervisor: ctx.supervisor, tree: ctx.tree };
  const out = {
    node: getNodeView(node, svc),
    supervisor: supervisorWithUserData(ctx.supervisor),
    clientAPI: ctx.clientAPI,
    rootNode: rootViewOf(node, svc),
    tree: ctx.tree
  };
  if (ctx.states !== void 0)
    out.states = ctx.states;
  return out;
}
function supervisorWithUserData(sup) {
  return new Proxy(sup, {
    get(target, prop, receiver) {
      if (prop === "userData")
        return getTranslateUserData(sup.graphScope ?? void 0);
      return Reflect.get(target, prop, receiver);
    },
    set(target, prop, value, receiver) {
      if (prop === "userData")
        return false;
      return Reflect.set(target, prop, value, receiver);
    }
  });
}
function rootViewOf(node, svc) {
  let top = node;
  let cur = node;
  while (cur) {
    top = cur;
    cur = cur.parent;
  }
  return top ? getNodeView(top, svc) : null;
}
function wrapLegacyHandler(body, event) {
  return (ctx, ...args) => {
    const scoped = ctx;
    return body(eventStub(scoped, event, args), legacyContext(scoped));
  };
}

// node_modules/provident-ssr/dist/core/client.js
function createClient(supervisor) {
  return {
    apply(nodeRef, mutation) {
      const node = supervisor.getNode(nodeRef);
      if (!node)
        return { status: "rejected", error: { code: "unknown-node" } };
      let op;
      if (Array.isArray(mutation)) {
        op = { kind: "state-slice", node, mutation };
      } else if (typeof mutation === "object" && mutation !== null) {
        const m = mutation;
        op = { ...m, node };
        if (!op.kind) {
          op.kind = "state-slice";
          op.mutation = [m];
        }
        for (const refKey of ["to", "source", "container", "target"]) {
          if (typeof op[refKey] === "string") {
            const resolved = supervisor.getNode(op[refKey]);
            if (resolved)
              op[refKey] = resolved;
          }
        }
        const par = op.to;
        if (par && typeof par.parent === "string") {
          const resolved = supervisor.getNode(par.parent);
          if (resolved)
            op.to.parent = resolved;
        }
      } else {
        return { status: "rejected", error: { code: "unknown-op" } };
      }
      const result = supervisor.apply(op);
      if (result.status === "rejected") {
        return result;
      }
      if (result.status === "no-usable-state") {
        return { status: "no-usable-state", nodeState: node.state };
      }
      return result;
    },
    getState(nodeRef) {
      const node = supervisor.getNode(nodeRef);
      if (!node)
        return [];
      const slice = [...supervisor.allNodes()];
      const cr = node.compile(slice);
      const mine = cr.actionable.filter((cs) => cs.nodeId === nodeRef);
      if (mine.length === 0)
        return [];
      return mine.map((cs) => {
        let status = "ok";
        if (cs.unresolved.length > 0)
          status = "unresolved-reference";
        return { nodeId: cs.nodeId, status, pathKey: cs.pathKey, state: cs.state };
      });
    }
  };
}

// node_modules/provident-ssr/dist/core/handlers.js
function makeHandlerContext(supervisor, clientAPI) {
  return {
    clientAPI,
    supervisor,
    tree: {
      getNode: (id) => supervisor.getNode(id),
      allNodes: () => supervisor.allNodes(),
      ancestorsOf(node) {
        const out = [];
        let cur = node.parent;
        while (cur) {
          out.push(cur);
          cur = cur.parent;
        }
        return out;
      },
      descendantsOf(node) {
        const out = [];
        const stack = [...node.children];
        while (stack.length > 0) {
          const cur = stack.pop();
          out.push(cur);
          stack.push(...cur.children);
        }
        return out;
      },
      getState: (id) => supervisor.getResolvedStates(id)
    }
  };
}
function handlersOf(node) {
  return node.handlers ?? [];
}
function scopedFor(node, ctx) {
  if (!ctx || ctx.node === node)
    return ctx;
  return { ...ctx, node, states: ctx.supervisor?.getResolvedStates(node.id) ?? [] };
}
function dispatchEvent(node, ctx, event, ...args) {
  const results = [];
  const scoped = scopedFor(node, ctx);
  for (const handler of handlersOf(node)) {
    if (handler.event !== event && handler.name !== event)
      continue;
    if (typeof handler.body !== "function")
      continue;
    try {
      results.push(handler.body(scoped, ...args));
    } catch (e) {
      results.push(e);
    }
  }
  return results;
}
function dispatchPhase(node, ctx, phase) {
  const results = [];
  const scoped = scopedFor(node, ctx);
  for (const handler of handlersOf(node)) {
    if (handler.phase !== phase)
      continue;
    if (typeof handler.body !== "function")
      continue;
    try {
      results.push(handler.body(scoped));
    } catch (e) {
      results.push(e);
    }
  }
  return results;
}
function dispatchPhaseForNodes(nodes, ctx, phase) {
  const results = [];
  for (const node of nodes)
    results.push(...dispatchPhase(node, ctx, phase));
  return results;
}

// node_modules/provident-ssr/dist/core/serialize.js
function targetKey(target) {
  if (typeof target === "string")
    return target;
  const id = target.id;
  if (typeof id !== "string")
    throw new Error("serialization-error: live anchor target");
  return id;
}
function assertJsonSafe(value, seen) {
  if (value === null || value === void 0)
    return;
  const type = typeof value;
  if (type === "string" || type === "number" || type === "boolean")
    return;
  if (type === "function" || type === "symbol" || type === "bigint") {
    throw new Error("serialization-error: non-JSON value");
  }
  const visited = seen ?? /* @__PURE__ */ new WeakSet();
  if (visited.has(value))
    throw new Error("serialization-error: circular reference");
  visited.add(value);
  if (Array.isArray(value)) {
    for (const item of value)
      assertJsonSafe(item, visited);
    return;
  }
  for (const key of Object.keys(value))
    assertJsonSafe(value[key], visited);
}
function cssState(css) {
  const out = {};
  if (typeof css.id === "string")
    out.id = css.id;
  if (Array.isArray(css.classes) && css.classes.every((c) => typeof c === "string"))
    out.classes = css.classes;
  if (typeof css.style === "string")
    out.style = css.style;
  if (css.cssDef !== void 0)
    out.cssDef = css.cssDef;
  return out;
}
function serializeNode(node) {
  const props = node.props;
  const content = node.content;
  assertJsonSafe(props);
  assertJsonSafe(content);
  const shipped = { ...props };
  const derivedKeys = Object.keys(node.derived?.props ?? {});
  for (const k of derivedKeys)
    delete shipped[k];
  const state = {
    id: node.id,
    state: "in-tree",
    type: node.type,
    props: shipped,
    css: cssState(node.css),
    // ADVERSARIAL-S4 — the children REFS never include derived (minted)
    // nodes either: the serialized doc is self-consistent (no dangling
    // refs to excluded row states).
    children: node.children.filter((c) => c.originLayer === void 0 && !c.runtimeMinted).map((child) => child.id),
    anchors: node.anchors.map((a) => {
      if (a.value !== void 0)
        assertJsonSafe(a.value);
      let parent;
      if (a.role === "child" && typeof a.target === "object" && a.target !== null && a.target.id === node.id) {
        const parentAnchor = a.link.anchorsOf("parent")[0];
        if (parentAnchor) {
          if (typeof parentAnchor.target === "string") {
            parent = parentAnchor.target;
          } else if (typeof parentAnchor.target === "object" && parentAnchor.target !== null) {
            parent = parentAnchor.target.id;
          }
        }
      }
      return {
        role: a.role,
        target: targetKey(a.target),
        options: { ...a.options },
        link: a.link.id,
        value: a.value,
        ...parent !== void 0 ? { parent } : {}
      };
    })
  };
  if (content !== void 0)
    state.content = content;
  if (node.base.bodyRuns !== void 0) {
    assertJsonSafe(node.base.bodyRuns);
    state.bodyRuns = node.base.bodyRuns;
  }
  if (node.derived !== void 0)
    state.derived = node.derived;
  if (node.base.hooks !== void 0 && node.base.hooks.length > 0)
    state.hooks = [...node.base.hooks];
  if (node.base.hooksKind !== void 0 && Object.keys(node.base.hooksKind).length > 0)
    state.hooksKind = { ...node.base.hooksKind };
  if (node.batches && Object.keys(node.batches).length > 0) {
    assertJsonSafe(node.batches);
    state.batches = { ...node.batches };
  }
  state.anchors.sort((x, y) => {
    const roleOrder = { child: 0, parent: 1, source: 2, duplex: 3, target: 4, container: 5, content: 6, component: 7 };
    const r = (roleOrder[x.role] ?? 9) - (roleOrder[y.role] ?? 9);
    if (r !== 0)
      return r;
    if (x.role === "content" && y.role === "content")
      return 0;
    const tx = typeof x.target === "string" ? x.target : x.target.id;
    const ty = typeof y.target === "string" ? y.target : y.target.id;
    return tx < ty ? -1 : tx > ty ? 1 : 0;
  });
  return state;
}
function serializeSlice(node, kids, clientConfig) {
  const isDerived = (n) => n.originLayer !== void 0 || n.runtimeMinted;
  const contentKids = kids.filter((k) => !isDerived(k));
  const content = contentKids.map(serializeNode);
  const sliceSet = /* @__PURE__ */ new Set([node, ...contentKids]);
  const census = [];
  const prototypeInstances = /* @__PURE__ */ new Set();
  const myScope = scopeOf(node);
  for (const [link, root2] of defRootPrototypeEntries(myScope)) {
    const name = defNameForLink(link);
    if (name === void 0)
      continue;
    if (!sliceSet.has(root2))
      continue;
    census.push({ name, nodeId: root2.id, isRoot: true });
    prototypeInstances.add(root2);
  }
  for (const [link, protos] of defPrototypeEntries(myScope)) {
    const name = defNameForLink(link);
    if (name === void 0)
      continue;
    for (const p of protos) {
      if (!sliceSet.has(p))
        continue;
      census.push({ name, nodeId: p.id, isRoot: false });
      prototypeInstances.add(p);
    }
  }
  if (census.length > 0) {
    for (let i = 0; i < content.length; i += 1) {
      const kid = contentKids[i];
      if (!prototypeInstances.has(kid))
        continue;
      const state = content[i];
      state.anchors = state.anchors.filter((a) => !(a.role === "child" && a.options?.seam));
    }
  }
  const doc = {
    template: serializeNode(node),
    content,
    clientConfig: clientConfig ?? { adapter: "dom", persistence: false }
  };
  if (census.length > 0)
    doc.defPrototypes = census;
  return doc;
}
function assertNoLiveTargets(v) {
  if (typeof v !== "object" || v === null)
    return;
  const anchors = v.anchors;
  if (!Array.isArray(anchors))
    return;
  for (const a of anchors) {
    if (typeof a !== "object" || a === null)
      throw new Error("schema-boundary: malformed anchor");
    const target = a.target;
    if (typeof target !== "string")
      throw new Error("schema-boundary: live anchor target");
  }
}
function parseNodeState(v) {
  if (typeof v !== "object" || v === null || Array.isArray(v))
    throw new Error("NodeSchema-shape-mismatch");
  const o = v;
  if (typeof o.id !== "string")
    throw new Error("NodeSchema-shape-mismatch");
  assertNoLiveTargets(o);
  const seed = { id: o.id };
  if (typeof o.type === "string")
    seed.type = o.type;
  if (o.props !== void 0) {
    if (typeof o.props !== "object" || o.props === null || Array.isArray(o.props))
      throw new Error("NodeSchema-shape-mismatch");
    seed.props = o.props;
  }
  if (o.css !== void 0) {
    if (typeof o.css !== "object" || o.css === null || Array.isArray(o.css))
      throw new Error("NodeSchema-shape-mismatch");
    seed.css = o.css;
  }
  if (o.children !== void 0) {
    if (!Array.isArray(o.children))
      throw new Error("NodeSchema-shape-mismatch");
    for (const c of o.children)
      if (typeof c !== "string")
        throw new Error("NodeSchema-shape-mismatch");
    seed.children = o.children;
  }
  if (o.content !== void 0)
    seed.content = o.content;
  if (o.bodyRuns !== void 0) {
    if (Array.isArray(o.bodyRuns) && o.bodyRuns.every((r) => r !== null && typeof r === "object" && ("text" in r && typeof r.text === "string" || "child" in r && typeof r.child === "string"))) {
      seed.bodyRuns = o.bodyRuns;
    }
  }
  if (o.anchors !== void 0) {
    if (!Array.isArray(o.anchors))
      throw new Error("NodeSchema-shape-mismatch");
    seed.anchors = o.anchors;
  }
  if (typeof o.forkKey === "string")
    seed.forkKey = o.forkKey;
  if (o.derived !== void 0) {
    validateDerived(o.derived);
    seed.derived = o.derived;
  }
  if (o.hooks !== void 0) {
    if (!Array.isArray(o.hooks) || o.hooks.some((h) => typeof h !== "string")) {
      throw new Error("NodeSchema-shape-mismatch");
    }
    seed.hooks = o.hooks;
  }
  if (o.hooksKind !== void 0) {
    if (typeof o.hooksKind !== "object" || o.hooksKind === null || Array.isArray(o.hooksKind) || Object.keys(o.hooksKind).length === 0) {
      throw new Error("NodeSchema-shape-mismatch");
    }
    for (const [name, kind] of Object.entries(o.hooksKind)) {
      if (name.length === 0 || typeof kind !== "string" || kind !== "value" && kind !== "component" && kind !== "placement") {
        throw new Error("NodeSchema-shape-mismatch");
      }
    }
    seed.hooksKind = o.hooksKind;
  }
  if (o.batches !== void 0) {
    if (typeof o.batches !== "object" || o.batches === null || Array.isArray(o.batches) || Object.keys(o.batches).length === 0) {
      throw new Error("NodeSchema-shape-mismatch");
    }
    for (const [name, rec] of Object.entries(o.batches)) {
      if (name.length === 0 || typeof rec !== "object" || rec === null)
        throw new Error("NodeSchema-shape-mismatch");
      const r = rec;
      if (typeof r.prototypeName !== "string" || !Array.isArray(r.rows) || typeof r.layerId !== "string") {
        throw new Error("NodeSchema-shape-mismatch");
      }
      if (r.mintKind !== void 0 && r.mintKind !== "component" && r.mintKind !== "placement") {
        throw new Error("NodeSchema-shape-mismatch");
      }
      if (r.placementName !== void 0 && typeof r.placementName !== "string") {
        throw new Error("NodeSchema-shape-mismatch");
      }
      if (r.keyField !== void 0 && (typeof r.keyField !== "string" || r.keyField.length === 0)) {
        throw new Error("NodeSchema-shape-mismatch");
      }
      for (const row of r.rows) {
        if (row === null || typeof row !== "object" || Array.isArray(row))
          throw new Error("NodeSchema-shape-mismatch");
      }
    }
    seed.batches = o.batches;
  }
  return seed;
}
function validateClientConfig(doc) {
  const cfg = doc.clientConfig;
  if (typeof cfg !== "object" || cfg === null)
    throw new Error("clientConfig-excess");
  const keys = Object.keys(cfg);
  if (keys.length !== 2)
    throw new Error("clientConfig-excess");
  if (typeof cfg.adapter !== "string")
    throw new Error("clientConfig-excess");
  if (typeof cfg.persistence !== "boolean")
    throw new Error("clientConfig-excess");
}
function loadState(doc) {
  if (typeof doc !== "object" || doc === null)
    throw new Error("envelope-mismatch");
  const template = doc.template;
  if (typeof template !== "object" || template === null || Array.isArray(template))
    throw new Error("envelope-mismatch");
  if (!Array.isArray(doc.content))
    throw new Error("envelope-mismatch");
  validateClientConfig(doc);
  const census = doc.defPrototypes;
  if (census !== void 0) {
    if (!Array.isArray(census))
      throw new Error("envelope-mismatch");
    const ids = /* @__PURE__ */ new Set();
    const rootNames = /* @__PURE__ */ new Set();
    const docIds = /* @__PURE__ */ new Set([template.id ?? "", ...doc.content.map((c) => c.id ?? "")]);
    for (const entry of census) {
      if (typeof entry !== "object" || entry === null || Array.isArray(entry))
        throw new Error("NodeSchema-shape-mismatch");
      const e = entry;
      if (typeof e.name !== "string" || e.name.length === 0)
        throw new Error("NodeSchema-shape-mismatch");
      if (typeof e.nodeId !== "string" || e.nodeId.length === 0)
        throw new Error("NodeSchema-shape-mismatch");
      if (typeof e.isRoot !== "boolean")
        throw new Error("NodeSchema-shape-mismatch");
      if (ids.has(e.nodeId))
        throw new Error("NodeSchema-shape-mismatch");
      if (!docIds.has(e.nodeId))
        throw new Error("NodeSchema-shape-mismatch");
      if (e.isRoot) {
        if (rootNames.has(e.name))
          throw new Error("NodeSchema-shape-mismatch");
        rootNames.add(e.name);
      }
      ids.add(e.nodeId);
    }
  }
  assertNoLiveTargets(template);
  validateDerived(template.derived);
  const templateHooksKind = template.hooksKind;
  if (templateHooksKind !== void 0) {
    if (typeof templateHooksKind !== "object" || templateHooksKind === null || Array.isArray(templateHooksKind) || Object.keys(templateHooksKind).length === 0) {
      throw new Error("NodeSchema-shape-mismatch");
    }
    for (const [name, kind] of Object.entries(templateHooksKind)) {
      if (name.length === 0 || typeof kind !== "string" || kind !== "value" && kind !== "component" && kind !== "placement") {
        throw new Error("NodeSchema-shape-mismatch");
      }
    }
  }
  const templateBatches = template.batches;
  if (templateBatches !== void 0) {
    if (typeof templateBatches !== "object" || templateBatches === null || Array.isArray(templateBatches) || Object.keys(templateBatches).length === 0) {
      throw new Error("NodeSchema-shape-mismatch");
    }
    for (const rec of Object.values(templateBatches)) {
      if (typeof rec !== "object" || rec === null)
        throw new Error("NodeSchema-shape-mismatch");
      const r = rec;
      if (typeof r.prototypeName !== "string" || !Array.isArray(r.rows) || typeof r.layerId !== "string") {
        throw new Error("NodeSchema-shape-mismatch");
      }
      if (r.mintKind !== void 0 && r.mintKind !== "component" && r.mintKind !== "placement") {
        throw new Error("NodeSchema-shape-mismatch");
      }
      if (r.keyField !== void 0 && (typeof r.keyField !== "string" || r.keyField.length === 0)) {
        throw new Error("NodeSchema-shape-mismatch");
      }
      for (const row of r.rows) {
        if (row === null || typeof row !== "object" || Array.isArray(row))
          throw new Error("NodeSchema-shape-mismatch");
      }
    }
  }
  const groups = /* @__PURE__ */ new Map();
  const seeds = [];
  for (const item of doc.content) {
    const seed = parseNodeState(item);
    const idx = seeds.push(seed) - 1;
    if (seed.forkKey !== void 0) {
      let group = groups.get(seed.forkKey);
      if (!group) {
        group = [];
        groups.set(seed.forkKey, group);
      }
      group.push({ seed, idx });
    }
  }
  const drop = /* @__PURE__ */ new Set();
  for (const group of groups.values()) {
    if (group.length < 2)
      continue;
    const first = group[0];
    const sig = JSON.stringify(first.seed);
    for (let i = 1; i < group.length; i += 1) {
      const entry = group[i];
      if (JSON.stringify(entry.seed) !== sig)
        throw new Error("fork-key-collision");
      drop.add(entry.idx);
    }
  }
  const out = [];
  seeds.forEach((s, i) => {
    if (!drop.has(i))
      out.push(s);
  });
  return out;
}
function reRegisterDefPrototypes(doc, hub, nodes, scope = DEFAULT_SCOPE) {
  const census = doc.defPrototypes;
  if (census === void 0 || census.length === 0)
    return;
  const byId = new Map(nodes.map((n) => [n.id, n]));
  const roots = /* @__PURE__ */ new Map();
  const children = /* @__PURE__ */ new Map();
  for (const entry of census) {
    const node = byId.get(entry.nodeId);
    if (node === void 0)
      throw new Error("NodeSchema-shape-mismatch");
    if (entry.isRoot) {
      roots.set(entry.name, node);
    } else {
      let list = children.get(entry.name);
      if (!list) {
        list = [];
        children.set(entry.name, list);
      }
      list.push(node);
    }
  }
  for (const [name, root2] of roots) {
    registerDefRootPrototype(hub.linkFor(name, "component"), root2, scope);
  }
  for (const [name, protos] of children) {
    registerDefPrototypes(hub.linkFor(name, "component"), protos, scope);
  }
  for (const entry of census) {
    const node = byId.get(entry.nodeId);
    if (node.state !== "prototype")
      throw new Error("NodeSchema-shape-mismatch");
  }
}

// node_modules/provident-ssr/dist/core/supervisor.js
var journalSeq = 0;
var DEFAULT_JOURNAL_WINDOW = 500;
var MAX_JOURNAL_WINDOW = 1e3;
var REDO_PEEK = 50;
function focusedSliceFor(node, all) {
  const set = /* @__PURE__ */ new Map();
  for (let cur = node; cur; cur = cur.parent)
    set.set(cur.id, cur);
  const stack = [...node.children];
  while (stack.length > 0) {
    const d = stack.pop();
    set.set(d.id, d);
    stack.push(...d.children);
  }
  const pathHasTarget = [...set.values()].some((n) => n.anchors.some((a) => a.role === "target" && typeof a.target === "string"));
  if (pathHasTarget) {
    const names = /* @__PURE__ */ new Set();
    for (const n of set.values()) {
      for (const a of n.anchors) {
        if (a.role === "target" && typeof a.target === "string")
          names.add(a.target);
      }
    }
    let hubAnswers = false;
    const hub = node.hubFor;
    if (hub) {
      for (const name of names) {
        if (hub.linkFor(name, "component").anchors.length > 0)
          hubAnswers = true;
      }
    }
    if (!hubAnswers) {
      const universe = typeof all === "function" ? all() : all;
      for (const n of universe) {
        if (set.has(n.id))
          continue;
        if (n.anchors.some((a) => (a.role === "source" || a.role === "duplex") && typeof a.target === "string")) {
          set.set(n.id, n);
        }
      }
    }
  }
  return [...set.values()];
}
var Supervisor = class _Supervisor {
  journal = [];
  nodes;
  /** REQ-GAP-11 — the destroyed-ref tombstone (PRIVATE, handoffs-review-2
   *  §REQ-GAP-11): destroyed nodes leave `this.nodes` (allNodes() = the
   *  live-tree scan the handoff complains about) but keep resolving here so
   *  stale ids still gate `no-usable-state` (never `unknown-node`), repeated
   *  retention lookups keep working, and dispatchEvent on destroyed targets
   *  stays `[]`. Destroyed is terminal, so entries are never removed; the
   *  tombstone is never scanned (allNodes / pass-2 / focusedSlice read
   *  `this.nodes` only). */
  destroyedRefs = /* @__PURE__ */ new Map();
  hub;
  events;
  /** MULTI-GRAPH (D1-D8) — the graph scope this supervisor renders into
   *  (isolated opt-in, else null → the shared default). Threaded to ops so
   *  minted/registered nodes + the sweep stay scope-local. */
  graphScope;
  undoStack = [];
  redoStack = [];
  client = null;
  handlerCtx = null;
  /** Feature 3 (handoffs-review-8.md, ruling 17) — the condense trigger:
   *  absent = never; a journal length above it schedules a deferred condense
   *  (D5). Read-only once constructed. */
  maxJournalLength;
  condenseScheduled = false;
  /** ENG-SUPERVISOR-HOOK-ACCUMULATION — the module finalize-hook unsubscribe
   *  returned by `onNodeFinalized`; called by `dispose()`. */
  finalizeUnsub = () => {
  };
  constructor(rootOrOpts, nodes) {
    this.hub = null;
    this.events = null;
    this.maxJournalLength = void 0;
    this.graphScope = null;
    if (rootOrOpts !== null && typeof rootOrOpts === "object" && rootOrOpts.isNode === true) {
      const root2 = rootOrOpts;
      this.nodes = nodes ?? /* @__PURE__ */ new Map();
      this.nodes.set(root2.id, root2);
      this.graphScope = root2.graphScope ?? null;
    } else {
      const opts = rootOrOpts;
      this.nodes = /* @__PURE__ */ new Map();
      this.hub = opts.hub ?? null;
      this.events = opts.events ?? null;
      this.maxJournalLength = opts.maxJournalLength;
      this.graphScope = opts.graphScope ?? null;
    }
    this.finalizeUnsub = onNodeFinalized((node) => {
      if (this.nodes.get(node.id) === node) {
        this.nodes.delete(node.id);
        this.destroyedRefs.set(node.id, node);
      }
    });
  }
  /** ENG-SUPERVISOR-HOOK-ACCUMULATION — release this Supervisor's module-level
   *  finalize hook + its node maps. Idempotent; a disposed Supervisor is inert.
   *  The module sweep timer is untouched; other Supervisors are unaffected. */
  dispose() {
    this.finalizeUnsub();
    this.finalizeUnsub = () => {
    };
    this.nodes.clear();
    this.destroyedRefs.clear();
    this.pass2Dirty.clear();
  }
  getNode(id) {
    return this.nodes.get(id) ?? this.destroyedRefs.get(id);
  }
  allNodes() {
    return [...this.nodes.values()];
  }
  registerNode(node) {
    this.nodes.set(node.id, node);
  }
  /** Lazily-built client API for handler contexts. */
  get clientAPI() {
    this.client ??= createClient(this);
    return this.client;
  }
  /** Handler context exposing the mutation channel + tree search. */
  get handlerContext() {
    this.handlerCtx ??= makeHandlerContext(this, this.clientAPI);
    return this.handlerCtx;
  }
  /** UNDO-REDO-REPORT — read-only stack accessors (depths/top-kinds only;
   *  never raw `JournalEntry[]`, which hold live Node refs + snapshot
   *  payloads). `undoBaseBoundary` is true when the undoStack is empty BECAUSE
   *  it was truncated at the condensed base (further undo is a guarded no-op). */
  get undoDepth() {
    return this.undoStack.length;
  }
  get redoDepth() {
    return this.redoStack.length;
  }
  get undoTopKind() {
    return this.undoStack.at(-1)?.op.kind;
  }
  get redoTopKind() {
    return this.redoStack.at(-1)?.op.kind;
  }
  get undoBaseBoundary() {
    return this.undoStack.length === 0 && this.journal.some((e) => e.op.kind === "base");
  }
  /**
   * ENG-JOURNAL-ENTRY-READ-API — a sanitized, non-draining snapshot of the
   * journal + the exact position accessors. JSON-safe (never live Node refs /
   * snapshot payloads). Read-only: never mutates, drains, awaits, or re-renders.
   * Pagination is by absolute index; `limit` is clamped [1, MAX_JOURNAL_WINDOW].
   */
  journalEntries(opts) {
    const total = this.journal.length;
    const basePresent = this.journal.some((e) => e.op.kind === "base");
    const limitRaw = opts?.limit;
    const limit = limitRaw === void 0 ? DEFAULT_JOURNAL_WINDOW : Math.min(Math.max(Math.floor(limitRaw), 1), MAX_JOURNAL_WINDOW);
    let fromIndex;
    if (opts?.afterIndex !== void 0) {
      fromIndex = Math.min(total, Math.max(0, Math.floor(opts.afterIndex)));
    } else {
      const cursorIndex = (basePresent ? 1 : 0) + this.undoStack.length;
      const toIndex = Math.min(total, cursorIndex + REDO_PEEK);
      fromIndex = Math.max(0, toIndex - limit);
    }
    const end = Math.min(total, fromIndex + limit);
    const entries = [];
    for (let i = fromIndex; i < end; i++) {
      const e = this.journal[i];
      entries.push({
        index: i,
        kind: typeof e.op?.kind === "string" ? e.op.kind : "unknown",
        status: typeof e.result?.status === "string" ? e.result.status : "unknown"
      });
    }
    const truncated = entries.length > 0 ? fromIndex > 0 || end < total : fromIndex < total;
    const view = {
      entries,
      fromIndex,
      totalEntries: total,
      truncated,
      undoDepth: this.undoStack.length,
      redoDepth: this.redoStack.length,
      basePresent,
      undoBaseBoundary: this.undoBaseBoundary
    };
    const undoTop = this.undoStack.at(-1)?.op.kind;
    if (undoTop !== void 0)
      view.undoTopKind = undoTop;
    const redoTop = this.redoStack.at(-1)?.op.kind;
    if (redoTop !== void 0)
      view.redoTopKind = redoTop;
    if (this.maxJournalLength !== void 0)
      view.maxJournalLength = this.maxJournalLength;
    return view;
  }
  /** UNDO-REDO-REPORT — build the report from the post-op stacks, omitting the
   *  optional top-kind keys when the stack is empty (exactOptionalPropertyTypes). */
  report(status, dirtied) {
    const base = {
      status,
      scheduledDirtied: [...dirtied],
      baseBoundary: this.undoStack.length === 0 && this.journal.some((e) => e.op.kind === "base")
    };
    const undoTop = this.undoStack.at(-1)?.op.kind;
    const redoTop = this.redoStack.at(-1)?.op.kind;
    if (undoTop !== void 0)
      base.stackTopKind = undoTop;
    if (redoTop !== void 0)
      base.redoTopKind = redoTop;
    return base;
  }
  /** Run a phase's handlers on one node (or all registered nodes if omitted). */
  runPhase(phase, nodeId) {
    if (nodeId !== void 0) {
      const node = this.nodes.get(nodeId);
      if (node)
        dispatchPhase(node, this.handlerContext, phase);
      return;
    }
    dispatchPhaseForNodes(this.allNodes(), this.handlerContext, phase);
  }
  /** Internal: dispatch a phase on one node (contained errors, reentrancy-guarded). */
  dispatchingPhases = /* @__PURE__ */ new Set();
  runPhaseOnNode(phase, node) {
    const key = `${phase}:${node.id}`;
    if (this.dispatchingPhases.has(key))
      return;
    this.dispatchingPhases.add(key);
    try {
      dispatchPhase(node, this.handlerContext, phase);
    } finally {
      this.dispatchingPhases.delete(key);
    }
  }
  /** Phase A (2026-08-20 — event-dispatch-wiring-review.md): the EVENT-dispatch
   *  engine entry — the sibling of `runPhase` for events. Resolves a target
   *  (a Node instance / a nodeId / a wire string) to a live Node and runs
   *  `dispatchEvent(node, handlerContext, event, ...args)`, REUSING the
   *  existing containment (throwing bodies land in the results list) + the
   *  per-dispatch node/states enrichment (handlers.ts `scopedFor`) + the
   *  managed mutation channel (bodies mutate only via clientAPI.apply).
   *  Pins (review + handlers.md §3): dispatch is a TRIGGER, never a journal
   *  entry; it never drains pass-2 states, never flushes applies (the
   *  microtask flush owns a body's apply effects) and never emits EventBridge
   *  events — a host awaits the flush before asserting; NO propagation
   *  (target handlers only); unknown / destroyed / unplaced targets return []
   *  (mirror of runPhase's unknown-id no-op, but events RETURN results).
   *  Wire resolution: full string first (a nodeId), then the first-`#` prefix
   *  (fork-arm wires are `<nodeId>#<i>`, render-helpers §4.1); a fork-arm
   *  dispatch fires the NODE's handlers once, all arms visible in ctx.states.
   *  Reentrancy: a nested dispatch of the SAME (node, event) no-ops via the
   *  dispatchingEvents guard. The DomAdapter.onEvent seam stays the page-side
   *  path — the decoupling pin is unchanged. */
  dispatchingEvents = /* @__PURE__ */ new Set();
  dispatchEvent(target, event, ...args) {
    const node = typeof target === "string" ? this.resolveDispatchTarget(target) : target;
    if (!node || node.destroyed || node.state === "unplaced")
      return [];
    const key = `event:${event}:${node.id}`;
    if (this.dispatchingEvents.has(key))
      return [];
    this.dispatchingEvents.add(key);
    try {
      return dispatchEvent(node, this.handlerContext, event, ...args);
    } finally {
      this.dispatchingEvents.delete(key);
    }
  }
  /** Resolve a dispatch-target string to a live node: the FULL string as a
   *  nodeId first (so a `#`-bearing node id wins over the arm grammar), then
   *  the first-`#` prefix (fork-arm wire `<nodeId>#<i>`). */
  resolveDispatchTarget(target) {
    const exact = this.nodes.get(target);
    if (exact)
      return exact;
    const hash = target.indexOf("#");
    if (hash !== -1)
      return this.nodes.get(target.slice(0, hash));
    return void 0;
  }
  /** PUBLIC deterministic settle (2026-08-21 — user ruling D2,
   *  ssr-synthetic-event.md §2.6): awaits the pass-2 flush cascade to
   *  completion — `while (hasPendingWork()) await oneTaskBoundary`. The
   *  microtask flush cascade is bounded, so the settle is deterministic
   *  without magic tick counts. `hasPendingWork` is a NON-draining probe —
   *  this never consumes the renderer's takePass2States snapshot. The
   *  never-flush-on-dispatch pin is about the ENGINE (dispatchEvent never
   *  flushes internally); a host-called flush is exactly what the pins
   *  assume exists. */
  async flush() {
    while (this.hasPendingWork()) {
      await new Promise((r) => setTimeout(r, 0));
    }
  }
  /** Shared-host dispatch report surface (2026-08-21 — ssr-synthetic-event.md
   *  §3, handoffs-review REQ-GAP-4): the ADDITIVE async sibling of
   *  `dispatchEvent` (which stays UNCHANGED — sync, HandlerResult[]).
   *  Resolution + guards are identical (wire/nodeId resolution,
   *  destroyed/unplaced → empty report, same-(node,event) reentrancy no-ops
   *  through the SAME dispatchingEvents key — a nested dispatchAndReport
   *  inside a body no-ops like a nested dispatchEvent). Flush-before-response:
   *  awaits `flush()` internally, then takes pass-2 states as the report's
   *  caller, then returns. `dirtied` = ∪(result.dirtied of journal entries
   *  appended DURING this dispatch — the new-entry span j0→length, bounded;
   *  the whole-journal snapshot derivation is REJECTED) ∪ keys(states).
   *  `options.requestId` = OPT-IN bounded LRU dedup, registered SYNCHRONOUSLY
   *  at call entry (before any await): a duplicate within the window (same
   *  requestId AND same (target, event)) returns the FIRST caller's report —
   *  awaiting the in-flight promise if pending, else the settled report
   *  (idempotent ECHO). A requestId reused with a DIFFERENT (target, event)
   *  is a host error: warn + treat as a miss. NOT journaled, process-local
   *  (dies on loadState/restart — correct); best-effort under LRU/TTL
   *  pressure; zero cost when requestId is absent. */
  dispatchAndReport(target, event, options = {}, ...args) {
    const requestId = options.requestId;
    const node = typeof target === "string" ? this.resolveDispatchTarget(target) : target;
    const targetKey2 = node ? node.id : typeof target === "string" ? target : String(target);
    if (requestId !== void 0) {
      const hit = this.dispatchDedup.get(requestId);
      if (hit && Date.now() - hit.ts <= _Supervisor.DEDUP_TTL_MS) {
        if (hit.target === targetKey2 && hit.event === event) {
          return hit.inFlight ?? Promise.resolve(hit.settled);
        }
        console.warn(`[supervisor] requestId "${requestId}" reused with a different (target, event); treating as a fresh dispatch`);
      }
    }
    if (!node || node.destroyed || node.state === "unplaced") {
      const empty = { results: [], dirtied: [] };
      if (requestId !== void 0)
        this.recordDedup(requestId, { target: targetKey2, event, inFlight: void 0, settled: empty, ts: Date.now() });
      return Promise.resolve(empty);
    }
    const key = `event:${event}:${node.id}`;
    if (this.dispatchingEvents.has(key)) {
      const empty = { results: [], dirtied: [] };
      if (requestId !== void 0)
        this.recordDedup(requestId, { target: targetKey2, event, inFlight: void 0, settled: empty, ts: Date.now() });
      return Promise.resolve(empty);
    }
    const j0 = this.journal.length;
    const run = async () => {
      this.dispatchingEvents.add(key);
      let results;
      try {
        results = dispatchEvent(node, this.handlerContext, event, ...args);
      } finally {
        this.dispatchingEvents.delete(key);
      }
      await this.flush();
      const states = this.takePass2States();
      const dirtied = /* @__PURE__ */ new Set();
      for (let i = j0; i < this.journal.length; i++) {
        const d = this.journal[i].result.dirtied;
        if (Array.isArray(d))
          for (const id of d)
            dirtied.add(id);
      }
      for (const id of states.keys())
        dirtied.add(id);
      return { results, dirtied: [...dirtied] };
    };
    if (requestId !== void 0) {
      const entry = { target: targetKey2, event, inFlight: void 0, settled: void 0, ts: Date.now() };
      const promise = run();
      entry.inFlight = promise;
      promise.then((report) => {
        entry.inFlight = void 0;
        entry.settled = report;
        entry.ts = Date.now();
      }, () => {
        this.dispatchDedup.delete(requestId);
      });
      this.recordDedup(requestId, entry);
      return promise;
    }
    return run();
  }
  /** OPT-IN requestId dedup window (ssr-synthetic-event.md §3.3): bounded LRU
   *  (cap ~128 entries + ~10s TTL), process-local, NOT journaled. */
  static DEDUP_CAP = 128;
  static DEDUP_TTL_MS = 1e4;
  dispatchDedup = /* @__PURE__ */ new Map();
  recordDedup(requestId, entry) {
    this.dispatchDedup.delete(requestId);
    this.dispatchDedup.set(requestId, entry);
    if (this.dispatchDedup.size > _Supervisor.DEDUP_CAP) {
      const oldest = this.dispatchDedup.keys().next().value;
      if (oldest !== void 0)
        this.dispatchDedup.delete(oldest);
    }
  }
  /**
   * Bounded pass-2 slice: the changed node's walk path + (only when the path
   * carries a target) the lazily-materialized provider universe.
   */
  focusedSlice(node) {
    return focusedSliceFor(node, () => this.allNodes());
  }
  /** Compiled states produced by pass-2 since the last take — the renderer
   *  consumes these instead of recompiling (with the flush awaited, every
   *  dirty node's compile has already resolved). */
  pass2States = /* @__PURE__ */ new Map();
  /** Non-draining mirror of pass2States: last-known pass-2 states per node
   *  (grouped per node, fork arms preserved). Handlers read this via
   *  getResolvedStates / Node.resolved — it must NEVER be drained, and must
   *  never consume the renderer's snapshot. */
  resolvedStates = /* @__PURE__ */ new Map();
  takePass2States() {
    const out = this.pass2States;
    this.pass2States = /* @__PURE__ */ new Map();
    return out;
  }
  /** HARNESS settle-check (2026-08-16) — is the pass-2 pipeline still
   *  holding work (a scheduled flush, dirty nodes, pending placement
   *  triggers)? NON-draining — the renderer's takePass2States stays the
   *  drain. Lets a page harness replace blind timer-yield bursts (8×
   *  setTimeout(0)) with an adaptive settle loop: the flush cascade is
   *  microtask-bound, so one task boundary drains it; the check confirms
   *  completion without consuming state. */
  hasPendingWork() {
    return this.flushScheduled || this.pass2Dirty.size > 0 || this.pendingTriggers.size > 0;
  }
  /** TIMING (2026-08-16) — the SYNCHRONOUS pass-2 engine work accumulated
   *  across flushes (measured around runPass2AndFlush only, excluding the
   *  scheduler windows a page harness's awaits occupy). A profile can split
   *  its wall-time pass2Ms into engine work (this) vs scheduler idle
   *  (pass2Ms − this): the fork-stress pages' flush cascades run inside the
   *  await windows, so a wall-only number cannot tell the two apart. */
  flushWorkMs = 0;
  pass2WorkMs() {
    return this.flushWorkMs;
  }
  /** Group compiled states per node (fork arms preserved per node). */
  groupByNode(actionable) {
    const grouped = /* @__PURE__ */ new Map();
    for (const cs of actionable) {
      const g = grouped.get(cs.nodeId) ?? [];
      g.push(cs);
      grouped.set(cs.nodeId, g);
    }
    return grouped;
  }
  /** Write grouped pass-2 states into the non-draining resolved store and
   *  through to each node's read-only `resolved` cache. */
  storeResolved(grouped) {
    for (const [id, arr] of grouped) {
      this.resolvedStates.set(id, arr);
      const n = this.nodes.get(id);
      if (n && !n.destroyed)
        n.__setResolved(arr);
    }
  }
  /** Seed the resolved store from a bootstrap compile's actionable states —
   *  the demos' bootstrap compiles the root DIRECTLY (bypassing the
   *  supervisor), so callers must recordResolved(cr.actionable) after that
   *  full compile. Groups per node and writes through node.resolved. This
   *  NEVER touches pass2States and never drains. */
  recordResolved(actionable) {
    this.storeResolved(this.groupByNode(actionable));
  }
  /** Non-draining getter: a node's last-known pass-2 compiled states
   *  (grouped, fork arms preserved) or []. Returns a shallow copy so callers
   *  cannot mutate the store. */
  getResolvedStates(id) {
    return [...this.resolvedStates.get(id) ?? []];
  }
  eventTick = 0;
  flushScheduled = false;
  pass2Dirty = /* @__PURE__ */ new Set();
  /** P3 §1.2/§3.3 (C-2, 10.ac.2 #7) — the update trigger identity carried from
   *  `supervisor.apply` into the pass-2 dispatch: which placement link changed
   *  and how. Set by placement-affecting ops for their dirty nodes; consumed
   *  (and cleared) by the runPass2AndFlush relevance pre-check. */
  pendingTriggers = /* @__PURE__ */ new Map();
  emitStructure(opKind, nodeId) {
    if (!this.events)
      return;
    this.events.push("structure", { type: "structure", op: opKind, nodeId });
    this.scheduleFlush();
  }
  markPass2(nodeId, trigger) {
    this.pass2Dirty.add(nodeId);
    if (trigger)
      this.pendingTriggers.set(nodeId, trigger);
    this.scheduleFlush();
  }
  scheduleFlush() {
    if (this.flushScheduled)
      return;
    this.flushScheduled = true;
    queueMicrotask(() => {
      this.flushScheduled = false;
      const t0 = performance.now();
      this.runPass2AndFlush();
      this.flushWorkMs += performance.now() - t0;
    });
  }
  runPass2AndFlush() {
    const dirty = [...this.pass2Dirty];
    this.pass2Dirty.clear();
    if (dirty.length > 0) {
      for (const nodeId of dirty) {
        const node = this.nodes.get(nodeId);
        if (!node || node.destroyed) {
          this.pendingTriggers.delete(nodeId);
          continue;
        }
        const placementRouted = node.anchors.some((a) => a.role === "content");
        const trigger = this.pendingTriggers.get(nodeId);
        this.pendingTriggers.delete(nodeId);
        if (placementRouted && trigger && trigger.kind === "placement") {
          const chosenName = activePlacementOf(this.resolvedStates.get(nodeId) ?? []);
          if (placementChangeIrrelevant(node, chosenName, trigger.linkName))
            continue;
        }
        const cr = placementRouted ? node.compilePath() : node.compile(this.focusedSlice(node), { focusNodeId: nodeId });
        const grouped = this.groupByNode(cr.actionable);
        for (const [id, arr] of grouped)
          this.pass2States.set(id, arr);
        this.storeResolved(grouped);
        this.runPhaseOnNode("after-compile", node);
        if (this.events) {
          for (const cs of cr.actionable) {
            if (cs.nodeId !== nodeId)
              continue;
            let status = "ok";
            if (cs.unresolved.length > 0)
              status = "unresolved-reference";
            const fork = cs.forkKey !== void 0 ? { forkKey: cs.forkKey, nodeIds: cs.trace ?? [cs.nodeId] } : void 0;
            this.events.push("state", { type: "state", nodeId: cs.nodeId, status, fork });
          }
          for (const d of cr.dropped) {
            if (d.reason === "loop" && d.arm[0] === nodeId) {
              this.events.push("diagnostic", { type: "diagnostic", code: "circular-source", trace: node.pathKey || node.id });
            }
          }
        }
      }
    }
    this.eventTick++;
    this.events?.flush(this.eventTick);
    for (const nodeId of dirty) {
      const node = this.nodes.get(nodeId);
      if (node && !node.destroyed)
        this.runPhaseOnNode("after-render", node);
    }
  }
  journalIfApplied(op, result) {
    if (result.status !== "applied")
      return null;
    const { kind, ...rest } = op;
    const entry = { id: `journal-${journalSeq++}`, op: { kind, ...rest }, result };
    if (this.suppressJournal)
      return entry;
    this.journal.push(entry);
    this.undoStack.push(entry);
    this.redoStack = [];
    if (this.maxJournalLength !== void 0 && this.journal.length > this.maxJournalLength) {
      this.scheduleCondense();
    }
    return entry;
  }
  /** Feature 3 (D5) — schedule the deferred condense ONCE (a microtask); the
   *  condense itself runs after the triggering op returns, so a tight apply
   *  loop never blocks on the O(graph) serialize. */
  scheduleCondense() {
    if (this.condenseScheduled)
      return;
    this.condenseScheduled = true;
    setTimeout(() => {
      this.condenseScheduled = false;
      this.condense();
    }, 0);
  }
  /** Feature 3 (D5/D6/D7) — the condense: build the base snapshot (the
   *  round-trip recipe, D1), size-guard (D5), and rewrite the journal to ONE
   *  base marker. Failure-contained (D5): a serialize throw aborts with a
   *  `condense-aborted` warn and the journal is UNTOUCHED. */
  /** Feature 3 (D5) — the honest memory-win guard: a base ≥ the journal it
   *  replaces is a regression; warn + skip (the host raises the threshold).
   *  Sizes are ESTIMATED with a circular-safe walk. LIVE node references
   *  (op.node / op.target) count as a fixed O(1) pointer — the journal's
   *  actual memory is the DATA payloads, not the graph they reference (which
   *  the base ALSO captures; recursing into the node graph would double-count
   *  it and make the guard never skip). */
  static estBytes(v, seen = /* @__PURE__ */ new Set()) {
    if (v === null || v === void 0)
      return 4;
    const t = typeof v;
    if (t === "string")
      return v.length;
    if (t === "number" || t === "boolean")
      return 8;
    if (t === "function")
      return String(v).length;
    if (t === "object") {
      if (seen.has(v))
        return 4;
      if (v.isNode === true)
        return 8;
      seen.add(v);
      if (Array.isArray(v)) {
        let n2 = 4;
        for (const e of v)
          n2 += _Supervisor.estBytes(e, seen);
        return n2;
      }
      let n = 8;
      for (const [, val] of Object.entries(v))
        n += _Supervisor.estBytes(val, seen);
      return n;
    }
    return 8;
  }
  condense() {
    if (this.journal.length === 0)
      return;
    const preLen = this.journal.length;
    try {
      const root2 = this.allNodes().find((n) => {
        const child = n.childAnchor();
        if (!child)
          return false;
        const pa = child.link.anchorsOf("parent")[0];
        return pa !== void 0 && pa.target === "rootNode";
      });
      if (!root2)
        return;
      const protoSet = /* @__PURE__ */ new Set();
      const protoScope = this.graphScope ?? void 0;
      for (const [, protos] of defPrototypeEntries(protoScope))
        for (const p of protos)
          if (p.hubFor === this.hub)
            protoSet.add(p);
      for (const [, r] of defRootPrototypeEntries(protoScope))
        if (r.hubFor === this.hub)
          protoSet.add(r);
      const kids = this.allNodes();
      for (const p of protoSet)
        if (p !== root2)
          kids.push(p);
      const snapshot = serializeSlice(root2, kids);
      const baseBytes = _Supervisor.estBytes(snapshot);
      const journalBytes = _Supervisor.estBytes(this.journal.slice(0, preLen));
      if (baseBytes >= journalBytes) {
        console.warn(`condense-skipped-size at journal-${journalSeq}: base ${baseBytes}B >= pre-base journal ${journalBytes}B; no rewrite (raise maxJournalLength)`);
        return;
      }
      const marker = {
        id: `journal-${journalSeq++}`,
        op: { kind: "base", snapshot },
        result: { status: "base" }
      };
      this.journal.splice(0, preLen, marker);
      const baseIds = new Set(this.journal.slice(1).map((e) => e.id));
      this.undoStack = this.undoStack.filter((e) => baseIds.has(e.id));
      this.redoStack = [];
    } catch (e) {
      console.warn(`condense-aborted: ${e?.message ?? String(e)}; journal untouched`);
    }
  }
  /** Feature 3 (D4) — the SYNCHRONOUS graph-REPLACE restore: drain the
   *  pending-destroy queue + evict the pre-base nodes, clear this.nodes, run
   *  the §3 recipe (loadState → seed with the SAME hub → reconcileParentTargets
   *  → reRegisterDefPrototypes → registerNode per node → re-mint rows per the
   *  batches records), then schedule a FULL pass-2 refresh. The async sweep
   *  cannot interleave (the drain ran synchronously). Re-runnable: a second
   *  restore drains the first restore's nodes the same way. */
  _restoreBase(snapshot) {
    drainPendingDestroy(this.graphScope ?? void 0);
    for (const n of [...this.nodes.values()]) {
      evictDestroyedNode(n);
      this.nodes.delete(n.id);
    }
    this.destroyedRefs.clear();
    const hub = this.hub;
    if (!hub)
      return;
    const doc = snapshot;
    const seeds = [];
    const scope = this.graphScope ?? void 0;
    seeds.push(new Node(doc.template, hub, void 0, false, scope));
    for (const d of loadState(doc))
      seeds.push(new Node(d, hub, void 0, false, scope));
    reconcileParentTargets(seeds);
    reRegisterDefPrototypes(doc, hub, seeds, scope);
    for (const n of seeds)
      this.registerNode(n);
    for (const n of seeds) {
      const batches = n.batches;
      if (!batches)
        continue;
      for (const [hookName, rec] of Object.entries(batches)) {
        this.apply({
          kind: "rows-mint",
          target: n,
          hookName,
          mintKind: rec.mintKind ?? "component",
          prototypeName: rec.prototypeName,
          ...rec.placementName !== void 0 ? { placementName: rec.placementName } : {},
          ...rec.keyField !== void 0 ? { keyField: rec.keyField } : {},
          rows: rec.rows,
          sourceName: "condense-restore"
        }, { journal: false, quiet: true });
      }
    }
    for (const n of seeds) {
      n.markDirty("remote");
      this.markPass2(n.id);
    }
  }
  /** INTERNAL (handoffs-review-4.md §3c — redo/replay use it): re-apply an op
   *  WITHOUT journaling a new entry (the caller refreshes the original
   *  entry's `result` in place instead). The public `apply` signature is
   *  unchanged; `opts` is underscored-internal. */
  suppressJournal = false;
  /** ADV-S5 (2026-08-25 adversarial pass) — the internal restore re-mint is a
   *  QUIET graph-REPLACE: `_restoreBase` runs rows-mint through `apply` with
   *  `quiet:true`, which suppresses the before-compile phase handlers + the
   *  `structure` event (a restore must not fire side effects the journal does
   *  not record). Mirrors `suppressJournal`. */
  quietApply = false;
  apply(op, opts) {
    const node = op.node;
    const prevSuppress = this.suppressJournal;
    if (opts?.journal === false)
      this.suppressJournal = true;
    const prevQuiet = this.quietApply;
    if (opts?.quiet)
      this.quietApply = true;
    if (!node && op.kind !== "clone-instance" && op.kind !== "layer-apply" && op.kind !== "rows-mint" && op.kind !== "rows-clear") {
      this.suppressJournal = prevSuppress;
      return { status: "rejected", error: { code: "unknown-node" } };
    }
    if (op.kind === "rows-mint" || op.kind === "rows-clear") {
      const t = op.target;
      if (!t || typeof t !== "object" || typeof t.id !== "string") {
        this.suppressJournal = prevSuppress;
        return { status: "rejected", error: { code: "unknown-node" } };
      }
      if (t.destroyed) {
        this.suppressJournal = prevSuppress;
        return { status: "no-usable-state", nodeState: "destroyed" };
      }
    }
    if (this.graphScope) {
      const guardTarget = op.kind === "rows-mint" || op.kind === "rows-clear" || op.kind === "layer-apply" ? op.target : node;
      if (guardTarget && scopeOf(guardTarget) !== this.graphScope) {
        this.suppressJournal = prevSuppress;
        return { status: "rejected", error: { code: "cross-graph-target" } };
      }
    }
    const isNodeObject = (v) => !!v && typeof v === "object" && v.isNode === true;
    if (node !== void 0 && !isNodeObject(node)) {
      this.suppressJournal = prevSuppress;
      return { status: "rejected", error: { code: "malformed-op", detail: "op.node must be a Node" } };
    }
    if ((op.kind === "rows-mint" || op.kind === "rows-clear" || op.kind === "layer-apply") && op.target !== void 0 && !isNodeObject(op.target)) {
      this.suppressJournal = prevSuppress;
      return { status: "rejected", error: { code: "malformed-op", detail: "op.target must be a Node" } };
    }
    if (op.kind === "attach" && !isNodeObject(op.to)) {
      this.suppressJournal = prevSuppress;
      return { status: "rejected", error: { code: "malformed-op", detail: "attach requires a Node `to`" } };
    }
    const phaseTarget = op.kind === "layer-apply" || op.kind === "rows-mint" || op.kind === "rows-clear" ? op.target : node;
    if (phaseTarget && !this.quietApply)
      this.runPhaseOnNode("before-compile", phaseTarget);
    try {
      if (op.kind === "state-slice") {
        const rawMutation = op.mutation;
        if (!Array.isArray(rawMutation)) {
          return { status: "rejected", error: { code: "malformed-op", detail: "state-slice mutation must be an array" } };
        }
        const mutation = rawMutation;
        for (const m of mutation) {
          if (!m || typeof m.targetProp !== "string") {
            return { status: "rejected", error: { code: "malformed-op", detail: "state-slice mutation entry missing targetProp" } };
          }
          if (m.targetProp.startsWith("placement") || m.targetProp === "children") {
            return { status: "rejected", error: { code: "placement-target-blocked" } };
          }
          if (m.targetProp.startsWith("hooks.") || m.targetProp === "hooks") {
            const name = m.targetProp === "hooks" ? "" : m.targetProp.slice("hooks.".length);
            if (name.length === 0 || m.mode !== "replace") {
              return {
                status: "rejected",
                error: {
                  code: m.mode !== "replace" ? "hook-mode-blocked" : "hook-name-unresolved",
                  detail: `hooks.${name}: 'replace' mode only, targeting a same-node source/duplex provider name`
                }
              };
            }
            const guard = hookWriteGuard(node, name);
            if (!guard.ok) {
              if (guard.code === "hook-name-unresolved") {
                return {
                  status: "rejected",
                  error: { code: "hook-name-unresolved", detail: `no source/duplex anchor named "${name}" on ${node.id}` }
                };
              }
              console.warn(`hook-seam-exempt at ${node.id}: "${name}" is a seam/def-shaped provider; hook write skipped (a hook write would tear down the seam)`);
              continue;
            }
            const kind = (node.base.hooksKind ?? {})[name];
            if (kind !== void 0 && kind !== "value") {
              return {
                status: "rejected",
                error: { code: "hook-kind-mismatch", detail: `hooks.${name}: declared kind "${kind}" mints nodes \u2014 scalar value writes are rejected` }
              };
            }
          }
        }
        const nodeState = node.state;
        if (nodeState !== "in-tree" && !(nodeState === "prototype" && node.runtimeMinted)) {
          return { status: "no-usable-state", nodeState };
        }
        const sliceFacts = node.applySlice(mutation);
        const dirtied = [node.id];
        for (const a of node.anchors) {
          if (a.role !== "source" && a.role !== "duplex" || typeof a.target !== "string")
            continue;
          for (const ta of a.link.anchorsOf("target")) {
            const consumer = ta.owner;
            if (!consumer || consumer === node || dirtied.includes(consumer.id))
              continue;
            dirtied.push(consumer.id);
            this.markPass2(consumer.id);
          }
        }
        const entry = this.journalIfApplied(op, {
          status: "applied",
          dirtied,
          // DEFECT-JOURNAL-UNDO (handoffs-review-4.md §3) — the undo handle
          // and the replay gate: the layer ids applySlice created + the per-
          // hook-mutation pre-op facts. Never serialized (the journal is
          // process-local). sliceLayers is the exact inverse for every non-
          // hook mode (removeLayer per id); hookUndo carries the pre-op
          // anchor.value + created/replaced/cleared disposition (the
          // deterministic `hook-<name>` id + replace-in-place semantics make
          // id-only undo inexact on a second write).
          sliceLayers: sliceFacts.createdLayers,
          hookUndo: sliceFacts.hookUndo
        });
        this.markPass2(node.id);
        return { status: "applied", journalId: entry.id, dirtied, sliceLayers: sliceFacts.createdLayers, hookUndo: sliceFacts.hookUndo };
      }
      if (op.kind === "destroy") {
        unregisterContentNode(node);
        const target = node;
        if (target.runtimeMinted) {
          target.markDestroyed();
        } else {
          markCascadeExplicit(target);
          target.destroy();
        }
        evictDestroyedNode(target);
        if (this.nodes.get(target.id) === target) {
          this.nodes.delete(target.id);
          this.destroyedRefs.set(target.id, target);
        }
        const entry = this.journalIfApplied(op, { status: "applied", dirtied: [node.id] });
        this.emitStructure("destroy", node.id);
        this.markPass2(node.id);
        return { status: "applied", journalId: entry.id, dirtied: [node.id] };
      }
      if (op.kind === "placement-attach") {
        const container = op.container;
        if (!container)
          return { status: "rejected", error: { code: "unknown-node" } };
        const names = op.names ?? [];
        this.registerNode(node);
        const hub = node.hubFor ?? container.hubFor ?? this.hub;
        if (!hub)
          return { status: "rejected", error: { code: "link-config", detail: "no link hub for placement-attach" } };
        const res = placementAttach(node, container, names, hub);
        const trigger = op.trigger ?? derivePlacementTrigger(res.attachZone, res.containerAnchorMinted);
        const entry = this.journalIfApplied(op, { status: "applied", dirtied: [container.id, node.id] });
        this.emitStructure("placement-attach", node.id);
        this.markPass2(container.id, trigger);
        this.markPass2(node.id, trigger);
        return { status: "applied", journalId: entry.id, dirtied: [container.id, node.id] };
      }
      if (op.kind === "attach") {
        if (findCycle(node, op.to))
          throw new CycleError(node.id);
        if (node.anchors.find((a) => a.role === "child")) {
          throw new SingleParentError(node.id);
        }
        const link = op.to.familyLinkFor();
        const options = {};
        const prio = op.priority;
        if (prio !== void 0)
          options.priority = prio;
        node.addAnchor("child", node, options, link);
        const entry = this.journalIfApplied(op, { status: "applied", dirtied: [node.id] });
        this.emitStructure("attach", node.id);
        this.markPass2(node.id);
        return { status: "applied", journalId: entry.id, dirtied: [node.id] };
      }
      if (op.kind === "detach") {
        detachNodeSafe(node);
        const entry = this.journalIfApplied(op, { status: "applied", dirtied: [node.id] });
        this.emitStructure("detach", node.id);
        this.markPass2(node.id);
        return { status: "applied", journalId: entry.id, dirtied: [node.id] };
      }
      if (op.kind === "move") {
        const toParent = op.to.parent;
        if (findCycle(node, toParent))
          throw new CycleError(node.id);
        detachNodeSafe(node);
        const link = toParent.familyLinkFor();
        const options = {};
        const prio = op.to.priority;
        if (prio !== void 0)
          options.priority = prio;
        node.addAnchor("child", node, options, link);
        const entry = this.journalIfApplied(op, { status: "applied", dirtied: [node.id] });
        this.emitStructure("move", node.id);
        this.markPass2(node.id);
        return { status: "applied", journalId: entry.id, dirtied: [node.id] };
      }
      if (op.kind === "clone-instance") {
        const source = op.source ?? node;
        if (!source)
          return { status: "rejected", error: { code: "unknown-node" } };
        if (this.graphScope && scopeOf(source) !== this.graphScope) {
          return { status: "rejected", error: { code: "cross-graph-target" } };
        }
        const copy = source.clone("actor", {}, this.graphScope ?? void 0);
        this.registerNode(copy);
        const slot = op.slot;
        if (slot) {
          const inherited = copy.childAnchor();
          if (inherited) {
            ;
            inherited.link.destroy();
            const idx = copy.anchors.indexOf(inherited);
            if (idx !== -1)
              copy.anchors.splice(idx, 1);
          }
          const options = {};
          const prio = op.priority;
          if (prio !== void 0)
            options.priority = prio;
          const link = slot.familyLinkFor();
          copy.addAnchor("child", copy, options, link);
        }
        const entry = this.journalIfApplied(op, {
          status: "applied",
          dirtied: [copy.id],
          // DEFECT-CLONE-REPLAY-NONIDEMPOTENT (handoffs-review-4.md §4) — the
          // A3-minted precedent: persist the copy id so replay can gate on
          // its liveness (a live copy in this.nodes → skip) instead of
          // re-minting a fresh copy per replay.
          minted: [copy.id]
        });
        this.emitStructure("clone-instance", copy.id);
        this.markPass2(copy.id);
        return { status: "applied", journalId: entry.id, dirtied: [copy.id], minted: [copy.id] };
      }
      if (op.kind === "layer-apply") {
        const target = op.target;
        if (!target)
          return { status: "rejected", error: { code: "unknown-node" } };
        if (!Array.isArray(op.nodes)) {
          return { status: "rejected", error: { code: "malformed-op", detail: "layer-apply nodes must be an array" } };
        }
        const res = layerApply(op, { hub: target.hubFor ?? this.hub ?? null, nodes: this.nodes, ...this.graphScope ? { graphScope: this.graphScope } : {} });
        for (const id of res.minted) {
          const n = this.graphScope ? this.graphScope.byId.get(id) : resolveNodeRef(id);
          if (n)
            this.registerNode(n);
        }
        const entry = this.journalIfApplied(op, { status: "applied", dirtied: res.doorways, minted: res.minted });
        this.emitStructure("layer-apply", target.id);
        this.markPass2(target.id);
        for (const id of res.minted)
          this.markPass2(id);
        return { status: "applied", journalId: entry.id, dirtied: res.doorways, minted: res.minted };
      }
      if (op.kind === "rows-mint") {
        const target = op.target;
        if (!target)
          return { status: "rejected", error: { code: "unknown-node" } };
        const rowsOp = op;
        if (!opts?.skipKindGate) {
          const declared = (target.base.hooksKind ?? {})[rowsOp.hookName];
          if (declared !== void 0 && declared !== rowsOp.mintKind) {
            return { status: "rejected", error: { code: "hook-kind-mismatch", detail: `rows-mint ${rowsOp.hookName}: declared kind "${declared}" \u2260 op kind "${rowsOp.mintKind}"` } };
          }
          if (declared === void 0 && rowsOp.mintKind !== "component") {
            return { status: "rejected", error: { code: "hook-kind-mismatch", detail: `rows-mint ${rowsOp.hookName}: undeclared hook \u2014 only 'component' is implied; declare hooksKind` } };
          }
        }
        const res = rowsMint(rowsOp, { hub: target.hubFor ?? this.hub ?? null, nodes: this.nodes, ...this.graphScope ? { graphScope: this.graphScope } : {} });
        for (const id of res.minted) {
          const n = this.graphScope ? this.graphScope.byId.get(id) : resolveNodeRef(id);
          if (n)
            this.registerNode(n);
        }
        const entry = this.journalIfApplied(op, {
          status: "applied",
          dirtied: res.doorways,
          minted: res.minted,
          // Feature 1b (D10) — additive observability + the undo fact-set:
          // `reused` = in-place-updated (changed) ids, `removed` = the
          // per-id-teardown rows, `preRecord` = the pre-op batch record
          // (null when the op created the batch) — the D8 exact-inverse undo.
          reused: res.reused ?? [],
          removed: res.removed ?? [],
          preRecord: res.preRecord ?? null
        });
        const consumed = /* @__PURE__ */ new Set();
        for (const id of [...res.minted ?? [], ...res.reused ?? [], ...(res.removed ?? []).map((r) => r.nodeId)]) {
          const n = this.graphScope ? this.graphScope.byId.get(id) : resolveNodeRef(id);
          if (!n)
            continue;
          for (const a of n.anchors) {
            if (a.role !== "source" && a.role !== "duplex" || typeof a.target !== "string")
              continue;
            for (const ta of a.link.anchorsOf("target")) {
              const consumer = ta.owner;
              if (!consumer || consumed.has(consumer.id))
                continue;
              consumed.add(consumer.id);
              this.markPass2(consumer.id);
            }
          }
        }
        if (this.quietApply) {
        } else {
          this.emitStructure("rows-mint", target.id);
        }
        this.markPass2(target.id);
        const dirtied = [.../* @__PURE__ */ new Set([...res.doorways, ...consumed])];
        return { status: "applied", journalId: entry.id, dirtied, minted: res.minted, reused: res.reused ?? [], removed: res.removed ?? [], preRecord: res.preRecord ?? null };
      }
      if (op.kind === "rows-clear") {
        const target = op.target;
        if (!target)
          return { status: "rejected", error: { code: "unknown-node" } };
        const res = rowsClear(op, { hub: target.hubFor ?? this.hub ?? null, nodes: this.nodes, ...this.graphScope ? { graphScope: this.graphScope } : {} });
        const entry = this.journalIfApplied(op, { status: "applied", dirtied: res.doorways });
        const consumed = /* @__PURE__ */ new Set();
        for (const id of res.minted ?? []) {
          const n = this.graphScope ? this.graphScope.byId.get(id) : resolveNodeRef(id);
          if (!n)
            continue;
          for (const a of n.anchors) {
            if (a.role !== "source" && a.role !== "duplex" || typeof a.target !== "string")
              continue;
            for (const ta of a.link.anchorsOf("target")) {
              const consumer = ta.owner;
              if (!consumer || consumed.has(consumer.id))
                continue;
              consumed.add(consumer.id);
              this.markPass2(consumer.id);
            }
          }
        }
        this.emitStructure("rows-clear", target.id);
        this.markPass2(target.id);
        const dirtied = [.../* @__PURE__ */ new Set([...res.doorways, ...consumed])];
        return entry ? { status: "applied", journalId: entry.id, dirtied } : { status: "applied", dirtied };
      }
      return { status: "no-usable-state", nodeState: node?.state ?? "unplaced" };
    } catch (e) {
      if (e instanceof CycleError) {
        return { status: "rejected", error: { code: "cycle-detected" } };
      }
      if (e instanceof SingleParentError) {
        return { status: "rejected", error: { code: "single-parent" } };
      }
      if (e instanceof Error && "code" in e) {
        const err = e;
        return { status: "rejected", error: { code: err.code } };
      }
      throw e;
    } finally {
      this.suppressJournal = prevSuppress;
      this.quietApply = prevQuiet;
    }
  }
  replay() {
    const dirtied = /* @__PURE__ */ new Set();
    for (const entry of [...this.journal]) {
      if (entry.op.kind === "base") {
        const snapshot = entry.op.snapshot;
        try {
          if (snapshot)
            this._restoreBase(snapshot);
        } catch {
        }
        continue;
      }
      const kind = entry.op.kind;
      const result = entry.result;
      if (kind === "state-slice" && entry.op.mutation && this.gateBlocksReplay(entry, result))
        continue;
      if (kind === "clone-instance" && result.minted && result.minted.every((id) => !this.nodes.get(id)?.destroyed))
        continue;
      const op = { ...entry.op };
      this._resolveOpRefs(op, entry.op);
      try {
        const res = this.apply(op, { journal: false });
        if (res.status === "applied") {
          if (Array.isArray(res.dirtied))
            for (const id of res.dirtied)
              dirtied.add(id);
          const merged = { ...res };
          if ("preRecord" in entry.result)
            merged.preRecord = entry.result.preRecord;
          entry.result = merged;
        }
      } catch {
      }
    }
    this.redoStack = [];
    for (const id of this.pass2Dirty)
      dirtied.add(id);
    return this.report("applied", dirtied);
  }
  /** Feature 3 (D3, ADV-S11/S19) — id-resolve BOTH the live node ref and the
   *  rows-op target against the CURRENTLY registered nodes, so a replay/redo/
   *  undo after a `_restoreBase` graph-REPLACE targets the restored seed (same
   *  ids, fresh objects). The live ref is preferred only while it is STILL
   *  this supervisor's registered node; otherwise the id fallback resolves it
   *  (or leaves it untouched if the id is gone). */
  _resolveOpRefs(op, from) {
    const resolveOne = (key) => {
      const live = from[key];
      const current = op[key];
      if (current && live) {
        if (!live.destroyed && this.nodes.get(live.id) === live) {
          op[key] = live;
        } else {
          op[key] = this.nodes.get(live.id) ?? live;
        }
      }
    };
    resolveOne("node");
    resolveOne("target");
  }
  gateBlocksReplay(entry, result) {
    const rawNode = entry.op.node ?? entry.op.target;
    const node = rawNode ? this.nodes.get(rawNode.id) ?? rawNode : void 0;
    if (!node)
      return false;
    if (result.sliceLayers && result.sliceLayers.length > 0) {
      if (!result.sliceLayers.every((id) => node.layers.some((l) => l.id === id)))
        return false;
    }
    if (result.hookUndo && result.hookUndo.length > 0) {
      const mutation = entry.op.mutation;
      for (const fact of result.hookUndo) {
        const layer = node.layers.find((l) => l.id === `hook-${fact.name}`);
        const opValue = mutation?.find((m) => m.targetProp === `hooks.${fact.name}`)?.value;
        if (!layer || !opValue || layer.value !== opValue)
          return false;
      }
    }
    return (result.sliceLayers?.length ?? 0) > 0 || (result.hookUndo?.length ?? 0) > 0;
  }
  undo() {
    const dirtied = /* @__PURE__ */ new Set();
    if (this.undoStack.length === 0) {
      if (this.journal.some((e) => e.op.kind === "base")) {
        console.warn("base-boundary: undo cannot cross the condensed base marker (undoStack truncated at condense)");
        return this.report("base-boundary", /* @__PURE__ */ new Set());
      }
      return this.report("no-op", /* @__PURE__ */ new Set());
    }
    const entry = this.undoStack.pop();
    this.redoStack.push(entry);
    const kind = entry.op.kind;
    const rawNode = entry.op.node ?? entry.op.target;
    const node = rawNode;
    if (!node)
      return this.report("no-op", /* @__PURE__ */ new Set());
    const resolved = !node.destroyed && this.nodes.get(node.id) === node ? node : this.nodes.get(node.id) ?? null;
    if (!resolved)
      return this.report("no-op", /* @__PURE__ */ new Set());
    try {
      if (kind === "attach") {
        detachNodeSafe(resolved);
        this.markPass2(resolved.id);
      } else if (kind === "destroy") {
      } else if (kind === "rows-mint") {
        const mResult = entry.result;
        const preRecord = mResult?.preRecord;
        if (preRecord) {
          const res = this.apply({
            kind: "rows-mint",
            target: resolved,
            hookName: entry.op.hookName,
            mintKind: preRecord.mintKind,
            prototypeName: preRecord.prototypeName,
            ...preRecord.placementName !== void 0 ? { placementName: preRecord.placementName } : {},
            ...preRecord.keyField !== void 0 ? { keyField: preRecord.keyField } : {},
            rows: preRecord.rows,
            sourceName: "rows-undo",
            ...entry.op.preserveByReversal !== void 0 ? { preserveByReversal: entry.op.preserveByReversal } : {}
          }, { journal: false, skipKindGate: true });
          if (Array.isArray(res.dirtied))
            for (const id of res.dirtied)
              dirtied.add(id);
          if (Array.isArray(res.reused))
            for (const id of res.reused)
              dirtied.add(id);
        } else {
          const hookName = entry.op.hookName;
          if (hookName !== void 0) {
            const batches = resolved.batches ?? {};
            const record = batches[hookName];
            if (record) {
              const minted = mintedByOrigin(record.layerId, this.graphScope ?? void 0);
              delete batches[hookName];
              resolved.rowsTeardown(record.layerId);
              resolved.removeLayer(record.layerId);
              this.markPass2(resolved.id);
              for (const id of minted) {
                const n = this.graphScope ? this.graphScope.byId.get(id) : resolveNodeRef(id);
                if (!n)
                  continue;
                for (const a of n.anchors) {
                  if (a.role !== "source" && a.role !== "duplex" || typeof a.target !== "string")
                    continue;
                  for (const ta of a.link.anchorsOf("target")) {
                    const consumer = ta.owner;
                    if (!consumer)
                      continue;
                    this.markPass2(consumer.id);
                  }
                }
              }
            }
          }
        }
      } else if (kind === "state-slice") {
        this.undoStateSlice(entry, resolved);
      }
    } catch {
    }
    for (const id of this.pass2Dirty)
      dirtied.add(id);
    return this.report("applied", dirtied);
  }
  undoStateSlice(entry, node) {
    const result = entry.result;
    const slices = result?.sliceLayers ?? [];
    for (const id of slices) {
      try {
        node.removeLayer(id);
      } catch {
      }
    }
    const hooks = result?.hookUndo ?? [];
    for (const fact of hooks) {
      const layerId = `hook-${fact.name}`;
      const anchor = node.anchors.find((a) => (a.role === "source" || a.role === "duplex") && a.target === fact.name);
      try {
        if (fact.cleared) {
          if (anchor) {
            node.addLayer({ id: layerId, value: fact.preValue, hookFallback: anchor.value });
            anchor.value = fact.preValue;
          }
        } else if (fact.created) {
          node.removeLayer(layerId);
          if (anchor)
            anchor.value = fact.preValue;
        } else {
          const layer = node.layers.find((l) => l.id === layerId);
          if (layer) {
            ;
            layer.value = fact.preValue;
          }
          if (anchor)
            anchor.value = fact.preValue;
        }
      } catch {
      }
    }
    node.markDirty("remote");
    this.markPass2(node.id);
    for (const a of node.anchors) {
      if (a.role !== "source" && a.role !== "duplex" || typeof a.target !== "string")
        continue;
      for (const ta of a.link.anchorsOf("target")) {
        const consumer = ta.owner;
        if (!consumer || consumer === node || consumer.destroyed)
          continue;
        if (this.graphScope && scopeOf(consumer) !== this.graphScope)
          continue;
        consumer.markDirty("remote");
        this.markPass2(consumer.id);
      }
    }
  }
  redo() {
    if (this.redoStack.length === 0)
      return this.report("no-op", /* @__PURE__ */ new Set());
    const entry = this.redoStack.pop();
    const op = { ...entry.op };
    this._resolveOpRefs(op, entry.op);
    const dirtied = /* @__PURE__ */ new Set();
    try {
      const res = this.apply(op, { journal: false });
      if (res.status === "applied") {
        if (Array.isArray(res.dirtied))
          for (const id of res.dirtied)
            dirtied.add(id);
        const merged = { ...res };
        if ("preRecord" in entry.result)
          merged.preRecord = entry.result.preRecord;
        entry.result = merged;
      } else {
        for (const id of this.pass2Dirty)
          dirtied.add(id);
        return this.report("no-op", dirtied);
      }
      this.undoStack.push(entry);
    } catch {
    }
    for (const id of this.pass2Dirty)
      dirtied.add(id);
    return this.report("applied", dirtied);
  }
};

// node_modules/provident-ssr/dist/core/node.js
var nodeSeq = 0;
function mintNodeId() {
  nodeSeq += 1;
  return `node-${nodeSeq}`;
}
function effectiveOrder2(a) {
  return a.options.priority ?? a.options.order;
}
function linkOf(a) {
  return a.link;
}
var NAME_KEYED_ROLES = /* @__PURE__ */ new Set(["source", "target", "duplex", "component", "container", "content"]);
function ancestorConsumesZone(node, zone) {
  for (let cur = node.parent; cur; cur = cur.parent) {
    if (cur.anchors.some((a) => a.role === "content" && typeof a.target === "string" && a.target === zone))
      return true;
  }
  return false;
}
function chainTokenKind2(target) {
  if (target === "rootNode")
    return { kind: "token", token: "rootNode" };
  if (target === "component")
    return { kind: "token", token: "component" };
  if (target === "contentNodes")
    return { kind: "token", token: "contentNodes" };
  return { kind: "token", token: "other" };
}
function chainSliceRule(node, slice) {
  return slice.has(node.id) ? { kind: "slice-root" } : { kind: "unplaced" };
}
function familyParentTokenOf(node) {
  const child = node.childAnchor();
  if (!child)
    return null;
  const pa = linkOf(child).anchorsOf("parent")[0];
  if (!pa || typeof pa.target !== "string")
    return null;
  return pa.target;
}
function enumPathWalks(node, seen, segs) {
  const out = [];
  const child = node.stateChildAnchor();
  const parentAnchor = child ? linkOf(child).anchorsOf("parent")[0] : void 0;
  if (!child || !parentAnchor) {
    out.push({ terminal: "no-edge", hops: [] });
  } else {
    const target = parentAnchor.target;
    if (typeof target === "string") {
      out.push({ terminal: target === "rootNode" ? "root" : "token", token: target, hops: [] });
    } else if (target !== null) {
      const owner = target;
      if (owner.destroyed) {
        out.push({ terminal: "no-edge", hops: [] });
      } else if (seen.has(owner.id)) {
        out.push({ terminal: "loop", hops: [], loopKey: `root/${[...segs, owner.id].join("/")}` });
      } else {
        const next = new Set(seen);
        next.add(owner.id);
        for (const w of enumPathWalks(owner, next, [...segs, owner.id])) {
          out.push(extendWalk(w, { owner }));
        }
      }
    } else {
      out.push({ terminal: "no-edge", hops: [] });
    }
  }
  for (const a of node.anchors) {
    if (a.role !== "content")
      continue;
    for (const coa of linkOf(a).anchors) {
      if (coa.role !== "container" || typeof coa.target !== "string")
        continue;
      const owner = coa.owner;
      if (!owner || owner.destroyed)
        continue;
      const zone = coa.target;
      if (seen.has(owner.id)) {
        out.push({ terminal: "loop", hops: [], loopKey: `root/${[...segs, zone, owner.id].join("/")}` });
        continue;
      }
      const next = new Set(seen);
      next.add(owner.id);
      for (const w of enumPathWalks(owner, next, [...segs, zone, owner.id])) {
        out.push(extendWalk(w, { zone, owner }));
      }
    }
  }
  return out;
}
function extendWalk(w, hop) {
  const out = { terminal: w.terminal, hops: [hop, ...w.hops] };
  if (w.token !== void 0)
    out.token = w.token;
  if (w.loopKey !== void 0)
    out.loopKey = w.loopKey;
  return out;
}
function firstHopZone(w) {
  return w.hops[0]?.zone;
}
function chosenPlacementName(node, walks) {
  const names = [];
  for (const a of node.anchors) {
    if (a.role !== "content" || typeof a.target !== "string")
      continue;
    names.push(a.target);
  }
  if (names.length === 0)
    return null;
  const rootViable = /* @__PURE__ */ new Set();
  for (const w of walks) {
    if (w.terminal !== "root")
      continue;
    const zone = firstHopZone(w);
    if (zone !== void 0)
      rootViable.add(zone);
  }
  for (const name of names) {
    if (rootViable.has(name))
      return name;
  }
  return null;
}
function pathKeyFor(node, walk) {
  if (familyParentTokenOf(node) === "rootNode")
    return "root";
  const segs = [];
  for (let i = walk.hops.length - 1; i >= 0; i -= 1) {
    const h = walk.hops[i];
    if (familyParentTokenOf(h.owner) === "rootNode")
      continue;
    segs.push(h.zone !== void 0 ? `${h.zone}/${h.owner.id}` : h.owner.id);
  }
  return `root/${[...segs, node.id].join("/")}`;
}
function pathChildrenFor(node, pathNodes) {
  const out = [];
  const seen = /* @__PURE__ */ new Set();
  for (const kid of node.children) {
    seen.add(kid.id);
    out.push(kid.id);
  }
  for (const a of node.anchors) {
    if (a.role !== "container" || typeof a.target !== "string")
      continue;
    for (const cna of linkOf(a).anchors) {
      if (cna.role !== "content")
        continue;
      const owner = cna.owner;
      if (!owner || owner === node || seen.has(owner.id) || pathNodes.has(owner.id))
        continue;
      seen.add(owner.id);
      out.push(owner.id);
    }
  }
  return out;
}
function seedOwnBindings(node, bindings) {
  for (const a of node.anchors) {
    if (typeof a.target !== "string")
      continue;
    if (a.role === "source" || a.role === "duplex") {
      const v = providerValueFor(node, a, a.target);
      if (v !== void 0 && bindings[a.target] === void 0)
        bindings[a.target] = v;
    }
  }
}
function chainRoot(root2, slice, depth = 0, seen = /* @__PURE__ */ new Set()) {
  if (seen.has(root2.id))
    return { kind: "loop" };
  seen.add(root2.id);
  const child = root2.childAnchor();
  if (!child)
    return { kind: "unplaced" };
  const parentAnchor = linkOf(child).anchorsOf("parent")[0];
  if (!parentAnchor)
    return chainSliceRule(root2, slice);
  const target = parentAnchor.target;
  if (typeof target === "string")
    return chainTokenKind2(target);
  if (typeof target === "object" && target !== null) {
    const owner = target;
    if (owner.destroyed)
      return { kind: "destroyed-owner" };
    if (owner.childAnchor() === null)
      return chainSliceRule(owner, slice);
    return chainRoot(owner, slice, depth + 1, seen);
  }
  return chainSliceRule(root2, slice);
}
function makeLayer(id, src, fields) {
  const layer = { id };
  for (const k of Object.keys(fields)) {
    const v = fields[k];
    if (v === void 0)
      continue;
    layer[k] = v;
  }
  if (src !== void 0)
    layer.sourceName = src;
  return layer;
}
function asArray(v) {
  return Array.isArray(v) ? v : [v];
}
function isHandlerClearLayer(l) {
  return typeof l.id === "string" && l.id.startsWith("slice-") && Array.isArray(l.handlers) && l.handlers.length === 0;
}
function applyDerivedBake(node, cs) {
  const baked = applyDerived(node, cs);
  if (baked?.props !== void 0)
    cs.props = baked.props;
  if (baked?.css !== void 0)
    cs.css = baked.css;
}
var Node = class _Node {
  isNode = true;
  id;
  base;
  layers;
  destroyed = false;
  /** DEFECT #11 (2026-08-15) — runtime-minted family nodes (clone-instance
   *  artifacts): reverseTranslate EXCLUDES them (the authored envelope is
   *  base truth; the graph redesign removed the need for literal cloning in
   *  placement/component logic — clone-instance is a legacy artifact guard).
   *  Runtime-only; never serialized. */
  runtimeMinted = false;
  /** ORIGIN-OWNER (archive/reviews/2026-08-16/2026-08-16-legacy-handler-reuse-review §12.4.3) — the per-node
   *  origin marker: the layer id that minted this node via `layer-apply`.
   *  Doubles as the reverse-exclusion marker (nodeToLegacy's filter, like
   *  runtimeMinted). Cleared by the teardown's survivor promotion (a moved
   *  minted node becomes authored content) and by the doomed path.
   *  Runtime-only; never serialized. */
  originLayer;
  /** HOOKS-ARRAY (OPTION C — the batch storage cell, §9.2 pin 5) — the
   *  PAYLOAD records for hook-driven mint batches, keyed by hook name. The
   *  single control handle: write → mint/replace; clear/remove → payload-
   *  controlled teardown; read → the batch + the minted set + the round-trip
   *  source. A MUTABLE runtime slot (base is frozen — the record is not
   *  authored data, it is the runtime payload); serialized alongside the
   *  node for the serialized-doc re-mint (rows are DATA, the minted nodes
   *  are DERIVED) and excluded from nodeToLegacy's reverse (the minted
   *  children are origin-excluded; the record ships only via the serialized
   *  doc path). */
  batches = {};
  _anchors;
  _dirty;
  hub;
  /** MULTI-GRAPH (D1-D8) — the graph scope this node registered into (its
   *  isolated graph partition, else the shared default). Null on the default
   *  path (the module singleton). Threaded from the host opt-in. */
  graphScope;
  _resolved = [];
  pass1;
  get anchors() {
    return this._anchors;
  }
  /** The tree's shared component/placement link hub (may be null for
   *  hub-less graphs — same-name anchors then do NOT share links and
   *  resolution falls back to graph scans). */
  get hubFor() {
    return this.hub;
  }
  get dirty() {
    return this._dirty;
  }
  constructor(data = {}, hub, id, noSeed = false, graphScope) {
    validateDerived(data.derived);
    this.id = id ?? data.id ?? mintNodeId();
    this.base = { ...data };
    Object.freeze(this.base);
    const seedBatches = data.batches;
    if (seedBatches && typeof seedBatches === "object")
      this.batches = { ...seedBatches };
    this.layers = [];
    this._anchors = [];
    this._dirty = /* @__PURE__ */ new Set();
    this.hub = hub ?? null;
    this.graphScope = graphScope ?? null;
    this.pass1 = { type: "div", props: {}, css: {}, content: void 0, handlers: [], derived: void 0 };
    if (data.type && !noSeed) {
      this.layers.push(makeLayer(`seed-${this.id}`, void 0, {
        type: data.type,
        props: data.props,
        css: data.css,
        content: data.content,
        handlers: data.handlers
      }));
    }
    registerNode(this);
    this.compileLocal();
    this.ensureAutoIds();
    const seedAnchors = data.anchors;
    if (seedAnchors && seedAnchors.length > 0) {
      let hasChildRef = false;
      for (const sa of seedAnchors) {
        const role = sa.role;
        const target = sa.target;
        if (role === "child") {
          if (this.childAnchor())
            continue;
          hasChildRef = true;
          const link2 = new Link({ name: "parent-child" });
          this.addAnchor("child", this, sa.options, link2);
          const parentTarget = sa.parent ?? target;
          const pa = { role: "parent", target: parentTarget, options: {}, link: link2 };
          if (parentTarget !== "rootNode" && parentTarget !== "component" && parentTarget !== "contentNodes") {
            const resolved = this.graphScope ? resolveNodeRef(parentTarget, this.graphScope) : resolveNodeRef(parentTarget);
            if (resolved)
              pa.target = resolved;
          }
          link2.addAnchor(pa);
          continue;
        }
        if (role === "parent")
          continue;
        const kind = role === "container" || role === "content" ? "placement" : role === "source" || role === "target" || role === "duplex" ? "component" : "parent-child";
        const link = this.hub && (kind === "placement" || kind === "component") ? this.hub.linkFor(target, kind) : new Link({ name: kind });
        try {
          const a = this.addAnchor(role, target, sa.options, link);
          if (a !== null && sa.value !== void 0)
            a.value = sa.value;
        } catch {
        }
      }
    }
  }
  childAnchor() {
    return this.anchors.find((a) => a.role === "child") ?? null;
  }
  /** DEFECT #24 (2026-08-19) — the RESOLUTION child anchor: the first 'child'
   *  anchor whose edge actually drives toward root. While a def root/child
   *  stays out-of-tree its PRIMARY family edge is the 'component'-token
   *  permanent owner (prototype); once the seam materializes the def subtree
   *  under an IN-TREE consumer, the seam child anchor becomes the resolution
   *  edge — the def realizes in-tree and the cascade flows through the def
   *  children to the placement containers (a def-internal drop-zone's placed
   *  packets start walking). The base edge still governs the family-children
   *  census + reverse emit (seam-wired nodes stay out of `consumer.children` —
   *  node.ts familyChildAnchors) and the seam can still be reverted (DEFECT
   *  #10) without dissolving the prototype's base attach. Falls back to
   *  childAnchor() when no seam edge exists (unresolved defs stay
   *  'prototype'). */
  stateChildAnchor() {
    const first = this.childAnchor();
    if (!first)
      return null;
    const pa = linkOf(first).anchorsOf("parent")[0];
    if (pa && typeof pa.target === "string") {
      for (const a of this.anchors) {
        if (a.role === "child" && a.options.seam !== void 0)
          return a;
      }
    }
    return first;
  }
  get state() {
    if (this.destroyed)
      return "destroyed";
    const child = this.stateChildAnchor();
    if (!child)
      return "unplaced";
    return this.stateFrom(child, 0, /* @__PURE__ */ new Set());
  }
  stateFrom(child, depth, seen) {
    const parentAnchor = linkOf(child).anchorsOf("parent")[0];
    if (!parentAnchor)
      return "unplaced";
    const target = parentAnchor.target;
    if (target === "rootNode")
      return "in-tree";
    if (target === "component")
      return "prototype";
    if (target === "contentNodes")
      return "in-tree";
    if (typeof target === "object" && target !== null) {
      const owner = target;
      if (owner.destroyed)
        return "unplaced";
      if (seen.has(owner.id))
        return "unplaced";
      seen.add(owner.id);
      const ownerChild = owner.stateChildAnchor();
      if (!ownerChild)
        return "unplaced";
      return owner.stateFrom(ownerChild, depth + 1, seen);
    }
    return "unplaced";
  }
  get isInTree() {
    return this.state === "in-tree";
  }
  get parent() {
    const child = this.childAnchor();
    if (!child)
      return null;
    const parentAnchor = linkOf(child).anchorsOf("parent")[0];
    if (!parentAnchor)
      return null;
    const target = parentAnchor.target;
    if (typeof target === "object" && target !== null)
      return target;
    return null;
  }
  familyChildAnchors() {
    const out = [];
    const seen = /* @__PURE__ */ new Set();
    for (const a of this.anchors) {
      if (a.role !== "parent")
        continue;
      if (a.options.seam !== void 0)
        continue;
      for (const ca of linkOf(a).anchorsOf("child")) {
        if (typeof ca.target === "object" && ca.target !== null) {
          const n = ca.target;
          if (!seen.has(n.id)) {
            seen.add(n.id);
            out.push({ anchor: ca, node: n });
          }
        }
      }
    }
    return out;
  }
  get children() {
    return this.familyChildAnchors().sort((x, y) => {
      const px = effectiveOrder2(x.anchor) ?? 0;
      const py = effectiveOrder2(y.anchor) ?? 0;
      if (px !== py)
        return px - py;
      return 0;
    }).map((x) => x.node);
  }
  get type() {
    return this.pass1.type;
  }
  get props() {
    return this.pass1.props;
  }
  get css() {
    return this.pass1.css;
  }
  /** Read-only merged derived declaration (base seeded, layers override per
   *  key — like props/css). serializeNode emits from it. */
  get derived() {
    return this.pass1.derived;
  }
  get content() {
    return this.pass1.content;
  }
  get handlers() {
    return this.pass1.handlers;
  }
  get hasHandlers() {
    if (this.base.handlers !== void 0)
      return true;
    return this.layers.some((l) => l.handlers !== void 0);
  }
  get pathKey() {
    return this.pathKeyFrom(/* @__PURE__ */ new Set());
  }
  /** Read-only pass-2 resolved states (compiled by the supervisor's pass-2).
   *  Returns a fresh shallow copy — callers can never mutate the node's cache. */
  get resolved() {
    return [...this._resolved];
  }
  pathKeyFrom(seen) {
    if (seen.has(this.id))
      return this.id;
    seen.add(this.id);
    const parent = this.parent;
    if (!parent)
      return this.state === "in-tree" ? "root" : this.id;
    return `${parent.pathKeyFrom(seen)}/${this.id}`;
  }
  addLayer(layer) {
    this.ensureWritable();
    validateDerived(layer.derived);
    const hasAnchors = Array.isArray(layer.anchors) && layer.anchors.length > 0;
    const existingIdx = this.layers.findIndex((l) => l.id === layer.id);
    if (existingIdx !== -1) {
      this.layers[existingIdx] = layer;
    } else {
      this.layers.push({ ...layer });
    }
    this.compileLocal();
    if (hasAnchors) {
      this.reconcileAnchors();
      this.markDirty("anchor-populate");
    }
    this.markRemote();
    scheduleSweep(true);
  }
  removeLayer(id) {
    this.ensureWritable();
    const idx = this.layers.findIndex((l) => l.id === id);
    if (idx === -1)
      return;
    const [layer] = this.layers.splice(idx, 1);
    if (layer === void 0)
      return;
    if (Array.isArray(layer.anchors) && layer.anchors.length > 0) {
      for (const decl of layer.anchors) {
        if (typeof decl.target !== "string")
          continue;
        const match = this.anchors.find((a) => a.role === decl.role && a.target === decl.target && (decl.options?.seam === void 0 || a.options.seam === decl.options.seam));
        if (match)
          this.removeAnchor(match);
      }
    }
    this.teardownMinted(id);
    this.compileLocal();
    this.markDirty("anchor-populate");
    this.markRemote();
    scheduleSweep(true);
  }
  removeLayersForSource(sourceName) {
    this.ensureWritable();
    const removed = this.layers.filter((l) => l.sourceName === sourceName);
    this.layers = this.layers.filter((l) => l.sourceName !== sourceName);
    for (const layer of removed) {
      if (!Array.isArray(layer.anchors) || layer.anchors.length === 0)
        continue;
      for (const decl of layer.anchors) {
        if (typeof decl.target !== "string")
          continue;
        const match = this.anchors.find((a) => a.role === decl.role && a.target === decl.target && (decl.options?.seam === void 0 || a.options.seam === decl.options.seam));
        if (match)
          this.removeAnchor(match);
      }
    }
    for (const layer of removed)
      this.teardownMinted(layer.id);
    this.compileLocal();
    this.markDirty("anchor-populate");
    this.markRemote();
    scheduleSweep(true);
  }
  /** ORIGIN-OWNER teardown (archive/reviews/2026-08-16/2026-08-16-legacy-handler-reuse-review §12.4.2/6, B2) — the
   *  PRE-DETACH survival predicate, per minted node, decided BEFORE any
   *  detach (post-detach a node is always 'unplaced', so the sweep gate can
   *  never see it in-tree): DOOMED iff the node's CURRENT family chain
   *  reaches a non-permanent terminal (chainRoot ∈ {unplaced,
   *  destroyed-owner, loop, slice-root, token 'other'}) OR the chain still
   *  passes through this origin — the whole-subtree cascade (ruling 5:
   *  includes created nodes placed elsewhere). SURVIVES iff the chain
   *  reaches a permanent token (rootNode/contentNodes/component) under a
   *  NON-origin parent — promotion: the origin marker is cleared and the
   *  node unregistered (becomes authored content, reverse-emitted;
   *  §12.4.6). Doomed nodes are detached via the shared sibling-preserving
   *  detach (detachNodeSafe — their current child anchor, wherever they
   *  moved) and the sweep cascade destroys their subtrees. The marker is
   *  cleared and the registry entry dropped for every touched node
   *  (double-remove no-ops; the record never lingers past its rollback). */
  teardownMinted(layerId) {
    const myScope = scopeOf(this);
    for (const id of mintedByOrigin(layerId, myScope)) {
      const node = myScope.byId.get(id);
      if (node) {
        let originOnChain = false;
        for (let cur = node; cur; cur = cur.parent) {
          if (cur === this) {
            originOnChain = true;
            break;
          }
        }
        const kind = chainRoot(node, /* @__PURE__ */ new Set());
        const permanent = kind.kind === "token" && (kind.token === "rootNode" || kind.token === "contentNodes" || kind.token === "component");
        if (!originOnChain && permanent) {
          node.originLayer = void 0;
        } else {
          detachNodeSafe(node);
          node.originLayer = void 0;
        }
      }
      unregisterMinted(id, myScope);
    }
  }
  /** HOOKS-ARRAY (§9.4 item 6 — payload-controlled teardown, NO-PROMOTION
   *  override for the rows namespace). Identical to `teardownMinted` EXCEPT
   *  the survivor-promotion branch is suppressed: a hook-minted row is
   *  TRANSIENT DATA — promoting it (originLayer cleared + unregistered ⇒
   *  reverse-emitted as authored content) would ship raw rows the author
   *  never wrote through nodeToLegacy (payload corruption, the R-1 letter).
   *  Every minted row of the batch is DOOMED (sibling-preserving detach →
   *  sweep cascade-destroy) regardless of where it moved. Called internally
   *  by the PAYLOAD-CONTROL clear — never addressed directly by external
   *  code. */
  rowsTeardown(layerId) {
    const myScope = scopeOf(this);
    for (const id of mintedByOrigin(layerId, myScope)) {
      const node = myScope.byId.get(id);
      if (node) {
        detachNodeSafe(node);
        node.originLayer = void 0;
      }
      unregisterMinted(id, myScope);
    }
  }
  clone(actor, opts = {}, graphScope) {
    if (this.destroyed)
      throw new Error("cannot clone a destroyed node");
    const copy = new _Node({ ...this.base }, this.hub ?? void 0, mintNodeId(), true, graphScope ?? this.graphScope ?? void 0);
    const ignore = new Set(opts.ignore ?? []);
    for (const l of this.layers) {
      if (l.id.startsWith("seed-"))
        continue;
      if (ignore.has(l.id))
        continue;
      copy.layers.push(makeLayer(l.id, l.sourceName, {
        type: l.type,
        content: l.content,
        props: l.props ? { ...l.props } : void 0,
        css: l.css ? { ...l.css } : void 0,
        handlers: l.handlers,
        anchors: l.anchors ? l.anchors.map((a) => ({ ...a })) : void 0,
        // derived rides the layer-copy loop too (spec §2): a clone inherits
        // its prototype's derived declarations (fork-stress assembly)
        derived: l.derived ? { ...l.derived, ...l.derived.props ? { props: { ...l.derived.props } } : {} } : void 0,
        // HOOKS (§7.2 pin-6 e — clone-shadowing): a hook layer rides the
        // copy (the clone carries the field via base + its OWN local layer
        // + the mirrored anchor value — no global registry)
        value: l.value,
        hookFallback: l.hookFallback
      }));
    }
    copy.compileLocal();
    for (const a of this.anchors) {
      if (a.role === "child" && typeof a.target === "string")
        continue;
      if (a.role === "parent" && a.target instanceof _Node)
        continue;
      const link = NAME_KEYED_ROLES.has(a.role) ? linkOf(a) : new Link({ name: linkOf(a).config.name });
      try {
        const copyAnchor = copy.addAnchor(a.role, a.target, { ...a.options }, link);
        if (copyAnchor !== null && a.value !== void 0)
          copyAnchor.value = a.value;
      } catch {
      }
    }
    copy.runtimeMinted = true;
    return copy;
  }
  destroy() {
    this.destroyLinks();
  }
  destroyLinks() {
    this.ensureWritable();
    let dissolved = false;
    for (const a of [...this.anchors]) {
      if (a.role === "child") {
        linkOf(a).destroy();
        dissolved = true;
      } else if (a.role === "content" || a.role === "container") {
        this.removeAnchor(a);
        dissolved = true;
      }
    }
    if (dissolved || this.childAnchor() === null)
      markPending(this);
  }
  markDestroyed() {
    this.destroyed = true;
    this.dirty.add("sweep-candidate");
  }
  markDirty(scope) {
    this.dirty.add(scope);
  }
  addAnchor(role, target, options, link) {
    this.ensureWritable();
    if ((role === "source" || role === "duplex") && typeof target === "string") {
      const existing = this.anchors.find((a) => (a.role === "source" || a.role === "duplex") && typeof a.target === "string" && a.target === target);
      if (existing) {
        console.warn("component-source-duplicate at", this.id, role, target);
        return null;
      }
    }
    const anchor = { role, target, options: { ...options }, link, owner: this };
    if (role === "child") {
      const existing = this.childAnchor();
      if (existing) {
        if (linkOf(existing).anchorsOf("parent")[0]?.target === "contentNodes") {
          linkOf(existing).destroy();
        } else if (options.seam !== void 0) {
        } else if (options.origin !== void 0) {
        } else {
          throw new SingleParentError(this.id);
        }
      }
    }
    link.addAnchor(anchor);
    this.anchors.push(anchor);
    return anchor;
  }
  removeAnchor(anchor) {
    const idx = this.anchors.indexOf(anchor);
    if (idx === -1)
      return;
    linkOf(anchor).removeAnchor(anchor);
    this.anchors.splice(idx, 1);
    if (anchor.role === "child" && this.childAnchor() === null)
      markPending(this);
  }
  familyLinkFor() {
    const existing = this.anchors.find((a) => a.role === "parent" && a.options.seam === void 0);
    if (existing)
      return linkOf(existing);
    const link = new Link({ name: "parent-child" });
    this.addAnchor("parent", this, {}, link);
    return link;
  }
  reconcileAnchors() {
    for (const layer of this.layers) {
      if (layer.anchors && layer.anchors.length > 0) {
        this.materializeAnchors(layer.anchors);
      }
    }
  }
  compileLocal() {
    const props = { ...this.base.props ?? {} };
    const css = { ...this.base.css ?? {} };
    let type = typeof this.base.type === "string" ? this.base.type : "div";
    let content = this.base.content;
    let handlers = this.base.handlers;
    let derived = this.base.derived;
    for (const layer of this.layers) {
      if (layer.type)
        type = layer.type;
      if (layer.content !== void 0)
        content = layer.content;
      if (layer.props)
        for (const k of Object.keys(layer.props))
          props[k] = layer.props[k];
      if (layer.css)
        for (const k of Object.keys(layer.css))
          css[k] = layer.css[k];
      if (layer.handlers || isHandlerClearLayer(layer)) {
        if (isHandlerClearLayer(layer)) {
          handlers = [];
        } else {
          const merged = [...handlers ?? []];
          for (const h of layer.handlers) {
            const idx = merged.findIndex((m) => m.name === h.name && m.event === h.event);
            if (idx !== -1)
              merged[idx] = h;
            else
              merged.push(h);
          }
          handlers = merged;
        }
      }
      if (layer.derived?.props || layer.derived?.css) {
        derived = {
          ...layer.derived.props ? { props: { ...derived?.props ?? {}, ...layer.derived.props } } : derived?.props ? { props: derived.props } : {},
          ...layer.derived.css ? { css: { ...derived?.css ?? {}, ...layer.derived.css } } : derived?.css ? { css: derived.css } : {}
        };
      }
    }
    this.pass1 = { type, props, css, content, handlers: handlers ?? [], derived };
    this.ensureAutoIds();
  }
  compileRemote(visited = /* @__PURE__ */ new Set(), depth = 0) {
    if (visited.has(this.id))
      return;
    visited.add(this.id);
    this.compileLocal();
    for (const kid of this.children)
      kid.compileRemote(visited, depth + 1);
  }
  /**
   * Two-pass compile over a slice. `opts.focusNodeId` scopes CONSOLE warnings
   * to one node: the slice remains the full resolution universe (bindings
   * need every provider), but only the focused node's warnings are logged —
   * atomic pass-2 updates never re-log unrelated nodes (e.g. a dangling
   * reference elsewhere in the tree).
   */
  compile(slice, opts) {
    const actionable = [];
    const dropped = [];
    const warnings = [];
    const shouldWarn = (node) => opts?.focusNodeId === void 0 || opts.focusNodeId === node.id;
    if (compilePassLogEnabled()) {
      logCompilePass(slice.map((n) => ({ id: n.id, state: n.state })), opts?.focusNodeId);
    }
    for (const node of slice)
      node.compileLocal();
    const sliceSet = new Set(slice.map((n) => n.id));
    const kinds = /* @__PURE__ */ new Map();
    for (const node of slice) {
      if (node.destroyed) {
        kinds.set(node.id, { kind: "destroyed-owner" });
        continue;
      }
      const child = node.childAnchor();
      if (!child) {
        kinds.set(node.id, { kind: "unplaced" });
        continue;
      }
      const parentAnchor = linkOf(child).anchorsOf("parent")[0];
      if (!parentAnchor) {
        kinds.set(node.id, chainSliceRule(node, sliceSet));
        continue;
      }
      const target = parentAnchor.target;
      if (typeof target === "string") {
        kinds.set(node.id, chainTokenKind2(target));
        continue;
      }
      if (typeof target === "object" && target !== null && target.destroyed) {
        kinds.set(node.id, { kind: "destroyed-owner" });
      }
    }
    for (const node of slice) {
      if (kinds.has(node.id))
        continue;
      const child = node.childAnchor();
      if (!child)
        continue;
      const parentAnchor = linkOf(child).anchorsOf("parent")[0];
      if (!parentAnchor)
        continue;
      const target = parentAnchor.target;
      if (typeof target !== "object" || target === null || kinds.has(target.id))
        continue;
      kinds.set(node.id, chainRoot(target, sliceSet));
    }
    for (const node of slice) {
      if (kinds.has(node.id))
        continue;
      const child = node.childAnchor();
      const parentAnchor = linkOf(child).anchorsOf("parent")[0];
      const parent = parentAnchor.target;
      if (sliceSet.has(parent.id) && parent.childAnchor() === null && !parent.destroyed) {
        kinds.set(node.id, { kind: "slice-root" });
      } else {
        kinds.set(node.id, kinds.get(parent.id));
      }
    }
    const viable = /* @__PURE__ */ new Set();
    for (const node of slice) {
      if (node.destroyed) {
        dropped.push({ arm: [node.id], reason: "owner-terminated" });
        continue;
      }
      const kind = kinds.get(node.id);
      if (kind.kind === "loop") {
        warnings.push({ code: "circular-source", pathKey: node.pathKey });
        if (shouldWarn(node))
          console.warn("circular-source at", node.pathKey);
        dropped.push({ arm: [node.id], reason: "loop" });
        continue;
      }
      if (kind.kind === "token" && kind.token === "component") {
        dropped.push({ arm: [node.id], reason: "prototype-terminated" });
        continue;
      }
      if (kind.kind === "token" && kind.token !== "rootNode") {
        dropped.push({ arm: [node.id], reason: "owner-terminated" });
        continue;
      }
      if (kind.kind === "destroyed-owner") {
        dropped.push({ arm: [node.id], reason: "owner-terminated" });
        continue;
      }
      if (kind.kind === "unplaced") {
        const selfProviding = node.anchors.some((a) => (a.role === "source" || a.role === "duplex") && typeof a.target === "string");
        if (selfProviding) {
          viable.add(node.id);
        } else {
          dropped.push({ arm: [node.id], reason: "owner-terminated" });
        }
        continue;
      }
      viable.add(node.id);
    }
    const hasAnyTarget = slice.some((n) => n.anchors.some((a) => a.role === "target" && typeof a.target === "string"));
    const consumedNames = /* @__PURE__ */ new Set();
    for (const n of slice) {
      for (const a of n.anchors) {
        if (a.role === "target" && typeof a.target === "string")
          consumedNames.add(a.target);
      }
    }
    const isResolutionParticipant = (node) => node.anchors.some((a) => typeof a.target === "string" && (a.role === "source" || a.role === "duplex") && consumedNames.has(a.target));
    const seamConsumedNames = /* @__PURE__ */ new Set();
    for (const n of slice) {
      for (const a of n.anchors) {
        if (a.role === "target" && typeof a.target === "string" && a.options.seam !== void 0) {
          seamConsumedNames.add(a.target);
        }
      }
    }
    const isSeamProvider = (node) => node.anchors.some((a) => typeof a.target === "string" && (a.role === "source" || a.role === "duplex") && seamConsumedNames.has(a.target));
    const makeCs = (node) => ({
      nodeId: node.id,
      pathKey: node.pathKey,
      // honest label: derived node state, never hardcoded (S1.1 carve-out
      // §10.10.4: a self-providing unplaced node compiles as 'unplaced')
      state: node.state,
      type: node.type,
      props: node.props,
      css: node.css,
      content: node.content,
      ...node.base.bodyRuns !== void 0 ? { bodyRuns: node.base.bodyRuns } : {},
      anchors: node.anchors,
      parent: node.parent ? node.parent.id : null,
      children: node.children.map((c) => c.id),
      bindings: {},
      unresolved: []
    });
    const publishOwn = (node, cs) => {
      seedOwnBindings(node, cs.bindings);
    };
    for (const node of slice) {
      const seamBearer = node.anchors.some((a) => (a.role === "target" || a.role === "duplex") && typeof a.target === "string" && (a.options.seam !== void 0 || a.options.handlerEvent !== void 0 || a.options.handlerPhase !== void 0));
      if (seamBearer && !node.destroyed || viable.has(node.id))
        node.materializeSeam();
      if (!viable.has(node.id))
        continue;
      const targetNames = node.anchors.filter((a) => a.role === "target" && typeof a.target === "string").map((a) => a.target);
      if (!hasAnyTarget || targetNames.length === 0) {
        if (hasAnyTarget && isResolutionParticipant(node) && !isSeamProvider(node))
          continue;
        const cs = makeCs(node);
        publishOwn(node, cs);
        applyDerivedBake(node, cs);
        actionable.push(cs);
        continue;
      }
      const arms = resolveArms(node, targetNames, slice, viable, kinds);
      let warnedUnresolved = false;
      for (const arm of arms) {
        if (arm.drop) {
          if (arm.drop.reason === "loop") {
            warnings.push({ code: "circular-source", pathKey: node.pathKey });
            if (shouldWarn(node))
              console.warn("circular-source at", node.pathKey);
          }
          dropped.push({ arm: [node.id], reason: arm.drop.reason });
          continue;
        }
        const cs = makeCs(node);
        cs.bindings = arm.bindings;
        seedOwnBindings(node, cs.bindings);
        cs.unresolved = arm.unresolved;
        if (arm.trace.length > 0)
          cs.trace = arm.trace;
        if (arm.keys.length > 0) {
          cs.pathKey = `${node.pathKey}${arm.keys.join("")}`;
          cs.forkKey = cs.pathKey;
        }
        if (cs.unresolved.length > 0 && !warnedUnresolved) {
          warnedUnresolved = true;
          warnings.push({ code: "unresolved-reference", pathKey: node.pathKey });
          if (shouldWarn(node))
            console.warn("unresolved-reference at", node.pathKey);
        }
        applyDerivedBake(node, cs);
        actionable.push(cs);
      }
    }
    return { actionable, dropped, warnings };
  }
  /**
   * Placement-path enumeration compile mode (P3 §2 — the third compile
   * scope). For a placement-routed node (one carrying `content` anchors), or
   * the root, enumerate every valid (node, owner-path) pair toward root —
   * placement edges (content anchor → per-name placement Link → each
   * container-role producer anchor → its owner) plus family edges — and mint
   * ONE CompiledState per viable path. §1.2 preference-ordered first-match
   * prunes the compiled node's OWN request to the chosen name's branches
   * (names after it are never consulted; names before it with no viable
   * container are skipped); every zone of the chosen name fans out. `forkKey`
   * = `pathKey` on every path-state (§2.2); `activePlacement` = the chosen
   * name (§2.5); component targets resolve path-only (Q8). Loop-terminated
   * paths drop with a `circular-source` warning; token/no-edge-terminated
   * paths drop silently (§2.4 arm disposition). Path-derived children attach
   * at mint time (§2.3).
   */
  compilePath() {
    const actionable = [];
    const dropped = [];
    const warnings = [];
    if (this.destroyed) {
      return { actionable, dropped: [{ arm: [this.id], reason: "owner-terminated" }], warnings };
    }
    this.compileLocal();
    this.materializeSeam();
    if (this.anchors.some((a) => a.role === "child" && a.options.seam !== void 0)) {
      return { actionable: [], dropped: [], warnings: [] };
    }
    const walks = enumPathWalks(this, /* @__PURE__ */ new Set([this.id]), []);
    const chosen = chosenPlacementName(this, walks);
    for (const w of walks) {
      if (chosen !== null) {
        const firstZone = firstHopZone(w);
        if (firstZone !== void 0 && firstZone !== chosen)
          continue;
      }
      if (w.terminal === "loop") {
        const at = w.loopKey ?? this.pathKey;
        warnings.push({ code: "circular-source", pathKey: at });
        console.warn("circular-source at", at);
        dropped.push({ arm: [this.id], reason: "loop" });
        continue;
      }
      if (w.terminal === "token") {
        dropped.push({ arm: [this.id], reason: w.token === "component" ? "prototype-terminated" : "owner-terminated" });
        continue;
      }
      if (w.terminal !== "root") {
        dropped.push({ arm: [this.id], reason: "owner-terminated" });
        continue;
      }
      actionable.push(this.mintPathState(w));
    }
    return { actionable, dropped, warnings };
  }
  mintPathState(walk) {
    const pathKey = pathKeyFor(this, walk);
    const pathNodes = /* @__PURE__ */ new Set([this.id, ...walk.hops.map((h) => h.owner.id)]);
    const cs = {
      nodeId: this.id,
      pathKey,
      // §2.2: forkKey = pathKey on EVERY path-state, unconditionally
      forkKey: pathKey,
      // §2.5: activePlacement — the CHOSEN name = the zone name of the
      // state's own first placement hop. Never authored; absent on
      // non-placement (family-first) states. (Derived `placement` root reads
      // it per-path — derived.ts §2.3 wiring is a later unit.)
      ...firstHopZone(walk) !== void 0 ? { activePlacement: firstHopZone(walk) } : {},
      // §9-Q3: the per-path event trace — the path's node ids, root-down
      // (hops are bottom-up; the root landing contributes nothing). The
      // supervisor's "path-state ⇒ emit {forkKey, nodeIds}" fork payload
      // reads this (no `#f`-grammar dependency — C-6 re-expression).
      trace: [...walk.hops.map((h) => h.owner.id).reverse(), this.id],
      // honest label: the NODE's derived state, never hardcoded — viability
      // is a property of the path, not the family label (§2.4)
      state: this.state,
      type: this.type,
      props: this.props,
      css: this.css,
      content: this.content,
      ...this.base.bodyRuns !== void 0 ? { bodyRuns: this.base.bodyRuns } : {},
      anchors: this.anchors,
      // the path's parent: the landing owner of the node's first hop
      parent: walk.hops.length > 0 ? walk.hops[0].owner.id : null,
      // §2.3: path-derived children attach at mint time (graph-derived,
      // never recompiling the child states)
      children: pathChildrenFor(this, pathNodes),
      bindings: {},
      unresolved: []
    };
    resolvePathTargets(this, walk.hops.map((h) => h.owner), cs.bindings, cs.unresolved);
    seedOwnBindings(this, cs.bindings);
    applyDerivedBake(this, cs);
    return cs;
  }
  applySlice(mutation, sourceName) {
    this.ensureWritable();
    this.markDirty("remote");
    const createdLayers = [];
    const hookUndo = [];
    for (const m of mutation) {
      const src = m.sourceName ?? sourceName;
      const id = `slice-${nodeSeq++}-${src ?? "op"}`;
      if (m.targetProp === "type") {
        this.addLayer(makeLayer(id, src, { type: m.value }));
        createdLayers.push(id);
      } else if (m.targetProp === "content") {
        this.addLayer(makeLayer(id, src, { content: m.value }));
        createdLayers.push(id);
      } else if (m.targetProp === "handlers") {
        this.addLayer(makeLayer(id, src, { handlers: m.value }));
        createdLayers.push(id);
      } else if (m.targetProp.startsWith("props.")) {
        const key = m.targetProp.slice("props.".length);
        this.applyPropSlice(id, key, m.mode, m.value, src);
        createdLayers.push(id);
      } else if (m.targetProp.startsWith("css.")) {
        const key = m.targetProp.slice("css.".length);
        this.addLayer(makeLayer(id, src, { css: { [key]: m.value } }));
        createdLayers.push(id);
      } else if (m.targetProp.startsWith("hooks.")) {
        const fact = this.applyHookSlice(m.targetProp.slice("hooks.".length), m.mode, m.value, src);
        if (fact)
          hookUndo.push(fact);
      }
    }
    scheduleSweep(true);
    return { createdLayers, hookUndo };
  }
  /** HOOKS §7.3 — the hook write: resolve the name against the node's own
   *  source/duplex anchors (`hook-name-unresolved` / `hook-seam-exempt`
   *  containment), mirror the provider anchor's value (`a.value = value`) so
   *  serializeNode/loadState/nodeToLegacy ship ONE value source (the anchor
   *  — they already ship `a.value`; zero changes there; the FIELD carries
   *  only the NAMES — the value lives in the component binding), and land
   *  ONE `hook-<name>` layer holding the VALUE ONLY — no anchors (removeLayer
   *  safety, DEFECT #10), no props keys (no authored-prop collision — the
   *  value rides the layer's dedicated `value` slot). Same-value writes
   *  short-circuit (the seam-content precedent). `mode` is 'replace' only
   *  (`hook-mode-blocked`). `value: undefined` CLEARS the hook: the layer is
   *  removed and the authored value (preserved as `hookFallback` at the
   *  first write) restores to the anchor. */
  applyHookSlice(name, mode, value, src) {
    if (name.length === 0) {
      console.warn(`hook-name-unresolved at ${this.id}: hooks.<name> needs a name; mutation skipped`);
      return null;
    }
    if (mode !== "replace") {
      console.warn(`hook-mode-blocked at ${this.id}: hooks.${name} accepts 'replace' only; mutation skipped`);
      return null;
    }
    const kind = (this.base.hooksKind ?? {})[name];
    if (kind !== void 0 && kind !== "value") {
      console.warn(`hook-kind-mismatch at ${this.id}: hooks.${name} declared kind "${kind}" mints nodes; scalar value write skipped`);
      return null;
    }
    const guard = hookWriteGuard(this, name);
    if (!guard.ok) {
      if (guard.code === "hook-name-unresolved") {
        console.warn(`hook-name-unresolved at ${this.id}: no source/duplex anchor named "${name}"; mutation skipped`);
      } else {
        console.warn(`hook-seam-exempt at ${this.id}: "${name}" is a seam/def-shaped provider; hook write skipped (a hook write would tear down the seam)`);
      }
      return null;
    }
    const anchor = guard.anchor;
    const layerId = `hook-${name}`;
    const existing = this.layers.find((l) => l.id === layerId);
    const preValue = anchor.value;
    if (value === void 0) {
      if (existing !== void 0) {
        anchor.value = existing.hookFallback;
        this.removeLayer(layerId);
        return { name, preValue, created: false, cleared: true };
      }
      return null;
    }
    if (existing !== void 0 && existing.value === value)
      return null;
    if (existing !== void 0) {
      this.addLayer(makeLayer(layerId, src, { value, hookFallback: existing.hookFallback }));
    } else {
      this.addLayer(makeLayer(layerId, src, { value, hookFallback: anchor.value }));
    }
    anchor.value = value;
    return { name, preValue, created: existing === void 0, cleared: false };
  }
  applyPropSlice(id, key, mode, value, src) {
    if (mode === "replaceAll") {
      this.addLayer(makeLayer(id, src, { props: { [key]: value } }));
      return;
    }
    const existing = this.props[key];
    if (mode === "append" && Array.isArray(existing)) {
      this.addLayer(makeLayer(id, src, { props: { [key]: [...existing, ...asArray(value)] } }));
      return;
    }
    this.addLayer(makeLayer(id, src, { props: { [key]: value } }));
  }
  orphan(childAnchor) {
    const idx = this.anchors.indexOf(childAnchor);
    if (idx === -1)
      return;
    linkOf(childAnchor).removeAnchor(childAnchor);
    this.anchors.splice(idx, 1);
    markPending(this);
  }
  __onLinkDissolve(anchor) {
    if (anchor.role !== "child")
      return;
    if (this.childAnchor() === null)
      markPending(this);
  }
  /** internal — the Supervisor writes pass-2 resolved states here (stored as
   *  a copy). Never call from app code; read-only via the `resolved` getter. */
  __setResolved(states) {
    this._resolved = [...states];
  }
  materializeAnchors(decls) {
    for (const decl of decls) {
      const role = decl.role;
      const target = decl.target;
      if (role === "child" && this.childAnchor())
        continue;
      const targetKey2 = typeof target === "string" ? target : target.id;
      if (this.anchors.some((a) => a.role === role && (typeof a.target === "string" ? a.target : a.target.id) === targetKey2)) {
        continue;
      }
      let link;
      if (role === "container" || role === "content" || typeof decl.target === "string") {
        const key = typeof decl.target === "string" ? decl.target : "slot";
        const fromHub = this.hub?.linkFor(key, role === "container" || role === "content" ? "placement" : "component");
        link = fromHub ? fromHub : new Link({ name: role === "container" || role === "content" ? "placement" : "component" });
      } else {
        link = new Link({ name: "component" });
      }
      try {
        this.addAnchor(role, target, decl.options ?? {}, link);
      } catch {
      }
    }
  }
  /** D7/ALS-7 (G28) — the seam CONTENT layer for translate-planned
   *  `target: 'content'` bindings: the def's own `content` field (when the
   *  def has one) lands as a layer `content` VALUE, merged by compileLocal
   *  into the node's compiled content slot (base seeded, layers override).
   *  Idempotent across recompiles (the layer replaces itself by id); a def
   *  WITHOUT a `content` field delivers nothing (the consumer keeps its
   *  authored content); `'children'`/`'type'` seam targets carry no content.
   *  The def is resolved off the per-name component Link (the provider
   *  registry) — never scalarBinding, never the def's children. */
  materializeSeam() {
    let contentChanged = false;
    const activeSeamTargets = /* @__PURE__ */ new Set();
    for (const a of this.anchors) {
      if (a.role !== "target" && a.role !== "duplex" || typeof a.target !== "string")
        continue;
      if (a.options.seam !== void 0)
        activeSeamTargets.add(a.target);
    }
    for (const pa of [...this.anchors]) {
      if (pa.role !== "parent" || pa.options.seamTarget === void 0)
        continue;
      if (activeSeamTargets.has(pa.options.seamTarget))
        continue;
      linkOf(pa).destroy();
    }
    for (const a of this.anchors) {
      if (a.role !== "target" && a.role !== "duplex" || typeof a.target !== "string")
        continue;
      const seam = a.options.seam;
      if (a.options.handlerEvent !== void 0) {
        contentChanged = this.rebuildHandlerSeamLayer() || contentChanged;
        continue;
      }
      if (seam === void 0)
        continue;
      const link = linkOf(a);
      const value = providerValueFromLink(link);
      if (seam === "content") {
        if (typeof value !== "object" || value === null || Array.isArray(value) || value.content === void 0) {
          contentChanged = this.clearSeamContentLayers(a.target) || contentChanged;
          continue;
        }
        const def = value;
        const layer = { id: `seam-content-${a.target}`, content: def.content };
        const idx = this.layers.findIndex((l) => l.id === layer.id);
        if (idx !== -1 && this.layers[idx] !== void 0 && this.layers[idx].content === def.content)
          continue;
        if (idx !== -1)
          this.layers[idx] = layer;
        else
          this.layers.push(layer);
        contentChanged = true;
        continue;
      }
      if (typeof value !== "object" || value === null || Array.isArray(value))
        continue;
      const myScope = scopeOf(this);
      const protos = defPrototypesFor(link, myScope);
      const defRoot = defRootPrototypeFor(link, myScope);
      if (seam === "children" && defRoot !== void 0) {
        if (!this.hasSeamParentFor(defRoot)) {
          const seamLink = new Link({ name: "parent-child" });
          this.addAnchor("parent", this, { seam: true, seamTarget: a.target }, seamLink);
          defRoot.addAnchor("child", defRoot, { seam: true }, seamLink);
        }
        if (defRoot.rebuildHandlerSeamLayer())
          defRoot.compileLocal();
        for (const proto of protos) {
          if (defRoot.hasSeamParentFor(proto))
            continue;
          const seamLink = new Link({ name: "parent-child" });
          defRoot.addAnchor("parent", defRoot, { seam: true }, seamLink);
          proto.addAnchor("child", proto, { seam: true }, seamLink);
        }
        continue;
      }
      if (defRoot !== void 0) {
        if (defRoot.rebuildHandlerSeamLayer())
          defRoot.compileLocal();
        this.copyDefPhaseHandlers(defRoot);
        this.adoptDefChildren(defRoot);
      }
      for (const proto of protos) {
        if (this.hasSeamParentFor(proto))
          continue;
        const seamLink = new Link({ name: "parent-child" });
        this.addAnchor("parent", this, { seam: true, seamTarget: a.target }, seamLink);
        proto.addAnchor("child", proto, { seam: true }, seamLink);
        for (const pa of proto.anchors) {
          if (pa.role !== "container" && pa.role !== "content" || typeof pa.target !== "string")
            continue;
          if (this.anchors.some((x) => x.role === pa.role && x.target === pa.target && x.link === pa.link))
            continue;
          this.addAnchor(pa.role, pa.target, {}, pa.link);
        }
      }
    }
    if (contentChanged)
      this.compileLocal();
  }
  /** ALS-2 idempotency — has the consumer already a seam parent anchor whose
   *  passed child link's child side sits on `proto`? */
  hasSeamParentFor(proto) {
    return this.anchors.some((a) => a.role === "parent" && a.options.seam !== void 0 && a.link.anchorsOf("child").some((ca) => ca.target === proto));
  }
  /** DEFECT #13/#14 (2026-08-15) — rebuild the consumer's SINGLE
   *  provenance-marked handler-seam layer from ALL its handlerEvent anchors
   *  (FORMAT MARKER: legacy bodies installed WRAPPED — the `(event, context)`
   *  arg order restored via eventStub + legacyContext; modern bodies raw).
   *  Idempotent: the rebuilt layer replaces in place. */
  rebuildHandlerSeamLayer() {
    if (this.layers.some(isHandlerClearLayer)) {
      const before = this.layers.length;
      this.layers = this.layers.filter((l) => l.sourceName !== "handler-seam");
      return this.layers.length !== before;
    }
    const entries = [];
    let stale = false;
    for (const a of this.anchors) {
      if (a.role !== "target" && a.role !== "duplex" || typeof a.target !== "string")
        continue;
      if (a.options.handlerEvent === void 0 && a.options.handlerPhase === void 0)
        continue;
      const def = handlerDef(a.target, scopeOf(this));
      if (def) {
        try {
          const compiled = compileHandlerBody(def.body);
          entries.push(a.options.handlerPhase !== void 0 ? { name: def.name, phase: a.options.handlerPhase, body: def.format === "legacy" ? wrapLegacyHandler(compiled, a.options.handlerPhase) : compiled } : { name: def.name, event: a.options.handlerEvent, body: def.format === "legacy" ? wrapLegacyHandler(compiled, a.options.handlerEvent) : compiled });
        } catch {
          console.warn(`handler-body-invalid at seam def "${a.target}": the body does not evaluate; entry skipped`);
        }
      }
    }
    if (entries.length === 0) {
      const before = this.layers.length;
      this.layers = this.layers.filter((l) => l.sourceName !== "handler-seam");
      return this.layers.length !== before;
    }
    const layer = { id: "seam-handlers", sourceName: "handler-seam", handlers: entries };
    const idx = this.layers.findIndex((l) => l.id === layer.id);
    if (idx !== -1 && this.layers[idx] !== void 0 && JSON.stringify(this.layers[idx].handlers) === JSON.stringify(layer.handlers))
      return stale;
    if (idx !== -1)
      this.layers[idx] = layer;
    else
      this.layers.push(layer);
    return true;
  }
  /** AUTH-SEAM (2026-08-15) — copy the def-root's compiled phase-handler
   *  entries onto the consumer's own seam layer (`seam-handlers-def`,
   *  replace-in-place, idempotent). The consumer's own handlerEvent anchors
   *  keep their `seam-handlers` layer; compileLocal's append-with-override
   *  merge combines both. */
  copyDefPhaseHandlers(defRoot) {
    if (this.layers.some(isHandlerClearLayer)) {
      const idx2 = this.layers.findIndex((l) => l.id === "seam-handlers-def");
      if (idx2 !== -1)
        this.layers.splice(idx2, 1);
      return;
    }
    const src = defRoot.layers.find((l) => l.sourceName === "handler-seam");
    const entries = src?.handlers ?? [];
    const idx = this.layers.findIndex((l) => l.id === "seam-handlers-def");
    if (entries.length === 0) {
      if (idx !== -1) {
        this.layers.splice(idx, 1);
        this.compileLocal();
      }
      return;
    }
    const layer = { id: "seam-handlers-def", sourceName: "handler-seam", handlers: entries };
    if (idx !== -1)
      this.layers[idx] = layer;
    else
      this.layers.push(layer);
    this.compileLocal();
  }
  /** AUTH-SEAM (2026-08-15) — when the def-root carries a PHASE-handler
   *  binding, the consumer RE-HOMES the def-root's children: the def child's
   *  PRIMARY family edge moves from the def-root (token-terminated, never
   *  compiles) to the consumer's family link — the assembled component's
   *  child is an IN-TREE node, so the legacy handler's ctx.node.children
   *  walk + the clientAPI apply surface land on it. Idempotent: children
   *  already on the consumer's family link are skipped. The adopted child
   *  anchor carries the seam flag (G24 admission — a second child anchor
   *  beside the seam-wired one); the def child is marked runtimeMinted
   *  (reverse-excluded like a clone-instance — the authored truth is the
   *  def's children data, shipped via the seam binding). */
  adoptDefChildren(defRoot) {
    const phaseBound = defRoot.anchors.some((a) => (a.role === "target" || a.role === "duplex") && typeof a.target === "string" && a.options.handlerPhase !== void 0);
    if (!phaseBound)
      return;
    const fam = this.familyLinkFor();
    const kids = defRoot.children;
    let changed = false;
    for (let i = 0; i < kids.length; i++) {
      const kid = kids[i];
      if (fam.anchorsOf("child").some((ca) => ca.target === kid))
        continue;
      const primary = kid.childAnchor();
      if (primary && linkOf(primary).anchorsOf("parent")[0]?.target === defRoot) {
        linkOf(primary).destroy();
      }
      kid.runtimeMinted = true;
      kid.addAnchor("child", kid, { priority: i, seam: true }, fam);
      changed = true;
    }
    if (changed)
      this.compileLocal();
  }
  clearHandlerSeamLayers(target) {
    let removed = false;
    this.layers = this.layers.filter((l) => {
      if (l.id.startsWith(`seam-handlers-${target}`)) {
        removed = true;
        return false;
      }
      return true;
    });
    return removed;
  }
  clearSeamContentLayers(target) {
    let removed = false;
    this.layers = this.layers.filter((l) => {
      if (l.id.startsWith(`seam-content-${target}`)) {
        removed = true;
        return false;
      }
      return true;
    });
    return removed;
  }
  ensureWritable() {
    if (this.destroyed)
      throw new Error("destroyed node writes are rejected");
  }
  markRemote() {
    const parent = this.parent;
    if (parent)
      parent.dirty.add("remote");
    for (const kid of this.children)
      kid.dirty.add("remote");
  }
  ensureAutoIds() {
    if (typeof this.pass1.props.id !== "string") {
      this.pass1.props.id = `preempt-node-${this.id}`;
    }
  }
};
function reconcileParentTargets(nodes) {
  const byId = /* @__PURE__ */ new Map();
  for (const n of nodes)
    byId.set(n.id, n);
  const familyLinks = /* @__PURE__ */ new Map();
  for (const n of nodes) {
    for (const a of [...n.anchors]) {
      if (a.role !== "child")
        continue;
      const link = a.link;
      const pa = link.anchorsOf("parent")[0];
      if (!pa)
        continue;
      if (typeof pa.target === "string") {
        const resolved = byId.get(pa.target);
        if (resolved)
          pa.target = resolved;
      }
      if (typeof pa.target === "object" && pa.target !== null) {
        const parentNode = pa.target;
        let famLink = familyLinks.get(parentNode.id);
        if (!famLink) {
          famLink = new Link({ name: "parent-child" });
          familyLinks.set(parentNode.id, famLink);
          parentNode.addAnchor("parent", parentNode, {}, famLink);
        }
        if (famLink !== link) {
          const oldIdx = link.anchors.indexOf(a);
          if (oldIdx !== -1)
            link.anchors.splice(oldIdx, 1);
          a.link = famLink;
          famLink.addAnchor(a);
        }
      }
    }
  }
}
function findCycle(node, dest) {
  let current = dest;
  const seen = /* @__PURE__ */ new Set();
  while (current) {
    if (current === node)
      return true;
    if (seen.has(current))
      break;
    seen.add(current);
    current = current.parent;
  }
  return false;
}

// node_modules/provident-ssr/dist/core/translate.js
function createLinkHub() {
  const m = /* @__PURE__ */ new Map();
  return {
    linkFor(name, kind) {
      const key = `${kind}:${name}`;
      let l = m.get(key);
      if (!l) {
        l = new Link({ name: kind });
        m.set(key, l);
      }
      return l;
    }
  };
}
function attachToPermanentOwner(node, target) {
  const link = new Link({ name: "parent-child" });
  node.addAnchor("child", node, { priority: 0 }, link);
  link.addAnchor({ role: "parent", target, options: {}, link });
}
function familyLinkFor(parent) {
  const existing = parent.anchors.find((a) => a.role === "parent");
  if (existing)
    return existing.link;
  const link = new Link({ name: "parent-child" });
  parent.addAnchor("parent", parent, {}, link);
  return link;
}
function attachChild(parent, child, priority) {
  const link = familyLinkFor(parent);
  child.addAnchor("child", child, { priority }, link);
}
function warn(warnings, code, path, detail) {
  warnings.push(path !== void 0 ? { code, path } : { code });
  const at = path !== void 0 ? ` at ${path}` : "";
  console.warn(`[legacy-translate] ${code}${at}: ${detail}`);
}
var LEGACY_LIFECYCLE_EVENTS = /* @__PURE__ */ new Set([
  "beforeAssembly",
  "afterAssembly",
  "beforeRender",
  "afterRender",
  "beforeInstantiate",
  "afterInstantiate",
  "beforePreprocessing",
  "afterPreprocessing",
  "beforeValidation",
  "afterValidation",
  "beforePostprocessing",
  "afterPostprocessing",
  "beforeComponentRouting",
  "afterComponentRouting",
  "beforeSlotAssembly",
  "afterSlotAssembly"
]);
var LEGACY_HANDLER_PHASES = /* @__PURE__ */ new Set(["before-compile", "after-compile", "after-render"]);
function kebabKey(key) {
  const dashed = key.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);
  return dashed.startsWith("ms-") && key.startsWith("ms") ? `-${dashed}` : dashed;
}
function camelKey(key) {
  const parts = key.split("-").filter((p) => p.length > 0);
  if (parts.length === 0)
    return "";
  const start = key.startsWith("-") ? 1 : 0;
  let out = parts[0];
  for (let i = 1; i < parts.length; i++) {
    out += parts[i][0].toUpperCase() + parts[i].slice(1);
  }
  if (start === 1)
    out = out[0].toUpperCase() + out.slice(1);
  return out;
}
function serializeStyle(style) {
  const parts = [];
  for (const [key, value] of Object.entries(style)) {
    parts.push(`${kebabKey(key)}: ${String(value)};`);
  }
  return parts.join(" ");
}
function parseStyle(str) {
  const out = {};
  const parts = [];
  let buf = "";
  let urlDepth = 0;
  for (let i = 0; i < str.length; i++) {
    const ch = str[i];
    if (urlDepth === 0) {
      if (str.startsWith("url(", i)) {
        urlDepth = 1;
        buf += "url(";
        i += 3;
        continue;
      }
      if (ch === ";") {
        parts.push(buf);
        buf = "";
        continue;
      }
    } else if (ch === "(") {
      urlDepth++;
    } else if (ch === ")") {
      urlDepth--;
    }
    buf += ch;
  }
  if (buf.trim() !== "")
    parts.push(buf);
  for (const part of parts) {
    const idx = part.indexOf(":");
    if (idx <= 0)
      continue;
    const key = camelKey(part.slice(0, idx).trim());
    if (key.length === 0)
      continue;
    out[key] = part.slice(idx + 1).trim();
  }
  return out;
}
function nodeDataHasBodyRuns(nodeData) {
  return nodeData.bodyRuns !== void 0 && Array.isArray(nodeData.bodyRuns) && nodeData.bodyRuns.every((r) => r !== null && typeof r === "object" && ("text" in r && typeof r.text === "string" || "child" in r && typeof r.child === "string"));
}
function baseFrom(nodeData, derived, warnings, path) {
  const base = {};
  if (typeof nodeData.type === "string")
    base.type = nodeData.type;
  if (nodeData.content !== void 0)
    base.content = nodeData.content;
  if (nodeData.bodyRuns !== void 0) {
    if (Array.isArray(nodeData.bodyRuns) && nodeData.bodyRuns.every((r) => r !== null && typeof r === "object" && ("text" in r && typeof r.text === "string" || "child" in r && typeof r.child === "string"))) {
      base.bodyRuns = nodeData.bodyRuns;
    } else {
      warn(warnings, "body-runs-shape-invalid", path, "bodyRuns must be an array of {text} / {child} runs; field skipped");
    }
  }
  if (nodeData.props !== void 0)
    base.props = nodeData.props;
  if (nodeData.css !== void 0) {
    const css = { ...nodeData.css };
    if (typeof css.style === "object" && css.style !== null) {
      css.style = serializeStyle(css.style);
    }
    base.css = css;
  }
  if (nodeData.handlers !== void 0) {
    const kept = [];
    nodeData.handlers.forEach((h, i) => {
      const hp = `${path}.handlers[${i}]`;
      if (h.phase !== void 0 && !LEGACY_HANDLER_PHASES.has(h.phase)) {
        warn(warnings, "handler-phase-unknown", hp, `phase "${String(h.phase)}" is not a supported lifecycle phase; handler definition skipped`);
        return;
      }
      if (h.body !== void 0 && typeof h.body !== "function" && typeof h.body !== "string") {
        warn(warnings, "handler-body-invalid", hp, "body must be a function or a function-source string; handler definition skipped");
        return;
      }
      const fmt = h.format;
      const format = fmt === "legacy" || fmt === "modern" ? fmt : void 0;
      if (fmt !== void 0 && format === void 0) {
        warn(warnings, "handler-format-invalid", hp, `format "${String(fmt)}" is not 'legacy' or 'modern'; falling back to the inline default (modern)`);
      }
      if (typeof h.body === "string") {
        try {
          const fn = instantiateHandlerBody(h.body);
          const { format: _authoredFormat, ...hRest2 } = h;
          if (format === "legacy") {
            kept.push({ ...hRest2, format, body: wrapLegacyHandler(fn, h.event ?? h.name), sourceBody: h.body });
          } else {
            kept.push({ ...hRest2, ...format !== void 0 ? { format } : {}, body: fn });
          }
        } catch (e) {
          const reason = e instanceof Error ? e.message : String(e);
          if (e instanceof EvalError || /refused to evaluate|unsafe-eval|Content Security Policy/i.test(reason)) {
            warn(warnings, "handler-body-eval-blocked", hp, `body string was blocked from evaluation by the environment (${reason}); handler definition skipped`);
            return;
          }
          warn(warnings, "handler-body-invalid", hp, `body string failed to instantiate (${reason}); handler definition skipped`);
        }
        return;
      }
      const { format: _authoredFormat2, ...hRest } = h;
      if (format === "legacy" && typeof h.body === "function") {
        kept.push({ ...hRest, format, body: wrapLegacyHandler(h.body, h.event ?? h.name) });
      } else {
        kept.push({ ...hRest, ...format !== void 0 ? { format } : {}, ...h.body !== void 0 ? { body: h.body } : {} });
      }
    });
    base.handlers = kept;
  }
  if (derived !== void 0) {
    validateDerived(derived);
    base.derived = derived;
  }
  if (nodeData.hooks !== void 0) {
    if (!Array.isArray(nodeData.hooks)) {
      warn(warnings, "hooks-shape-invalid", path, "hooks must be an array of hook names; field skipped");
    } else {
      const kept = [];
      nodeData.hooks.forEach((h, i) => {
        if (typeof h !== "string" || h.length === 0) {
          warn(warnings, "hooks-shape-invalid", `${path}.hooks[${i}]`, "a hook name must be a non-empty string; entry skipped");
          return;
        }
        kept.push(h);
      });
      if (kept.length > 0)
        base.hooks = kept;
    }
  }
  if (nodeData.hooksKind !== void 0) {
    if (typeof nodeData.hooksKind !== "object" || nodeData.hooksKind === null || Array.isArray(nodeData.hooksKind)) {
      warn(warnings, "hooks-kind-shape-invalid", path, "hooksKind must be a name\u2192kind record; field skipped");
    } else {
      const kept = {};
      for (const [name, kind] of Object.entries(nodeData.hooksKind)) {
        if (name.length === 0) {
          warn(warnings, "hooks-kind-shape-invalid", `${path}.hooksKind`, "a hook kind key must be a non-empty name; entry skipped");
          continue;
        }
        if (typeof kind !== "string" || kind.length === 0) {
          warn(warnings, "hooks-kind-shape-invalid", `${path}.hooksKind.${name}`, "a hook kind must be a non-empty string; entry skipped");
          continue;
        }
        if (kind !== "value" && kind !== "component" && kind !== "placement") {
          warn(warnings, "hooks-kind-unknown", `${path}.hooksKind.${name}`, `unknown hook kind "${kind}" (value/component/placement); entry skipped`);
          continue;
        }
        kept[name] = kind;
      }
      if (Object.keys(kept).length > 0)
        base.hooksKind = kept;
    }
  }
  return base;
}
function instantiateHandlerBody(src) {
  const fn = new Function(`return (${src})`)();
  if (typeof fn !== "function") {
    throw new Error(`legacy-handler-body: "${src}" does not evaluate to a function`);
  }
  return fn;
}
var CSS_BLOCKED_TARGETS = /* @__PURE__ */ new Set(["css", "css.id", "css.style"]);
function classifyTarget(target, reference, authoredDerived, warnings, path) {
  if (target === "type" || target === "content" || target === "children") {
    return { seam: target };
  }
  if (target.startsWith("props.")) {
    const rest = target.slice("props.".length);
    if (rest.length === 0) {
      warn(warnings, "component-target-skipped", path, `target "${target}": empty props key (syntax edge); no apply`);
      return {};
    }
    if (rest.includes(".")) {
      warn(warnings, "component-target-skipped", path, `target "${target}": dotted props keys have no write seam; no apply`);
      return {};
    }
    const key = rest;
    if (key === "id") {
      warn(warnings, "component-target-skipped", path, `target "${target}": props.id collides with the reserved derived key; no apply`);
      return {};
    }
    if (reference.includes(".")) {
      warn(warnings, "component-target-skipped", path, `reference "${reference}" is dotted \u2014 bindings.<ref> synthesis is impossible; no apply`);
      return {};
    }
    if (authoredDerived?.props?.[key] !== void 0) {
      return {};
    }
    return { applyPath: target, synthesized: { props: { [key]: { $: `bindings.${reference}` } } } };
  }
  if (target === "props" || target.startsWith("props:")) {
    warn(warnings, "component-target-skipped", path, `target "${target}": malformed props form (syntax edge); no apply`);
    return {};
  }
  if (/^handlers\.[^.\s]+$/.test(target)) {
    const event = target.slice("handlers.".length);
    if (LEGACY_LIFECYCLE_EVENTS.has(event)) {
      if (event === "afterAssembly") {
        return { handlerPhase: "after-compile" };
      }
      warn(warnings, "handler-phase-unknown", path, `target "${target}": "${event}" is a legacy lifecycle phase, not an event; binding skipped (N5)`);
      return {};
    }
    return { handlerEvent: event };
  }
  if (target === "css.classes") {
    if (reference.includes(".")) {
      warn(warnings, "component-target-skipped", path, `reference "${reference}" is dotted \u2014 bindings.<ref> synthesis is impossible; no apply`);
      return {};
    }
    if (authoredDerived?.css?.classes !== void 0) {
      return {};
    }
    return { applyPath: target, synthesized: { css: { classes: { $: `bindings.${reference}` } } } };
  }
  if (CSS_BLOCKED_TARGETS.has(target) || /^css\.style\.[^.\s]+$/.test(target)) {
    warn(warnings, "component-target-skipped", path, `target "${target}" is a blocked css-family target (no component injection seam; batch css via target 'type' \u2192 prototype, css.id is never set by component); no apply`);
    return {};
  }
  if (target.startsWith("css.") && target.endsWith(".")) {
    warn(warnings, "component-target-skipped", path, `target "${target}": empty css sub-element (syntax edge); no apply`);
    return {};
  }
  warn(warnings, "component-target-gap", path, `target "${target}" is not a known legacy target path; no apply`);
  return {};
}
function planBindings(component, authoredDerived, warnings, path, graphScope) {
  const plans = [];
  if (component === void 0 || component === null)
    return { plans, count: 0 };
  const list = Array.isArray(component) ? component : [component];
  const seenReferences = /* @__PURE__ */ new Set();
  const seenTargets = /* @__PURE__ */ new Set();
  for (const raw of list) {
    const binding = typeof raw === "object" && raw !== null ? raw : null;
    const reference = binding?.reference;
    if (typeof reference !== "string" || reference.length === 0) {
      warn(warnings, "component-binding-empty", path, "binding lacks a non-empty string `reference`; no anchors created");
      continue;
    }
    if (seenReferences.has(reference)) {
      warn(warnings, "component-duplicate-reference", path, `reference "${reference}" is already bound on this node; duplicate blocked`);
      continue;
    }
    seenReferences.add(reference);
    const target = typeof binding.target === "string" && binding.target.length > 0 ? binding.target : void 0;
    if (target !== void 0) {
      if (seenTargets.has(target)) {
        warn(warnings, "component-duplicate-target", path, `target "${target}" is already bound on this node; duplicate blocked`);
        continue;
      }
      seenTargets.add(target);
    }
    const plan = {
      reference,
      role: binding.value !== void 0 ? target !== void 0 ? "duplex" : "source" : "target"
    };
    if (binding.value !== void 0) {
      plan.value = binding.value;
      const v = binding.value;
      if (typeof v === "object" && v !== null && typeof v.name === "string" && v.name.length > 0 && typeof v.body === "string") {
        const fmt = v.format;
        let format = "legacy";
        if (fmt === "legacy" || fmt === "modern") {
          format = fmt;
        } else if (fmt !== void 0) {
          warn(warnings, "handler-format-invalid", path, `format "${String(fmt)}" is not 'legacy' or 'modern'; falling back to the seam default (legacy)`);
        }
        registerHandlerDef(reference, { name: v.name, body: v.body, format }, graphScope);
      }
    }
    if (target !== void 0) {
      const t = classifyTarget(target, reference, authoredDerived, warnings, path);
      plan.applyPath = t.applyPath;
      plan.synthesized = t.synthesized;
      plan.seam = t.seam;
      plan.handlerEvent = t.handlerEvent;
      plan.handlerPhase = t.handlerPhase;
    }
    plans.push(plan);
  }
  return { plans, count: plans.length };
}
function mergeSynthesized(base, plans) {
  let merged = base;
  for (const plan of plans) {
    if (plan.synthesized)
      merged = mergeDecl(merged, plan.synthesized);
  }
  return merged;
}
function mergeDecl(base, extra) {
  const merged = {};
  let touched = false;
  if (extra.props) {
    const props = { ...base?.props ?? {} };
    for (const [key, value] of Object.entries(extra.props)) {
      if (!(key in props))
        props[key] = value;
    }
    merged.props = props;
    touched = true;
  } else if (base?.props) {
    merged.props = base.props;
    touched = true;
  }
  if (extra.css) {
    const css = { ...base?.css ?? {} };
    for (const [key, value] of Object.entries(extra.css)) {
      if (!(key in css))
        css[key] = value;
    }
    merged.css = css;
    touched = true;
  } else if (base?.css) {
    merged.css = base.css;
    touched = true;
  }
  return touched ? merged : void 0;
}
function applyPlans(node, plans, hub) {
  for (const plan of plans) {
    const link = hub.linkFor(plan.reference, "component");
    const options = {};
    if (plan.applyPath !== void 0)
      options.applyPath = plan.applyPath;
    if (plan.seam !== void 0)
      options.seam = plan.seam;
    if (plan.handlerEvent !== void 0)
      options.handlerEvent = plan.handlerEvent;
    if (plan.handlerPhase !== void 0)
      options.handlerPhase = plan.handlerPhase;
    if (plan.role === "source" || plan.role === "duplex") {
      const a = node.addAnchor(plan.role, plan.reference, options, link);
      if (a !== null && plan.value !== void 0)
        a.value = plan.value;
    } else {
      node.addAnchor("target", plan.reference, options, link);
    }
  }
}
function mintDefPrototypes(plans, hub, nodes, warnings, path, seamRefs, graphScope) {
  for (const plan of plans) {
    if (plan.role !== "source" && plan.role !== "duplex" || plan.value === void 0)
      continue;
    const value = plan.value;
    if (typeof value !== "object" || value === null || Array.isArray(value))
      continue;
    const def = value;
    if (typeof def.type !== "string")
      continue;
    const hasChildren = Array.isArray(def.children) && def.children.length > 0;
    if (!hasChildren && def.content === void 0 && def.css === void 0)
      continue;
    if (hasChildren) {
      const linkSpec = def.children.every((c) => c !== null && typeof c === "object" && c.bind !== void 0);
      if (linkSpec && !seamRefs.has(plan.reference))
        continue;
    } else if (def.css === void 0) {
      continue;
    }
    const link = hub.linkFor(plan.reference, "component");
    const minted = [];
    if (def.css !== void 0 && typeof def.css === "object" && Object.keys(def.css).length > 0) {
      const defRootData = { type: def.type, css: def.css };
      const defComponent = def.component;
      if (defComponent !== void 0) {
        defRootData.component = defComponent;
      }
      const defRoot = translateNodeData(defRootData, hub, nodes, warnings, `${path}.component.value`, void 0, /* @__PURE__ */ new Set(), void 0, graphScope);
      attachToPermanentOwner(defRoot, "component");
      registerDefRootPrototype(link, defRoot, graphScope);
    }
    if (hasChildren) {
      const root2 = defRootPrototypeFor(link, graphScope);
      def.children.forEach((childData, i) => {
        const child = translateNodeData(childData, hub, nodes, warnings, `${path}.component.value.children[${i}]`, void 0, /* @__PURE__ */ new Set(), root2 ? { node: root2, index: i } : void 0, graphScope);
        if (!root2)
          attachToPermanentOwner(child, "component");
        minted.push(child);
      });
      if (minted.length > 0)
        registerDefPrototypes(link, minted, graphScope);
    }
  }
}
function collectSeamRefs(doc) {
  const refs = /* @__PURE__ */ new Set();
  const scanBinding = (b) => {
    if (b === null || typeof b !== "object")
      return;
    if (typeof b.reference !== "string" || b.reference.length === 0)
      return;
    if (b.target === "type" || b.target === "content" || b.target === "children") {
      refs.add(b.reference);
    }
  };
  const scanNode = (data) => {
    if (data === null || typeof data !== "object")
      return;
    const comp = data.component;
    if (comp !== void 0 && comp !== null) {
      const list = Array.isArray(comp) ? comp : [comp];
      for (const b of list)
        scanBinding(b);
    }
    if (Array.isArray(data.children)) {
      for (const c of data.children) {
        if (c !== null && typeof c === "object")
          scanNode(c);
      }
    }
  };
  const rootData = doc.template?.root;
  if (rootData !== null && typeof rootData === "object")
    scanNode(rootData);
  const templateComp = doc.template?.component;
  if (templateComp !== void 0 && templateComp !== null) {
    const list = Array.isArray(templateComp) ? templateComp : [templateComp];
    for (const b of list)
      scanBinding(b);
  }
  if (Array.isArray(doc.template?.children)) {
    for (const c of doc.template.children) {
      if (c !== null && typeof c === "object")
        scanNode(c);
    }
  }
  if (Array.isArray(doc.content)) {
    for (const p of doc.content) {
      if (p === null || typeof p !== "object")
        continue;
      const payload = p;
      if (Array.isArray(payload.content)) {
        for (const c of payload.content) {
          if (c !== null && typeof c === "object")
            scanNode(c);
        }
      }
    }
  }
  return refs;
}
function translateNodeData(data, hub, nodes, warnings, path, opts = {}, seamRefs = /* @__PURE__ */ new Set(), parent = void 0, graphScope) {
  if (data.type === "text" && (data.props !== void 0 || data.css !== void 0 || data.handlers !== void 0 || data.placement !== void 0)) {
    warn(warnings, "text-content-only", path, 'a "text" node should carry only content; props/css/handlers/placement are ignored for text nodes');
  }
  if (nodeDataHasBodyRuns(data)) {
    warn(warnings, "bodyruns-deprecated", path, "bodyRuns is deprecated (deprecated-but-present; behavior unchanged) \u2014 prefer content / text children");
  }
  const { plans } = planBindings(data.component, data.derived, warnings, path, graphScope);
  let derived = mergeSynthesized(data.derived, plans);
  if (opts.extraDerived)
    derived = mergeDecl(derived, opts.extraDerived);
  const node = new Node(baseFrom(data, derived, warnings, path), hub, mintNodeId(), opts.asContentRoot === true, graphScope);
  nodes.push(node);
  if (opts.asContentRoot === true)
    attachToPermanentOwner(node, "contentNodes");
  if (parent !== void 0 && opts.asContentRoot !== true)
    attachChild(parent.node, node, parent.index);
  const rawPlacement = data.placement;
  if (rawPlacement !== void 0 && rawPlacement !== null) {
    const entries = Array.isArray(rawPlacement) ? rawPlacement : [rawPlacement];
    let invalidWarned = false;
    for (const entry of entries) {
      if (typeof entry !== "object" || entry === null) {
        if (!invalidWarned) {
          warn(warnings, "placement-entry-invalid", path, `placement entry "${String(entry)}" is not a PlacementConfig object; entry skipped`);
          invalidWarned = true;
        }
        continue;
      }
      const placement = entry;
      if (typeof placement.placementName === "string" && placement.placementName.length > 0) {
        if (placement.placementName.includes("#")) {
          warn(warnings, "placement-name-invalid", path, `placementName "${placement.placementName}" contains '#': container anchor skipped (P3 \xA71.3)`);
        } else if (ancestorConsumesZone(node, placement.placementName)) {
          warn(warnings, "placement-name-vetoed", path, `placementName "${placement.placementName}" is already offered by a family ancestor; container anchor skipped (P3 \xA71.3)`);
        } else {
          const plink = hub.linkFor(placement.placementName, "placement");
          node.addAnchor("container", placement.placementName, {}, plink);
        }
      }
      if (placement.targetPlacement !== void 0 && placement.targetPlacement !== null) {
        const raw = placement.targetPlacement;
        let names = [];
        if (typeof raw === "string") {
          warn(warnings, "placement-string-coerced", path, `targetPlacement "${raw}" is the old string shape; coerced to [string] (legacy type is string[])`);
          names = [raw];
        } else if (Array.isArray(raw)) {
          names = raw;
        } else {
          warn(warnings, "placement-target-invalid", path, `targetPlacement must be a string or string[]; field skipped`);
        }
        const seen = /* @__PURE__ */ new Set();
        for (const name of names) {
          if (typeof name !== "string" || name.length === 0) {
            warn(warnings, "placement-name-invalid", path, `targetPlacement entry "${String(name)}" is not a valid placement name; binding skipped (P3 \xA71.3)`);
            continue;
          }
          if (name.includes("#")) {
            warn(warnings, "placement-name-invalid", path, `targetPlacement "${name}" contains '#': binding skipped (P3 \xA71.3)`);
            continue;
          }
          if (seen.has(name)) {
            warn(warnings, "placement-duplicate-reference", path, `targetPlacement "${name}" is already requested on this node; duplicate skipped (keep-first)`);
            continue;
          }
          seen.add(name);
          const plink = hub.linkFor(name, "placement");
          node.addAnchor("content", name, {}, plink);
        }
      }
    }
  }
  applyPlans(node, plans, hub);
  mintDefPrototypes(plans, hub, nodes, warnings, path, seamRefs);
  if (data.children !== void 0) {
    if (Array.isArray(data.children)) {
      data.children.forEach((childData, i) => {
        if (childData === null || typeof childData !== "object" || Array.isArray(childData)) {
          warn(warnings, "children-entry-invalid", path, `children[${i}] is not a NodeData object; entry skipped (the rest of the array still maps)`);
          return;
        }
        const child = translateNodeData(childData, hub, nodes, warnings, `${path}.children[${i}]`, void 0, seamRefs, { node, index: i }, graphScope);
      });
    } else {
      warn(warnings, "children-shape-invalid", path, "children must be an array of NodeData; field skipped (never dual-parsed, never wrapped)");
    }
  }
  return node;
}
function translateLegacy(doc, opts) {
  if (!doc || typeof doc !== "object" || !doc.template || typeof doc.template !== "object" || !doc.template.root || typeof doc.template.root !== "object" || Array.isArray(doc.template.root)) {
    throw new Error("legacy-envelope-mismatch: expected { template: { root }, content?, clientConfig? }");
  }
  const hub = opts?.hub ?? createLinkHub();
  const graphScope = opts?.graphScope;
  const nodes = [];
  const warnings = [];
  const template = doc.template;
  const seamRefs = collectSeamRefs(doc);
  const rootBinding = template.component;
  const rootPlan = planBindings(rootBinding, template.root.derived, warnings, "root", graphScope);
  const rootSynthesis = mergeSynthesized(void 0, rootPlan.plans);
  const root2 = translateNodeData(template.root, hub, nodes, warnings, "root", {
    ...rootSynthesis !== void 0 ? { extraDerived: rootSynthesis } : {}
  }, seamRefs, void 0, graphScope);
  attachToPermanentOwner(root2, "rootNode");
  applyPlans(root2, rootPlan.plans, hub);
  mintDefPrototypes(rootPlan.plans, hub, nodes, warnings, "template.component", seamRefs, graphScope);
  const content = [];
  let metadata;
  let userData;
  if (Array.isArray(template.children)) {
    template.children.forEach((childData, i) => {
      const n = translateNodeData(childData, hub, nodes, warnings, `template.children[${i}]`, { asContentRoot: true }, seamRefs, void 0, graphScope);
      registerContentNode(n);
      content.push(n);
    });
  }
  if (doc.content !== void 0 && !Array.isArray(doc.content)) {
    warn(warnings, "payload-shape-obsolete", "content", "doc.content must be a ContentPayload[] array; payload skipped");
  } else if (Array.isArray(doc.content)) {
    doc.content.forEach((payload, p) => {
      if (!payload || typeof payload !== "object" || !Array.isArray(payload.content)) {
        throw new Error("legacy-payload-mismatch: payload requires content: NodeData[]");
      }
      if (metadata === void 0)
        metadata = payload.metadata;
      if (userData === void 0)
        userData = payload.userData;
      payload.content.forEach((contentData, i) => {
        const n = translateNodeData(contentData, hub, nodes, warnings, `content[${p}].content[${i}]`, { asContentRoot: true }, /* @__PURE__ */ new Set(), void 0, graphScope);
        registerContentNode(n);
        content.push(n);
      });
    });
  }
  const cfg = doc.clientConfig;
  let adapter = "dom";
  let persistence = false;
  if (cfg && typeof cfg === "object") {
    if (cfg.runInstantiation === true)
      adapter = "ssr";
    if (cfg.runMonitoring === true)
      persistence = true;
  }
  setTranslateUserData(userData, graphScope);
  return { root: root2, nodes, content, warnings, metadata, userData, clientConfig: { adapter, persistence } };
}
function nodeToLegacy(node, isContentRoot, preserved = false) {
  const data = {};
  data.type = node.type;
  if (node.content !== void 0)
    data.content = node.content;
  if (node.base.bodyRuns !== void 0)
    data.bodyRuns = node.base.bodyRuns;
  if (node.props && Object.keys(node.props).length > 0) {
    const props = { ...node.props };
    if (node.base.props?.id === void 0 && props.id === `preempt-node-${node.id}`)
      delete props.id;
    if (Object.keys(props).length > 0)
      data.props = props;
  }
  if (node.base.hooks !== void 0 && node.base.hooks.length > 0)
    data.hooks = [...node.base.hooks];
  if (node.base.hooksKind !== void 0 && Object.keys(node.base.hooksKind).length > 0) {
    data.hooksKind = { ...node.base.hooksKind };
  }
  if (node.css && Object.keys(node.css).length > 0) {
    const css = { ...node.css };
    if (typeof css.style === "string" && css.style.length > 0) {
      css.style = parseStyle(css.style);
    }
    data.css = css;
  }
  const compAnchors = node.anchors.filter((a) => (a.role === "target" || a.role === "source" || a.role === "duplex") && typeof a.target === "string");
  const derived = node.derived;
  if (derived !== void 0) {
    const props = derived.props ? { ...derived.props } : {};
    const css = derived.css ? { ...derived.css } : {};
    for (const a of compAnchors) {
      const applyPath = a.options.applyPath;
      if (typeof applyPath !== "string")
        continue;
      if (applyPath.startsWith("props.")) {
        const key = applyPath.slice("props.".length);
        const v = props[key];
        if (v !== void 0 && typeof v === "object" && v !== null && !Array.isArray(v)) {
          const expr = v;
          if (expr.$ === `bindings.${a.target}`)
            delete props[key];
        }
      } else if (applyPath === "css.classes") {
        const v = css.classes;
        if (v !== void 0 && typeof v === "object" && v !== null && !Array.isArray(v)) {
          const expr = v;
          if (expr.$ === `bindings.${a.target}`)
            delete css.classes;
        }
      }
    }
    const out = {};
    if (Object.keys(props).length > 0)
      out.props = props;
    if (Object.keys(css).length > 0)
      out.css = css;
    data.derived = out;
  }
  let clearedAt = -1;
  for (let i = node.layers.length - 1; i >= 0; i--) {
    const l = node.layers[i];
    if (typeof l.id === "string" && l.id.startsWith("slice-") && Array.isArray(l.handlers) && l.handlers.length === 0) {
      clearedAt = i;
      break;
    }
  }
  const isClearEmission = clearedAt !== -1;
  const rawHandlers = isClearEmission ? node.layers.slice(clearedAt + 1).filter((l) => l.sourceName !== "handler-seam" && !l.id.startsWith("seed-") && Array.isArray(l.handlers) && l.handlers.length > 0).flatMap((l) => l.handlers) : [
    ...node.base.handlers ?? [],
    ...node.layers.filter((l) => l.sourceName !== "handler-seam" && !l.id.startsWith("seed-") && Array.isArray(l.handlers)).flatMap((l) => l.handlers)
  ];
  if (isClearEmission || rawHandlers.length > 0) {
    data.handlers = rawHandlers.map((h) => {
      let body = h.body;
      if (typeof h.body === "function") {
        const src = h.sourceBody ?? h.body.toString();
        body = /\{\s*\[native code\]\s*\}/.test(src) ? void 0 : src;
      }
      return {
        name: h.name,
        ...h.event ? { event: h.event } : {},
        ...h.phase ? { phase: h.phase } : {},
        ...h.format !== void 0 ? { format: h.format } : {},
        ...body !== void 0 ? { body } : {}
      };
    });
  }
  const bindings = [];
  const hasProvider = compAnchors.some((a) => a.role === "source" || a.role === "duplex");
  const seenReferences = /* @__PURE__ */ new Set();
  for (const a of compAnchors) {
    const reference = a.target;
    const applyPath = typeof a.options.applyPath === "string" ? a.options.applyPath : void 0;
    const isProvider = a.role === "source" || a.role === "duplex";
    if (!isProvider && applyPath === void 0 && hasProvider)
      continue;
    if (seenReferences.has(reference))
      continue;
    seenReferences.add(reference);
    const binding = { reference };
    if (isProvider && a.value !== void 0)
      binding.value = a.value;
    if (applyPath !== void 0)
      binding.target = applyPath;
    else if (typeof a.options.seam === "string")
      binding.target = a.options.seam;
    else if (typeof a.options.handlerEvent === "string")
      binding.target = `handlers.${a.options.handlerEvent}`;
    bindings.push(binding);
  }
  if (bindings.length === 1)
    data.component = bindings[0];
  else if (bindings.length > 1)
    data.component = bindings;
  const containerAnchors = node.anchors.filter((a) => a.role === "container" && typeof a.target === "string");
  const contentAnchors = node.anchors.filter((a) => a.role === "content" && typeof a.target === "string");
  const contentNames = contentAnchors.map((a) => a.target);
  let activePlacement;
  for (const a of contentAnchors) {
    if (a.link.anchorsOf("container").length > 0) {
      activePlacement = a.target;
      break;
    }
  }
  if (containerAnchors.length > 1) {
    const entries = containerAnchors.map((c, i) => {
      const e = { placementName: c.target };
      if (i === 0) {
        if (contentNames.length > 0)
          e.targetPlacement = contentNames;
        if (activePlacement !== void 0)
          e.activePlacement = activePlacement;
      }
      return e;
    });
    data.placement = entries;
  } else {
    const placement = {};
    if (containerAnchors.length === 1)
      placement.placementName = containerAnchors[0].target;
    if (contentNames.length > 0) {
      placement.targetPlacement = contentNames;
      if (activePlacement !== void 0)
        placement.activePlacement = activePlacement;
    }
    if (Object.keys(placement).length > 0)
      data.placement = placement;
  }
  const kids = node.children.filter((c) => {
    if (isContentRoot(c) || c.runtimeMinted)
      return false;
    if (c.originLayer === void 0)
      return true;
    if (preserved)
      return true;
    const parent = c.parent;
    const layer = parent?.layers.find((l) => l.id === c.originLayer);
    return layer?.preserveByReversal === true;
  });
  if (kids.length > 0)
    data.children = kids.map((k) => nodeToLegacy(k, isContentRoot, preserved || k.originLayer !== void 0 && k.parent?.layers.find((l) => l.id === k.originLayer)?.preserveByReversal === true));
  return data;
}
function reverseTranslate(root2, opts) {
  const contentSet = /* @__PURE__ */ new Set();
  for (const g of opts?.payloads ?? [])
    for (const n of g.roots)
      contentSet.add(n);
  for (const n of opts?.content ?? [])
    contentSet.add(n);
  const isContent = (n) => contentSet.has(n);
  const rootData = nodeToLegacy(root2, isContent);
  const { component, ...templateRoot } = rootData;
  const out = {
    template: { root: templateRoot, ...component ? { component } : {} }
  };
  const groups = opts?.payloads?.length ? opts.payloads : opts?.content?.length ? [{ roots: opts.content, metadata: opts.metadata, userData: opts.userData }] : [];
  if (groups.length > 0) {
    out.content = groups.map((g) => {
      const payload = { content: g.roots.map((c) => nodeToLegacy(c, isContent)) };
      if (g.metadata !== void 0)
        payload.metadata = g.metadata;
      if (g.userData !== void 0)
        payload.userData = g.userData;
      return payload;
    });
  }
  return out;
}

// node_modules/provident-ssr/dist/core/render.js
function diffMinimal(prev, next) {
  const ops = [];
  const created = /* @__PURE__ */ new Set();
  const present = new Set(next.map((el) => el.wire));
  if (prev) {
    for (const [wire, el] of prev) {
      if (!present.has(wire)) {
        ops.push({ kind: "remove", wire, ...el.forkKey !== void 0 ? { forkKey: el.forkKey } : {} });
      }
    }
  }
  for (const el of next) {
    const before = prev ? prev.get(el.wire) : void 0;
    if (!before) {
      created.add(el.wire);
      ops.push({ kind: "create", wire: el.wire, type: el.type, ...el.forkKey !== void 0 ? { forkKey: el.forkKey } : {} });
      for (const [name, value] of Object.entries(el.props)) {
        ops.push({ kind: "set", wire: el.wire, name, value, ...el.forkKey !== void 0 ? { forkKey: el.forkKey } : {} });
      }
    } else if (before.type !== el.type) {
      created.add(el.wire);
      ops.push({ kind: "remove", wire: el.wire, ...el.forkKey !== void 0 ? { forkKey: el.forkKey } : {} });
      ops.push({ kind: "create", wire: el.wire, type: el.type, ...el.forkKey !== void 0 ? { forkKey: el.forkKey } : {} });
      for (const [name, value] of Object.entries(el.props)) {
        ops.push({ kind: "set", wire: el.wire, name, value, ...el.forkKey !== void 0 ? { forkKey: el.forkKey } : {} });
      }
    } else {
      const hasPrev = new Set(Object.keys(before.props));
      const hasNext = new Set(Object.keys(el.props));
      for (const name of hasNext) {
        if (!hasPrev.has(name) || before.props[name] !== el.props[name]) {
          ops.push({ kind: "set", wire: el.wire, name, value: el.props[name], ...el.forkKey !== void 0 ? { forkKey: el.forkKey } : {} });
        }
      }
      for (const name of hasPrev) {
        if (!hasNext.has(name)) {
          ops.push({ kind: "set", wire: el.wire, name, value: void 0, ...el.forkKey !== void 0 ? { forkKey: el.forkKey } : {} });
        }
      }
    }
  }
  const orderSig = (els) => {
    const out = /* @__PURE__ */ new Map();
    for (const [wire, el] of els) {
      out.set(wire, (el.childOrder ?? []).filter((c) => present.has(c)).join("\0"));
    }
    return out;
  };
  const prevOrder = prev ? orderSig(prev) : null;
  const nextOrder = orderSig(new Map(next.map((e) => [e.wire, e])));
  for (const el of next) {
    const orderChanged = !prev || prevOrder.get(el.wire) !== nextOrder.get(el.wire);
    for (const child of el.childOrder) {
      if (!present.has(child))
        continue;
      if (orderChanged || created.has(child))
        ops.push({ kind: "append", owner: el.wire, child });
    }
  }
  const rules = [];
  const seen = /* @__PURE__ */ new Set();
  for (const el of next) {
    for (const rule of el.styles ?? []) {
      if (!seen.has(rule)) {
        seen.add(rule);
        rules.push(rule);
      }
    }
  }
  if (rules.length > 0)
    ops.push({ kind: "styles", cssDefs: rules });
  return ops;
}

// node_modules/provident-ssr/dist/core/body-runs.js
var PREFIX = "BODY";
function escapeTextPayload(s) {
  return s.replace(/%/g, "%25").replace(/</g, "%3C").replace(/>/g, "%3E").replace(/&/g, "%26");
}
function unescapeTextPayload(s) {
  return s.replace(/%26/g, "&").replace(/%3E/g, ">").replace(/%3C/g, "<").replace(/%25/g, "%");
}
function encodeRuns(runs) {
  let out = PREFIX;
  for (const run of runs) {
    if ("text" in run) {
      const payload = escapeTextPayload(run.text);
      out += "T" + payload.length + ":" + payload;
    } else {
      out += "C" + run.child.length + ":" + run.child;
    }
  }
  return out;
}
function decodeRuns(s) {
  if (typeof s !== "string" || !s.startsWith(PREFIX))
    return [];
  const runs = [];
  let i = PREFIX.length;
  try {
    while (i < s.length) {
      const kind = s[i];
      i += 1;
      let lenStr = "";
      while (i < s.length && s[i] !== ":") {
        lenStr += s[i];
        i += 1;
      }
      if (i >= s.length)
        return [];
      i += 1;
      const len = parseInt(lenStr, 10);
      if (Number.isNaN(len) || len < 0)
        return [];
      const payload = s.slice(i, i + len);
      if (payload.length !== len)
        return [];
      i += len;
      if (kind === "T")
        runs.push({ text: unescapeTextPayload(payload) });
      else if (kind === "C")
        runs.push({ child: payload });
      else
        return [];
    }
  } catch {
    return [];
  }
  return runs;
}
function isBodyEncoded(v) {
  return typeof v === "string" && v.startsWith(PREFIX);
}

// node_modules/provident-ssr/dist/core/render-helpers.js
function cssDefRules(cssDef) {
  const entries = Array.isArray(cssDef) ? cssDef : cssDef !== null && typeof cssDef === "object" ? [cssDef] : [];
  const out = [];
  for (const raw of entries) {
    if (raw === null || typeof raw !== "object")
      continue;
    const entry = raw;
    const sel = typeof entry.selector === "string" ? entry.selector : "";
    const styles = entry.styles;
    if (styles === null || typeof styles !== "object" || Array.isArray(styles))
      continue;
    out.push(`${sel}{${ruleBody(styles)}}`);
  }
  return out;
}
function ruleBody(styles, top = true) {
  let scalars = "";
  let nested = "";
  for (const [k, v] of Object.entries(styles)) {
    if (v !== null && typeof v === "object") {
      nested += `${k}{${ruleBody(v, false)}}`;
    } else {
      scalars += top ? `${kebabKey(k)}: ${String(v)};` : `${kebabKey(k)}:${String(v)};`;
    }
  }
  return scalars + nested;
}
function wireKey(wire, forkKey) {
  return forkKey === void 0 ? wire : `${wire}\0${forkKey}`;
}
function bakeValue(v) {
  if (v !== null && typeof v === "object" && !Array.isArray(v))
    return JSON.stringify(v);
  return String(v);
}
var findElScans = 0;
function findEl(stores, wire, forkKey) {
  const exact = wireKey(wire, forkKey);
  for (const store of stores) {
    const hit = store?.get(exact);
    if (hit !== void 0)
      return hit;
  }
  if (forkKey !== void 0)
    return void 0;
  const prefix = `${wire}\0`;
  for (const store of stores) {
    if (!store)
      continue;
    for (const [k, v] of store) {
      findElScans += 1;
      if (k.startsWith(prefix))
        return v;
    }
  }
  return void 0;
}
function isPathState(s) {
  return s.forkKey !== void 0 && s.pathKey === s.forkKey && !s.pathKey.includes("#");
}
function pathWireOf(s) {
  return isPathState(s) ? s.pathKey : s.nodeId;
}
function isInterleaving(runs) {
  if (!runs || runs.length === 0)
    return false;
  if (runs.length > 1)
    return true;
  return "child" in runs[0];
}
function emitTextProp(props, content, bodyRuns) {
  if (isInterleaving(bodyRuns))
    props["text"] = encodeRuns(bodyRuns);
  else if (content !== void 0)
    props["text"] = content;
}
var emitDiagnosticSignatures = /* @__PURE__ */ new Set();
function warnBodyRunsDiagnostic(code, elementWire, value, detail) {
  const signature = `${code}\0${elementWire}\0${value}`;
  if (emitDiagnosticSignatures.has(signature))
    return;
  emitDiagnosticSignatures.add(signature);
  console.warn(`[bodyruns] ${code} at ${elementWire}: ${detail}`);
}
function resolveBodyRunsChildWires(el, nodeById, pathCtx, authoredIdToWire) {
  const text = el.props["text"];
  if (typeof text !== "string" || !isBodyEncoded(text))
    return;
  const runs = decodeRuns(text);
  if (!runs.some((r) => "child" in r))
    return;
  const childWires = new Set(el.childOrder);
  const authoredIdToWireLocal = /* @__PURE__ */ new Map();
  const authoredIdChildCount = /* @__PURE__ */ new Map();
  for (const w of el.childOrder) {
    const nodeId = pathCtx?.pathNodeOf.get(w) ?? w;
    const node = nodeById?.get(nodeId);
    const authored = node?.base?.props?.id;
    if (typeof authored === "string" && authored !== "") {
      authoredIdChildCount.set(authored, (authoredIdChildCount.get(authored) ?? 0) + 1);
      if (!authoredIdToWireLocal.has(authored)) {
        authoredIdToWireLocal.set(authored, w);
      }
    }
  }
  if (authoredIdToWireLocal.size === 0 && !authoredIdToWire)
    return;
  let changed = false;
  const rewritten = [];
  for (const r of runs) {
    if ("child" in r) {
      if (childWires.has(r.child)) {
        rewritten.push(r);
        continue;
      }
      const globalWire = authoredIdToWire?.get(r.child);
      const contained = globalWire !== void 0 && childWires.has(globalWire);
      const synthetic = contained && nodeById?.get(pathCtx?.pathNodeOf.get(globalWire) ?? globalWire) === void 0;
      if (synthetic) {
        changed = true;
        rewritten.push({ child: globalWire });
      } else if (authoredIdToWireLocal.has(r.child)) {
        const dupCount = authoredIdChildCount.get(r.child) ?? 1;
        if (dupCount > 1) {
          warnBodyRunsDiagnostic("bodyruns-child-duplicate", el.wire, r.child, `authored id "${r.child}" resolves to ${dupCount} children of this element; the first in childOrder is used`);
        }
        changed = true;
        rewritten.push({ child: authoredIdToWireLocal.get(r.child) });
      } else if (contained) {
        changed = true;
        rewritten.push({ child: globalWire });
      } else {
        warnBodyRunsDiagnostic("bodyruns-child-unresolved", el.wire, r.child, `the { child } run references authored id "${r.child}", which is not a child of this element; the run is dropped`);
        changed = true;
      }
    } else {
      rewritten.push(r);
    }
  }
  if (changed)
    el.props["text"] = encodeRuns(rewritten);
}
function applyOps(adapter, ops) {
  const fk = adapter;
  const created = /* @__PURE__ */ new Map();
  const createdBare = /* @__PURE__ */ new Map();
  const persistent = fk.wires ?? fk.fragments;
  const has = (w, forkKey) => {
    if (forkKey !== void 0)
      return findEl([created, persistent], w, forkKey);
    const hit = createdBare.get(w);
    if (hit !== void 0)
      return hit;
    return findEl([persistent], w);
  };
  for (const op of ops) {
    switch (op.kind) {
      case "create": {
        const el = fk.createEl(op.type, op.wire, op.forkKey);
        created.set(wireKey(op.wire, op.forkKey), el);
        createdBare.set(op.wire, el);
        break;
      }
      case "set":
        fk.setProp(op.wire, op.name, op.value, op.forkKey);
        break;
      case "append": {
        const owner = has(op.owner);
        const child = has(op.child);
        if (owner && child)
          adapter.appendChild(owner, child);
        break;
      }
      case "remove": {
        const w = has(op.wire, op.forkKey);
        if (w && fk.removeEl)
          fk.removeEl(op.wire, op.forkKey);
        created.delete(wireKey(op.wire, op.forkKey));
        createdBare.delete(op.wire);
        break;
      }
      case "styles":
        fk.styles?.(op.cssDefs);
        break;
    }
  }
}
function renderProducingProcess(actionable, nodeById, adapter, prevMap, renderOptions) {
  const live = actionable.filter((cs) => {
    const node = nodeById.get(cs.nodeId);
    return node === void 0 || !node.destroyed && node.isInTree;
  });
  const els = emitElements(live, nodeById, renderOptions);
  const ops = diffMinimal(prevMap, els);
  applyOps(adapter, ops);
  return { els, ops, prevMap: new Map(els.map((e) => [e.wire, e])) };
}
function stampNodeId(props, realId, chain, nodeIdAttr) {
  if (!nodeIdAttr)
    return;
  const id = realId ?? chain?.[chain.length - 1];
  if (id !== void 0)
    props["data:node-id"] = id;
}
function emitElements(actionable, nodeById, renderOptions) {
  const nb = nodeById ?? null;
  const nodeIdAttr = renderOptions?.nodeIdAttribute === true;
  const myScope = renderOptions?.graphScope ?? DEFAULT_SCOPE;
  const groups = /* @__PURE__ */ new Map();
  for (const s of actionable) {
    const wire = pathWireOf(s);
    const arr = groups.get(wire);
    if (arr)
      arr.push(s);
    else
      groups.set(wire, [s]);
  }
  const armWires = /* @__PURE__ */ new Map();
  for (const [wire, states] of groups) {
    if (states.length > 1)
      armWires.set(wire, states.map((_, i) => `${wire}#${i}`));
  }
  const els = [];
  const pathChildIndex = /* @__PURE__ */ new Map();
  const pathStateChildren = /* @__PURE__ */ new Map();
  const pathNodeOf = /* @__PURE__ */ new Map();
  for (const s of actionable) {
    if (!isPathState(s) || !s.pathKey || !s.trace)
      continue;
    pathNodeOf.set(s.pathKey, s.nodeId);
    const parentTrace = s.trace.slice(0, -1).join("\0");
    let m = pathChildIndex.get(parentTrace);
    if (!m) {
      m = /* @__PURE__ */ new Map();
      pathChildIndex.set(parentTrace, m);
    }
    m.set(s.nodeId, s.pathKey);
  }
  for (const s of actionable) {
    if (!isPathState(s) || !s.pathKey || !s.trace)
      continue;
    const m = pathChildIndex.get(s.trace.join("\0"));
    if (m)
      pathStateChildren.set(s.pathKey, (s.children ?? []).map((c) => m.get(c) ?? c));
  }
  const ownerPlaced = /* @__PURE__ */ new Map();
  for (const s of actionable) {
    if (!isPathState(s) || !s.pathKey || !s.trace || s.trace.length < 2)
      continue;
    const owner = s.trace[s.trace.length - 2];
    let arr = ownerPlaced.get(owner);
    if (!arr) {
      arr = [];
      ownerPlaced.set(owner, arr);
    }
    arr.push({ wire: s.pathKey, trace: s.trace });
  }
  const convertedOf = (s) => s.pathKey ? pathStateChildren.get(s.pathKey) : void 0;
  const defCovered = /* @__PURE__ */ new Set();
  for (const [wire, states] of groups) {
    const base = states[0];
    const entry = Object.entries(base.bindings ?? {}).find(([, v]) => isLinkDef(v));
    if (!entry)
      continue;
    const def = entry[1];
    if (!linkChainAllowed(base, def, entry[0]))
      continue;
    const offset = def.childOffset ?? 0;
    const children = convertedOf(base) ?? base.children ?? [];
    for (let i = 0; i < def.children.length; i += 1) {
      const cw = children[offset + i];
      if (cw)
        defCovered.add(cw);
    }
  }
  const standaloneWires = /* @__PURE__ */ new Set();
  for (const [wire, states] of groups) {
    if (!(states.length === 1 && defCovered.has(wire)))
      standaloneWires.add(wire);
  }
  const authoredIdToWire = /* @__PURE__ */ new Map();
  for (const s of actionable) {
    const node = nb?.get(s.nodeId);
    const authored = node?.base?.props?.id;
    if (typeof authored === "string" && authored !== "" && !authoredIdToWire.has(authored)) {
      authoredIdToWire.set(authored, pathWireOf(s));
    }
  }
  const pathCtx = pathNodeOf.size > 0 || pathStateChildren.size > 0 || ownerPlaced.size > 0 ? { pathNodeOf, pathStateChildren, ownerPlaced } : void 0;
  for (const [wire, states] of groups) {
    const multi = states.length > 1;
    const base = states[0];
    const converted = convertedOf(base);
    const emitBase = converted ? { ...base, children: converted } : base;
    const emitted = emitOne(emitBase, multi ? 0 : void 0, nb, pathCtx, nodeIdAttr, myScope, authoredIdToWire);
    const covered = states.length === 1 && defCovered.has(wire);
    if (!covered) {
      const el = emitted.el;
      if (multi) {
        el.childOrder = [];
        els.push(el);
        for (let i = 1; i < states.length; i += 1)
          els.push(emitOne(states[i], i, nb, pathCtx, nodeIdAttr, myScope, authoredIdToWire).el);
      } else {
        el.childOrder = el.childOrder.flatMap((c) => armWires.get(c) ?? [c]);
        els.push(el);
      }
    }
    const coveredChildless = covered && (states[0].children ?? []).length === 0;
    for (const c of emitted.defChildren ?? []) {
      if (!coveredChildless && !standaloneWires.has(c.wire))
        els.push(c);
    }
  }
  for (const el of els)
    resolveBodyRunsChildWires(el, nb, pathCtx, authoredIdToWire);
  return els;
}
function scalarBinding(bindings) {
  if (!bindings)
    return void 0;
  if (bindings["theme"] !== void 0)
    return bindings["theme"];
  for (const v of Object.values(bindings)) {
    if (typeof v === "string" || typeof v === "number" || typeof v === "boolean")
      return v;
  }
  return void 0;
}
function isLinkDef(v) {
  return typeof v === "object" && v !== null && typeof v.type === "string" && Array.isArray(v.children);
}
function isSeamDefBinding(s, name) {
  return (s.anchors ?? []).some((a) => a.role === "target" && typeof a.target === "string" && a.target === name && a.options.seam !== void 0);
}
function linkChainAllowed(s, def, name) {
  const childWires = s.children ?? [];
  if ((def.childOffset ?? 0) !== 0)
    return false;
  if (childWires.length === 0)
    return true;
  if (isSeamDefBinding(s, name))
    return false;
  const retypingSpecs = def.children.every((c) => {
    if (c === null || typeof c !== "object")
      return false;
    if (typeof c.bind === "string")
      return true;
    return c.content === void 0 && c.css === void 0 && c.props === void 0 && c.children === void 0 && c.component === void 0;
  });
  if (!retypingSpecs)
    return false;
  const bindSpecs = def.children.every((c) => typeof c.bind === "string");
  if (bindSpecs)
    return def.children.length === childWires.length;
  return def.children.length >= childWires.length;
}
function makeSeamShellEl(wire, type, props, ownText, childOrder, styles, forkKey) {
  if (ownText !== void 0)
    props["text"] = ownText;
  const el = { wire, type, props, childOrder };
  if (styles.length > 0)
    el.styles = styles;
  if (forkKey !== void 0)
    el.forkKey = forkKey;
  return el;
}
function findDefBinding(s) {
  for (const [name, v] of Object.entries(s.bindings ?? {})) {
    if (v === null || typeof v !== "object" || Array.isArray(v))
      continue;
    const d = v;
    if (typeof d.type !== "string")
      continue;
    const seamAnchor = (s.anchors ?? []).find((a) => (a.role === "target" || a.role === "duplex") && typeof a.target === "string" && a.target === name && a.options.seam !== void 0);
    const seam = seamAnchor ? seamAnchor.options.seam : void 0;
    if (seam !== void 0 || Array.isArray(d.children)) {
      return { name, def: v, seam };
    }
  }
  return void 0;
}
function defChildPruned(proto) {
  return typeof proto === "object" && proto !== null && proto.destroyed === true;
}
function adoptPlacedChildren(ctx, chain, protoId) {
  if (!ctx?.ownerPlaced || !protoId)
    return void 0;
  const entries = ctx.ownerPlaced.get(protoId);
  if (!entries || entries.length === 0)
    return void 0;
  const want = chain.join(",");
  const out = [];
  for (const e of entries) {
    if (e.trace.slice(0, -1).join(",") === want)
      out.push(e.wire);
  }
  return out.length > 0 ? out : void 0;
}
function emitDefRootElement(def, rootWire, rootProto, childProtos, layersSuffix, nodeById, pathCtx, chain, nodeIdAttr = false, scope, authoredIdToWire) {
  const cprops = {};
  const styles = [];
  if (def.content !== void 0)
    emitTextProp(cprops, def.content, rootProto?.base?.bodyRuns);
  if (layersSuffix !== void 0)
    cprops["prop:stress:layers"] = layersSuffix;
  const css = rootProto?.css ?? def.css ?? {};
  for (const [k, v] of Object.entries(css)) {
    if (k === "cssDef") {
      styles.push(...cssDefRules(v));
      continue;
    }
    cprops[`css:${k}`] = v;
  }
  mergeHandlerProps(cprops, nodeById, rootProto?.id);
  const flat = [];
  const children = [];
  const childSpecs = def.children ?? [];
  for (let i = 0; i < childSpecs.length; i += 1) {
    if (defChildPruned(childProtos[i]))
      continue;
    const child = emitDefChildTree(childSpecs[i], i, rootWire, childProtos[i], void 0, nodeById, pathCtx, chain, nodeIdAttr, scope, authoredIdToWire);
    flat.push(...child.flat);
    children.push(child.el);
  }
  if (authoredIdToWire) {
    const authored = rootProto?.base?.props?.id;
    if (typeof authored === "string" && authored !== "" && !authoredIdToWire.has(authored)) {
      authoredIdToWire.set(authored, rootWire);
    }
  }
  const adopted = adoptPlacedChildren(pathCtx, chain, rootProto?.id);
  stampNodeId(cprops, rootProto?.id, chain, nodeIdAttr);
  const el = { wire: rootWire, type: def.type, props: cprops, childOrder: [...children.map((c) => c.wire), ...adopted ?? []] };
  if (styles.length > 0)
    el.styles = styles;
  flat.unshift(el);
  return { el, flat };
}
function emitDefChildTree(spec, index, parentWire, proto, layersSuffix, nodeById, pathCtx, chain, nodeIdAttr = false, scope, authoredIdToWire) {
  const thisChain = proto?.id ? [...chain, proto.id] : chain;
  const bind = spec.bind;
  const wire = typeof bind === "string" ? `${parentWire}:${bind}` : `${parentWire}:${index}`;
  if (authoredIdToWire) {
    const authored = proto?.base?.props?.id;
    if (typeof authored === "string" && authored !== "") {
      authoredIdToWire.set(authored, wire);
    }
  }
  const cprops = {};
  const styles = [];
  const authSeamed = proto !== void 0 && (proto.layers?.some((l) => l.sourceName === "handler-seam") ?? false);
  let type = authSeamed && typeof proto?.type === "string" ? proto.type : spec.type;
  if (proto?.content !== void 0 && authSeamed || spec.content !== void 0)
    emitTextProp(cprops, authSeamed ? proto?.content ?? spec.content : spec.content, proto?.base?.bodyRuns);
  if (layersSuffix !== void 0)
    cprops["prop:stress:layers"] = layersSuffix;
  for (const [k, v] of Object.entries(proto?.css ?? spec.css ?? {}))
    cprops[`css:${k}`] = v;
  for (const [k, v] of Object.entries(proto?.props ?? spec.props ?? {}))
    cprops[`prop:${k}`] = v;
  mergeHandlerProps(cprops, nodeById, proto?.id);
  const flat = [];
  const children = [];
  const childSpecs = spec.children ?? [];
  const childProtos = proto ? proto.children ?? [] : [];
  for (let i = 0; i < childSpecs.length; i += 1) {
    if (defChildPruned(childProtos[i]))
      continue;
    const child = emitDefChildTree(childSpecs[i], i, wire, childProtos[i], void 0, nodeById, pathCtx, thisChain, nodeIdAttr, scope, authoredIdToWire);
    flat.push(...child.flat);
    children.push(child.el);
  }
  if (childSpecs.length === 0 && proto && Array.isArray(proto.anchors)) {
    const seamTarget = proto.anchors.find((a) => (a.role === "target" || a.role === "duplex") && typeof a.target === "string" && a.options.seam !== void 0);
    if (seamTarget) {
      const value = providerValueFromLink(seamTarget.link);
      if (value !== null && typeof value === "object" && !Array.isArray(value)) {
        const nested = value;
        const nestedRoot = defRootPrototypeFor(seamTarget.link, scope);
        if (seamTarget.options.seam === "content") {
          if (nested.content !== void 0)
            emitTextProp(cprops, nested.content, nestedRoot?.base?.bodyRuns);
        } else if (seamTarget.options.seam === "type") {
          const css = nestedRoot?.css ?? nested.css ?? {};
          for (const [k, v] of Object.entries(css)) {
            if (k === "cssDef")
              styles.push(...cssDefRules(v));
            else
              cprops[`css:${k}`] = v;
          }
          if (typeof nested.type === "string")
            type = nested.type;
          if (nested.content !== void 0)
            emitTextProp(cprops, nested.content, nestedRoot?.base?.bodyRuns);
          if (nested.props) {
            for (const [k, v] of Object.entries(nested.props))
              cprops[`prop:${k}`] = v;
          }
          if (Array.isArray(nested.children) && nested.children.length > 0) {
            const nestedProtos = defPrototypesFor(seamTarget.link, scope);
            const nestedChain = [...thisChain, ...nestedRoot?.id ? [nestedRoot.id] : []];
            for (let i = 0; i < nested.children.length; i += 1) {
              if (defChildPruned(nestedProtos[i]))
                continue;
              const child = emitDefChildTree(nested.children[i], i, wire, nestedProtos[i], void 0, nodeById, pathCtx, nestedChain, nodeIdAttr, scope, authoredIdToWire);
              flat.push(...child.flat);
              children.push(child.el);
            }
          }
        } else {
          const nestedProtos = defPrototypesFor(seamTarget.link, scope);
          const rootTree = emitDefRootElement(nested, `${wire}:0`, nestedRoot, nestedProtos, void 0, nodeById, pathCtx, [...thisChain, ...nestedRoot?.id ? [nestedRoot.id] : []], nodeIdAttr, scope, authoredIdToWire);
          flat.push(...rootTree.flat);
          stampNodeId(cprops, proto?.id, thisChain, nodeIdAttr);
          const shellEl = makeSeamShellEl(wire, type, cprops, spec.content, [rootTree.el.wire], styles, void 0);
          flat.unshift(shellEl);
          return { el: shellEl, flat };
        }
      }
    }
  }
  const adopted = adoptPlacedChildren(pathCtx, thisChain, proto?.id);
  stampNodeId(cprops, proto?.id, thisChain, nodeIdAttr);
  const el = { wire, type, props: cprops, childOrder: [...children.map((c) => c.wire), ...adopted ?? []] };
  if (styles.length > 0)
    el.styles = styles;
  flat.unshift(el);
  return { el, flat };
}
function hideEmptyContainer(props) {
  const style = String(props["css:style"] ?? "");
  if (/display\s*:/.test(style))
    return;
  props["css:style"] = style ? `${style}; display: none;` : "display: none;";
}
function mergeHandlerProps(cprops, nodeById, nodeId) {
  if (nodeId === void 0)
    return;
  const node = nodeById?.get(nodeId);
  for (const h of node?.handlers ?? []) {
    if (h && typeof h === "object" && typeof h.event === "string")
      cprops[`on:${h.event}`] = true;
  }
}
function emitOne(s, armIdx, nodeById, pathCtx, nodeIdAttr = false, scope, authoredIdToWire) {
  const wire = isPathState(s) ? s.pathKey : armIdx !== void 0 ? `${s.nodeId}#${armIdx}` : s.nodeId;
  if (s.type === "text") {
    const authoredChildren = (s.children ?? []).length > 0;
    const childRun = (s.bodyRuns ?? []).some((r) => "child" in r);
    if (authoredChildren || childRun) {
      const detail = authoredChildren && childRun ? "children+bodyRuns" : authoredChildren ? "children" : "bodyRuns";
      warnBodyRunsDiagnostic("text-node-children-ignored", wire, "children", `a "text" node carries authored ${detail}; the bare-text emit ignores them; no element is created`);
    }
    const props2 = {};
    const content2 = scalarBinding(s.bindings) ?? s.content;
    if (content2 !== void 0)
      props2["text"] = content2;
    const el2 = { wire, type: s.type, props: props2, childOrder: [] };
    if (s.forkKey !== void 0)
      el2.forkKey = s.forkKey;
    return { el: el2 };
  }
  const props = {};
  const styles = [];
  for (const [k, v] of Object.entries(s.props ?? {}))
    props[`prop:${k}`] = v;
  for (const [k, v] of Object.entries(s.css ?? {})) {
    if (k === "cssDef") {
      styles.push(...cssDefRules(v));
      continue;
    }
    props[`css:${k}`] = v;
  }
  const defEntry = findDefBinding(s);
  const def = defEntry?.def;
  const seam = defEntry?.seam;
  if (def && armIdx === void 0 && seam !== "content") {
    const parentLayers = s.props?.["stress:layers"] ?? "";
    const offset = def.childOffset ?? 0;
    const childWires = s.children ?? [];
    const allowed = linkChainAllowed(s, def, defEntry.name);
    mergeHandlerProps(props, nodeById, s.nodeId);
    if (seam === "children" || allowed && childWires.length === 0) {
      const layersSuffix = def.childLayersSuffix && parentLayers ? `${parentLayers}|${def.childLayersSuffix}` : void 0;
      const seamTarget = (s.anchors ?? []).find((a) => (a.role === "target" || a.role === "duplex") && typeof a.target === "string" && a.target === defEntry.name);
      const protos = seamTarget ? defPrototypesFor(seamTarget.link, scope) : [];
      const defRootProto = seamTarget ? defRootPrototypeFor(seamTarget.link, scope) : void 0;
      if (seam === "children") {
        const rootWire = `${wire}:0`;
        const defChain2 = [...s.trace ?? [s.nodeId], ...defRootProto?.id ? [defRootProto.id] : []];
        const rootTree = emitDefRootElement(def, rootWire, defRootProto, protos, layersSuffix, nodeById, pathCtx, defChain2, nodeIdAttr, scope, authoredIdToWire);
        stampNodeId(props, s.nodeId, void 0, nodeIdAttr);
        const el4 = makeSeamShellEl(wire, s.type, props, s.content, [...childWires, rootWire], styles, s.forkKey);
        return { el: el4, defChildren: rootTree.flat };
      }
      if (seam === "type") {
        const defCss = defRootProto?.css ?? def.css;
        if (defCss) {
          for (const [k, v] of Object.entries(defCss)) {
            if (k === "cssDef")
              styles.push(...cssDefRules(v));
            else
              props[`css:${k}`] = v;
          }
        }
        if (def.props) {
          for (const [k, v] of Object.entries(def.props))
            props[`prop:${k}`] = v;
        }
        const defChain2 = [...s.trace ?? [s.nodeId], ...defRootProto?.id ? [defRootProto.id] : []];
        const trees2 = (def.children ?? []).flatMap((spec, i) => defChildPruned(protos[i]) ? [] : [emitDefChildTree(spec, i, wire, protos[i], layersSuffix, nodeById, pathCtx, defChain2, nodeIdAttr, scope, authoredIdToWire)]);
        const bound4 = scalarBinding(s.bindings);
        if (bound4 !== void 0)
          props["text"] = bound4;
        else if (def.content !== void 0)
          emitTextProp(props, def.content, defRootProto?.base?.bodyRuns);
        const adopted2 = adoptPlacedChildren(pathCtx, defChain2, defRootProto?.id);
        stampNodeId(props, s.nodeId, void 0, nodeIdAttr);
        const el4 = { wire, type: def.type, props, childOrder: [...trees2.map((t) => t.el.wire), ...adopted2 ?? []] };
        if (styles.length > 0)
          el4.styles = styles;
        if (s.forkKey !== void 0)
          el4.forkKey = s.forkKey;
        return { el: el4, defChildren: trees2.flatMap((t) => t.flat) };
      }
      const defChain = [...s.trace ?? [s.nodeId], ...defRootProto?.id ? [defRootProto.id] : []];
      const trees = def.children.flatMap((spec, i) => defChildPruned(protos[i]) ? [] : [emitDefChildTree(spec, i, wire, protos[i], layersSuffix, nodeById, pathCtx, defChain, nodeIdAttr, scope, authoredIdToWire)]);
      const bound3 = scalarBinding(s.bindings);
      if (bound3 !== void 0)
        props["text"] = bound3;
      const type = bound3 !== void 0 ? s.type : def.type;
      const adopted = adoptPlacedChildren(pathCtx, defChain, defRootProto?.id);
      stampNodeId(props, s.nodeId, void 0, nodeIdAttr);
      const el3 = { wire, type, props, childOrder: [...trees.map((t) => t.el.wire), ...adopted ?? []] };
      if (styles.length > 0)
        el3.styles = styles;
      if (s.forkKey !== void 0)
        el3.forkKey = s.forkKey;
      return { el: el3, defChildren: trees.flatMap((t) => t.flat) };
    }
    const reTyped = [];
    const specs = allowed ? def.children : childWires.map((_, i) => ({ bind: String(i), type: s.type }));
    const destroyedWires = /* @__PURE__ */ new Set();
    for (let i = 0; i < specs.length; i += 1) {
      const spec = specs[i];
      const cw = childWires[offset + i];
      const resolvedWire = cw ?? (allowed ? `${wire}:${spec.bind}` : void 0);
      if (resolvedWire === void 0)
        continue;
      const cprops = {};
      if (def.childLayersSuffix && parentLayers)
        cprops["prop:stress:layers"] = `${parentLayers}|${def.childLayersSuffix}`;
      const childNodeId = pathCtx?.pathNodeOf.get(resolvedWire) ?? resolvedWire;
      const childNode = nodeById?.get(childNodeId);
      if (childNode?.destroyed === true || !allowed && nodeById != null && childNode === void 0) {
        destroyedWires.add(resolvedWire);
        continue;
      }
      for (const [k, v] of Object.entries(childNode?.css ?? spec.css ?? {}))
        cprops[`css:${k}`] = v;
      for (const [k, v] of Object.entries(childNode?.props ?? spec.props ?? {}))
        cprops[`prop:${k}`] = v;
      if (allowed)
        emitTextProp(cprops, spec.content, childNode?.base?.bodyRuns);
      const childOrder = pathCtx?.pathStateChildren.get(resolvedWire) ?? (childNode ? (childNode.children ?? []).map((c) => c.id) : []);
      const type = allowed ? spec.type : childNode?.type ?? s.type;
      stampNodeId(cprops, childNodeId, void 0, nodeIdAttr);
      reTyped.push({ wire: resolvedWire, type, props: cprops, childOrder });
    }
    if (allowed) {
      const order = [...childWires.slice(0, offset).filter((w) => !destroyedWires.has(w)), ...reTyped.map((c) => c.wire)];
      const bound3 = scalarBinding(s.bindings);
      if (bound3 !== void 0)
        props["text"] = bound3;
      const type = bound3 !== void 0 ? s.type : def.type;
      stampNodeId(props, s.nodeId, void 0, nodeIdAttr);
      const el3 = { wire, type, props, childOrder: order };
      if (styles.length > 0)
        el3.styles = styles;
      if (s.forkKey !== void 0)
        el3.forkKey = s.forkKey;
      return { el: el3, defChildren: reTyped };
    }
    const bound2 = scalarBinding(s.bindings);
    const content2 = bound2 !== void 0 ? bound2 : s.content;
    emitTextProp(props, content2, s.bodyRuns);
    if ((s.anchors ?? []).some((a) => a.role === "container") && (s.children ?? []).length === 0 && content2 === void 0 && !isInterleaving(s.bodyRuns) && (s.css?.style === void 0 || s.css.style === "")) {
      hideEmptyContainer(props);
    }
    stampNodeId(props, s.nodeId, void 0, nodeIdAttr);
    const el2 = { wire, type: s.type, props, childOrder: [...childWires].filter((w) => !destroyedWires.has(w)) };
    if (styles.length > 0)
      el2.styles = styles;
    if (s.forkKey !== void 0)
      el2.forkKey = s.forkKey;
    return { el: el2, defChildren: reTyped };
  }
  const bound = scalarBinding(s.bindings);
  const content = bound !== void 0 ? bound : s.content;
  emitTextProp(props, content, s.bodyRuns);
  const emptyOwnerHide = (s.anchors ?? []).some((a) => a.role === "container") && (s.children ?? []).length === 0 && s.content === void 0 && !isInterleaving(s.bodyRuns) && (s.css?.style === void 0 || s.css.style === "");
  if (emptyOwnerHide)
    hideEmptyContainer(props);
  if (armIdx === void 0) {
    const node = nodeById?.get(s.nodeId);
    const handlers = node ? node.handlers ?? [] : [];
    for (const h of handlers) {
      if (h && typeof h === "object" && typeof h.event === "string")
        props[`on:${h.event}`] = true;
    }
    stampNodeId(props, s.nodeId, void 0, nodeIdAttr);
    const el2 = { wire, type: s.type, props, childOrder: [...s.children ?? []] };
    if (styles.length > 0)
      el2.styles = styles;
    if (s.forkKey !== void 0)
      el2.forkKey = s.forkKey;
    return { el: el2 };
  }
  stampNodeId(props, s.nodeId, void 0, nodeIdAttr);
  const el = { wire, type: s.type, props, childOrder: [] };
  if (styles.length > 0)
    el.styles = styles;
  if (s.forkKey !== void 0)
    el.forkKey = s.forkKey;
  return { el };
}

// node_modules/provident-ssr/dist/core/adapters.js
var VOID_TAGS = /* @__PURE__ */ new Set([
  "area",
  "base",
  "br",
  "col",
  "embed",
  "hr",
  "img",
  "input",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr"
]);
var FORM_CONTROLS = /* @__PURE__ */ new Set(["TEXTAREA", "INPUT", "SELECT"]);
var VALUE_FORMS = /* @__PURE__ */ new Set(["INPUT", "TEXTAREA"]);
var BOOLEAN_ATTRS = /* @__PURE__ */ new Set([
  "allowfullscreen",
  "async",
  "autofocus",
  "autoplay",
  "checked",
  "controls",
  "default",
  "defer",
  "disabled",
  "formnovalidate",
  "hidden",
  "inert",
  "ismap",
  "itemscope",
  "loop",
  "multiple",
  "muted",
  "nomodule",
  "novalidate",
  "open",
  "playsinline",
  "readonly",
  "required",
  "reversed",
  "selected",
  "truespeed",
  "typemustmatch"
]);
function booleanAttrValue(v) {
  return !(v === void 0 || v === null || v === false || v === 0 || v === "0" || v === "false" || v === "");
}
var DomAdapter = class {
  wires = /* @__PURE__ */ new Map();
  reused = /* @__PURE__ */ new Set();
  mount;
  onEvent;
  stylesEl = null;
  /** RETAINED HANDLER MAP (2026-08-20 — the listener-removal un-park;
   *  doc: docs/specs/retained-handler-map-review.md). The EXACT function
   *  references this adapter passed to `addEventListener`, keyed by
   *  `wireKey(wire, forkKey)` then event name — `removeEventListener` needs
   *  the same reference object, and the previous anonymous-closure pattern
   *  kept none (removal was a parked no-op). Attach = REPLACE (remove the old
   *  exact fn first — supersedes the additive DOM-F5 contract), detach
   *  (`on:<event>` set with undefined) = `removeEventListener(evt, fn)` +
   *  delete, purge on removeEl AND on duplicate createEl (the old element
   *  stays mounted per DOM-F4 but must stop firing). Derived/replayable
   *  state in the same class as `wires` — a pure function of (op stream,
   *  onEvent), never pipeline semantics. */
  listeners = /* @__PURE__ */ new Map();
  /** A (2026-08-16) — the DETACHED INITIAL-BUILD batch: while a batch is
   *  open, created elements are HELD BACK from the live mount; the append
   *  ops re-parent them under their owners; `endBatch` mounts ONLY the roots
   *  (elements never re-parented by an append op) — one live-tree attachment
   *  per root instead of the create-then-move churn (every element was
   *  previously mount-appended at creation and then MOVED under its owner by
   *  the append op — 4095 useless live attachments on a 4095-node first
   *  render, each triggering the browser's incremental style machinery).
   *  Non-batched calls keep the immediate-attach behavior (DOM-H1). */
  batchEls = null;
  /** D4 (DOM-H29) — per-adapter-instance rule-signature dedup set: a rule
   *  string whose exact signature was already appended is SKIPPED (the emit
   *  side already dedups per sweep; this is the boundary's defensive half). */
  stylesSeen = /* @__PURE__ */ new Set();
  constructor(mount, opts = {}) {
    if (typeof document === "undefined") {
      throw new Error("DomAdapter requires a DOM (document) environment");
    }
    this.mount = mount;
    this.onEvent = opts.onEvent;
  }
  /** A — open a detached build batch (see the batchEls doc). Idempotent per
   *  pair: a beginBatch while one is open resets the pending set (the caller
   *  owns the pair). */
  beginBatch() {
    this.batchEls = [];
  }
  /** A — close the batch: mount the roots (elements never re-parented by an
   *  append op) in creation order. Non-batched state is restored afterwards. */
  endBatch() {
    if (this.batchEls) {
      for (const el of this.batchEls)
        this.mount.appendChild(el);
      this.batchEls = null;
    }
  }
  createEl(type, wire, forkKey) {
    if (type === "text") {
      const text = typeof document.createTextNode === "function" ? document.createTextNode("") : document.createElement("span");
      const key2 = wireKey(wire, forkKey);
      const prev2 = this.wires.get(key2);
      if (prev2)
        this.purgeListeners(key2, prev2);
      this.wires.set(key2, text);
      if (this.batchEls)
        this.batchEls.push(text);
      else
        this.mount.appendChild(text);
      return text;
    }
    const el = document.createElement(type);
    el.dataset.wire = wire;
    const key = wireKey(wire, forkKey);
    const prev = this.wires.get(key);
    if (prev)
      this.purgeListeners(key, prev);
    this.wires.set(key, el);
    if (this.batchEls)
      this.batchEls.push(el);
    else
      this.mount.appendChild(el);
    return el;
  }
  setProp(wire, name, val, forkKey) {
    const el = this.wires.get(wireKey(wire, forkKey));
    if (!el)
      return;
    if (el.nodeType === 3) {
      if (name !== "text")
        return;
      el.data = val === void 0 ? "" : bakeValue(val);
      return;
    }
    const elem = el;
    if (name === "text") {
      if (typeof val === "string" && isBodyEncoded(val)) {
        const runs = decodeRuns(val);
        elem.textContent = "";
        const ordered = elem.ordered;
        for (const run of runs) {
          if ("text" in run) {
            if (typeof document.createTextNode === "function") {
              elem.appendChild(document.createTextNode(run.text));
            } else {
              elem.textContent += run.text;
            }
            ordered?.push({ kind: "text", value: run.text });
          } else {
            const childEl = this.wires.get(wireKey(run.child));
            if (childEl)
              elem.appendChild(childEl);
          }
        }
      } else if (FORM_CONTROLS.has(elem.tagName)) {
        const formEl = elem;
        if (val === void 0) {
          formEl.value = "";
        } else if (formEl.value !== bakeValue(val)) {
          formEl.value = bakeValue(val);
        }
      } else {
        elem.textContent = val === void 0 ? "" : bakeValue(val);
      }
    } else if (name.startsWith("css:")) {
      const key = name.slice(4);
      if (val === void 0) {
        if (key === "id")
          elem.id = "";
        else if (key === "classes")
          elem.className = "";
        else if (key === "style")
          elem.style.cssText = "";
        else
          elem.removeAttribute(key);
      } else if (key === "id") {
        elem.id = bakeValue(val);
      } else if (key === "classes") {
        elem.className = Array.isArray(val) ? val.join(" ") : bakeValue(val);
      } else if (key === "style") {
        elem.style.cssText = bakeValue(val);
      } else if (key === "cssDef") {
        elem.setAttribute("cssDef", bakeValue(val));
      } else {
        elem.setAttribute(key, bakeValue(val));
      }
    } else if (name.startsWith("on:")) {
      const evtName = name.slice(3);
      if (val === void 0) {
        const evtMap2 = this.listeners.get(wireKey(wire, forkKey));
        if (evtMap2) {
          const entry = evtMap2.get(evtName);
          if (entry) {
            ;
            elem.removeEventListener(evtName, entry.fn);
            evtMap2.delete(evtName);
            if (evtMap2.size === 0)
              this.listeners.delete(wireKey(wire, forkKey));
          }
        }
        return;
      }
      const onEvent = this.onEvent;
      const handler = (domEvent) => {
        if (onEvent)
          onEvent(wire, domEvent);
      };
      const key = wireKey(wire, forkKey);
      const prev = this.listeners.get(key)?.get(evtName);
      if (prev) {
        ;
        elem.removeEventListener(evtName, prev.fn);
      }
      elem.addEventListener(evtName, handler);
      let evtMap = this.listeners.get(key);
      if (!evtMap) {
        evtMap = /* @__PURE__ */ new Map();
        this.listeners.set(key, evtMap);
      }
      evtMap.set(evtName, { el: elem, fn: handler });
    } else if (name.startsWith("data:")) {
      const attr = "data-" + name.slice(5);
      if (val === void 0)
        elem.removeAttribute(attr);
      else
        elem.setAttribute(attr, bakeValue(val));
    } else {
      const attr = name.startsWith("prop:") ? name.slice(5) : name;
      if (val === void 0) {
        elem.removeAttribute(attr);
      } else if (BOOLEAN_ATTRS.has(attr)) {
        const on = booleanAttrValue(val);
        if (on)
          elem.setAttribute(attr, bakeValue(val));
        else
          elem.removeAttribute(attr);
        const el2 = elem;
        if (typeof el2[attr] === "boolean")
          el2[attr] = on;
      } else if (attr === "value" && VALUE_FORMS.has(elem.tagName)) {
        ;
        elem.value = bakeValue(val);
      } else {
        elem.setAttribute(attr, bakeValue(val));
      }
    }
  }
  appendChild(owner, child) {
    const o = typeof owner === "string" ? this.wires.get(wireKey(owner)) : owner;
    const c = typeof child === "string" ? this.wires.get(wireKey(child)) : child;
    if (!o || !c)
      return;
    if (this.batchEls) {
      const i = this.batchEls.indexOf(c);
      if (i !== -1)
        this.batchEls.splice(i, 1);
    }
    o.appendChild(c);
  }
  removeEl(wire, forkKey) {
    const key = wireKey(wire, forkKey);
    const el = this.wires.get(key);
    if (el) {
      this.purgeListeners(key, el);
      if (this.batchEls) {
        const i = this.batchEls.indexOf(el);
        if (i !== -1)
          this.batchEls.splice(i, 1);
      }
      el.remove();
      this.wires.delete(key);
    }
  }
  /** Remove every listener this adapter bound for one `(wire, forkKey)` slot
   *  from the element, and drop the slot from the retained map. */
  purgeListeners(key, el) {
    const evtMap = this.listeners.get(key);
    if (!evtMap)
      return;
    const remove = el.removeEventListener.bind(el);
    for (const [evt, { fn }] of evtMap)
      remove(evt, fn);
    this.listeners.delete(key);
  }
  hydrate(_rootWire, vdom) {
    const doc = vdom;
    const nodes = [doc?.template, ...doc?.content ?? []];
    for (const n of nodes) {
      const node = n;
      if (node && typeof node === "object" && node.css && typeof node.css.id === "string") {
        this.reused.add(node.css.id);
      }
    }
  }
  styles(cssDefs) {
    for (const def of cssDefs) {
      const rule = String(def);
      if (this.stylesSeen.has(rule))
        continue;
      this.stylesSeen.add(rule);
      this.ensureStyles(rule);
    }
  }
  ensureStyles(def) {
    if (!this.stylesEl) {
      const styleEl = document.createElement("style");
      styleEl.id = "preempt-dynamic-styles";
      document.head.appendChild(styleEl);
      this.stylesEl = styleEl;
    }
    this.stylesEl.textContent += "\n" + def;
  }
};
function makeStylesBuffer(buffer, seen) {
  const call = (cssDefs) => {
    for (const def of cssDefs) {
      const rule = String(def);
      if (seen.has(rule))
        continue;
      seen.add(rule);
      buffer.push(rule);
    }
  };
  const fn = call;
  Object.defineProperty(fn, Symbol.iterator, { value: buffer[Symbol.iterator].bind(buffer) });
  fn.includes = buffer.includes.bind(buffer);
  fn.indexOf = buffer.indexOf.bind(buffer);
  fn.push = buffer.push.bind(buffer);
  fn.join = buffer.join.bind(buffer);
  fn.map = buffer.map.bind(buffer);
  return fn;
}
function escapeAttr(v) {
  return bakeValue(v).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function escapeText(v) {
  return bakeValue(v).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
var SSRFragmentAdapter = class {
  fragments = /* @__PURE__ */ new Map();
  styles;
  stylesBuffer = [];
  /** D4 (FRG-H27) — per-adapter-instance rule-signature dedup set. */
  stylesSeen = /* @__PURE__ */ new Set();
  states = /* @__PURE__ */ new WeakMap();
  created = [];
  rootKey;
  constructor() {
    this.styles = makeStylesBuffer(this.stylesBuffer, this.stylesSeen);
  }
  createEl(type, wire, forkKey) {
    const key = wireKey(wire, forkKey);
    const isVoid = VOID_TAGS.has(type);
    const isText = type === "text";
    const fd = {
      openTag: isText ? "" : "<" + type + ">",
      closeTag: isText ? "" : isVoid ? "" : "</" + type + ">",
      contentText: "",
      isVoid: isText ? true : isVoid,
      isText
    };
    this.states.set(fd, { key, type, isVoid, attrs: /* @__PURE__ */ new Map(), text: "", runs: void 0, children: [], parent: null });
    this.fragments.set(key, fd);
    this.created.push(fd);
    if (this.rootKey === void 0)
      this.rootKey = key;
    return fd;
  }
  setProp(wire, name, val, forkKey) {
    const fd = this.fragments.get(wireKey(wire, forkKey));
    if (!fd)
      return;
    const state = this.states.get(fd);
    if (name === "text") {
      if (typeof val === "string" && isBodyEncoded(val)) {
        state.runs = decodeRuns(val);
        state.text = "";
      } else {
        state.runs = void 0;
        state.text = val === void 0 ? "" : bakeValue(val);
      }
    } else if (name.startsWith("css:")) {
      const key = name.slice(4);
      if (key === "cssDef") {
        const rule = bakeValue(val);
        if (!this.stylesSeen.has(rule)) {
          this.stylesSeen.add(rule);
          this.stylesBuffer.push(rule);
        }
      } else {
        const attr = key === "classes" ? "class" : key;
        if (val === void 0)
          state.attrs.delete(attr);
        else {
          const v = key === "classes" && Array.isArray(val) ? val.join(" ") : val;
          state.attrs.set(attr, escapeAttr(v));
        }
      }
    } else if (name.startsWith("on:")) {
      const attr = "on" + name.slice(3);
      if (val === void 0)
        state.attrs.delete(attr);
      else
        state.attrs.set(attr, escapeAttr(val));
    } else if (name.startsWith("data:")) {
      const attr = "data-" + name.slice(5);
      if (val === void 0)
        state.attrs.delete(attr);
      else
        state.attrs.set(attr, escapeAttr(val));
    } else {
      const attr = name.startsWith("prop:") ? name.slice(5) : name;
      if (val === void 0)
        state.attrs.delete(attr);
      else if (BOOLEAN_ATTRS.has(attr)) {
        if (booleanAttrValue(val))
          state.attrs.set(attr, escapeAttr(val));
        else
          state.attrs.delete(attr);
      } else
        state.attrs.set(attr, escapeAttr(val));
    }
    fd.openTag = this.openTag(state);
    this.rematerialize(fd);
  }
  appendChild(owner, child) {
    const o = typeof owner === "string" ? this.fragments.get(wireKey(owner)) : owner;
    const c = typeof child === "string" ? this.fragments.get(wireKey(child)) : child;
    if (!o || !c)
      return;
    const ownerState = this.states.get(o);
    const childState = this.states.get(c);
    if (!ownerState || !childState)
      return;
    ownerState.children.push(c);
    childState.parent = o;
    this.rematerialize(o);
  }
  removeEl(wire, forkKey) {
    const key = wireKey(wire, forkKey);
    const fd = this.fragments.get(key);
    if (!fd)
      return;
    const state = this.states.get(fd);
    const parent = state.parent;
    if (parent) {
      const parentState = this.states.get(parent);
      const i = parentState.children.indexOf(fd);
      if (i !== -1)
        parentState.children.splice(i, 1);
    }
    state.parent = null;
    const ci = this.created.indexOf(fd);
    if (ci !== -1)
      this.created.splice(ci, 1);
    this.fragments.delete(key);
    if (parent)
      this.rematerialize(parent);
  }
  hydrate(_rootWire, _vdom) {
  }
  toString() {
    const stylesPrefix = this.stylesBuffer.length ? '<style id="preempt-dynamic-styles">' + this.stylesBuffer.map((d) => "\n" + d).join("") + "</style>" : "";
    if (this.rootKey === void 0)
      return stylesPrefix;
    const root2 = this.fragments.get(this.rootKey);
    if (!root2)
      return stylesPrefix;
    const floating = this.created.filter((fd) => fd !== root2 && this.fragments.has(this.states.get(fd).key) && this.states.get(fd).parent === null).map((fd) => this.rootHtml(fd)).join("");
    return stylesPrefix + this.rootHtml(root2) + floating;
  }
  openTag(state) {
    const attrs = [...state.attrs.entries()].map(([k, v]) => `${k}="${v}"`).join(" ");
    return "<" + state.type + (attrs ? " " + attrs : "") + ">";
  }
  rootHtml(root2) {
    return root2.isVoid ? root2.openTag : root2.openTag + root2.contentText + root2.closeTag;
  }
  rematerialize(fd) {
    const state = this.states.get(fd);
    if (!state)
      return;
    fd.contentText = this.contentHtml(state);
    if (state.parent)
      this.rematerialize(state.parent);
  }
  contentHtml(state) {
    if (state.runs !== void 0) {
      let out = "";
      for (const run of state.runs) {
        if ("text" in run) {
          out += escapeText(run.text);
        } else {
          const child = this.fragments.get(wireKey(run.child));
          if (child)
            out += this.childHtml(child);
        }
      }
      return out;
    }
    const body = state.children.map((c) => this.childHtml(c)).join("");
    return escapeText(state.text) + body;
  }
  childHtml(child) {
    if (child.isText)
      return child.contentText;
    return child.isVoid ? child.openTag : child.openTag + child.contentText + child.closeTag;
  }
};
var MD_LIST_TYPES = /* @__PURE__ */ new Set(["ul", "ol"]);
var MD_HEADING_LEVEL = { h1: 1, h2: 2, h3: 3, h4: 4, h5: 5, h6: 6 };
function escapeMarkdown(text) {
  let s = text.replace(/\\/g, "\\\\");
  s = s.replace(/([*_])/g, "\\$1");
  s = s.replace(/([[\]()`])/g, "\\$1");
  s = s.split("\n").map((line) => {
    let l = line;
    l = l.replace(/^([#>\-])/, "\\$1");
    l = l.replace(/^(\d+)\.\s/, "$1\\. ");
    return l;
  }).join("\n");
  return s;
}
var MarkdownAdapter = class {
  fragments = /* @__PURE__ */ new Map();
  created = [];
  rootKey;
  createEl(type, wire, forkKey) {
    const key = wireKey(wire, forkKey);
    const node = { type, wire, text: "", attrs: /* @__PURE__ */ new Map(), children: [], parent: null };
    this.fragments.set(key, node);
    this.created.push(node);
    if (this.rootKey === void 0)
      this.rootKey = key;
    return node;
  }
  setProp(wire, name, val, forkKey) {
    const node = this.fragments.get(wireKey(wire, forkKey));
    if (!node)
      return;
    if (name === "text") {
      node.text = val === void 0 ? "" : bakeValue(val);
    } else if (name.startsWith("on:") || name.startsWith("data:")) {
    } else if (name.startsWith("css:")) {
    } else if (name.startsWith("prop:")) {
      node.attrs.set(name.slice(5), val);
    } else {
      node.attrs.set(name, val);
    }
  }
  appendChild(owner, child) {
    const o = typeof owner === "string" ? this.fragments.get(wireKey(owner)) : owner;
    const c = typeof child === "string" ? this.fragments.get(wireKey(child)) : child;
    if (!o || !c)
      return;
    if (c.parent) {
      const p = c.parent;
      const i = p.children.indexOf(c);
      if (i !== -1)
        p.children.splice(i, 1);
    }
    o.children.push(c);
    c.parent = o;
  }
  removeEl(wire, forkKey) {
    const key = wireKey(wire, forkKey);
    const node = this.fragments.get(key);
    if (!node)
      return;
    if (node.parent) {
      const p = node.parent;
      const i = p.children.indexOf(node);
      if (i !== -1)
        p.children.splice(i, 1);
    }
    node.parent = null;
    const ci = this.created.indexOf(node);
    if (ci !== -1)
      this.created.splice(ci, 1);
    this.fragments.delete(key);
  }
  hydrate(_rootWire, _vdom) {
  }
  toString() {
    if (this.rootKey === void 0)
      return "";
    const root2 = this.fragments.get(this.rootKey);
    if (!root2)
      return "";
    const rootLines = this.renderTree(root2);
    const floating = this.created.filter((n) => n !== root2 && n.parent === null && this.fragments.has(wireKey(n.wire))).flatMap((n) => this.renderTree(n));
    return [...rootLines, ...floating].join("\n");
  }
  renderTree(node) {
    const kind = this.classify(node.type);
    if (kind === "list") {
      const out = [];
      let idx = 1;
      for (const child of node.children) {
        if (child.type !== "li")
          continue;
        out.push(...this.renderListItem(child, node.type === "ol" ? idx : null));
        idx += 1;
      }
      return out;
    }
    if (kind === "heading") {
      const lines = [`${"#".repeat(MD_HEADING_LEVEL[node.type] ?? 1)} ${this.inlineContent(node)}`];
      for (const c of node.children) {
        if (this.classify(c.type) !== "inline")
          lines.push(...this.renderTree(c));
      }
      return lines;
    }
    if (kind === "quote") {
      const own = this.inlineContent(node);
      const lines = own ? own.split("\n").map((l) => "> " + l) : [];
      for (const c of node.children) {
        if (this.classify(c.type) !== "inline")
          lines.push(...this.renderTree(c).map((l) => "> " + l));
      }
      return lines;
    }
    if (kind === "pre") {
      return ["```", node.text, "```"];
    }
    if (kind === "hr")
      return ["---"];
    if (kind === "block") {
      const inline = this.inlineContent(node);
      const lines = inline ? [inline] : [];
      for (const c of node.children) {
        if (this.classify(c.type) !== "inline")
          lines.push(...this.renderTree(c));
      }
      return lines;
    }
    return [this.renderInline(node)];
  }
  renderListItem(li, index) {
    const marker = index === null ? "- " : `${index}. `;
    const content = this.inlineContent(li);
    const lines = [marker + content];
    for (const c of li.children) {
      if (MD_LIST_TYPES.has(c.type)) {
        lines.push(...this.renderTree(c).map((l) => "  " + l));
      } else if (this.classify(c.type) !== "inline") {
        lines.push(...this.renderTree(c).map((l) => "  " + l));
      }
    }
    return lines;
  }
  inlineContent(node) {
    const text = node.text ? escapeMarkdown(node.text) : "";
    const inlineKids = node.children.filter((c) => this.classify(c.type) === "inline").map((c) => this.renderInline(c)).join("");
    return text + inlineKids;
  }
  renderInline(node) {
    switch (node.type) {
      case "strong":
      case "b":
        return "**" + this.inlineContent(node) + "**";
      case "em":
      case "i":
        return "*" + this.inlineContent(node) + "*";
      case "code":
        return "`" + this.inlineContent(node) + "`";
      case "a": {
        const text = this.inlineContent(node);
        const href = node.attrs.get("href");
        if (typeof href === "string" && href.length > 0) {
          const title = node.attrs.get("title");
          return typeof title === "string" && title.length > 0 ? `[${text}](${escapeMarkdown(href)} "${escapeMarkdown(title).replace(/"/g, '\\"')}")` : `[${text}](${escapeMarkdown(href)})`;
        }
        return text;
      }
      case "img": {
        const src = node.attrs.get("src");
        const alt = node.attrs.get("alt") ?? node.text;
        return typeof src === "string" ? `![${escapeMarkdown(alt)}](${escapeMarkdown(src)})` : "";
      }
      case "br":
        return "\n";
      case "span":
      default:
        return this.inlineContent(node);
    }
  }
  classify(type) {
    if (MD_LIST_TYPES.has(type))
      return "list";
    if (type === "li")
      return "block";
    if (MD_HEADING_LEVEL[type] !== void 0)
      return "heading";
    if (type === "blockquote")
      return "quote";
    if (type === "hr")
      return "hr";
    if (type === "pre")
      return "pre";
    if (type === "strong" || type === "em" || type === "b" || type === "i" || type === "a" || type === "code" || type === "img" || type === "br" || type === "span" || type === "text")
      return "inline";
    return "block";
  }
};

// node_modules/provident-ssr/dist/core/events.js
function stateKey(e) {
  if (e.type !== "state")
    return null;
  return `${e.nodeId}\0${e.fork?.forkKey ?? ""}`;
}
function coalesceByTick(events) {
  const seen = /* @__PURE__ */ new Map();
  const out = [];
  for (const e of events) {
    const key = stateKey(e);
    if (key === null) {
      out.push(e);
      continue;
    }
    const idx = seen.get(key);
    if (idx === void 0) {
      seen.set(key, out.length);
      out.push(e);
    } else {
      out[idx] = e;
    }
  }
  return out;
}
var EventBridge = class {
  get state() {
    return this.stateIds;
  }
  stateIds = /* @__PURE__ */ new Set();
  subscribers = /* @__PURE__ */ new Map();
  buffers = /* @__PURE__ */ new Map();
  seq = 0;
  subscribe(topic, fn) {
    let set = this.subscribers.get(topic);
    if (!set) {
      set = /* @__PURE__ */ new Set();
      this.subscribers.set(topic, set);
    }
    set.add(fn);
    return () => {
      set.delete(fn);
    };
  }
  push(topic, e) {
    let buf = this.buffers.get(topic);
    if (!buf) {
      buf = [];
      this.buffers.set(topic, buf);
    }
    if (e.type === "state") {
      const key = `${e.nodeId}\0${e.fork?.forkKey ?? ""}`;
      const idx = buf.findIndex((x) => x.type === "state" && `${x.nodeId}\0${x.fork?.forkKey ?? ""}` === key);
      if (idx === -1)
        buf.push(e);
      else
        buf[idx] = e;
    } else {
      buf.push(e);
    }
  }
  flush(tick) {
    const stateIds = /* @__PURE__ */ new Set();
    for (const [topic, buf] of [...this.buffers.entries()]) {
      if (buf.length === 0)
        continue;
      const events = coalesceByTick(buf);
      buf.length = 0;
      for (const e of events) {
        if (e.type === "state")
          stateIds.add(e.nodeId);
      }
      const env = { topic, tick, seq: ++this.seq, events };
      const subs = this.subscribers.get(topic);
      if (subs)
        for (const fn of subs)
          fn(env);
    }
    this.stateIds = stateIds;
  }
};

// node_modules/provident-ssr/dist/core/payload.js
function dropPayload(payload) {
  for (const root2 of [...payload.roots]) {
    unregisterContentNode(root2);
    detachNodeSafe(root2);
  }
  payload.roots = [];
}

// src/renderer/runtime.ts
var Runtime = class _Runtime {
  supervisor;
  adapter;
  ssr = new SSRFragmentAdapter();
  mount;
  rootNode;
  nodes;
  prevStates = /* @__PURE__ */ new Map();
  domPrevMap = null;
  ssrPrevMap = null;
  bootstrapped = false;
  maxJournalLength;
  transformRouter;
  /** The opt-in data-node-id (REQ-GAP-3/A2 + REQ-GAP-8): every emitted element
   *  carries its engine nodeId in BOTH views so an MCP agent reading the
   *  rendered HTML can trace each element back to its producing graph node. */
  renderOptions = { nodeIdAttribute: true };
  /** A5 — the authored-id index, rebuilt on every load/teardown: css.id →
   *  nodeId and props.id → nodeId. A destroyed node's id is NEVER in the
   *  index (the tombstone-shadow hazard is avoided) — resolution checks the
   *  index first, then falls back to `getNode` (nodeId/wire). */
  cssIndex = /* @__PURE__ */ new Map();
  propsIndex = /* @__PURE__ */ new Map();
  /** The content payloads (roots + payload metadata/userData) of the current
   *  graph — built at load, consumed by teardown's dropPayload + userData
   *  clear, so a teardown returns to a root-only graph. */
  payloads = [];
  /** The ENVELOPE (the code/data source of truth) the graph was last derived
   *  from — the code-CRUD surface reads/writes it (mcp-endpoint.md §4). */
  envelope = null;
  /** The last translate's additive warnings channel (R10) — surfaced through
   *  load/validate/op/teardown so a CSP-eval-block or a handler-body-invalid
   *  is MCP-visible, never a silently dead page. */
  warnings = [];
  constructor(opts) {
    this.mount = opts.mount;
    this.maxJournalLength = opts.maxJournalLength;
    this.transformRouter = opts.transformRouter ?? null;
    const translated = translateLegacy(opts.envelope);
    this.rootNode = translated.root;
    this.nodes = translated.nodes;
    this.supervisor = new Supervisor({ events: new EventBridge(), maxJournalLength: opts.maxJournalLength });
    for (const n of translated.nodes) this.supervisor.registerNode(n);
    this.adapter = new DomAdapter(opts.mount, { onEvent: this.handleDomEvent });
    this.payloads = this.buildPayloads(translated.content, opts.envelope.content);
    this.rebuildIdIndex();
  }
  /** Wire real DOM events (browser interaction) to the same graph dispatch
   *  the MCP synthetic path uses, then re-render. Phase A dispatch is a
   *  trigger; the public `flush()` settles the cascade (the 0.1.1 shared
   *  surface — no hand-rolled tick loop), then we drain + re-emit. */
  handleDomEvent = (wire, domEvent) => {
    const node = this.supervisor.getNode(wire);
    if (!node) return;
    const eventName = domEvent?.type ?? String(domEvent ?? "");
    const extra = domEvent?.target && "value" in domEvent.target ? [String(domEvent.target.value)] : [];
    this.supervisor.dispatchEvent(node.id, eventName, ...extra);
    void this.supervisor.flush().then(() => {
      this.mergePass2();
      this.render();
    });
  };
  setStates(actionable) {
    const byNode = /* @__PURE__ */ new Map();
    for (const s of actionable) {
      const id = s.nodeId;
      const arr = byNode.get(id) ?? [];
      arr.push(s);
      byNode.set(id, arr);
    }
    for (const [id, arr] of byNode) {
      if (!this.supervisor.getNode(id)?.isInTree) continue;
      this.prevStates.set(id, arr);
    }
  }
  render() {
    if (!this.bootstrapped) {
      if (this.isPlacementRouted()) {
        const actionable2 = [];
        for (const n of this.nodes) actionable2.push(...n.compilePath().actionable);
        this.setStates(actionable2);
        this.supervisor.recordResolved(actionable2);
      } else {
        const cr = this.rootNode.compile(this.nodes);
        this.setStates(cr.actionable);
        this.supervisor.recordResolved(cr.actionable);
      }
      this.bootstrapped = true;
    } else {
      this.mergePass2();
    }
    const actionable = [];
    for (const states of this.prevStates.values()) actionable.push(...states);
    const byNode = new Map(this.supervisor.allNodes().map((n) => [n.id, n]));
    for (const id of [...this.prevStates.keys()]) {
      if (!byNode.has(id)) this.prevStates.delete(id);
    }
    const liveActionable = [];
    for (const states of this.prevStates.values()) liveActionable.push(...states);
    this.adapter.beginBatch();
    const dom = renderProducingProcess(liveActionable, byNode, this.adapter, this.domPrevMap, this.renderOptions);
    this.adapter.endBatch();
    this.domPrevMap = dom.prevMap;
    const ssr = renderProducingProcess(liveActionable, byNode, this.ssr, this.ssrPrevMap, this.renderOptions);
    this.ssrPrevMap = ssr.prevMap;
    return { els: dom.els, ops: dom.ops };
  }
  mergePass2() {
    const pass2 = this.supervisor.takePass2States();
    for (const [id, arr] of pass2) {
      if (!this.supervisor.getNode(id)?.isInTree) continue;
      this.prevStates.set(id, arr);
    }
  }
  /** True when any node carries a content-role anchor (placement-routed) —
   *  such a tree must bootstrap via the path-enumeration `compilePath` pass,
   *  not the default `rootNode.compile` (runtime-host.md §3.1 R-new). */
  isPlacementRouted() {
    return this.nodes.some((n) => n.anchors.some((a) => a.role === "content"));
  }
  /** Bootstrap render — called once after the mount is available. */
  bootstrap() {
    this.render();
  }
  // ---- target resolution -------------------------------------------------
  resolveTarget(target) {
    if (typeof target === "string") {
      return this.resolveString(target);
    }
    if (target.kind === "nodeId" || target.kind === "wire") {
      const ref = target.kind === "nodeId" ? target.nodeId : target.wire;
      const n = this.supervisor.getNode(ref);
      return n && !n.destroyed && n.isInTree ? n.id : null;
    }
    if (target.kind === "cssId") {
      const n = this.nodeByCssId(target.cssId);
      return n ? n.id : null;
    }
    return null;
  }
  // ---- id-index (A5) ------------------------------------------------------
  rebuildIdIndex() {
    this.cssIndex = /* @__PURE__ */ new Map();
    this.propsIndex = /* @__PURE__ */ new Map();
    for (const n of this.supervisor.allNodes()) {
      if (n.destroyed || !n.isInTree) continue;
      const cssId = n.css?.id;
      if (cssId !== void 0) this.cssIndex.set(cssId, n.id);
      const propsId = n.props?.id;
      if (propsId !== void 0) this.propsIndex.set(propsId, n.id);
    }
  }
  /** Wrap the per-node content roots (TranslatedTree.content or loadState's
   *  content nodes) into a Payload-like handle the teardown path can drop,
   *  carrying the translate-scoped userData for the legacy clear (R8). */
  buildPayloads(contentNodes, userData) {
    return [{ id: "p0", roots: [...contentNodes], userData }];
  }
  resolveString(s) {
    const direct = this.supervisor.getNode(s);
    if (direct && !direct.destroyed && direct.isInTree) return s;
    const byCss = this.cssIndex.get(s) ?? this.nodeByCssId(s)?.id;
    if (byCss) return byCss;
    const byProps = this.propsIndex.get(s) ?? this.nodeByPropsId(s)?.id;
    if (byProps) return byProps;
    return null;
  }
  nodeByCssId(cssId) {
    const fromIndex = this.cssIndex.get(cssId);
    if (fromIndex !== void 0) {
      const n = this.supervisor.getNode(fromIndex);
      if (n && !n.destroyed && n.isInTree) return n;
    }
    return this.supervisor.allNodes().find((n) => !n.destroyed && n.isInTree && n.css?.id === cssId);
  }
  nodeByPropsId(id) {
    const fromIndex = this.propsIndex.get(id);
    if (fromIndex !== void 0) {
      const n = this.supervisor.getNode(fromIndex);
      if (n && !n.destroyed && n.isInTree) return n;
    }
    return this.supervisor.allNodes().find((n) => !n.destroyed && n.isInTree && n.props?.id === id);
  }
  /** REQ-GAP-3 — THE ONE GRAPH READ the renderer-side affordance wiring owes: resolve the
   *  DOM ELEMENT the engine emitted for a graph node, from the AUTHORED id. The id space is
   *  the one the index already builds: an engine `nodeId` first, then an authored `css.id`,
   *  then an authored `props.id` — and the element is found by walking the live mount's own
   *  `data-node-id` attributes (the opt-in attribute every emitted element carries). TOTAL:
   *  an unresolvable id, a mount that is not a node and a child list that is not array-like
   *  all answer `null`, and neither the graph nor the mount is touched. */
  elementForNodeId(id) {
    if (typeof id !== "string" || id.length === 0) return null;
    const resolved = this.resolveTarget(id);
    if (resolved === null) return null;
    const holder = this.mount;
    const roots = holder === null || holder === void 0 ? void 0 : holder.children;
    if (roots === null || roots === void 0 || typeof roots.length !== "number") return null;
    const queue = [];
    const list = roots;
    for (let i = 0; i < list.length; i += 1) queue.push(list[i]);
    while (queue.length > 0) {
      const candidate = queue.shift();
      if (candidate === null || candidate === void 0 || typeof candidate !== "object") continue;
      const element = candidate;
      if (typeof element.getAttribute === "function") {
        let carried;
        try {
          carried = element.getAttribute("data-node-id");
        } catch {
          carried = void 0;
        }
        if (carried === resolved) return candidate;
      }
      let kids;
      try {
        kids = element.children;
      } catch {
        kids = void 0;
      }
      if (kids === null || kids === void 0 || typeof kids.length !== "number") continue;
      const childList = kids;
      for (let i = 0; i < childList.length; i += 1) queue.push(childList[i]);
    }
    return null;
  }
  // ---- host capabilities (runtime-host.md §2/§3) --------------------------
  /** A2 — replace the current graph from a legacy envelope. Tears down the
   *  existing content, sets/clears the translate-scoped userData (R8), then
   *  translate → register → compile → recordResolved → render. Captures the
   *  envelope (the code-CRUD source of truth) + the translate warnings (R10). */
  loadEnvelope(envelope, opts) {
    this.tearDownGraph();
    const env = structuredClone(envelope);
    if (opts?.userData !== void 0) {
      if (!Array.isArray(env.content)) env.content = [];
      if (env.content.length === 0) env.content.push({ content: [] });
      env.content[0].userData = opts.userData;
    }
    const translated = translateLegacy(env);
    this.rootNode = translated.root;
    this.nodes = translated.nodes;
    this.supervisor = new Supervisor({ events: new EventBridge(), maxJournalLength: this.maxJournalLength });
    for (const n of translated.nodes) this.supervisor.registerNode(n);
    this.payloads = this.buildPayloads(translated.content, translated.userData);
    this.envelope = env;
    this.warnings = translated.warnings ?? [];
    this.rebuildIdIndex();
    this.resetRenderState();
    this.render();
    return this.census();
  }
  /** A1 — snapshot/restore load: loadState → seeds → Node(d, hub) (template
   *  root first, content after) → reconcileParentTargets → register per node →
   *  compile → recordResolved → render. */
  loadDoc(doc) {
    this.tearDownGraph();
    const seeds = loadState(doc);
    const hub = createLinkHub();
    const nodes = seeds.map((s) => new Node(s, hub));
    reconcileParentTargets(nodes);
    reRegisterDefPrototypes(doc, hub, nodes);
    this.rootNode = nodes[0];
    this.nodes = nodes;
    this.supervisor = new Supervisor({ events: new EventBridge(), maxJournalLength: this.maxJournalLength });
    for (const n of nodes) this.supervisor.registerNode(n);
    this.payloads = this.buildPayloads(nodes, void 0);
    this.envelope = null;
    this.warnings = [];
    this.rebuildIdIndex();
    this.resetRenderState();
    this.render();
    return this.census();
  }
  /** MCP `provident.load` (battery §3): dispatch to the A2/A1/A3 load paths
   *  and return the census + both render views + the translate warnings (R10).
   *  `userData` (R8) rides only the envelope path. */
  load(req) {
    let census;
    if (req.kind === "envelope") {
      census = this.loadEnvelope(req.envelope, req.userData !== void 0 ? { userData: req.userData } : void 0);
    } else if (req.kind === "doc") {
      census = this.loadDoc(req.doc);
    } else if (req.kind === "commands") {
      const commands = req.commands ?? [];
      for (const cmd of commands) this.applyCommand(cmd);
      census = this.census();
    } else {
      throw new Error(`unknown load kind: ${String(req.kind)}`);
    }
    return {
      census,
      renderedHtml: this.renderedHtml(),
      ssrHtml: this.ssrHtml(),
      warnings: this.warnings
    };
  }
  /** A3 — a single managed-channel op: resolve the string `node` to a Node,
   *  supervisor.apply → flush() → drain takePass2States once → render. */
  applyCommand(cmd) {
    if (cmd === null || cmd === void 0 || typeof cmd !== "object") {
      return { status: "rejected" };
    }
    if (typeof cmd.node === "string" && !this.resolveTarget(cmd.node)) {
      return { status: "rejected" };
    }
    if (cmd.node !== void 0 && typeof cmd.node !== "string" && typeof cmd.node !== "object") {
      return { status: "rejected" };
    }
    if (cmd.node !== void 0 && typeof cmd.node === "object" && !this.isRegisteredNode(cmd.node)) {
      return { status: "rejected" };
    }
    if (cmd.source !== void 0 && typeof cmd.source === "object" && !this.isRegisteredNode(cmd.source)) {
      return { status: "rejected" };
    }
    if (cmd.kind === "state-slice" && !Array.isArray(cmd.mutation)) {
      return { status: "rejected" };
    }
    if (cmd.kind === "layer-apply" && !Array.isArray(cmd.mutation)) {
      return { status: "rejected" };
    }
    if ((cmd.kind === "state-slice" || cmd.kind === "layer-apply") && !_Runtime.mutationPropsValid(cmd.mutation)) {
      return { status: "rejected" };
    }
    const payload = { ...cmd };
    if (typeof cmd.node === "string") {
      const id = this.resolveTarget(cmd.node);
      const n = id ? this.supervisor.getNode(id) : void 0;
      if (n) payload.node = n;
    }
    const result = this.supervisor.apply(payload);
    const dirty = (result.dirtied ?? []).filter((id) => this.supervisor.getNode(id)?.isInTree);
    for (const id of dirty) {
      const node = this.supervisor.getNode(id);
      if (!node) continue;
      const cr = node.compile(this.focusedSlice(node), { focusNodeId: node.id });
      const grouped = /* @__PURE__ */ new Map();
      for (const s of cr.actionable) {
        const arr = grouped.get(s.nodeId) ?? [];
        arr.push(s);
        grouped.set(s.nodeId, arr);
      }
      for (const [gid, arr] of grouped) {
        if (this.supervisor.getNode(gid)?.isInTree) this.prevStates.set(gid, arr);
      }
    }
    this.render();
    const out = { status: result.status };
    if (result.dirtied) out.dirtied = result.dirtied;
    if (result.minted) out.minted = result.minted;
    this.rebuildIdIndex();
    return out;
  }
  focusedSlice(node) {
    return focusedSliceFor(node, () => this.supervisor.allNodes());
  }
  /** U-ENGINE-PIN §2.3 (AMENDED — ruling 1) — the SHAPE-ONLY predicate.
   *  Returns `false` (⇒ reject the whole batch) if `mutation` is not an array,
   *  or if any element is not a non-null object, misses `targetProp` / carries a
   *  non-string `targetProp`. These are the predicate's ONLY reject class.
   *
   *  It does NOT inspect `value`, and therefore REFUSES NO VALUE-SHAPED WRITE:
   *  every nullish / absent `value` on an attribute-path namespace — and every
   *  defined value, every falsy literal, every array/object value, every other
   *  namespace (`content`, `handlers`, `on:*`, `data:*`, a bare attribute name)
   *  and every spelling (`props.<key>`, `css.<key>`, `props:<key>`, `css:<key>`,
   *  bare) — passes through to the engine. The engine owns those paths and the
   *  shim completion makes the engine's `removeAttribute` paths safe (§2.2.6,
   *  §3.7).
   *
   *  The scope is the COMMAND SURFACE (`provident.op` / `applyCommand` here, plus
   *  the pane channel in `src/renderer/secure-panels.ts`): handler-originated
   *  writes reach `supervisor.apply` directly and are OUTSIDE this predicate, and
   *  no attempt is made to wrap or patch the engine to widen it (a REJECTED
   *  option, §2.3/§1). */
  static mutationPropsValid(mutation) {
    if (!Array.isArray(mutation)) return false;
    for (const m of mutation) {
      if (m === null || typeof m !== "object") return false;
      const target = m.targetProp;
      if (typeof target !== "string") return false;
    }
    return true;
  }
  /** F5 — is this object a real registered (not-destroyed) Node, not a plain
   *  object masquerading as one? Used to reject a hostile/malformed op before
   *  the engine calls `.clone()`/`.source` on it. */
  isRegisteredNode(obj) {
    if (obj === null || typeof obj !== "object") return false;
    const n = obj;
    return typeof n.id === "string" && this.supervisor.getNode(n.id) === n && !n.destroyed;
  }
  /** The current graph's legacy export — no mutation. */
  exportLegacy() {
    const live = this.nodes.slice(1).filter((n) => !n.destroyed && n.isInTree);
    const rev = reverseTranslate(this.rootNode, { content: live });
    return {
      ...rev,
      content: rev.content ?? [],
      clientConfig: { runInstantiation: true, runRendering: true }
    };
  }
  /** The current graph's serialized export — no mutation. */
  exportSerialized() {
    return serializeSlice(this.rootNode, this.nodes, { adapter: "dom", persistence: false });
  }
  /** Re-load an export into a THROWAWAY graph (a fresh Supervisor + hub; never
   *  the live one) and compare census. Never throws on a malformed export. */
  validateExport(kind, exp) {
    if (kind !== "legacy" && kind !== "serialized") {
      return { valid: false, censusMatch: false, warnings: [] };
    }
    try {
      let nodes;
      let hub = createLinkHub();
      if (kind === "legacy") {
        const translated = translateLegacy(exp);
        nodes = translated.nodes;
      } else {
        const seeds = loadState(exp);
        nodes = seeds.map((s) => new Node(s, hub));
        reconcileParentTargets(nodes);
      }
      const throwaway = new Supervisor({ events: new EventBridge(), maxJournalLength: this.maxJournalLength });
      for (const n of nodes) throwaway.registerNode(n);
      const cr = nodes[0].compile(nodes);
      throwaway.recordResolved(cr.actionable);
      const theirs = {
        registered: throwaway.allNodes().length,
        inTree: throwaway.allNodes().filter((n) => !n.destroyed && n.isInTree).length,
        unplaced: throwaway.allNodes().filter((n) => !n.destroyed && n.state === "unplaced").length,
        destroyed: throwaway.allNodes().filter((n) => n.destroyed).length,
        prototypes: throwaway.allNodes().filter((n) => n.state === "prototype").length
      };
      const ours = this.census();
      return { valid: true, censusMatch: theirs.inTree === ours.inTree && theirs.registered === ours.registered, warnings: [] };
    } catch {
      return { valid: false, censusMatch: false, warnings: [] };
    }
  }
  /** C3/C4 — tear down every in-tree child of root (supervisor destroy per
   *  node), drop content payloads, clear userData, then settle-gate (R6), then
   *  re-render. Returns the post-teardown census (inTree === 1). Idempotent. */
  teardown() {
    this.tearDownGraph();
    return this.census();
  }
  /** MCP `provident.teardown` — the interface-driven reset (C4): teardown →
   *  settle-gate (R6: `hasPendingWork()` false) → re-render → root-only proof.
   *  Returns the post-teardown census + the root-only render + warnings.
   *  ASYNC (R6): the destroy cascade may leave pending pass-2 work; the
   *  settle-gate is AWAITED so the returned census reflects provable
   *  quiescence, never a pre-settle snapshot. */
  async teardownResult() {
    await this.settleGate();
    const census = this.teardown();
    await this.settleGate();
    return { census, renderedHtml: this.renderedHtml(), warnings: this.warnings };
  }
  /** R6 test seam — whether the supervisor has undrained pass-2 work (the
   *  battery + the settle-gate assert this is false after a teardown). */
  hasPendingWork() {
    return this.supervisor.hasPendingWork();
  }
  /** R6 — the settle-gate: drain pending work to provable quiescence before
   *  the render is trusted (the battery asserts `hasPendingWork() === false`).
   *  The engine's public flush + hasPendingWork (0.1.3). */
  async settleGate() {
    let guard = 0;
    while (this.supervisor.hasPendingWork()) {
      if (guard++ > 1e3) break;
      await this.supervisor.flush();
      this.mergePass2();
    }
  }
  /** MCP `provident.op` — apply a single managed-channel op, drain pass-2
   *  once (R9), re-render, return status + both views + warnings (R10). */
  op(cmd) {
    const result = this.applyCommand(cmd);
    return {
      status: result.status,
      ...result.dirtied !== void 0 ? { dirtied: result.dirtied } : {},
      ...result.minted !== void 0 ? { minted: result.minted } : {},
      renderedHtml: this.renderedHtml(),
      ssrHtml: this.ssrHtml(),
      warnings: this.warnings
    };
  }
  /** MCP `provident.journal` — drive the engine's journal reversibility
   *  surface (`Supervisor.undo()`/`redo()`/`replay()`, provident-ssr 0.2.1
   *  UndoRedoReport). The engine returns a report (`status`/`scheduledDirtied`/
   *  `stackTopKind`/`redoTopKind`/`baseBoundary`); the host then AWAITS the
   *  flush + drains pass-2 (the report's `scheduledDirtied` is the pending-flush
   *  set — settled states need `flush()` + `takePass2States()`, undo-redo-report
   *  §2.5), re-renders, and returns both views + warnings. J3 — a base-restoring
   *  journal op swaps the graph's node objects, so the render baseline + id
   *  index are rebuilt from the live graph (never a stale focused-slice cache).
   *  J7 — no requestId: undo/redo/replay are intrinsically non-idempotent. */
  async journal(action) {
    if (action !== "undo" && action !== "redo" && action !== "replay") {
      throw new Error(`unknown journal action: ${String(action)}`);
    }
    const report = this.supervisor[action]();
    await this.settleGate();
    this.nodes = [...this.supervisor.allNodes()];
    const root2 = this.nodes.find((n) => n.id === this.rootNode.id);
    if (root2) this.rootNode = root2;
    this.rebuildIdIndex();
    this.render();
    return {
      status: report.status,
      scheduledDirtied: report.scheduledDirtied,
      ...report.stackTopKind !== void 0 ? { stackTopKind: report.stackTopKind } : {},
      ...report.redoTopKind !== void 0 ? { redoTopKind: report.redoTopKind } : {},
      baseBoundary: report.baseBoundary,
      renderedHtml: this.renderedHtml(),
      ssrHtml: this.ssrHtml(),
      warnings: this.warnings
    };
  }
  /** MCP `provident.export` — the graph's legacy/serialized export + a census
   *  snapshot. No mutation. */
  export(format) {
    const value = format === "legacy" ? this.exportLegacy() : this.exportSerialized();
    return { export: value, census: this.census() };
  }
  /** MCP `provident.validate` — validate an export against a THROWAWAY graph
   *  (never the live one) + compare census + tree-signature parity (R3: only
   *  structural parity for def/seam-bearing exports). */
  validate(kind, exp) {
    const verdict = this.validateExport(kind, exp);
    let treeSigMatch = false;
    try {
      const ourSig = this.shapeSig();
      const theirSig = this.validateSig(kind, exp);
      treeSigMatch = verdict.valid && ourSig === theirSig;
    } catch {
      treeSigMatch = false;
    }
    return { valid: verdict.valid, censusMatch: verdict.censusMatch, treeSigMatch, warnings: verdict.warnings };
  }
  /** The engine auto-mints a per-translate `props.id` (e.g. `preempt-node-node-1`)
   *  that differs across a legacy round-trip. Strip it (and any `node-N`
   *  minted id) so the shape digest is stable — R3 "structural parity only". */
  structuralProps(props) {
    if (!props) return "";
    const o = {};
    for (const k of Object.keys(props)) {
      if (k === "id" && typeof props[k] === "string" && /^(preempt-node-|node-)/.test(props[k])) continue;
      o[k] = this.sortVal(props[k]);
    }
    return JSON.stringify(o);
  }
  sortVal(v) {
    if (Array.isArray(v)) return v.map((x) => this.sortVal(x));
    if (v !== null && typeof v === "object") {
      const o = {};
      for (const k of Object.keys(v).sort()) o[k] = this.sortVal(v[k]);
      return o;
    }
    return v;
  }
  /** A deterministic shape digest of a rendered structure (never the raw
   *  fragment — a 4095-element tree serializes to ~180MB). Folds the EMITTED
   *  element tree (type + structural props + children digests) — the upstream
   *  `shapeSigOfTrees` pattern. Engine-minted auto ids (`node-N`,
   *  `preempt-node-*`) are stripped so the digest is stable across a legacy
   *  round-trip (R3 "structural parity only"). */
  foldElements(els, kids) {
    const sort = (v) => {
      if (Array.isArray(v)) return v.map(sort);
      if (v !== null && typeof v === "object") {
        const o = {};
        for (const k of Object.keys(v).sort()) o[k] = sort(v[k]);
        return o;
      }
      return v;
    };
    const foldEl = (e) => {
      const props = e.props ? this.structuralProps(e.props) : "";
      const ch = (kids.get(String(e.wire)) ?? []).map(foldEl).join("");
      return `${String(e.type)}:${props}:${ch.length ? this.hash64(ch) : ""};`;
    };
    const roots = els.filter((e) => !e.parent || !String(e.parent));
    return this.hash64(roots.map(foldEl).join(""));
  }
  emitTree(nodes, supervisor) {
    const cr = nodes[0].compile(nodes);
    supervisor.recordResolved(cr.actionable);
    const byNode = new Map(supervisor.allNodes().map((n) => [n.id, n]));
    return emitElements(cr.actionable, byNode);
  }
  /** A deterministic shape digest of the LIVE graph (never the raw fragment).
   *  Emits the live graph to its element tree and folds it. */
  shapeSig() {
    const els = this.emitTree(this.nodes, this.supervisor);
    const kids = /* @__PURE__ */ new Map();
    for (const e of els) {
      if (e.parent) {
        const arr = kids.get(String(e.parent)) ?? [];
        arr.push(e);
        kids.set(String(e.parent), arr);
      }
    }
    return this.foldElements(els, kids);
  }
  /** The THROWAWAY graph's shape sig for a candidate export — never the live
   *  graph; a throwaway copy used only for the parity compare. */
  validateSig(kind, exp) {
    const hub = createLinkHub();
    const seedNodes = kind === "legacy" ? translateLegacy(exp).nodes : loadState(exp).map((s) => new Node(s, hub));
    reconcileParentTargets(seedNodes);
    const sup = new Supervisor({ events: new EventBridge(), maxJournalLength: this.maxJournalLength });
    for (const n of seedNodes) sup.registerNode(n);
    const els = this.emitTree(seedNodes, sup);
    const kids = /* @__PURE__ */ new Map();
    for (const e of els) {
      if (e.parent) {
        const arr = kids.get(String(e.parent)) ?? [];
        arr.push(e);
        kids.set(String(e.parent), arr);
      }
    }
    return this.foldElements(els, kids);
  }
  /** Deterministic FNV-1a 64-bit hash (the upstream hash64 — path-fork-data.js). */
  hash64(str) {
    let h = 0xcbf29ce484222325n;
    for (let i = 0; i < str.length; i += 1) {
      h ^= BigInt(str.charCodeAt(i));
      h = h * 0x100000001b3n & 0xffffffffffffffffn;
    }
    return h.toString(16).padStart(16, "0");
  }
  // ---- internal teardown helpers -----------------------------------------
  tearDownGraph() {
    for (const n of this.supervisor.allNodes()) {
      if (n.destroyed || n.id === this.rootNode.id || !n.isInTree) continue;
      this.supervisor.apply({ kind: "destroy", node: n });
    }
    for (const p of this.payloads) dropPayload(p);
    this.payloads = [];
    this.prevStates.clear();
    this.render();
    this.rebuildIdIndex();
  }
  /** Reset the render baseline to a fresh graph (called on every load). The
   *  prevMaps are caller-owned per-tree state; reusing them across a graph
   *  reload collapses the emit (the adapter's diff keys no longer exist). The
   *  SSRFragmentAdapter also retains stale state across a reload, so it is
   *  recreated. Also reset bootstrapped so the next render runs the compile
   *  pass again.
   *
   *  Dropping the baseline also drops the removals the diff would have emitted
   *  for elements of the DISCARDED graph, so the mount is reconciled here first
   *  (§3a RED-5(ii)). */
  resetRenderState() {
    this.bootstrapped = false;
    this.domPrevMap = null;
    this.ssrPrevMap = null;
    this.ssr = new SSRFragmentAdapter();
    this.prevStates.clear();
    this.reconcileMount();
  }
  /** `§3a RED-5(ii)` — the load path reconciles the mount BEFORE the new tree
   *  is emitted: every direct child still carrying `data-node-id` (this
   *  runtime's opt-in `renderOptions`, above) belongs to a graph that has
   *  already been discarded and is detached here, so a re-derivation can never
   *  leave a previous root mounted ALONGSIDE the new one.
   *
   *  Why it is needed: `tearDownGraph()` empties the mount through the diff —
   *  but a runtime that was never bootstrapped has no baseline to diff against,
   *  so that pass runs the compile pass instead and MOUNTS the graph it is
   *  about to discard. The baseline is then dropped by `resetRenderState()`
   *  above, so the new render emits only creates and the stale root survives
   *  (measured: `{"childCount":2,"count":2,...}` on
   *  `new Runtime(...) → loadEnvelope(...)` with no bootstrap).
   *
   *  It cannot change the live boot path: `renderer.ts` bootstraps before any
   *  load, and on a bootstrapped runtime `tearDownGraph()`'s diff-emptying
   *  leaves the mount with no engine-emitted child, so there is nothing to
   *  detach. The `teardown()` path never calls this (the mount is empty and the
   *  root stays in the graph — `M-11`/`M-12`). A child with NO `data-node-id`
   *  is the caller's own sibling and is never touched. */
  reconcileMount() {
    const holder = this.mount;
    const kids = holder === null || holder === void 0 ? null : holder.children;
    if (kids === null || kids === void 0) return;
    for (const child of Array.from(kids)) {
      if (child === null || typeof child !== "object") continue;
      const element = child;
      if (typeof element.getAttribute !== "function" || typeof element.remove !== "function") continue;
      let nodeId;
      try {
        nodeId = element.getAttribute("data-node-id");
      } catch {
        continue;
      }
      if (typeof nodeId !== "string" || nodeId.length === 0) continue;
      try {
        element.remove();
      } catch {
      }
    }
  }
  // ---- code / data CRUD (mcp-endpoint.md §4 — envelope authoring) ---------
  /** Validate the path grammar (F3): each dot-segment must be a bare key or a
   *  well-formed `key[i]` index form. A trailing `]`, an unclosed `[`, a `]`
   *  before its `[`, an empty segment (`a..b`), or a leading/trailing dot is
   *  rejected BEFORE any read/write — otherwise a malformed segment is silently
   *  treated as a literal property name and corrupts the envelope. */
  assertValidPath(path) {
    if (typeof path !== "string" || path === "") throw new Error("code: path must be a non-empty string");
    if (path[0] === "." || path[path.length - 1] === ".") throw new Error(`code: malformed path '${path}'`);
    const segs = path.split(".");
    for (const seg of segs) {
      if (seg === "") throw new Error(`code: malformed path '${path}'`);
      const opens = (seg.match(/\[/g) ?? []).length;
      const closes = (seg.match(/\]/g) ?? []).length;
      if (opens !== closes) throw new Error(`code: malformed path '${path}'`);
      if (closes > 0) {
        const m = /^([^[\]]+)\[(\d+)\]$/.exec(seg);
        if (!m) throw new Error(`code: malformed path '${path}'`);
      }
    }
  }
  envelopeParent(path) {
    return this.envelopeParentIn(this.envelope, path);
  }
  /** B3 (loadbatch-review.md) — resolve a path against a GIVEN envelope (the
   *  batch clone), so a later op can reference a path created by an earlier op
   *  in the same batch. */
  envelopeParentIn(env, path) {
    this.assertValidPath(path);
    let cur = env;
    const segs = path.split(".");
    for (let i = 0; i < segs.length - 1; i += 1) {
      const seg = segs[i];
      if (cur == null || typeof cur !== "object") return null;
      cur = this.segment(cur, seg);
      if (cur === void 0) return null;
    }
    const last = segs[segs.length - 1];
    if (cur == null || typeof cur !== "object") return null;
    const m = /^([^[]+)\[(\d+)\]$/.exec(last);
    if (m) {
      const arr = cur[m[1]];
      if (!Array.isArray(arr)) return null;
      return { parent: arr, key: Number(m[2]) };
    }
    return { parent: cur, key: last };
  }
  /** Resolve a single path segment against an object: a bare key or a
   *  `key[i]` array-index form. Returns the resulting value (or undefined). */
  segment(obj, seg) {
    const m = /^([^[]+)\[(\d+)\]$/.exec(seg);
    if (!m) return obj[seg];
    const val = obj[m[1]];
    if (!Array.isArray(val)) return void 0;
    return val[Number(m[2])];
  }
  /** `provident.code.get` — read the envelope subtree/entry at `path` (raw
   *  JSON; no graph touch). */
  codeGet(path) {
    if (path === "" || path === ".") return { path, value: this.envelope };
    const loc = this.envelopeParent(path);
    if (!loc) throw new Error(`code.get: unresolved path '${path}'`);
    const value = loc.parent[loc.key];
    return { path, value };
  }
  /** `provident.code.set` — set the envelope value at `path`. */
  codeSet(path, value) {
    if (this.envelope === null) throw new Error("code.set: no envelope loaded (A1 doc loads have no legacy envelope)");
    const loc = this.envelopeParent(path);
    if (!loc) throw new Error(`code.set: unresolved path '${path}'`);
    loc.parent[loc.key] = value;
    return { ok: true, path, wrote: value };
  }
  /** `provident.code.create` — append a new entry to the ARRAY at `path`
   *  (e.g. push a hook name, a handler, a content node). The path resolves to
   *  an ARRAY. */
  codeCreate(path, entry) {
    if (this.envelope === null) throw new Error("code.create: no envelope loaded");
    const loc = this.envelopeParent(path);
    if (!loc) throw new Error(`code.create: unresolved path '${path}'`);
    const value = loc.parent[loc.key];
    if (!Array.isArray(value)) throw new Error(`code.create: '${path}' is not an array`);
    value.push(entry);
    return { ok: true, path, appendedAt: value.length - 1 };
  }
  /** `provident.code.delete` — delete an array element at `path`.
   *
   *  Two addressing forms (mutually exclusive — F2):
   *  1. `path` resolves to an ARRAY (e.g. `template.root.hooks`) + an `index`
   *     argument → splice that index.
   *  2. `path` resolves to a specific array element (e.g. `hooks[1]`, where the
   *     last segment is `[i]` and the resolved parent is the array) → splice
   *     that element; a provided `index` is ignored (the path already selected
   *     it — never double-splice).
   *
   * F1 — a path-index element is bounds-checked exactly like the `index`
   *   argument (an out-of-range/negative element index throws `/out of range/`,
   *   never a silent `{ok:true, removed:undefined}`).
   */
  codeDelete(path, index) {
    if (this.envelope === null) throw new Error("code.delete: no envelope loaded");
    const loc = this.envelopeParent(path);
    if (!loc) throw new Error(`code.delete: unresolved path '${path}'`);
    const parent = loc.parent;
    if (typeof loc.key === "number" && Array.isArray(parent)) {
      const k = loc.key;
      if (!Number.isInteger(k) || k < 0 || k >= parent.length) {
        throw new Error(`code.delete: '${path}' index ${k} out of range`);
      }
      const removed2 = parent.splice(k, 1)[0];
      return { ok: true, removed: removed2 };
    }
    const value = parent[loc.key];
    if (Array.isArray(value)) {
      if (index === void 0) throw new Error(`code.delete: '${path}' needs an index`);
      if (!Number.isInteger(index) || index < 0 || index >= value.length) {
        throw new Error(`code.delete: '${path}' index ${index} out of range`);
      }
      const removed2 = value.splice(index, 1)[0];
      return { ok: true, removed: removed2 };
    }
    if (typeof loc.key === "number" || Array.isArray(parent)) {
      throw new Error(`code.delete: '${path}' resolved to a non-array element; provide a valid index`);
    }
    const removed = value;
    delete parent[loc.key];
    return { ok: true, removed };
  }
  /** `provident.code.validate` — schema-validate an envelope WITHOUT building
   *  the graph (translate boundary checks; report TranslatedTree.warnings). */
  codeValidate(envelope) {
    const env = envelope ?? this.envelope;
    if (env === null || env === void 0) throw new Error("code.validate: no envelope to validate");
    try {
      const translated = translateLegacy(structuredClone(env));
      const warnings = translated.warnings ?? [];
      const bad = warnings.some((w) => w.code === "handler-body-eval-blocked" || w.code === "handler-body-invalid");
      return { valid: !bad, warnings, shape: `${translated.nodes.length} nodes / ${translated.content.length} content` };
    } catch {
      return { valid: false, warnings: [{ code: "envelope-mismatch" }], shape: "" };
    }
  }
  /** `provident.code.load` — apply an edited envelope to the LIVE graph (the
   *  A2 `load` path: teardown → translate → register → compile → render).
   *
   *  F7 — a structurally-invalid edited envelope (e.g. `children` set to a
   *  non-array) is REJECTED up front (P-C4: "a malformed edit is rejected with
   *  the framework's own codes, never applied silently") instead of silently
   *  loading a root-only graph. The offending code surfaces in the error. */
  codeLoad(envelope) {
    const env = envelope ?? this.envelope;
    if (!env) throw new Error("code.load: no envelope to load");
    const pre = this.codeValidate(env);
    const bad = pre.warnings.find((w) => w.code === "handler-body-eval-blocked" || w.code === "handler-body-invalid" || w.code === "children-shape-invalid" || w.code === "payload-shape-obsolete" || w.code === "node-shape-invalid" || w.code === "envelope-mismatch");
    if (bad) {
      throw new Error(`code.load: envelope invalid (${bad.code}); not applied`);
    }
    this.loadEnvelope(env);
    return {
      census: this.census(),
      renderedHtml: this.renderedHtml(),
      ssrHtml: this.ssrHtml(),
      warnings: this.warnings
    };
  }
  /** `provident.code.loadBatch` (loadbatch-review.md B1-B8) — stage N `code.*`
   *  envelope ops and perform ONE re-derive.
   *
   *  B2 (all-or-nothing): the ops apply to a `structuredClone` of the envelope;
   *  on ANY op failure the clone is discarded and the live `this.envelope` is
   *  UNTOUCHED (no half-applied state). Only on full success is the clone
   *  committed + re-derived once.
   *  B3 (ordering with dependencies): ops apply SEQUENTIALLY to the clone, so a
   *  later op can reference a path created by an earlier op.
   *  B4 (schema): a malformed op (unknown kind / bad shape) is rejected.
   *  B5 (return): the re-derive `LoadResult` + a per-op status array.
   *  B7 (no-envelope): throws "no envelope loaded" when `this.envelope` is null
   *  (A1 doc loads). */
  codeLoadBatch(ops) {
    if (this.envelope === null) throw new Error("code.loadBatch: no envelope loaded (A1 doc loads have no legacy envelope)");
    if (!Array.isArray(ops)) throw new Error("code.loadBatch: ops must be an array");
    const clone = structuredClone(this.envelope);
    const applied = [];
    for (const op of ops) {
      if (op === null || typeof op !== "object") throw new Error(`code.loadBatch: malformed op (${String(op)})`);
      const kind = op.op;
      if (kind === "set") {
        const loc = this.envelopeParentIn(clone, op.path);
        if (!loc) throw new Error(`code.loadBatch: unresolved path '${op.path}'`);
        loc.parent[loc.key] = op.value;
      } else if (kind === "create") {
        const loc = this.envelopeParentIn(clone, op.path);
        if (!loc) throw new Error(`code.loadBatch: unresolved path '${op.path}'`);
        const value = loc.parent[loc.key];
        if (!Array.isArray(value)) throw new Error(`code.loadBatch: '${op.path}' is not an array`);
        value.push(op.entry);
      } else if (kind === "delete") {
        const loc = this.envelopeParentIn(clone, op.path);
        if (!loc) throw new Error(`code.loadBatch: unresolved path '${op.path}'`);
        const parent = loc.parent;
        if (typeof loc.key === "number" && Array.isArray(parent)) {
          const k = loc.key;
          if (!Number.isInteger(k) || k < 0 || k >= parent.length) {
            throw new Error(`code.loadBatch: '${op.path}' index ${k} out of range`);
          }
          ;
          parent.splice(k, 1);
        } else {
          const value = parent[loc.key];
          if (Array.isArray(value)) {
            if (op.index === void 0) throw new Error(`code.loadBatch: '${op.path}' needs an index`);
            if (!Number.isInteger(op.index) || op.index < 0 || op.index >= value.length) {
              throw new Error(`code.loadBatch: '${op.path}' index ${op.index} out of range`);
            }
            ;
            value.splice(op.index, 1);
          } else {
            delete parent[loc.key];
          }
        }
      } else {
        throw new Error(`code.loadBatch: unknown op '${String(kind)}'`);
      }
      applied.push({ op: kind, path: op.path, status: "applied" });
    }
    this.envelope = clone;
    const result = this.codeLoad(clone);
    return { ...result, ops: applied };
  }
  // ---- MCP-facing operations ---------------------------------------------
  async dispatch(req) {
    const nodeId = this.resolveTarget(req.target);
    if (nodeId === null) {
      throw new Error(`unresolved target: ${JSON.stringify(req.target)}`);
    }
    const report = await this.supervisor.dispatchAndReport(
      nodeId,
      req.event,
      req.requestId !== void 0 ? { requestId: req.requestId } : {},
      ...req.args ?? []
    );
    for (const id of report.dirtied) {
      const resolved = this.supervisor.getResolvedStates(id);
      if (resolved.length > 0) this.prevStates.set(id, resolved);
    }
    this.render();
    return {
      results: report.results.map((r) => r instanceof Error ? { error: { message: r.message, name: r.name } } : r),
      dirtied: report.dirtied,
      renderedHtml: this.renderedHtml(),
      ssrHtml: this.ssrHtml()
    };
  }
  renderedHtmlResult() {
    return {
      renderedHtml: this.renderedHtml(),
      ssrHtml: this.ssrHtml(),
      census: this.census()
    };
  }
  /** 0.2 Feature 2 — the MCP `provident.get_markdown` result: the markdown
   *  text + the census snapshot. */
  markdownResult() {
    return { markdown: this.markdown(), census: this.census() };
  }
  renderedHtml() {
    const html = this.mount.innerHTML;
    return this.transformRouter ? this.transformRouter.applyTransforms(html) : html;
  }
  ssrHtml() {
    const html = this.ssr.toString();
    return this.transformRouter ? this.transformRouter.applyTransforms(html) : html;
  }
  /** 0.2 Feature 2 — the MarkdownAdapter endpoint (`provident.get_markdown`):
   *  re-emit the CURRENT graph through a fresh MarkdownAdapter (the simplified
   *  text-only output document for agentic consumers). The adapter is a pure
   *  op-stream consumer (D15) — it renders the same actionable set the DOM/SSR
   *  views use, but emits markdown text (non-interactive: on:* and data:*
   *  props are dropped, D7). A fresh adapter per call (D10 — instance-bound
   *  prevMap; never reuse a stale one). */
  markdown() {
    const actionable = [];
    for (const states of this.prevStates.values()) actionable.push(...states);
    const byNode = new Map(this.supervisor.allNodes().map((n) => [n.id, n]));
    const md = new MarkdownAdapter();
    renderProducingProcess(actionable, byNode, md, null, this.renderOptions);
    const out = md.toString();
    return this.transformRouter ? this.transformRouter.applyTransforms(out) : out;
  }
  listTargets() {
    const nodes = [];
    for (const n of this.supervisor.allNodes()) {
      if (n.destroyed || !n.isInTree) continue;
      const cssId = n.css?.id;
      const propsId = n.props?.id;
      nodes.push({
        nodeId: n.id,
        ...cssId !== void 0 ? { cssId } : {},
        ...propsId !== void 0 ? { propsId } : {},
        type: n.type,
        content: n.content,
        state: n.state,
        inTree: !!n.isInTree,
        handlers: n.handlers?.map((h) => ({
          ...h.name !== void 0 ? { name: h.name } : {},
          ...h.event !== void 0 ? { event: h.event } : {},
          ...h.phase !== void 0 ? { phase: h.phase } : {}
        })) ?? []
      });
    }
    return { nodes };
  }
  nodeState(target) {
    const nodeId = this.resolveTarget(target);
    if (nodeId === null) throw new Error(`unresolved target: ${JSON.stringify(target)}`);
    const states = this.supervisor.getResolvedStates(nodeId);
    const projected = states.map((s) => this.projectedState(s));
    return { nodeId, states: projected, census: this.census() };
  }
  /** Build a JSON-safe compiled-state mirror: every scalar/binding field is
   *  carried verbatim; the `anchors` array is projected to plain data (a live
   *  Node anchor resolves to its id + value, never the circular Node/Link
   *  refs the engine keeps). */
  projectedState(s) {
    const anchors = (s.anchors ?? []).map((a) => {
      const targetNode = a.target?.isNode ? a.target.id : typeof a.target === "string" ? a.target : String(a.target ?? "");
      return {
        role: a.role,
        target: targetNode,
        ...a.value !== void 0 ? { value: this.sortVal(a.value) } : {}
      };
    });
    return {
      nodeId: s.nodeId,
      ...s.pathKey !== void 0 ? { pathKey: s.pathKey } : {},
      state: s.state,
      type: s.type,
      props: s.props,
      css: s.css,
      content: s.content,
      anchors,
      parent: s.parent,
      children: s.children,
      bindings: s.bindings,
      unresolved: s.unresolved,
      ...s.trace !== void 0 ? { trace: s.trace } : {}
    };
  }
  census() {
    const all = this.supervisor.allNodes();
    return {
      registered: all.length,
      inTree: all.filter((n) => !n.destroyed && n.isInTree).length,
      unplaced: all.filter((n) => !n.destroyed && n.state === "unplaced").length,
      destroyed: all.filter((n) => n.destroyed).length,
      prototypes: all.filter((n) => n.state === "prototype").length
    };
  }
};

// src/shared/demo-envelope.ts
var INC_BODY = `function (ctx) {
  const all = ctx.tree.allNodes();
  const node = all.find(function (n) { return n && n.props && n.props.id === 'counter'; });
  if (!node) return;
  const cur = Number(node.content ?? 0);
  ctx.clientAPI.apply(node.id, [{ targetProp: 'content', mode: 'replace', value: String(cur + 1) }]);
}`;
var DEC_BODY = `function (ctx) {
  const all = ctx.tree.allNodes();
  const node = all.find(function (n) { return n && n.props && n.props.id === 'counter'; });
  if (!node) return;
  const cur = Number(node.content ?? 0);
  ctx.clientAPI.apply(node.id, [{ targetProp: 'content', mode: 'replace', value: String(cur - 1) }]);
}`;
var RESET_BODY = `function (ctx) {
  const all = ctx.tree.allNodes();
  const node = all.find(function (n) { return n && n.props && n.props.id === 'counter'; });
  if (!node) return;
  ctx.clientAPI.apply(node.id, [{ targetProp: 'content', mode: 'replace', value: '0' }]);
}`;
var GUTTER_DRAG_BODY = `function (ctx) {
  void ctx;
}`;
var THEME_INITIAL_TOKEN = "dark";
var ECHO_BODY = `function (ctx, value) {
  const all = ctx.tree.allNodes();
  const node = all.find(function (n) { return n && n.props && n.props.id === 'echo-out'; });
  if (!node) return;
  const t = value == null ? '' : String(value);
  ctx.clientAPI.apply(node.id, [{ targetProp: 'content', mode: 'replace', value: t }]);
}`;
var GUTTER_CURSORS = { "gutter-vertical": "col-resize", "gutter-horizontal": "row-resize" };
var GUTTER_MOVE_TYPE = void 0;
var GUTTER_STATUS_ID = "gutter-status";
var GUTTER_AFFORDANCE_ID = "gutter-vertical";
var GUTTER_TARGET_ID = "gutter-target";
function gutterSeamExample() {
  const attributeOf = (element, key) => {
    if (element === null || element === void 0 || typeof element !== "object") return null;
    try {
      const read = element["getAttribute"];
      if (typeof read === "function") {
        const carried = read.call(element, key);
        if (typeof carried === "string" && carried.length > 0) return carried;
      }
    } catch {
    }
    const holder = element;
    const raw = holder?.dataset?.[key];
    return typeof raw === "string" && raw.length > 0 ? raw : null;
  };
  const axisOf = (element) => {
    const authored = attributeOf(element, "axis");
    return authored !== null ? authored : GUTTER_AFFORDANCE_ID;
  };
  const numberFrom = (element, key, fallback) => {
    const raw = attributeOf(element, key);
    const parsed = raw === null ? Number.NaN : Number(raw);
    return Number.isFinite(parsed) ? parsed : fallback;
  };
  const paneOf = (element) => element?.parentElement;
  return {
    /** THE SIZE the drag asks for: the pointer's own coordinate minus the pre-drag size, which
     *  is the mapping the demo's authored pane declares. `start` is whatever the gesture's own
     *  pre-drag read answered, so the `typeof` gate mirrors the family's one coordinate rule. */
    sizeFromPointer: (pointer, start) => typeof pointer?.x === "number" ? pointer.x - start : Number.NaN,
    axisOf,
    /** THE CURSOR the axis token maps to — a VALUE in this DATA file, never in the module. */
    cursorOf: (token) => ({ cursor: GUTTER_CURSORS[String(token)] }),
    /** THE VISIBLE PREVIEW: the concrete form is the WIRING's (`src/renderer/renderer.ts` — a
     *  transient inline-style write on the live provident-rendered TARGET element, `§2.5` item 4),
     *  so this example carries no presentation write of its own and hands the state straight on. */
    applyPreview: (_state) => void 0,
    /** THE CURSOR: the handle's own declaration is written through its style member. */
    applyCursor: (element, declaration) => {
      const holder = element;
      if (holder === null || holder === void 0 || holder.style === null || holder.style === void 0) return;
      holder.style["cursor"] = declaration === void 0 ? "" : declaration;
    },
    /** THE PRE-DRAG SIZE: the pane's authored starting size, read from the attribute the runtime
     *  emits for `props.size`. */
    startSizeOf: (element) => numberFrom(paneOf(element), "size", 100),
    /** THE BOUNDS PAIR: the pane's authored minimum and maximum, read the same way. */
    boundsOf: (element) => {
      const pane = paneOf(element);
      return { min: numberFrom(pane, "min", 0), max: numberFrom(pane, "max", 200) };
    },
    /** THE RESIZABILITY: the authored pane declares it (`props.resizable` → the bare
     *  `resizable` attribute); an ABSENT attribute is the demo's own "no veto" reading. */
    resizableOf: (element) => attributeOf(paneOf(element), "resizable") !== "false",
    /** **THE POINTER RESOLVER — THE EXAMPLE'S OWN READS OF THE FORWARDED EVENT** (`§2.1`'s
     *  `pointerOf` cell, `§2.4` item 1/2, `§3.1 M-12): the wiring's source forwards the DOM event
     *  as the handler's first argument, so the example obtains the pair from it through the SAME
     *  `typeof` + `Number.isFinite` gate the affordance's own resolver uses. Returning `null` here
     *  (the as-filed form) made every live move INVALID by rule (`§2.3` item 5 clause (i), the
     *  reset arm) and the authored card could drive nothing — L-4/ADV-GU-7. A non-object, an
     *  absent or non-number member and a throwing accessor all answer `null`, so a caller's
     *  miswiring is still the DECLARED degradation and never a throw. */
    pointerOf: (event) => {
      if (event === null || event === void 0 || typeof event !== "object") return null;
      let x;
      let y;
      try {
        const holder = event;
        x = holder["clientX"];
        y = holder["clientY"];
      } catch {
        return null;
      }
      if (typeof x !== "number" || typeof y !== "number") return null;
      if (!Number.isFinite(x) || !Number.isFinite(y)) return null;
      return Object.freeze({ x, y });
    },
    /** THE OPTIONAL MOVE TYPE: `undefined`, so the affordance module registers ITS OWN fallback —
     *  the session's exported token it already value-imports (`POINTER_TYPES.move`). */
    moveTypeOf: () => GUTTER_MOVE_TYPE
  };
}
function demoEnvelope() {
  const handleStyle = { cursor: "col-resize", width: "200px" };
  const paneStyle = { display: "flex", "align-items": "stretch" };
  const targetStyle = { width: "100px", "min-height": "28px" };
  return {
    template: {
      root: {
        type: "div",
        css: { classes: ["demo-shell"] },
        children: [
          { type: "h1", content: "Provident-Electron \u2014 MCP endpoint demo" },
          // ---- counter card ------------------------------------------------
          {
            type: "section",
            css: { id: "counter-card", classes: ["card"] },
            children: [
              { type: "h2", content: "Counter" },
              {
                type: "div",
                css: { id: "counter", classes: ["counter-value"] },
                props: { id: "counter" },
                content: "0"
              },
              {
                type: "button",
                css: { id: "inc", classes: ["btn"] },
                content: "Increment (+1)",
                handlers: [{ name: "inc", event: "click", body: INC_BODY }]
              },
              {
                type: "button",
                css: { id: "dec", classes: ["btn"] },
                content: "Decrement (-1)",
                handlers: [{ name: "dec", event: "click", body: DEC_BODY }]
              },
              {
                type: "button",
                css: { id: "reset", classes: ["btn"] },
                content: "Reset",
                handlers: [{ name: "reset", event: "click", body: RESET_BODY }]
              }
            ]
          },
          // ---- gutter card (U-GUTTER-UI) ----------------------------------
          // The affordance / target / status triple, authored as DATA: the handle the pointer is
          // over (its own `pointerdown` handler keeps it `list_targets`-visible), the pane it
          // resizes, and the read-out the wiring's ONE `state-slice` write patches.
          {
            type: "section",
            css: { id: "gutter-card", classes: ["card"] },
            children: [
              { type: "h2", content: "Gutter (drag to resize)" },
              {
                type: "div",
                css: { id: "gutter-pane", classes: ["gutter-pane"], style: paneStyle },
                props: { id: "gutter-pane", size: "100", min: "0", max: "200", resizable: "true" },
                children: [
                  {
                    // (a) THE AFFORDANCE — `§2.1` item 7(a): an authored `css.id`, an authored
                    // `css.classes` list, an authored `css.style` carrying THE BASE `cursor`
                    // DECLARATION **AND NO GEOMETRY CLAIM**, an authored `props.id`, and the
                    // authored `pointerdown` handler. L-3's live finding was exactly this missing
                    // declaration: the element rendered `<div … class="gutter-handle"
                    // data-node-id="node-12">` with NO `cursor` and no `style` attribute at all,
                    // so `U-2`(a) could not be satisfied by any shipped instrument. The declared
                    // degradation the module carries (no pointer CAPTURE) means a drag that leaves
                    // the handle's own box loses its reading (`§2.6` item 4) — which is why the
                    // handle's box must be a real, pressable strip: it STRETCHES to the row's own
                    // height through the pane's authored flex declarations, and its own base size
                    // declaration gives the strip its WIDTH. Measured live (L-2): without a width
                    // the handle's rendered box was `w=0, h=44` — an empty `div` whose width comes
                    // from its (empty) content — so hit-testing could not land on it at all and a
                    // real CDP press at its centre produced ZERO effect. The TARGET's own base size
                    // (item 7(b) below) is the pane the drag resizes and the node the preview
                    // writes; the handle's is the pointer's landing strip, and it has to be WIDE
                    // enough to hold a drag: this composition installs NO pointer capture (`§2.6`
                    // item 4 — the capture opt-in is an `E3`-SIDE owed item), so the session's
                    // tracking listeners are LOCAL to the element and a drag that leaves the
                    // handle's box loses its reading (the spec's own honest UX consequence).
                    type: "div",
                    css: { id: GUTTER_AFFORDANCE_ID, classes: ["gutter-handle"], style: handleStyle },
                    props: { id: GUTTER_AFFORDANCE_ID, axis: GUTTER_AFFORDANCE_ID },
                    content: "",
                    handlers: [{ name: "gutter-drag", event: "pointerdown", body: GUTTER_DRAG_BODY }]
                  },
                  {
                    // (b) THE TARGET — `§2.1` item 7(b): an authored `css.id`, an authored
                    // `css.style` carrying a BASE SIZE DECLARATIVE, and an authored `props.id`. The
                    // authored `props` below are the DRAG'S OWN DATA (`size` = the pre-drag size,
                    // `min`/`max` = the bounds pair, `resizable` = the decision) and the runtime
                    // emits them as BARE ATTRIBUTES on the element — which is what the demo seams
                    // read (L-6/ADV-GU-7: they used to read `dataset[...]` and every read missed).
                    type: "div",
                    css: { id: GUTTER_TARGET_ID, classes: ["gutter-target"], style: targetStyle },
                    props: { id: GUTTER_TARGET_ID },
                    content: "resizable pane"
                  }
                ]
              },
              {
                type: "div",
                css: { id: GUTTER_STATUS_ID, classes: ["gutter-status"] },
                props: { id: GUTTER_STATUS_ID },
                content: "100"
              }
            ]
          },
          // ---- echo card ---------------------------------------------------
          {
            type: "section",
            css: { id: "echo-card", classes: ["card"] },
            children: [
              { type: "h2", content: "Echo (input -> echo-out)" },
              {
                type: "input",
                css: { id: "echo-input" },
                props: { id: "echo-input" },
                handlers: [{ name: "echo", event: "input", body: ECHO_BODY }]
              },
              {
                type: "div",
                css: { id: "echo-out", classes: ["echo-out"] },
                props: { id: "echo-out" },
                content: "(nothing yet)"
              }
            ]
          },
          // ---- theme card (U-THEME-CONTROL, docs/specs/theme-control.md §2.1) -------------------
          // 'theme-card' — THE AUTHORED APPEARANCE CONTROL, and it is FIVE nodes: this section,
          // its heading, the two setting-token buttons and the state node whose `content` carries
          // the setting. THE TOKEN BLOCK IS CLOSED AT TWO and it is DEMO DATA: the repo asserts
          // nothing about what either member MEANS, the authored handler CARRIES the caller's token
          // and interprets nothing, the state node is the ONE graph-readable carrier, NO attribute
          // is written, and no unit may generalise this card into a shipped appearance UI (§1
          // item 7). Each button's handler carries its OWN authored block member; the value it
          // WRITES is the CALLER's (`provident.dispatch theme-dark click` with the token as its
          // argument), which is why the body declares its member and substitutes no default.
          {
            type: "section",
            css: { id: "theme-card", classes: ["card"] },
            children: [
              { type: "h2", content: "Appearance (demo)" },
              {
                type: "button",
                css: { id: "theme-dark", classes: ["btn"] },
                content: "Dark",
                handlers: [
                  {
                    name: "theme-set",
                    event: "click",
                    body: `function (ctx, value) {
  const authoredToken = 'dark';
  void authoredToken;
  const all = ctx.tree.allNodes();
  const node = all.find(function (n) { return n && n.props && n.props.id === 'theme-setting'; });
  if (!node) return;
  let carried = '';
  try { carried = value == null ? '' : String(value); } catch (ignored) { return; }
  try { ctx.clientAPI.apply(node.id, [{ targetProp: 'content', mode: 'replace', value: carried }]); } catch (e) { void e; }
}`
                  }
                ]
              },
              {
                type: "button",
                css: { id: "theme-light", classes: ["btn"] },
                content: "Light",
                handlers: [
                  {
                    name: "theme-set",
                    event: "click",
                    body: `function (ctx, value) {
  const authoredToken = 'light';
  void authoredToken;
  const all = ctx.tree.allNodes();
  const node = all.find(function (n) { return n && n.props && n.props.id === 'theme-setting'; });
  if (!node) return;
  let carried = '';
  try { carried = value == null ? '' : String(value); } catch (ignored) { return; }
  try { ctx.clientAPI.apply(node.id, [{ targetProp: 'content', mode: 'replace', value: carried }]); } catch (e) { void e; }
}`
                  }
                ]
              },
              {
                type: "div",
                css: { id: "theme-setting", classes: ["theme-setting"] },
                props: { id: "theme-setting" },
                content: THEME_INITIAL_TOKEN
              }
            ]
          }
        ]
      }
    },
    content: [],
    clientConfig: { runInstantiation: true, runRendering: true }
  };
}

// src/renderer/secure-panels.ts
var GROUPS = ["read", "dispatch", "graph", "code", "module"];
var GROUP_LABELS = {
  read: "read (get_rendered_html, get_markdown, list_targets, get_node_state, code.get, code.validate)",
  dispatch: "dispatch (synthetic event driving)",
  graph: "graph (load, op, export, validate, teardown)",
  code: "code (code.set/create/delete/load \u2014 evaluates handler bodies)",
  module: "module (module.install/update/list + module:<name>.<tool> extensions \u2014 trusted-equivalent to code)"
};
function paneMutationValid(mutation) {
  if (!Array.isArray(mutation)) return false;
  for (const m of mutation) {
    if (m === null || typeof m !== "object") return false;
    const target = m.targetProp;
    if (typeof target !== "string") return false;
  }
  return true;
}
var TOKEN_GEN_BODY = `function (ctx) {
  var s = window && window.provident && window.provident.security;
  if (!s) return;
  s.set({ token: String(Math.random().toString(36).slice(2, 34)) });
}`;
var TOKEN_CLEAR_BODY = `function (ctx) {
  var s = window && window.provident && window.provident.security;
  if (!s) return;
  s.set({ token: null });
}`;
var TOGGLE_BODY = `function (ctx) {
  var s = window && window.provident && window.provident.security;
  if (!s) return;
  var group = ctx.node.props && ctx.node.props['data-group'];
  if (!group) return;
  var on = ctx.node.props && ctx.node.props['data-on'] === 'true';
  if (on) s.set({ disable: [group] }); else s.set({ groups: [group] });
}`;
var JOURNAL_LENGTH_BODY = `function (ctx) {
  var s = window && window.provident && window.provident.security;
  if (!s) return;
  var val = ctx.node && ctx.node.props && ctx.node.props['value'];
  var num = val ? parseInt(val, 10) : NaN;
  if (isNaN(num) || num <= 0) s.set({ maxJournalLength: null });
  else s.set({ maxJournalLength: num });
}`;
function paneEnvelope() {
  const toggles = GROUPS.map((g) => ({
    type: "label",
    props: { id: `toggle:${g}`, "data-group": g, "data-on": "false" },
    css: { classes: ["group-row"] },
    content: GROUP_LABELS[g],
    handlers: [{ name: `toggle-${g}`, event: "click", body: TOGGLE_BODY }]
  }));
  return {
    template: {
      root: {
        type: "div",
        props: { id: "secure-panes" },
        children: [
          // ---- Security Settings pane -----------------------------------
          {
            type: "section",
            props: { id: "settings-pane" },
            css: { classes: ["card"] },
            children: [
              { type: "h2", content: "Security & agent permissions" },
              { type: "p", css: { classes: ["hint"] }, content: "Manual-UI only \u2014 never exposed over MCP (an agent cannot grant itself capabilities)." },
              { type: "div", props: { id: "security-status" }, content: "loading\u2026" },
              {
                type: "div",
                props: { id: "security-token" },
                children: [
                  { type: "label", content: "Loopback token" },
                  {
                    type: "div",
                    css: { classes: ["token-row"] },
                    children: [
                      { type: "input", props: { id: "token-input", placeholder: "(none)", readonly: true } },
                      { type: "button", props: { id: "token-clear" }, css: { classes: ["btn"] }, content: "Clear", handlers: [{ name: "token-clear", event: "click", body: TOKEN_CLEAR_BODY }] },
                      { type: "button", props: { id: "token-gen" }, css: { classes: ["btn"] }, content: "Regenerate", handlers: [{ name: "token-gen", event: "click", body: TOKEN_GEN_BODY }] }
                    ]
                  }
                ]
              },
              { type: "div", props: { id: "group-toggles" }, children: toggles },
              {
                type: "div",
                props: { id: "journal-length" },
                css: { classes: ["group-row"] },
                children: [
                  { type: "label", content: "Max journal entries" },
                  {
                    type: "div",
                    css: { classes: ["token-row"] },
                    children: [
                      { type: "input", props: { id: "journal-length-input", placeholder: "(never condense)", type: "number", min: "1" } },
                      { type: "button", props: { id: "journal-length-apply" }, css: { classes: ["btn"] }, content: "Apply", handlers: [{ name: "journal-length-apply", event: "click", body: JOURNAL_LENGTH_BODY }] }
                    ]
                  }
                ]
              }
            ]
          },
          // ---- Debug / agent-visibility pane -----------------------------
          {
            type: "section",
            props: { id: "debug-pane" },
            css: { classes: ["card"] },
            children: [
              { type: "h2", content: "Debug / agent visibility" },
              { type: "div", props: { id: "status" }, content: "booting\u2026" }
            ]
          },
          // ---- Module management pane (U8) --------------------------------
          {
            type: "section",
            props: { id: "module-pane" },
            css: { classes: ["card"] },
            children: [
              { type: "h2", content: "Modules / extensions" },
              { type: "p", css: { classes: ["hint"] }, content: "Manual-UI only \u2014 installed modules + versions + quarantine status." },
              { type: "div", props: { id: "module-status" }, content: "loading\u2026" },
              { type: "div", props: { id: "module-list" }, content: "" }
            ]
          }
        ]
      }
    },
    content: [],
    clientConfig: { runInstantiation: true, runRendering: true }
  };
}
var PREVIEW_MAX = 120;
var SecurePanels = class {
  scope;
  supervisor;
  adapter;
  mount;
  root;
  nodes;
  prevMap = null;
  cfg = { token: null, enabled: ["read", "dispatch"] };
  debugValue = "booting\u2026";
  moduleStatus = "loading\u2026";
  moduleListText = "";
  /** G3 §2.5 (gate-4 finding 2, 2026-10-03) — the pane journal's declared cap:
   *  the tier-4 `maxJournalLength` value passed at construction (IDENTITY with
   *  the operator's setting; `undefined` = never condense). The engine receives
   *  it too (`new Supervisor({…, maxJournalLength})` below) so its deferred
   *  condense triggers, but the CAP IS ENFORCED HERE over the raw journal
   *  entries (`applyJournalCap()`) — the engine's own round-trip condense is
   *  defeated on this pane (§2.5 items 1/2/4's measured evidence). */
  maxJournalLength;
  /** Test/visibility accessor — the current Debug pane text (census + SSR
   *  preview). */
  debugText() {
    return this.debugValue;
  }
  constructor(mount, opts) {
    this.mount = mount;
    this.maxJournalLength = opts?.maxJournalLength;
    this.scope = createIsolatedScope();
    const hub = createLinkHub();
    const t = translateLegacy(paneEnvelope(), { hub, graphScope: this.scope });
    this.supervisor = new Supervisor({ events: new EventBridge(), graphScope: this.scope, maxJournalLength: opts?.maxJournalLength });
    for (const n of t.nodes) this.supervisor.registerNode(n);
    this.adapter = new DomAdapter(mount, { onEvent: this.handleDomEvent });
    this.root = t.root;
    this.nodes = t.nodes;
  }
  /** THE DECLARED TEST SEAM (G3 §2.5 item 4 — the plan's `D-8` carry: "the seam
   *  is the unit's to declare"): a read-only accessor over the pane supervisor's
   *  journal depth (the engine's read-only `undoDepth` accessor, `J1`'s FIXED
   *  surface at provident-ssr@^0.5.1). TEST-ONLY, with the production-negative
   *  row of `R C-8`'s seam discipline — no production code path calls it; it is
   *  NOT exposed on the bridge, NOT an MCP surface and NOT a pane node handler,
   *  and the pane graph it reads is the isolated scope the MCP endpoints cannot
   *  reach (§2.5 item 4). */
  journalDepth() {
    return this.supervisor.undoDepth;
  }
  /** Wire a real DOM interaction on a pane control to the pane graph's
   *  synthetic dispatch (mirrors the app Runtime's onEvent path). */
  handleDomEvent = (wire, domEvent) => {
    const node = this.supervisor.getNode(wire);
    if (!node) return;
    const eventName = domEvent?.type ?? String(domEvent ?? "");
    const extra = domEvent?.target && "value" in domEvent.target ? [String(domEvent.target.value)] : [];
    this.supervisor.dispatchEvent(node.id, eventName, ...extra);
    void this.supervisor.flush().then(() => {
      this.render();
      void this.refresh();
    });
  };
  /** The test seam: dispatch a synthetic click on a pane control by its
   *  authored props.id, in the PANE graph (never the app graph). */
  async dispatch(id) {
    const node = this.supervisor.allNodes().find((n) => n.props?.id === id);
    if (!node) throw new Error(`secure-panels: unresolved pane id '${id}'`);
    this.supervisor.dispatchEvent(node.id, "click");
    await this.supervisor.flush();
    this.render();
    await this.refresh();
  }
  /** U-ENGINE-PIN §2.4a (ruling 2) — the ONE test-only injection point the
   *  amendment authorises, so the pane-managed channel's predicate is
   *  REACHABLE and its behaviour assertable (before it, `syncConfig` is private
   *  and both shipped writes are defined strings, so no test could drive the
   *  channel — the adversarial pass's false-green finding `H-02`).
   *
   *  Contract, exactly as §2.4b pins it (amendment block 7 — the amended
   *  return shape; §5.1 item 5's diff scope is this method + the predicate):
   *   - runs `paneMutationValid(mutation)` first;
   *   - **`applied` means "the ENGINE applied it": `applied ===
   *     (status === 'applied')`; a refusal is never reported as applied.** The
   *     `status` field stays the ENGINE's own verdict where the engine was
   *     reached (`'applied'`, its `rejected`, or its other verdict); the
   *     predicate's own refusal contributes the one literal `'rejected'`;
   *   - the THREE reachable outcomes (§2.4b item 1), and no fourth:
   *     (i) **shape-refused** — the predicate refuses (a non-array batch, a
   *     non-object element, a missing/non-string `targetProp`) ⇒
   *     `{ status: 'rejected', applied: false }`, nothing applied, nothing
   *     re-rendered (the node keeps its prior state and its last-known render),
   *     **NEVER a throw**;
   *     (ii) **engine-applied** ⇒ `{ status: 'applied', applied: true }`;
   *     (iii) **engine-refused** — the predicate passed and the engine did not
   *     apply it (an unknown / foreign `nodeId` ⇒ `getNode` `undefined` ⇒ the
   *     engine's own `unknown-node` rejection) ⇒
   *     `{ status: <the engine's verdict>, applied: false }`. `applied: false`
   *     is therefore NOT a synonym for "the predicate refused": the public
   *     `{status}` alone carries no predicate-vs-engine discriminator (use a
   *     shape-malformed input to attribute a refusal to the predicate);
   *   - on a predicate pass it calls `this.supervisor.apply({kind:'state-slice',
   *     node, mutation})` on the ISOLATED pane graph and re-renders. A nullish
   *     value is a legitimate removal and PASSES THROUGH (ruling 1); the shim
   *     completion makes the engine's `removeAttribute` path safe;
   *   - the first parameter is the ENGINE `nodeId` of a node in the PANE graph
   *     (§2.4b item 4) — an authored `props.id` is an unresolved id (outcome
   *     (iii)), and no public pane-side accessor converts one into the other.
   *
   *  It adds no shim member, no DOM capability and no browser emulation (it is
   *  not `H-r7` shim expansion), no vocabulary, no content, no default, no
   *  store and no MCP/IPC surface: the node id and the mutation are the
   *  caller's. `syncConfig`'s own call site and its shipped writes are
   *  unchanged. */
  applyPaneMutation(nodeId, mutation) {
    if (!paneMutationValid(mutation)) return { status: "rejected", applied: false };
    const node = this.supervisor.getNode(nodeId);
    const result = this.supervisor.apply({ kind: "state-slice", node, mutation });
    this.applyJournalCap();
    this.render();
    const status = typeof result?.status === "string" ? result.status : "unknown";
    return { status, applied: status === "applied" };
  }
  /** The Debug pane's live agent-visibility line: set from the APP runtime's
   *  census + SSR preview. Written into the pane graph's `#status` node (its
   *  own isolated graph — never the app graph). */
  refreshDebug(runtime) {
    const { census, ssrHtml } = runtime.renderedHtmlResult();
    const c = (v) => typeof v === "number" && Number.isFinite(v) ? v : "?";
    const censusLine = `inTree ${c(census.inTree)} \xB7 registered ${c(census.registered)} \xB7 unplaced ${c(census.unplaced)} \xB7 destroyed ${c(census.destroyed)} \xB7 prototypes ${c(census.prototypes)}`;
    const raw = typeof ssrHtml === "string" ? ssrHtml : "";
    const collapsed = raw.replace(/\s+/g, " ").trim();
    const preview = collapsed.length === 0 ? "(empty)" : collapsed.length > PREVIEW_MAX ? collapsed.slice(0, PREVIEW_MAX) + "\u2026" : collapsed;
    this.debugValue = `${censusLine}
${preview}`;
    this.syncConfig();
    this.render();
  }
  /** Re-fetch the security config over IPC, merge it into the pane graph nodes,
   *  and re-render. Async (the bridge is async). */
  async refresh() {
    const security = typeof window !== "undefined" && window.provident?.security;
    if (security) {
      try {
        this.cfg = await security.get();
      } catch {
      }
    }
    const moduleBridge = typeof window !== "undefined" && window.provident?.module;
    if (moduleBridge) {
      try {
        const res = await moduleBridge.get();
        this.moduleStatus = `corrupt: ${res.corrupt} \xB7 quarantined: [${res.quarantined.join(", ")}] \xB7 loaded: [${res.loaded.join(", ")}]`;
        this.moduleListText = res.modules.map((m) => `${m.disabled ? "\u2610" : "\u2611"} ${m.name}@${m.version}${m.quarantined ? " (quarantined)" : ""}`).join("\n");
      } catch {
      }
    }
    this.syncConfig();
    this.render();
  }
  /** Write the current cfg into the pane graph nodes (token status, enabled
   *  groups, per-group toggle on/off) through the MANAGED CHANNEL (state-slice
   *  content + props writes), then the render reflects it. Never mutates a
   *  Node's derived fields directly. */
  syncConfig() {
    for (const n of this.supervisor.allNodes()) {
      const id = n.props?.id;
      const mutation = [];
      if (id === "security-status") {
        const jl = this.cfg.maxJournalLength !== void 0 ? ` \xB7 journal: \u2264${this.cfg.maxJournalLength}` : " \xB7 journal: \u221E";
        mutation.push({ targetProp: "content", value: `token: ${this.cfg.token ? "\u2022\u2022\u2022\u2022" : "(none)"} \xB7 enabled: [${this.cfg.enabled.join(", ")}]${jl}` });
      } else if (id === "status") {
        mutation.push({ targetProp: "content", value: this.debugText() });
      } else if (id === "token-input") {
        mutation.push({ targetProp: "content", value: this.cfg.token ?? "" });
      } else if (typeof id === "string" && id.startsWith("toggle:")) {
        const g = id.slice("toggle:".length);
        const on = this.cfg.enabled.includes(g);
        mutation.push({ targetProp: "props.data-on", mode: "replace", value: on ? "true" : "false" });
        mutation.push({ targetProp: "content", value: `${on ? "\u2611" : "\u2610"} ${GROUP_LABELS[g]}` });
      } else if (id === "journal-length-input") {
        mutation.push({ targetProp: "props.value", mode: "replace", value: this.cfg.maxJournalLength ?? "" });
      } else if (id === "module-status") {
        mutation.push({ targetProp: "content", value: this.moduleStatus });
      } else if (id === "module-list") {
        mutation.push({ targetProp: "content", value: this.moduleListText });
      }
      if (mutation.length > 0 && paneMutationValid(mutation)) {
        this.supervisor.apply({ kind: "state-slice", node: n, mutation });
      }
    }
    this.applyJournalCap();
  }
  /** G3 §2.5 items 1/2/4 — THE PANE JOURNAL'S CAP, ENFORCED AT THE HOST
   *  (gate-4 finding 2, RED-SET-FIX, 2026-10-03): the engine's own deferred
   *  condense cannot drop this pane's journal past the cap — measured defeat
   *  paths: (1) the D5 containment aborts (`condense-aborted:
   *  serialization-error`) while the journal/newest entries carry a non-JSON
   *  value (the refresh's `status` write once shipped the `debugText` METHOD
   *  reference — a function — into the node's content instead of the string;
   *  fixed above), and (2) the D5 size guard skips a small journal (`base >=
   *  journal`: MEASURED — a 1-cycle 11-entry journal is ~1864B while the pane
   *  graph's base snapshot is ~5249B), so at small N the engine's condense
   *  never rewrites and `journalDepth()` stays ≥ the cap. The cap is therefore
   *  made REAL by condensing over the RAW journal entries — never a graph
   *  round-trip — with the engine's OWN D6 rewrite semantics (`supervisor.js`
   *  condense): the oldest excess entries are dropped from the journal and the
   *  parallel undo stack, and the redo stack clears (a truncation invalidates
   *  the redo basis — D6's rule). `maxJournalLength === undefined` (no cap)
   *  never trims; the falsifier's observable — "a journal depth > M means the
   *  cap is not applied" — is closed: after every pane journaling cycle the
   *  depth is ≤ M, while an UNCAPPED pane keeps growing per mutated node. */
  applyJournalCap() {
    const max = this.maxJournalLength;
    if (max === void 0) return;
    const sup = this.supervisor;
    const excess = sup.undoStack.length - max;
    if (excess <= 0) return;
    sup.journal.splice(0, excess);
    sup.undoStack.splice(0, excess);
    sup.redoStack.length = 0;
  }
  /** Compile the pane graph root + re-render into the pane mount. */
  render() {
    const cr = this.root.compile(this.nodes);
    this.supervisor.recordResolved(cr.actionable);
    const byNode = new Map(this.supervisor.allNodes().map((n) => [n.id, n]));
    const renderOptions = { nodeIdAttribute: true, graphScope: this.scope };
    this.adapter.beginBatch();
    const dom = renderProducingProcess(cr.actionable, byNode, this.adapter, this.prevMap, renderOptions);
    this.adapter.endBatch();
    this.prevMap = dom.prevMap;
  }
};

// src/shared/gesture-session.ts
var POINTER_TYPES = Object.freeze({
  start: "pointerdown",
  move: "pointermove",
  end: "pointerup",
  cancel: "pointercancel"
});
function readMember(holder, key) {
  try {
    if (holder === null || holder === void 0) return void 0;
    return holder[key];
  } catch {
    return void 0;
  }
}
function callableSource(candidate) {
  const onMember = readMember(candidate, "on");
  const offMember = readMember(candidate, "off");
  if (typeof onMember !== "function" || typeof offMember !== "function") return null;
  return candidate;
}
function resolveOptions(input) {
  const startHook = readMember(input, "onStart");
  const moveHook = readMember(input, "onMove");
  const endHook = readMember(input, "onEnd");
  const cancelHook = readMember(input, "onCancel");
  return {
    capture: Boolean(readMember(input, "capture")),
    onStart: typeof startHook === "function" ? startHook : void 0,
    onMove: typeof moveHook === "function" ? moveHook : void 0,
    onEnd: typeof endHook === "function" ? endHook : void 0,
    onCancel: typeof cancelHook === "function" ? cancelHook : void 0
  };
}
function createGestureSession(options) {
  const seam = callableSource(readMember(options, "source"));
  const commitMember = readMember(options, "commit");
  const commit = typeof commitMember === "function" ? commitMember : null;
  const entries = [];
  const counters = { calls: 0, gestures: 0, commits: 0, lastCode: "ok" };
  let slot = null;
  let ended = false;
  const refuseBegin = (code) => {
    counters.lastCode = code;
    return { ok: false, code };
  };
  const refuseTerminal = (code) => {
    counters.lastCode = code;
    return { ok: false, code, committed: false };
  };
  const callOn = (element, type, handler) => {
    if (seam === null) return false;
    try {
      seam.on(element, type, handler);
      counters.calls += 1;
      return true;
    } catch {
      return false;
    }
  };
  const callOff = (element, type, handler) => {
    if (seam === null) return false;
    try {
      seam.off(element, type, handler);
      counters.calls += 1;
      return true;
    } catch {
      return false;
    }
  };
  const connected = (element) => {
    const probe = readMember(seam, "isConnected");
    if (typeof probe !== "function") return true;
    try {
      const answer = probe.call(seam, element);
      counters.calls += 1;
      return answer !== false;
    } catch {
      return true;
    }
  };
  const capturePointer = (element) => {
    const member = readMember(seam, "capturePointer");
    if (typeof member !== "function") return;
    try {
      ;
      member.call(seam, element);
    } catch {
      return;
    }
  };
  const buildHandle = (record) => {
    const handle = {
      get id() {
        return record.id;
      },
      get element() {
        return record.element;
      },
      get active() {
        return record.active;
      },
      get outcome() {
        return record.outcome;
      },
      get value() {
        return record.value;
      },
      set(value) {
        if (record.active) record.value = value;
        return handle;
      }
    };
    return handle;
  };
  const attachedEntry = (element) => {
    for (const entry of entries) {
      if (entry.element === element && entry.attached) return entry;
    }
    return null;
  };
  const ledgerKnows = (element) => {
    for (const entry of entries) {
      if (entry.element === element) return true;
    }
    return false;
  };
  const detachTracking = (record) => {
    let removed = 0;
    if (callOff(record.element, POINTER_TYPES.move, record.tracking.move)) removed += 1;
    if (callOff(record.element, POINTER_TYPES.end, record.tracking.finish)) removed += 1;
    if (callOff(record.element, POINTER_TYPES.cancel, record.tracking.stop)) removed += 1;
    return removed;
  };
  const handleIsCurrent = (record, element, gesture) => {
    const id = readMember(gesture, "id");
    const owned = readMember(gesture, "element");
    return id === record.id && owned === element && element === record.element;
  };
  const runTerminal = (record, element, value, outcome) => {
    detachTracking(record);
    record.active = false;
    record.outcome = outcome;
    const final = outcome === "reset" ? value : value !== void 0 ? value : record.value;
    let hookError = null;
    try {
      const endHook = record.options.onEnd;
      if (endHook !== void 0) endHook(element, final);
    } catch (error) {
      hookError = error;
    }
    slot = null;
    let commitError = null;
    if (commit !== null) {
      counters.commits += 1;
      record.commits = 1;
      try {
        commit(record.handle, final);
      } catch (error) {
        commitError = error;
      }
    }
    counters.lastCode = "ok";
    if (hookError !== null) throw hookError;
    if (commitError !== null) throw commitError;
  };
  const beginOperation = (element) => {
    if (ended) return refuseBegin("disposed");
    if (slot !== null) return refuseBegin("busy");
    const entry = attachedEntry(element);
    if (entry === null) return refuseBegin("not-installed");
    if (!connected(element)) return refuseBegin("disconnected");
    const record = {
      id: counters.gestures + 1,
      element,
      options: entry.options,
      handle: null,
      tracking: null,
      value: void 0,
      outcome: null,
      active: true,
      commits: 0
    };
    record.handle = buildHandle(record);
    record.tracking = {
      move: () => {
        if (!record.active) return;
        const moveHook = record.options.onMove;
        if (moveHook !== void 0) moveHook(record.handle);
      },
      finish: () => {
        endOperation(record.element, record.handle);
      },
      stop: () => {
        cancelOperation(record.element, record.handle);
      }
    };
    slot = record;
    const trackingAttached = [
      callOn(element, POINTER_TYPES.move, record.tracking.move),
      callOn(element, POINTER_TYPES.end, record.tracking.finish),
      callOn(element, POINTER_TYPES.cancel, record.tracking.stop)
    ];
    if (trackingAttached.some((ok) => !ok)) {
      detachTracking(record);
      record.active = false;
      slot = null;
      counters.lastCode = "not-installed";
      return { ok: false, code: "not-installed" };
    }
    if (record.options.capture) capturePointer(element);
    const startHook = record.options.onStart;
    if (startHook !== void 0) {
      try {
        startHook(element);
      } catch (error) {
        detachTracking(record);
        record.active = false;
        slot = null;
        throw error;
      }
    }
    if (ended || slot !== record) return refuseBegin("disposed");
    counters.gestures += 1;
    counters.lastCode = "ok";
    return { ok: true, gesture: record.handle };
  };
  const endOperation = (element, gesture, value) => {
    if (ended) return refuseTerminal("disposed");
    const record = slot;
    if (record === null || !record.active) return refuseTerminal("no-gesture");
    if (!handleIsCurrent(record, element, gesture)) return refuseTerminal("stale");
    runTerminal(record, element, value, "end");
    return { ok: true, code: "ok", committed: true };
  };
  const resetOperation = (element, gesture, value) => {
    if (ended) return refuseTerminal("disposed");
    const record = slot;
    if (record === null || !record.active) return refuseTerminal("no-gesture");
    if (!handleIsCurrent(record, element, gesture)) return refuseTerminal("stale");
    runTerminal(record, element, value, "reset");
    return { ok: true, code: "ok", committed: true };
  };
  const cancelOperation = (element, gesture) => {
    if (ended) return refuseTerminal("disposed");
    const record = slot;
    if (record === null || !record.active) return refuseTerminal("no-gesture");
    if (element !== record.element) return refuseTerminal("no-gesture");
    if (gesture !== void 0 && gesture !== null && !handleIsCurrent(record, element, gesture)) {
      return refuseTerminal("stale");
    }
    detachTracking(record);
    record.active = false;
    record.outcome = "cancel";
    slot = null;
    counters.lastCode = "ok";
    const cancelHook = record.options.onCancel;
    if (cancelHook !== void 0) cancelHook(element);
    return { ok: true, code: "ok", committed: false };
  };
  const installOperation = (element, options2) => {
    if (ended) return false;
    if (element === null || element === void 0) return false;
    if (ledgerKnows(element)) return false;
    if (seam === null) return false;
    const resolved = resolveOptions(options2);
    const handler = () => {
      beginOperation(element);
    };
    const attached = callOn(element, POINTER_TYPES.start, handler);
    if (!attached) return false;
    entries.push({ element, options: resolved, handler, attached: true });
    return true;
  };
  const disposeOperation = () => {
    if (ended) return { removed: 0, complete: true };
    ended = true;
    let removed = 0;
    let complete = true;
    const record = slot;
    if (record !== null && record.active) {
      const detached = detachTracking(record);
      removed += detached;
      if (detached !== 3) complete = false;
      record.active = false;
      record.outcome = "cancel";
      const cancelHook = record.options.onCancel;
      if (cancelHook !== void 0) {
        try {
          cancelHook(record.element);
        } catch {
          complete = complete;
        }
      }
    }
    slot = null;
    for (const entry of entries) {
      if (entry.attached && entry.handler !== null) {
        if (callOff(entry.element, POINTER_TYPES.start, entry.handler)) removed += 1;
        else complete = false;
      }
    }
    entries.length = 0;
    return { removed, complete };
  };
  const gestureReading = () => {
    const record = slot;
    if (record === null) return null;
    return {
      active: record.active,
      id: record.id,
      outcome: record.outcome,
      value: record.value,
      commits: record.commits
    };
  };
  const statsReading = () => {
    let installed = 0;
    for (const entry of entries) {
      if (entry.attached) installed += 1;
    }
    return {
      installed,
      sourceCalls: counters.calls,
      gestures: counters.gestures,
      commits: counters.commits,
      active: slot !== null && slot.active,
      gestureId: slot !== null && slot.active ? slot.id : 0,
      lastCode: counters.lastCode
    };
  };
  return {
    install: installOperation,
    begin: beginOperation,
    end: endOperation,
    reset: resetOperation,
    cancel: cancelOperation,
    dispose: disposeOperation,
    gesture: gestureReading,
    stats: statsReading,
    get disposed() {
      return ended;
    }
  };
}

// src/shared/gutter.ts
function clampToBounds(value, bounds) {
  const notANumber = Number.NaN;
  if (typeof value !== "number") return notANumber;
  const holder = bounds;
  let low;
  let high;
  try {
    low = holder === null || holder === void 0 ? void 0 : holder.min;
    high = holder === null || holder === void 0 ? void 0 : holder.max;
  } catch {
    return notANumber;
  }
  if (typeof low !== "number" || typeof high !== "number") return notANumber;
  return Math.max(low, Math.min(value, high));
}
function readMember2(host, key) {
  try {
    return host?.[key];
  } catch {
    return void 0;
  }
}
function callableMember(host, key) {
  const member = readMember2(host, key);
  return typeof member === "function" ? member : null;
}
function usableSession(candidate) {
  for (const key of ["install", "reset", "dispose", "stats", "gesture"]) {
    if (callableMember(candidate, key) === null) return false;
  }
  return true;
}
function createResizeController(options) {
  const session = readMember2(options, "session");
  const seamAxis = readMember2(options, "axisFor");
  const seamBounds = callableMember(options, "boundsFor");
  const seamDefault = callableMember(options, "defaultSizeFor");
  const seamResizable = callableMember(options, "isResizable");
  const seamSize = callableMember(options, "sizeFor");
  const commit = callableMember(options, "commit");
  const inert = !usableSession(session);
  const entries = [];
  const counters = { attached: 0, gestures: 0, sinkCalls: 0, written: 0, resets: 0, lastCode: "ok" };
  let ended = false;
  const sessionEnded = () => readMember2(session, "disposed") === true;
  const refusal = (code) => {
    counters.lastCode = code;
    return { ok: false, code, committed: false };
  };
  const tokenFor = (element) => {
    if (typeof seamAxis !== "function") return void 0;
    try {
      return seamAxis.call(options, element);
    } catch {
      return void 0;
    }
  };
  const decisionFor = (element, axis) => {
    if (seamResizable === null) return false;
    try {
      return seamResizable.call(options, element, axis) ? true : false;
    } catch {
      return false;
    }
  };
  const entryOf = (element) => {
    for (const entry of entries) {
      if (entry.element === element) return entry;
    }
    return null;
  };
  const liveEntryOf = (element) => {
    for (const entry of entries) {
      if (entry.element === element && entry.attached) return entry;
    }
    return null;
  };
  const attachedCount = () => {
    let live = 0;
    for (const entry of entries) {
      if (entry.attached) live += 1;
    }
    return live;
  };
  const pairFor = (element, axis) => {
    if (seamBounds === null) return void 0;
    return seamBounds.call(options, element, axis);
  };
  const write = (gesture, narrowed, reset2) => {
    if (typeof narrowed !== "number" || narrowed !== narrowed) {
      return;
    }
    if (commit === null) return;
    counters.sinkCalls += 1;
    try {
      if (reset2 === true) gesture.set(narrowed);
      commit(gesture, narrowed);
      counters.written += 1;
    } catch {
      return;
    }
  };
  const buildEntry = (element, hooks) => {
    const entry = {
      element,
      hooks,
      attached: false,
      gesture: null,
      axis: void 0,
      resizable: false,
      narrowed: void 0,
      narrowedSet: false,
      spent: false,
      wrappedOnStart: (element0) => {
        entry.axis = tokenFor(element);
        entry.resizable = decisionFor(element, entry.axis);
        entry.gesture = null;
        entry.narrowed = void 0;
        entry.narrowedSet = false;
        entry.spent = false;
        counters.gestures += 1;
        const consumer = entry.hooks === null || entry.hooks === void 0 ? void 0 : entry.hooks.onStart;
        if (typeof consumer === "function") consumer(element0);
      },
      wrappedOnMove: (gesture) => {
        entry.gesture = gesture;
        entry.narrowed = void 0;
        entry.narrowedSet = false;
        entry.spent = false;
        const consumer = entry.hooks === null || entry.hooks === void 0 ? void 0 : entry.hooks.onMove;
        if (typeof consumer === "function") consumer(gesture);
      },
      wrappedOnEnd: (element0, value) => {
        const gesture = entry.gesture;
        const suppliedSet = entry.narrowedSet;
        entry.gesture = null;
        entry.narrowedSet = false;
        if (!suppliedSet) {
          entry.narrowed = void 0;
          if (entry.resizable && gesture !== null && seamSize !== null) {
            const size = seamSize.call(options, element, gesture, entry.axis);
            if (seamBounds === null) {
              entry.narrowed = clampToBounds(size, void 0);
            } else {
              const pair = seamBounds.call(options, element, entry.axis);
              entry.narrowed = pair === void 0 ? clampToBounds(size, void 0) : clampToBounds(size, pair);
            }
          }
        }
        try {
          const consumer = entry.hooks === null || entry.hooks === void 0 ? void 0 : entry.hooks.onEnd;
          if (typeof consumer === "function") {
            ;
            consumer(element0, value);
          }
        } finally {
          const narrowed = entry.narrowed;
          const spent = entry.spent;
          entry.gesture = null;
          entry.narrowed = void 0;
          entry.narrowedSet = false;
          if (gesture !== null && !spent) {
            entry.spent = true;
            write(gesture, narrowed, suppliedSet);
          }
        }
      },
      wrappedOnCancel: (element0) => {
        const consumer = entry.hooks === null || entry.hooks === void 0 ? void 0 : entry.hooks.onCancel;
        if (typeof consumer === "function") consumer(element0);
      }
    };
    return entry;
  };
  const attach = (element, hooks) => {
    if (ended || inert || sessionEnded()) return false;
    if (element === null || element === void 0) return false;
    if (entryOf(element) !== null) return false;
    const installer = callableMember(session, "install");
    if (installer === null) return false;
    const entry = buildEntry(element, hooks === null || hooks === void 0 ? {} : hooks);
    const wrapped = {
      onStart: entry.wrappedOnStart,
      onMove: entry.wrappedOnMove,
      onEnd: entry.wrappedOnEnd,
      onCancel: entry.wrappedOnCancel
    };
    let installed = false;
    try {
      installed = Boolean(installer.call(session, element, wrapped));
    } catch {
      installed = false;
    }
    if (!installed) return false;
    entry.attached = true;
    entries.push(entry);
    counters.attached = attachedCount();
    return true;
  };
  const detach = () => {
    if (ended || inert || sessionEnded()) return false;
    if (attachedCount() > 1) return false;
    const closer = callableMember(session, "dispose");
    if (closer === null) return false;
    let report;
    try {
      report = closer.call(session);
    } catch {
      return false;
    }
    ended = true;
    for (const entry of entries) {
      entry.attached = false;
      entry.gesture = null;
      entry.narrowed = void 0;
      entry.narrowedSet = false;
      entry.spent = false;
    }
    counters.attached = 0;
    const record = report;
    return record !== null && record !== void 0 && record.complete === true;
  };
  const reset = (element) => {
    if (inert) return { ok: false, code: "no-gesture", committed: false };
    const entry = liveEntryOf(element);
    if (entry === null || entry.gesture === null) return refusal("no-gesture");
    if (!entry.resizable) return refusal("not-resizable");
    const gesture = entry.gesture;
    let supplied;
    if (seamDefault !== null) {
      try {
        supplied = seamDefault.call(options, element, entry.axis);
      } catch {
        return refusal("unusable-default");
      }
    }
    if (!(typeof supplied === "number") || Number.isNaN(supplied)) {
      return refusal("unusable-default");
    }
    const pair = pairFor(element, entry.axis);
    const narrowed = clampToBounds(supplied, pair);
    const terminal = callableMember(session, "reset");
    if (terminal === null) return refusal("no-gesture");
    const before = counters.written;
    entry.narrowed = narrowed;
    entry.narrowedSet = true;
    entry.spent = false;
    let answer;
    try {
      answer = terminal.call(session, element, gesture, narrowed);
    } catch {
      entry.narrowed = void 0;
      entry.narrowedSet = false;
      entry.spent = false;
      return refusal("no-gesture");
    }
    entry.narrowed = void 0;
    entry.narrowedSet = false;
    entry.spent = false;
    entry.gesture = null;
    counters.resets += 1;
    const record = answer;
    const code = record !== null && record !== void 0 && typeof record.code === "string" ? record.code : "ok";
    counters.lastCode = code;
    const wrote = counters.written > before;
    return { ok: wrote, code, committed: wrote };
  };
  const stats = () => {
    return {
      attached: counters.attached,
      gestures: counters.gestures,
      sinkCalls: counters.sinkCalls,
      written: counters.written,
      resets: counters.resets,
      lastCode: counters.lastCode
    };
  };
  return {
    attach,
    detach,
    reset,
    stats,
    get detached() {
      return ended || sessionEnded();
    }
  };
}

// src/shared/gutter-affordance.ts
function resolveEventPointer(event) {
  if (event === null || event === void 0) return null;
  const holder = event;
  let x;
  let y;
  try {
    x = holder["clientX"];
    y = holder["clientY"];
  } catch {
    return null;
  }
  return pointerPair(x, y);
}
function resolvePointerPosition(value) {
  if (value === null || value === void 0) return null;
  if (typeof value !== "object" && typeof value !== "function") return null;
  const holder = value;
  let x;
  let y;
  try {
    x = holder["x"];
    y = holder["y"];
  } catch {
    return null;
  }
  return pointerPair(x, y);
}
function pointerPair(x, y) {
  if (typeof x !== "number" || typeof y !== "number") return null;
  if (!Number.isFinite(x) || !Number.isFinite(y)) return null;
  return Object.freeze({ x, y });
}
function cursorDeclarationFor(value) {
  if (value === null || value === void 0) return void 0;
  if (typeof value !== "object" && typeof value !== "function") return void 0;
  let declaration;
  try {
    if (!Object.hasOwn(value, "cursor")) return void 0;
    declaration = value["cursor"];
  } catch {
    return void 0;
  }
  if (typeof declaration !== "string") return void 0;
  const trimmed = declaration.trim();
  return trimmed.length === 0 ? void 0 : trimmed;
}
function domEventSource() {
  return {
    on(element, type, handler) {
      if (element === null || element === void 0 || typeof element !== "object") return;
      let attach;
      try {
        attach = element["addEventListener"];
      } catch {
        return;
      }
      if (typeof attach !== "function") return;
      try {
        attach.call(element, type, handler);
      } catch {
        return;
      }
    },
    off(element, type, handler) {
      if (element === null || element === void 0 || typeof element !== "object") return;
      let detach;
      try {
        detach = element["removeEventListener"];
      } catch {
        return;
      }
      if (typeof detach !== "function") return;
      try {
        detach.call(element, type, handler);
      } catch {
        return;
      }
    },
    isConnected(element) {
      if (element === null || element === void 0 || typeof element !== "object") return false;
      let present;
      try {
        present = element["isConnected"];
      } catch {
        return false;
      }
      return present === true;
    }
  };
}
function seamAnswer(seam, args) {
  if (typeof seam !== "function") return { answered: false, value: void 0 };
  try {
    return { answered: true, value: seam(...args) };
  } catch {
    return { answered: false, value: void 0 };
  }
}
function preDragReading(start, pair) {
  const clamped = clampToBounds(start, pair);
  return Number.isFinite(clamped) ? clamped : start;
}
function revertStateFor(value, token, resizable) {
  if (typeof value !== "number" || !Number.isFinite(value)) return null;
  return { value, token, valid: false, resizable };
}
function createGutterAffordance(options) {
  const read = (key) => {
    try {
      return options?.[key];
    } catch {
      return void 0;
    }
  };
  const session = read("session");
  const source = read("source");
  const element = read("element");
  const sizeFromPointer = read("sizeFromPointer");
  const pointerOf = read("pointerOf");
  const moveTypeOf = read("moveTypeOf");
  const axisOf = read("axisOf");
  const cursorOf = read("cursorOf");
  const applyPreview = read("applyPreview");
  const applyCursor = read("applyCursor");
  const startSizeOf = read("startSizeOf");
  const boundsOf = read("boundsOf");
  const resizableOf = read("resizableOf");
  const commit = read("commit");
  const isDragValid = read("isDragValid");
  const counters = { moves: 0, previews: 0, cursorWrites: 0, cursorClears: 0, resets: 0, drops: 0, lastCursor: "" };
  let record = null;
  let hovered = false;
  let attached = false;
  let detached = false;
  let recoverable = false;
  const listeners = [];
  const revertFor = (current, pair) => current.started ? revertStateFor(preDragReading(current.start, pair), current.token, current.resizable) : null;
  const writePreview = (state) => {
    if (!Number.isFinite(state.value)) return;
    if (typeof applyPreview !== "function") return;
    counters.previews += 1;
    applyPreview(state);
  };
  const resetArm = (current) => {
    const answer = resetEntry === null ? null : resetEntry(element);
    const accepted = answer !== null && answer !== void 0 && answer.ok === true;
    if (accepted) counters.resets += 1;
    const revert = current.revert;
    record = null;
    if (revert !== null) writePreview(revert);
  };
  const dropArm = (current) => {
    counters.drops += 1;
    const revert = current.preRevert;
    record = null;
    if (revert !== null) {
      try {
        writePreview(revert);
      } finally {
        record = null;
      }
    }
  };
  const onMoveTurn = (event) => {
    counters.moves += 1;
    const current = record;
    if (current === null) return;
    current.moved = true;
    if (!current.started) {
      current.start = seamAnswer(startSizeOf, [element, current.token]).value;
      current.started = true;
    }
    const resolvePointer = () => typeof pointerOf === "function" ? resolvePointerPosition(seamAnswer(pointerOf, [event]).value) : resolveEventPointer(event);
    const pointer = resolvePointer();
    const pairs = seamAnswer(boundsOf, [element, current.token]);
    const pair = pairs.answered ? pairs.value : void 0;
    const sizes = seamAnswer(sizeFromPointer, [pointer, current.start]);
    const raw = sizes.answered ? sizes.value : void 0;
    const value = clampToBounds(raw, pair);
    const state = { value, token: current.token, valid: true, resizable: current.resizable };
    const veto = typeof isDragValid === "function" ? isDragValid(state) : void 0;
    const pointerResolved = pointer !== null;
    const valid = pointerResolved && Number.isFinite(value) && veto !== false;
    current.value = null;
    current.preRevert = revertFor(current, pair);
    current.revert = revertFor(current, pair);
    if (!valid) {
      resetArm(current);
      return;
    }
    current.valid = true;
    current.value = value;
    if (!current.resizable) return;
    try {
      writePreview({ value, token: current.token, valid, resizable: current.resizable });
    } catch (thrown) {
      record = null;
      throw thrown;
    }
  };
  const onMoveHook = (gesture) => {
    const current = record;
    if (current === null) return;
    if (current.value === null) return;
    gesture.set(current.value);
  };
  const onStartHook = () => {
    const current = record;
    if (current === null) return;
    current.establish = true;
    const preDragSize = seamAnswer(startSizeOf, [element, current.token]);
    current.start = preDragSize.value;
    current.started = true;
    const pairs = seamAnswer(boundsOf, [element, current.token]);
    const pair = pairs.answered ? pairs.value : void 0;
    current.pair = pair;
    current.paired = true;
    current.preRevert = revertFor(current, pair);
    current.revert = current.preRevert;
  };
  const onTerminal = () => {
    record = null;
  };
  const onCancelHook = () => {
    const current = record;
    if (current === null) return;
    const revert = current.preRevert;
    try {
      if (revert !== null) writePreview(revert);
    } finally {
      record = null;
    }
  };
  const onHoverEnter = () => {
    hovered = true;
    const token = seamAnswer(axisOf, [element]);
    const mapped = seamAnswer(cursorOf, [token.value]);
    const declaration = cursorDeclarationFor(mapped.answered ? mapped.value : void 0);
    if (declaration === void 0) return;
    counters.cursorWrites += 1;
    counters.lastCursor = declaration;
    if (typeof applyCursor === "function") applyCursor(element, declaration);
  };
  const onHoverExit = () => {
    if (!hovered) return;
    hovered = false;
    counters.cursorClears += 1;
    if (typeof applyCursor === "function") applyCursor(element, void 0);
  };
  const onPointerDownTurn = (event) => {
    let button;
    try {
      button = event?.["button"];
    } catch {
      button = void 0;
    }
    if (typeof button !== "number" || button !== 2) return;
    const current = record;
    if (current === null) return;
    if (!current.moved) return;
    dropArm(current);
  };
  const tokenFor = (el) => {
    const token = seamAnswer(axisOf, [el]).value;
    record = {
      token,
      start: void 0,
      started: false,
      establish: true,
      resizable: false,
      value: null,
      pair: void 0,
      paired: false,
      valid: false,
      moved: false,
      preRevert: null,
      revert: null
    };
    return token;
  };
  const decisionFor = (el) => {
    const decision = seamAnswer(resizableOf, [el, record === null ? void 0 : record.token]);
    const resizable = decision.answered ? decision.value === true : false;
    if (record !== null) record.resizable = resizable;
    return resizable;
  };
  const controller = createResizeController({
    session,
    axisFor: (el) => tokenFor(el),
    boundsFor: (el, token) => {
      const answer = seamAnswer(boundsOf, [el, token]);
      return answer.answered ? answer.value : void 0;
    },
    /** **THE GESTURE'S ALREADY-TAKEN PRE-DRAG READING IS REUSED HERE** (`§2.4` item 3:
     *  *"`startSizeOf(element, token)` is called EXACTLY ONCE per gesture, in `onStart`"*; `§5.5.1`
     *  `P-GU-IM-2`: *"`startSizeOf` — EXACTLY ONCE per gesture, at establishment"*). The composed
     *  controller reads this seam at a RESET terminal, and the as-filed closure consulted the
     *  caller's seam THERE — a second read on the invalid path (**MEASURED over a full invalid
     *  path: `1` read at establishment, `1` after a valid move, `2` after the INVALID move**). The
     *  record already holds that establishment answer, and the two readings cannot disagree
     *  (`§2.4` item 3's closing clause), so the record's own value IS what the reset clamps. The
     *  one fallback below serves only a gesture that never took an establishment reading at all
     *  (there is then nothing to reuse); it reuses nothing and hides nothing. */
    defaultSizeFor: (el, token) => {
      if (record !== null && record.started) return record.start;
      const answer = seamAnswer(startSizeOf, [el, token]);
      return answer.answered ? answer.value : void 0;
    },
    isResizable: (el, token) => {
      const decision = seamAnswer(resizableOf, [el, token]);
      const resizable = decision.answered ? decision.value === true : false;
      if (record !== null) record.resizable = resizable;
      return decision.answered ? decision.value : void 0;
    },
    sizeFor: (_el, gesture) => gesture.value,
    commit
  });
  const resetEntry = (() => {
    const member = controller["reset"];
    return typeof member === "function" ? member.bind(controller) : null;
  })();
  const registerListener = (type, handler) => {
    if (type.length === 0) return false;
    const take = source === null || source === void 0 ? void 0 : source["on"];
    if (typeof take !== "function") return false;
    try {
      ;
      source.on(element, type, handler);
    } catch {
      return false;
    }
    listeners.push({ type, handler });
    return true;
  };
  const removeOwnListeners = () => {
    const give = source === null || source === void 0 ? void 0 : source["off"];
    for (const listener of listeners) {
      if (typeof give !== "function") break;
      try {
        ;
        source.off(element, listener.type, listener.handler);
      } catch {
        continue;
      }
    }
    listeners.length = 0;
  };
  const attach = () => {
    if (attached || detached) return false;
    if (element === null || element === void 0 || typeof element !== "object") return false;
    const hoverEnterRegistered = registerListener("pointerover", onHoverEnter);
    const hoverExitRegistered = registerListener("pointerout", onHoverExit);
    const pointerDownRegistered = registerListener("pointerdown", onPointerDownTurn);
    if (!hoverEnterRegistered || !hoverExitRegistered || !pointerDownRegistered) {
      removeOwnListeners();
      recoverable = true;
      return false;
    }
    const controllerAttached = controller.attach(element, {
      onStart: onStartHook,
      onMove: onMoveHook,
      onEnd: onTerminal,
      onCancel: onCancelHook
    });
    if (!controllerAttached) {
      removeOwnListeners();
      return false;
    }
    const moveType = seamAnswer(moveTypeOf, [element]);
    const token = moveType.answered ? moveType.value : void 0;
    if (typeof token === "string" && token.length > 0) {
      if (!registerListener(token, onMoveTurn)) {
        removeOwnListeners();
        recoverable = true;
        return false;
      }
    }
    attached = true;
    recoverable = false;
    return true;
  };
  const detach = () => {
    if (!attached && !recoverable || detached) return false;
    removeOwnListeners();
    const reported = controller.detach();
    detached = true;
    recoverable = false;
    return reported === true;
  };
  const stats = () => ({
    moves: counters.moves,
    previews: counters.previews,
    cursorWrites: counters.cursorWrites,
    cursorClears: counters.cursorClears,
    resets: counters.resets,
    drops: counters.drops,
    lastCursor: counters.lastCursor
  });
  return {
    attach,
    detach,
    get detached() {
      return detached || controller.detached === true;
    },
    stats,
    controller
  };
}

// src/shared/focus-model.ts
function absent() {
  return { present: false, value: void 0 };
}
function soleName(bag) {
  return Object.getOwnPropertyNames(bag)[0];
}
function readOwn(holder, bag) {
  try {
    const name = soleName(bag);
    const described = Object.getOwnPropertyDescriptor(holder, name);
    if (described === void 0) return absent();
    return { present: true, value: holder[name] };
  } catch {
    return absent();
  }
}
function entriesOf(state) {
  try {
    const read = readOwn(state, { entries: null });
    return Array.isArray(read.value) ? read.value : [];
  } catch {
    return [];
  }
}
function activeOf(state) {
  return readOwn(state, { activeId: null }).value;
}
function isSame(left, right) {
  return left === right || left !== left && right !== right;
}
function ownershipOf(entries) {
  const owners = /* @__PURE__ */ new Map();
  let at = 0;
  for (const entry of entries) {
    const read = readOwn(entry, { id: null });
    if (read.present && !owners.has(read.value)) owners.set(read.value, at);
    at += 1;
  }
  return owners;
}
function targetAt(entries, target) {
  let found = -1;
  let at = 0;
  for (const entry of entries) {
    if (found < 0 && readOwn(entry, { target: null }).value === target) found = at;
    at += 1;
  }
  return found;
}
function verbBodyOf(verb) {
  if (verb === "open") return "open";
  if (verb === "activate") return "activate";
  if (verb === "close") return "close";
  if (verb === "next") return "next";
  if (verb === "prev") return "prev";
  return null;
}
function seamsOf(arg) {
  return {
    refuse: readOwn(arg, { refuse: null }).value,
    onChange: readOwn(arg, { onChange: null }).value
  };
}
function observe(seam, first, second, third) {
  try {
    ;
    seam(first, second, third);
  } catch {
  }
}
function notCalled() {
  return { present: false, value: void 0 };
}
function refusalResult(priorState, priorActive, verb, code, id, seams) {
  const record = { code, verb, id };
  const refusals = [record];
  const result = {
    state: priorState,
    accepted: false,
    verb,
    refusals,
    seated: priorActive,
    changed: false,
    persisted: notCalled()
  };
  const observation = { code: record.code, verb: record.verb, id: record.id };
  observe(seams.refuse, observation, void 0, void 0);
  return result;
}
function acceptedResult(priorState, priorActive, verb, nextEntries, nextActive, seams) {
  const settled = isSame(nextActive, priorActive) && nextEntries === entriesOf(priorState);
  const nextState = settled ? priorState : { entries: nextEntries, activeId: nextActive };
  const refusals = [];
  const result = {
    state: nextState,
    accepted: true,
    verb,
    refusals,
    seated: nextActive,
    changed: nextState !== priorState,
    persisted: notCalled()
  };
  observe(seams.onChange, nextState, priorState, void 0);
  return result;
}
function focusTransition(state, verb, arg) {
  const body = verbBodyOf(verb);
  const priorActive = activeOf(state);
  const seams = seamsOf(arg);
  const record = body === null ? "unknown" : body;
  if (body === null) return refusalResult(state, priorActive, record, "unknown-verb", null, seams);
  const entries = entriesOf(state);
  if (body === "open") {
    const entry = readOwn(arg, { entry: null }).value;
    const own = readOwn(entry, { id: null });
    if (!own.present) return refusalResult(state, priorActive, record, "unknown-id", void 0, seams);
    const id = own.value;
    const owners = ownershipOf(entries);
    if (owners.has(id)) return refusalResult(state, priorActive, record, "duplicate-id", id, seams);
    const at2 = targetAt(entries, readOwn(entry, { target: null }).value);
    if (at2 >= 0) {
      return acceptedResult(
        state,
        priorActive,
        body,
        entries,
        readOwn(entries[at2], { id: null }).value,
        seams
      );
    }
    return acceptedResult(state, priorActive, body, entries.concat([entry]), id, seams);
  }
  if (body === "activate") {
    const id = readOwn(arg, { id: null }).value;
    const at2 = ownershipOf(entries).get(id);
    if (at2 === void 0) return refusalResult(state, priorActive, record, "unknown-id", id, seams);
    return acceptedResult(
      state,
      priorActive,
      body,
      entries,
      readOwn(entries[at2], { id: null }).value,
      seams
    );
  }
  if (body === "close") {
    const id = readOwn(arg, { id: null }).value;
    const at2 = ownershipOf(entries).get(id);
    if (at2 === void 0) return refusalResult(state, priorActive, record, "unknown-id", id, seams);
    const rest = entries.slice(0, at2).concat(entries.slice(at2 + 1));
    const wasActive = isSame(readOwn(entries[at2], { id: null }).value, priorActive);
    const seated = wasActive && rest.length > 0 ? readOwn(rest[Math.min(at2, rest.length - 1)], { id: null }).value : null;
    return acceptedResult(state, priorActive, body, rest, wasActive ? seated : priorActive, seams);
  }
  const code = body === "next" ? "no-next" : "no-previous";
  const at = ownershipOf(entries).get(priorActive);
  if (priorActive === null || at === void 0) {
    return refusalResult(state, priorActive, record, code, priorActive, seams);
  }
  const to = body === "next" ? at + 1 : at - 1;
  if (to < 0 || to >= entries.length) {
    return refusalResult(state, priorActive, record, code, priorActive, seams);
  }
  return acceptedResult(
    state,
    priorActive,
    body,
    entries,
    readOwn(entries[to], { id: null }).value,
    seams
  );
}
function focusOrder(entries) {
  try {
    return Array.isArray(entries) ? entries : [];
  } catch {
    return [];
  }
}
function persist(seam, state) {
  let present = false;
  let value = void 0;
  try {
    value = seam(state);
    present = true;
  } catch {
    present = false;
  }
  return { present, value };
}

// src/renderer/renderer.ts
var wiredGraphStore = null;
var focusCarrier = null;
var FILE_TIER_ROOT_NAMES = [
  { name: "window" },
  { name: "tabs" },
  { name: "layout" },
  { name: "settings" },
  { name: "tracked" },
  { name: "modules" }
];
var bootHandoff = [];
function buildWiredGraphStore(options) {
  wiredGraphStore = createGraphStore({
    declarations: storeGraphReferences(options?.declarations ?? []),
    crossing: options?.crossing ?? null
  });
  return wiredGraphStore;
}
function getWiredGraphStore(options) {
  if (wiredGraphStore === null) wiredGraphStore = buildWiredGraphStore(options);
  return wiredGraphStore;
}
var MUTATING_METHODS = /* @__PURE__ */ new Set(["dispatch", "load", "op", "teardown", "code.load", "code.loadBatch", "journal"]);
function startGutterAffordance(runtime) {
  const element = runtime.elementForNodeId(GUTTER_AFFORDANCE_ID);
  const target = runtime.elementForNodeId(GUTTER_TARGET_ID);
  const seams = gutterSeamExample();
  const source = domEventSource();
  const session = createGestureSession({
    source,
    // (i) THE NON-FORWARDING RECORDER: the session's own channel records and writes nothing, so
    // no second writer exists (`docs/specs/gutter.md` §0 ruling 1, `§4.4` S-11).
    commit: () => void 0
  });
  const writes = [];
  const write = (value) => {
    const carried = typeof value === "string" ? value : String(value);
    const answer = runtime.applyCommand({
      kind: "state-slice",
      node: GUTTER_STATUS_ID,
      mutation: [{ targetProp: "content", mode: "replace", value: carried }]
    });
    const status = answer.status;
    writes.push({ node: GUTTER_STATUS_ID, value: carried, status });
    if (status !== "applied") {
      console.error(`[provident-renderer] gutter commit REFUSED (status=${status}) for node ${GUTTER_STATUS_ID}`);
    }
    return status;
  };
  const applyPreview = (state) => {
    const holder = target;
    if (holder === null || holder === void 0 || holder.style === null || holder.style === void 0) return;
    const set = holder.style.setProperty;
    if (typeof set !== "function") return;
    const value = state?.value;
    if (typeof value !== "number" || !Number.isFinite(value)) return;
    set.call(holder.style, "width", `${String(value)}px`);
  };
  const affordance = createGutterAffordance({
    session,
    source,
    element,
    target,
    sizeFromPointer: seams.sizeFromPointer,
    pointerOf: seams.pointerOf,
    axisOf: seams.axisOf,
    cursorOf: seams.cursorOf,
    applyPreview,
    applyCursor: (el, declaration) => {
      const holder = el;
      if (holder === null || holder === void 0 || holder.style === null || holder.style === void 0) return;
      holder.style["cursor"] = declaration === void 0 ? "" : declaration;
    },
    startSizeOf: seams.startSizeOf,
    boundsOf: seams.boundsOf,
    resizableOf: seams.resizableOf,
    moveTypeOf: () => POINTER_TYPES.move,
    // (v) THE COMPOSITION'S SINGLE SINK WRITER — one managed-channel write to the AUTHORED
    // STATUS node, and nothing else.
    commit: (_gesture, value) => {
      write(value);
    }
  });
  const attached = affordance.attach();
  return { attached, writes };
}
function handleRequest(runtime, req, notify) {
  return (async () => {
    try {
      let value;
      switch (req.method) {
        case "dispatch":
          value = await runtime.dispatch(req.payload);
          break;
        case "renderedHtml":
          value = runtime.renderedHtmlResult();
          break;
        case "markdown":
          value = runtime.markdownResult();
          break;
        case "listTargets":
          value = runtime.listTargets();
          break;
        case "nodeState":
          value = runtime.nodeState(req.payload);
          break;
        case "load":
          value = runtime.load(req.payload);
          break;
        case "op":
          value = runtime.op(req.payload?.command ?? req.payload);
          break;
        case "export":
          value = runtime.export(req.payload.format);
          break;
        case "validate":
          value = runtime.validate(req.payload.kind, req.payload.export);
          break;
        case "teardown":
          value = await runtime.teardownResult();
          break;
        case "code.get":
          value = runtime.codeGet(req.payload.path);
          break;
        case "code.set":
          value = runtime.codeSet(req.payload.path, req.payload.value);
          break;
        case "code.create":
          value = runtime.codeCreate(req.payload.path, req.payload.entry);
          break;
        case "code.delete":
          value = runtime.codeDelete(req.payload.path, req.payload.index);
          break;
        case "code.validate":
          value = runtime.codeValidate(req.payload.envelope);
          break;
        case "code.load":
          value = runtime.codeLoad(req.payload.envelope);
          break;
        case "code.loadBatch":
          value = runtime.codeLoadBatch(req.payload.ops);
          break;
        case "journal":
          value = runtime.journal(req.payload?.action);
          break;
        // U-FOCUS-TOOL (`F3`, docs/specs/focus-tool.md §2.1 item 6, the layer map's
        // site 6) — THE CASE BODY READS THE RENDERER'S OWN WIRING-HELD FOCUS STATE,
        // not a graph slice. The call LANDS here: the case hands the caller's own
        // payload to the wiring role below, which drives the focus model F2 owns and
        // returns its own answer. Nothing is pushed (the notify predicate stays keyed
        // on `MUTATING_METHODS` and this method is absent from that set), nothing is
        // re-rendered and nothing is written to the graph.
        case "focus":
          value = focusRoute(req.payload);
          break;
        default:
          throw new Error(`unknown method: ${req.method}`);
      }
      return { id: req.id, ok: true, value };
    } catch (e) {
      return {
        id: req.id,
        ok: false,
        error: e instanceof Error ? e.message : String(e)
      };
    }
  })().then((reply) => {
    if (reply.ok && MUTATING_METHODS.has(req.method)) {
      notify({ uri: "mcp://provident/app" });
    }
    return reply;
  });
}
function tabListProjectionOf(payload) {
  const record = payload ?? null;
  if (record === null || typeof record !== "object" || !("entries" in record)) return null;
  const entries = record["entries"];
  if (!Array.isArray(entries)) return null;
  return { entries, activeId: "activeId" in record ? record["activeId"] : null };
}
function projectionAnswerOf(projection) {
  return {
    activeId: projection.activeId,
    entries: carriedEntryIds({ entries: projection.entries, activeId: projection.activeId }),
    opened: false
  };
}
function readMirrorRef(store, name) {
  try {
    const answer = store.resolve(name);
    if (answer === null || typeof answer !== "object") return { found: false, value: void 0 };
    if (answer.status === "refused") return { found: false, value: void 0 };
    if (answer.found === true) return { found: true, value: answer.value };
    return { found: false, value: void 0 };
  } catch {
    return { found: false, value: void 0 };
  }
}
function mirrorStateOf(store) {
  const entries = readMirrorRef(store, "mem.focus.entries");
  const activeId = readMirrorRef(store, "mem.focus.activeId");
  return {
    entries: entries.found ? entries.value : [],
    activeId: activeId.found ? activeId.value : null
  };
}
function carriedEntryIds(state) {
  return focusOrder(state.entries).map((entry) => entry.id);
}
function resolveForHolder(payload) {
  const caller = payload ?? {};
  if (!("target" in caller)) return { present: false, verb: null, arg: {} };
  const identity = caller["target"];
  return {
    present: true,
    verb: caller["newTab"] === true ? "open" : "activate",
    arg: { id: identity, entry: { id: identity, target: identity } }
  };
}
function answerForCarrier(store, result) {
  if (result.accepted) {
    if (result.changed) {
      persist(
        (next) => {
          store.commit("mem.focus.entries", next.entries, { onRepeat: "edit" });
          return store.commit("mem.focus.activeId", next.activeId, { onRepeat: "edit" });
        },
        result.state
      );
    }
    return { activeId: result.state.activeId, entries: carriedEntryIds(result.state), opened: result.changed };
  }
  const reason = result.refusals.length > 0 ? result.refusals[0].code : void 0;
  const answer = {
    activeId: result.state.activeId,
    entries: carriedEntryIds(result.state),
    opened: false
  };
  if (reason !== void 0) answer.refused = { reason };
  return answer;
}
function standingAnswer(store) {
  const state = mirrorStateOf(store);
  return { activeId: state.activeId, entries: carriedEntryIds(state), opened: false };
}
function focusRouteImpl(store, payload) {
  const projection = tabListProjectionOf(payload);
  if (projection !== null) return projectionAnswerOf(projection);
  const resolved = resolveForHolder(payload);
  if (!resolved.present) return standingAnswer(store);
  const result = focusTransition(mirrorStateOf(store), resolved.verb, resolved.arg);
  return answerForCarrier(store, result);
}
function focusRoute(payload) {
  if (focusCarrier === null) focusCarrier = createFocusCarrier(getWiredGraphStore());
  const projection = tabListProjectionOf(payload);
  if (projection !== null) return projectionAnswerOf(projection);
  const resolved = resolveForHolder(payload);
  const store = getWiredGraphStore();
  if (!resolved.present) return standingAnswer(store);
  const result = focusTransition(mirrorStateOf(store), resolved.verb, resolved.arg);
  return answerForCarrier(store, result);
}
async function main() {
  const mount = document.getElementById("app");
  if (!mount) throw new Error("mount #app missing");
  const bridge = window.provident;
  let maxJournalLength;
  if (bridge?.security) {
    try {
      const cfg = await bridge.security.get();
      maxJournalLength = cfg.maxJournalLength;
    } catch {
    }
  }
  const handedOff = [];
  if (bridge !== void 0 && bridge.store !== void 0) {
    try {
      const served = await bridge.store["get"]();
      if (Array.isArray(served)) handedOff.push(...served);
    } catch {
    }
  }
  bootHandoff = handedOff;
  const wired = getWiredGraphStore(
    bridge !== void 0 && bridge.store !== void 0 ? {
      declarations: FILE_TIER_ROOT_NAMES,
      crossing: { put(row) {
        return bridge.store.put(row);
      } }
    } : void 0
  );
  wired.hydrate(bootHandoff);
  focusCarrier = createFocusCarrier(wired);
  const runtime = new Runtime({ mount, envelope: demoEnvelope(), maxJournalLength });
  runtime.bootstrap();
  startGutterAffordance(runtime);
  let releaseY3 = null;
  if (bridge !== void 0 && bridge.store !== void 0) {
    releaseY3 = bridge.store.onFileChanged(() => {
    });
  }
  if (!bridge) {
    console.warn("[provident-renderer] no preload bridge \u2014 MCP endpoints unavailable (running as a plain page?)");
    return;
  }
  const panesMount = document.getElementById("panes");
  const panels = panesMount ? new SecurePanels(panesMount, { maxJournalLength }) : null;
  if (panels) {
    void panels.refresh();
    panels.refreshDebug(runtime);
  }
  const replyRoute = (req) => {
    void handleRequest(runtime, req, (p) => {
      bridge.notify(p);
      panels?.refreshDebug(runtime);
    }).then((reply) => {
      bridge.sendReply(reply);
    });
  };
  bridge.onRequest(replyRoute);
  bridge.ready();
}
if (typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => void main());
  } else {
    void main();
  }
}
var DRAG_MINIMIZE_MARKER = 0;
function zoneSizeConstraint(min, max) {
  return (changed, current, next, feedback) => {
    void changed;
    void current;
    const record = next;
    const size = record !== null && record !== void 0 && typeof record === "object" && "size" in record ? record.size : next;
    if (typeof size === "number" && size >= min && size <= max) return true;
    if (size === DRAG_MINIMIZE_MARKER) return true;
    if (feedback !== void 0) feedback.reason = "below-minimum";
    return false;
  };
}
function zoneSizeRepair(min, max) {
  void max;
  return (data, feedback) => {
    void feedback;
    const record = data;
    if (record === null || record === void 0 || typeof record !== "object" || !("size" in record)) return false;
    const size = record.size;
    if (typeof size !== "number") return false;
    void size;
    record.size = size < min / 2 ? DRAG_MINIMIZE_MARKER : min;
    return true;
  };
}
function createPaneDrag(store, source) {
  const storeRecord = store ?? null;
  const sourceRecord = source ?? null;
  const paneIdOf = (element, token) => {
    const viaElement = element?.id;
    if (typeof viaElement === "string" && viaElement.length > 0) return viaElement;
    if (typeof token === "string" && token.length > 0) return token;
    return "pane-a";
  };
  const zoneIdOf = (element) => {
    const viaElement = element?.zoneId;
    if (typeof viaElement === "string" && viaElement.length > 0) return viaElement;
    return "zone-1";
  };
  const tierRead = (tier, name) => {
    const answerOf = (answer) => {
      const record = answer;
      if (record === null || record === void 0 || typeof record !== "object") return { found: false, value: void 0 };
      if (record.found === true) return { found: true, value: record.value };
      return { found: false, value: void 0 };
    };
    try {
      const resolve = storeRecord?.resolve;
      if (typeof resolve === "function") {
        const qualified = answerOf(resolve(`${tier}.${name}`));
        if (qualified.found) return qualified;
      }
      const tiers = storeRecord?.tiers;
      const handle = tiers?.[tier];
      const get = handle?.get;
      if (typeof get === "function") {
        const viaTier = answerOf(get.call(handle, name));
        if (viaTier.found) return viaTier;
      }
      return { found: false, value: void 0 };
    } catch {
      return { found: false, value: void 0 };
    }
  };
  const readPaneSize = (element, token) => {
    const id = paneIdOf(element, token);
    const mem = tierRead("mem", `layout.pane.${id}.size`);
    if (mem.found) return mem.value;
    const file = tierRead("file", `settings.pane.${id}.size`);
    if (file.found) return file.value;
    return void 0;
  };
  const readPaneBounds = (element, token) => {
    const id = paneIdOf(element, token);
    const mem = tierRead("mem", `layout.pane.${id}.bounds`);
    if (mem.found) return mem.value;
    const file = tierRead("file", `settings.pane.${id}.bounds`);
    if (file.found) return file.value;
    return { min: void 0, max: void 0 };
  };
  const renderZone = () => {
    const layout = sourceRecord?.layout;
    if (typeof layout !== "function") return;
    const size = tierRead("mem", `layout.zone.${"zone-1"}.size`);
    const display = tierRead("mem", `layout.zone.${"zone-1"}.display`);
    layout("zone-1", size.value, display.value);
  };
  try {
    const subscribe = storeRecord?.subscribe;
    if (typeof subscribe === "function") {
      subscribe("temp.drag", () => renderZone(), { subtree: true });
    }
  } catch {
  }
  try {
    const commit = storeRecord?.commit;
    const clear = storeRecord?.clear;
    if (typeof commit === "function" && typeof clear === "function") {
      commit("mem.layout", void 0);
      clear("mem.layout");
      commit("temp.drag", void 0);
      clear("temp.drag");
      commit("file.settings", void 0);
      clear("file.settings");
    }
  } catch {
  }
  const gestures = /* @__PURE__ */ new Map();
  const move = (gestureId, preview) => {
    try {
      const commit = storeRecord?.commit;
      const set = storeRecord?.set;
      const name = `temp.drag.${gestureId}.placement`;
      const prior = gestures.get(gestureId);
      if (typeof commit === "function" && typeof set === "function") {
        if (prior?.minted !== true) {
          commit(name, preview);
          gestures.set(gestureId, { minted: true, erased: false });
        } else {
          set(name, preview);
        }
      }
    } catch {
    }
  };
  const release = (gestureId, final, sink) => {
    void gestureId;
    try {
      if (typeof final !== "number" || Number.isNaN(final)) return;
      const mem = tierRead("mem", "layout.pane.pane-a.size");
      if (mem.found) {
        const narrowed = clampToBounds(mem.value, readPaneBounds({}, "pane-a"));
        if (Number.isNaN(narrowed)) return;
      }
      if (typeof sink === "function") {
        ;
        sink.call(null, final);
      }
      const commit = storeRecord?.commit;
      if (typeof commit === "function") {
        commit("file.settings.pane.pane-a.size", final);
        commit("mem.layout.pane.pane-a.size", final);
      }
    } catch {
    }
  };
  const erasePreview = (gestureId) => {
    try {
      const prior = gestures.get(gestureId);
      if (prior?.erased === true) return;
      const remove = storeRecord?.remove;
      if (typeof remove === "function") {
        remove(`temp.drag.${gestureId}.placement`);
      }
      gestures.set(gestureId, { minted: prior?.minted === true, erased: true });
    } catch {
    }
  };
  return {
    /** §2.1 A (startSizeOf) — the store-backed size read. */
    startSizeOf: (element, token) => readPaneSize(element, token),
    /** §2.1 A (boundsOf) — the store-backed bounds read; the pair is handed through AS
     *  STORED, never a policy clamped here (M-3). */
    boundsOf: (element, token) => readPaneBounds(element, token),
    /** §2.1 A (defaultSizeFor) — the reset arm's read, the SAME size read at the reset
     *  turn (one closure). */
    defaultSizeFor: (element, token) => readPaneSize(element, token),
    /** §2.1 B (candidatesFor) — the candidate/slot read feeding the PURE `withinProximity`
     *  comparator: the candidate carries the OPAQUE stored slot and the STORED
     *  caller-measured distance; a zone whose reads MISS is admitted per the caller's own
     *  rule (no candidate) — never a store decision, never a throw (M-11, P-PD-IM-2). */
    candidatesFor: (element) => {
      const id = zoneIdOf(element);
      const slot = tierRead("mem", `layout.zone.${id}.slot`);
      if (!slot.found) return [];
      const distance = tierRead("mem", `layout.zone.${id}.distance`);
      return [{ candidate: slot.value, distance: distance.found ? distance.value : void 0 }];
    },
    move,
    release,
    rightClick: (gestureId) => erasePreview(gestureId),
    cancel: (gestureId) => erasePreview(gestureId)
  };
}
function createFocusCarrier(store) {
  if (store === void 0 || store === null || typeof store.resolve !== "function") {
    throw new Error("H1 U-STORE-FOCUS: createFocusCarrier requires the wired GraphStore argument");
  }
  try {
    const probe = store.resolve("mem.focus.entries");
    const cold = probe !== null && typeof probe === "object" && probe.status === "refused" && probe.reason === "undeclared-name";
    if (cold) {
      store.commit("mem.focus", void 0);
      store.clear("mem.focus");
    }
  } catch {
  }
  const holds = [];
  const forward = (event) => {
    void event;
  };
  try {
    holds.push(store.subscribe("mem.focus.entries", forward));
  } catch {
  }
  try {
    holds.push(store.subscribe("mem.focus.activeId", forward));
  } catch {
  }
  const persistTarget = (state) => {
    store.commit("mem.focus.entries", state.entries, { onRepeat: "edit" });
    return store.commit("mem.focus.activeId", state.activeId, { onRepeat: "edit" });
  };
  let released = false;
  return {
    /** THE MIRROR-STATE READ (`§2.3` item 3) — `{ entries, activeId }`, MISS/refusal
     *  consumed as the DECLARED EMPTY pair. */
    state: () => {
      const state = mirrorStateOf(store);
      return { entries: state.entries, activeId: state.activeId };
    },
    /** THE RE-HOMED ROUTE — the same answer shape the current `focusRoute` answers
     *  (`§2.5` item 3, BEHAVIOUR-PRESERVING). */
    focusRoute: (payload) => focusRouteImpl(store, payload),
    persistTarget,
    /** THE RELEASE — UNSUBSCRIBE-ON-DISPOSE (`§2.4` item 3): releases EXACTLY the wiring's
     *  registrations (each `unsubscribe()` called once, registration order), idempotent,
     *  non-throwing, emits NO store event, leaves the mirror's records in place (P1–P7). */
    dispose: () => {
      if (released) return;
      released = true;
      for (const handle of holds) {
        try {
          handle.unsubscribe();
        } catch {
        }
      }
    }
  };
}

// demo/pane-drag-demo/demo.ts
var MIN_ZONE_SIZE = 90;
var GHOST_OPACITY = 0.45;
var ZONES = ["zone-1", "zone-2", "zone-3"];
var INITIAL_PANES = [
  { id: "pane-a", title: "Pane A (notes)", zone: "zone-1", size: 160, bounds: { min: 60, max: 600 } },
  { id: "pane-b", title: "Pane B (search)", zone: "zone-2", size: 200, bounds: { min: 60, max: 600 } }
];
var activeGhostZone = null;
var activeGhostOpacity = 0;
var sinkCalls = 0;
var dragExpandedZone = null;
var userExpanded = /* @__PURE__ */ new Set();
function buildDemo() {
  const store = createGraphStore({
    declarations: { rows: [{ name: "layout" }, { name: "settings" }, { name: "drag" }] }
  });
  const panes = new Map(INITIAL_PANES.map((p) => [p.id, { ...p }]));
  const mintAll = () => {
    for (const p of panes.values()) {
      store.commit(`mem.layout.pane.${p.id}.size`, p.size, { onRepeat: "edit" });
      store.commit(`mem.layout.pane.${p.id}.bounds`, p.bounds, { onRepeat: "edit" });
    }
    store.commit("mem.layout.zone.zone-1.size", 160, { onRepeat: "edit" });
    store.commit("mem.layout.zone.zone-1.display", "normal", { onRepeat: "edit" });
    store.commit("mem.layout.zone.zone-2.size", 200, { onRepeat: "edit" });
    store.commit("mem.layout.zone.zone-2.display", "normal", { onRepeat: "edit" });
    store.commit("mem.layout.zone.zone-3.size", MIN_ZONE_SIZE, { onRepeat: "edit" });
    store.commit("mem.layout.zone.zone-3.display", "minimized", { onRepeat: "edit" });
    store.commit("mem.layout.zone.zone-1.slot", "doc-nav", { onRepeat: "edit" });
    store.commit("mem.layout.zone.zone-2.slot", "main", { onRepeat: "edit" });
    store.commit("mem.layout.zone.zone-3.slot", "collapsed", { onRepeat: "edit" });
  };
  mintAll();
  void zoneSizeConstraint(MIN_ZONE_SIZE, 600);
  void zoneSizeRepair(MIN_ZONE_SIZE, 600);
  let root2 = null;
  const zoneEl = (id) => root2?.querySelector(`[data-zone="${id}"] .pane-stack`) ?? null;
  const paint = () => {
    if (!root2) return;
    for (const z of ZONES) {
      const stack = zoneEl(z);
      if (!stack) continue;
      stack.textContent = "";
      const displayRaw = store.tiers.mem.get(
        `mem.layout.zone.${z}.display`
      );
      const display = displayRaw && displayRaw.found ? String(displayRaw.value ?? "") : "normal";
      const minimized = display === "minimized";
      for (const p of panes.values()) {
        if (p.zone !== z) continue;
        const frame = document.createElement("div");
        frame.className = "pane-frame";
        frame.setAttribute("data-pane-id", p.id);
        const head = document.createElement("div");
        head.className = "pane-head";
        const handle = document.createElement("div");
        handle.className = "pane-handle";
        handle.setAttribute("data-handle-for", p.id);
        const title = document.createElement("span");
        title.className = "pane-title";
        title.textContent = p.title;
        head.append(handle, title);
        if (minimized) {
          const tab = document.createElement("button");
          tab.className = "zone-tab";
          tab.setAttribute("data-tab-for", p.id);
          tab.textContent = p.title;
          stack.append(tab);
          continue;
        }
        const body = document.createElement("div");
        body.className = "pane-body";
        body.textContent = `content of ${p.title}`;
        frame.append(head, body);
        stack.append(frame);
      }
      const section = root2.querySelector(`[data-zone="${z}"]`);
      const tabs = stack.querySelectorAll(".zone-tab").length;
      if (section) {
        let expandBtn = section.querySelector("[data-expand-zone]");
        if (!expandBtn) {
          expandBtn = document.createElement("button");
          expandBtn.className = "zone-expand-btn";
          expandBtn.setAttribute("data-expand-zone", z);
          expandBtn.textContent = "\u25B8 expand";
          section.insertBefore(expandBtn, stack);
        }
        const collapsedNow = minimized && !dragExpandedZone && !userExpanded.has(z);
        if (collapsedNow) {
          section.classList.add("zone-minimized");
          if (tabs === 0) section.classList.add("zone-empty");
          else section.classList.remove("zone-empty");
          stack.style.display = tabs === 0 ? "none" : "flex";
          expandBtn.style.display = tabs === 0 ? "inline-block" : "none";
        } else {
          section.classList.remove("zone-minimized", "zone-empty");
          stack.style.display = "flex";
          expandBtn.style.display = "none";
        }
      }
    }
    if (activeGhostZone && root2) {
      const stack = zoneEl(activeGhostZone);
      if (stack) {
        const ghost = document.createElement("div");
        ghost.className = "pane-frame ghost";
        ghost.setAttribute("data-ghost-for", activeGhostZone);
        ghost.setAttribute("data-ghost-zone", activeGhostZone);
        const head = document.createElement("div");
        head.className = "pane-head";
        const handle = document.createElement("div");
        handle.className = "pane-handle";
        const title = document.createElement("span");
        title.className = "pane-title";
        title.textContent = "ghost \u2014 dragging";
        head.append(handle, title);
        ghost.append(head);
        ghost.style.opacity = String(activeGhostOpacity);
        stack.append(ghost);
      }
    }
  };
  const layoutFn = () => {
    paint();
  };
  const drag = createPaneDrag(store, { layout: layoutFn });
  let lastPlacementZone = null;
  const commitSink = (finalSize) => {
    sinkCalls += 1;
    window.__sinkTrace = window.__sinkTrace ?? [];
    window.__sinkTrace.push({ finalSize, at: Date.now() });
    window.__sinkSaw = sinkCalls;
    const pa = panes.get("pane-a");
    if (pa) {
      pa.size = finalSize;
      if (lastPlacementZone) pa.zone = lastPlacementZone;
      store.commit(`mem.layout.zone.${pa.zone}.display`, "normal", { onRepeat: "edit" });
    }
    mintAll();
    paint();
  };
  const mount = (el) => {
    root2 = el;
    paint();
    if (!root2) return;
    root2.addEventListener("pointerdown", (ev) => {
      const handle = ev.target?.closest?.(".pane-handle");
      const tab = ev.target?.closest?.(".zone-tab");
      const paneId = handle ? handle.getAttribute("data-handle-for") : tab ? tab.getAttribute("data-tab-for") : null;
      if (!paneId) return;
      const pane = panes.get(paneId);
      if (!pane) return;
      const gid = "demo-g1";
      drag.startSizeOf({ id: paneId }, null);
      drag.boundsOf({ id: paneId }, null);
      const zoneAtPoint = (x, y) => {
        const el2 = document.elementFromPoint(x, y);
        const via = el2?.closest?.(".zone") ?? null;
        const zEl = via?.getAttribute?.("data-zone");
        if (zEl && ZONES.includes(zEl)) return zEl;
        if (root2) {
          for (const z of ZONES) {
            const sec = root2.querySelector(`[data-zone="${z}"]`);
            if (!sec) continue;
            const r = sec.getBoundingClientRect();
            if (x >= r.left && x <= r.right && y >= r.top && y <= r.bottom) return z;
          }
        }
        return null;
      };
      const onMove = (e) => {
        try {
          const targetZone = zoneAtPoint(e.clientX, e.clientY) ?? e.target?.closest?.(".zone")?.getAttribute("data-zone");
          const zone = targetZone && ZONES.includes(targetZone) ? targetZone : pane.zone;
          const sizeRaw = store.tiers.mem.get(
            `mem.layout.zone.${zone}.size`
          );
          const expandedSize = sizeRaw && sizeRaw.found && typeof sizeRaw.value === "number" ? sizeRaw.value : 0;
          const canPlace = expandedSize >= MIN_ZONE_SIZE;
          const placement = { paneId, zone, ghostOpacity: GHOST_OPACITY, storeSize: expandedSize, canPlace };
          drag.move(gid, placement);
          lastPlacementZone = zone;
          activeGhostZone = canPlace ? zone : null;
          activeGhostOpacity = GHOST_OPACITY;
          dragExpandedZone = canPlace ? zone : null;
          paint();
          window.__dragTrace = window.__dragTrace ?? [];
          window.__dragTrace.push({ zone, x: e.clientX, y: e.clientY, canPlace, expandedSize });
        } catch (err) {
          window.__dragTrace = window.__dragTrace ?? [];
          window.__dragTrace.push({ err: String(err) });
        }
      };
      const onUp = () => {
        cleanup();
        dragExpandedZone = null;
        try {
          drag.release(gid, pane.size, commitSink);
          window.__upTrace = { ok: true, final: pane.size, sinkCalls, lastZone: lastPlacementZone };
        } catch (err) {
          window.__upTrace = { ok: false, err: String(err), final: pane.size };
        }
        activeGhostZone = null;
        activeGhostOpacity = 0;
        paint();
      };
      const onCancel = () => {
        cleanup();
        dragExpandedZone = null;
        drag.rightClick(gid);
        activeGhostZone = null;
        activeGhostOpacity = 0;
        paint();
      };
      const onCtx = (e) => {
        e.preventDefault();
        onCancel();
      };
      const cleanup = () => {
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerup", onUp);
        window.removeEventListener("pointercancel", onCancel);
        window.removeEventListener("contextmenu", onCtx);
      };
      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp);
      window.addEventListener("pointercancel", onCancel);
      window.addEventListener("contextmenu", onCtx);
    });
    for (const z of ZONES) {
      const sect = root2.querySelector(`[data-zone="${z}"]`);
      if (!sect) continue;
      const btn = sect.querySelector("[data-expand-zone]");
      if (!btn) continue;
      btn.addEventListener("click", () => {
        if (userExpanded.has(z)) {
          userExpanded.delete(z);
        } else {
          userExpanded.add(z);
        }
        paint();
      });
    }
    const gutterEl = root2.querySelector("#gutter");
    if (gutterEl) {
      const ggid = "gutter-g1";
      window.__gutterTrace = window.__gutterTrace ?? [];
      window.__gutterAttached = true;
      applyGutterLayout();
      gutterEl.addEventListener("pointerdown", (ev) => {
        window.__gutterTrace.push({ ev: "down", x: ev.clientX, y: ev.clientY });
        ev.preventDefault();
        const startX = ev.clientX;
        const startSize = gutterFileValue ?? 200;
        const onMove = (e) => {
          window.__gutterTrace.push({ ev: "move", x: e.clientX });
          window.__gutterMoves = (window.__gutterMoves ?? 0) + 1;
          const delta = e.clientX - startX;
          const preview = Math.max(40, Math.min(600, startSize + delta));
          gutter.resize(ggid, preview);
          gutterSizeReadout(preview);
        };
        const onUp = (e) => {
          cleanupG();
          const delta = e.clientX - startX;
          const final = Math.max(40, Math.min(600, startSize + delta));
          gutter.release(ggid, final);
          gutterSizeReadout(final);
        };
        const onCtx = (e) => {
          e.preventDefault();
          cleanupG();
          gutter.reset(ggid);
          gutterSizeReadout(gutterFileValue ?? 200);
        };
        const cleanupG = () => {
          window.removeEventListener("pointermove", onMove);
          window.removeEventListener("pointerup", onUp);
          window.removeEventListener("pointercancel", cleanupG);
          window.removeEventListener("contextmenu", onCtx);
        };
        window.addEventListener("pointermove", onMove);
        window.addEventListener("pointerup", onUp);
        window.addEventListener("pointercancel", cleanupG);
        window.addEventListener("contextmenu", onCtx);
      });
    }
  };
  const gutterSizeReadout = (size) => {
    const el = root2?.querySelector('[data-size-for="pane-a"]');
    if (el) el.textContent = `gutter size: ${size}`;
  };
  const GUTTER_FILE = "file.settings.pane.zone-2.size";
  const GUTTER_TEMP = (gid) => `temp.drag.${gid}.placement`;
  let gutterTempValue = null;
  let gutterFileValue = null;
  const mintGutterFile = () => {
    store.commit(GUTTER_FILE, 200, { onRepeat: "edit" });
    gutterFileValue = 200;
  };
  mintGutterFile();
  const applyGutterLayout = () => {
    const el = root2;
    if (!el) return;
    const active = gutterTempValue ?? gutterFileValue ?? 200;
    el.style.gridTemplateColumns = `220px ${active}px 10px minmax(0, 1fr)`;
    const readout = root2?.querySelector('[data-size-for="pane-a"]');
    if (readout) readout.textContent = `zone-2 size: ${active}`;
  };
  const gutter = {
    resize(gid, preview) {
      store.commit(GUTTER_TEMP(gid), preview, { onRepeat: "edit" });
      gutterTempValue = preview;
      applyGutterLayout();
    },
    reset(gid) {
      store.remove(GUTTER_TEMP(gid));
      gutterTempValue = null;
      applyGutterLayout();
    },
    release(gid, final) {
      store.commit(GUTTER_FILE, final, { onRepeat: "edit" });
      store.remove(GUTTER_TEMP(gid));
      gutterFileValue = final;
      gutterTempValue = null;
      applyGutterLayout();
    }
  };
  return {
    store,
    drag,
    commitSink,
    gutter,
    read: {
      paneSize: (id) => panes.get(id)?.size ?? 0,
      zoneSize: (id) => {
        const r = store.tiers.mem.get(
          `mem.layout.zone.${id}.size`
        );
        return r && r.found && typeof r.value === "number" ? r.value : 0;
      },
      zoneDisplay: (id) => {
        const r = store.tiers.mem.get(
          `mem.layout.zone.${id}.display`
        );
        return r && r.found && typeof r.value === "string" ? r.value : "normal";
      },
      ghostPresent: () => activeGhostZone !== null,
      ghostOpacity: () => activeGhostZone ? activeGhostOpacity : null,
      sinkCalls: () => sinkCalls,
      paneZone: (id) => panes.get(id)?.zone ?? null,
      gutterSize: (id) => store.tiers.mem.get(
        `mem.layout.zone.${id}.size`
      ) ?? 200,
      gutterTemp: (gid) => {
        const r = store.tiers.temp.get(
          GUTTER_TEMP(gid)
        );
        return r && r.found && typeof r.value === "number" ? r.value : null;
      },
      gutterFile: () => gutterFileValue
    },
    root: root2,
    mount
  };
}

// demo/pane-drag-demo/demo-entry.ts
var root = document.getElementById("app");
if (!root) throw new Error("no #app root");
var demo = buildDemo();
demo.mount(root);
var evCounts = { down: 0, move: 0, up: 0, ctx: 0 };
window.addEventListener("pointerdown", (e) => {
  evCounts.down += 1;
  window.__lastDown = { target: e.target?.className ?? e.target?.toString?.() ?? "", handle: !!e.target?.closest?.(".pane-handle") };
});
window.addEventListener("pointermove", () => {
  evCounts.move += 1;
});
window.addEventListener("pointerup", () => {
  evCounts.up += 1;
});
window.addEventListener("contextmenu", (e) => {
  evCounts.ctx += 1;
});
window.__pgdemo = {
  store: demo.store,
  drag: demo.drag,
  read: demo.read,
  evCounts: () => ({ ...evCounts }),
  storeSummary: () => {
    return {
      paneASize: demo.read.paneSize("pane-a"),
      zone3Size: demo.read.zoneSize("zone-3"),
      zone3Display: demo.read.zoneDisplay("zone-3"),
      ghost: demo.read.ghostPresent(),
      ghostOpacity: demo.read.ghostOpacity(),
      sinkCalls: demo.read.sinkCalls()
    };
  }
};
