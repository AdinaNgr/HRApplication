import * as React from 'react';
import ModalTemplate from '../ModalTemplate';
import Context from '../../context/Context';
import Accessors from '../../context/Accessors';
import config from '../helper';
import Validator from '../validator/OfficeValidator';
import '../../assets/less/index.less'

export default class OfficeForm extends React.Component{
    constructor(){
        super();
    }
    
    componentWillMount(){
        let model=Context.cursor.get('model');

        var initialValidation=true;
        
        if(!model){
            model={};
            model.Image="";
            initialValidation=false;
        }

        this.setState({
            Model:model,
            NameValidationResult:{valid: initialValidation, message: ""},
            PhoneValidationResult:{valid: initialValidation, message: ""},
            AddressValidationResult:{valid: initialValidation, message: ""},
            ImageValidationResult:{valid: initialValidation, message: ""}
        })
    }

    onImageLoad(){
       var value=document.querySelector('input[type=file]').files[0];

        var reader=new FileReader();
        var image;
        var that = this;
        reader.onload=function(event){
            image=this.result;

            var result=Validator.ValidateImage(image); 

            var model=that.state.Model;
            model.Image=image;
            
            that.updateState(model, null, null, null, result);
            console.log("Finished Loading Image");
        }

        reader.readAsDataURL(value);
    }

    checkAll(){
        this.onChangeName();
        this.onChangeAddress();
        this.onChangePhone();
    }
    onStoreClick(){

        this.checkAll();

        if(     this.state.NameValidationResult.valid
            &&  this.state.AddressValidationResult.valid
            &&  this.state.PhoneValidationResult.valid  
            &&  this.state.ImageValidationResult.valid)
        {
            Context.cursor.set('model', this.state.Model);
            this.props.FormAction();
        }
    }

    onChangeName(){
        var result=Validator.ValidateName(this.refs.inputName.value);

        this.updateState(null, result, null, null, null);
    }
    onChangeAddress(){
        var result=Validator.ValidateAddress(this.refs.inputAddress.value);

        this.updateState(null, null, result, null, null);
    }
    onChangePhone(){
        var result=Validator.ValidatePhone(this.refs.inputPhone.value);

        this.updateState(null, null, null, result, null);
    }

    updateModel(){
        let name=this.refs.inputName.value;
        let addr=this.refs.inputAddress.value;
        let phone=this.refs.inputPhone.value;
        let image=this.state.Model.Image;
        let model={
            Id:this.state.Model.Id,
            Name:name,
            Address:addr,
            Phone:phone,
            Image:image
        }

        // console.log("Old ", oldModel)
        // console.log("New ", model)

        this.updateState(model, null, null, null, null);
    }
    updateState(model, nameVR, phoneVR, addrVR, imgVR){
        this.setState({
            Model:                      (model)?    model:        this.state.Model,
            NameValidationResult:       (nameVR)?   nameVR:     this.state.NameValidationResult,
            PhoneValidationResult:      (phoneVR)?  phoneVR:    this.state.PhoneValidationResult,
            AddressValidationResult:    (addrVR)?   addrVR:     this.state.AddressValidationResult,
            ImageValidationResult:      (imgVR)?    imgVR:      this.state.ImageValidationResult
        });
    }

    render(){
        
        
        const model=this.state.Model;
        //console.log("MODEL: ", model);


        let name=(model.Name)? model.Name : "";
        let addr=(model.Address)? model.Address : "";
        let phone=(model.Phone)? model.Phone : "";
        let img=(model.Image)? model.Image: null;

        let nameValidationResult="";
        let addrValidationResult="";
        let phoneValidationResult="";
        let imgValidationResult="";
        

        if(!this.state.NameValidationResult.valid){
            nameValidationResult=<span className="error-color">{this.state.NameValidationResult.message}</span>;
        }

        if(!this.state.AddressValidationResult.valid){
            addrValidationResult=<span className="error-color">{this.state.AddressValidationResult.message}</span>;
        }
        if(!this.state.PhoneValidationResult.valid){
            phoneValidationResult=<span className="error-color">{this.state.PhoneValidationResult.message}</span>;
        }
        if(!this.state.ImageValidationResult.valid){
            imgValidationResult=<span className="error-color">{this.state.ImageValidationResult.message}</span>;
        }

        var formIsValid=false;
        if(    this.state.NameValidationResult.valid 
            && this.state.AddressValidationResult.valid
            && this.state.PhoneValidationResult.valid
            && this.state.ImageValidationResult.valid){
            formIsValid=true;

        }
        return(
            <ModalTemplate onCancelClick={this.props.onCancelClick}
                           onStoreClick={this.onStoreClick.bind(this)}
                           Title={this.props.Title}
                           formIsValid={formIsValid}  
                           >

                    <div className="form-group">
                        <label htmlFor="inputName" className="col-sm-2 control-label"> Name</label>
                        <div className="col-sm-10">
                            <input type="text" 
                                className="form-control" 
                                ref="inputName" 
                                value={name}
                                onChange={this.updateModel.bind(this)}
                                onKeyUp={this.onChangeName.bind(this)}>
                            </input>
                            {nameValidationResult}
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="inputAddress" className="col-sm-2 control-label"> Address</label>
                        <div className="col-sm-10">
                            <input  type="text" 
                                    className="form-control" 
                                    ref="inputAddress" 
                                    value={addr}
                                    onChange={this.updateModel.bind(this)}
                                    onKeyUp={this.onChangeAddress.bind(this)}>
                            </input>
                            {phoneValidationResult}
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="inputPhone" className="col-sm-2 control-label"> Phone </label>
                        <div className="col-sm-10">
                            <input type="text" 
                                className="form-control" 
                                ref="inputPhone" 
                                value={phone}
                                onChange={this.updateModel.bind(this)}
                                onKeyUp={this.onChangePhone.bind(this)}>
                            </input>
                            {addrValidationResult}
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="inputImage" className="col-sm-2 control-label"> Image </label>
                        <div className="col-sm-10">
                            <input
                                type="file" 
                                ref="inputImage" 
                                accept="image/*" data-type='image'
                                onChange={this.onImageLoad.bind(this)}/>
                        </div>
                        {imgValidationResult}
                    </div>
                    
            </ModalTemplate>
        )
    }
}