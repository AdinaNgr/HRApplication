import React from 'react';
import ViewDetailsModalTemplate from '../ViewDetailsModalTemplate';
import config from '../helper';
import MyController from './Controller/Controller.js';
import Accessors from '../../context/Accessors';
import Context from '../../context/Context';
import '../../assets/less/index.less'
export default class EditForm extends React.Component {
    constructor(){
        super();
    }

    componentWillMount(){
        this.subscription=Context.subscribe(this.onContextChange.bind(this));
    }

    componentWillUnmount(){
        this.subscription.dispose();
    }

    onContextChange(cursor){
        //console.log("Context has changed!");
        this.setState({
           model: cursor.get('model')
        });
    }

    render(){
        const model = this.state.model;
        const projects = model.Projects;
        const name = model.Name;
        const address = model.Address;
        const employmentDate = model.EmploymentDate;
        const releasedDate = model.ReleasedDate;
        const jobType = model.JobType;
        const position = model.Position;
        const allocation = model.Allocation;

        return(

            <ViewDetailsModalTemplate onCancelClick={this.props.onCancelClick}
                           Title={this.props.Title}>
                <div className="col-md-4 col-md-4-custom">
                    <div className="box box-widget widget-user-2">
                        <div className="widget-user-header widget-user-header-custom">
                            <div className="widget-user-image">
                                <img className="img-circle hoverZoomLink" src="../../../src/assets/less/themes/lte/img/full_logo.png" alt="User Avatar"></img>
                            </div>
                            <h3 className="widget-user-username">{name}</h3>
                            <h5 className="widget-user-desc">{position}</h5>
                        </div>
                        <div className="box-footer no-padding">
                            <ul className="nav nav-stacked">
                                <li><a>Projects <span className="pull-right bg-aqua">{projects}</span></a></li>
                                <li><a>Allocation <span className="pull-right badge bg-aqua">{allocation}</span></a></li>
                                <li><a>Address <span className="pull-right badge bg-aqua">{address}</span></a></li>
                                <li><a>Job Type <span className="pull-right badge bg-aqua">{jobType}</span></a></li>
                                <li><a>Employment Date <span className="pull-right badge bg-aqua">{employmentDate}</span></a></li>
                                <li><a>Termination Date <span className="pull-right badge bg-aqua">{releasedDate}</span></a></li>
                            </ul>
                        </div>
                    </div>
                </div>

            </ViewDetailsModalTemplate>
        )
    }

}