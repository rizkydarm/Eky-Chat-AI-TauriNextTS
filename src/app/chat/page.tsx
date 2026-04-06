"use client";

import { useState, useCallback } from "react";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { ThemeToggle } from "@/view/components/theme-toggle";
import Link from "next/link";

const DRAWER_WIDTH = 240;

export default function ChatPage() {
  const [input, setInput] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleSubmit = useCallback(() => {
    if (!input.trim()) return;
    console.log("Sending:", input);
    setInput("");
  }, [input]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        handleSubmit();
      }
    },
    [handleSubmit]
  );

  const toggleDrawer = useCallback(() => {
    setDrawerOpen((prev) => !prev);
  }, []);

  const closeDrawer = useCallback(() => {
    setDrawerOpen(false);
  }, []);

  const drawerContent = (
    <Box sx={{ width: DRAWER_WIDTH }}>
      <List>
        <ListItem>
          <IconButton component={Link} href="/" aria-label="back" sx={{ mr: 1 }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="subtitle1">Chat AI</Typography>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={closeDrawer}>
            <ListItemText primary="New Chat" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={closeDrawer}>
            <ListItemText primary="History" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={closeDrawer}>
            <ListItemText primary="Settings" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton color="inherit" onClick={toggleDrawer} edge="start" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Chat
          </Typography>
          <ThemeToggle />
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={closeDrawer}>
        {drawerContent}
      </Drawer>

      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          maxWidth: 800,
          width: "100%",
          mx: "auto",
          p: 2,
          gap: 2,
        }}
      >
        <TextField
          fullWidth
          multiline
          rows={6}
          placeholder="Type your message here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          sx={{
            "& .MuiInputBase-root": {
              fontSize: "1.125rem",
              alignItems: "flex-start",
            },
          }}
        />

        <Box sx={{ alignSelf: "flex-end" }}>
          <IconButton
            onClick={handleSubmit}
            disabled={!input.trim()}
            color="primary"
            size="large"
            sx={{
              bgcolor: "primary.main",
              color: "primary.contrastText",
              "&:hover": { bgcolor: "primary.dark" },
              "&.Mui-disabled": { bgcolor: "action.disabledBackground" },
            }}
          >
            <SendIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}
