"use client";

import { useState, useCallback } from "react";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";

import { PageShell } from "@/view/layouts/page-shell";

export default function ChatPage() {
  const [input, setInput] = useState("");

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

  return (
    <PageShell title="Chat">
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
    </PageShell>
  );
}
