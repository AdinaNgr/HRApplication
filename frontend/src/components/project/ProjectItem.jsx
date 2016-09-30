import * as React from 'react'
import {Link} from 'react-router';
import '../../assets/less/index.less';

const ProjectItem = (props) => {

    const id = props.node.Id;
    const name = props.node.Name;
    const nrMembers = props.node.NrMembers;
    const duration = props.node.Duration;
    const status = props.node.Status;
    const link = props.Link;
    const edit = props.onEdit;
    const deleteF = props.onDelete;
    const lft = {
        float: "left"
    };

    return (
        <tr className="table-tr">
            <td className="td-actions">
                <div className="glyphicon glyphicon-edit custom-edit-icon" style={lft}
                    onClick={edit}>
                </div>
                <div className="glyphicon glyphicon-trash custom-delete-icon" onClick={deleteF}></div>
                </td>
            <td>{name}</td>
            <td>{nrMembers}</td>
            <td>{duration}</td>
            <td>{status}</td>
            <td>
                <tr>
                    <td>

                        <Link to={link} className="btn btn-info">
                            View Project Members
                        </Link>

                    </td>




                </tr>
            </td>
        </tr>
    )
}

export default ProjectItem;