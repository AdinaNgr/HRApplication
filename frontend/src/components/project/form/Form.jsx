import React from 'react';
import ModalTemplate from '../../ModalTemplate';
import config from '../../helper';
import MyController from '../controller/Controller.js';
import Context from '../../../context/Context';
import Validator from '../../validator/ProjectValidator';


export default class Form extends React.Component {
    constructor(){
        super();
    }

    componentWillMount()
    {
        this.setState({
            NameValidationResult:{valid: false, message: ""},
            DurationValidationResult:{valid: false, message: ""}
        });
    }

    onChangeName(){
        var result = Validator.ValidateName(this.refs.inputName.value);
        this.updateState(result, null);
    }
    onChangeDuration(){

        var result = Validator.ValidateDuration(this.refs.inputDuration.value);
        this.updateState(null, result);
    }

    updateState(nameValidationResult, durationValidationResult){
        this.setState({
            NameValidationResult : (nameValidationResult)?   nameValidationResult:     this.state.NameValidationResult,
            DurationValidationResult: (durationValidationResult) ? durationValidationResult: this.state.DurationValidationResult
        });
    }
    onStoreClick()
    {
        if(this.state.NameValidationResult.valid && this.state.DurationValidationResult.valid)
        {
            let model = Context.cursor.get('model');

            if(!model){
                model = {}
            }
            this.onChangeDuration();
            this.onChangeName();

            var select = document.getElementById('dropdown');
            var periodOfTime = select.options[select.selectedIndex].value;
            let name = this.refs.inputName.value;
            let duration = this.refs.inputDuration.value;
            duration += " ";
            duration += periodOfTime;
            model.Name = (name) ? name : model.Name;
            model.Duration = (duration) ? duration : model.Duration;
            Context.cursor.set("model", model);

            this.props.FormAction();
        }
    }
    render(){

        let formIsValid=false;
        if(this.state.NameValidationResult.valid && this.state.DurationValidationResult.valid){
            formIsValid=true;
        }
        let nameValidationResult = "";
        let durationValidationResult = "";

        if(!this.state.NameValidationResult.valid ){
            nameValidationResult=<span className="error-color">{this.state.NameValidationResult.message}</span>;
        }

        if(!this.state.DurationValidationResult.valid){
            durationValidationResult=<span className="error-color">{this.state.DurationValidationResult.message}</span>;
        }

        console.log('form is valid? ', formIsValid);
        console.log('name validation: ', this.state.NameValidationResult);
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
                               placeholder="Name"
                               onKeyUp={this.onChangeName.bind(this)}>
                        </input>

                        {nameValidationResult}
                    </div>
                </div>

                <div className="form-group">
                   <label htmlFor="inputDuration" className="col-sm-2 control-label"> Duration</label>
                    <select id="dropdown" className="selectpicker">
                        <option >weeks</option>
                        <option>months</option>
                        <option>years</option>
                    </select>

                    <div className="col-sm-3">
                        <input type="number" className="form-control"
                               ref="inputDuration"
                               placeholder="Number"
                               onChange={this.onChangeDuration.bind(this)}>
                        </input>
                        {durationValidationResult}
                    </div>
                </div>

            </ModalTemplate>
        )
    }

}