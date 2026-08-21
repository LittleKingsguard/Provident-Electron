// src/main/main.ts — the Electron main process entry. Creates the BrowserWindow
// (the renderer owns the provident-ssr graph + DOM), starts the MCP server
// (stdio or Streamable HTTP), and bridges MCP tool calls to the renderer via
// IPC.
import { app, BrowserWindow, ipcMain } from 'electron'
import { join } from 'node:path'
import { IPC_INVOKE, IPC_REPLY, IPC_READY, type RpcReply } from '../shared/types.js'
import { ProvidentMcpServer, RendererBackend, type McpTransportKind } from './mcp-server.js'

// The main process is bundled as CJS (Electron runs it reliably that way), so
// `__dirname` is available.
const here = __dirname

function transportFromArgs(argv: string[]): McpTransportKind {
  const flag = argv.find((a) => a.startsWith('--mcp-transport='))
  if (flag) {
    const v = flag.slice('--mcp-transport='.length)
    if (v === 'http' || v === 'stdio') return v
  }
  const env = process.env.PROVIDENT_MCP_TRANSPORT
  if (env === 'http' || env === 'stdio') return env
  return 'http'
}

function portFromArgs(argv: string[]): number {
  const flag = argv.find((a) => a.startsWith('--mcp-port='))
  if (flag) {
    const v = Number(flag.slice('--mcp-port='.length))
    if (Number.isFinite(v)) return v
  }
  const env = Number(process.env.PROVIDENT_MCP_PORT)
  if (Number.isFinite(env)) return env
  return 3787
}

async function main(): Promise<void> {
  console.error(`[provident-main] node ${process.versions.node} electron ${process.versions.electron} crypto=${typeof globalThis.crypto}`)
  const transport = transportFromArgs(process.argv.slice(1))
  const port = portFromArgs(process.argv.slice(1))

  const backend = new RendererBackend()
  const mcp = new ProvidentMcpServer({ backend, transport, port })

  ipcMain.on(IPC_READY, () => {
    backend.markReady()
    console.error('[provident-main] renderer ready — MCP backend armed')
  })
  ipcMain.on(IPC_REPLY, (_event, reply: RpcReply) => {
    backend.handleReply(reply)
  })

  const win = new BrowserWindow({
    width: 980,
    height: 720,
    webPreferences: {
      preload: join(here, 'preload.cjs'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  })
  backend.attachWindow(win)

  const rendererHtml = join(here, '..', 'renderer', 'index.html')
  await win.loadFile(rendererHtml)

  await mcp.start()

  win.on('closed', () => {
    void mcp.close()
    app.quit()
  })
}

app.whenReady().then(() => {
  void main().catch((e) => {
    console.error('[provident-main] fatal:', e)
    app.exit(1)
  })
})

app.on('window-all-closed', () => {
  app.quit()
})