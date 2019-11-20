import React, { Component } from 'react';
// import {remote} from 'electron';

const { remote } = window.require('electron');

class Header extends Component {
    componentDidMount() {
        // var node = ReactDOM.findDOMNode(this.refs.versions);
        // console.log('node', node.innerHTML);
        // const chromeVersion = process.versions.chrome;
        // const chromeVersion = require('electron').remote.getGlobal('chromeVersion');
        // const chromeVersion = remote.getGlobal('chromeVersion');
        // node.innerHTML = node.innerHTML.replace('$chromeVersion', chromeVersion);
    }
    render() {
        return (
            <p ref="versions">
                Estamos usando node {remote.getGlobal('nodeVersion')},
                Chrome {remote.getGlobal('chromeVersion')},
                y Electron {remote.getGlobal('electronVersion')}.
            </p>
        );
    }
};

export default (Header);