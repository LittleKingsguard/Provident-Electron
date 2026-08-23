// src/main/preload.ts — the contextBridge between the renderer and the main
// process. The main process owns the MCP server; the renderer owns the
// provident-ssr graph + DOM. Requests flow main → renderer (webContents.send)
// and replies flow renderer → main (send). Exposed as a minimal `provident`
// surface (no Node objects leak into the page).
import { contextBridge, ipcRenderer } from 'electron'
import { IPC_INVOKE, IPC_REPLY, IPC_READY, IPC_SECURITY_GET, IPC_SECURITY_SET, type RpcRequest, type RpcReply, type SecuritySettings } from '../shared/types.js'

export interface ProvidentBridge {
  ready(): void
  onRequest(handler: (req: RpcRequest) => void): void
  sendReply(reply: RpcReply): void
  security: {
    get(): Promise<SecuritySettings>
    set(patch: { token?: string | null; groups?: string[]; disable?: string[] }): Promise<SecuritySettings>
  }
}

const bridge: ProvidentBridge = {
  ready(): void {
    ipcRenderer.send(IPC_READY)
  },
  onRequest(handler: (req: RpcRequest) => void): void {
    ipcRenderer.on(IPC_INVOKE, (_event, req: RpcRequest) => {
      handler(req)
    })
  },
  sendReply(reply: RpcReply): void {
    ipcRenderer.send(IPC_REPLY, reply)
  },
  // The manual-UI security settings (mcp-endpoint.md §6.4): exposed to the
  // renderer Settings pane ONLY. The MCP tool handlers never route to these
  // channels, so an agent cannot grant itself capabilities.
  security: {
    get(): Promise<SecuritySettings> {
      return ipcRenderer.invoke(IPC_SECURITY_GET)
    },
    set(patch: { token?: string | null; groups?: string[]; disable?: string[] }): Promise<SecuritySettings> {
      return ipcRenderer.invoke(IPC_SECURITY_SET, patch)
    },
  },
}

contextBridge.exposeInMainWorld('provident', bridge)