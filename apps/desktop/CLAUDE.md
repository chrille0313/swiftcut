# SwiftCut Desktop App (apps/desktop)

The frontend lives in `src-frontend/` (React + Vite) and the Rust core in `src-tauri/`. See the root `CLAUDE.md` for the high-level architecture, commands, and the frontend-to-Rust bridge.

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

## Gotcha

`invoke()` fails in a plain browser (`pnpm dev:web`) because there is no Tauri IPC. Guard any `invoke` that must run there with `isTauri()` from `@tauri-apps/api/core`.
