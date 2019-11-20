import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App'
// import App from './components/App';

// const ipc = window.require('electron').ipcRenderer;



const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'));
};

renderApp();