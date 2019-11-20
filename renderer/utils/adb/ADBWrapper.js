'use strict';

import { exec, fork } from 'child_process';
import path from 'path';

class ADBWrapper {
    constructor() {
        this.logcat = undefined;
        this.adbLogcatUtil = undefined;
    }

    getDevices(callback) {
        let adbPath = path.join(__dirname, 'platform-tools/linux');
        // TODO: check platform

        exec(adbPath + '/adb devices', (error, stdout) => {
            const devices = [];
            const deviceList = stdout.toString.split('\n');
            const pattern = /(.*)\tdevice/;
            for (let device in deviceList) {
                let match = pattern.exec(deviceList[device]);
                if (match) {
                    devices.push(match[1]);
                }
            }
            callback(devices);
        });
    }

    isDeviceExisted(device, callback) {
        this.getDevices((devices) => {
            for (let i = 0; i < devices.length; i++) {
                if (devices[i] === device) {
                    callback();
                }
            }
        });
    }

    startLogcat(device, callback) {
        this.adbLogcatUtil = fork(path.join(__dirname, 'ADBLogcatUtil'));
        let started = false;
        this.adbLogcatUtil.on('message', (data) => {
            if (data === 0) {
                this.adbLogcatUtil.kill();
                callback('err');
                return;
            }

            callback('data', data);
            if (!started) {
                started = true;
                callback('start');
            }
        });

        this.adbLogcatUtil.on('close', () => {
            callback('stop');
        });

        this.adbLogcatUtil.send(device);
    }

    stopLogcat() {
        if (this.adbLogcatUtil) {
            this.adbLogcatUtil.send('kill');
            setTimeout(() => {
                this.adbLogcatUtil.kill();
                this.adbLogcatUtil = undefined;
            }, 500);
        }
    }
}

export default ADBWrapper;