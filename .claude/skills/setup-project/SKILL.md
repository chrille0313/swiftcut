---
name: setup-project
description: Get a fresh clone of SwiftCut building and running
---

Bring a fresh clone of SwiftCut up:

1. Ensure prerequisites:
   - Node >= 24 and pnpm >= 10
   - A Rust toolchain (`rustup`, `cargo`). On Windows also install the **Microsoft C++ Build Tools** (MSVC linker); WebView2 ships with Windows 11.
2. Install dependencies: `pnpm install`
3. Verify the frontend: `pnpm dev:web` — opens the UI at http://localhost:8080 in a browser.
4. Verify the desktop app: `pnpm dev` — launches the Tauri window (the first Rust build is slow).
5. Sanity-check the workspace: `pnpm typecheck && pnpm lint`
6. Produce a desktop installer when needed: `pnpm bundle`
