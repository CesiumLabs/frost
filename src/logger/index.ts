import pico from "picocolors";

function info(msg: string) {
    console.log(`${pico.magenta("[INFO]")} ${pico.bold(msg)}`);
}

function warn(msg: string) {
    console.log(`${pico.red("[WARN]")} ${pico.bold(msg)}`);
}

function verbose(msg: string) {
    console.log(`${pico.magenta("[DEBUG")} ${pico.bold(msg)}`);
}

function error(msg: string | unknown) {
    console.error(`${pico.red("[ERROR]")}`, msg);
}

export { info, warn, verbose, error };
