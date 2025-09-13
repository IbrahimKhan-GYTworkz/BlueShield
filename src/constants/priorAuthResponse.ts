import type { ContentBlock } from "../types/contentBlocks";

export const priorAuthResponse: ContentBlock[] = [
    {
        type: "text",
        content:
            "Prior authorization is required for certain procedures, medications, or services to ensure compliance before delivery.",
    },
    {
        type: "table",
        headers: ["Service", "Requirement"],
        rows: [
            ["Advanced imaging (MRI, CT, PET)", "No Auth Needed"],
            ["Specialty medications", "Auth Required"],
            ["Some DME and behavioral health services", "Auth Required"],
        ],
    },
    {
        type: "notice",
        variant: "success",
        text: "No Authorization Required: MRI procedures are covered under your current plan without prior authorization.",
    },
    {
        type: "action",
        label: "Check if a service requires authorization",
        actionId: "check-auth",
    },
    {
        type: "action",
        label: "Submit or track an auth request",
        actionId: "submit-auth",
    },
];
