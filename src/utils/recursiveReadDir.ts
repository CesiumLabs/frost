import fs from "fs";
import path from "path";

export default function recurseDirectory(dir: string, fileCallback?: (filePath: string) => void, directoryCallback?: (dirPath: string) => void) {
    for (const file of fs.readdirSync(dir)) {
        const currentPath = path.join(dir, file);

        if (fs.lstatSync(currentPath).isDirectory()) {
            if (directoryCallback) directoryCallback(currentPath);
            recurseDirectory(currentPath, fileCallback, directoryCallback);
        } else if (fileCallback) fileCallback(currentPath);
    }
}
