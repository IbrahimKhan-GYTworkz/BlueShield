import {
  Box,
  Chip,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";
import type { TableBlock } from "../../types/contentBlocks";

const TableBlockComp: React.FC<TableBlock> = ({ headers, rows }) => {
  const getStatusColor = (status: string) => {
    if (status.toLowerCase().includes("no auth needed")) {
      return {
        backgroundColor: "#0053CC",
        color: "white",
        border: "1px solid #004099",
      };
    } else if (status.toLowerCase().includes("auth required")) {
      return {
        backgroundColor: "#0053CC",
        color: "white",
        border: "1px solid #004099",
      };
    }
    return {
      backgroundColor: "#0053CC",
      color: "white",
      border: "1px solid #004099",
    };
  };

  return (
    <Box sx={{ my: 4 }}>
      <Typography
        variant="h6"
        sx={{
          fontWeight: 600,
          mb: 3,
          fontSize: "1.1rem",
          color: "#333",
        }}
      >
        For most Blue Shield of California plans, prior auth applies to:
      </Typography>
      
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {rows.map((row, i) => (
          <Paper
            key={i}
            elevation={1}
            sx={{
              p: 3,
              borderRadius: 3,
              backgroundColor: "#fafafa",
              border: "1px solid #e0e0e0",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              transition: "all 0.2s ease-in-out",
              "&:hover": {
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                transform: "translateY(-1px)",
              },
            }}
          >
            <Typography
              variant="body1"
              sx={{
                fontWeight: 500,
                color: "#333",
                fontSize: "1rem",
                flex: 1,
              }}
            >
              {row[0]}
            </Typography>
            
            {row[1].toLowerCase().includes("no auth needed") ? (
              <Typography
                variant="body2"
                sx={{
                  color: "#4caf50",
                  fontWeight: 600,
                  fontSize: "0.875rem",
                }}
              >
                {row[1]}
              </Typography>
            ) : (
              <Chip
                label={row[1]}
                sx={{
                  ...getStatusColor(row[1]),
                  fontWeight: 600,
                  fontSize: "0.875rem",
                  height: 32,
                  borderRadius: 2,
                  minWidth: 120,
                  "& .MuiChip-label": {
                    px: 2,
                  },
                }}
              />
            )}
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default TableBlockComp;
