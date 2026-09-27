// A minimal DOM shim (the upstream adapters.test.ts pattern) sufficient for
// DomAdapter + our Runtime (which reads mount.innerHTML). We do NOT need real
// layout — only the element tree + attribute/text bookkeeping DomAdapter uses.

/** **`U-DIVERGENCE-EXT` — THE `dataset` ↔ `data-*` NAME MAP (the platform's own).** A
 *  `DOMStringMap` key is the attribute name minus its `data-` prefix with each `-x` pair
 *  turned into `X` (`data-node-id` reads back as `dataset.nodeId`); a write goes the other
 *  way: `nodeId` → `data-node-id`, `kebabKey` → `data-kebab-key`.
 *
 *  **THE BOUND, STATED SO IT IS NEVER A SILENT PARTIAL** (the shim mirrors the platform for
 *  the forms its callers and the leg actually use, and no further):
 *   (a) the camelCase ↔ kebab mapping is mirrored in BOTH directions (read and write);
 *   (b) a key CONTAINING a `-` is **not** mirrored — the platform THROWS on such a write
 *       (measured in a live Chromium page: `DOMException: Failed to set a named property
 *       'foo-bar' on 'DOMStringMap': 'foo-bar' is not a valid property name`) while this shim
 *       IGNORES it, which is exactly this slot's pre-change behaviour (no attribute was emitted
 *       for such a key before either); the platform's own GETTER answers `undefined` there, and
 *       so does this one;
 *   (c) the attribute NAME is stored verbatim (the shim's `setAttribute` does not lowercase
 *       HTML attribute names — an existing rule this change does not alter);
 *   (d) only `data-*` attributes are reachable through the slot: a key's attribute always
 *       carries the `data-` prefix, so `dataset.size` is `data-size` (the authored bare
 *       `size=` attribute the demo card emits is NOT `dataset.size` — in the real DOM too). */
