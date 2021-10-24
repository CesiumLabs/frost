const engine = require("../build/src/engine");
const assert = require("assert");
const path = require("path");
testStack("it should equal to html output", () => {
    assert.equal(
        engine.renderFile(path.join(process.cwd(), "__test__/index.frost"), { __dirname: __dirname, author: "rhydderchc" }),
        "<!DOCTYPE html>\n" +
            '<html lang="en">\n' +
            "<head>\n" +
            '<meta charset="UTF-8">\n' +
            '<meta http-equiv="X-UA-Compatible" content="IE=edge">\n' +
            '<meta name="viewport" content="width=device-width, initial-scale=1.0">\n' +
            "<title>Frost</title>\n" +
            "</head>\n" +
            "<body>\n" +
            "rhydderchc\n" +
            "</body>\n" +
            "</html>"
    );
});
