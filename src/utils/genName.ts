const POSSIBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ_";

export function generate(length = 7) {
    let randomName = "";
    for (let i = 0; i < length; i++) randomName += `${POSSIBLE_CHARS.charAt(Math.floor(Math.random() * POSSIBLE_CHARS.length))}${i}`;
    return randomName;
}
