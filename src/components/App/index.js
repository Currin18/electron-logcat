import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

import Header from '../Header';
import DeviceTable from '../DeviceTable';

import constants from '../../constants';

// import logo from './../../res/images/logo.svg';
// import './App.css';
// import {remote } from 'electron';

const ipc = window.require('electron').ipcRenderer;

const handleClick = () => {
    ipc.send(constants.EVENT_SYNC_DEVICES_REQUEST);
}

const App = () => (
    <div className="layoutWrapper">
        <Header />
        <Button onClick={handleClick} color="primary">
            Sync devices
        </Button>
        <DeviceTable />
    </div>
);

export default (App);