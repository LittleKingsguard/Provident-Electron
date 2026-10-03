// The `H2b` (`U-STORE-MODULES-SEAMS`) overlay CALLER-side store turn
// (`docs/specs/store-modules-seams.md` `§2.2`). The store
// arrives ONLY as the factory's declared call parameter (never imported, never
// bound at module scope — `§5.5.1` P-SMS-OV-IM-2). The module's own bytes are
// untouched: this file is the module's store-backed caller.

import { overlayTransition, overlayInertDeclaration } from '../shared/overlay.js'
import type { GraphResolveResult, GraphWriteReceipt } from './store-core-graph.js'

export interface OverlayStoreTurn {
  readState(name: unknown): unknown
  transition(name: unknown, verb: unknown, callback?: unknown): { state: unknown; changed: unknown }
  declaration(target: unknown, attributeName: unknown, inert: unknown): {
    name: unknown
    value: unknown
    removal: unknown
    target: unknown
  }
}

export function createOverlayStoreWiring(store: unknown): OverlayStoreTurn {
  // THE ONE COMPOSITION SITE of the caller's own spelling (`§2.6` R-2/R-3): the
  // caller's `<name>` is carried VERBATIM into the reference.
  const referenceOf = (name: unknown): string => 'mem.overlay.' + String(name) + '.state'

  const readStateRecord = (name: unknown): GraphResolveResult | undefined => {
    try {
      return (store as { resolve?: (name: string) => GraphResolveResult }).resolve?.(referenceOf(name))
    } catch {
      // a throwing/absent store is ABSORBED at the wiring turn
      // (THROWING-SUPPLY-ABSORPTION-LIVES-AT-THE-WIRING-TURN-NOT-THE-EVALUATION) —
      // the read answers the declared MISS reading.
      return undefined
    }
  }

  const readValue = (name: unknown): unknown => {
    const hit = readStateRecord(name)
    return hit !== undefined && hit.found === true ? hit.value : undefined
  }

  const writeNext = (name: unknown, next: unknown): void => {
    try {
      ;(store as { commit?: (name: string, value: unknown, opts?: { onRepeat?: 'edit' }) => GraphWriteReceipt }).commit?.(
        referenceOf(name),
        next,
        { onRepeat: 'edit' },
      )
    } catch {
      // the store's declared refusal/receipt is consumed, never a throw
    }
  }

  return {
    readState: (name: unknown): unknown => readValue(name),
    transition: (name: unknown, verb: unknown, callback?: unknown): { state: unknown; changed: unknown } => {
      // the read's outcome (undefined on a MISS) is passed THROUGH to the module,
      // whose landed totality answers the declared coercion — the caller invents
      // no default (`§2.2` items 1/4; `F-OV-1`).
      const record = overlayTransition(readValue(name), verb, callback)
      if (record.changed === true) writeNext(name, record.state)
      return record
    },
    declaration: (target: unknown, attributeName: unknown, inert: unknown) =>
      // `E5-B-1`: RETURNED AS-IS, NEVER APPLIED — no store call of any kind
      overlayInertDeclaration(target, attributeName, inert),
  }
}