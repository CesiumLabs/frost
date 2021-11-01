import { GeneratorOptions } from "../generator";
import fs from "node:fs";
import path from "node:path";
import { renderFile } from "../engine";
import { info } from "../logger";
import pico from "picocolors";
import { htmlMinifier } from "../minifier";
import getData from "../utils/getData";
import ensureDirectoryExistence from "../utils/ensureDir";
export async function copyIntoBuild(options: GeneratorOptions, pages: Array<string>): Promise<void> {
    for (const page of pages) {
        let baseName = path.basename(page, ".frost");
        let truePath = path.join(process.cwd(), page);
        let data = await getData(options);
        let rendered = renderFile(truePath, { __dirname: __dirname, ...data });

        if (path.basename(path.dirname(page)) == options.srcDir) {
            info(`/${baseName} - Minifying code...`);
            const minified = await htmlMinifier(rendered, options.HTMLcompressionLevel);
            fs.writeFileSync(path.join(process.cwd(), options.buildDir, `${baseName}.html`), minified, "utf-8");
            info(`${pico.green("✔︎")} Successfully built ${baseName}.html`);
        } else {
            const baseDex = page.split("/");
            const reduced = baseDex.filter((_, idx) => idx > 0);
            const r = reduced.join("/");
            const root = r.split("/")[r.split("/").length - 1];
            const base = r
                .split("/")
                .filter((_, posx) => posx < r.split("/").length - 1)
                .join("/");
            const re = path.basename(root, ".frost");
            info(`/${baseName} - Minifying code...`);
            const minified = await htmlMinifier(rendered, options.HTMLcompressionLevel);
            ensureDirectoryExistence(path.join(process.cwd(), options.buildDir, base, `${re}.html`));
            fs.writeFileSync(path.join(process.cwd(), options.buildDir, base, `${re}.html`), minified, "utf-8");
            info(`${pico.green("✔︎")} Successfully built ${base}/${re}.html`);
        }
    }
}
