import * as React from 'react';
import {Link} from 'react-router';
import '../../assets/less/index.less';

export default class DepartmentItem extends React.Component<any, any> {

    onEditButtonClick(){

        this.props.onEditButtonClick(this.props.index);
    }

    render() {

        //console.log('dep Id from Department Component: ', this.props.departmentId);
        const props = this.props;

        const lft = {
            float: "left"
        };
        
        return (
            <tr className="table-tr">
                <td className="td-actions">
                    <div id="editDepartment" className="glyphicon glyphicon-edit custom-edit-icon" style={lft} onClick={this.onEditButtonClick.bind(this)}></div>
                </td>

                <td>{props.element['Name']}</td>
                <td>{props.element['DepartmentManager']}</td>
                <td>{props.element['NumberOfEmployees']}</td>
                <td>{props.element['NumberOfProjects']}</td>
                <td>
                    <div className="btn-toolbar">
                        <Link to={"department/members/" + props.element.Id} className="btn btn-info">
                            View Department Members
                        </Link>

                        <Link to={"project/" + props.element.Id} className="btn btn-info">
                            View Projects
                        </Link>
                    </div>
                </td>
            </tr>
        )
    }
}
