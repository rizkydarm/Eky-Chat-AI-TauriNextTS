"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { PageShell } from "@/view/layouts/page-shell";

export default function HistoryPage() {
  return (
    <PageShell title="History">
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          p: 4,
        }}
      >
        <Typography
          variant="h6"
          color="text.secondary"
        >
          No chat history yet.
        </Typography>
      </Box>
    </PageShell>
  );
}
