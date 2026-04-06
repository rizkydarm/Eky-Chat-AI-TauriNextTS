"use client";

import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useColorScheme } from "@mui/material/styles";

export function ThemeToggle() {
  const { mode, setMode } = useColorScheme();
  const [errorOpen, setErrorOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  if (!mode) {
    return null;
  }

  const handleToggle = () => {
    try {
      const newMode = mode === "light" ? "dark" : "light";
      setMode(newMode);
    } catch (err) {
      setErrorMessage("Failed to switch theme");
      setErrorOpen(true);
    }
  };

  return (
    <>
      <IconButton onClick={handleToggle} color="inherit" aria-label="toggle theme">
        {mode === "light" ? <Brightness4Icon /> : <Brightness7Icon />}
      </IconButton>
      <Snackbar open={errorOpen} autoHideDuration={3000} onClose={() => setErrorOpen(false)}>
        <Alert severity="error" onClose={() => setErrorOpen(false)}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
