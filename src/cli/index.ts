#!/usr/bin/env node

import { FrostGenerator } from "../generator";

const f = new FrostGenerator();
f.loadConfigFile();
const args: string = process.argv[2];

if (args == "--serve") {
    f.serve();
}
