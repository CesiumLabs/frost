import * as ts from "typescript";
import { FrostError } from "../utils/error";
// import { generate } from "../../utils/genName";

const defaultOptions: ts.CompilerOptions = {
    esModuleInterop: true,
    experimentalDecorators: true,
    removeComments: true,
    declaration: false,
    allowJs: false,
    alwaysStrict: true,
    downlevelIteration: true,
    skipDefaultLibCheck: true,
    skipLibCheck: true,
    noEmitOnError: true,
    noImplicitAny: true
};

const createTSError = (diagnostics?: ts.Diagnostic[]) => {
    if (diagnostics?.length) {
        const errMsg = diagnostics.map((m) => `TS${m.code}: ${typeof m.messageText === "string" ? m.messageText : m.messageText.messageText}`);
        return new Error(errMsg.join("\n\n"));
    }

    return null;
};

export function compile(source: string, options?: ts.CompilerOptions): string {
    try {
        options = Object.assign({}, defaultOptions, options || {});

        const emitted = ts.transpileModule(source, { compilerOptions: options });
        const error = createTSError(emitted.diagnostics);
        if (error) throw error;
        return emitted.outputText;
    } catch (e) {
        throw new FrostError(`TypeScript compilation error:\n${(e as Error).message}`, "TypeScriptError");
    }
}
