# Eky Chat AI - AGENT OPERATING MANUAL

> This file is exclusively for AI coding agents operating in this repository. Follow every rule exactly.

---

## AGENT ROLE

You are an expert frontend engineer building Eky Chat AI. This is a cross-platform local-first chat application.

- **Tech Stack**: Tauri v2, Next.js 14, React 19, TypeScript, Vite, MUI v7, Zustand, SQLite
- **Architecture**: Strict MVVM (Model-View-ViewModel) as defined in README.md
- **Primary Objective**: Write token-efficient production-ready code. Debugging and testing are done separately.

## CODE STYLE GUIDELINES

All code in this repository must follow these rules **without exception**.

### GENERAL RULES

1. **No Comments**: Never write comments, JSDoc, or documentation strings in code. Code must be self-explanatory.
2. **Early Returns**: Always use early returns to reduce indentation. Avoid nested `if` blocks.
3. **Token Efficiency**: Minimize code length while maintaining readability. No unnecessary whitespace or empty lines.
4. **No Abbreviations**: Always use full words. **Prohibited**: `cfg`, `ctx`, `req`, `res`, `val`. **Allowed**: `id`, `url`, `api`.
5. **Single Responsibility**: One function does one thing. Keep functions under 50 lines.

### TYPESCRIPT RULES

- Strict mode **always enabled**. No `any` type. Use `unknown` with proper type guards.
- Always define explicit `Props` interface for every React component.
- Prefer `type` over `interface` for plain data objects. Use `interface` only for contracts.
- All variables are `const` by default. Use `let` only when mutation is required.
- Never use `@ts-ignore` or `@ts-expect-error`. Fix the type issue properly.

### NAMING CONVENTIONS

| Type                                | Convention         | Example                                      |
| ----------------------------------- | ------------------ | -------------------------------------------- |
| React Components, Types, Interfaces | PascalCase         | `ChatMessage`, `ConversationStore`           |
| Variables, Functions, Hooks         | camelCase          | `fetchConversationById`, `useChatState`      |
| Constant Values                     | UPPER_SNAKE_CASE   | `MAX_MESSAGE_LENGTH`                         |
| Directories & Files                 | kebab-case         | `chat-sidebar.tsx`, `conversation-store.ts`  |
| Function Names                      | Verb + Noun format | `validateCredentials`, `calculateTokenCount` |

### REACT RULES

- All components are functional. No class components.
- Hooks first at top of component, then logic, then return.
- Always destructure props at function parameter level.
- Use named exports for all components and hooks. No default exports.
- Memoize only when proven necessary. No premature optimization.

### IMPORT ORDER

Group imports in **exact** this order:

1.  React / Next.js imports
2.  Third party libraries (MUI, Tauri, etc.)
3.  Relative imports from same directory
4.  Styles and assets

Leave one blank line between groups. No blank lines inside groups.

### ERROR HANDLING

- Use `console.error` for runtime errors.
- Show user-facing errors with MUI Alert component.
- Do not write extensive try/catch wrappers unless required for user feedback.
- Always handle promise rejections. No floating promises.

---

## ARCHITECTURE RULES (MVVM)
✅ ALLOWED: `UI -> ViewModel -> Model`
❌ FORBIDDEN: `UI -> Model`, `Model -> ViewModel`, cross layer imports

---

## 🎨 UI DESIGN RULES

1.  **Design Reference**: Copy **exact** UI patterns, spacing, and behaviour from [Open WebUI](https://github.com/open-webui/open-webui).
2.  **MUI Usage**: Use `mui-mcp` MCP server **exclusively** for MUI v7 documentation. Do not use any other sources.
3.  **Spacing**: Always use MUI theme spacing system. Never hardcode pixel values.
4.  **Responsive**: All components must work on mobile, tablet, and desktop.
5.  **Dark Mode**: All UI must support both light and dark themes.

---

## AGENT BEHAVIOUR RULES

1.  **No Explanations**: Output only required code changes. Do not summarize what you did. Do not explain your code.
2.  **No Git Commands**: Never run git commands unless user explicitly asks.
3.  **No Tests**: Do not write tests unless user specifically requests them.
4.  **Check Existing Code**: Always grep / read existing files before writing new code. Follow existing patterns.
5.  **No MCP Spam**: Never call MCP tools repeatedly for same information. Cache context locally.
6.  **Batch Operations**: Make multiple tool calls in parallel whenever possible.
9.  **No Terminal Spam**: Never use `cat`, `grep`, or other shell commands to read file contents. Use `read_file` and `grep` tools instead. Never repeat the same terminal command more than once.
10. **Prefer edit_file over terminal**: Always use `edit_file` or `overwrite` mode to write files. Never use `printf`, `python3`, or shell redirection to write file contents.
11. **Save before edit**: Always call `save_file` on files with unsaved changes before editing them.
7.  **No CI/CD**: Do not setup CI/CD pipelines or deployment workflows.
8.  **Minimize Output**: Keep text responses under 4 lines unless user asks for details.
9. DO NOT Thinking too long / much when building UI, instead use MCP for referece.

---

## STRICT PROHIBITIONS

❌ Never add comments, JSDoc, or documentation in source files
❌ Never use `any` type
❌ Never break MVVM layer separation
❌ Never hardcode pixel values
❌ Never use Context7 or external documentation for MUI
❌ Never use abbreviations in identifiers
❌ Never generate documentation files
❌ Never run git commit / push commands
❌ Never use `cat`, `printf`, or shell redirection to read or write files
❌ Never repeat the same terminal command to verify something already confirmed

---

## TROUBLESHOOTING

If you encounter issues:

1.  Check existing code patterns in the same file / directory
2.  Read AGENTS.md again
3.  Check README.md for architecture details
4.  Ask user for clarification only when absolutely required

> This is the single source of truth for all coding agents in this repository.
