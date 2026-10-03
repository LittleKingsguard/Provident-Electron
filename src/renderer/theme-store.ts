// src/renderer/theme-store.ts — `H2b` (`U-STORE-MODULES-SEAMS`), the theme
// CALLER's resolution site (`docs/specs/store-modules-seams.md` `§2.3` — THE
// THEME-LICENCE DECISION, option (a): this NEW declared file; no byte of
// renderer.ts moves). The store arrives ONLY as the factory's declared call
// parameter; the `seed` is the caller's own declared default, carried VERBATIM.

import { resolveTheme, applyThemeDeclaration } from '../shared/theme.js'
import type { GraphResolveResult, GraphWriteReceipt } from './store-core-graph.js'

export interface ThemeResolutionWiring {
  resolveSetting(env: unknown): { setting: unknown; prefersDark: unknown; source: unknown }
  writeSetting(value: unknown): unknown
}

export function createThemeResolutionWiring(store: unknown, seed: unknown): ThemeResolutionWiring {
  // THE ONE COMPOSITION SITE of the caller's own fixed spelling (`§2.6` R-3).
  const reference = 'file.settings.theme.token'

  const readToken = (): unknown => {
    try {
      const hit = (store as { resolve?: (name: string) => GraphResolveResult }).resolve?.(reference)
      return hit !== undefined && hit.found === true ? hit.value : undefined
    } catch {
      // a throwing/absent store is ABSORBED — the read answers the MISS reading
      // (THROWING-SUPPLY-ABSORPTION-LIVES-AT-THE-WIRING-TURN-NOT-THE-EVALUATION)
      return undefined
    }
  }

  return {
    resolveSetting: (env: unknown): { setting: unknown; prefersDark: unknown; source: unknown } => {
      // THE DEFAULT-SEED RULE (`§2.3` item 4): HIT ⇒ the stored token; MISS ⇒ the
      // seed BY IDENTITY — and the miss makes NO store write (the next write turn
      // re-mints). The module stays TOTAL for ANY env.
      const value = readToken()
      return resolveTheme(value === undefined ? seed : value, env)
    },
    writeSetting: (value: unknown): unknown => {
      try {
        return (store as { commit?: (name: string, v: unknown, opts?: { onRepeat?: 'edit' }) => GraphWriteReceipt }).commit?.(
          reference,
          value,
          { onRepeat: 'edit' },
        )
      } catch {
        // a refused/serialization-failed receipt is consumed, never a throw
        return undefined
      }
    },
  }
}