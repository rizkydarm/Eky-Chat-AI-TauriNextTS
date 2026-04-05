React 19 + TypeScript Guidelines for Eky Chat AI

Coding Conventions
- Use functional components with explicit `FC<Props>` or just `({ prop }: Props) =>`.
- Props interface naming: `ComponentNameProps`.
- Use named exports for components, default exports only for pages or lazy-loaded routes.
- One component per file.

TypeScript Strict Rules
- Enable `strict`, `noImplicitAny`, `strictNullChecks`, `noUnusedLocals` in tsconfig.json.
- Never use `any`. For third-party libraries without types, use `declare module` or `unknown` with runtime checks.
- Use `type` for union types and complex shapes; use `interface` for objects that might be extended.
- Prefer `readonly` for props and state that shouldn't mutate.

State Management (MVVM)
- ViewModels are Zustand stores placed in `shared/core/stores/`.
- Each store should have a small, focused state and actions.
- Do not put business logic in React components; components only call actions from stores.
- Example store:
  ```ts
  import { create } from 'zustand';
  interface SessionStore {
    sessions: Session[];
    loadSessions: () => Promise<void>;
  }
  export const useSessionStore = create<SessionStore>((set) => ({
    sessions: [],
    loadSessions: async () => {
      const data = await sessionRepository.getAll();
      set({ sessions: data });
    },
  }));
  ```

React Component Patterns
- Keep components pure: same props + same store state = same output.
- Use `React.memo` only for components that render often and have complex props.
- Use `useCallback` and `useMemo` only for expensive computations or to stabilize child component props.
- Do not over-optimize prematurely.

Code Style (Enforced by ESLint + Prettier)
- ESLint config: `@typescript-eslint/recommended`, `react/recommended`, `react-hooks/recommended`.
- Prettier config: semi: true, singleQuote: true, trailingComma: 'es5', printWidth: 100.
- Run `pnpm lint --fix` before committing.

Clean Code (SOLID & KISS)
- Single Responsibility: Each function/component does one thing.
- Open/Closed: Use composition over inheritance (React already encourages this).
- Liskov Substitution: Not directly applicable but ensure props substitution works.
- Interface Segregation: Split large prop interfaces into smaller ones.
- Dependency Inversion: High-level modules (ViewModels) depend on abstractions (repositories interfaces), not concrete SQL or API implementations.
- KISS: Avoid complex patterns like render props or HOCs unless absolutely necessary. Prefer hooks.

Example of Good Code (Without MCP Overuse)
Instead of searching GitHub for a pattern, write based on known best practices:
```ts
// shared/core/stores/themeStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type ThemeMode = 'light' | 'dark';

interface ThemeStore {
  mode: ThemeMode;
  toggle: () => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      mode: 'light',
      toggle: () => set((state) => ({ mode: state.mode === 'light' ? 'dark' : 'light' })),
    }),
    { name: 'theme-storage' }
  )
);
```

Do Not Write Comments or JSDoc
- The code must be self-documenting through clear naming and structure.