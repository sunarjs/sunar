"use server";

import type { ActionResponse, Feedback } from "@/components/feedback";

interface DiscordEmbed {
    title?: string;
    description?: string;
    color: number;
    fields: {
        name: string;
        value: string;
        inline?: boolean;
    }[];
    timestamp: string;
    footer?: {
        text: string;
    };
}

interface DiscordWebhookPayload {
    embeds: DiscordEmbed[];
}

export async function rateAction(url: string, feedback: Feedback): Promise<ActionResponse> {
    const webhookUrl = process.env.DISCORD_FEEDBACK_WEBHOOK_URL;

    if (!webhookUrl) {
        throw new Error("DISCORD_FEEDBACK_WEBHOOK_URL environment variable is not set");
    }

    const color = feedback.opinion === "good" ? 0x4a_de_80 : 0xf8_71_71;

    const embed: DiscordEmbed = {
        title: feedback.opinion === "good" ? "Good Documentation Feedback" : "Bad Documentation Feedback",
        description: feedback.message,
        color,
        fields: [
            {
                name: "Opinion",
                value: feedback.opinion === "good" ? "👍 Good" : "👎 Bad",
            },
            {
                name: "Page URL",
                value: `\`${url}\``,
            },
        ],
        timestamp: new Date().toISOString(),
        footer: {
            text: "Documentation Feedback",
        },
    };

    const payload: DiscordWebhookPayload = {
        embeds: [embed],
    };

    try {
        const response = await fetch(webhookUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error(`Discord webhook failed: ${response.status} ${response.statusText}`);
        }

        return {
            success: true,
            messageId: response.headers.get("x-ratelimit-bucket") || undefined,
        };
    } catch {
        return {
            success: false,
        };
    }
}
