#!/usr/bin/env node --experimental-specifier-resolution=node
import pico from "picocolors";
import * as logger from "../logger";
import { FrostGenerator } from "../generator";
import CreateNewProject from "../new";
import argParser from "minimist";

const args: string = process.argv[2];
const options: string = process.argv[3];
const optionsArg = process.argv[4];
const HELP_RESPONSE = `

${pico.cyan(pico.bold("HELP MENU"))}


Frost is a static site generator made by the developers at SnowflakeDev Community. 
If you have any problems with the package, feel free to open an issue at
https://github.com/cesiumlabsfrost/issues

${pico.magenta("Feel like Contributing?")}
https://github.com/cesiumlabs/frost/pulls. Open a pull request with your feature or
fix. Any pull requests are welcome. 

${pico.magenta("Do you like the module?")}
Star it on github, it means a lot.
https://github.com/cesiumlabs/frost

${pico.bold("Commands")}
-----------------------------------

${pico.cyan("serve")} --serve -s :: Start your website on a local dev server.
${pico.cyan("help")}  --help  -h :: Opens up this help menu.
${pico.cyan("build")} --build -b :: Build Your Application.
${pico.cyan("init")}  --init  -i :: Initialize a new application.
`;
let configFile: string;
const argp = argParser(process.argv.slice(2));
if (argp?.config || argp?.c) {
    configFile = argp.config || argp.c;
} else {
    configFile = "frost";
}
const frost = new FrostGenerator().loadConfigFile(configFile);

if (args == "--serve" || args == "-s") frost.serve(options == "--port" && optionsArg ? Number(optionsArg) : 5348, configFile);
else if (args == "--help" || args == "-h") console.log(HELP_RESPONSE);
else if (args == "--build" || args == "-b") frost.build(configFile);
else if (args == "--version" || args == "-v") logger.info(frost.version());
else if (args == "--init" || args == "-i") {
    let dir = process.cwd();
    let force = !!process.argv.includes("--force");
    if (process.argv.includes("--dir")) dir = process.argv[process.argv.indexOf("--dir") + 1];
    await new CreateNewProject({ dir, force }).startCreation();
} else console.log(HELP_RESPONSE);
