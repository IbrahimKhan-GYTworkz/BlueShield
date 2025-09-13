import { Grid, Typography } from "@mui/material";
import React from "react";
import type { KeyValueBlock } from "../../types/contentBlocks";

const KeyValueBlockComp: React.FC<KeyValueBlock> = ({ entries }) => {
  return (
    <Grid container spacing={1}>
      {entries.map((entry, idx) => (
        <React.Fragment key={idx}>
          <Grid size={{ xs: 6 }}>
            <Typography fontWeight="bold">{entry.key}</Typography>
          </Grid>
          <Grid size={{ xs: 6 }}>
            <Typography>{entry.value}</Typography>
          </Grid>
        </React.Fragment>
      ))}
    </Grid>
  );
};

export default KeyValueBlockComp;
