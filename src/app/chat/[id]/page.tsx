"use client";

import { useState, useCallback, useRef, useEffect } from "react";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import PersonIcon from "@mui/icons-material/Person";
import SendIcon from "@mui/icons-material/Send";
import SmartToyIcon from "@mui/icons-material/SmartToy";

import { PageShell } from "@/view/layouts/page-shell";

type MessageRole = "user" | "assistant";

type ChatMessage = {
  id: string;
  role: MessageRole;
  content: string;
};

const DUMMY_MESSAGES: ChatMessage[] = [
  {
    id: "1",
    role: "user",
    content: "Hello! Can you help me understand TypeScript generics?",
  },
  {
    id: "2",
    role: "assistant",
    content:
      "Sure! TypeScript generics let you write flexible, type-safe code that works with multiple types. Think of them as placeholders for types that get filled in when you use the function or class.",
  },
  {
    id: "3",
    role: "user",
    content: "Can you give me a simple example?",
  },
  {
    id: "4",
    role: "assistant",
    content:
      "Here's a classic example:\n\nfunction identity<T>(value: T): T {\n  return value;\n}\n\nconst result = identity<string>(\"hello\");\n\nThe T is a type parameter — when you call identity<string>, TypeScript knows the input and output are both strings.",
  },
  {
    id: "5",
    role: "user",
    content: "That makes sense, thank you!",
  },
];

type ChatBubbleProps = {
  message: ChatMessage;
};

function ChatBubble({ message }: ChatBubbleProps) {
  const isUser = message.role === "user";
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
        alignItems: "flex-end",
        gap: 1,
        mb: 2,
      }}
    >
      {!isUser && (
        <Avatar sx={{ width: 32, height: 32, bgcolor: "primary.main" }}>
          <SmartToyIcon sx={{ fontSize: 18 }} />
        </Avatar>
      )}
      <Box
        sx={{
          maxWidth: "70%",
          px: 2,
          py: 1.5,
          borderRadius: isUser ? "16px 16px 4px 16px" : "4px 16px 16px 16px",
          bgcolor: isUser ? "primary.main" : "background.paper",
          border: isUser ? "none" : 1,
          borderColor: "divider",
          color: isUser ? "primary.contrastText" : "text.primary",
        }}
      >
        <Typography
          variant="body1"
          sx={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}
        >
          {message.content}
        </Typography>
      </Box>
      {isUser && (
        <Avatar sx={{ width: 32, height: 32, bgcolor: "secondary.main" }}>
          <PersonIcon sx={{ fontSize: 18 }} />
        </Avatar>
      )}
    </Box>
  );
}

export default function ChatSessionPage() {
  const [messages, setMessages] = useState<ChatMessage[]>(DUMMY_MESSAGES);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = useCallback(() => {
    if (!input.trim()) return;
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "This is a placeholder response. AI integration coming soon.",
        },
      ]);
    }, 600);
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
    <PageShell title="TypeScript Generics">
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            flex: 1,
            overflow: "auto",
            p: 2,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {messages.map((message) => (
            <ChatBubble key={message.id} message={message} />
          ))}
          <div ref={messagesEndRef} />
        </Box>
        <Box
          sx={{
            p: 2,
            borderTop: 1,
            borderColor: "divider",
            display: "flex",
            alignItems: "flex-end",
            gap: 1,
          }}
        >
          <TextField
            fullWidth
            multiline
            maxRows={4}
            size="small"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
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
    </PageShell>
  );
}
