import React from 'react';
import ModalTemplate from '../../ModalTemplate';
import Context from'../../../context/Context';
import Validator from '../../validator/ProjectValidator'
import config from '../../helper';

export default class EditAllocationForm extends React.Component{

    constructor(){
        super();
    }
    componentWillMount(){
        this.subscription = Context.subscribe(this.onContextChange.bind(this));
        this.setState({
            AllocationVR: {valid: false, message: ""},
        })
    }
    onContextChange(newGlobalCursor){
        this.setState({
            model: newGlobalCursor.get('model'),
            projectAllocation: newGlobalCursor.get('model') && newGlobalCursor.get('model').Allocation || ""
        })
    }

    onAllocationChange() {

        var employee = null;
        $.ajax({
            method: 'GET',
            url: config.base + 'employee/getById/' + this.state.model.Id,
            async: false,
            success: function(data){
                employee = data
            }.bind(this)
        });

        var result = Validator.ValidateAllocation(this.refs.inputAllocation.value, employee.RemainingAllocation);

        if(result.valid){
            this.setState({
                model: this.state.model,
                projectAllocation: this.refs.inputAllocation.value,
                AllocationVR: result
            });
        }
        else{
            this.setState({
                model: this.state.model,
                projectAllocation: this.refs.inputAllocation.value,
                AllocationVR: result
            })
        }
    }
    onStoreClick(){
        if(this.state.AllocationVR.valid){
            let model = Context.cursor.get('model');

            if(!model){
                model = {}
            }
            let allocation = this.refs.inputAllocation.value;
            if(allocation <= 100){
                model.Allocation = (allocation) ? allocation : model.Allocation;
                console.log('allocation', model.Allocation);
                Context.cursor.set("model", model);
                this.props.FormAction();
            }
            else{
                console.log('invalid input');
            }
        }
    }
    render(){
        let formIsValid = false;
        let AllocationValidationResult = ""
        if(this.state.AllocationVR.valid){
            formIsValid = true;
        }
        let projectAllocation = this.state.projectAllocation;
        if(!this.state.AllocationVR.valid){
            AllocationValidationResult=<span className="error-color">{this.state.AllocationVR.message}</span>
        }
        return(
            <ModalTemplate
                onCancelClick={this.props.onCancelClick}
                onStoreClick={this.onStoreClick.bind(this)}
                Title={this.props.Title}
                formIsValid={formIsValid}
            >
                <div className="form-group">
                    <label htmlFor="inputName" className="col-sm-2 control-label"> New Allocation </label>
                    <div className="col-sm-10">
                        <input type="text"
                               ref="inputAllocation"
                               className="form-control"
                               onChange={this.onAllocationChange.bind(this)}
                               value = {projectAllocation}
                        >
                        </input>
                        {AllocationValidationResult}
                    </div>
                </div>
            </ModalTemplate>
        )
    }
}