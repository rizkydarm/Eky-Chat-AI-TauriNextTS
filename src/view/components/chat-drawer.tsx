"use client";

import Link from "next/link";

import Box from "@mui/material/Box";
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
import HistoryIcon from "@mui/icons-material/History";
import SettingsIcon from "@mui/icons-material/Settings";

const DRAWER_WIDTH = 240;

type ChatDrawerProps = {
  open: boolean;
  onClose: () => void;
};

export function ChatDrawer({ open, onClose }: ChatDrawerProps) {
  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
    >
      <Box sx={{ width: DRAWER_WIDTH }}>
        <List>
          <ListItem>
            <IconButton
              component={Link}
              href="/"
              aria-label="back"
              sx={{ mr: 1 }}
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="subtitle1">Chat AI</Typography>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              href="/chat"
              onClick={onClose}
            >
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              <ListItemText primary="New Chat" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              href="/history"
              onClick={onClose}
            >
              <ListItemIcon>
                <HistoryIcon />
              </ListItemIcon>
              <ListItemText primary="History" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              href="/settings"
              onClick={onClose}
            >
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
