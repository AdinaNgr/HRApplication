import * as React from 'react';
import * as $ from 'jquery';
import config from '../helper';
import Context from '../../context/Context';
import Accessors from '../../context/Accessors';

export default new class DepartmentController{

    getTotalNumberOfDepartments(officeId){
        console.log('call')
        $.ajax({
            method: 'GET',
            url: config.base + 'office/departmentsCount/' + officeId,
            async: false,
            success: function (data) {
                Context.cursor.set('totalNumberOfItems', data);
            }.bind(this)
        })
    }

    getDepartments(officeId, pageNumber){
        $.ajax({
            method: 'GET',
            url: config.base + 'office/departments/' + officeId + '/5/' + pageNumber,
            async: false,
            success: function (data) {
                Context.cursor.set('items', data);
            }.bind(this)
        })
    }

    Add(officeId, currentPage){
        $.ajax({
           method: 'POST',
           url: config.base + 'department/add',
           async: false,
           data: Accessors.model(Context.cursor),
           success: function(data){
               console.log("Successfully added!");
           }
       });
        this.getTotalNumberOfDepartments(officeId);
        this.getDepartments(officeId, currentPage);
    }

    Update(officeId, currentPage){
        $.ajax({
            method: 'PUT',
            url: config.base + 'department/update',
            async: false,
            data: Accessors.model(Context.cursor),
            success: function(){
                console.log("Successfully updated!");
            }
        });
        this.getDepartments(officeId, currentPage);
    }

}