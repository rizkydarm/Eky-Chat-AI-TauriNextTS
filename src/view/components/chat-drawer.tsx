"use client";

import { useState, useCallback } from "react";
import Link from "next/link";

import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HistoryIcon from "@mui/icons-material/History";
import SettingsIcon from "@mui/icons-material/Settings";

const DRAWER_WIDTH = 240;

type ChatHistory = {
  id: string;
  title: string;
};

const DUMMY_HISTORIES: ChatHistory[] = [
  { id: "1", title: "How to learn TypeScript" },
  { id: "2", title: "MUI v7 dark theme setup" },
  { id: "3", title: "Tauri vs Electron comparison" },
  { id: "4", title: "Zustand state management" },
  { id: "5", title: "Next.js App Router guide" },
];

type ChatDrawerProps = {
  open: boolean;
  onCloseAction: () => void;
};

export function ChatDrawer({ open, onCloseAction }: ChatDrawerProps) {
  const [historyOpen, setHistoryOpen] = useState(false);
  const [histories, setHistories] = useState<ChatHistory[]>(DUMMY_HISTORIES);

  const toggleHistory = useCallback(() => setHistoryOpen((prev) => !prev), []);

  const deleteHistory = useCallback((id: string) => {
    setHistories((prev) => prev.filter((item) => item.id !== id));
  }, []);

  return (
    <Drawer anchor="left" open={open} onClose={onCloseAction}>
      <Box sx={{ width: DRAWER_WIDTH }}>
        <List disablePadding>
          <ListItem>
            <IconButton component={Link} href="/" aria-label="back" sx={{ mr: 1 }}>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="subtitle1">Chat AI</Typography>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton component={Link} href="/chat" onClick={onCloseAction}>
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              <ListItemText primary="New Chat" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={toggleHistory}>
              <ListItemIcon>
                <HistoryIcon />
              </ListItemIcon>
              <ListItemText primary="History" />
              {historyOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </ListItemButton>
          </ListItem>

          <Collapse in={historyOpen} timeout="auto" unmountOnExit>
            <List disablePadding>
              {histories.map((item) => (
                <ListItem
                  key={item.id}
                  disablePadding
                  secondaryAction={
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      size="small"
                      onClick={() => deleteHistory(item.id)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  }
                >
                  <ListItemButton
                    sx={{ pl: 4, pr: 6 }}
                    component={Link}
                    href={`/chat/${item.id}`}
                    onClick={onCloseAction}
                  >
                    <ListItemText
                      primary={item.title}
                      slotProps={{
                        primary: {
                          variant: "body2",
                          noWrap: true,
                        },
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Collapse>

          <ListItem disablePadding>
            <ListItemButton component={Link} href="/settings" onClick={onCloseAction}>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
}
