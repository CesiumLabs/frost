import path from "path";
import fs from "fs";

export default function ensureDirectoryExistence(filePath: string): boolean {
    var dirname = path.dirname(filePath);
    if (fs.existsSync(dirname)) return true;
    ensureDirectoryExistence(dirname);
    fs.mkdirSync(dirname);
    return false;
}
