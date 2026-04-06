"use client";

import { useState, useCallback } from "react";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AssistantIcon from "@mui/icons-material/Assistant";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CloseIcon from "@mui/icons-material/Close";
import HistoryIcon from "@mui/icons-material/History";
import LogoutIcon from "@mui/icons-material/Logout";
import PaletteIcon from "@mui/icons-material/Palette";
import SmartToyIcon from "@mui/icons-material/SmartToy";

import { PageShell } from "@/view/layouts/page-shell";

type DialogKey = "profile" | "ai-provider" | "ai-model" | "history" | "theme" | "logout";

type SettingsItem = {
  label: string;
  description: string;
  icon: React.ReactNode;
  dialogKey: DialogKey;
  danger?: boolean;
};

type SettingsGroup = {
  title: string;
  items: SettingsItem[];
};

const SETTINGS_GROUPS: SettingsGroup[] = [
  {
    title: "Account",
    items: [
      {
        label: "Profile",
        description: "Manage your display name and avatar",
        icon: <AccountCircleIcon />,
        dialogKey: "profile",
      },
      {
        label: "Logout",
        description: "Sign out of your account",
        icon: <LogoutIcon />,
        dialogKey: "logout",
        danger: true,
      },
    ],
  },
  {
    title: "AI",
    items: [
      {
        label: "AI Provider",
        description: "Configure endpoint and API key",
        icon: <SmartToyIcon />,
        dialogKey: "ai-provider",
      },
      {
        label: "AI Model",
        description: "Set default model for new chats",
        icon: <AssistantIcon />,
        dialogKey: "ai-model",
      },
    ],
  },
  {
    title: "Data",
    items: [
      {
        label: "History",
        description: "View and manage your chat history",
        icon: <HistoryIcon />,
        dialogKey: "history",
      },
    ],
  },
  {
    title: "Appearance",
    items: [
      {
        label: "Theme",
        description: "Switch between light and dark mode",
        icon: <PaletteIcon />,
        dialogKey: "theme",
      },
    ],
  },
];

const DIALOG_TITLES: Record<DialogKey, string> = {
  profile: "Profile",
  "ai-provider": "AI Provider",
  "ai-model": "AI Model",
  history: "History",
  theme: "Theme",
  logout: "Logout",
};

function ProfileForm() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 1 }}>
      <TextField label="Display Name" defaultValue="User" fullWidth />
      <TextField label="Avatar URL" placeholder="https://..." fullWidth />
    </Box>
  );
}

function AiProviderForm() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 1 }}>
      <TextField label="Endpoint URL" placeholder="https://api.openai.com/v1" fullWidth />
      <TextField label="API Key" type="password" placeholder="sk-..." fullWidth />
    </Box>
  );
}

function AiModelForm() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 1 }}>
      <TextField label="Model Name" placeholder="gpt-4o" fullWidth />
      <TextField
        label="Temperature"
        type="number"
        defaultValue="0.7"
        inputProps={{ min: 0, max: 2, step: 0.1 }}
        fullWidth
      />
      <TextField label="Max Tokens" type="number" defaultValue="2048" fullWidth />
    </Box>
  );
}

function HistoryForm() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 1 }}>
      <Typography variant="body2" color="text.secondary">
        You have 5 saved chat sessions.
      </Typography>
      <Button variant="outlined" color="error" fullWidth>
        Clear All History
      </Button>
    </Box>
  );
}

function ThemeForm() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 1 }}>
      <TextField label="Theme" select defaultValue="dark" fullWidth SelectProps={{ native: true }}>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="system">System</option>
      </TextField>
    </Box>
  );
}

function LogoutForm() {
  return (
    <Box sx={{ pt: 1 }}>
      <Typography variant="body2" color="text.secondary">
        Are you sure you want to sign out? Your local data will remain on this device.
      </Typography>
    </Box>
  );
}

function renderDialogForm(key: DialogKey) {
  if (key === "profile") return <ProfileForm />;
  if (key === "ai-provider") return <AiProviderForm />;
  if (key === "ai-model") return <AiModelForm />;
  if (key === "history") return <HistoryForm />;
  if (key === "theme") return <ThemeForm />;
  if (key === "logout") return <LogoutForm />;
}

type SettingsListItemProps = {
  item: SettingsItem;
  onOpenDialog: (key: DialogKey) => void;
};

function SettingsListItem({ item, onOpenDialog }: SettingsListItemProps) {
  const color = item.danger ? "error.main" : "text.primary";
  return (
    <ListItemButton onClick={() => onOpenDialog(item.dialogKey)} sx={{ borderRadius: 1 }}>
      <ListItemIcon sx={{ color: item.danger ? "error.main" : "text.secondary" }}>
        {item.icon}
      </ListItemIcon>
      <ListItemText
        primary={
          <Typography variant="body1" sx={{ color }}>
            {item.label}
          </Typography>
        }
        secondary={item.description}
      />
      <ChevronRightIcon sx={{ color: "text.disabled" }} />
    </ListItemButton>
  );
}

export default function SettingsPage() {
  const [activeDialog, setActiveDialog] = useState<DialogKey | null>(null);

  const openDialog = useCallback((key: DialogKey) => setActiveDialog(key), []);
  const closeDialog = useCallback(() => setActiveDialog(null), []);

  return (
    <PageShell title="Settings">
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          maxWidth: 600,
          width: "100%",
          mx: "auto",
          p: 2,
          gap: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            p: 2,
            mb: 1,
          }}
        >
          <Avatar sx={{ width: 56, height: 56 }}>U</Avatar>
          <Box>
            <Typography variant="h6">User</Typography>
            <Typography variant="body2" color="text.secondary">
              Local account
            </Typography>
          </Box>
        </Box>

        {SETTINGS_GROUPS.map((group, groupIndex) => (
          <Box key={group.title}>
            <Typography
              variant="caption"
              sx={{
                px: 2,
                pb: 0.5,
                display: "block",
                color: "text.secondary",
                textTransform: "uppercase",
                letterSpacing: 1,
                fontWeight: 600,
              }}
            >
              {group.title}
            </Typography>
            <List
              disablePadding
              sx={{
                bgcolor: "background.paper",
                borderRadius: 2,
                overflow: "hidden",
                border: 1,
                borderColor: "divider",
              }}
            >
              {group.items.map((item, itemIndex) => (
                <Box key={item.label}>
                  <ListItem disablePadding>
                    <SettingsListItem item={item} onOpenDialog={openDialog} />
                  </ListItem>
                  {itemIndex < group.items.length - 1 && <Divider variant="inset" component="li" />}
                </Box>
              ))}
            </List>
            {groupIndex < SETTINGS_GROUPS.length - 1 && <Box sx={{ mb: 2 }} />}
          </Box>
        ))}
      </Box>

      <Dialog
        open={activeDialog !== null}
        onClose={closeDialog}
        PaperProps={{
          sx: { width: "80%", maxWidth: "80%", maxHeight: "80vh" },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {activeDialog ? DIALOG_TITLES[activeDialog] : ""}
          <IconButton aria-label="close" onClick={closeDialog} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>{activeDialog && renderDialogForm(activeDialog)}</DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Cancel</Button>
          <Button variant="contained" onClick={closeDialog}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </PageShell>
  );
}
