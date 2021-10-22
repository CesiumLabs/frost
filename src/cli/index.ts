#!/usr/bin/env node
import pico from "picocolors";
import { FrostGenerator } from "../generator";
const f = new FrostGenerator();
f.loadConfigFile();
const args: string = process.argv[2];
const options: string = process.argv[3];
const optionsArg = process.argv[4];
if (args == "--serve" || args == "-s") {
    if (options == "--port") {
        if (optionsArg) f.serve(Number(optionsArg));
        else if (!optionsArg) f.serve(5348);
    } else if (!options) f.serve(5348);
}

if (args == "--help" || args == "-h") {
    console.log(`

                           ${pico.cyan(pico.bold("HELP MENU"))}


        Frost is a static site generator made by the developers at devsnowflake. 
        If you have any problems with the package, feel free to open an issue at
        https://github.com/devsnowflake/frost/issues

        ${pico.magenta("Feel like Contributing?")}
        https://github.com/devsnowflake/frost/pulls. Open a pull request with your feature or
        fix. Any pull requests are welcome. 
         
        ${pico.magenta("Do you like the module?")}
        Star it on github, it means a lot.
        https://github.com/devsnowflake/frost

        ${pico.bold("Commands")}
        -----------------------------------

        ${pico.cyan("serve")} --serve -s :: Start your website on a local dev server.
        ${pico.cyan("help")}  --help  -h :: Opens up this help menu.
        ${pico.cyan("build")} --build -b :: Build Your Application.
    `);
}
