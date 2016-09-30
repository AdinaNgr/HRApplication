import React from 'react';
import ModalTemplate from '../../ModalTemplate';
import config from '../../helper';
import Context from '../../../context/Context';
import Controller from '../controller/Controller';

const EmployeeItem = (props) => {
    return (
        <tr>
            <td>{props.element['Name']}</td>
            <td>{props.element['Department']}</td>
            <td>{props.element['Position']}</td>
            <td>{props.element['RemainingAllocation']}</td>
            <td> <input id={props.element['Id']} type="checkbox" onChange={props.onCheck}/></td>
        </tr>
    )
}

export default class AssignEmployeeForm extends React.Component{
    constructor(){
        super();
    }

    componentWillMount() {
        this.SetDepartmentDropdownItems();
        this.SetPositionDropdownItems();
        this.setState({
            departmentIndex: null,
            positionIndex: null,
            formIsValid: false,
            checkedItems: []

        });
        this.GetAllAvailableEmployees(null, null);
    }

    SetDepartmentDropdownItems(){
        $.ajax({
            method: 'GET',
            url: config.base + "/department/GetAll",
            async: false,
            success: function(data){
                console.log('here');
                this.setState({
                    dropdownItemsDepartments: data
                })
            }.bind(this)
        });
    }

    GetAllAvailableEmployees(indexDepartment, indexPosition){
        $.ajax({
            method: 'GET',
            url: config.base + "office/availableEmployees/"+ this.props.ProjectId + "/1/5/1" + "?department=" + indexDepartment +"&position="+ indexPosition,

            async: false,
            success: function(data){
                this.setState({
                    availableEmployees: data
                })
            }.bind(this)
        });
    }
    SetPositionDropdownItems(){
        $.ajax({
            method:'GET',
            url: config.base + "/employee/getPositions",
            async: false,
            success: function(data){
                this.setState({
                    dropdownItemsPosition: data
                })
            }.bind(this)
        });
    }

    FilterByDepartment() {
        var select = document.getElementById('dropdownDepartment');
        var departmentIndex = select.options[select.selectedIndex].value;
        var positionIndex = this.state.positionIndex;
        //console.log('index:', departmentIndex);
        this.setState({
            departmentIndex: departmentIndex,
            positionIndex: positionIndex
        });
        this.GetAllAvailableEmployees(departmentIndex, positionIndex)
    }

    FilterByPosition(e){
        var select = document.getElementById('dropdownPosition');
        var positionIndex = select.options[select.selectedIndex].value;
        var departmentIndex = this.state.departmentIndex;
        this.setState({
            departmentIndex: departmentIndex,
            positionIndex: positionIndex
        });
        this.GetAllAvailableEmployees(departmentIndex, positionIndex)
    }

    onCheck(employee) {
        let items = this.state.checkedItems;
        if (items.indexOf(employee) != -1) {
            items.splice(items.indexOf(employee), 1);
            this.setState({
                checkedItems: items
            })
            console.log('items: ', items);
        }
        else {
            items.push(employee);
            console.log('EMPLOYEE', employee);
            console.log('items: ', items);
            this.setState({
                checkedItems: items,
            })
        }
        if(this.state.checkedItems != []){
            this.setState({
                formIsValid: true
            })
        }
    }
    addAjaxCall(employee){
        console.log('employee', employee);
        console.log('projectId:', this.props.ProjectId)
        $.ajax({
            method: 'POST',
            url: config.base + "/project/addAssignment",
            async: false,
            data: {
                EmployeeId: employee.Id,
                ProjectId: this.props.ProjectId,
                Allocation : employee.RemainingAllocation
            },
            success: function(data){
                console.log('successfully added');
            }.bind(this)
        });
        }


    onStoreClick(){
        let items = this.state.checkedItems;
        console.log('ITEMS:', items);
        for(var i=0; i<items.length; i++) {
            this.addAjaxCall(items[i]);
            //console.log('var', items[i].Id);

        }
        Controller.GetProjectMembers(this.props.ProjectId, this.props.currentPage);
    }

    render(){
        const departmentIndex = this.state.departmentIndex;
        const positionIndex = this.state.positionIndex;

        const availableEmployees = this.state.availableEmployees.map( (employee, index) =>{
            return (
                <EmployeeItem
                    element = {employee}
                    key = {index}
                    onCheck = {this.onCheck.bind(this, employee)}
                />)
        });

        let itemsPosition = this.state.dropdownItemsPosition.map( (position, index) => {
            return (<option value={position.Index} key = {position.Index} > {position.Description}  </option>)
        });

        let itemsDepartment = this.state.dropdownItemsDepartments.map ( (department, index) => {
            return (<option value={department.Id} key = {department.Id} > {department.Name} </option>)
        });

        return(
            <ModalTemplate
                onCancelClick={this.props.onCancelClick}
                onStoreClick={this.onStoreClick.bind(this)}
                formIsValid={this.state.formIsValid}
            >
                <h3> Assign Employee </h3>
                <div className="form-group">
                    <label htmlFor="inputStatus" className="col-sm-2 control-label"> Filter by</label>

                    <select ref="dropdownPosition" id='dropdownPosition' className="selectpicker" onChange={this.FilterByPosition.bind(this)}>
                        <option data-hidden="true">--Position--</option>
                        {itemsPosition}
                    </select>

                    <select id='dropdownDepartment' className="selectpicker" onChange={this.FilterByDepartment.bind(this)}>
                        <option selected>-- Department --</option>
                        {itemsDepartment}
                    </select>


                    <div>
                    <table className="table table-stripped">
                    <tbody>
                    <tr>
                        <td>Name </td>
                        <td> Department </td>
                        <td> Position </td>
                        <td> Remaining Allocation</td>
                    </tr>
                        {availableEmployees}
                      </tbody>
                        </table>
                    </div>

                </div>

            </ModalTemplate>
        )}
}

