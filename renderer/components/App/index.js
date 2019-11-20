import React, { Fragment } from 'react';
import FiltersPanel from '../FiltersPanel';
// import LogPanel from '../LogPanel';

const App = () => (
    <div className="layoutWrapper">
        <Fragment>
            <FiltersPanel />
            {/* <LogPanel /> */}
        </Fragment>
    </div>
  );

export default (App);