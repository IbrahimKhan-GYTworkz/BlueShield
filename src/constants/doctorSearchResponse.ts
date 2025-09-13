import { LucideStethoscope } from "lucide-react";
import type { ContentBlock } from "../types/contentBlocks";

export const doctorSearchResponse: ContentBlock[] = [
    {
        type: "card",
        icon: LucideStethoscope,
        title: "Dr. Sarah Lee",
        subtitle: "Cardiology",
        metadata: {
            Location: "San Francisco, CA",
            Distance: "4 miles away",
        },
        actions: [{ type: "action", label: "Book Appointment", actionId: "book-1" }],
    },
    {
        type: "card",
        icon: LucideStethoscope,
        title: "Dr. Michael Patel",
        subtitle: "Dermatology",
        metadata: {
            Location: "Berkeley, CA",
            Distance: "7.2 miles away",
        },
        actions: [{ type: "action", label: "Book Appointment", actionId: "book-2" }],
    },
    {
        type: "card",
        icon: LucideStethoscope,
        title: "Dr. Emily Gomez",
        subtitle: "Orthopedics",
        metadata: {
            Location: "Oakland, CA",
            Distance: "12 miles away",
        },
        actions: [{ type: "action", label: "Book Appointment", actionId: "book-3" }],
    },
    {
        type: "text",
        content:
            "You've viewed 8 doctors matching your search within 10 miles. Several doctors are currently accepting new patients and have availability this week.",
    },
    {
        type: "action",
        label: "Refine your search",
        actionId: "refine",
    },
    {
        type: "action",
        label: "Narrow your area",
        actionId: "narrow",
    },
    {
        type: "action",
        label: "Change specialty",
        actionId: "change-specialty",
    },
];
