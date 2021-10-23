import { FrostError } from "../utils/FrostError";
import { generate as randomNameGen } from "../../utils/genName";
import { FrostTag } from "../utils/constants";

const FROST_COMMENT = new RegExp(FrostTag.COMMENT, "g");
const FROST_JS_RENDER = new RegExp(FrostTag.JS_RENDER, "g");
const FROST_JS_EMBED = new RegExp(FrostTag.JS_EMBED, "g");

export function compile<T = unknown>(source: string, options?: T) {
    if (!source || typeof source !== "string") return "";

    const outputVar = randomNameGen(5),
        frostVar = randomNameGen(7);

    try {
        return new Function(
            `let ${frostVar}=${JSON.stringify(options || {})},locals=Object.assign({},${frostVar}),{${Object.keys(options || {}).join(",")}}=${frostVar},${outputVar}=${JSON.stringify(source)
                .replace(FROST_COMMENT, "")
                .replace(FROST_JS_RENDER, '"+($1)+"')
                .replace(FROST_JS_EMBED, `";$1\n${outputVar}+="`)};return ${outputVar};`
        )() as string;
    } catch (err) {
        throw new FrostError(`Error while rendering template:\n${err}`, "FrostRendererError");
    }
}
