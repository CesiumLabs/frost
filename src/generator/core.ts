import { GeneratorOptions } from "./";
import { join } from "path";
import { existsSync, readFileSync, watch as fsWatch } from "fs";
import { WssStart, WssSend } from "../server";
import { createHttpServer } from "../server";
import path from "node:path";
import fs from "node:fs";
import { info } from "../logger";
import deleteDir from "../utils/deleteDir";
import { copyIntoBuild } from "../builder/copyIntoBuild";
import RecursiveReadDir from "../utils/recursiveReadDir";
import { copyStatic } from "../builder/copyStatic";

const readTextFileSync = (file: string) => readFileSync(file, "utf-8");
export default class FrostGenerator {
    options: GeneratorOptions = {
        srcDir: "source",
        buildDir: "build",
        staticDir: "static",
        HTMLcompressionLevel: 2,
        metadataFile: "frost.metadata.json"
    };

    constructor(opts?: GeneratorOptions) {
        if (opts) {
            this.options = { ...this.options, ...opts };
        }
    }

    async serve(port: number): Promise<void> {
        const onChange = () => {
            WssSend("reload");
        };
        fsWatch(this.options.srcDir, onChange);
        let pages = new Array<string>();
        RecursiveReadDir(this.options.srcDir, (p: string) => {
            if (path.extname(p) == ".frost") {
                pages.push(p);
            }
        });
        const server = await createHttpServer(port, pages, this.options);
        WssStart(server);
    }

    async build(): Promise<void> {
        let pages = new Array<string>();
        RecursiveReadDir(this.options.srcDir, (p: string) => {
            if (path.extname(p) == ".frost") {
                pages.push(p);
            }
        });
        if (fs.existsSync(this.options.buildDir)) {
            deleteDir(this.options.buildDir);
        }

        fs.mkdirSync(this.options.buildDir);

        info("Building files...");
        await copyIntoBuild(this.options, pages);
        await copyStatic(this.options);
    }
    loadConfigFile(): void {
        let name: string = "frost";
        let jsonConfigFile = join(process.cwd(), `${name}.json`);

        if (existsSync(jsonConfigFile)) {
            try {
                this.options = {
                    ...JSON.parse(readTextFileSync(jsonConfigFile))
                };
                this.configChanged();

                console.log(`Using Configuration file ${name}.json as detected.`);
            } catch (e) {
                console.log(`unable to load configuration file: ${e}`);
            }
        }
    }

    private configChanged(): void {
        this.options.srcDir = join(process.cwd(), this.options.srcDir);
        this.options.buildDir = join(process.cwd(), this.options.buildDir);
        this.options.staticDir = join(this.options.srcDir, this.options.staticDir);
    }
}
