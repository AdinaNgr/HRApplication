import * as React from 'react';
import Department from './DepartmentItem';
import Context from '../../context/Context';
import Accessors from '../../context/Accessors';
import Controller from './DepartmentController';
import OfficeController from '../dashboard/OfficeController';
import Form from './Form';
import '../../assets/less/index.less';
import classnames from 'classnames';

export default class Departments extends React.Component{
    constructor(){
        super();
    }

    mountComponent(props){
        console.log('here dep')
        const officeId = props.routeParams['officeId'];

        this.setState({
            formToggle:false,
            officeId: officeId,
            currentPage: 1
        });

        this.subscription=Context.subscribe(this.onContextChange.bind(this));

        Context.cursor.set("items",[]);
        Context.cursor.set("totalNumberOfItems", -1);

        Controller.getDepartments(officeId, 1);
        Controller.getTotalNumberOfDepartments(officeId);

        OfficeController.GetOfficeById(officeId);

        //console.log(Context.cursor.get('currentOffice'))
        const thisOffice=Context.cursor.get('currentOffice').Name;
        //console.log({thisOffice});
    }

    componentWillMount(){
        this.mountComponent(this.props);
    }

    componentWillReceiveProps(props){
        const officeId = props.routeParams['officeId'];
        Context.cursor.set("items",[]);
        Context.cursor.set("totalNumberOfItems", -1);

        Controller.getDepartments(officeId, 1);
        Controller.getTotalNumberOfDepartments(officeId);

        OfficeController.GetOfficeById(officeId);
    }

    componentWillUnmount(){
        console.log('unmount dep')
        this.subscription.dispose();
    }


    onContextChange(cursor){
        //console.log("Context has changed!");
        this.setState({
            formToggle: false,
            items: cursor.get('items'),
            totalNumberOfItems: cursor.get('totalNumberOfItems'),
            officeName: cursor.get('currentOffice')
        });
    }

    onAddButtonClick(){
        //console.log("Add button pressed!");

        Context.cursor.set('model',null);
        this.setState({
            formToggle: true
        });
    }

    onEditButtonClick(index){
        //console.log("Edit button pressed!");

        const department = this.state.items[index];
        Context.cursor.set("model", department);

        this.setState({
            formToggle: true
        });
    }

    toggleModal(){
        this.setState({
            formToggle: false
        })
    }

    onPreviousButtonClick(){
        let currentPage = this.state.currentPage;
        let newCurrentpage = currentPage - 1;
        if (currentPage > 1){
            this.setState({
                currentPage: newCurrentpage
            })
            Controller.getDepartments(this.state.officeId, newCurrentpage);
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
            Controller.getDepartments(this.state.officeId, newCurrentpage);
        }
    }

    onGoToFirstPageButtonClick(){
        this.setState({
            currentPage: 1
        })
        Controller.getDepartments(this.state.officeId, 1);
    }

    onGoToLastPageButtonClick(){
        let numberOfPages = Math.ceil((this.state.totalNumberOfItems)/5);
        this.setState({
            currentPage: numberOfPages
        });
        Controller.getDepartments(this.state.officeId, numberOfPages);
    }

    render(){
        
        const totalNumberOfDepartments = this.state.totalNumberOfItems;

        const numberOfPages = (totalNumberOfDepartments == 0) ? 1 : Math.ceil(totalNumberOfDepartments/5);
        //console.log('nrOfPages', totalNumberOfDepartments);

        const currentPage = this.state.currentPage;

        //console.log("CurrentPage: ", numberOfPages);
        //console.log("Totaaaal: ", totalNumberOfDepartments, numberOfPages);
        //console.log("Totaaaal: ", totalNumberOfDepartments, numberOfPages);

        let form="";
        if(this.state.formToggle){
            if(Accessors.model(Context.cursor)){
                form=<Form onCancelClick={this.toggleModal.bind(this)}
                           FormAction={() => {Controller.Update(this.state.officeId, currentPage)}}
                           Title="Edit Department"
                           officeId={this.state.officeId}/>;
            }else{
                form=<Form onCancelClick={this.toggleModal.bind(this)}
                           FormAction={() => {Controller.Add(this.state.officeId, currentPage)}}
                           Title="Add Department"
                           officeId={this.state.officeId}/>;
            }
        }

        const items = this.state.items.map( (department, index) => {
            return (
                <Department
                    element={department}
                    //departmentId= {department.Id}
                    //linkToEmployees={"department/members/" + department.Id}
                    //linkToProjects={"department/projects/" + department.Id}
                    key={index}
                    onEditButtonClick={this.onEditButtonClick.bind(this, index)}
                />
            )
        })

        const officeName=this.state.officeName.Name;
        //console.log("aaaaaaaaaaaaaaaaaaaaa", officeName);
        const label = currentPage + "/" + numberOfPages;

        return (
            <div>
                {form}

                <p className="table-name">Departments - {officeName} Office </p>
                <div className=" rectangle custom-rectangle-department">
                    <div className="glyphicon glyphicon-plus-sign custom-add-icon"
                         onClick={this.onAddButtonClick.bind(this)}>
                        <span className="add-span" onClick={this.onAddButtonClick.bind(this)}>Add Department</span>
                    </div>
                </div>


                <table className="table table-stripped ">
                    <thead>
                    <tr>
                        <td> </td>
                        <td>Department</td>
                        <td>Department Manager</td>
                        <td>Employees</td>
                        <td>Projects</td>
                        <td>Views</td>
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