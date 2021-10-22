import { GeneratorOptions } from '../generator';
import recursiveReadDir from './recursiveReadDir';
import fs from 'node:fs';
import path from 'node:path';
const getData = async(options: GeneratorOptions): Promise<any> => {
let data = {};
await recursiveReadDir(process.cwd(), async (filePath: string) => {
    const file = path.parse(filePath);
      if(file.base == 'frost.metadata.json'){
       data = JSON.parse(fs.readFileSync(filePath,'utf-8'));
      }
  });
  return data;
}

export default getData;