import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import type { TableBlock } from "../../types/contentBlocks";

const TableBlockComp: React.FC<TableBlock> = ({ headers, rows }) => {
  return (
    <TableContainer component={Paper} sx={{ my: 6 }}>
      <Table>
        <TableHead>
          <TableRow>
            {headers.map((h, idx) => (
              <TableCell key={idx}>{h}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow key={i}>
              {row.map((cell, j) => (
                <TableCell key={j}>{cell}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableBlockComp;
