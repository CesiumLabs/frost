import { GeneratorOptions } from "../generator";
import fs from "node:fs";
import { info } from "../logger";
import copyDirectory from "../utils/copyDir";
import pico from "picocolors";
export async function copyStatic(options: GeneratorOptions): Promise<void> {
    if (fs.existsSync(options.staticDir)) {
        info("Copying static files...");
        copyDirectory(options.staticDir, options.buildDir);

        info(`${pico.green("✔︎")} Successfully copied all static files..`);
    }
}
