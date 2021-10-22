import fs from 'node:fs';
import path from 'node:path';

const recurseDirectory = async (dir: string, fileCallback?: (filePath: string) => void, directoryCallback?: (dirPath: string) => void): Promise<void> => {
    for (const file of fs.readdirSync(dir)) {
        const currentPath: string = path.join(dir, file);
    
        if (fs.lstatSync(currentPath).isDirectory()) {
            if (directoryCallback) {
                directoryCallback(currentPath);
            }

            recurseDirectory(currentPath, fileCallback, directoryCallback);
        } else if (fileCallback) {
            fileCallback(currentPath);
        }
    }
};

export default recurseDirectory;
