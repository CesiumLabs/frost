import http from "node:http";
import { GeneratorOptions } from "../generator";
import path from "node:path";
import getData from "../utils/getData";
import * as frost from "../FrostWalker/index";
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
                logger.info(`/${base} - successfully built ${pico.green("✔︎")}`);
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
            return `<pre>${error.stack}</pre>`;
        } else {
            throw err;
        }
    }
}

export { serverCreate as createHttpServer };
