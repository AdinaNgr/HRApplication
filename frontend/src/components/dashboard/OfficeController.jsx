import * as React from 'react';
import * as $ from 'jquery';
import config from '../helper';
import Context from '../../context/Context';

export default new class OfficeController {
    
    GetAll(){
        console.log("Refreshing");
        $.ajax({
            method:'GET',
            url: config.base+'office/getAll',
            async:false,
            success: function(data){                
                Context.cursor.set('items',data);
                Context.cursor.set('formToggle',false);
                console.log(data)
            }.bind(this)
        });
    }

    GetPartial(){
        console.log("GetPartial called");
        $.ajax({
            method:'GET',
            url: config.base+'office/getPartialOffices',
            async:false,
            success: function(data){                
                Context.cursor.set('sidebarOffices',data);
            }.bind(this)
        });
    }

    GetOfficeById(id){
        console.log("GetPartial called");
        $.ajax({
            method:'GET',
            url: config.base+'office/getOfficeImagePartial?id='+id,
            async:false,
            success: function(data){                
                Context.cursor.set('currentOffice',data);
            }.bind(this)
        });
    }

    Add(){
        console.log("Add called");
        let model= Context.cursor.get("model");

        console.log("MODEl: ",model);
        $.ajax({
            method:'POST',
            url: config.base+'office/add',
            async:false,
            data:{
                Name:model.Name,
                Address:model.Address,
                Phone:model.Phone,
                Image:model.Image
            },
            success: function(data){  
                console.log("ADD RETURNED: ",data);
            }.bind(this)
        });             
        this.GetAll();
    }


    Update(){
        console.log("Update called");
        let model= Context.cursor.get("model");
        $.ajax({
            method:'POST',
            url: config.base+'office/update',
            async:false,
            data:{
                Id:model.Id,
                Name:model.Name,
                Address:model.Address,
                Phone:model.Phone,
                Image:model.Image
            },
            success: function(data){                
                console.log("UPDATE RETURNED: ",data);
            }.bind(this)
        });
        this.GetAll();
    }
}