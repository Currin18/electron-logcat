const { app, BrowserWindow } = require('electron');

const path = require('path');
const fs = require('fs');
const url = require('url');
const isDev = require('electron-is-dev');
const { exec, spawn } = require('child_process');

const ipc = require('electron').ipcMain;

const constants = {
    EVENT_SYNC_DEVICES_REQUEST: 'EVENT_SYNC_DEVICES_REQUEST',
    EVENT_SYNC_DEVICES_RESPONSE: 'EVENT_SYNC_DEVICES_RESPONSE',
    EVENT_DEVICE_SELECTED: 'EVENT_DEVICE_SELECTED',
    EVENT_LOGCAT_READY: 'EVENT_LOGCAT_READY',
    EVENT_LOGCAT_SENDING: 'EVENT_LOGCAT_SENDING',
};

global.sharedConfig = {};

let mainWindow;

const goToPath = (hash) => {
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, './index.html'),
        protocol: 'file:',
        slashes: true,
        hash
    }));
}

const createWindow = () => {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 900,
        height: 680,
        webPreferences: {
            nodeIntegration: true,
        },
    });
    // and load the index.html of the app
    // mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, './index.html')}`);
    // mainWindow.loadFile('dist/index.html');
    
    // goToPath('/splash');

    if (isDev) {
        // Open the DevTools.
        //BrowserWindow.addDevToolsExtension('<location to your react chrome extension>');
        mainWindow.webContents.openDevTools();
    }
    mainWindow.on('closed', () => mainWindow = null);

    mainWindow.webContents.on('event1', () => {
        console.log('event1');
    });

    global.nodeVersion = process.versions.node;
    global.chromeVersion = process.versions.chrome;
    global.electronVersion = process.versions.electron;

    setTimeout(() => {
        goToPath('/devices')
    }, 5000);

    // readLogcat();
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});

ipc.on(constants.EVENT_SYNC_DEVICES_REQUEST, (event) => {
    console.log(constants.EVENT_SYNC_DEVICES_REQUEST);

    getDevicesFromADB().then((devices)=>{
        console.log('devices', devices);
        event.reply(constants.EVENT_SYNC_DEVICES_RESPONSE, devices);
    }).catch((error)=>{
        console.log('error', error);
    });
    
});

ipc.on(constants.EVENT_DEVICE_SELECTED, (event, deviceId) => {
    console.log(constants.EVENT_DEVICE_SELECTED, deviceId);
    global.deviceId = deviceId;
    goToPath('/logcat');
})

ipc.on(constants.EVENT_LOGCAT_READY, (event, deviceId) => {
    console.log(constants.EVENT_LOGCAT_READY, deviceId);
    readLogcat(deviceId);
});

// module

const getDevicesFromADB = () => {
    return new Promise((resolve, reject) => {
        exec(`${path.join(__dirname, './platform-tools/linux/adb devices -l')}`, (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                reject(error);
            }

            if (stderr) console.log(`stderr: ${stderr}`);

            if (stdout) {
                console.log(`stdout: ${stdout}`);

                var split = stdout.split("\n").find(t => t.match(/^[A-Z0-9]{2}/));
                // console.log("split: ", split);
                if (split) {

                    var deviceList = [];

                    if (typeof(split !== Array)) split = [split];
                    split.forEach(element => {
                        
                        const deviceRow = element.match(/(^[A-Z0-9]*)\s*(device)\s(.*)/);
                        // console.log('deviceRow: ', deviceRow);
                        
                        if (deviceRow && deviceRow.length > 0) {
                            var device = {
                                id: deviceRow[1],
                                usb: deviceRow[3].match(/usb:([a-zA-Z0-9\.\-\_]*)/)[1],
                                product: deviceRow[3].match(/product:([a-zA-Z0-9\.\-\_]*)/)[1],
                                model: deviceRow[3].match(/model:([a-zA-Z0-9\.\-\_]*)/)[1],
                                device: deviceRow[3].match(/device:([a-zA-Z0-9\.\-\_]*)/)[1],
                                transport_id: deviceRow[3].match(/transport_id:([a-zA-Z0-9\.\-\_]*)/)[1],
                            }

                            // console.log('device: ', device);

                            deviceList.push(device);
                        }
                    });

                    // console.log('deviceList: ', deviceList);
                    global.deviceList = deviceList;
                    resolve(deviceList);
                }
            }

            resolve([]);
        });
    });
}

// const readStream = fs.createReadStream('logcat.log');

const readLogcat = (device) => {
    let logcat = spawn(`${path.join(__dirname, './platform-tools/linux/adb')}`, ['-s', device, 'logcat', '*:D']);
    
    logcat.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
        mainWindow.webContents.send(constants.EVENT_LOGCAT_SENDING, data);
    });
    
    logcat.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });
    
    logcat.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
    });
}