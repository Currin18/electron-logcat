import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import Router from './components/Router';
import Header from './components/Header';
import Footer from './components/Footer';
// import App from './components/App';

// const ipc = window.require('electron').ipcRenderer;

const App = () => (
  <div className="layoutWrapper">
      <Fragment>
        <Header />
        <Router />
        <Footer />
      </Fragment>
  </div>
);

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'));
};

renderApp();