Eky Chat AI

1. Project Overview
Eky Chat AI is a cross-platform, frontend-only AI chat application designed to interface with multiple AI models and providers. Users configure their own API keys and endpoints to interact with various large language models through a unified, responsive interface. The application operates entirely on the client side, utilizing local databases for authentication, configuration, and chat session persistence.

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

Application Pages & UI Layout
The user interface of Eky Chat AI is heavily inspired by Open WebUI and ChatGPT UI.

1. Homepage (Chat Interface)
   - Central chat area with message bubbles (user and assistant).
   - Input field at the bottom with support for multi-line text, send button, and optional stop generation button.
   - Streaming responses displayed in real-time.
   - Top bar shows current session title and a button to open sidebar (on mobile) or settings.
   - Empty state: welcome message and example prompts.
   - Markdown rendering for assistant messages (code blocks, tables, lists).
   - Copy message content, regenerate response, delete message options per bubble.

2. Sidebar (Session Management & Navigation)
   - Persistent on desktop (left side), slide-out drawer on mobile.
   - New Chat button at the top.
   - List of existing chat sessions grouped by date (Today, Yesterday, Previous 7 days, Older).
   - Each session item shows title (auto-generated from first user message), preview of last message, and timestamp.
   - Context menu (or icons) on each session: rename, delete, duplicate.
   - Drag-and-drop reordering of sessions (optional).
   - At the bottom of sidebar: Settings button and Theme toggle (light/dark).
   - Collapse/expand sidebar on desktop.

3. Settings Page
   - Accessible from sidebar (gear icon). Opens as a modal. button is in bottom right of sidebar
   - Tabs or sections:
     a) General Settings
        - Theme selection (light, dark, system).
        - Language (if multi-language planned).
        - Font size (slider).
     b) AI Provider Configuration
        - List of providers (OpenAI, Anthropic, Groq, Ollama, custom OpenAI-compatible).
        - For each provider: API endpoint URL, API key (masked input), model name (dropdown or text).
        - Test connection button.
        - Default provider and model selection for new chats.
     c) Chat Settings
        - Default system prompt (text area).
        - Temperature, max tokens, top_p (advanced expandable).
        - Streaming enabled/disabled.
     d) Data Management
        - Export all sessions (JSON or SQLite export).
        - Import sessions (from JSON).
        - Clear all history (with confirmation).
        - Database location (display only, for native apps).
     e) About
        - App version (from Tauri or package.json).
        - Link to repository.

4. Navigation Flow
   - Clicking "New Chat" creates a session and focuses on empty input.
   - Clicking an existing session loads its full message history into the chat area.
   - Deleting a session removes it from sidebar and clears current chat if active.
   - Settings changes are saved instantly to local database (or via Tauri store plugin) and applied without restart.

5. Responsive Behavior
   - Web: full window, sidebar resizable.
   - Desktop (Tauri): same as web, with native window controls.
   - Mobile (Tauri): bottom navigation bar (optional) or sidebar as drawer; input field adjusted for virtual keyboard.