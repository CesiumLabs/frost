import { FrostError } from "./FrostError";
import { generate as randomNameGen } from "../utils/genName";

export function compile<T = unknown>(source: string, options?: T) {
    if (!source || typeof source !== "string") return "";

    const outputVar = randomNameGen(5),
        frostVar = randomNameGen(7);

    try {
        return new Function(
            `let ${frostVar}=${JSON.stringify(options || {})},{${Object.keys(options || {}).join(",")}}=${frostVar},${outputVar}=${JSON.stringify(source)
                .replace(/<!--((.|\n)+?)-->/g, "")
                .replace(/\<frost\>((.|\n)+?)\<\/frost\>/g, '"+($1)+"')
                .replace(/\<frost embed\>((.|\n)+?)\<\/frost\>/g, `";$1\n${outputVar}+="`)};return ${outputVar};`
        )() as string;
    } catch (err) {
        throw new FrostError(`Error while rendering template:\n${err}`, "FrostRendererError");
    }
}
