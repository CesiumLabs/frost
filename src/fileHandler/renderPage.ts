import path from 'node:path';
import * as ejs from 'ejs';
import minifier from '../utils/minifier';
import { GeneratorOptions } from '../generator';
const renderPage = async (pagePath: string, data: Record<string, unknown>, options: GeneratorOptions): Promise<string> => {
    const file = path.parse(pagePath);
    if (file.ext === `.ejs`) {
        const html = await ejs.renderFile(pagePath, data);
        const minHtml: string = minifier(html, options.HTMLcompressionLevel);
        console.log(`successfully rendered :${file.base}`);
        return minHtml;
    }
    
    return "";
}

export { renderPage };
