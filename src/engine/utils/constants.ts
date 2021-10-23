export enum FrostTag {
    COMMENT = "<!--([Ss]+)-->",
    TYPESCRIPT = "<frost typescript>([Ss]+)</frost>",
    MARKDOWN = "<frost markdown>([Ss]+)</frost>",
    IMPORT = '#(include|import) "(.+)"',
    JS_RENDER = "<frost>([Ss]+)</frost>",
    JS_EMBED = "<frost embed>([Ss]+)</frost>"
}
