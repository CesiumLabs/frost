import { FrostError } from "./FrostError";
import { generate as randomNameGen } from "../utils/genName";

export function compile<T = unknown>(source: string, options?: T) {
    if (!source || typeof source !== "string") return "";

    let randomName = randomNameGen(5);

    try {
        return new Function(
            `let frost=${JSON.stringify(options || {})},{${Object.keys(options || {}).join(",")}}=frost,${randomName}=${JSON.stringify(source)
                .replace(/<!--((.|\n)+?)-->/g, "")
                .replace(/\<frost\>((.|\n)+?)\<\/frost\>/g, '"+($1)+"')
                .replace(/\<frost embed\>((.|\n)+?)\<\/frost\>/g, `";$1\n${randomName}+="`)};return ${randomName};`
        )() as string;
    } catch (err) {
        throw new FrostError(`Error while rendering template:\n${err}`, "FrostRendererError");
    }
}
