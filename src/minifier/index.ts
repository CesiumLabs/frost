import { minify as JSMinify } from "terser";
import { minify as HTMLMinify } from "html-minifier";

export const htmlMinifier = (text: string, compressionLevel: number) =>
    HTMLMinify(text, {
        html5: true,
        collapseInlineTagWhitespace: compressionLevel >= 3,
        removeComments: compressionLevel >= 1,
        removeRedundantAttributes: compressionLevel >= 1,
        removeTagWhitespace: compressionLevel >= 3,
        collapseWhitespace: compressionLevel >= 2
    });

export default async (text: string) => (await JSMinify(text)).code;
