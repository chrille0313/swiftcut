---
name: setup-project
description: Get a fresh clone of SwiftCut building and running
---

Bring a fresh clone of SwiftCut up:

1. Ensure prerequisites:
   - Node >= 24 and pnpm >= 10.
   - A Rust toolchain (`rustup`, `cargo`). On Windows also install the **Microsoft C++ Build Tools** (MSVC linker); WebView2 ships with Windows 11.
2. Install dependencies with `pnpm install`.
3. Verify the frontend with `pnpm dev:web`, which opens the UI at http://localhost:8080 in a browser.
4. Verify the desktop app with `pnpm dev`, which launches the Tauri window. The first Rust build is slow.
5. Sanity-check the workspace with `pnpm typecheck && pnpm lint`.
6. Produce a desktop installer when needed with `pnpm bundle`.
