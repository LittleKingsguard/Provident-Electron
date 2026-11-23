// src/main/modules/loader.ts — ONE loader, TWO deliveries, ONE shape (`L2` §2, `L1` §3 `S-1`).
//
// The installed-source arm arrives as its manifest TEXT (what the registry row already holds) and the
// in-tree arm arrives as a bundled table; both parse to the same `ModuleSource`, so nothing downstream
// can tell them apart. The delivered TEXT is kept beside the shape because a crossing quotes what was
// delivered and never a re-serialisation (`D-308`), and admission reads its tokens off THAT text.
import type { ModuleDelivery, ModuleManifest, ModuleSource } from '../../shared/module-contract.js'

export interface LoadedModule extends ModuleSource {
  /** The EXACT bytes delivered — quoted, never rebuilt. */
  readonly text: string
}

/** Both arms of `ModuleDelivery` to ONE `ModuleSource` shape. */
export function loadDelivery(delivery: ModuleDelivery): readonly LoadedModule[] {
  if (delivery.kind === 'source') return [loadedFrom(delivery.source, 'source')]
  return (delivery.entries ?? []).map((entry) => loadedFrom(entry.source, 'table'))
}

function loadedFrom(text: string, origin: 'source' | 'table'): LoadedModule {
  return { manifest: parseManifest(text), origin, text }
}

/** The manifest the delivery carries. A source that is not a manifest is the CALLER's data defect and
 *  `install` contains it as a refused verdict rather than letting it cross the door (`D-105`). */
function parseManifest(text: string): ModuleManifest {
  const parsed: unknown = JSON.parse(text)
  if (parsed === null || typeof parsed !== 'object' || Array.isArray(parsed)) {
    throw new Error('the delivered source is not a manifest object')
  }
  return parsed as ModuleManifest
}
