import fs from "node:fs";
import path from "node:path";
import recurseDirectory from "./recursiveReadDir";

export default function copyDir (source: string, target: string) {
    if (!fs.existsSync(target)) fs.mkdirSync(target);

    recurseDirectory(
        source,
        file => fs.copyFileSync(file, path.join(target, file.split(source)[1])),
        dir => {
            const newDir = path.join(target, dir.split(source)[1]);
            if (!fs.existsSync(newDir)) fs.mkdirSync(newDir);
        }
    );
};