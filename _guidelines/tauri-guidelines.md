Tauri v2 Best Practices for Eky Chat AI

General Principles
- Use Tauri's official documentation (v2.tauri.app) as the primary reference. Do not rely on outdated v1 patterns.
- Keep the Rust backend minimal. Only add commands for operations that cannot be done in JavaScript (e.g., filesystem access, system dialogs, SQLite via plugin).
- For SQLite, use the `tauri-plugin-sql` (v2). The plugin provides an asynchronous API that works on desktop and mobile.

Project Structure (within apps/native)
- src-tauri/ : Rust source
- src/ : React frontend (but we use shared code, so this is minimal)
- Capabilities: define permissions in `capabilities/default.json`.

SQL Plugin Usage
- Initialize the database once when the app starts:
  ```ts
  import Database from '@tauri-apps/plugin-sql';
  const db = await Database.load('sqlite:eky-chat.db');
  ```
- For web fallback, use sql.js with the same interface (wrap in a common adapter in shared/data).
- All database queries must be parameterized to prevent injection.
- Example pattern (shared/data/local-db.ts):
  ```ts
  export interface IDatabase {
    execute(sql: string, bindings?: any[]): Promise<any>;
    select<T>(sql: string, bindings?: any[]): Promise<T[]>;
  }
  ```

IPC Communication
- Define strongly typed commands in Rust (src-tauri/src/main.rs or commands module).
- Use `#[tauri::command]` and return `Result<T, String>`.
- Example:
  ```rust
  #[tauri::command]
  fn get_version() -> String {
      env!("CARGO_PKG_VERSION").to_string()
  }
  ```
- On frontend, invoke using `invoke` from `@tauri-apps/api/core`. Wrap in a typed function in shared/data/tauri-commands.ts.

Mobile Specifics
- For Android, ensure permissions are set in `src-tauri/gen/android/app/src/main/AndroidManifest.xml`.
- For iOS, configure `src-tauri/gen/apple/Info.plist` for camera/files if needed.
- Use `@tauri-apps/plugin-barcode-scanner` etc. only if required.
- Touch targets must be at least 44x44 points (MUI components handle this).

File System Access
- Do not give full filesystem access. Use the `dialog` plugin to let user pick folders/files, then use `fs` plugin with scoped paths.
- Example: `import { open } from '@tauri-apps/plugin-dialog'; const selected = await open({ directory: true });`

Error Handling in Tauri Commands
- On Rust side, map errors to user-friendly strings: `Err(e) => Err(format!("Operation failed: {}", e))`.
- On frontend, always `.catch` and show an MUI alert.

Development Workflow
- Run `pnpm tauri dev` from apps/native to see both Rust and frontend logs.
- Use `invoke` with `console.time` to measure performance if needed, but remove later.

Resources (official)
- https://v2.tauri.app/develop/
- https://v2.tauri.app/plugin/sql/
- https://github.com/tauri-apps/plugins-workspace/tree/v2/plugins/sql