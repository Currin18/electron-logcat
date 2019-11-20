import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App'
import { dispatcher } from './utils/dispatcher';

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'));

  document.ondragover = document.ondrop = (ev) => {
    ev.preventDefault();
  }

  window.require('electron').ipcRenderer.on('file-open', (event, file) => {
    dispatcher.openFile(file);
  });
};

renderApp();