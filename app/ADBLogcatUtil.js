'use strict';

const pattern = /(\d\d-\d\d)\s+(\d\d:\d\d:\d\d.\d\d\d)\s+(\d+)\s+(\d+)\s+([a-zA-Z])\s+([^\s.]+)(\s+)?:\s+(.*)/;

const spawn = require('child_process').spawn;
const rl = require('readline');
const path = require('path');

let logcat;

function startLogcat(device) {
    let data = [];
    let adbPath = path.join(__dirname, 'platform-tools/linux');
    // TODO: check platform

    // require('child_process').exec('adb', ['-s', device, 'logcat', '-c']);
    // logcat = spawn(adbPath + '/adb', ['-s', device, 'logcat', '-v', 'threadtime']);
    logcat = spawn('adb', ['-s', device, 'logcat', '-v', 'threadtime']);
    logcat.on('error', (err) => {
        console.log('ADBLogcatUtil.js: ' + 'err - ' + err);
    });
    logcat.on('exit', (code) => {
        console.log('ADBLogcatUtil.js: ' + 'exit with ' + code);
        if (code === 0) {
            process.send(code);
        }
    });

    rl.createInterface({
        input: logcat.stdout,
        terminal: false,
    }).on('line', (line) => {
        let match = pattern.exec(line);
        if (match) {
            data.push({
                time: match[1] + ' ' + match[2],
                pid: match[3],
                tid: match[4],
                level: match[5],
                tag: match[6],
                message: match[8],
            });
        }
    });

    setInterval(() => {
        if (data.length !== 0) {
            proccess.send(data);
            data = [];
        }
    }, 1000);
}

process.on('message', (msg) => {
    if (msg === 'kill' && logcat !== undefined) {
        logcat.kill();
        return;
    }
});

process.on('uncaughtException', (err) => {
    console.log('ADBLogcatUtil.js: ' + 'uncaughtException - ' + err);
    if (logcat) {
        logcat.kill();
    }
});