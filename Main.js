const { app, BrowserWindow } = require('electron');

const path = require('path');
const isDev = require('electron-is-dev');
const { exec } = require('child_process');

const ipc = require('electron').ipcMain;

const constants = {
    EVENT_SYNC_DEVICES_REQUEST: 'EVENT_SYNC_DEVICES_REQUEST',
    EVENT_SYNC_DEVICES_RESPONSE: 'EVENT_SYNC_DEVICES_RESPONSE',
};

global.sharedConfig = {};

const createWindow = () => {
    // Create the browser window.
    let mainWindow = new BrowserWindow({
        width: 900,
        height: 680,
        webPreferences: {
            nodeIntegration: true,
        },
    });
    // and load the index.html of the app
    // mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, './index.html')}`);
    mainWindow.loadFile('dist/index.html');
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

    // connectToADB();
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

    connectToADB().then((devices)=>{
        console.log('devices', devices);
        event.reply(constants.EVENT_SYNC_DEVICES_RESPONSE, devices);
    }).catch((error)=>{
        console.log('error', error);
    });
    
});

// module

const connectToADB = () => {
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