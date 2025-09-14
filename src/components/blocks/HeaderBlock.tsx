import { Typography } from "@mui/material";
import React from "react";
import type { HeaderBlock } from "../../types/contentBlocks";

const HeaderBlockComp: React.FC<HeaderBlock> = ({ text, level = 2 }) => {
  return (
    <Typography
      sx={{
        fontSize: "18px",
        fontWeight: 700,
        mb: { xs: 2, sm: 3 },
        mt: { xs: 3, sm: 4 },
        color: "#000",
        lineHeight: 1.2,
        wordBreak: "break-word",
        overflowWrap: "break-word",
      }}
    >
      {text}
    </Typography>
  );
};

export default HeaderBlockComp;
