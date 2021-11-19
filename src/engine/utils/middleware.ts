import { renderFile } from "./render";

export function express() {
    return (filePath: string, options: unknown, callback: Function) => {
        try {
            const content = renderFile(filePath, options);
            return callback(null, content);
        } catch (err) {
            return callback(err);
        }
    };
}
