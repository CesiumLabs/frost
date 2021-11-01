import http from "node:http";
import { GeneratorOptions } from "../generator";
import path from "node:path";
import getData from "../utils/getData";
import * as frost from "../engine/index";
import * as logger from "../logger";
import pico from "picocolors";
import { stripIndents } from "common-tags";
const serverCreate = async (port: number, pages: Array<string>, options: GeneratorOptions): Promise<http.Server> => {
    const server = http.createServer(async (request: http.IncomingMessage, response: http.ServerResponse) => {
        response.writeHead(200, { "Content-Type": "text/html" });
        let url = request.url;
        let data = await getData(options);

        for (const page of pages) {
            if (path.basename(path.dirname(page)) == options.srcDir) {
                let base = path.basename(page, ".frost");
                if (url == `/`) {
                    if (base != "index") return;
                    let rendered = renderHTML(path.join(process.cwd(), page), data);
                    rendered += `<script>var ssgs=new WebSocket("ws://localhost:${port}");ssgs.onmessage=function(event){if(event.data==="reload"){window.location.reload()}}</script>`;
                    response.write(rendered);
                    logger.info(`/ - successfully built ${pico.green("✔︎")}`);
                    response.end();
                } else if (url == `/${base}`) {
                    let rendered = renderHTML(path.join(process.cwd(), page), data);
                    rendered += `<script>var ssgs=new WebSocket("ws://localhost:${port}");ssgs.onmessage=function(event){if(event.data==="reload"){window.location.reload()}}</script>`;
                    response.write(rendered);
                    logger.info(`/${base} - successfully built ${pico.green("✔︎")}`);
                    response.end();
                }
            } else {
                const baseDex = page.split("/");
                const reduced = baseDex.filter((_, idx) => idx > 0);
                const r = reduced.join("/");
                const root = r.split("/")[r.split("/").length - 1];
                const base = r
                    .split("/")
                    .filter((_, posx) => posx < r.split("/").length - 1)
                    .join("/");
                const re = path.basename(root, ".frost");
                if (url == `/${base}/`) {
                    if (path.basename(root, ".frost") != "index") return;
                    let rendered = renderHTML(path.join(process.cwd(), page), data);
                    rendered += `<script>var ssgs=new WebSocket("ws://localhost:${port}");ssgs.onmessage=function(event){if(event.data==="reload"){window.location.reload()}}</script>`;
                    response.write(rendered);
                    logger.info(`/${base} - successfully built ${pico.green("✔︎")}`);
                    response.end();
                }

                if (url == `/${base}/${re}`) {
                    let rendered = renderHTML(path.join(process.cwd(), page), data);
                    rendered += `<script>var ssgs=new WebSocket("ws://localhost:${port}");ssgs.onmessage=function(event){if(event.data==="reload"){window.location.reload()}}</script>`;
                    response.write(rendered);
                    logger.info(`/${base}/${re} - successfully built ${pico.green("✔︎")}`);
                    response.end();
                }
            }
        }
    });

    server.listen(port, "localhost", () => {
        logger.info(`${pico.green("✔︎")} Server started on http://localhost:${port}`);
    });

    return server;
};

function renderHTML(page: string, data: any = {}) {
    try {
        return frost.renderFile(page, data);
    } catch (err) {
        const error = err as Error;
        console.error(error);
        return stripIndents`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Error</title>
        </head>
        <body>
            <div class="__exception__container">
                <p class="__exception__title"><strong>Frost Renderer Exception</strong></p>
                <p class="__exception__message"><strong><pre>${error.message}</pre></strong></p>
                <div class="__exception__stack">
                    <h3>Stack Trace:</h3>
                    <pre>${error.stack?.replace(error.message, "")}</pre>
                </div>
            </div>
        </body>
        <style>
            * {
                margin: 0;
                padding: 0;
            }

            body {
                background-color: rgb(37, 37, 37);
            }

            .__exception__container {
                color: #FFF;
                font-family: Helvetica, sans-serif;
                padding: 3rem 4rem;
                font-size: 1rem;
            }

            .__exception__title {
                margin-bottom: 0.5rem;
                color: rgb(241, 88, 60);
            }

            .__exception__message {
                margin-bottom: 0.3rem;
                font-size: 1.5rem;
            }

            .__exception__stack {
                margin-top: 0.8rem;
                font-size: 1.2rem;
                color: rgb(99, 99, 99);
            }
        </style>
        </html>
        `;
    }
}

export { serverCreate as createHttpServer };
