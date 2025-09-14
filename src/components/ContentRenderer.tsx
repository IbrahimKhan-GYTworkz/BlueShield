import React from "react";
import type {
  ActionBlock,
  CardBlock,
  ContentBlock,
  HeaderBlock,
} from "../types/contentBlocks";

import { Box, Stack } from "@mui/material";
import ActionBlockComp from "./blocks/ActionBlock";
import CardBlockComp from "./blocks/CardBlock";
import HeaderBlockComp from "./blocks/HeaderBlock";
import KeyValueBlockComp from "./blocks/KeyValueBlock";
import NoticeBlockComp from "./blocks/NoticeBlock";
import TableBlockComp from "./blocks/TableBlock";
import TextBlockComp from "./blocks/TextBlock";

interface Props {
  blocks: ContentBlock[];
}

const ContentRenderer: React.FC<Props> = ({ blocks }) => {
  // Helper: group consecutive cards or actions together, and table with notice
  const groupBlocks = (blocks: ContentBlock[]): ContentBlock[][] => {
    const groups: ContentBlock[][] = [];
    let currentGroup: ContentBlock[] = [];
    let currentType: string | null = null;
    let skipNext = false;

    blocks.forEach((block, index) => {
      if (skipNext) {
        skipNext = false;
        return;
      }

      if (block.type === "card" || block.type === "action") {
        if (currentType === block.type || currentType === null) {
          currentGroup.push(block);
          currentType = block.type;
        } else {
          groups.push(currentGroup);
          currentGroup = [block];
          currentType = block.type;
        }
      } else if (block.type === "table") {
        // Check if next block is a notice with success variant
        const nextBlock = blocks[index + 1];
        if (nextBlock && nextBlock.type === "notice" && nextBlock.variant === "success") {
          // Group table with notice for side-by-side layout
          groups.push([block, nextBlock]);
          // Skip the next block since we've already included it
          skipNext = true;
        } else {
          groups.push([block]);
        }
      } else {
        // flush current group if exists
        if (currentGroup.length > 0) {
          groups.push(currentGroup);
          currentGroup = [];
          currentType = null;
        }
        // non-card/action block becomes its own group
        groups.push([block]);
      }
    });

    if (currentGroup.length > 0) {
      groups.push(currentGroup);
    }

    return groups;
  };

  const groupedBlocks = groupBlocks(blocks);

  return (
    <div className="space-y-4 my-8">
      {groupedBlocks.map((group, idx) => {
        const firstType = group[0].type;

        if (firstType === "card") {
          // Render row of cards with horizontal scroll
          return (
            <Box
              key={idx}
              sx={{
                display: "flex",
                gap: 2,
                overflowX: "auto",
                overflowY: "hidden",
                pb: 1,
                "&::-webkit-scrollbar": {
                  height: 6,
                },
                "&::-webkit-scrollbar-track": {
                  backgroundColor: "#f1f1f1",
                  borderRadius: 3,
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "#c1c1c1",
                  borderRadius: 3,
                  "&:hover": {
                    backgroundColor: "#a8a8a8",
                  },
                },
              }}
            >
              {group.map((card, i) => (
                <Box
                  key={i}
                  sx={{
                    width: "209px",
                    height: "140px",
                    flexShrink: 0,
                  }}
                >
                  <CardBlockComp {...(card as CardBlock)} />
                </Box>
              ))}
            </Box>
          );
        }

        if (firstType === "action") {
          // Render stacked buttons with spacing
          return (
            <Stack key={idx} direction="row" spacing={2}>
              {group.map((action, i) => (
                <ActionBlockComp key={i} {...(action as ActionBlock)} />
              ))}
            </Stack>
          );
        }

        if (firstType === "table" && group.length === 2 && group[1].type === "notice") {
          // Render table and notice side by side
          return (
            <Box key={idx} sx={{ display: "flex", gap: 4, alignItems: "stretch" }}>
              <Box sx={{ flex: 1 }}>
                <TableBlockComp {...group[0]} />
              </Box>
              <Box sx={{ flex: 0, minWidth: 300, maxWidth: 400, display: "flex", alignItems: "center" }}>
                <NoticeBlockComp {...group[1]} />
              </Box>
            </Box>
          );
        }

        // Render single non-card/action block
        const block = group[0];
        switch (block.type) {
          case "header":
            return <HeaderBlockComp key={idx} {...(block as HeaderBlock)} />;
          case "notice":
            return <NoticeBlockComp key={idx} {...block} />;
          case "key-value":
            return <KeyValueBlockComp key={idx} {...block} />;
          case "text":
            return <TextBlockComp key={idx} {...block} />;
          case "table":
            return <TableBlockComp key={idx} {...block} />;
          default:
            return null;
        }
      })}
    </div>
  );
};

export default ContentRenderer;
