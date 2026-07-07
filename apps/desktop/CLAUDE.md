# SwiftCut Desktop App

The Tauri v2 desktop app has two halves under one project:

- `src-frontend/`: the React SPA (Vite, TanStack Router/Query/Form, shadcn/ui) that renders as the webview UI.
- `src-tauri/`: the Rust core (window, native APIs, and later the video pipeline).

From the repo root, `pnpm dev:web` iterates on the UI in a browser with fast HMR, and `pnpm dev` launches the full desktop app.

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

- `@/*`: app-local imports, resolving to `src-frontend/*` (for example `@/editor/hooks`).
- `@workspace/ui/*`: shared UI components (for example `@workspace/ui/components/button`).
- Import directly from source packages. Never create re-export wrapper files.
- Third-party and native integrations go under `src-frontend/integrations/<service>/`.

## Calling Rust from the frontend

Call Rust `#[tauri::command]`s from the frontend with `invoke("command_name")` from `@tauri-apps/api/core`. See `src-tauri/src/lib.rs` for the registered commands (for example the `app_version` smoke test). Guard any invoke call that must tolerate running in a plain browser (`pnpm dev:web`), where there is no IPC.

## Note

There is no auth in the app right now; it is local-only. Accounts and auth return alongside future cloud/AI features. `packages/supabase` stays dormant and unused until then.
