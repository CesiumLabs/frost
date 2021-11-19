import { GeneratorOptions } from "./";
import { join } from "path";
import { existsSync, readFileSync, watch as fsWatch } from "fs";
import { WssStart, WssSend } from "../server";
import { createHttpServer } from "../server";
import path from "node:path";
import fs from "node:fs";
import deleteDir from "../utils/deleteDir";
import * as logger from "../logger";
import { copyIntoBuild } from "../builder/copyIntoBuild";
import RecursiveReadDir from "../utils/recursiveReadDir";
import { copyStatic } from "../builder/copyStatic";

const readTextFileSync = (file: string) => readFileSync(file, "utf-8");

export default class FrostGenerator {

    public options: GeneratorOptions = {
        srcDir: "source",
        buildDir: "build",
        staticDir: "static",
        HTMLcompressionLevel: 2,
        metadataFile: "frost.metadata.json"
    };

    constructor(opts?: GeneratorOptions) {
        if (opts) this.options = { ...this.options, ...opts };
    }

    async serve(port: number) {
        fsWatch(this.options.srcDir, () => WssSend("reload"));

        let pages: string[] = [];
        RecursiveReadDir(this.options.srcDir, p => {
            if (path.extname(p) == ".frost") pages.push(p);
        });

        const server = await createHttpServer(port, pages, this.options);
        WssStart(server);
    }

    async build() {
        let pages: string[] = [];
        RecursiveReadDir(this.options.srcDir, p => {
            if (path.extname(p) == ".frost") pages.push(p);
        });

        if (fs.existsSync(this.options.buildDir)) deleteDir(this.options.buildDir);
        fs.mkdirSync(this.options.buildDir);

        logger.info("Building files...");
        await copyIntoBuild(this.options, pages);
        await copyStatic(this.options);
    }

    version(): string {
        return JSON.parse(fs.readFileSync(join(__dirname, "../../package.json"), "utf-8")).version;
    }

    loadConfigFile(): this {
        let name: string = "frost";
        let jsonConfigFile = join(process.cwd(), `${name}.json`);

        if (existsSync(jsonConfigFile)) {
            try {
                const configContent = readTextFileSync(jsonConfigFile);
                this.options = Object.assign(this.options, JSON.parse(configContent));
                // this.configChanged();
                logger.info(`Using Configuration file ${name}.json as detected (${jsonConfigFile})`);
            } catch (e) {
                logger.warn(`Unable to load configuration file: ${e}`);
            }
        }

        return this;
    }

    /* 
    private configChanged(): void {
        this.options.srcDir = join(process.cwd(), this.options.srcDir || "");
        this.options.buildDir = join(process.cwd(), this.options.buildDir || "");
        this.options.staticDir = join(this.options.srcDir || "", this.options.staticDir || "");
    }
    */

}
