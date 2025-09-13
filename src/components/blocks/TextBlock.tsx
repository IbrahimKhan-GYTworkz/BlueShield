import { Box, Typography } from "@mui/material";
import React from "react";
import type { TextBlock } from "../../types/contentBlocks";

const TextBlockComp: React.FC<TextBlock> = ({ content }) => {
  return (
    <Box sx={{ my: 8 }}>
      <Typography>{content}</Typography>
    </Box>
  );
};

export default TextBlockComp;
