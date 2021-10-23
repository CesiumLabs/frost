import _fs from 'node:fs';
import recurseDirectory from './recursiveReadDir';

export default function deleteDir(dir: string) {
    const dirsToRemove: string[] = [];

    recurseDirectory(dir, (file) => {
      _fs.unlinkSync(file);
    }, (_dir) => {
      dirsToRemove.push(_dir);
    });
  
    for(const dirToRemove of dirsToRemove){
      _fs.rmdirSync(dirToRemove);
    }
  
    _fs.rmdirSync(dir);
}