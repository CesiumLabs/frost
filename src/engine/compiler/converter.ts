import marked from "marked";
import fs from "node:fs";
import path from "path";
import { FrostError } from "../utils/FrostError";
import { FrostTag } from "../utils/constants";
import { compile as TypeScript } from "./typescript";
import { stripIndents } from 'common-tags';
const IMPORT_REGEX = new RegExp(FrostTag.IMPORT, "g");
const COMMENT_REGEX = new RegExp(FrostTag.COMMENT, "g");
const TYPESCRIPT_EMBED_REGEX = new RegExp(FrostTag.TYPESCRIPT, "g");
const MARKDOWN_EMBED_REGEX = new RegExp(FrostTag.MARKDOWN, "g");

const clean = (t: string): string =>
    stripIndents(t)
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

        let finalCode = fileData;

        if (filePath.endsWith(".md")) {
            finalCode = clean(marked(fileData));
        } else if (filePath.endsWith(".ts")) {
            finalCode = stripIndents`<script>\n${TypeScript(fileData)}\n</script>`;
        }

        childText = stripIndents(childText.replace(matched[0], finalCode));
    }

    if (!childText.match(IMPORT_REGEX)) return stripIndents(childText);
    return inject(childText, data);
}

export function converter<T>(source: string, data?: T, ext?: string) {
    if (!source || typeof source !== "string") throw new FrostError("Source was not provided");
    source = source.replace(COMMENT_REGEX, "");

    if (source.match(TYPESCRIPT_EMBED_REGEX)) {
        const tsSource = source.matchAll(TYPESCRIPT_EMBED_REGEX);

        for (const matched of tsSource) {
            if (!matched || !matched[1]) continue;
            const ts = TypeScript(matched[1]);
            source = source.replace(matched[0], stripIndents`<script>\n${ts}\n</script>`);
        }
    }

    if (source.match(MARKDOWN_EMBED_REGEX)) {
        const mdSource = source.matchAll(MARKDOWN_EMBED_REGEX);

        for (const matched of mdSource) {
            if (!matched || !matched[1]) continue;
            const md = clean(marked(stripIndents(matched[1])));
            source = source.replace(matched[0], md);
        }
    }

    return inject(ext === "md" ? clean(marked(stripIndents(source))) : source, data || {});
}
