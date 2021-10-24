import http from "node:http";
import { GeneratorOptions } from "../generator";
import path from "node:path";
import getData from "../utils/getData";
import * as frost from "../engine/index";
import * as logger from "../logger";
import pico from "picocolors";
const serverCreate = async (port: number, pages: Array<string>, options: GeneratorOptions): Promise<http.Server> => {
    const server = http.createServer(async (request: http.IncomingMessage, response: http.ServerResponse) => {
        response.writeHead(200, { "Content-Type": "text/html" });
        let url = request.url;
        let data = await getData(options);
        for (const page of pages) {
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
        if (process.env.NODE_ENV !== "production") {
            const error = err as Error;
            console.error(error);
            return `
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
        <p class="__exception__title"><strong>Exception</strong></p>
        <p class="__exception__message"><strong>${error.message}</strong></p>
        <div class="__exception__stack">
            ${error.stack}
        </div>
    </div>
</body>

<style scoped>
    * {
        margin: 0;
        padding: 0;
    }

    .__exception__container {
        background-color: rgb(37, 37, 37);
        color: #FFF;
        height: 100vh;
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
        font-size: 1.2rem;
        color: rgb(99, 99, 99);
    }
</style>
</html>
            `;
        } else {
            throw err;
        }
    }
}

export { serverCreate as createHttpServer };
