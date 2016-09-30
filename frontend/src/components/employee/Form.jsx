import React from 'react';
import ModalTemplate from '../ModalTemplate';
import config from '../helper';
import MyController from './Controller/Controller.js';
import Context from '../../context/Context';
import Validator from '../validator/EmployeeValidator';
import '../../assets/less/index.less';

export default class Form extends React.Component {
    constructor() {
        super();
    }
    componentWillMount() {
        this.subscription = Context.subscribe(this.onContextChange.bind(this));

        this.setState({
            formToggle:false,
            jobTypeIndex: null,
            positionIndex: null,
            NameValidationResult:{valid: false, message: ""},
            AddressValidationResult:{valid: false, message: ""},
        })
        this.setJobTypeDropdownItems();
        this.setPositionDropdownItems();
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
        MyController.getAllEmployees(this.state.search, jobTypeIndex, positionIndex, this.state.allocationIndex)
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
        MyController.getAllEmployees(this.state.search, jobTypeIndex, positionIndex, this.state.allocationIndex)

    }

    componentDidMount(){

        $('#datepicker1').datepicker({});

    }

    onContextChange(newGlobalCursor) {
        console.log('MODEL', newGlobalCursor.get('model'))
        this.setState({
            model: newGlobalCursor.get('model'),
            employeeName: newGlobalCursor.get('model') && newGlobalCursor.get('model').Name || "",
            employeeAddress: newGlobalCursor.get('model') && newGlobalCursor.get('model').Address || "",
            employeeEmploymentDate: newGlobalCursor.get('model') && newGlobalCursor.get('model').EmploymentDate.toString() || ""
        })
    }

    componentWillUnmount() {
        this.subscription.dispose();
    }

    onModelChange() {
        this.setState({
            model: this.state.model,
            employeeName: this.refs.inputName.value,
            employeeAddress: this.refs.inputAddress.value,
            employeeEmploymentDate: this.refs.inputEmploymentDate.value,
            /*
            employeeJobType: this.refs.inputJobType.value,
            employeePosition: this.refs.inputPosition.value*/
        })
    }

    onStoreClick() {
        console.log('STORE');

         if(this.state.NameValidationResult.valid &&  this.state.AddressValidationResult.valid) {

            let currentModel = this.state.model;
            let modelToStore = {};

            if (currentModel) {
                modelToStore.Id = currentModel.Id;
            }

            var select = document.getElementById('jobTypeDropdown');
            var jobType = select.options[select.selectedIndex].index;

            console.log('job type: ', jobType);

            var selectPosition = document.getElementById('positionDropdown');
            var position = select.options[select.selectedIndex].index;

            console.log('pos type: ', position);

            modelToStore.Name = this.refs.inputName.value;
            modelToStore.Address = this.refs.inputAddress.value;
            modelToStore.EmploymentDate = this.refs.inputEmploymentDate.value;

            modelToStore.JobType = jobType;
            modelToStore.Position = position;
            modelToStore.DepartmentId = 1;



            console.log('MODEL props: ',   modelToStore.Name,  modelToStore.Address, modelToStore.EmploymentDate, modelToStore.JobType ,modelToStore.DepartmentId )


            Context.cursor.set('model', modelToStore);
            this.props.FormAction();
        }
    }




    onChangeName(){
        let employeeNameInput = this.refs.inputName.value;
        if (!employeeNameInput.replace(/\s/g, '').length) {
            employeeNameInput = '';
        }
        var result=Validator.ValidateName(employeeNameInput);
        this.updateState(result, null);
    }

    onChangeAddress(){
        var result=Validator.ValidateAddress(this.refs.inputAddress.value);
        this.updateState(null, result);
    }

    updateState(nameVR, addrVR) {
        this.setState({
            NameValidationResult: (nameVR) ? nameVR : this.state.NameValidationResult,
            AddressValidationResult: (addrVR) ? addrVR : this.state.AddressValidationResult
        });
    }

        render(){
            let nameValidationResult="";
            let addressValidationResult="";

            let jobTypeDropdownItems = this.state.jobTypeDropdownItems.map( (element, index) => {
                return (<option value={element.Index} key = {element.Index} > {element.Description} </option>)
            });
            let positionDropdownItems = this.state.positionDropdownItems.map( (element, index) => {
                return (<option value={element.Index} key = {element.Index} > {element.Description} </option>)
            });


            if(!this.state.NameValidationResult.valid){
                nameValidationResult=<span>{this.state.NameValidationResult.message}</span>;
            }

            if(!this.state.AddressValidationResult.valid){
                addressValidationResult=<span>{this.state.AddressValidationResult.message}</span>;
            }


            var formIsValid=false;
            if(this.state.NameValidationResult.valid && this.state.AddressValidationResult.valid)
            {
                    formIsValid = true;
            }

            const employeeName = this.state.employeeName;
            const employeeAddress = this.state.employeeAddress;
            const employeeEmploymentDate = this.state.employeeEmploymentDate;
            console.log('date', employeeEmploymentDate)
            const employeeJobType = this.state.employeeJobType;
            const employeePosition = this.state.employeePosition;

            return (

                <ModalTemplate onCancelClick={this.props.onCancelClick}
                               onStoreClick={this.onStoreClick.bind(this)}
                               Title={this.props.Title}
                               Model={this.props.Model}
                               formIsValid={formIsValid} >



                    <select id='jobTypeDropdown' className="selectpicker" >
                        <option selected>-- Job Type --</option>

                        {jobTypeDropdownItems}

                    </select>
                    <select id='positionDropdown' className="selectpicker" >
                        <option selected>-- Position --</option>

                        {positionDropdownItems}

                    </select>
                    <p></p>
                    <div className="form-group">
                        <label htmlFor="inputName" className="col-sm-2 control-label"> Name</label>
                        <div className="col-sm-10">
                            <input type="text" ref="inputName" className="form-control"
                                   onChange={this.onModelChange.bind(this)} value={employeeName} placeholder="Name"
                                   onKeyUp={this.onChangeName.bind(this)}
                            >
                            </input>
                            {nameValidationResult}
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="inputAddress" className="col-sm-2 control-label"> Address</label>
                        <div className="col-sm-10">
                            <input type="text" ref="inputAddress" className="form-control"
                                       onChange={this.onModelChange.bind(this)} value={employeeAddress}
                                       onKeyUp={this.onChangeAddress.bind(this)}
                                       placeholder="Address">
                            </input>
                            {addressValidationResult}
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-sm-2 control-label">Employment Date</label>
                        <div className="input-group date">
                            <div className="input-group-addon">
                                <i className="fa fa-calendar"></i>
                            </div>
                            <input ref = "inputEmploymentDate" type="text" className="form-control pull-right" id="datepicker1" value = {employeeEmploymentDate}></input>
                        </div>
                    </div>


                </ModalTemplate>
            )
    }
}


