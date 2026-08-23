// src/renderer/settings.ts — the manual-UI-only Security Settings pane
// (docs/specs/mcp-endpoint.md §6.4). Reads/writes the main-process security
// config over the preload's `window.provident.security` (IPC main→renderer→main
// ONLY — the MCP tool handlers never route to these channels, so an agent
// cannot grant itself capabilities).
import type { SecuritySettings, RpcRequest, RpcReply } from '../shared/types.js'

declare global {
  interface Window {
    provident?: {
      ready(): void
      onRequest(handler: (req: RpcRequest) => void): void
      sendReply(reply: RpcReply): void
      security: {
        get(): Promise<SecuritySettings>
        set(patch: { token?: string | null; groups?: string[]; disable?: string[] }): Promise<SecuritySettings>
      }
    }
  }
}

const GROUP_LABELS: Record<string, string> = {
  read: 'read (get_rendered_html, list_targets, get_node_state, code.get, code.validate)',
  dispatch: 'dispatch (synthetic event driving)',
  graph: 'graph (load, op, export, validate, teardown)',
  code: 'code (code.set/create/delete/load — evaluates handler bodies)',
}

function randToken(len = 32): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let out = ''
  for (let i = 0; i < len; i += 1) out += chars[Math.floor(Math.random() * chars.length)]
  return out
}

/** Render the Settings pane from the current security config. */
export async function initSettingsPane(): Promise<void> {
  const el = document.getElementById('settings-pane')
  if (!el) return
  const security = window.provident?.security
  if (!security) {
    document.getElementById('security-status')!.textContent = 'Security IPC unavailable (running as a plain page?)'
    return
  }
  const bridge = security
  const errorEl = document.getElementById('settings-error') as HTMLElement
  const showError = (msg: string): void => {
    errorEl.textContent = msg
    errorEl.hidden = false
  }

  async function refresh(): Promise<void> {
    try {
      const cfg = await bridge.get()
      render(cfg)
    } catch (e) {
      showError(e instanceof Error ? e.message : String(e))
    }
  }

  function render(cfg: SecuritySettings): void {
    document.getElementById('security-status')!.textContent =
      `token: ${cfg.token ? '••••' : '(none)'} · enabled: [${cfg.enabled.join(', ')}]`
    ;(document.getElementById('token-input') as HTMLInputElement).value = cfg.token ?? ''

    const fieldset = document.getElementById('group-toggles')!
    fieldset.innerHTML = ''
    for (const group of ['read', 'dispatch', 'graph', 'code']) {
      const row = document.createElement('div')
      row.className = 'group-row'
      const label = document.createElement('label')
      const cb = document.createElement('input')
      cb.type = 'checkbox'
      cb.checked = cfg.enabled.includes(group)
      cb.dataset.group = group
      cb.addEventListener('change', () => {
        void applyGroup(group, cb.checked)
      })
      label.appendChild(cb)
      label.appendChild(document.createTextNode(` ${GROUP_LABELS[group]}`))
      row.appendChild(label)
      fieldset.appendChild(row)
    }
  }

  async function applyGroup(group: string, on: boolean): Promise<void> {
    try {
      await bridge.set(on ? { groups: [group] } : { disable: [group] })
      await refresh()
    } catch (e) {
      showError(e instanceof Error ? e.message : String(e))
      await refresh() // revert the checkbox to the server-truth
    }
  }

  document.getElementById('token-clear')!.addEventListener('click', () => {
    void bridge.set({ token: null }).then(refresh).catch((e) => showError(String(e)))
  })
  document.getElementById('token-gen')!.addEventListener('click', () => {
    void bridge.set({ token: randToken() }).then(refresh).catch((e) => showError(String(e)))
  })

  await refresh()
}
