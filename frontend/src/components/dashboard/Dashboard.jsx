import * as React from 'react';
import Tile from './OfficeTile';
import config from '../helper';
import Context from '../../context/Context';
import Accessors from '../../context/Accessors';
import '../../assets/less/index.less';
import Controller from './OfficeController.jsx';

import Form from './OfficeForm';

export default class Dashboard extends React.Component{
    constructor(){
        super();
    }
    componentWillMount(){
        this.setState({
            formToggle:false
        });

        this.subscription=Context.subscribe(this.onContextChange.bind(this));

        Context.cursor.set("items",[]);
        Controller.GetAll();
        
    }

    componentWillUnmount(){
        this.subscription.dispose();
    }
    
    onContextChange(cursor){
        this.setState({
            formToggle: false
        });
    }

    onAddButtonClick(){
        Context.cursor.set('model',null);

        this.setState({
            formToggle: true
        });
    }
    onEditButtonClick(index){
        const office=Context.cursor.get('items')[index];
        Context.cursor.set("model", office);

        this.setState({
            formToggle: true
        });
    }

    toggleModal(){
        this.setState({formToggle: false})
    }

    render(){
        let form="";
        if(this.state.formToggle){
            if(Accessors.model(Context.cursor)){
                form=<Form onCancelClick={this.toggleModal.bind(this)}
                           FormAction={() => { Controller.Update() }}
                           Title="Edit Office"/>;
            }else{
                form=<Form onCancelClick={this.toggleModal.bind(this)}
                           FormAction={() => { Controller.Add() }}
                           Title="Add Office"/>;
            }
        }

        const items = Accessors.items(Context.cursor).map ( (office, index) => {
            return (
                <Tile
                    parentClass="bg-aqua"
                    name={office.Name}
                    phone={office.Phone}
                    address={office.Address}
                    link={"office/departments/"+office.Id}
                    icon={office.Image}
                    key={index}
                    index={index}
                    onEditButtonClick={this.onEditButtonClick.bind(this)}
                />
            );
        })

        return (
            <div>
                <div className=" rectangle ">
                     <div className="glyphicon glyphicon-plus-sign custom-add-icon"
                        onClick={this.onAddButtonClick.bind(this)}>
                     <span className="add-span" onClick={this.onAddButtonClick.bind(this)}>Add Office</span>
                     </div>

                </div>

            <div className="row">
                {form}
                {items}
            </div>
                </div>
            
        )
    }
}