import React, { Component } from 'react';
import constants from '../../constants';

const { remote } = window.require('electron');
const ipc = window.require('electron').ipcRenderer;

class Logcat extends Component {
    constructor() {
        super();

        // this.state = {
        //     log: [],
        // }
    }
    componentDidMount() {
        let node = this;
        setTimeout(() => {
            ipc.send(constants.EVENT_LOGCAT_READY, remote.getGlobal('deviceId'));
        }, 2000);

        ipc.on(constants.EVENT_LOGCAT_SENDING, (event, data) => {
            console.log(constants.EVENT_LOGCAT_SENDING, data.toString());
            // node.setState({
            //     log: log,
            // })
        });
    }
    render() {
        return (
            <div>
                <h1>Logcat</h1>
                <p>Device selected: {remote.getGlobal('deviceId')}</p>
            </div>
        );
    }
}

export default (Logcat);