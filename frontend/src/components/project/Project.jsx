import * as React from 'react'
import ProjectItem from './ProjectItem.jsx'
import Form from './form/Form.jsx';
import Accessors from '../../context/Accessors';
import Context from '../../context/Context';
import MyController from './controller/Controller'
import EditForm from './form/EditForm';

import '../../assets/less/index.less';
export default class Project extends React.Component{
    constructor(){
        super();
    }
    componentWillMount(){
        const departmentId = this.props.routeParams['departmentId'];

        this.setState({
            formToggle:false,
            currentPage: 1,
            departmentId: departmentId
        });
        this.subscription = Context.subscribe(this.onContextChange.bind(this));

        Context.cursor.set("items",[]);
        MyController.GetAllProjects(departmentId, 1);
        MyController.GetNumberOfProjects(departmentId);
    }

    componentWillUnmount(){
        this.subscription.dispose();
    }

    onContextChange(cursor){
        this.setState({
            items: Accessors.items(Context.cursor),
            formToggle: false,
            totalNumberOfItems: Accessors.totalNumberOfItems(Context.cursor)
        });
    }

    onAddButtonClick(){
        Context.cursor.set('model',null);
        this.setState({
            formToggle: true
        });
    }

    onEditButtonClick(project){
        Context.cursor.set('model', project)
        this.setState({
            formToggle: true
        });
    }

    toggleModal(){
        this.setState({
            formToggle: false
        });
        console.log('toggle modal?', this.state.formToggle);
    }

    onPreviousButtonClick(){
        let currentPage = this.state.currentPage;
        let newCurrentpage = currentPage - 1;
        if (currentPage > 1){
            this.setState({
                currentPage: newCurrentpage
            })
            MyController.GetAllProjects(this.state.departmentId, newCurrentpage);
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
            MyController.GetAllProjects(this.state.departmentId, newCurrentpage);
        }
    }
    onGoToFirstPageButtonClick(){
        this.setState({
            currentPage: 1
        })
        MyController.GetAllProjects(this.state.departmentId, 1);
    }

    onGoToLastPageButtonClick(){
        let numberOfPages = Math.ceil((this.state.totalNumberOfItems)/5);
        this.setState({
            currentPage: numberOfPages
        });
        MyController.GetAllProjects(this.state.departmentId, numberOfPages);
    }
    render(){

        const totalNumberOfItems = this.state.totalNumberOfItems;
        const numberOfPages = (totalNumberOfItems == 0) ? 1 : Math.ceil(totalNumberOfItems/5);
        const currentPage = this.state.currentPage;
        let modal = "";
        const label = currentPage + "/" + numberOfPages;

        if(this.state.formToggle) {
            if (Accessors.model(Context.cursor)) {
                modal = <EditForm onCancelClick={this.toggleModal.bind(this)}
                                  FormAction={MyController.Update.bind(this, this.state.departmentId, currentPage)}
                                  Title="Edit Project"/>;
            }
            else {
                modal = <Form onCancelClick={this.toggleModal.bind(this)}
                              FormAction={MyController.Add.bind(this, this.state.departmentId, currentPage)}
                              Title="Add Project"/>;
            }
        }
        const items = this.state.items.map( (project, index) => {
            return (
                <ProjectItem
                    node = {project}
                    key = {index}
                    Link = {"project/members/" + project.Id}
                    onEdit = {this.onEditButtonClick.bind(this, project)}
                    onDelete = {MyController.Delete.bind(this, project, this.state.departmentId, currentPage)}
                    />
            )
        });

        return (
            <div>
                {modal}
                <p className="table-name">Projects</p>
                <div className=" rectangle custom-rectangle-project">
                    <div className="glyphicon glyphicon-plus-sign custom-add-icon"
                         onClick={this.onAddButtonClick.bind(this)}>
                        <span className="add-span" onClick={this.onAddButtonClick.bind(this)}>Add Project</span>
                    </div>
                </div>
                
                <table className="table table-stripped">
                    <thead>
                <tr>
                    <td> </td>
                    <td> Project Name </td>
                    <td> Team members </td>
                    <td> Duration </td>
                    <td> Status</td>
                    <td> Views</td>
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