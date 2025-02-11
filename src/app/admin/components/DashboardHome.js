"use client"
import React from "react";
import { Box, Typography } from "@mui/material";
import Sheet from "@mui/joy/Sheet";
import { useColorScheme } from "@mui/joy/styles";
import { CircularProgress } from "@mui/joy";

export default function DashboardHome() {
  const { mode } = useColorScheme();
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <CircularProgress />;
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor:
          mode === "dark"
            ? "linear-gradient(135deg, #000000, #121212)"
            : "linear-gradient(135deg, #ffffff, #f9fafb)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Background Animation */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
          ...(mode === "dark"
            ? {
                backgroundImage: `
                  radial-gradient(circle, rgba(255, 255, 255, 0.2) 1px, transparent 1px),
                  radial-gradient(circle, rgba(255, 255, 255, 0.1) 2px, transparent 2px)
                `,
                backgroundSize: "40px 40px",
                animation: "twinkle 2s infinite",
              }
            : {
                backgroundImage: `
                  radial-gradient(circle, rgba(255, 215, 0, 0.5) 20%, transparent 20%)
                `,
                backgroundSize: "400px 400px",
                animation: "twinkle 4s infinite",
              }),
        }}
      />

      {/* Main Content */}
      <Sheet
        sx={{
          width: "100%",
          maxWidth: "800px",
          height: "auto",
          p: { xs: 4, sm: 6, md: 8 },
          borderRadius: "24px",
          boxShadow:
            mode === "dark"
              ? "0px 10px 30px rgba(0, 0, 0, 0.5)"
              : "0px 10px 30px rgba(0, 0, 0, 0.1)",
          backgroundColor:
            mode === "dark" ? "rgba(30, 30, 30, 0.8)" : "rgba(255, 255, 255, 0.9)",
          textAlign: "center",
          backdropFilter: "blur(10px)",
          border: mode === "dark" ? "1px solid rgba(255, 255, 255, 0.1)" : "none",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 4,
        }}
      >
        {/* Welcome Message */}
        <Typography
          variant="h1"
          gutterBottom
          sx={{
            fontWeight: "bold",
            fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
            color: mode === "dark" ? "#bb86fc" : "#1976d2",
            textShadow:
              mode === "dark"
                ? "0px 4px 10px rgba(187, 134, 252, 0.5)"
                : "0px 4px 10px rgba(25, 118, 210, 0.3)",
            transition: "color 0.3s ease-in-out",
          }}
        >
          Welcome to Your Dashboard!
        </Typography>

        {/* Subtitle */}
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            color: mode === "dark" ? "#e0e0e0" : "#555555",
            fontWeight: "medium",
            letterSpacing: "0.5px",
            lineHeight: 1.5,
          }}
        >
          Select a tab from the sidebar to view and edit:
        </Typography>

        {/* Feature Boxes */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
            width: "100%",
          }}
        >
          {/* Events Box */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              p: 3,
              borderRadius: "16px",
              backgroundColor:
                mode === "dark" ? "#333333" : "#fff3e0",
              boxShadow:
                mode === "dark"
                  ? "0px 4px 10px rgba(0, 0, 0, 0.3)"
                  : "0px 4px 10px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.3s ease-in-out",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow:
                  mode === "dark"
                    ? "0px 6px 15px rgba(0, 0, 0, 0.4)"
                    : "0px 6px 15px rgba(0, 0, 0, 0.2)",
              },
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                color: mode === "dark" ? "#ffab40" : "#f57c00",
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              📅 Events
            </Typography>
          </Box>

          {/* Posts Box */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              p: 3,
              borderRadius: "16px",
              backgroundColor:
                mode === "dark" ? "#2c2c2c" : "#e3f2fd",
              boxShadow:
                mode === "dark"
                  ? "0px 4px 10px rgba(0, 0, 0, 0.3)"
                  : "0px 4px 10px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.3s ease-in-out",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow:
                  mode === "dark"
                    ? "0px 6px 15px rgba(0, 0, 0, 0.4)"
                    : "0px 6px 15px rgba(0, 0, 0, 0.2)",
              },
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                color: mode === "dark" ? "#64b5f6" : "#1e88e5",
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              📝 Posts
            </Typography>
          </Box>
        </Box>
      </Sheet>
    </Box>
  );
}

// Add CSS Animations
const styles = `
@keyframes twinkle {
  0%, 100% {
    opacity: 0.2;
  }
  50% {
    opacity: 1;
  }
}

@keyframes shine {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
`;

// Inject the styles into the document
if (typeof document !== "undefined") {
  const styleTag = document.createElement("style");
  styleTag.innerHTML = styles;
  document.head.appendChild(styleTag);
}