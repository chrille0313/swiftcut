---
paths:
  - "apps/desktop/src-tauri/**"
---

# Rust / Tauri Rules

- The desktop shell is Tauri v2. The Rust core lives in `apps/desktop/src-tauri/`, and the web UI it hosts lives in `apps/desktop/src-frontend/`.
- Expose backend functionality to the frontend as `#[tauri::command]` functions registered in `tauri::generate_handler![...]` (see `src/lib.rs`). The frontend calls them with `invoke("command_name")` from `@tauri-apps/api/core`.
- Keep heavy or long-running work (video decode/encode, large file I/O) off the UI thread. Use `async` commands or `tauri::async_runtime`/threads so the window stays responsive.
- Return typed, `serde`-serializable values, and surface fallible operations as `Result<T, String>` (or a custom error type) so the frontend can handle failures.
- Format with `cargo fmt` and lint with `cargo clippy` before committing. CI enforces both.
- Grant capabilities deliberately in `capabilities/`, adding only what a command actually needs.
