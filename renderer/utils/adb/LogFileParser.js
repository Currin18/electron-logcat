'use strict';

import fs from 'fs';
import readLine from 'readline';

class LogFileWrapper {
    constructor() {
        this.pattern = /(\d\d-\d\d)\s+(\d\d:\d\d:\d\d.\d\d\d)\s+(\d+)\s+(\d+)\s+([a-zA-Z])\s+([^\s.]+)(\s+)?:\s+(.*)/;
    }

    parseFile(file, callback) {
        const inputFile = fs.createReadStream(file);
        const rl = readLine.createInterface({
            input: inputFile
        });

        let result = [];
        rl.on('line', (input) => {
            let match = this.pattern.exec(input);
            if (match) {
                result.push({
                    time: match[1] + ' ' + match[2],
                    pid: match[3],
                    tid: match[4],
                    level: match[5],
                    tag: match[6],
                    message: match[8]
                });
            }
        });

        rl.on('close', () => {
            inputFile.close();
            rl.close();
            callback(result);
        });
    }
}

export default LogFileWrapper;