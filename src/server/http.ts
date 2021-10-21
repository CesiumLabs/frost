import { createServer } from 'http';
import { GeneratorOptions } from '../generator';
import path from 'node:path';
import fs from 'node:fs';
import { renderHtml } from '../fileHandler';
const serverCreate =async (options: GeneratorOptions): Promise<void> => {

    createServer(async(req, res) => {
        let url = `${req.url}`.slice(1);
        if(`${req.url}`.endsWith("/")){
          url += "index.html";
        }

        const staticPath = path.join(options.staticDir, url);
        
        if(fs.existsSync(staticPath) && fs.lstatSync(staticPath).isDirectory()) {
            res.write(fs.readFileSync(staticPath, 'utf-8'))
            res.end();
        }else if(url.endsWith(".html")){
            res.write(await renderHtml(url, options));
            res.end();
        }
        else { 
            res.write("404: Not Found");
            res.end();
        }



    }).listen(options.port, () => {
        console.log(`Running on http://localhost:${options.port}/`)
    })
}

export { serverCreate as createHttpServer };