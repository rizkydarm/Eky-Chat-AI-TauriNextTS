# Monorepo Setup: Tauri + Next.js with Shared Code

You need a **monorepo** structure. Here's how to set it up properly with Bun:

## Project Structure

```
my-monorepo/
├── apps/
│   ├── desktop/          # Tauri app
│   │   ├── src/          # React frontend (Vite)
│   │   ├── src-tauri/    # Rust backend
│   │   └── package.json
│   └── web/              # Next.js app
│       ├── src/
│       └── package.json
├── packages/
│   ├── ui/               # Shared React components
│   │   ├── src/
│   │   └── package.json
│   └── shared/           # Shared utilities, types
│       ├── src/
│       └── package.json
├── package.json
└── bun.lockb
```

## Step-by-Step Setup

### 1. Create Root Directory

```bash
mkdir my-monorepo
cd my-monorepo
```

### 2. Initialize Root package.json

```json
// package.json
{
  "name": "my-monorepo",
  "private": true,
  "workspaces": [
    "apps/*",
    "packages/*"
  ],
  "scripts": {
    "dev:web": "bun --filter web dev",
    "dev:desktop": "bun --filter desktop tauri dev",
    "build:web": "bun --filter web build",
    "build:desktop": "bun --filter desktop tauri build"
  }
}
```

### 3. Create Shared Packages

```bash
# Shared UI components
mkdir -p packages/ui/src
```

```json
// packages/ui/package.json
{
  "name": "@repo/ui",
  "version": "0.0.0",
  "main": "./src/index.tsx",
  "types": "./src/index.tsx",
  "exports": {
    ".": "./src/index.tsx"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "peerDependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  }
}
```

```tsx
// packages/ui/src/Button.tsx
import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export function Button({ children, onClick }: ButtonProps) {
  return (
    <button 
      onClick={onClick}
      style={{ padding: '8px 16px', borderRadius: '4px', background: '#0070f3', color: 'white' }}
    >
      {children}
    </button>
  );
}
```

```tsx
// packages/ui/src/index.tsx
export { Button } from './Button';
```

```bash
# Shared utilities
mkdir -p packages/shared/src
```

```json
// packages/shared/package.json
{
  "name": "@repo/shared",
  "version": "0.0.0",
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "exports": {
    ".": "./src/index.ts"
  }
}
```

```ts
// packages/shared/src/index.ts
export const API_URL = 'https://api.example.com';

export function formatDate(date: Date): string {
  return date.toLocaleDateString();
}
```

### 4. Create Tauri App (Desktop)

```bash
# Create Tauri app manually (don't use create-tauri-app to avoid conflicts)
mkdir -p apps/desktop/src apps/desktop/src-tauri/src apps/desktop/src-tauri/icons
cd apps/desktop
```

```json
// apps/desktop/package.json
{
  "name": "@repo/desktop",
  "version": "0.0.0",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "tauri": "tauri"
  },
  "dependencies": {
    "@repo/ui": "workspace:*",
    "@repo/shared": "workspace:*",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@tauri-apps/cli": "^2.0.0",
    "@types/react": "^18.2.0",
    "@vitejs/plugin-react": "^4.2.0",
    "typescript": "^5.3.0",
    "vite": "^5.0.0"
  }
}
```

```ts
// apps/desktop/vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@repo/ui": "../packages/ui/src",
      "@repo/shared": "../packages/shared/src",
    },
  },
  // Tauri expects a fixed port
  server: {
    port: 1420,
    strictPort: true,
  },
  clearScreen: false,
});
```

```tsx
// apps/desktop/src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

```tsx
// apps/desktop/src/App.tsx
import { Button } from '@repo/ui';
import { formatDate } from '@repo/shared';

export default function App() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Desktop App (Tauri)</h1>
      <p>Today: {formatDate(new Date())}</p>
      <Button onClick={() => alert('Hello from Desktop!')}>
        Click Me
      </Button>
    </div>
  );
}
```

```html
<!-- apps/desktop/index.html -->
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width" />
    <title>Desktop App</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

```json
// apps/desktop/tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true,
    "paths": {
      "@repo/ui": ["../packages/ui/src"],
      "@repo/shared": ["../packages/shared/src"]
    }
  },
  "include": ["src"]
}
```

