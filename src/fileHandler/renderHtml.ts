import fs from 'fs';
import path from 'path';
import { GeneratorOptions } from '../generator';
import { renderPage } from './';
import getData from '../utils/getData';
const renderHtml = async(url: string, options: GeneratorOptions) => {
   
    const filePath = path.join(options.srcDir, url);
    
    const fileR = `${filePath.substring(0, filePath.length - 4)}ejs`;
    const file = fs.existsSync(fileR) ? fileR : "404";

    if(file == "404") {
       return "404: Page Not Found";
    }
  
    let html = await renderPage(file, await getData(options), options);
        let normalDoc = false;
        if(html.endsWith("</body></html>")){
          normalDoc = true;
          html = html.substring(0, html.length - "</body></html>".length);
        }

        html += `<script>var ssgs=new WebSocket("ws://localhost:${options.port}");ssgs.onmessage=function(event){if(event.data==="reload"){window.location.reload()}}</script>`;

        if(normalDoc){
          html += "</body></html>";
        }

        return html;
      };

      export { renderHtml };