import React from 'react';
import ModalTemplate from '../../ModalTemplate';
import config from '../../helper';
import MyController from '../controller/Controller.js';
import Accessors from '../../../context/Accessors';
import Context from '../../../context/Context';
import Validator from '../../validator/ProjectValidator'
export default class EditForm extends React.Component {
    constructor(){
        super();
    }
    componentWillMount(){
        $.ajax({
            method:'GET',
            url: config.base + "/project/statusDescriptions",
            async: false,
            success: function(data){
                this.setState({
                 dropdownItems: data,
                    NameVR: {valid: true, message:""},
                    DurationVR: {valid: true, message:""}

                })
            }.bind(this)
        });
        this.subscription=Context.subscribe(this.onContextChange.bind(this));
    }

    componentWillUnmount(){
        this.subscription.dispose();
    }
    onStoreClick(){
        if(this.state.DurationVR.valid && this.state.NameVR){
            let model = Context.cursor.get('model');

            if(!model){
                model = {}
            }
            let name = this.refs.inputName.value;
            let duration = this.refs.inputDuration.value;
            var select = document.getElementById('dropdown');
            var status = select.options[select.selectedIndex].index;

            console.log('status selected:', status);

            model.Name = (name) ? name : model.Name;
            model.Duration = (duration) ? duration : model.Duration;
            model.Status = (status) ? status : model.Status;

            Context.cursor.set("model", model);
            this.props.FormAction();
        }
    }

    onContextChange(newGlobalCursor){
        this.setState({
            model: newGlobalCursor.get('model'),
            projectName: newGlobalCursor.get('model') && newGlobalCursor.get('model').Name || "",
            projectDuration: newGlobalCursor.get('model') && newGlobalCursor.get('model')['Duration'] || ""
        });
    }

    onNameChange(){
        let nameInput = this.refs.inputName.value;
        if (!nameInput.replace(/\s/g, '').length) {
            nameInput = '';
        }
        var result = Validator.ValidateName(nameInput);
        console.log('VALID?!', result.valid);
        this.updateState(result, null);
        this.setState({
            projectName: nameInput
        });
    }

    onDurationChange(){
        var result = Validator.ValidateDuration(this.refs.inputDuration.value);
        this.updateState(null, result);
        this.setState({
            model: this.state.model,
            projectDuration: this.refs.inputDuration.value
        })

    }
    onStatusChange(){
       this.updateState(this.state.NameVR,this.state.DurationVR);
    }

    updateState(nameVR, durationVR){
        this.setState({
            NameVR: (nameVR) ? nameVR: this.state.NameVR,
            DurationVR: (durationVR) ? durationVR: this.state.DurationVR
        })
    }

    render(){
        let formIsValid = "";
        let nameVR = "";
        let durationVR = "";

        if(this.state.DurationVR.valid && this.state.NameVR.valid){
            formIsValid = true;
            console.log('form is valid?!?!?1', formIsValid);
        }

        if(!this.state.NameVR.valid){
            nameVR=<span className="error-color">{this.state.NameVR.message}</span>;
        }
        if(!this.state.DurationVR.valid){
            durationVR=<span className="error-color">{this.state.DurationVR.message}</span>
        }

        const projectName = this.state.projectName;
        const projectDuration = this.state.projectDuration;

        const items = this.state.dropdownItems.map( (status, index) => {
            return ( <option key={status.Index} >{status.Description}</option>
            )});

        const model = Accessors.model(Context.cursor);
        const name = model.Name;
        const duration = model.Duration;
        const status = model.Status;

        return(

            <ModalTemplate onCancelClick={this.props.onCancelClick}
                           onStoreClick={this.onStoreClick.bind(this)}
                           Title={this.props.Title}
                           Model={this.props.Model}
                           formIsValid={formIsValid}
                            >


                <div className="form-group">
                    <label htmlFor="inputName" className="col-sm-2 control-label"> Name</label>
                    <div className="col-sm-10">
                        <input type="text"
                               ref="inputName"
                               className="form-control"
                               onChange={this.onNameChange.bind(this)}
                               value={projectName}
                        >

                        </input>
                        {nameVR}
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="inputDuration" className="col-sm-2 control-label"> Duration</label>
                    <div className="col-sm-10">
                        <input type="text"
                               className="form-control"
                               ref="inputDuration"
                               onChange={this.onDurationChange.bind(this)}
                               value={projectDuration}
                        >

                        </input>
                        {durationVR}
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="inputStatus" className="col-sm-2 control-label"> Status</label>
                    <select id='dropdown' className="selectpicker" onChange={this.onStatusChange.bind(this)}>
                        {items}
                    </select>

                </div>
            </ModalTemplate>
        )
    }
}