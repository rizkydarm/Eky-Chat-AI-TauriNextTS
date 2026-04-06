"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import SendIcon from "@mui/icons-material/Send";

import { PageShell } from "@/view/layouts/page-shell";

export default function ChatPage() {
  const router = useRouter();
  const [input, setInput] = useState("");

  const handleSubmit = useCallback(() => {
    if (!input.trim()) return;
    router.push("/chat/1");
  }, [input, router]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        handleSubmit();
      }
    },
    [handleSubmit]
  );

  return (
    <PageShell title="New Chat">
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          maxWidth: 720,
          width: "100%",
          mx: "auto",
          px: 2,
          gap: 4,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1,
          }}
        >
          <AutoAwesomeIcon sx={{ fontSize: 48, color: "primary.main" }} />
          <Typography variant="h5" fontWeight={600}>
            How can I help you today?
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Start a conversation with your AI assistant.
          </Typography>
        </Box>

        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          <TextField
            fullWidth
            multiline
            maxRows={6}
            placeholder="Message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 3,
              },
            }}
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <IconButton
              onClick={handleSubmit}
              disabled={!input.trim()}
              color="primary"
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
    </PageShell>
  );
}
