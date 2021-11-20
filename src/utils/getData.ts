import { GeneratorOptions } from "../generator";
import recursiveReadDir from "./recursiveReadDir";
import fs from "fs";
import path from "path";

export default async function getData(options: GeneratorOptions) {
    let data = {};
    await recursiveReadDir(process.cwd(), async (filePath) => {
        const file = path.parse(filePath);
        if (file.base == options.metadataFile) data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    });

    return data;
}
