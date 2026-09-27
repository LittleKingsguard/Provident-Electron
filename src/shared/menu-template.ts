export type PickerFn = (candidates: readonly CatalogEntry[]) => unknown

export interface CatalogEntry {
  readonly id: unknown
  readonly label: unknown
  readonly accelerator: unknown
  readonly role: unknown
  readonly kind: unknown
  readonly submenu: unknown
  readonly enabled: unknown
}

export interface PlatformProjection {
  readonly recognized: boolean
  readonly collapsing: boolean
}

export interface ProjectedItem {
  readonly id: unknown
  readonly label: unknown
  readonly accelerator: unknown
  readonly role: unknown
  readonly kind: unknown
  readonly submenu: unknown
  readonly enabled: unknown
}

export interface MenuTemplate {
  readonly items: readonly ProjectedItem[]
  readonly platform: PlatformProjection
}

export interface TemplateOptions {
  readonly platform: unknown
  readonly picker?: PickerFn | unknown
}

const CARRY_KEYS: readonly string[] = ["id", "label", "accelerator", "role", "kind", "submenu", "enabled"]
const DARWIN = "darwin"
const PICKER_KIND = "picker"

function ownNames(value: object): readonly string[] {
  try {
    return Object.getOwnPropertyNames(value)
  } catch {
    return []
  }
}

function owns(value: object, key: string): boolean {
  try {
    return Object.prototype.hasOwnProperty.call(value, key)
  } catch {
    return false
  }
}

function readOwn(value: object, key: string): { readonly ok: boolean; readonly v: unknown } {
  try {
    if (!Object.prototype.propertyIsEnumerable.call(value, key)) return { ok: false, v: undefined }
    return { ok: true, v: (value as Record<string, unknown>)[key] }
  } catch {
    return { ok: false, v: undefined }
  }
}

function carries(element: unknown): CatalogEntry | null {
  if (element === null) return null
  if (typeof element !== "object" && typeof element !== "function") return null
  const source = element as object
  const names = ownNames(source)
  if (names.length === 0) return null
  const record = Object.create(null) as Record<string, unknown>
  for (const key of CARRY_KEYS) {
    if (!owns(source, key)) continue
    const read = readOwn(source, key)
    if (!read.ok) continue
    record[key] = read.v
  }
  if (Object.keys(record).length === 0) return null
  return record as unknown as CatalogEntry
}

function asRecord(entry: CatalogEntry): Record<string, unknown> {
  return entry as unknown as Record<string, unknown>
}

export function normalizeCatalog(catalog: unknown): readonly CatalogEntry[] {
  try {
    if (!Array.isArray(catalog)) return []
    const out: CatalogEntry[] = []
    for (let i = 0; i < catalog.length; i += 1) {
      const carried = carries(catalog[i])
      if (carried !== null) out.push(carried)
    }
    return out
  } catch {
    return []
  }
}

function platformProjection(value: unknown): PlatformProjection {
  const isString = typeof value === "string" && value === DARWIN
  return { recognized: typeof value === "string", collapsing: isString }
}

function optionsPlatform(options: unknown): unknown {
  if (options === null) return undefined
  if (typeof options !== "object" && typeof options !== "function") return undefined
  const read = readOwn(options as object, "platform")
  return read.ok ? read.v : undefined
}

function optionsPicker(options: unknown): unknown {
  if (options === null) return undefined
  if (typeof options !== "object" && typeof options !== "function") return undefined
  const read = readOwn(options as object, "picker")
  return read.ok ? read.v : undefined
}

type Invocation = { readonly ok: boolean; readonly answer: unknown }

function invoke(picker: unknown, candidates: readonly CatalogEntry[]): Invocation {
  if (typeof picker !== "function") return { ok: false, answer: undefined }
  try {
    return { ok: true, answer: (picker as PickerFn)(candidates) }
  } catch {
    return { ok: false, answer: undefined }
  }
}

function identityItem(entry: CatalogEntry): ProjectedItem {
  const source = asRecord(entry)
  const item = Object.create(null) as Record<string, unknown>
  for (const key of CARRY_KEYS) {
    if (!owns(source, key)) continue
    item[key] = source[key]
  }
  return item as unknown as ProjectedItem
}

function degradedItem(entry: CatalogEntry): ProjectedItem {
  const item = identityItem(entry) as unknown as Record<string, unknown>
  item["enabled"] = false
  return item as unknown as ProjectedItem
}

function pickerRun(entries: readonly CatalogEntry[], from: number): number {
  const rest = entries.slice(from)
  const stop = rest.findIndex((entry) => asRecord(entry)["kind"] !== PICKER_KIND)
  return stop < 0 ? rest.length : stop
}

function carriesPickerKind(entries: readonly CatalogEntry[]): boolean {
  for (const entry of entries) {
    if (asRecord(entry)["kind"] === PICKER_KIND) return true
  }
  return false
}

function collapsedItem(entry: CatalogEntry, rest: readonly CatalogEntry[], degraded: boolean): ProjectedItem {
  const parent = identityItem(entry) as unknown as Record<string, unknown>
  const submenu: ProjectedItem[] = []
  for (const member of rest) submenu.push(identityItem(member))
  if (degraded) parent["enabled"] = false
  parent["submenu"] = submenu
  return parent as unknown as ProjectedItem
}

function project(entries: readonly CatalogEntry[], collapsing: boolean, degraded: boolean): readonly ProjectedItem[] {
  if (!collapsing) {
    const identity: ProjectedItem[] = []
    for (const entry of entries) identity.push(identityItem(entry))
    return identity
  }
  const items: ProjectedItem[] = []
  for (let index = 0; index < entries.length; index += 1) {
    const entry = entries[index] as CatalogEntry
    if (asRecord(entry)["kind"] !== PICKER_KIND) {
      items.push(identityItem(entry))
      continue
    }
    const run = pickerRun(entries, index)
    if (run <= 1) {
      items.push(degraded ? degradedItem(entry) : identityItem(entry))
      continue
    }
    items.push(collapsedItem(entry, entries.slice(index + 1, index + run), degraded))
    index += run - 1
  }
  return items
}

export function buildMenuTemplate(catalog: unknown, options?: unknown): MenuTemplate {
  try {
    const carrier = normalizeCatalog(catalog)
    const platform = platformProjection(optionsPlatform(options))
    if (!carrier.some((entry) => asRecord(entry)["kind"] === PICKER_KIND)) {
      return { items: project(carrier, platform.collapsing, false), platform }
    }
    const invocation = invoke(optionsPicker(options), carrier)
    return {
      items: project(carrier, platform.collapsing, !invocation.ok),
      platform,
    }
  } catch {
    return { items: [], platform: { recognized: false, collapsing: false } }
  }
}

export function selectCatalogItem(catalog: unknown, picker?: unknown): unknown | null {
  try {
    const carrier = normalizeCatalog(catalog)
    const invocation = invoke(picker, carrier)
    if (!invocation.ok) return null
    const answer = invocation.answer
    if (answer === null || answer === undefined) return null
    for (const entry of carrier) {
      const record = asRecord(entry)
      if (!owns(record, "id")) continue
      const read = readOwn(record, "id")
      if (!read.ok) continue
      if (read.v === answer) return answer
    }
    return null
  } catch {
    return null
  }
}
