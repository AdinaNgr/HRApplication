import config from '../helper';
import * as React from 'react'
import * as $ from 'jquery'
import EmployeeItem from './EmployeeItem.jsx'
import Form from './Form.jsx';
import Accessors from '../../context/Accessors';
import Context from '../../context/Context';
import MyController from './Controller/Controller'
import ViewDetailsForm from './ViewDetailsForm'
import '../../assets/less/index.less'

export default class Employees extends React.Component{

    constructor(){
        super();
    }

    mountingComponent(props){
        const departmentId = props.routeParams['departmentId'];

        this.setState({
            formToggle:false,
            departmentId: departmentId,
            currentPage: 1,
            jobTypeIndex: null,
            positionIndex: null,
            allocationIndex: null,
            search: null
        });
        this.subscription = Context.subscribe(this.onContextChange.bind(this));

	    Context.cursor.set("items",[]);
        Context.cursor.set("totalNumberOfItems", -1);
        this.setJobTypeDropdownItems();
        this.setPositionDropdownItems();
        MyController.getTotalNumberOfEmployees(departmentId);
        MyController.getAllEmployees(departmentId, 1, null,  null, null, null);
    }

    componentWillMount(){
        this.mountingComponent(this.props);
    }

    componentWillReceiveProps(props){
        const departmentId = props.routeParams['departmentId'];
        Context.cursor.set("items",[]);
        Context.cursor.set("totalNumberOfItems", -1);

        MyController.getTotalNumberOfEmployees(departmentId);
        MyController.getAllEmployees(departmentId, 1, null,  null, null, null);
    }

    componentWillUnmount(){
        this.subscription.dispose();
    }

    onContextChange(cursor){
        console.log('employees:', cursor.get('items'));
        this.setState({
            formToggle: false,
            employees: cursor.get('items'),
            totalNumberOfItems: cursor.get('totalNumberOfItems')
        });
    }

    onAddButtonClick(){
        Context.cursor.set('model',null);
        this.setState({
            formToggle: true
        });
    }

    onViewDetailsButtonClick(employee){
        console.log("View details clicked! ", employee);
        Context.cursor.set('model', employee);

        this.setState({
            formToggle: true,
            buttonClicked: "viewDetails"
        })
    }

    onEditButtonClick(employee){
        console.log("Edit clicked!");
        //MyController.Edit(employee);
        Context.cursor.set('model', employee)
        this.setState({
            formToggle: true,
            buttonClicked: "edit"
        })
    }

