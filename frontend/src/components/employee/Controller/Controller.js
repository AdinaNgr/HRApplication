import config from '../../helper';
import Context from '../../../context/Context'
import Accessors from '../../../context/Accessors';
import $ from 'jquery';
export default new class Controller{

    getAllEmployees(departmentId, pageNumber, name, jobType, position, allocation){
        let myUrl = "";
        if(name){
            myUrl = config.base + 'department/members/' + departmentId + '/5/' + pageNumber + "?name=" + name + "&jobType=" + jobType + "&position=" + position +"&allocation=" + allocation
        }
        else{
            myUrl = config.base + 'department/members/' + departmentId + '/5/' + pageNumber + "?jobType=" + jobType + "&position=" + position +"&allocation=" + allocation
        }
        console.log('myUrl: ', myUrl);
        $.ajax({
            method: 'GET',
            url: myUrl,
            async: false,
            success: function(data){
                Context.cursor.set('items', data);
            }.bind(this)
        })
    }

    getTotalNumberOfEmployees(departmentId){
        $.ajax({
            method: 'GET',
            url: config.base + 'department/membersCount/' + departmentId,
            async: false,
            success: function (data) {
                Context.cursor.set('totalNumberOfItems', data);
            }.bind(this)
        })
    }

    Add(departmentId, currentPage, name, jobType, position, allocation){
        $.ajax({
            method: 'POST',
            url: config.base + 'employee/add',
            data: Accessors.model(Context.cursor),
            async: false,
            success: function(data){
                console.log("Successfully added!");
            }.bind(this)
        });
        this.getTotalNumberOfEmployees(departmentId);
        this.getAllEmployees(departmentId, currentPage, name, jobType, position, allocation);
    }

    Edit(departmentId, currentPage, name, jobType, position, allocation){
        $.ajax({
            method: 'PUT',
            url: config.base + 'employee/update',
            data: Accessors.model(Context.cursor),
            async: false,
            success: function(data){
                console.log("Successfully updated!");
            }
        });
        this.getAllEmployees(departmentId, currentPage, name, jobType, position, allocation);
    }

    Delete(element){
        const id = element.Id;

        $.ajax({
            method: 'DELETE',
            url: config.base + 'employee/delete/' + id,
            async: false,
            success: function(data){
                console.log("Successfully deleted!");
            }.bind(this)
        });
    }

}