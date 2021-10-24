import { GeneratorOptions } from "../generator";
import fs from "node:fs";
import path from "node:path";
import { renderFile } from "../engine";
import { info } from "../logger";
import pico from "picocolors";
import { htmlMinifier } from "../minifier";
import getData from "../utils/getData";
export async function copyIntoBuild(options: GeneratorOptions, pages: Array<string>): Promise<void> {
    let FinalPath = path.join(process.cwd(), options.buildDir);
    for (const page of pages) {
        let baseName = path.basename(page, ".frost");
        let targetDir;
        if (path.basename(path.dirname(page)) == "source") targetDir = options.buildDir;
        else {
            targetDir = path.join(options.buildDir, path.basename(path.dirname(page)));
        }
        let truePath = path.join(process.cwd(), page);
        info(`/${baseName} - building into native file....`);
        const data = await getData(options);
        const rendered = renderFile(truePath, { __dirname: __dirname, ...data });
        info(`/${baseName} - Minifying code...`);
        const minified = await htmlMinifier(rendered, options.HTMLcompressionLevel);
        fs.writeFileSync(path.join(path.join(process.cwd(), targetDir), `${baseName}.html`), minified, "utf-8");
        info(`${pico.green("✔︎")} Successfully built ${baseName}.html`);
    }
}
