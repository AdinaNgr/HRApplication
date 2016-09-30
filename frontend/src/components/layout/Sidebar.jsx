import * as React from 'react';
import {Link} from 'react-router';
import * as $ from 'jquery';
import config from '../helper';
import '../../assets/less/index.less';
import Context from '../../context/Context';
import SidebarOffices  from '../dashboard/OfficesList'

const Multilevel = () => {
    return (
        <li className="treeview">
            <a href="#">
                <i className="fa fa-share"></i> <span>Multilevel</span>
            <span className="pull-right-container">
              <i className="fa fa-angle-left pull-right"></i>
            </span>
            </a>
            <ul className="treeview-menu">
                <li><a href="#"><i className="fa fa-circle-o"></i> Level One</a></li>
                <li>
                    <a href="#"><i className="fa fa-circle-o"></i> Level One
                <span className="pull-right-container">
                  <i className="fa fa-angle-left pull-right"></i>
                </span>
                    </a>
                    <ul className="treeview-menu">
                        <li><a href="#"><i className="fa fa-circle-o"></i> Level Two</a></li>
                        <li>
                            <a href="#"><i className="fa fa-circle-o"></i> Level Two
                    <span className="pull-right-container">
                      <i className="fa fa-angle-left pull-right"></i>
                    </span>
                            </a>
                            <ul className="treeview-menu">
                                <li><a href="#"><i className="fa fa-circle-o"></i> Level Three</a></li>
                                <li><a href="#"><i className="fa fa-circle-o"></i> Level Three</a></li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <li><a href="#"><i className="fa fa-circle-o"></i> Level One</a></li>
            </ul>
        </li>
    )
}

// <img className="EvozonImage" src="../../src/assets/less/themes/lte/img/full_logo.png" alt="tralala"/>
class Sidebar extends React.Component{
    render(){
        return (
            <aside className="main-sidebar">
                <section className="sidebar">

                    <img className="EvozonImage" src="../../src/assets/less/themes/lte/img/full_logo.png" alt="tralala"/>
                    <ul className="sidebar-menu">
                        <p className="header">Firm Offices</p>
                        <hr className="fade-hr"></hr>
                        
                        <SidebarOffices/>

                        
                    </ul>
                </section>
            </aside>
        )
    }
}




export default Sidebar;