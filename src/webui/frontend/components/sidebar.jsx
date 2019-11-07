import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import AppContext from '../data/context';

const Sidebar = () => {
    const [context] = useContext(AppContext);
    const { activeMenu, setActiveMenu } = context;

    return (
        <div class="sidebar" data-color="purple" data-background-color="white" data-image="../assets/img/sidebar-1.jpg">
            <div class="logo"><a class="simple-text logo-normal" href="/">Data Collector</a></div>
            <div class="sidebar-wrapper">
                <ul class="nav">
                    {context.sidebarItems.map((menu) => (
                        <li key={menu.name} class={`nav-item ${activeMenu.name === menu.name ? 'active' : ''}`}>
                            <Link class="nav-link" to={menu.uri} onClick={() => setActiveMenu(menu)}>
                                <i class="material-icons">{menu.materialIcon}</i>
                                <p>{menu.name}</p>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
