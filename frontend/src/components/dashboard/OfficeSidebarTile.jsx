import * as React from 'react';
import classNames from 'classnames';
import {Link} from 'react-router';
import '../../assets/less/index.less';

class OfficeSidebarTile extends React.Component<any, any>{
    render(){
        const props = this.props;

        return (
            <p className="office-sidebar-tile ">
                        <Link to={props['link']} className="small-box-footer">
                            <span className="info-box-number">
                            {props['name']}
                        </span>
                        </Link>
            </p>

        )
    }
}

export default OfficeSidebarTile;