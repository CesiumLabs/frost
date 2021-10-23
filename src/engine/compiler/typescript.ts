import * as ts from "typescript";

const defaultOptions: ts.CompilerOptions = {
    module: ts.ModuleKind.ES2015,
    target: ts.ScriptTarget.ES2015,
    esModuleInterop: true,
    experimentalDecorators: true,
    removeComments: true,
    declaration: false,
    allowJs: true,
    alwaysStrict: true,
    downlevelIteration: true,
    skipDefaultLibCheck: true,
    skipLibCheck: true,
    lib: ["dom", "ES5"]
};

export function compile(source: string, options: ts.CompilerOptions = defaultOptions): string {
    const code = ts.transpileModule(source, {
        compilerOptions: options
    });

    return code.outputText;
}
