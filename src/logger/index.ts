import pico from "picocolors";
function info(msg: string): void {
    console.log(`${pico.magenta("[INFO]")} ${pico.bold(msg)}`);
}

function warn(msg: string): void {
    console.log(`${pico.red("[WARN]")} ${pico.bold(msg)}`);
}

function debug(msg: string): void {
    console.log(`${pico.cyan("[DEBUG]")} ${pico.bold(msg)}`);
}

function verbose(msg: string): void {
    console.log(`${pico.magenta("[DEBUG")} ${pico.bold(msg)}`);
}

export { info, warn, verbose };
