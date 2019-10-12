import React from 'react';
import ReactDOM from 'react-dom';
// import store from 'store';
import App from './components/App';

import constants from './constants';

const ipc = window.require('electron').ipcRenderer;

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'));
};

renderApp();

// ipc.on(constants.EVENT_SYNC_DEVICES_RESPONSE, (event, arg) => {
//   console.log(constants.EVENT_SYNC_DEVICES_REQUEST, arg);
// });