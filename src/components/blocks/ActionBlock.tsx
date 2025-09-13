import { Button } from "@mui/material";
import React from "react";
import type { ActionBlock } from "../../types/contentBlocks";

const ActionBlockComp: React.FC<ActionBlock> = ({ label, actionId }) => {
  return (
    <Button
      variant="outlined"
      sx={{ my: 2, textTransform: "none" }}
      key={actionId}
    >
      {label}
    </Button>
  );
};

export default ActionBlockComp;
