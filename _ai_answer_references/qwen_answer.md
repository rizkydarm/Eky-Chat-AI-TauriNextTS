# 🚀 Tauri v2 + Next.js + Bun Monorepo Setup Guide

You're right that running `bun create tauri-app` and `bun create next-app` in the same folder causes conflicts. The solution is to use a **monorepo structure** with workspaces. Here's how to set it up properly:

---

## 📦 Recommended Folder Structure

```
my-monorepo/
├── package.json              # Root workspace config
├── bun.lockb                 # Bun lockfile
├── turbo.json               # (Optional) TurboRepo for task orchestration
├── apps/
│   ├── web/                 # Next.js app (web deployment)
│   │   ├── package.json
│   │   ├── next.config.ts
│   │   └── src/
│   └── native/              # Tauri app (desktop + mobile)
│       ├── package.json
│       ├── tauri.conf.json
│       └── src-tauri/       # Rust backend
├── packages/
│   ├── ui/                  # Shared React components, hooks, styles
│   │   ├── package.json
│   │   ├── src/
│   │   └── tsconfig.json
│   └── typescript-config/   # Shared TS configs
└── .gitignore
```

This structure is used in production examples like (https://github.com/Arbarwings/tauri-v2-nextjs-monorepo).

---

## 🔧 Step-by-Step Setup with Bun

### 1. Initialize Root Workspace

```bash
mkdir my-tauri-nextjs-app && cd my-tauri-nextjs-app
bun init -y
```

Update `package.json`:
```json
{
  "name": "my-monorepo",
  "private": true,
  "workspaces": ["apps/*", "packages/*"],
  "scripts": {
    "dev:web": "bun --filter web dev",
    "dev:native": "bun --filter native tauri dev",
    "build:web": "bun --filter web build",
    "build:native": "bun --filter native tauri build"
  }
}
```

> Bun supports npm-style `workspaces` natively (https://bun.com/docs/pm/workspaces).

### 2. Create Next.js Web App

```bash
mkdir -p apps/web
cd apps/web
bun create next-app@latest . --typescript --tailwind --eslint
```

**Critical: Update `next.config.ts`** for Tauri compatibility (https://v2.tauri.app/start/frontend/nextjs/):
```ts
const nextConfig = {
  output: 'export',           // ✅ Required: Tauri doesn't support SSR
  images: { unoptimized: true }, // ✅ Disable Next.js image optimization
  assetPrefix: process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:3000',
};
export default nextConfig;
```

### 3. Create Tauri Native App

From the **root** (not inside apps/web):
```bash
cd apps
bunx @tauri-apps/cli@latest init native
# Or: bun create tauri-app native
```

Answer prompts:
- Package manager: `bun`
- UI template: `React`
- TypeScript: `Yes`

### 4. Configure Tauri to Use Next.js Build

Edit `apps/native/src-tauri/tauri.conf.json`:
```json
{
  "build": {
    "beforeDevCommand": "bun --filter web dev",
    "beforeBuildCommand": "bun --filter web build",
    "devUrl": "http://localhost:3000",
    "frontendDist": "../../apps/web/out"
  }
}
```

> Tauri expects a static export (`out/` dir) from Next.js when bundled (https://v2.tauri.app/start/frontend/nextjs/).

### 5. Create Shared UI Package

```bash
mkdir -p packages/ui
cd packages/ui
bun init -y
```

`packages/ui/package.json`:
```json
{
  "name": "@repo/ui",
  "type": "module",
  "exports": {
    "./components/*": "./src/components/*.tsx",
    "./hooks/*": "./src/hooks/*.ts",
    "./lib/*": "./src/lib/*.ts"
  },
  "peerDependencies": {
    "react": "^18",
    "react-dom": "^18"
  }
}
```

Install shared deps:
```bash
# From root:
bun add react react-dom --filter @repo/ui
bun add tailwindcss postcss autoprefixer --filter @repo/ui -D
```

### 6. Link Shared Code to Apps

In both `apps/web/tsconfig.json` and `apps/native/tsconfig.json`:
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@repo/ui/*": ["../../packages/ui/src/*"]
    }
  }
}
```

Install the shared package:
```bash
bun add @repo/ui --filter web --filter native
```

---

## ⚠️ Common Pitfalls & Solutions

| Issue | Solution |
|-------|----------|
| **`navigator is not defined`** | Tauri APIs only work in browser context. Wrap `@tauri-apps/api` imports in `useEffect` or dynamic `import()` (https://github.com/permafrost-dev/nextjs-tauri-template) |
| **Next.js SSR conflicts** | Always use `output: 'export'` — Tauri bundles static files only (https://v2.tauri.app/start/frontend/nextjs/) |
| **Bun + Tauri CLI compatibility** | Use `bunx @tauri-apps/cli` or ensure `@tauri-apps/cli` is in `devDependencies` |
| **Mobile build errors** | Install Xcode (iOS) / Android Studio (Android) + follow [Tauri Mobile Guide](https://v2.tauri.app/start/prerequisites/) |
| **Path resolution issues** | Use relative paths or `paths` in `tsconfig.json`; avoid absolute imports across workspace boundaries |

---

## 🧪 Development Workflow

```bash
# Install all deps
bun install

# Run Next.js web app only
bun run dev:web  # → http://localhost:3000

# Run Tauri desktop app (loads Next.js dev server)
bun run dev:native

# Build for production
bun run build:web && bun run build:native
```

> For mobile: `bunx tauri android dev` or `bunx tauri ios dev` after setting up prerequisites (https://github.com/Arbarwings/tauri-v2-nextjs-monorepo).

---

## 🎁 Starter Templates (Save Time!)

Instead of building from scratch, consider these Bun-compatible starters:

- [`Arbarwings/tauri-v2-nextjs-monorepo`](https://github.com/Arbarwings/tauri-v2-nextjs-monorepo) — Full monorepo with TurboRepo, shared UI, Shadcn 
- [`nomandhoni-cs/tauri-nextjs-shadcn-boilerplate`](https://github.com/nomandhoni-cs/tauri-nextjs-shadcn-boilerplate) — Bun + Tauri + Next.js + Shadcn + GitHub Actions 
- [`permafrost-dev/nextjs-tauri-template`](https://github.com/permafrost-dev/nextjs-tauri-template) — Simple starter (adapt to Bun) 

---

## 🔗 Key Resources

- [Tauri v2 + Next.js Guide](https://v2.tauri.app/start/frontend/nextjs/) 
- [Bun Workspaces Docs](https://bun.com/docs/pm/workspaces) 
- [Monorepo Guide by Melvin Oostendorp](https://melvinoostendorp.nl/blog/tauri-v2-nextjs-monorepo-guide) — Excellent step-by-step walkthrough 

---

Let me know if you'd like a minimal working example repo structure or help debugging a specific conflict! 🛠️