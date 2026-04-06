"use client";

import { useState, useCallback } from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";

import { ChatDrawer } from "@/view/components/chat-drawer";
import { ThemeToggle } from "@/view/components/theme-toggle";

type PageShellProps = {
  title: string;
  children: React.ReactNode;
};

export function PageShell({ title, children }: PageShellProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = useCallback(() => setDrawerOpen((prev) => !prev), []);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <AppBar position="static">
        <Toolbar>
          <IconButton color="inherit" onClick={toggleDrawer} edge="start" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
          <ThemeToggle />
        </Toolbar>
      </AppBar>
      <ChatDrawer open={drawerOpen} onCloseAction={closeDrawer} />
      {children}
    </Box>
  );
}
