// demo/pane-drag-demo/demo.mjs — GENERATED FILE, DO NOT EDIT (D-118).
// The source is demo/pane-drag-demo/demo.ts (plus stub-view.ts) and every app module it imports from src/; the bundler is esbuild.
// Rebuild:  node demo/pane-drag-demo/build.mjs
// Verify:   node demo/pane-drag-demo/build.mjs --check
// The @source lines below are the bundle's PROVENANCE: one sha256 per input, sorted by path, plus the digest of the
// generated body itself. A source that moved, an import that appeared, or a hand-edited body makes --check exit 1
// and the suite's DB-1 row red.
// @generated-by demo/pane-drag-demo/build.mjs
// @source-count 39
// @body-sha256 92232cb71a4996da84d0b0de11ff3ce8f27a451926480fe7b5e2865ebbd7ce6d
// @source b9d0892225756daaaef6b40b5cf27eb1aa69c19e3b96252aa57d085797204324 demo/pane-drag-demo/build.mjs
// @source b6f960a27fdf571a26992b061d9f3e2aa604847e5c668c52869bf40a84bda70c demo/pane-drag-demo/demo.ts
// @source a3cdc0510a78080e253b5df3cef4e30c103296990063a644a29a80f7f58c2bc7 demo/pane-drag-demo/stub-view.ts
// @source 75b6817e000498d6d9b5eb36d74def28d20202c5ce1af4ee155e2b99bfbe87fe node_modules/provident-ssr/dist/core/adapters.js
// @source 4bd7c4c2528b8422835abd1ee4e3e51bab329691aac63d25e78933240d594f04 node_modules/provident-ssr/dist/core/body-runs.js
// @source d399540bae257c5a3775132148d06867e9169265bfbd2eec98aee6504c7fa1bb node_modules/provident-ssr/dist/core/client.js
// @source 576df50e0045ac9e62ae82a742696e6e2fd27c7a0a4595c5d85bd6c8f7e8ba5d node_modules/provident-ssr/dist/core/constants.js
// @source 569b4e100020edec7f18d77c6a15b57b49aeab12472a767ce06919a91549caf5 node_modules/provident-ssr/dist/core/debug.js
// @source d6102419e8741d7c6b3c060230a927d202b9a54e829c710ae029c836c393173a node_modules/provident-ssr/dist/core/derived.js
// @source 208bb66e902bd24040ff3b80dec1604d280047ae0f9446cfe006a0577221bde0 node_modules/provident-ssr/dist/core/errors.js
// @source da5227768bf8e479b665f7dae404cdfb5826d3ff79e73538d32bcca8036ea81c node_modules/provident-ssr/dist/core/events.js
// @source 1ffd59d7b4b8e6c23215eeaf63c1289e4081c70a982c46b6fb73a6c1990c46dc node_modules/provident-ssr/dist/core/handlers.js
// @source 1bebb4158fd7877f251614b4479ceea93e368cb4bc9c03a37347792bb5b95b25 node_modules/provident-ssr/dist/core/legacy-handlers.js
// @source 124948e95a6564037fd42b2877baf6e57a3fac621a7e8c2b82358153e99a5bac node_modules/provident-ssr/dist/core/link.js
// @source fd4fca0d64eee6b5057bf727a6d97843d90cc0ca07258f65d9668fadae5f4cf1 node_modules/provident-ssr/dist/core/node.js
// @source a1cdf3fc863cb37cbbf03677bcb529d51d8f5cb461d7ce085100b833451dc2db node_modules/provident-ssr/dist/core/ops.js
// @source 1460ed89d1e616eb83a6ce87d1088a2dd2dbee5d180ab591061893d9bfe2467c node_modules/provident-ssr/dist/core/payload.js
// @source 62a44a3d7cf59c75281263670a112d8654cc8ae2ff1c89ec6e668d4f850ea384 node_modules/provident-ssr/dist/core/registry.js
// @source 963a331c965e94bbc26f8bde7c52d0f67466bf845564b06300e68ca31ae58c1a node_modules/provident-ssr/dist/core/render-helpers.js
// @source e8de0718c7135710682eca323fa829b1e80f21143d088b3c844e349dbf17d5e1 node_modules/provident-ssr/dist/core/render.js
// @source 5ffebbd57730b298d1c9bdea7d2a73b89198b0e172aa48bf79e09b4d1bd690f6 node_modules/provident-ssr/dist/core/resolve.js
// @source 38114ca352460cd3bda050f040a7063bdde8a7f34b2da1b049136d926dcd8f3d node_modules/provident-ssr/dist/core/serialize.js
// @source 5335b01539142909f13f2be3edcb8db4e5177a58029cc9d6442a2d201f110b71 node_modules/provident-ssr/dist/core/supervisor.js
// @source f013eddddf91649ea6bc68dcba43b29d815c5c998d56e2a6f55f1328fba33ed5 node_modules/provident-ssr/dist/core/translate.js
// @source bb13de7bf36aee1ce3774654851711d4890a1b696a06f4c92440c06d21b75189 node_modules/provident-ssr/dist/core/validation.js
// @source 51d0de26c97b41b0976c3c011c8c74b51b7e674107124e46b6d70560e408e57b node_modules/provident-ssr/dist/index.js
// @source eabf4c62fe382ad327e362872700106e460c15ebda1608142104025366069be8 src/renderer/module-client.ts
// @source e4ad238f4a273b055f6f0edbb4637b47ae8f164ae43df439b754125c09db10d3 src/renderer/renderer.ts
// @source 7815658c5a9687d6dd7ee4f47b8fa40827440dd9b0b97b7a754e70cab013e797 src/renderer/runtime.ts
// @source 64c60c5c62a8e77c6515f0e323fd2e044ef02d77187f6e095f4a67a961c2dcb5 src/renderer/secure-panels.ts
// @source bbdfae90fd2190eb71c9f3b5b909b401f36be67872f88bd42820b1753608c8a4 src/renderer/security-client.ts
// @source f83e54243983045a2eaee0c86d7c77d636b9976792d30d3d35f41f48f3194745 src/renderer/tabs-client.ts
// @source 4d84ef0852ec03bdb0de54150254b91161eb24df3d5022a61fd4f80cc92eac0d src/renderer/view-client.ts
// @source 9cab75ffd47d4d56c62b7d89eff7365130b17eedae8a0a5de1f13e93062deba2 src/shared/demo-envelope.ts
// @source 5b7830e578400652386405ccc2a56da623f5ad428f999eefdd4f0a4abde29754 src/shared/gesture-session.ts
// @source a334e345cc61c48ba095269a0e04cf81825e452b8f913afaf66a92b3c0c8a356 src/shared/gutter-affordance.ts
// @source 260559b259261d0a6826037788a74ed5b1180bac213c9ac459f8acbd0c7a6ab3 src/shared/gutter.ts
// @source 40138fcc97cf13306712cc8ebf36a081302915b240ec87ff76cbafb83f898194 src/shared/overlay.ts
// @source 1fb30754440dd8033cc46955a3c4c8380a2fde2d43aa2cab8dfe12427dcf9136 src/shared/view-shape.ts
// @end-sources
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
    const handle2 = {
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
        return handle2;
      }
    };
    return handle2;
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
  const session2 = readMember2(options, "session");
  const seamAxis = readMember2(options, "axisFor");
  const seamBounds = callableMember(options, "boundsFor");
  const seamDefault = callableMember(options, "defaultSizeFor");
  const seamResizable = callableMember(options, "isResizable");
  const seamSize = callableMember(options, "sizeFor");
  const commit = callableMember(options, "commit");
  const inert = !usableSession(session2);
  const entries = [];
  const counters = { attached: 0, gestures: 0, sinkCalls: 0, written: 0, resets: 0, lastCode: "ok" };
  let ended = false;
  const sessionEnded = () => readMember2(session2, "disposed") === true;
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
  const write2 = (gesture, narrowed, reset2) => {
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
            write2(gesture, narrowed, suppliedSet);
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
    const installer = callableMember(session2, "install");
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
      installed = Boolean(installer.call(session2, element, wrapped));
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
    const closer = callableMember(session2, "dispose");
    if (closer === null) return false;
    let report;
    try {
      report = closer.call(session2);
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
    const terminal = callableMember(session2, "reset");
    if (terminal === null) return refusal("no-gesture");
    const before = counters.written;
    entry.narrowed = narrowed;
    entry.narrowedSet = true;
    entry.spent = false;
    let answer;
    try {
      answer = terminal.call(session2, element, gesture, narrowed);
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
  const session2 = read("session");
  const source2 = read("source");
  const element = read("element");
  const sizeFromPointer = read("sizeFromPointer");
  const pointerOf = read("pointerOf");
  const moveTypeOf = read("moveTypeOf");
  const axisOf = read("axisOf");
  const cursorOf = read("cursorOf");
  const applyPreview2 = read("applyPreview");
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
    if (typeof applyPreview2 !== "function") return;
    counters.previews += 1;
    applyPreview2(state);
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
    session: session2,
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
    const take = source2 === null || source2 === void 0 ? void 0 : source2["on"];
    if (typeof take !== "function") return false;
    try {
      ;
      source2.on(element, type, handler);
    } catch {
      return false;
    }
    listeners.push({ type, handler });
    return true;
  };
  const removeOwnListeners = () => {
    const give = source2 === null || source2 === void 0 ? void 0 : source2["off"];
    for (const listener of listeners) {
      if (typeof give !== "function") break;
      try {
        ;
        source2.off(element, listener.type, listener.handler);
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

// src/shared/demo-envelope.ts
var GUTTER_CURSORS = { "gutter-vertical": "col-resize", "gutter-horizontal": "row-resize" };
var GUTTER_MOVE_TYPE = void 0;
var GUTTER_AFFORDANCE_ID = "gutter-vertical";
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

// src/renderer/secure-panels.ts
var GROUP_LABELS = {
  read: "read (get_rendered_html, get_markdown, list_targets, get_node_state, code.get, code.validate)",
  dispatch: "dispatch (synthetic event driving)",
  graph: "graph (load, op, export, validate, teardown)",
  code: "code (code.set/create/delete/load \u2014 evaluates handler bodies)",
  module: "module (module.install/update/list + module:<name>.<tool> extensions \u2014 trusted-equivalent to code)",
  data: "data (data.read/write/delete/list/journal \u2014 the central store)"
};
var GROUPS = Object.keys(GROUP_LABELS);

// src/shared/view-shape.ts
var DEFAULT_PANE_ID = "pane-a";
var DEFAULT_PANE_SIZE = 100;
var DEFAULT_PANE_BOUNDS = { min: 0, max: 200 };
var defaultPaneGeometry = (id) => ({
  id,
  size: DEFAULT_PANE_SIZE,
  bounds: { min: DEFAULT_PANE_BOUNDS.min, max: DEFAULT_PANE_BOUNDS.max }
});
var paneGeometryIn = (panes, id) => {
  const held = panes.find((pane) => pane.id === id);
  return held === void 0 ? { status: "committed", pane: defaultPaneGeometry(id), source: "default" } : {
    status: "committed",
    pane: { id: held.id, size: held.size, bounds: { min: held.bounds.min, max: held.bounds.max } },
    source: "record"
  };
};
var zoneIn = (zones, id) => {
  const held = zones.find((zone2) => zone2.id === id);
  if (held === void 0) return null;
  const zone = { id: held.id };
  if (held.slot !== void 0) zone.slot = held.slot;
  if (held.distance !== void 0) zone.distance = held.distance;
  if (held.size !== void 0) zone.size = held.size;
  if (held.display !== void 0) zone.display = held.display;
  return zone;
};

// src/renderer/renderer.ts
function dataRoute(verb, payload) {
  const member = typeof window === "undefined" ? void 0 : window.provident?.data;
  if (member === void 0) {
    return Promise.resolve({
      status: "refused",
      reason: "store-unreachable",
      message: "no `data` member on the preload bridge: this realm has no route to the profile register, so no store was consulted"
    });
  }
  switch (verb) {
    case "read":
      return member.read(payload);
    case "write":
      return member.write(payload);
    case "delete":
      return member.delete(payload);
    case "list":
      return member.list(payload);
    case "journal":
      return member.journal(payload);
  }
}
if (false) {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => void main());
  } else {
    void main();
  }
}
function createPaneDrag(backing, source2) {
  const backingRecord = backing ?? null;
  const view = backingRecord?.view ?? null;
  const ghostTarget = backingRecord?.ghostTarget ?? null;
  const sourceRecord = source2 ?? null;
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
  const zoneOf = (id) => {
    if (view === null) return null;
    return view.zoneOf(id);
  };
  const renderZone = () => {
    const layout = sourceRecord?.layout;
    if (typeof layout !== "function") return;
    try {
      const zone = zoneOf("zone-1");
      layout("zone-1", zone?.size, zone?.display);
    } catch {
    }
  };
  const gestures = /* @__PURE__ */ new Map();
  const move = (key, preview) => {
    try {
      const size = preview?.value;
      if (typeof size !== "number" || !Number.isFinite(size) || size < 0) return;
      gestures.set(key, { erased: false });
      if (view !== null) view.commitDrag(DEFAULT_PANE_ID, { size });
    } catch {
    }
  };
  const readPaneSize = (element, token) => {
    const id = paneIdOf(element, token);
    const measured = defaultPaneGeometry(id).size;
    if (view === null) return measured;
    try {
      return view.paneSizeOf(id);
    } catch {
      return measured;
    }
  };
  const readPaneBounds = (element, token) => {
    const id = paneIdOf(element, token);
    const measured = defaultPaneGeometry(id).bounds;
    const fallback = { min: measured.min, max: measured.max };
    if (view === null) return fallback;
    try {
      return view.paneBoundsOf(id);
    } catch {
      return { min: fallback.min, max: fallback.max };
    }
  };
  const release = (gestureId, final, sink) => {
    try {
      if (typeof final !== "number" || Number.isNaN(final)) return;
      const standing = readPaneSize({}, DEFAULT_PANE_ID);
      if (typeof standing === "number" && Number.isFinite(standing)) {
        const narrowed = clampToBounds(standing, readPaneBounds({}, DEFAULT_PANE_ID));
        if (Number.isNaN(narrowed)) return;
      }
      if (typeof sink === "function") {
        ;
        sink.call(null, final);
      }
      if (view !== null) view.commitPane(DEFAULT_PANE_ID, { size: final });
      endReading(gestureId);
    } catch {
    }
  };
  const endReading = (key) => {
    try {
      const prior = gestures.get(key);
      if (prior?.erased === true) return;
      gestures.set(key, { erased: true });
      if (view !== null) view.clearDrag();
    } catch {
    }
  };
  let ghostEpoch = 0;
  const clearGhost = () => {
    try {
      const holder = ghostTarget;
      if (holder === null || holder === void 0) return;
      if (typeof holder.removeAttribute !== "function") return;
      holder.removeAttribute.call(holder, "data-ghost");
    } catch {
    }
  };
  const settleGhost = (epoch, answer) => {
    if (epoch !== ghostEpoch) return;
    try {
      const record = answer;
      const node = record !== null && record !== void 0 && typeof record === "object" && record.status === "read" ? record.value : null;
      if (node === null || typeof node !== "object" || Array.isArray(node)) {
        clearGhost();
        return;
      }
      const branch = node;
      if (branch["_tier"] !== "temp") {
        clearGhost();
        return;
      }
      const member = branch[DEFAULT_PANE_ID];
      if (member === null || typeof member !== "object" || Array.isArray(member)) {
        clearGhost();
        return;
      }
      const carried = member.size;
      const size = carried !== null && typeof carried === "object" && !Array.isArray(carried) ? carried.value : carried;
      if (typeof size !== "number" || !Number.isFinite(size) || size < 0) {
        clearGhost();
        return;
      }
      const holder = ghostTarget;
      if (holder === null || holder === void 0 || typeof holder.setAttribute !== "function") return;
      holder.setAttribute.call(holder, "data-ghost", "temp");
    } catch {
      clearGhost();
    }
  };
  const renderGhost = () => {
    ghostEpoch += 1;
    const epoch = ghostEpoch;
    try {
      void dataRoute("read", { path: ["drag"] }).then(
        (answer) => {
          settleGhost(epoch, answer);
        },
        () => {
          settleGhost(epoch, null);
        }
      );
    } catch {
      clearGhost();
    }
  };
  return {
    /** §2.1 A (startSizeOf) — the shape's size read. */
    startSizeOf: (element, token) => readPaneSize(element, token),
    /** §2.1 A (boundsOf) — the shape's bounds read; the pair is handed through AS
     *  STORED, never a policy clamped here (M-3). */
    boundsOf: (element, token) => readPaneBounds(element, token),
    /** §2.1 A (defaultSizeFor) — the reset arm's read, the SAME size read at the reset
     *  turn (one closure). */
    defaultSizeFor: (element, token) => readPaneSize(element, token),
    /** §2.1 B (candidatesFor) — THE CANDIDATE PRODUCTION SEAM, AND IT IMPLEMENTS **THE SEAM SHAPE `src/shared/relocate.ts`
     *  DECLARES WITHOUT IMPORTING IT** (`CandidateFor`, `{readonly candidate, readonly distance?}`), which is what this
     *  surface's own docblock above already says. **NO `src/` FILE IMPORTS THAT MODULE**, so the pure comparator there has
     *  no call site here and none is claimed: the record is produced and handed on by identity and the comparison is the
     *  caller's — the only importer in the tree is a battery's own drive (`D-111`). **NOW OFF THE SHAPE'S `['zones']`
     *  FAMILY** (`D-92`): the candidate carries the zone's OPAQUE `slot` and its caller-measured `distance`, and a zone
     *  whose `slot` the family does not name is admitted per the caller's own rule (no candidate) — never a store
     *  decision, never a throw (M-11, P-PD-IM-2). **`slot` IS OPAQUE AND IS HANDED THROUGH BY IDENTITY.** */
    candidatesFor: (element) => {
      try {
        const id = zoneIdOf(element);
        const zone = zoneOf(id);
        if (zone === null || zone.slot === void 0) return [];
        return [{ candidate: zone.slot, distance: zone.distance }];
      } catch {
        return [];
      }
    },
    move,
    release,
    rightClick: (gestureId) => endReading(gestureId),
    cancel: (gestureId) => endReading(gestureId),
    renderZone,
    renderGhost
  };
}

// demo/pane-drag-demo/stub-view.ts
var ZONES = [];
var DRAG_ADDRESS = ["drag"];
var copyOf = (pane) => ({
  id: pane.id,
  size: pane.size,
  bounds: { min: pane.bounds.min, max: pane.bounds.max }
});
function createStubView() {
  const family = /* @__PURE__ */ new Map();
  const logged = [];
  let dragFamily = null;
  const drag2 = () => {
    const standing = dragFamily;
    return {
      address: [...DRAG_ADDRESS],
      present: standing !== null,
      members: standing === null ? [] : [...standing.entries()].map(([id, size]) => ({ id, size }))
    };
  };
  const panes = () => [...family.values()].map(copyOf);
  const seed = (id) => {
    family.set(id, copyOf(paneGeometryIn([], id).pane));
  };
  seed(DEFAULT_PANE_ID);
  const setSize = (id, size) => {
    const held = family.get(id);
    const base = held === void 0 ? paneGeometryIn([], id).pane : copyOf(held);
    family.set(id, { id: base.id, size, bounds: { min: base.bounds.min, max: base.bounds.max } });
  };
  const setBounds = (id, bounds) => {
    const held = family.get(id);
    const base = held === void 0 ? paneGeometryIn([], id).pane : copyOf(held);
    family.set(id, { id: base.id, size: base.size, bounds: { min: bounds.min, max: bounds.max } });
  };
  const reset = (id) => {
    if (id === void 0) {
      family.clear();
      seed(DEFAULT_PANE_ID);
      return;
    }
    family.set(id, paneGeometryIn([], id).pane);
  };
  const members = {
    /** **THE DRAG'S SIZE READ** — `paneGeometryIn`'s answer, exactly as `readPaneSize` reads it off the real client. */
    paneSizeOf(id) {
      return paneGeometryIn(panes(), id).pane.size;
    },
    /** **THE DRAG'S BOUNDS READ** — the pair as stored; a pane the family does not name gets the measured default pair. */
    paneBoundsOf(id) {
      const pane = paneGeometryIn(panes(), id).pane;
      return { min: pane.bounds.min, max: pane.bounds.max };
    },
    /** **THE ZONE READ** — `zoneIn`'s measured missing arm: `null`, never an invented geometry (`D-91`). */
    zoneOf(id) {
      return zoneIn(ZONES, id);
    },
    /** **THE ROUTE THE RELEASE WRITES THROUGH** — see this file's header: composed here, answered as the client answers. */
    commitPane(id, geometry) {
      const record = geometry ?? null;
      const size = record !== null && record !== void 0 && typeof record.size === "number" ? record.size : void 0;
      if (typeof size === "number" && Number.isFinite(size)) setSize(id, size);
      logged.push({ id, geometry });
      return { status: "sent" };
    },
    /** **THE DRAG'S MOVE ROUTE — ONE WHOLE VALUE THE CALLER FORMATTED** (`D-132`, `D-135`, `D-136`): the placement the
     *  composition's `move` read, `{size}`, written as the family's single member because the composition drags one pane.
     *  A pair its own shape arms cannot read (no id, a size that is not a finite non-negative number) writes NOTHING and
     *  leaves what stands standing — the crossing's judgement, answered here from the same two facts and added to. */
    commitDrag(id, geometry) {
      const record = geometry ?? null;
      const size = record === null || record === void 0 ? void 0 : record.size;
      if (id.length > 0 && typeof size === "number" && Number.isFinite(size) && size >= 0) {
        dragFamily = /* @__PURE__ */ new Map([[id, size]]);
      }
      return { status: "sent" };
    },
    /** **THE DRAG'S END — THE FAMILY IS DELETED WHOLE** (`D-132`, `D-140`): the act carries NO argument, and the address
     *  answers absent afterwards whether or not it stood — never a placeholder written to stand in for a gesture's end. */
    clearDrag() {
      dragFamily = null;
      return { status: "sent" };
    }
  };
  return {
    members,
    panes,
    drag: drag2,
    geometryOf: (id) => paneGeometryIn(panes(), id),
    setSize,
    setBounds,
    reset,
    writes: () => [...logged]
  };
}

// demo/pane-drag-demo/demo.ts
var app = document.getElementById("app");
if (app === null) throw new Error("demo: the page carries no #app root");
var handleHolder = document.querySelector("[data-gutter-handle]");
var targetHolder = document.querySelector("[data-gutter-target]");
var statusHolder = document.getElementById("gutter-status");
var paneWidthNode = document.getElementById("pane-width");
var stubReadingNode = document.getElementById("stub-reading");
var dragReadingNode = document.getElementById("drag-reading");
var zoneReadingNode = document.getElementById("zone-reading");
if (handleHolder === null) throw new Error("demo: the page carries no [data-gutter-handle]");
if (targetHolder === null) throw new Error("demo: the page carries no [data-gutter-target]");
if (statusHolder === null) throw new Error("demo: the page carries no #gutter-status (the release SINK)");
var handle = handleHolder;
var target = targetHolder;
var statusNode = statusHolder;
var stub = createStubView();
var source = domEventSource();
var drag = createPaneDrag({ view: stub.members }, source);
var session = createGestureSession({
  source,
  commit: () => void 0
});
var seams = gutterSeamExample();
var pressX = 0;
handle.addEventListener("pointerdown", (event) => {
  pressX = event.clientX;
  try {
    handle.setPointerCapture(event.pointerId);
  } catch {
  }
});
var observed = {
  starts: [],
  boundsReads: [],
  releases: [],
  sinkWrites: [],
  previews: 0,
  lastPreview: null,
  attachRefusals: 0
};
var write = (value) => {
  const carried = typeof value === "string" ? value : String(value);
  observed.sinkWrites.push(value);
  statusNode.textContent = `release: committed ${carried}`;
  renderReadouts();
};
var gestureIdOf = (gesture) => {
  const held = gesture?.id;
  return typeof held === "string" ? held : "";
};
var GESTURE_KEY = gestureIdOf(handle);
var applyPreview = (state) => {
  const held = state;
  const value = held?.value;
  if (typeof value !== "number" || !Number.isFinite(value)) return;
  observed.previews += 1;
  observed.lastPreview = { value, token: held?.token, valid: held?.valid === true, resizable: held?.resizable === true };
  target.style.width = `${String(value)}px`;
  if (held?.valid === true) drag.move(GESTURE_KEY, state);
  if (held?.valid === false) drag.cancel(GESTURE_KEY);
  renderReadouts();
};
var affordance = createGutterAffordance({
  session,
  source,
  element: handle,
  target,
  /** THE DEMO'S MAPPING — see this file's header: `start + (pointer.x − pressX)`, so a drag of `dx` changes the size by `dx`. */
  sizeFromPointer: (pointer, start) => start + (pointer.x - pressX),
  pointerOf: seams.pointerOf,
  axisOf: seams.axisOf,
  /** THE DEMO'S CURSOR TABLE, keyed by the token the example's `axisOf` answers for THIS handle (`pane-a`). */
  cursorOf: (token) => ({ cursor: token === DEFAULT_PANE_ID ? "col-resize" : void 0 }),
  applyPreview,
  applyCursor: seams.applyCursor,
  startSizeOf: (element, token) => {
    const answer = drag.startSizeOf(element, token);
    observed.starts.push(answer);
    renderReadouts();
    return answer;
  },
  boundsOf: (element, token) => {
    const answer = drag.boundsOf(element, token);
    observed.boundsReads.push(answer);
    renderReadouts();
    return answer;
  },
  resizableOf: seams.resizableOf,
  moveTypeOf: () => POINTER_TYPES.move,
  /** **THE SINGLE SINK WRITER IS `release`** (`D-117`): the sink first (this page's status node), then the route. */
  commit: (gesture, value) => {
    observed.releases.push({ value, gestureId: gestureIdOf(gesture) });
    drag.release(gestureIdOf(gesture), value, write);
    renderGeometry();
    renderReadouts();
  }
});
if (!affordance.attach()) {
  observed.attachRefusals += 1;
  throw new Error("demo: the gutter affordance REFUSED to attach \u2014 the pane drag is inert");
}
var geometryOfPane = () => stub.geometryOf(DEFAULT_PANE_ID);
function renderGeometry() {
  const geometry = geometryOfPane();
  target.style.width = `${String(geometry.pane.size)}px`;
  if (paneWidthNode !== null) {
    paneWidthNode.textContent = `${String(geometry.pane.size)}px \xB7 bounds {${String(geometry.pane.bounds.min)}, ${String(geometry.pane.bounds.max)}}`;
  }
}
function renderReadouts() {
  const geometry = geometryOfPane();
  const unnamed = stub.geometryOf("pane-unknown");
  if (stubReadingNode !== null) {
    stubReadingNode.textContent = [
      `stub shape for ['panes'] \u2014 the demo's stand-in for the view record (no bridge on this page)`,
      `  pane-a        size=${String(geometry.pane.size)}  bounds={min:${String(geometry.pane.bounds.min)}, max:${String(geometry.pane.bounds.max)}}  source='${geometry.source}'`,
      `  pane-unknown  size=${String(unnamed.pane.size)}  bounds={min:${String(unnamed.pane.bounds.min)}, max:${String(unnamed.pane.bounds.max)}}  source='${unnamed.source}'  (the measured default, D-87)`,
      `  route         commitPane calls=${String(stub.writes().length)}  ${JSON.stringify(stub.writes())}`
    ].join("\n");
  }
  if (dragReadingNode !== null) {
    const sessionStats = session.stats();
    const affordanceStats = affordance.stats();
    const controllerStats = affordance.controller.stats();
    const lastStart = observed.starts.length === 0 ? "\u2014" : JSON.stringify(observed.starts[observed.starts.length - 1]);
    const lastBounds = observed.boundsReads.length === 0 ? "\u2014" : JSON.stringify(observed.boundsReads[observed.boundsReads.length - 1]);
    dragReadingNode.textContent = [
      `the gesture (every figure below is the app module's own counter)`,
      `  start read by the composition   ${lastStart}   (bounds ${lastBounds})`,
      `  session     ${JSON.stringify(sessionStats)}`,
      `  affordance  ${JSON.stringify(affordanceStats)}`,
      `  controller  ${JSON.stringify(controllerStats)}`,
      `  preview     ${JSON.stringify(observed.lastPreview)}   previews written=${String(observed.previews)}`,
      `  address     ['drag'] = ${JSON.stringify(stub.drag())}   (the composition's ONE write per move and its ending's delete, read at the address the record holds it \u2014 D-132: the surface keeps no member for it)`,
      `  releases    ${JSON.stringify(observed.releases)}   sink writes=${JSON.stringify(observed.sinkWrites)}`
    ].join("\n");
  }
  if (zoneReadingNode !== null) {
    zoneReadingNode.textContent = [
      `the zone family this page does not have`,
      `  zoneOf('zone-1') = ${JSON.stringify(stub.members.zoneOf("zone-1"))}   zoneIn's measured missing arm is null (D-91)`,
      `  decoy on the handle's parent: size=${String(handle.parentElement?.getAttribute("size"))} min=${String(handle.parentElement?.getAttribute("min"))} max=${String(handle.parentElement?.getAttribute("max"))} \u2014 NEVER read by the composition`
    ].join("\n");
  }
  if (observed.sinkWrites.length === 0) statusNode.textContent = "release: none yet";
}
function render() {
  renderGeometry();
  renderReadouts();
}
var control = (id) => document.getElementById(id);
var sizeStep = (delta) => {
  const current = geometryOfPane();
  stub.setSize(DEFAULT_PANE_ID, clampToBounds(current.pane.size + delta, current.pane.bounds));
  render();
};
control("ctl-size-inc")?.addEventListener("click", () => sizeStep(40));
control("ctl-size-dec")?.addEventListener("click", () => sizeStep(-40));
control("ctl-bounds-tight")?.addEventListener("click", () => {
  stub.setBounds(DEFAULT_PANE_ID, { min: 20, max: 180 });
  render();
});
control("ctl-bounds-default")?.addEventListener("click", () => {
  const measured = stub.geometryOf("pane-unknown").pane.bounds;
  stub.setBounds(DEFAULT_PANE_ID, { min: measured.min, max: measured.max });
  render();
});
control("ctl-reset")?.addEventListener("click", () => {
  stub.reset();
  render();
});
render();
window["__pgdemo"] = {
  read: () => ({
    stub: { panes: stub.panes(), writes: stub.writes() },
    geometry: {
      [DEFAULT_PANE_ID]: stub.geometryOf(DEFAULT_PANE_ID),
      "pane-unknown": stub.geometryOf("pane-unknown")
    },
    zone: stub.members.zoneOf("zone-1"),
    decoy: {
      size: handle.parentElement?.getAttribute("size") ?? null,
      min: handle.parentElement?.getAttribute("min") ?? null,
      max: handle.parentElement?.getAttribute("max") ?? null
    },
    probe: { starts: [...observed.starts], boundsReads: [...observed.boundsReads] },
    drag: {
      releases: [...observed.releases],
      sinkWrites: [...observed.sinkWrites],
      previews: observed.previews,
      preview: observed.lastPreview,
      surfaceDrag: stub.drag(),
      attachRefusals: observed.attachRefusals,
      status: statusNode.textContent
    },
    session: session.stats(),
    affordance: affordance.stats(),
    controller: affordance.controller.stats(),
    handle: { axis: handle.getAttribute("axis"), id: handle.id, cursor: handle.style.cursor },
    target: { width: target.style.width }
  })
};
