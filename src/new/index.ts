import cp from 'child_process';
import path from 'path';
import Argument from './types/argument';
import * as logger from '../logger';
import fs from 'node:fs';
import pico from 'picocolors';
import shell from 'shelljs';

export default class CreateNewProject {
    public args: Argument; 
    public path: string;
    public force: boolean;
    constructor(args: Argument) {
        this.args = args;
        this.path = args.dir ?? ".";
        this.force = !!args.force;
    }

    startCreation(): void {
       console.log(pico.green("Starting initialization..."))
       let commands:Array<string> = [
          `git clone https://github.com/rhygg/frost-starter-template ${this.path}`
        ];

        try{
           if(this.force && fs.readdirSync(this.path).length !== 0) {
               console.log(pico.yellow("--force"), pico.red("usage detected, deleting existing directory"));

              commands.push(`rm -rf ${this.path}`);
           }
        commands.forEach(command => {
        
            shell.exec(command);
           });

           console.log(pico.green("Initialization successful!"))
             }catch (error) {
        logger.error(error);
    }
    }
}