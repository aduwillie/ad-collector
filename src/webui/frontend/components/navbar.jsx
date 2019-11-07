import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import AppContext from '../data/context';

const Navbar = () => {
    const [context] = useContext(AppContext);
    const { activeMenu } = context;

    const handleLogOut = () => {}; // TBD

    return (
        <nav class="navbar navbar-expand-lg navbar-transparent navbar-absolute fixed-top">
            <div class="container-fluid">
                <div class="navbar-wrapper">
                    <Link class="navbar-brand" to={activeMenu.uri}>
                        {activeMenu.name}
                    </Link>
                </div>
                <button class="navbar-toggler" type="button" data-toggle="collapse" aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation"><span class="sr-only">Toggle navigation</span><span class="navbar-toggler-icon icon-bar"></span><span class="navbar-toggler-icon icon-bar"></span><span class="navbar-toggler-icon icon-bar"></span></button>
                <div class="collapse navbar-collapse justify-content-end">
                    <ul class="navbar-nav">
                        <li class="nav-item dropdown">
                            <a class="nav-link" id="navbarDropdownProfile" href="#pablo" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i class="material-icons">person</i>
                                <p class="d-lg-none d-md-block">Account</p>
                            </a>
                            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownProfile">
                                <Link class="dropdown-item" to="/profile">
                                    Profile
                                </Link>
                                <Link class="dropdown-item" to="/profile">
                                    Settings
                                </Link>
                                <div class="dropdown-divider"></div>
                                    <a class="dropdown-item" href="#" onClick={handleLogOut}>
                                        Log out
                                    </a>
                                </div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
