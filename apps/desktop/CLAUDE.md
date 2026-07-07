# SwiftCut Desktop App

The Tauri v2 desktop app. Two halves under one project:

- `src-frontend/` — React SPA (Vite, TanStack Router/Query/Form, shadcn/ui). The webview UI.
- `src-tauri/` — the Rust core (window, native APIs, the video pipeline later).

From the repo root: `pnpm dev:web` iterates on the UI in a browser (fast HMR); `pnpm dev` launches the full desktop app.

## Frontend domain structure

Each domain lives directly under `src-frontend/`:

```
src-frontend/<domain>/
  ├── components/     # Domain-specific UI
  ├── queries.ts      # TanStack Query queries
  ├── mutations.ts    # Write operations (Tauri command calls, etc.)
  ├── hooks.ts        # React hooks
  └── schemas.ts      # Zod validation schemas
```

## Import conventions

- `@/*` — app-local imports; resolves to `src-frontend/*` (e.g. `@/editor/hooks`)
- `@workspace/ui/*` — shared UI components (e.g. `@workspace/ui/components/button`)
- Import directly from source packages. Never create re-export wrapper files.
- Third-party / native integrations go under `src-frontend/integrations/<service>/`.

## Frontend ↔ Rust bridge

Call Rust `#[tauri::command]`s from the frontend via `invoke("command_name")` from `@tauri-apps/api/core`. See `src-tauri/src/lib.rs` for registered commands (e.g. the `app_version` smoke test). Guard invoke calls that must tolerate running in a plain browser (`pnpm dev:web`), where there is no IPC.

## Note

There is no auth in the app currently — it is local-only. Accounts/auth return alongside future cloud/AI features. `packages/supabase` stays dormant and unused until then.
