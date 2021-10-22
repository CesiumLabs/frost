import http from 'node:http';
import { GeneratorOptions } from '../generator';
import path from 'node:path';
import fs from 'node:fs';
import getData from '../utils/getData';
import * as frost from 'frost-walker';
const serverCreate =async (pages: Array<string>, options: GeneratorOptions): Promise<void> => {
const server = http.createServer(async (request: http.IncomingMessage, response: http.ServerResponse) => {
    response.writeHead(200, {'Content-Type': 'text/html'}); 
    let url = request.url;
   console.log(pages);
   let data = await getData(options);
   for(const page of pages) {
    let base = path.basename(page, '.frost');
    console.log(base);
    if(url == `/${base}`) {
        console.log(path.join(process.cwd(),page));
        const rendered = frost.renderFile(path.join(process.cwd(),page), data);
        console.log(rendered);
        response.write(rendered);
        response.end();
    }
   }

})

server.listen(2021, () => {
    console.log("Server has started");
})
}

export { serverCreate as createHttpServer };