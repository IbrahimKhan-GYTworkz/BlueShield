import { Alert, Box, Paper, Typography } from "@mui/material";
import React from "react";
import type { NoticeBlock } from "../../types/contentBlocks";

const NoticeBlockComp: React.FC<NoticeBlock> = ({ variant, text }) => {
  // Custom design for success variant
  if (variant === "success") {
    return (
      <Paper
        elevation={1}
        sx={{
          p: 3,
          borderRadius: 3,
          backgroundColor: "#e8f5e8",
          border: "1px solid #c8e6c9",
          display: "flex",
          alignItems: "flex-start",
          gap: 2,
          my: 4,
        }}
      >
        <Box
          sx={{
            width: 24,
            height: 24,
            borderRadius: "50%",
            backgroundColor: "#4caf50",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            mt: 0.5,
          }}
        >
          <Typography
            sx={{
              color: "white",
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            ✓
          </Typography>
        </Box>
        <Box>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: "#2e7d32",
              fontSize: "1rem",
              mb: 1,
            }}
          >
            No Authorization Required
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "#388e3c",
              fontSize: "0.875rem",
              lineHeight: 1.4,
            }}
          >
            MRI procedures are covered under your current plan without prior authorization.
          </Typography>
        </Box>
      </Paper>
    );
  }

  return (
    <Box sx={{ my: 6 }}>
      <Alert severity={variant}>{text}</Alert>
    </Box>
  );
};

export default NoticeBlockComp;
