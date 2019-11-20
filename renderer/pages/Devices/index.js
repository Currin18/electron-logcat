import React from 'react';
import Button from '@material-ui/core/Button';

import DeviceTable from '../../components/DeviceTable';

import constants from '../../constants';

const ipc = window.require('electron').ipcRenderer;

const handleClick = () => {
    ipc.send(constants.EVENT_SYNC_DEVICES_REQUEST);
}

const Devices = () => (
    <div>
        <h1>Devices</h1>
        <Button onClick={handleClick} color="primary">
            Sync devices
        </Button>
        <DeviceTable />
    </div>
);

export default (Devices);