export interface GeneratorOptions {
    srcDir: string;
    buildDir: string;
    staticDir: string;
    HTMLcompressionLevel: number;
    metadataFile: string;
}

export * as FrostGenerator from "./core";