```toml
# apps/desktop/src-tauri/tauri.conf.json
{
  "$schema": "https://raw.githubusercontent.com/nicehash/Tauri/dev/crates/tauri-cli/schema.json",
  "productName": "my-app",
  "version": "0.1.0",
  "identifier": "com.example.myapp",
  "build": {
    "frontendDist": "../dist",
    "devUrl": "http://localhost:1420"
  },
  "app": {
    "windows": [
      {
        "title": "My App",
        "width": 800,
        "height": 600
      }
    ]
  },
  "bundle": {
    "active": true,
    "targets": "all",
    "icon": [
      "icons/32x32.png",
      "icons/128x128.png",
      "icons/128x128@2x.png",
      "icons/icon.icns",
      "icons/icon.ico"
    ]
  }
}
```

```toml
# apps/desktop/src-tauri/Cargo.toml
[package]
name = "my-app"
version = "0.1.0"
edition = "2021"

[dependencies]
tauri = { version = "2", features = [] }
serde = { version = "1", features = ["derive"] }
serde_json = "1"

[build-dependencies]
tauri-build = { version = "2" }
```

```rust
// apps/desktop/src-tauri/build.rs
fn main() {
    tauri_build::build()
}
```

```rust
// apps/desktop/src-tauri/src/main.rs
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

fn main() {
    tauri::Builder::default()
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
```

### 5. Create Next.js App (Web)

```bash
cd ../../..
mkdir -p apps/web/src
cd apps/web
```

```json
// apps/web/package.json
{
  "name": "@repo/web",
  "version": "0.0.0",
  "scripts": {
    "dev": "next dev --port 3000",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "@repo/ui": "workspace:*",
    "@repo/shared": "workspace:*",
    "next": "^14.1.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^18.2.0",
    "typescript": "^5.3.0"
  }
}
```

```js
// apps/web/next.config.js
const nextConfig = {
  transpilePackages: ['@repo/ui', '@repo/shared'],
};

module.exports = nextConfig;
```

```tsx
// apps/web/src/app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

```tsx
// apps/web/src/app/page.tsx
'use client';

import { Button } from '@repo/ui';
import { formatDate } from '@repo/shared';

export default function Home() {
  return (
    <main style={{ padding: '20px' }}>
      <h1>Web App (Next.js)</h1>
      <p>Today: {formatDate(new Date())}</p>
      <Button onClick={() => alert('Hello from Web!')}>
        Click Me
      </Button>
    </main>
  );
}
```

```json
// apps/web/tsconfig.json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "jsx": "preserve",
    "module": "esnext",
    "moduleResolution": "bundler",
    "paths": {
      "@repo/ui": ["../../packages/ui/src"],
      "@repo/shared": ["../../packages/shared/src"]
    }
  },
  "include": ["next-env.d.ts", "src"],
  "exclude": ["node_modules"]
}
```

### 6. Install Dependencies

```bash
cd /path/to/my-monorepo
bun install
```

### 7. Run Development

```bash
# Web app
bun dev:web

# Desktop app (in another terminal, requires Rust installed)
bun dev:desktop
```

---

## Mobile Setup (Tauri v2)

For mobile, you need additional setup:

```bash
# Prerequisites
rustup target add aarch64-apple-ios x86_64-apple-ios  # iOS
rustup target add aarch64-linux-android armv7-linux-androideabi  # Android

# Initialize mobile
cd apps/desktop
bunx tauri android init
bunx tauri ios init
```

```json
// Update root package.json scripts
{
  "scripts": {
    "dev:web": "bun --filter web dev",
    "dev:desktop": "bun --filter desktop tauri dev",
    "dev:android": "bun --filter desktop tauri android dev",
    "dev:ios": "bun --filter desktop tauri ios dev"
  }
}
```

---

## Summary Diagram

```
┌─────────────────────────────────────────────────┐
│                 my-monorepo                     │
├─────────────────────────────────────────────────┤
│  packages/                                      │
│  ├── @repo/ui ──────────────┐                   │
│  └── @repo/shared ──────────┤                   │
│                             │                   │
│  apps/                      │ shared            │
│  ├── desktop (Tauri/Vite) ◄─┤                   │
│  │   ├── macOS              │                   │
│  │   ├── Windows            │                   │
│  │   ├── Linux              │                   │
│  │   ├── iOS (v2)           │                   │
│  │   └── Android (v2)       │                   │
│  └── web (Next.js) ◄────────┘                   │
└─────────────────────────────────────────────────┘
```

This setup lets you share UI components and logic between web and all Tauri platforms while keeping separate build configurations!