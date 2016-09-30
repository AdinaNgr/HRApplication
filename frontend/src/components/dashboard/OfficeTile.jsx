import * as React from 'react';
import classNames from 'classnames';
import {Link} from 'react-router';
import '../../assets/less/index.less';
import Context from '../../context/Context'
class OfficeTile extends React.Component<any, any>{

    submit(){
        this.props.onEditButtonClick(this.props.index);
    }
    onViewDepartment(){
        Context.cursor.set('sidebarImage', this.props['icon'])
    }
    
    render(){
        const props = this.props;
        const parentClass = classNames("info-box-icon", props['parentClass']);
        const icon = props['icon'];
        return (
            <div className="col-md-6 col-sm-6 col-xs-12">
            <div className=" info-box-custom info-box">
                    
                    <span className={parentClass}><img src={icon} className='small-icon' alt="Img"/></span>
                    <div className="info-box-content">
                    
                    <div className="glyphicon glyphicon-edit custom-edit-icon"
                            onClick={this.submit.bind(this)}>
                    </div>
                        <span className="info-box-text-name">
                            {props['name']}
                        </span>

                        <span className="info-box-text">
                            <span className="glyphicon glyphicon-map-marker"></span>
                            {props['address']}
                        </span>
                        <span className="info-box-number">
                            <span className="glyphicon glyphicon-earphone"></span>
                            {props['phone']}
                        </span>
                        <Link to={props['link']} className="small-box-footer" onClick={this.onViewDepartment.bind(this)}>
                            <span className="glyphicon glyphicon-eye-open "></span>
                             View Departments
                        </Link>
                    </div>
                </div>
            </div>

        )
    }
}
export default OfficeTile;