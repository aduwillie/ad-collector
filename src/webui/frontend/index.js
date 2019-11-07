import '@babel/polyfill';
import React, { useState } from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import AppContext from './data/context';

import DashboardPage from './dashboard';
import ProjectsPage from './projects';
import FormsPage from './forms';
import UsersPage from './users';

import Sidebar from './components/sidebar';
import Navbar from './components/navbar';

const App = (props) => {
    const sidebarItems = [
        { name: 'Dasboard', uri: '/', materialIcon: 'dashboard' },
        { name: 'Projects', uri: '/projects', materialIcon: 'content_paste' },
        { name: 'Forms', uri: '/forms', materialIcon: 'library_books' },
        { name: 'Users', uri: '/users', materialIcon: 'person' },
    ];
    const [activeMenu, setActiveMenu] = useState(context.sidebarItems[0].name); // sets to dashboard
    
    return (
        <AppContext.Provider> value={{ sidebarItems, activeMenu, setActiveMenu }}>
            <div className='wrapper'>
                <Sidebar />
                <div className='main-panel'>
                    <Navbar />
                    <div className='content'>
                        {props.children}
                    </div>
                </div>
            </div>
        </AppContext.Provider>
    );
};

ReactDom.render(
    <App>
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={DashboardPage} />
                <Route exact path='/projects' component={ProjectsPage} />
                <Route exact path='/forms' component={FormsPage} />
                <Route exact path='/users' component={UsersPage} />
                <Route exact path='/profile' component={UsersPage} /> {/* TBD */}
            </Switch>
        </BrowserRouter>
    </App>,
    document.getElementById('main')
);