    onDeleteButtonClick(element){
        MyController.Delete(element);
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
            MyController.getAllEmployees(this.state.departmentId, newCurrentpage, this.state.search, this.state.jobTypeIndex, this.state.positionIndex, this.state.allocationIndex);
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
            MyController.getAllEmployees(this.state.departmentId, newCurrentpage, this.state.search, this.state.jobTypeIndex, this.state.positionIndex, this.state.allocationIndex);
        }
    }

    onGoToFirstPageButtonClick(){
        this.setState({
            currentPage: 1
        })
        MyController.getAllEmployees(this.state.departmentId, 1, this.state.search, this.state.jobTypeIndex, this.state.positionIndex, this.state.allocationIndex);
    }

    onGoToLastPageButtonClick(){
        let numberOfPages = Math.ceil((this.state.totalNumberOfItems)/5);
        this.setState({
            currentPage: numberOfPages
        });
        MyController.getAllEmployees(this.state.departmentId, numberOfPages, this.state.search, this.state.jobTypeIndex, this.state.positionIndex, this.state.allocationIndex);
    }

    setJobTypeDropdownItems(){
        $.ajax({
            method: 'GET',
            url: config.base + "/employee/getJobTypes",
            async: false,
            success: function(data){
                console.log('here');
                this.setState({
                    jobTypeDropdownItems: data
                })
            }.bind(this)
        });
    }
    setPositionDropdownItems(){
        $.ajax({
            method:'GET',
            url: config.base + "/employee/getPositions",
            async: false,
            success: function(data){
                this.setState({
                    positionDropdownItems: data
                })
            }.bind(this)
        })
    }

    filterByJobType(){
        var select = document.getElementById('jobTypeDropdown');
        var jobTypeIndex = select.options[select.selectedIndex].value;
        var positionIndex = this.state.positionIndex;
        this.setState({
            jobTypeIndex: jobTypeIndex,
            positionIndex: positionIndex,
            allocationIndex: this.state.allocationIndex,
            search: this.state.search
        })
        MyController.getAllEmployees(this.state.departmentId, this.state.currentPage, this.state.search, jobTypeIndex, positionIndex, this.state.allocationIndex)
    }
    filterByPosition(){
        var select = document.getElementById('positionDropdown');
        var positionIndex = select.options[select.selectedIndex].value;
        var jobTypeIndex = this.state.jobTypeIndex;
        this.setState({
            jobTypeIndex: jobTypeIndex,
            positionIndex: positionIndex,
            allocationIndex: this.state.allocationIndex,
            search: this.state.search
        })
        MyController.getAllEmployees(this.state.departmentId, this.state.currentPage, this.state.search, jobTypeIndex, positionIndex, this.state.allocationIndex)

    }
    filterByAllocation(){

        var select = document.getElementById('allocationDropdown');
        var allocationIndex = select.options[select.selectedIndex].value;
        console.log('all index', allocationIndex);
        this.setState({
            jobTypeIndex: this.state.jobTypeIndex,
            positionIndex: this.state.positionIndex,
            allocationIndex: allocationIndex,
            search: this.state.search
        })
        MyController.getAllEmployees(this.state.departmentId, this.state.currentPage, this.state.search, this.state.jobTypeIndex, this.state.positionIndex, allocationIndex)
    }

    searchByName(){
        let name = this.refs.inputName.value;
        console.log('search : ', name);
        this.setState({
            jobTypeIndex: this.state.jobTypeIndex,
            positionIndex: this.state.positionIndex,
            allocationIndex: this.state.allocationIndex,
            search: name
        })
        MyController.getAllEmployees(this.state.departmentId, this.state.currentPage, name, this.state.jobTypeIndex, this.state.positionIndex, this.state.allocationIndex)

    }
    render(){

        const totalNumberOfDepartments = this.state.totalNumberOfItems;
        const numberOfPages = (totalNumberOfDepartments == 0) ? 1 : Math.ceil(totalNumberOfDepartments/5);
        const currentPage = this.state.currentPage;
        const label = currentPage + "/" + numberOfPages;

        let jobTypeDropdownItems = this.state.jobTypeDropdownItems.map( (element, index) => {
            return (<option value={element.Index} key = {element.Index} > {element.Description} </option>)
        });
         let positionDropdownItems = this.state.positionDropdownItems.map( (element, index) => {
             return (<option value={element.Index} key = {element.Index} > {element.Description} </option>)
         });


        console.log('In Employees@!@@');
        let modal = "";
        if(this.state.formToggle){
            if(Accessors.model(Context.cursor)){
                if (this.state.buttonClicked === "viewDetails") {
                    modal = <ViewDetailsForm onCancelClick={this.toggleModal.bind(this)}
                                             Title="View Details"/>;
                } else {
                    if (this.state.buttonClicked === "edit") {
                        modal = <Form onCancelClick={this.toggleModal.bind(this)}
                                      FormAction={() => {MyController.Edit(this.state.departmentId, currentPage, this.state.search, this.state.jobTypeIndex, this.state.positionIndex, this.state.allocationIndex)}}
                                      Title="Edit Employee"/>;
                    }
                }
            }else{
                modal=<Form onCancelClick={this.toggleModal.bind(this)}
                            FormAction={() => {MyController.Add(this.state.departmentId, currentPage, this.state.search, this.state.jobTypeIndex, this.state.positionIndex, this.state.allocationIndex)}}
                            Title="Add Employee"/>;
            }
        }
        const items = this.state.employees.map( (employee, index) => {
            return (
                <EmployeeItem
                    node = {employee}
                    key = {index}
                    Link = {"department/members/" + employee.Id}
                    onViewDetails = {this.onViewDetailsButtonClick.bind(this, employee)}
                    onEdit = {this.onEditButtonClick.bind(this, employee)}
                    onDelete = {this.onDeleteButtonClick.bind(this, employee)}
                    />
            )
        });

        return (
            <div>

                {modal}

                <p className="table-name">Employees </p>
                <div className=" rectangle custom-rectangle-department">
                    <div className="glyphicon glyphicon-plus-sign custom-add-icon"
                         onClick={this.onAddButtonClick.bind(this)}>
                        <span className="add-span" onClick={this.onAddButtonClick.bind(this)}>Add Employee</span>
                    </div>
                </div>
                    <div className="input-group input-group-xs col-md-4">
                        <div className="input-group-btn ">
                            <button type="button" className="btn input-search-btn-search">Search by name</button>
                        </div>
                        <input type="text"  ref="inputName" className="form-control" placeholder="Search..." onChange={this.searchByName.bind(this)} >
                        </input>
                    </div>

                <p>
                <div className="employee-dropdowns">

                    <select id='jobTypeDropdown' className="selectpicker" onChange={this.filterByJobType.bind(this)}>
                        <option selected>-- Job Type --</option>

                            {jobTypeDropdownItems}

                   </select>

                    <select id='positionDropdown' className="selectpicker" onChange={this.filterByPosition.bind(this)}>
                        <option selected>-- Position --</option>

                        {positionDropdownItems}

                    </select>

                    <select id='allocationDropdown' className="selectpicker" onChange={this.filterByAllocation.bind(this)}>
                        <option selected>-- Allocation --</option>

                        <option value={0} key = {0} > {"Not Allocated"} </option>
                        <option value={10} key = {10} > {10} </option>
                        <option value={20} key = {20} > {20} </option>
                        <option value={30} key = {30} > {30} </option>
                        <option value={40} key = {40} > {40} </option>
                        <option value={50} key = {50} > {50} </option>
                        <option value={60} key = {60} > {60} </option>
                        <option value={70} key = {70} > {70} </option>
                        <option value={80} key = {80} > {80} </option>
                        <option value={90} key = {90} > {90} </option>
                        <option value={100} key = {100} > {"Fully Allocated"} </option>

                    </select>
                </div>
                <table className="table">
                    <thead>
                    <tr>
                    <td> </td>
                    <td>Name </td>
                    <td>Position</td>
                    <td>Allocation</td>
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

                </p>
            </div>
        )
    }
}