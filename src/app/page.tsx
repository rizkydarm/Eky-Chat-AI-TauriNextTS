"use client";
import { invoke } from "@tauri-apps/api/core";
import Image from "next/image";
import { useCallback, useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

export default function Home() {
  const [greeted, setGreeted] = useState<string | null>(null);
  const greet = useCallback((): void => {
    invoke<string>("greet")
      .then((s) => {
        setGreeted(s);
      })
      .catch((err: unknown) => {
        console.error(err);
      });
  }, []);

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateRows: "20px 1fr 20px",
        alignItems: "center",
        justifyItems: "center",
        minHeight: "100vh",
        p: 4,
        gap: 4,
      }}
    >
      <Box
        component="main"
        sx={{
          gridRowStart: 2,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          alignItems: { xs: "center", sm: "flex-start" },
        }}
      >
        <Image
          style={{ filter: "var(--image-filter)" }}
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <Box component="ol" sx={{ listStylePosition: "inside", pl: 2 }}>
          <Box component="li" sx={{ mb: 1 }}>
            Get started by editing{" "}
            <code>src/app/page.tsx</code>.
          </Box>
          <Box component="li">Save and see your changes instantly.</Box>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Button variant="outlined" onClick={greet}>
            Call &quot;greet&quot; from Rust
          </Button>
          <Typography sx={{ wordBreak: "break-word", maxWidth: 448 }}>
            {greeted ?? "Click the button to call the Rust function"}
          </Typography>
        </Box>
      </Box>
      <Box
        component="footer"
        sx={{
          gridRowStart: 3,
          display: "flex",
          gap: 2,
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button
          component="a"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
          startIcon={
            <Image
              aria-hidden
              src="/file.svg"
              alt="File icon"
              width={16}
              height={16}
            />
          }
        >
          Learn
        </Button>
        <Button
          component="a"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
          startIcon={
            <Image
              aria-hidden
              src="/window.svg"
              alt="Window icon"
              width={16}
              height={16}
            />
          }
        >
          Examples
        </Button>
        <Button
          component="a"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
          startIcon={
            <Image
              aria-hidden
              src="/globe.svg"
              alt="Globe icon"
              width={16}
              height={16}
            />
          }
        >
          Go to nextjs.org →
        </Button>
      </Box>
    </Box>
  );
}
