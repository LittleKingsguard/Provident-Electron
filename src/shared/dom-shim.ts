// A minimal DOM shim (the upstream adapters.test.ts pattern) sufficient for
// DomAdapter + our Runtime (which reads mount.innerHTML). We do NOT need real
// layout — only the element tree + attribute/text bookkeeping DomAdapter uses.
export class ShimElement {
  tagName: string
  children: ShimElement[] = []
  attrs: Record<string, string> = {}
  dataset: Record<string, string> = {}
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