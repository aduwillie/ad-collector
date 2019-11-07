import '@babel/polyfill';
import React from 'react';
import ReactDom from 'react-dom';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

const App = () => {
    return (
        <div>
            Welcome to Roles!
        </div>
    );
};

ReactDom.render(
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={App} />
        </Switch>
    </BrowserRouter>, 
    document.getElementById('main')
);
