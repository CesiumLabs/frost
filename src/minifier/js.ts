import { minify } from "terser";

export default async (text: string) => (await minify(text)).code;