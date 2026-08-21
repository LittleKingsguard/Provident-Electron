// src/renderer/renderer.ts — browser entry for the Electron renderer.
// Bootstraps the provident-ssr producing process into #app and serves the
// MCP-facing operations over the preload bridge (main process = MCP server).
import { Runtime } from './runtime.js'
import { demoEnvelope } from '../shared/demo-envelope.js'
import type { RpcRequest, RpcReply } from '../shared/types.js'

declare global {
  interface Window {
    provident?: {
      ready(): void
      onRequest(handler: (req: RpcRequest) => void): void
      sendReply(reply: RpcReply): void
    }
  }
}

function handleRequest(runtime: Runtime, req: RpcRequest): Promise<RpcReply> {
  return (async (): Promise<RpcReply> => {
    try {
      let value: unknown
      switch (req.method) {
        case 'dispatch':
          value = await runtime.dispatch(req.payload as never)
          break
        case 'renderedHtml':
          value = runtime.renderedHtmlResult()
          break
        case 'listTargets':
          value = runtime.listTargets()
          break
        case 'nodeState':
          value = runtime.nodeState(req.payload as never)
          break
        default:
          throw new Error(`unknown method: ${(req as { method: string }).method}`)
      }
      return { id: req.id, ok: true, value }
    } catch (e) {
      return {
        id: req.id,
        ok: false,
        error: e instanceof Error ? e.message : String(e),
      }
    }
  })()
}

function main(): void {
  const mount = document.getElementById('app')
  if (!mount) throw new Error('mount #app missing')
  const runtime = new Runtime({ mount, envelope: demoEnvelope() })
  runtime.bootstrap()
  const bridge = window.provident
  if (!bridge) {
    console.warn('[provident-renderer] no preload bridge — MCP endpoints unavailable (running as a plain page?)')
    return
  }
  bridge.onRequest((req) => {
    void handleRequest(runtime, req).then((reply) => bridge.sendReply(reply))
  })
  bridge.ready()
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => main())
  } else {
    main()
  }
}