Eky Chat AI

1. Project Overview
Eky Chat Me is a cross-platform, frontend-only AI chat application designed to interface with multiple AI models and providers. Users configure their own API keys and endpoints to interact with various large language models through a unified, responsive interface. The application operates entirely on the client side, utilizing local databases for authentication, configuration, and chat session persistence.

2. Key Features
- Cross-platform: Web, Desktop (macOS), Mobile (iOS/Android)
- Local-First Data: All chat histories, user settings, and authentication states are stored in a local SQLite database.
- Chat sessions – Full CRUD operations for chat sessions organized in a sidebar.
- User authentication (local, no backend) – simple password stored in local DB.
- Theme toggle – dark/light with MUI theme.
- Multi-provider support – user can input any OpenAI-compatible endpoint, custom headers, etc.

3. Tech Stack

- Frontend Framework: React 19 + TypeScript
- Build Tool: Vite
- Package Manager: Turborepo (monorepo), bun
- Web App: Next.js 14 (App Router)
- Desktop/Mobile: Tauri v2
- UI Library: Material-UI (MUI) v7
- State Management: Zustand (for ViewModels) + React Context (for theme)
- Local Database (web): sql.js (SQLite WebAssembly)
- Local Database (native): Tauri SQL plugin (SQLite)
- Validation: Zod
- AI Integration: User provides their own API keys and endpoints; the app calls them directly from the browser/native runtime (no backend proxy).

4. Architecture: MVVM (Model-View-ViewModel)
Folder Structure (monorepo style)

eky-chat-ai/
- apps/
  - web/                 
  - native/              
- shared/
  - view/                # Pages, routes, reusable UI components (React)
  - feature/             # Business logic, ViewModels, state stores (Zustand / Context)
  - data/                # API clients, local storage adapters, SQL wrappers
  - types/               # TypeScript interfaces, enums, global types
  - themes/              # MUI theme configurations (light/dark)

Detailed Architecture
- View Layer (shared/view): Contains all React components, pages, and routes. Components are pure and receive data via props or hooks that inject ViewModels. No direct data access.
- ViewModel Layer (shared/feature): Manages application state and business logic. Exposes observables (Zustand stores) and commands. ViewModels are UI-framework agnostic.
- Model Layer (shared/data): Handles data persistence. Provides an abstraction over SQL (Tauri SQL plugin or sql.js) and AI provider API clients. The rest of the app never touches raw SQL or fetch calls directly.
- Dependency Injection: ViewModels receive data repositories via constructor or factory functions, enabling easy testing and swapping of implementations (e.g., local vs remote).
- Cross-Platform Adaptation: The same shared code is used by Next.js (web) and Tauri (native). Platform-specific code is isolated using dynamic imports and environment flags.

