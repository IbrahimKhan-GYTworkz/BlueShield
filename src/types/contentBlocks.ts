import type { LucideProps } from "lucide-react";
import type { ForwardRefExoticComponent, RefAttributes } from "react";

// src/types/contentBlocks.ts
export type ContentBlock =
    | CardBlock
    | NoticeBlock
    | KeyValueBlock
    | ActionBlock
    | TextBlock
    | TableBlock;

export interface CardBlock {
    type: "card";
    icon?: ForwardRefExoticComponent<LucideProps & RefAttributes<SVGSVGElement>>;
    title: string;
    subtitle?: string;
    description?: string;
    metadata?: Record<string, string>;
    actions?: ActionBlock[];
}

export interface NoticeBlock {
    type: "notice";
    variant: "info" | "warning" | "success";
    text: string;
}

export interface KeyValueBlock {
    type: "key-value";
    entries: { key: string; value: string }[];
}

export interface ActionBlock {
    type: "action";
    label: string;
    actionId: string;
}

export interface TextBlock {
    type: "text";
    content: string;
}

export interface TableBlock {
    type: "table";
    headers: string[];
    rows: string[][];
}
