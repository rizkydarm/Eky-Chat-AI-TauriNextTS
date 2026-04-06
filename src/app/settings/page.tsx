"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { PageShell } from "@/view/layouts/page-shell";

export default function SettingsPage() {
  return (
    <PageShell title="Settings">
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          p: 4,
        }}
      >
        <Typography variant="h5">Settings</Typography>
      </Box>
    </PageShell>
  );
}
