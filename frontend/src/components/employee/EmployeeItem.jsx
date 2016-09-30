import * as React from 'react'
import * as $ from 'jquery'
import {Link} from 'react-router';
import '../../assets/less/index.less'
import classnames from 'classnames';


const EmployeeItem = (props) => {

    const name = props.node.Name;
    const address = props.node.Address;
    const position = props.node.Position;
    const allocation = props.node.Allocation;
    const link = props.Link;
    const edit = props.onEdit;
    const viewDetails = props.onViewDetails;
    const deleteEmployee = props.onDelete;

    const releasedDate = props.node.ReleasedDate;

    if (releasedDate == null){
        console.log("II nUULLLL");
    }else {
        /*$(this.refs.editEmployeeRef).attr('disabled',true);
        $(this.refs.deleteEmployeeRef).attr('disabled',true);*/
    }

    const lft = {
        float: "left"
    };

    return (
        <tr className="table-tr">
            <td className="td-actions">
                <button ref="editEmployeeRef" id="editDepartment" className="glyphicon glyphicon-edit custom-edit-icon buton" style={lft} onClick={edit}></button>
                <button ref="deleteEmployeeRef" id="deleteDepartment" className="glyphicon glyphicon-trash custom-delete-icon buton" onClick={deleteEmployee}></button>

            </td>
            <td className="name-td">
                {name}
            </td>
            <td>
                {position}
            </td>
            <td>
                {allocation}%
            </td>
            <td>
                    {/*<Link to={link} className="btn btn-success margin-top" onClick={edit}>
                        View Details
                    </Link>*/}

                    <button id="viewDetailsID" className="btn btn-info margin-top" onClick={viewDetails}>
                        View Details
                    </button>


            </td>

        </tr>
    )
}

export default EmployeeItem;