function datasetAttributeName(key: string): string {
  return `data-${key.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`)}`
}

/** The reverse map: `data-node-id` → `nodeId`. A non-`data-` name (or a bare `data-`) answers
 *  `null` — such an attribute is not reachable through the `dataset` slot. */
function datasetKeyOfAttribute(name: string): string | null {
  if (!name.startsWith('data-') || name.length === 5) return null
  return name.slice(5).replace(/-([a-z])/g, (_m, c: string) => c.toUpperCase())
}

/** Bound (b) on `datasetAttributeName`: only a hyphen-free STRING key is mappable (the platform
 *  refuses a hyphenated key on the write and answers `undefined` on the read). */
function datasetKeyMappable(key: PropertyKey): key is string {
  return typeof key === 'string' && !key.includes('-')
}

export class ShimElement {
  tagName: string
  children: ShimElement[] = []
  attrs: Record<string, string> = {}
  style: { cssText: string } = { cssText: '' }
  listeners: Record<string, Array<(e: unknown) => void>> = {}
  textContent = ''
  className = ''
  id = ''
  value = ''
  parent: ShimElement | null = null
  removed = false

  constructor(tag: string) {
    this.tagName = tag.toUpperCase()
  }

  /** The cached `dataset` handle — the platform answers the SAME object on every read
   *  (`el.dataset === el.dataset` is true there), so the proxy is built once per element. */
  private datasetHandle: Record<string, string> | null = null

  /** **THE `dataset` SLOT IS ATTRIBUTE-BACKED (`U-DIVERGENCE-EXT`, the `data-wire`
   *  divergence).** It used to be a plain object, so the engine's own wire write —
   *  `el.dataset.wire = wire` (`provident-ssr/dist/core/adapters.js:139`) — set a JS property
   *  and emitted NO ATTRIBUTE, while the real DOM rendered `data-wire="node-N"` on every
   *  created element. The divergence leg's set-wise extractor measured the consequence live
   *  on both hosts: `only-on-real=[data-wire] only-on-shim=[]` at all three points
   *  (`sameSize=false`), with the pinned `N = 9` surfaces green — a HOST-side finding, fixed
   *  here (a red `provident.load` on the shim side is always attributed to the shim, never
   *  reported as a real-DOM divergence).
   *
   *  WHAT IT MIRRORS: the platform's `DOMStringMap` for the mapped forms — a write lands in
   *  the SAME `attrs` store `setAttribute` writes (so `outerHTML`/`innerHTML`, `getAttribute`
   *  and `attributes`-order serialization all see it), a read answers the attribute's value or
   *  `undefined`, `in` / `delete` / `Object.keys` / `JSON.stringify` answer the `data-*`
   *  attributes present, and the object is cached per element. The full bound (mirrored vs
   *  not) is stated on `datasetAttributeName` above. */
  get dataset(): Record<string, string> {
    if (this.datasetHandle === null) {
      const element = this
      // Bound (b): a key containing `-` is NOT mappable — the platform throws on the write and
      // answers `undefined` on the read. `attributeValue` mirrors the read exactly.
      const attributeValue = (key: PropertyKey): string | undefined => {
        if (!datasetKeyMappable(key)) return undefined
        return element.getAttribute(datasetAttributeName(key)) ?? undefined
      }
      this.datasetHandle = new Proxy({} as Record<string, string>, {
        // A prototype member (`toString`, `constructor`, …) answers from the prototype, as it
        // does on the platform's `DOMStringMap`; only the mapped names are the data view.
        get: (target, key, receiver) =>
          typeof key !== 'string' || Reflect.has(target, key) ? Reflect.get(target, key, receiver) : attributeValue(key),
        set: (_target, key, value) => {
          if (typeof key !== 'string') return false
          // Bound (b): an unmappable key's write is IGNORED — no attribute is emitted for it,
          // which is this slot's pre-change behaviour too (the platform throws here; the shim
          // must not turn a previously silent write into a render crash). `setAttribute` carries
          // the platform's own ToString on the value (`undefined` → the attribute VALUE
          // `"undefined"`, never a removal).
          if (datasetKeyMappable(key)) element.setAttribute(datasetAttributeName(key), value)
          return true
        },
        has: (_target, key) => datasetKeyMappable(key) && element.getAttribute(datasetAttributeName(key)) !== null,
        deleteProperty: (_target, key) => {
          if (datasetKeyMappable(key)) element.removeAttribute(datasetAttributeName(key))
          return true
        },
        ownKeys: () => [...new Set(Object.keys(element.attrs).map(datasetKeyOfAttribute).filter((k): k is string => k !== null))],
        getOwnPropertyDescriptor: (_target, key) => {
          const value = attributeValue(key)
          return value === undefined ? undefined : { value, writable: true, enumerable: true, configurable: true }
        },
      })
    }
    return this.datasetHandle
  }

  appendChild(c: ShimElement): ShimElement {
    const i = this.children.indexOf(c)
    if (i !== -1) this.children.splice(i, 1)
    this.children.push(c)
    c.parent = this
    return c
  }

  setAttribute(k: string, v: unknown): void {
    if (k === 'id') {
      // In a real DOM, the `id` attribute and `el.id` are the SAME slot —
      // the last write wins (props.id auto-mint writes first, css.id later).
      this.id = String(v)
      delete this.attrs['id']
      return
    }
    this.attrs[k] = String(v)
  }

  getAttribute(k: string): string | null {
    if (k === 'id') return this.id || null
    return this.attrs[k] ?? null
  }

  /** The engine's `undefined`-valued attribute write (`prop:` / `css:<key>` /
   *  `data:*`, and the boolean-attribute OFF branch in `^0.5.1`) routes here.
   *  Mirrors `HTMLElement.removeAttribute` for the shim's two bookkeeping
   *  stores: `id` lives in the `id` SLOT (`setAttribute('id', …)` writes it and
   *  deletes `attrs['id']`; `outerHTML` emits from the slot), so clearing the
   *  attribute store alone would leave a stale `id="…"` in the serialization.
   *  `value` has the SAME slot/store split on a FORM CONTROL (spec `§2.2.1`):
   *  the adapter sends a `VALUE_FORMS` tag's `value` down its PROPERTY path
   *  (`attr === 'value' && VALUE_FORMS.has(elem.tagName)` → `elem.value = …`,
   *  `provident-ssr/dist/core/adapters.js:315-318`), so `value` on an
   *  `INPUT`/`TEXTAREA` clears BOTH the `value` slot and `attrs['value']` — a
   *  removal leaves the serialized form and the readable value in agreement.
   *  The scope is EXACTLY the engine's `VALUE_FORMS` set (`:20`, read:
   *  `new Set(['INPUT', 'TEXTAREA'])`); `SELECT` is in `FORM_CONTROLS` but NOT
   *  in `VALUE_FORMS`, and every other tag/key keeps the store-only rule.
   *  Idempotent on an absent key and never throws — this method is reached from
   *  a render path that must not crash. */
  removeAttribute(k: string): void {
    if (k === 'id') {
      this.id = ''
      delete this.attrs['id']
      return
    }
    if (k === 'value' && (this.tagName === 'INPUT' || this.tagName === 'TEXTAREA')) {
      this.value = ''
      delete this.attrs['value']
      return
    }
    delete this.attrs[k]
  }

  addEventListener(evt: string, fn: (e: unknown) => void): void {
    ;(this.listeners[evt] ??= []).push(fn)
  }

  removeEventListener(evt: string, fn: (e: unknown) => void): void {
    const arr = this.listeners[evt]
    if (arr) {
      const i = arr.indexOf(fn)
      if (i !== -1) arr.splice(i, 1)
    }
  }

  remove(): void {
    if (this.parent) {
      const i = this.parent.children.indexOf(this)
      if (i !== -1) this.parent.children.splice(i, 1)
      this.parent = null
    }
    this.removed = true
  }

  /** Serialize this element's CHILDREN to an HTML string — the `mount.innerHTML`
   *  surface our Runtime exposes to MCP. Real-DOM semantics: `innerHTML` is the
   *  inner content only (children's own serialization, tags included), so an
   *  empty mount serializes to `''` — mirroring `HTMLElement.innerHTML`. */
  get innerHTML(): string {
    return (this.textContent ?? '') + this.children.map((c) => c.outerHTML).join('')
  }

  /** Serialize this element AND descendants (its open tag, attributes, inner
   *  HTML, close tag) — the `outerHTML` used by a parent's innerHTML. */
  get outerHTML(): string {
    const attrs: string[] = []
    for (const [k, v] of Object.entries(this.attrs)) attrs.push(`${k}="${v}"`)
    if (this.id) attrs.push(`id="${this.id}"`)
    if (this.className) attrs.push(`class="${this.className}"`)
    if (this.style.cssText) attrs.push(`style="${this.style.cssText}"`)
    const open = `<${this.tagName.toLowerCase()}${attrs.length ? ' ' + attrs.join(' ') : ''}>`
    const body = (this.textContent ?? '') + this.children.map((c) => c.outerHTML).join('')
    const voidTags = new Set(['input', 'br', 'img', 'hr', 'meta', 'link', 'source', 'track', 'wbr'])
    if (voidTags.has(this.tagName.toLowerCase())) return open
    return open + body + `</${this.tagName.toLowerCase()}>`
  }
}

const byId = new Map<string, ShimElement>()

export const shimDocument = {
  createElement: (tag: string) => new ShimElement(tag),
  getElementById: (id: string): ShimElement => {
    if (!byId.has(id)) byId.set(id, new ShimElement('div'))
    return byId.get(id)!
  },
  head: {
    appendChild: () => undefined,
    children: [] as ShimElement[],
  },
}

export function installShim(): void {
  byId.clear()
  ;(globalThis as Record<string, unknown>).document = shimDocument
}

export function mountEl(): ShimElement {
  return new ShimElement('div')
}