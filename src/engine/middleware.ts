import { renderFile } from "./render";

export function express() {
    return (filePath: string, options: unknown, callback: Function): void => {
        try {
            const content = renderFile(filePath, options);
            return callback(null, content);
        } catch (err) {
            return callback(err);
        }
    };
}
