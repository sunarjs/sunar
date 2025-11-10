import { createGenerator } from "fumadocs-typescript";
import { AutoTypeTable } from "fumadocs-typescript/ui";
import { Accordion, Accordions } from "fumadocs-ui/components/accordion";
import { File, Files, Folder } from "fumadocs-ui/components/files";
import { Step, Steps } from "fumadocs-ui/components/steps";
import { Tab, Tabs } from "fumadocs-ui/components/tabs";
import { TypeTable } from "fumadocs-ui/components/type-table";
import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";

const generator = createGenerator();

export function getMDXComponents(components?: MDXComponents): MDXComponents {
    return {
        ...defaultMdxComponents,
        Accordions,
        Accordion,
        Tabs,
        Tab,
        TypeTable,
        Step,
        Steps,
        Folder,
        Files,
        File,
        AutoTypeTable: (props) => <AutoTypeTable {...props} generator={generator} />,
        LanguageTabs: ({ children }: { children: React.ReactNode }) => (
            <Tabs items={["JavaScript", "TypeScript"]} groupId="language" persist>
                {children}
            </Tabs>
        ),
        ...components,
    };
}
