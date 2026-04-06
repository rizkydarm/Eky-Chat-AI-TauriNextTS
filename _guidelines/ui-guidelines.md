UI Development Guidelines (Material-UI v7)

Design Reference

- Follow Open WebUI (https://github.com/open-webui/open-webui) chat interface patterns and design language
- Match chat message styling, spacing, layout, and interaction patterns from Open WebUI
- Maintain consistency with Open WebUI's visual hierarchy for chat UI components

Philosophy

- Use official MUI v7 components exclusively. Always use mui-mcp tool for correct component documentation and usage examples
- Do not use Context7 or external documentation sources for MUI references
- All styling should use MUI's `sx` prop or `styled` API. Do not write plain CSS files.
- Theme is defined in `shared/themes/theme.ts` (light and dark variants).

Component Reusability

- Create shared UI components in `shared/view/ui/` that wrap MUI components with default props.
- Example: `Button.tsx` that wraps MuiButton with consistent sizing and variant.
- Do not duplicate styling logic across pages.

Theme Configuration

```ts
// shared/themes/theme.ts
import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: { mode: "light", primary: { main: "#1976d2" } },
});
export const darkTheme = createTheme({
  palette: { mode: "dark", primary: { main: "#90caf9" } },
});
```

Error Handling with Alerts

- Use MUI's Snackbar or Alert component for user-facing errors.
- Create a global error store in `shared/core/stores/errorStore.ts` that holds the current error message.
- Any caught error (including stack trace) should be displayed using this store.
- Example:
  ```ts
  // In a component
  try {
    await riskyOperation();
  } catch (err) {
    useErrorStore.getState().setError(err.message || String(err));
  }
  ```
- The main layout component subscribes to the error store and shows a Snackbar with auto-hide.

No Custom CSS Classes

- Do not write `.css` files or `makeStyles` (deprecated). Use `sx` prop for one-off styles.
- For reusable styles, create a `styled` component: `const MyDiv = styled('div')(({ theme }) => ({ ... }));`.

Responsive Design

- Use MUI's breakpoints in `sx`:
  ```tsx
  <Box sx={{ width: { xs: "100%", md: "50%" } }}>...</Box>
  ```
- For mobile (Tauri mobile), ensure touch targets are at least 44px (MUI buttons already satisfy).

Dark/Light Theme Switching

- Use `ThemeProvider` from MUI and a context that reads the mode from `useThemeStore`.
- Wrap the entire app in `CssBaseline` to normalize styles.

Example Shared Component

```tsx
// shared/view/ui/PageContainer.tsx
import { Container, ContainerProps } from "@mui/material";

export const PageContainer = ({ children, ...props }: ContainerProps) => (
  <Container maxWidth="lg" sx={{ py: 3 }} {...props}>
    {children}
  </Container>
);
```
