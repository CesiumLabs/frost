import * as logger from "../logger";
import fs from "fs";
import pico from "picocolors";
import shell from "shelljs";
import clone from "github-clone-repo";

export interface Argument {
    dir?: string;
    force: boolean;
}

export default class CreateNewProject {
    public args: Argument;
    public path: string;
    public force: boolean;

    constructor(args: Argument) {
        this.args = args;
        this.path = args.dir ?? ".";
        this.force = !!args.force;
    }

    async startCreation(): Promise<void> {
        console.log(pico.green("Starting initialization..."));
        try {
            if (this.force && fs.readdirSync(this.path).length !== 0) {
                console.log(pico.yellow("--force"), pico.red("usage detected, deleting existing directory"));
                shell.exec(`rm -rf ${this.path}`);
            }

            const success = await clone({
                owner: "cesiumlabs",
                repository: "frost-template",
                branch: "main",
                outPath: "./output"
            });

            console.log(success ? pico.green("Successfully cloned template") : pico.red("Failed to clone template"));
        } catch (error) {
            logger.error(error);
        }
    }
}
