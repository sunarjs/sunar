export function isObject(object?: any): object is object {
    return typeof object === "object" && object != null;
}
