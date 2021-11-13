import pico from "picocolors";
function info(msg: string): void {
    console.log(`${pico.magenta("[INFO]")} ${pico.bold(msg)}`);
}

function warn(msg: string): void {
    console.log(`${pico.red("[WARN]")} ${pico.bold(msg)}`);
}

function verbose(msg: string): void {
    console.log(`${pico.magenta("[DEBUG")} ${pico.bold(msg)}`);
}

function error(msg: string | unknown): void {
    console.error(`${pico.red("[ERROR]")}`, msg);
}

export { info, warn, verbose, error };
