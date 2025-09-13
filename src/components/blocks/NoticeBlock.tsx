import { Alert, Box } from "@mui/material";
import React from "react";
import type { NoticeBlock } from "../../types/contentBlocks";

const NoticeBlockComp: React.FC<NoticeBlock> = ({ variant, text }) => {
  return (
    <Box sx={{ my: 6 }}>
      <Alert severity={variant}>{text}</Alert>
    </Box>
  );
};

export default NoticeBlockComp;
