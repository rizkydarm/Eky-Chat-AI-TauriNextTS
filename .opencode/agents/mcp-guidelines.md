MCP Tools Usage Strategy for Eky Chat AI

Available MCP Servers (Partial list)
- context7, github, grep, exa, deepwiki, sequential-thinking, memory, semgrep, narsil

Core Rule: Use MCP only when necessary. Do not call repeatedly.

When to use each tool:

context7 (Use frequently but only once per library/component)
- Before writing code that uses a new MUI component (e.g., DataGrid, DatePicker).
- Before writing code that uses a Tauri API (e.g., plugin-sql, dialog).
- Before using a React feature that has changed in v19 (e.g., `use` hook, `useOptimistic`).
- How to call: one request per library/topic. Example: "Get latest MUI Table API docs".

github / grep (Avoid unless necessary)
- Only use when context7 does not contain enough examples or when you need to see real-world usage of a very specific pattern.
- Do not use for trivial things like "how to map an array in React". That is basic knowledge.
- If you must search, use `grep` to search the existing codebase first (to understand current patterns), then `github` for external examples.

exa, deepwiki (Avoid)
- These are for research or deep wiki dives. Not needed for standard UI development. Use only if the user explicitly asks for information from external sources.

sequential-thinking (Debugging only)
- Use when you encounter a bug that requires step-by-step reasoning (e.g., state update not reflecting, race condition).
- Do not use for routine coding.

memory, semgrep, narsil (Debugging only)
- memory: to remember past debugging context across sessions. Not for normal development.
- semgrep: to scan for security issues after writing code. The user said no testing now, so avoid.
- narsil: advanced static analysis. Not needed in development mode.

Chaining MCP calls
- Never chain multiple MCP calls (e.g., context7 then github then exa) unless the first call fails to provide necessary information.
- If you need documentation, use context7 once. If it lacks examples, then consider a single github search.

Example of good MCP usage
User: "Create a chat message list with virtual scrolling using MUI"
Agent: (calls context7 once for "MUI virtualized list" or "MUI List + react-window"). Then writes code without further MCP calls.

Example of bad MCP usage
Agent: calls context7 for List, then calls github for "MUI List example", then calls exa for "MUI List best practices" – this is excessive.

Remember: The existing codebase already contains many patterns. Read the local files first using `grep` or directly by looking at the shared/view and shared/core folders. Do not assume you need external references for everything.