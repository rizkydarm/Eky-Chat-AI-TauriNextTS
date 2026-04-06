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
import { Container, ContainerProps } from "@mui/material";

export const PageContainer = ({ children, ...props }: ContainerProps) => (
  <Container maxWidth="lg" sx={{ py: 3 }} {...props}>
    {children}
  </Container>
);
```

## File: ui-guidelines.md (additional section for TSX code style)

Insert the following content into the ui-guidelines.md file, under a new subsection "TSX Code Formatting Rules".

TSX Code Formatting Rules

Vertical properties for JSX elements with more than one prop

When a JSX element has more than one property, each property MUST be placed on its own line, indented one level. The closing bracket of the opening tag and the children (if any) follow on a new line.

Correct example:
```tsx
<IconButton
  color="inherit"
  onClick={toggleDrawer}
  edge="start"
  sx={{ mr: 2 }}
>
  <MenuIcon />
</IconButton>
```

Incorrect example (single line with multiple props):
```tsx
<IconButton color="inherit" onClick={toggleDrawer} edge="start" sx={{ mr: 2 }}>
  <MenuIcon />
</IconButton>
```

Exception for a single property

If the element has exactly ONE property, it MAY remain on the same line as the opening tag.

Example:
```tsx
<Container maxWidth="lg">
  {children}
</Container>
```

Self-closing elements with multiple props

Apply the same rule: each prop on its own line, with the self-closing bracket on the last line.

Example:
```tsx
<TextField
  label="Email"
  type="email"
  value={email}
  onChange={handleChange}
  fullWidth
/>
```

Props that are themselves JSX or objects

For complex prop values (e.g., `sx` with multiple rules, `style` objects), break the inner value into multiple lines as well.

Example:
```tsx
<Box
  sx={{
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    p: 3
  }}
>
  Content
</Box>
```

Enforcement

This rule applies to all TSX/JSX files in the project. The project's Prettier configuration should be set to `printWidth: 80` and `jsxBracketSameLine: false` to encourage vertical formatting. Manual review during code generation must follow this style to keep diffs clean and code readable.
