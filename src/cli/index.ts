#!/usr/bin/env node

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
