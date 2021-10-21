import { GeneratorOptions } from './';
import { join } from 'path';
import { existsSync, readFileSync, watch as fsWatch } from 'fs';
import { WssStart, WssSend } from '../server';

const readTextFileSync = (file: string) => readFileSync(file, "utf-8");
export default class FrostGenerator {
    options: GeneratorOptions = {
        srcDir: "src",
        buildDir: "build",
        staticDir: "static",
        HTMLcompressionLevel: 2,
        port: 3001
    }

    constructor(opts?: GeneratorOptions) {
        if(opts) {
            this.options = {...this.options, ...opts};
        }
    }
    
    async serve(port: number): Promise<void> {
        WssStart(port);

        const onChange = () => {
            WssSend('reload');
        }
        fsWatch(this.options.srcDir, onChange);

       
        
    }
    loadConfigFile(): void {
        let name: string = "frost";
        let jsonConfigFile = join(process.cwd(), `${name}.json`);

        if(existsSync(jsonConfigFile)) {
            try{
                this.options = {
                  ...this.options,
                  ...JSON.parse(readTextFileSync(jsonConfigFile))
                };
                this.configChanged();
        
                console.log(`Using Configuration file ${name}.json as detected.`)
              }catch(e){
                console.log(`unable to load configuration file: ${e}`);
              }
        }
    }

    private configChanged(): void{
    
        this.options.srcDir = join(process.cwd(), this.options.srcDir);
        this.options.buildDir = join(process.cwd(), this.options.buildDir);
        this.options.staticDir = join(this.options.srcDir, this.options.staticDir);
      }
}