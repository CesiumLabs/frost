export enum FrostTag {
    COMMENT = "<!--([\\S\\s]+)-->",
    TYPESCRIPT = "<frost typescript>([\\S\\s]+)</frost>",
    MARKDOWN = "<frost markdown>([\\S\\s]+)</frost>",
    IMPORT = '#(include|import) "(.+)"',
    JS_RENDER = "<frost>([\\S\\s]+)</frost>",
    JS_EMBED = "<frost embed>([\\S\\s]+)</frost>"
}