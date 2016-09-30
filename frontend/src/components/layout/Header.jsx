import React, { Component } from 'react';
import Context from '../../context/Context';
import '../../assets/less/index.less';

const Header = () => {
    return (
        <header className="main-header-custom main-header">
            <a href="/" className="logo">
                <span className="logo-lg"><img className="header-evozon-image" src="../../src/assets/less/themes/lte/img/full_logo_header.png" alt="tralala"/><b>Fluffy</b>Warriors</span>
            </a>
            <nav className=" navbar-custom navbar navbar-static-top">
                <div className="navbar-custom-menu">
                    <ul className="nav navbar-nav">
                        <li className="dropdown user user-menu">
                            <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                    <span className="hidden-xs">
                                        Admin
                                    </span>
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
};

export default Header;