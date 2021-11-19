import { GeneratorOptions } from "../generator";
import recursiveReadDir from "./recursiveReadDir";
import fs from "node:fs";
import path from "node:path";

export default async function getData (options: GeneratorOptions) {
    let data = {};
    await recursiveReadDir(process.cwd(), async filePath => {
        const file = path.parse(filePath);
        if (file.base == options.metadataFile) data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    });
    
    return data;
};