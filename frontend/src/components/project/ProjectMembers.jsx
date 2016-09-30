import * as React from 'react'
import config from '../helper';
import * as $ from 'jquery'
import Controller from './controller/Controller';
import Context from '../../context/Context';
import Accessors from '../../context/Accessors'
import Form from './form/Form';
import EditAllocationForm from './form/EditAllocationForm'
import AssignEmployeeForm from './form/AssignEmployeeForm'
import '../../assets/less/index.less';

const Item = (props) => {
    const lft = {
        float: "left",
        margin: '0px 0px 0px 5px'
    };
    return (
        <tr className="table-tr">
            <td className="td-actions">
                <div className="glyphicon glyphicon-trash custom-delete-icon" onClick={props.onDelete}>
                </div>
            </td>
            <td>{props.element['Name']}</td>
            <td>{props.element['Position']}</td>
            <td><span style={lft}>{props.element['Allocation']} %</span>
                <span className="glyphicon glyphicon-edit custom-edit-icon" style={lft}
                     onClick={props.onEdit}>
                </span>
            </td>

        </tr>
    )
}
class ProjectMembers extends React.Component {

    constructor(){
        super();
    }
    componentWillMount(){
        const projectId = this.props.routeParams['projectId'];
        Controller.GetProjectMembers(projectId, 1);
        Controller.GetNrMembers(projectId);
        $.ajax({
            method: 'GET',
            url: config.base + 'project/getById/' +projectId,
            async: false,
            success: function(data){
                this.setState({
                    formToggle: false,
                    currentPage: 1,
                    projectId: data.Id,
                    projectName: data.Name
                })
            }.bind(this)
        });

        this.subscription = Context.subscribe(this.onContextChange.bind(this));

    }
    componentWillUnmount(){
        this.subscription.dispose();
    }
    onContextChange(cursor){
        this.setState({
            projectMembers: Accessors.items(Context.cursor),
            formToggle: false,
            totalNumberOfItems: Accessors.totalNumberOfItems(Context.cursor)
        });
    }

    onAddButtonClick(){
        console.log('clicked add');
        Context.cursor.set('model',null);
        this.setState({
            formToggle: true
        });
    }
    onEditAllocationClick(projectMember){
        Context.cursor.set('model', projectMember)
        this.setState({
            formToggle: true
        });
    }

    toggleModal(){
        this.setState({formToggle: false})
    }

    onPreviousButtonClick(){
        let currentPage = this.state.currentPage;
        let newCurrentpage = currentPage - 1;
        if (currentPage > 1){
            this.setState({
                currentPage: newCurrentpage
            })
            Controller.GetProjectMembers(this.state.projectId, newCurrentpage);
        }
    }
    onNextButtonClick(){
        let currentPage = this.state.currentPage;
        let newCurrentpage = currentPage + 1;
        let numberOfPages = Math.ceil((this.state.totalNumberOfItems)/5);
        if (currentPage < numberOfPages){
            this.setState({
                currentPage: newCurrentpage
            })
            Controller.GetProjectMembers(this.state.projectId, newCurrentpage);
        }
    }
    onGoToFirstPageButtonClick(){
        this.setState({
            currentPage: 1
        })
        Controller.GetProjectMembers(this.state.projectId, 1);
    }

    onGoToLastPageButtonClick(){
        let numberOfPages = Math.ceil((this.state.totalNumberOfItems)/5);
        this.setState({
            currentPage: numberOfPages
        });
        Controller.GetProjectMembers(this.state.projectId, numberOfPages);
    }
    render(){
        const totalNumberOfItems = this.state.totalNumberOfItems;
        console.log('total numberrr: ', this.state.totalNumberOfItems);

        const numberOfPages = (totalNumberOfItems == 0) ? 1 : Math.ceil(totalNumberOfItems/5);
        console.log('nrOfPages', totalNumberOfItems);

        const currentPage = this.state.currentPage;
        let modal = "";
        let label =  currentPage + "/" + numberOfPages;

        const items = this.state.projectMembers.map ( (projectMember, index) => {
            return (
                <Item
                    element = {projectMember}
                    onEdit = {this.onEditAllocationClick.bind(this, projectMember)}
                    onDelete = {Controller.DeleteAssignment.bind(this, projectMember.Id, this.state.projectId, this.state.currentPage)}
                    key = {index}
                    FormAction={Controller.EditAllocation.bind(this, projectMember, this.state.projectId)}
                    />
            )
        });
        if(this.state.formToggle) {
            if (Accessors.model(Context.cursor)) {
                modal = <EditAllocationForm
                                  onCancelClick={this.toggleModal.bind(this)}
                                  FormAction={Controller.EditAllocation.bind(this, this.state.projectId)}
                                  Title="Edit Project Allocation"/>;
            } else {
                modal = <AssignEmployeeForm
                                currentPage={this.state.currentPage}
                              onCancelClick={this.toggleModal.bind(this)}

                              ProjectId = {this.state.projectId}
                              FormAction={Controller.Add}
                              Title="Add Project"/>;

            }
        }
        return (
            <div>
                {modal}
                <p className="table-name">Project Members</p>
                <div className=" rectangle custom-rectangle-project-member">
                    <div className="glyphicon glyphicon-plus-sign custom-add-icon"
                         onClick={this.onAddButtonClick.bind(this)}>
                        <span className="add-span" onClick={this.onAddButtonClick.bind(this)}>Assign Employee</span>
                    </div>
                </div>
            <table className="table table-stripped">

                <thead>

                <tr>
                    <td> </td>
                    <td> Employee Name </td>
                    <td>Role</td>
                    <td>Allocation</td>
                </tr>

                </thead>
                <tbody>
                    {items}
                </tbody>
            </table>

                <hr className="fade-hr"></hr>
                <p className="pagination">
                    <span  onClick={this.onGoToFirstPageButtonClick.bind(this)}>
                        First
                    </span>
                    <span className=" glyphicon glyphicon-circle-arrow-left" onClick={this.onPreviousButtonClick.bind(this)}>
                    </span>
                    <span><b>{label}</b></span>
                    <span className=" glyphicon glyphicon-circle-arrow-right" onClick={this.onNextButtonClick.bind(this)}>

                    </span>
                    <span  onClick={this.onGoToLastPageButtonClick.bind(this)}>
                        Last
                    </span>
                </p>
                </div>
        )
    }
}

export default ProjectMembers;