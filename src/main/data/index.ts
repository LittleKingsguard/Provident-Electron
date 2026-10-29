// src/main/data/index.ts — the module's entry and the ONLY file another module imports: it
// exports exactly the surface `interface.md` §2 declares and nothing else (`signatures.md` §1;
// D-11). Every other file under `src/main/data/` is private to the module.

export type {
  DataPath,
  DataTier,
  DataRefusalReason,
  DataLedger,
  DataReadAnswer,
  DataWriteAnswer,
  DataDeleteAnswer,
  DataListAnswer,
  DataJournalEntry,
  DataJournalAnswer,
  DataSurfaceOptions,
  DataSurface,
  DataToolName,
} from './types.js'

export { DATA_TOOL_NAMES } from './types.js'

export { createDataSurface } from './surface.js'
