import marked from "marked";
import fs from "node:fs";
import path from "path";
import { FrostError } from "./FrostError";

const IMPORT_REGEX = /#(include|import) "(.+)"/g;
const COMMENT_REGEX = /<!--(.+?)-->/g;
const clean = (t: string) =>
    t
        .replace(COMMENT_REGEX, "")
        .replace(/&quot;/g, '"')
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">");

marked.use({
    xhtml: true,
    sanitize: false
});

function inject(text: string, data: any = {}): string {
    if (!text) return "";
    let childText = clean(text);
    if (!childText.match(IMPORT_REGEX)) return childText;

    const importMatched = childText.matchAll(IMPORT_REGEX);

    for (const matched of importMatched) {
        if (!matched || !matched[2]) continue;
        let filePath = matched[2],
            filePathFinal = matched[2];
        if (!path.extname(filePath)) filePath += ".frost";
        if (filePath.startsWith("./") && data?.__dirname) filePathFinal = `${data.__dirname}/${filePath.replace(/.\//, "")}`;
        if (!fs.existsSync(filePathFinal)) throw new FrostError(`Could not locate include file "${filePath}"`);

        const fileData = fs.readFileSync(filePathFinal, { encoding: "utf-8" }).replace(COMMENT_REGEX, "");

        childText = childText.replace(matched[0], filePath.endsWith(".md") ? clean(marked(fileData)) : fileData);
    }

    if (!childText.match(IMPORT_REGEX)) return childText;
    return inject(childText, data);
}

export function converter<T>(source: string, data?: T, ext?: string) {
    if (!source || typeof source !== "string") throw new FrostError("Source was not provided");
    source = source.replace(COMMENT_REGEX, "");
    return inject(ext === "md" ? clean(marked(source)) : source, data || {});
}
