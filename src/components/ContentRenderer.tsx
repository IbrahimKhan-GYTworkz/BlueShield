import React from "react";
import type {
  ActionBlock,
  CardBlock,
  ContentBlock,
} from "../types/contentBlocks";

import { Stack } from "@mui/material";
import ActionBlockComp from "./blocks/ActionBlock";
import CardBlockComp from "./blocks/CardBlock";
import KeyValueBlockComp from "./blocks/KeyValueBlock";
import NoticeBlockComp from "./blocks/NoticeBlock";
import TableBlockComp from "./blocks/TableBlock";
import TextBlockComp from "./blocks/TextBlock";

interface Props {
  blocks: ContentBlock[];
}

const ContentRenderer: React.FC<Props> = ({ blocks }) => {
  // Helper: group consecutive cards or actions together
  const groupBlocks = (blocks: ContentBlock[]): ContentBlock[][] => {
    const groups: ContentBlock[][] = [];
    let currentGroup: ContentBlock[] = [];
    let currentType: string | null = null;

    blocks.forEach((block) => {
      if (block.type === "card" || block.type === "action") {
        if (currentType === block.type || currentType === null) {
          currentGroup.push(block);
          currentType = block.type;
        } else {
          groups.push(currentGroup);
          currentGroup = [block];
          currentType = block.type;
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
          // Render row of cards
          return (
            <Stack key={idx} direction="row" spacing={2}>
              {group.map((card, i) => (
                <CardBlockComp key={i} {...(card as CardBlock)} />
              ))}
            </Stack>
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

        // Render single non-card/action block
        const block = group[0];
        switch (block.type) {
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
