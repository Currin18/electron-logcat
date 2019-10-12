import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import constants from '../../constants';

const ipc = window.require('electron').ipcRenderer;

class DeviceTable extends Component {
    constructor() {
        super();

        this.state = {
            rows: [],
        }
    }
    componentDidMount() {
        let node = this;
        ipc.on(constants.EVENT_SYNC_DEVICES_RESPONSE, (event, devices) => {
            console.log(constants.EVENT_SYNC_DEVICES_REQUEST, devices);
            node.setState({
                rows: devices,
            })
        });
    }
    render() {
        // const classes = useStyles();

        return (
            <Paper >
            <Table>
                <TableHead>
                <TableRow>
                    <TableCell>Id</TableCell>
                    <TableCell>Model</TableCell>
                    <TableCell align="right">Product</TableCell>
                    <TableCell align="right">Device</TableCell>
                    <TableCell align="right">USB</TableCell>
                    <TableCell align="right">Transport Id</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {this.state.rows.map(row => (
                    <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                        {row.id}
                    </TableCell>
                    <TableCell>{row.model}</TableCell>
                    <TableCell align="right">{row.product}</TableCell>
                    <TableCell align="right">{row.device}</TableCell>
                    <TableCell align="right">{row.usb}</TableCell>
                    <TableCell align="right">{row.transport_id}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </Paper>
        );
    }
}

export default (DeviceTable);