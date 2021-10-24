import { minify } from "terser";

export default async (text: string): Promise<unknown> => {
    return (await minify(text)).code;
};
