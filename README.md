# SwiftCut

[![Tauri](https://img.shields.io/badge/Tauri-2-FFC131?style=for-the-badge&logo=tauri&logoColor=white)](https://tauri.app/)
[![Rust](https://img.shields.io/badge/Rust-stable-000000?style=for-the-badge&logo=rust&logoColor=white)](https://www.rust-lang.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)
[![Nx](https://img.shields.io/badge/Nx-monorepo-143055?style=for-the-badge&logo=nx&logoColor=white)](https://nx.dev/)
[![pnpm](https://img.shields.io/badge/pnpm-10-F69220?style=for-the-badge&logo=pnpm&logoColor=white)](https://pnpm.io/)

A lightweight, **local-first** video editor for quick clips - trim a shadowplay, cut a highlight, share it. Built to be fast and out of your way: a Rust core via Tauri, a React UI, no forced accounts, no forced cloud.

> Status: early scaffold. The desktop shell launches into a placeholder editor; the video pipeline (import → trim → export) and templates/AI features come next.

## Stack

- [**Tauri 2**](https://tauri.app/) - native desktop shell with a Rust core and a webview UI
- [**Rust**](https://www.rust-lang.org/) - the performant core (window, native access, video work)
- [**React 19**](https://react.dev/) + [**TypeScript 6**](https://www.typescriptlang.org/) (strict) - the UI
- [**Vite 8**](https://vite.dev/) - frontend build tooling with HMR
- [**TanStack Router / Query / Form**](https://tanstack.com/) - routing, server state, forms
- [**shadcn/ui**](https://ui.shadcn.com/) on Radix UI + [**Tailwind CSS v4**](https://tailwindcss.com/)
- [**Zod 4**](https://zod.dev/) + [**T3 Env**](https://env.t3.gg/) - validation & typed env
- [**Nx**](https://nx.dev/) - monorepo task orchestration + caching (polyglot: TS + Rust)
- [**oxlint**](https://oxc.rs/docs/guide/usage/linter) + [**oxfmt**](https://oxc.rs/docs/guide/usage/formatter) - fast lint/format
- [**Commitlint**](https://commitlint.js.org/) + [**Husky**](https://typicode.github.io/husky/) - conventional commits

## Prerequisites

- [Node.js](https://nodejs.org/) >= 24 and [pnpm](https://pnpm.io/) >= 10
- A [Rust](https://www.rust-lang.org/tools/install) toolchain (`rustup`, `cargo`)
- **Windows:** the [Microsoft C++ Build Tools](https://visualstudio.microsoft.com/visual-cpp-build-tools/) (MSVC linker). WebView2 ships with Windows 11.
- See [Tauri's prerequisites](https://tauri.app/start/prerequisites/) for macOS/Linux system dependencies.

## Quick Start

```bash
pnpm install

# Iterate on the UI in a browser (fast HMR, no Rust rebuild):
pnpm dev:web        # → http://localhost:8080

# Launch the full desktop app (first Rust build is slow):
pnpm dev
```

## Project Structure

```
├── apps/
│   └── desktop/                    # The Tauri desktop app
│       ├── src-frontend/           # React + Vite UI (the webview)
│       │   ├── integrations/       # TanStack + native service wiring
│       │   └── routes/             # File-based routes (editor shell)
│       └── src-tauri/              # Rust core (window, commands, video pipeline later)
├── packages/
│   ├── ui/                         # Shared shadcn/ui components
│   ├── lint-config/                # Shared oxlint / oxfmt config
│   └── supabase/                   # DORMANT - future cloud/AI features only
├── supabase/                       # DORMANT - config/migrations/functions
├── nx.json                         # Nx task orchestration
└── pnpm-workspace.yaml
```

The frontend ↔ Rust bridge uses Tauri commands: a `#[tauri::command]` in `src-tauri/src/lib.rs` (e.g. `app_version`) is called from the UI via `invoke()` from `@tauri-apps/api/core`.

> **On Supabase:** the template this project started from shipped Supabase auth/DB. SwiftCut is local-only, so those pieces are kept **dormant** - nothing imports them and the app runs fully offline. They'll be reactivated when cloud/AI/template-sharing features arrive.

## Scripts

| Command             | Description                                                     |
| ------------------- | --------------------------------------------------------------- |
| `pnpm dev`          | Launch the desktop app (Tauri window)                           |
| `pnpm dev:web`      | Run the frontend in a browser (fast HMR)                        |
| `pnpm build`        | Build the frontend (`nx run-many -t build`)                     |
| `pnpm bundle`       | Build the desktop installer (`nx run desktop:bundle`)           |
| `pnpm typecheck`    | TypeScript type checking across the workspace                   |
| `pnpm lint`         | Lint with oxlint (`nx run-many -t lint`)                        |
| `pnpm lint:fix`     | Lint and auto-fix                                               |
| `pnpm format`       | Format with oxfmt                                               |
| `pnpm test`         | Run tests                                                       |

Nx caches task results - re-running an unchanged `lint`/`typecheck`/`build` is instant. Use `nx run <project>:<target>` to target a single project, or `nx affected -t <target>` to run only what changed.

## Adding UI

### A route

Create a file under `apps/desktop/src-frontend/routes/`. The [TanStack Router plugin](https://tanstack.com/router/latest/docs/framework/react/guide/file-based-routing) auto-generates the route tree.

### A shadcn component

```bash
cd apps/desktop
pnpm dlx shadcn@latest add dialog
```

```tsx
import { Dialog } from "@workspace/ui/components/dialog";
```

## Rust / Tauri

The Rust core lives in `apps/desktop/src-tauri/`.

```bash
# from apps/desktop/src-tauri
cargo fmt          # format
cargo clippy       # lint
cargo check        # type-check the crate
```

Expose new functionality as a `#[tauri::command]`, register it in `tauri::generate_handler![...]`, and keep heavy/long-running work (decode, encode, file I/O) off the UI thread with async commands or background threads.

## Commit Messages

[Conventional commits](https://www.conventionalcommits.org/) enforced by commitlint + husky.

```
feat(editor): add trim handles to the timeline
fix: keep the preview responsive during export
chore(deps): update tauri to 2.x
```

## CI

Pull requests run, in parallel: **Typecheck**, **Lint** (oxlint w/ GitHub annotations), **Format** (oxfmt), **Build**, **Commitlint**, and **Rust** (`cargo fmt --check` + `clippy` + `check` on `src-tauri`). The heavy `tauri build` bundle is intentionally not run per-PR.
