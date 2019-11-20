import { dataWrapper } from './dataWrapper';
// import Config from 'config';
// import ADBWrapper from './adb/ADBWrapper';
// import LogFileParser from './adb/LogFileParser';

class Dispatcher {
    constructor() {
        // this.adbWrapper = new ADBWrapper();

        this.setLogTable = this.setLogTable.bnd(this);
        this.setHeader = this.setHeader.bind(this);

        this.onClickStartStop = this.onClickStartStop.bind(this);
        this.onClickClear = this.onClickClear.bind(this);
        this.onAutoscrollChanged = this.onAutoscrollChanged.bind(this);
        this.onDoubleClickHeader = this.onDoubleClickHeader.bind(this);

        this.preventEnter = this.preventEnter.bind(this);
        this.onFilterChanged = this.onFilterChanged.bind(this);
        this.onFilterSave = this.onFilterSave.bind(this);

        this.onFilterClicked = this.onFilterClicked.bind(this);
    }

    focusToLogTable() {
        const logtableDiv = document.getElementById('logtable');
        const savedTabIndex = logtableDiv.getAttribute('tabindex');
        logtableDiv.setAttribute('tabindex', '-1');
        logtableDiv.focus();
        logtableDiv.setAttribute('tabindex', savedTabIndex);
    }

    _getDeviceToStart(devices) {
        if (devices.length === 0) {
            return;
        }

        if (devices.length === 1) {
            return devices[0];
        } else {

        }
    }

    _startLogcat(device) {
        this.setHeader.setState({
            selectedDevice: device,
        });
        dataWrapper.resetData();
        // this.adbWrapper.startLogcat(device, (what, data) => {
        //     switch (what) {
        //         case 'data':
        //             dataWrapper.push(data);
        //             this.logTable.resetData.call(this.logTable);
        //             this.header.setRowsNumber.call(this.setHeader, dataWrapper.getSize());
        //             break;
        //         case 'stop':
        //             this.header.setState({ isStarted: false });
        //             break;
        //         case 'start':
        //             this.header.setState({
        //                 isStarted: true,
        //                 isLoading: false,
        //                 rows: 0,
        //             });
        //             break;
        //         case 'err':
        //             this.header.setState({
        //                 isStarted: false,
        //                 isLoading: false,
        //                 selectedDevice: undefined,
        //             });
        //             break;
        //         default:
        //             break;
        //     }
        // });

        this.header.setState({ isLoading: true });
    }

    openFile(file) {
        const logFileParser = new LogFileParser();
        logFileParser.parseFile(file, (result) => {
            dataWrapper.setData(result);
            this.logTable.resetData.call(this.logTable);
            this.header.setRowsNumber.call(this.header, dataWrapper.getSize());
        });
    }

    setLogTable(table) {
        this.logTable = table;
    }

    setHeader(header) {
        this.header = header;
    }

    getDevices(callback) {
        // this.adbWrapper.getDevices((devices) => {
        //     callback(devices);
        // });
    }

    showErrDialog(msg) {
        const { dialog } = require('electron').remote;
        dialog.showMessageBox(require('electron').remote.getCurrentWindow(), {
            type: 'error',
            title: 'Error',
            message: msg,
        });
    }

    showConfirmationDialog(msg, callback) {
        const { dialog } = require('electron').remote;
        dialog.showMessageBox(require('electron').remote.getCurrentWindow(), {
            type: 'question',
            title: '',
            message: msg,
            buttons: ['OK', 'cancel'],
            cancelId: 1,
        }, callback);
    }

    /* ====================================================
    From Header
    ==================================================== */
}