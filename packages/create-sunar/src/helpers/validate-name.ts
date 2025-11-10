import validateProjectName from "validate-npm-package-name";

export function validateName(name: string): string[] {
    const validation = validateProjectName(name);
    if (validation.validForNewPackages) return [];
    return [...(validation.errors ?? []), ...(validation.warnings ?? [])];
}
