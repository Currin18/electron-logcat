import React from 'react';
import {
//   BrowserRouter,
  HashRouter,
  Switch,
  Route,
//   Link,
//   Redirect
} from "react-router-dom";
import Paths from './routesPaths';
import Splash from '../../pages/Splash';
import Devices from '../../pages/Devices';
import Logcat from '../../pages/Logcat';

const Router = () => (
    <HashRouter>
        <div>
            {/* <div className="NavBar">
                <div className="link-container">
                <Link to={Paths.SPLASH} className="link">SPLASH</Link>
                </div>
                <div className="link-container">
                <Link to={Paths.DEVICES} className="link">DEVICE</Link>
                </div>
            </div> */}
            {/* <Redirect
                from={Paths.ROOT}
                to={Paths.SPLASH} /> */}
            <Switch>
                <Route path={Paths.SPLASH}>
                    <Splash />
                </Route>
                <Route path={Paths.DEVICES}>
                    <Devices />
                </Route>
                <Route path={Paths.LOGCAT}>
                    <Logcat />
                </Route>
            </Switch>
        </div>
    </HashRouter>
);

export default (Router);