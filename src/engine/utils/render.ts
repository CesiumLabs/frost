import { readFileSync, existsSync } from "fs";
import { compile } from "../compiler/compiler";
import { converter } from "../compiler/converter";
import { FrostError } from "./error";
import path from "path";

export function renderFile<T = unknown>(filePath: string, data?: T) {
    if (!filePath || !existsSync(filePath)) throw new FrostError("Could not locate source file");

    const src = readFileSync(filePath, { encoding: "utf-8" });
    if (!path.isAbsolute(filePath)) filePath = path.resolve(filePath);

    // @ts-ignore
    if (!data.__dirname) data.__dirname = path.dirname(filePath);
    return render(src, data, path.extname(filePath));
}

export function render<T = unknown>(source: string, data?: T, ext?: string) {
    if (!source || typeof source !== "string") return "";
    // @ts-ignore
    if (!data.__dirname && data?.settings?.views) data.__dirname = data.settings.views;

    const converted = converter(source, data ?? {}, ext);
    const rendered = compile(converted, data ?? {});
    return rendered;
}
