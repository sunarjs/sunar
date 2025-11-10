/** biome-ignore-all lint/a11y/noSvgWithoutTitle: Doesn't matter */

import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { notFound } from "next/navigation";
import { ImageResponse } from "next/og";
import type { ReactElement } from "react";

import { source } from "@/app/source";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const fontBuffer = await readFile(join(__dirname, "./Geist-Bold.woff"));

const foreground = "hsl(0 0% 98%)";
const mutedForeground = "hsl(0 0% 63.9%)";
const background = "rgba(10, 10, 10)";

interface GenerateOptions {
    title: string;
    description?: string;
}

function generate({ title, description }: GenerateOptions): ReactElement {
    return (
        <div
            style={{
                color: foreground,
                background,
            }}
            tw="flex flex-col w-full h-full p-12"
        >
            <div tw="flex flex-col justify-center">
                <div tw="flex flex-col rounded-2xl p-8">
                    <p tw="font-bold text-7xl">{title}</p>
                    <p
                        tw="text-4xl"
                        style={{
                            color: mutedForeground,
                        }}
                    >
                        {description}
                    </p>
                </div>
            </div>

            <div tw="flex flex-row justify-between items-center mt-auto p-8">
                <div tw="flex flex-row items-center">
                    <svg width="48px" height="48px" viewBox="0 0 556 556" fill="none">
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M278 556C431.534 556 556 431.534 556 278C556 124.465 431.534 0 278 0C124.465 0 0 124.465 0 278C0 431.534 124.465 556 278 556ZM278 522.64C413.111 522.64 522.64 413.111 522.64 278C522.64 142.889 413.111 33.36 278 33.36C142.889 33.36 33.36 142.889 33.36 278C33.36 413.111 142.889 522.64 278 522.64ZM278 489.28C394.688 489.28 489.28 394.688 489.28 278C489.28 161.313 394.688 66.72 278 66.72C161.313 66.72 66.72 161.313 66.72 278C66.72 394.688 161.313 489.28 278 489.28ZM278 455.92C376.262 455.92 455.92 376.262 455.92 278C455.92 179.738 376.262 100.08 278 100.08C179.738 100.08 100.08 179.738 100.08 278C100.08 376.262 179.738 455.92 278 455.92ZM422.56 278C422.56 357.839 357.839 422.56 278 422.56C198.162 422.56 133.44 357.839 133.44 278C133.44 198.162 198.162 133.44 278 133.44C357.839 133.44 422.56 198.162 422.56 278ZM389.2 278C389.2 339.413 339.413 389.2 278 389.2C216.586 389.2 166.8 339.413 166.8 278C166.8 216.586 216.586 166.8 278 166.8C339.413 166.8 389.2 216.586 389.2 278Z"
                            fill="currentColor"
                        />
                    </svg>
                    <p tw="text-4xl font-medium pl-4">Sunar</p>
                </div>
                <p tw="text-4xl font-medium" style={{ color: mutedForeground }}>
                    Documentation
                </p>
            </div>
        </div>
    );
}

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string[] }> }) {
    const { slug } = await params;
    const page = source.getPage(slug.slice(0, -1));
    if (!page) notFound();

    return new ImageResponse(generate({ title: page.data.title, description: page.data.description }), {
        width: 1200,
        height: 630,
        fonts: [
            {
                name: "Geist Mono",
                data: fontBuffer,
                weight: 700,
                style: "normal",
            },
        ],
    });
}

export function generateStaticParams() {
    return source.generateParams().map((page) => ({
        ...page,
        slug: [...page.slug, "image.png"],
    }));
}
