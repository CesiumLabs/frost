export enum FrostTag {
    COMMENT = "<!--((.|\n)+?)-->",
    TYPESCRIPT = "<frost typescript>((.|\n)+?)</frost>",
    MARKDOWN = "<frost markdown>((.|\n)+?)</frost>",
    IMPORT = '#(include|import) "(.+)"',
    JS_RENDER = "<frost>((.|\n)+?)</frost>",
    JS_EMBED = "<frost embed>((.|\n)+?)</frost>"
}
