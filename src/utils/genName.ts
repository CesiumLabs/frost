const PossibleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ_";

export function generate(length = 7) {
    let randomName = "";
    for (let i = 0; i < length; i++) {
        randomName += `${PossibleChars.charAt(Math.floor(Math.random() * PossibleChars.length))}${i}`;
    }

    return randomName;
}