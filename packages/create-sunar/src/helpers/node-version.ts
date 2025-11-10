export function checkNodeVersion() {
    const currentVersion = process.versions.node;

    const currentVersionMajor = currentVersion.split(".")[0];
    if (!currentVersionMajor) {
        console.error("No current major version found.");
        process.exit(1);
    }

    const requiredMajorVersion = Number.parseInt(currentVersionMajor, 10);
    const minimumMajorVersion = 18;

    if (requiredMajorVersion < minimumMajorVersion) {
        console.error(`Node.js v${currentVersion} is out of date and unsupported!`);
        console.error(`Please use Node.js v${minimumMajorVersion} or higher.`);
        process.exit(1);
    }
}
