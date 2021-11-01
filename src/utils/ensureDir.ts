import path from "node:path";
import fs from "node:fs";

export default function ensureDirectoryExistence(filePath: string): boolean | void {
    var dirname = path.dirname(filePath);
    if (fs.existsSync(dirname)) {
        return true;
    }
    ensureDirectoryExistence(dirname);
    fs.mkdirSync(dirname);
}
