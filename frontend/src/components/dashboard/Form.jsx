import * as React from 'react';
import ModalTemplate from '../ModalTemplate';
import Context from '../../context/Context';
import Accessors from '../../context/Accessors';
import config from '../helper';

export default class Form extends React.Component{
    constructor(){
        super();
        
    }
    
    onImageLoad(){
        this.setState({
            Image:null
        })
    }

    onImageLoad(){
       var value=document.querySelector('input[type=file]').files[0];

        var reader=new FileReader();
        var image;
        var that = this;
        reader.onload=function(event){
            image=this.result;
            that.setState({ Image: image });
            
            console.log("Finished Loading Image");
        }

        reader.readAsDataURL(value);

        let model= Context.cursor.get("model");
        if(!model){
            model={}
        };

        model.Image=image;
        Context.cursor.set("model",model);
    }

    onStoreClick(){
        let model=Context.cursor.get("model");

        if(!model){
            model={};
        }

        let name=this.refs.inputName.value;
        let addr=this.refs.inputAddress.value;
        let phone=this.refs.inputPhone.value;
        let image=this.state.Image;

        model.Name=(name)?name:model.Name;
        model.Address=(addr)?addr:model.Address;
        model.Phone=(phone)?phone:model.Phone;
        model.Image=(image)?image:model.Image;

        Context.cursor.set("model", model);

        this.props.FormAction();
        
    }
    render(){

        const model=Context.cursor.get('model');


        const name=(model)? model.Name : "Name";
        const addr=(model)? model.Address : "Address";
        const phone=(model)? model.Phone : "Phone";

        return(

            <ModalTemplate onCancelClick={this.props.onCancelClick}
                           onStoreClick={this.onStoreClick.bind(this)}
                           Title={this.props.Title}>
                    <div className="form-group">
                        <label htmlFor="inputName" className="col-sm-2 control-label"> Name *</label>
                        <div className="col-sm-10">
                            <input type="text" 
                                className="form-control" 
                                ref="inputName" 
                                placeholder={name}>
                            </input>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="inputAddress" className="col-sm-2 control-label"> Address *</label>
                        <div className="col-sm-10">
                            <input  type="text" 
                                    className="form-control" 
                                    ref="inputAddress" 
                                    placeholder={addr}>
                            </input>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="inputPhone" className="col-sm-2 control-label"> Phone *</label>
                        <div className="col-sm-10">
                            <input type="text" 
                                className="form-control" 
                                ref="inputPhone" 
                                placeholder={phone}>
                            </input>
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="inputImage" className="col-sm-2 control-label"> Image </label>
                    <div className="col-sm-10">
                        <input type="file" 
                               ref="inputImage" 
                               onChange={this.onImageLoad.bind(this)}/>
                        </div>
                    </div>

            </ModalTemplate>
        )
    }
}