/** biome-ignore-all lint/style/noNonNullAssertion: Declared env variables */
"use client";

import { useDocsSearch } from "fumadocs-core/search/client";
import {
    SearchDialog,
    SearchDialogClose,
    SearchDialogContent,
    SearchDialogFooter,
    SearchDialogHeader,
    SearchDialogIcon,
    SearchDialogInput,
    SearchDialogList,
    SearchDialogOverlay,
    type SharedProps,
} from "fumadocs-ui/components/dialog/search";

import { OramaClient } from "@oramacloud/client";

const client = new OramaClient({
    endpoint: process.env.NEXT_PUBLIC_ORAMA_API_ENDPOINT!,
    api_key: process.env.NEXT_PUBLIC_ORAMA_API_KEY!,
});

export default function CustomSearchDialog(props: SharedProps) {
    const { search, setSearch, query } = useDocsSearch({
        type: "orama-cloud",
        client,
    });

    return (
        <SearchDialog search={search} onSearchChange={setSearch} isLoading={query.isLoading} {...props}>
            <SearchDialogOverlay />
            <SearchDialogContent>
                <SearchDialogHeader>
                    <SearchDialogIcon />
                    <SearchDialogInput />
                    <SearchDialogClose />
                </SearchDialogHeader>
                <SearchDialogList items={query.data !== "empty" ? query.data : null} />
                <SearchDialogFooter>
                    <a href="https://orama.com" rel="noreferrer noopener" className="ms-auto text-fd-muted-foreground text-xs">
                        Powered by Orama
                    </a>
                </SearchDialogFooter>
            </SearchDialogContent>
        </SearchDialog>
    );
}
