import config from '../../helper';
import Context from '../../../context/Context'
import $ from 'jquery';

export default new class Controller{


    static GetAllProjectsFromDepartmentAjaxCall(departmentId, pageNumber){
        console.log('ajax call');
        $.ajax({
            method: 'GET',
            url: config.base + 'department/projects/' + departmentId +'/5/' + pageNumber ,
            async: false,
            success: function(data){
                Context.cursor.set('items', data);
                Context.cursor.set('model', null);
            }.bind(this)
        })
    }

    static GetAllProjectMembers(projectId, pageNumber){
        $.ajax({
            method: 'GET',
            url: config.base + 'project/members/' +projectId + '/5/' + pageNumber,
            async: false,
            success: function(data){
                Context.cursor.set('items', data);
                Context.cursor.set('model', null);
            }.bind(this)
        });
    }

    static GetTotalNumberProjectMembers(projectId){
        $.ajax({
            method: 'GET',
            url: config.base + 'project/numberOfMembers/' + projectId,
            async: false,
            success: function(data){
                Context.cursor.set('totalNumberOfItems', data)
            }.bind(this)
        })
    }

    static GetTotalNumberOfProjects(departmentId){
        $.ajax({
            method: 'GET',
            url: config.base + 'department/totalNumberOfProjectsFromDepartment/' + departmentId,
            async: false,
            success: function(data){
                console.log("Number of items: ", data);
                Context.cursor.set('totalNumberOfItems', data)
            }.bind(this)
        })
    }
    GetAllProjects(departmentId, pageNumber) {
        Controller.GetAllProjectsFromDepartmentAjaxCall(departmentId, pageNumber);
    }
    GetProjectMembers(projectId, pageNumber){
        Controller.GetAllProjectMembers(projectId, pageNumber);
    }

    GetNumberOfProjects(departmentId){
        Controller.GetTotalNumberOfProjects(departmentId);
    }
    GetNrMembers(projectId){
        Controller.GetTotalNumberProjectMembers(projectId);
    }

    SetDepartmentDropdownItems(){
        $.ajax({
            method: 'GET',
            url: config.base + "/department/GetAll",
            async: false,
            success: function(data){
                this.setState({
                    dropdownItemsDepartments: data
                })
            }.bind(this)
        });
    }

    Add(departmentId, currentPage) {
        console.log('name:', Context.cursor.get('model').Name);
        $.ajax({
            method: 'POST',
            url: config.base + 'project/add',
            data: {
                Name: Context.cursor.get('model').Name,
                DepartmentId: 1,
                Duration: Context.cursor.get('model').Duration,
                Status: "NotStartedYet"
            },
            async: false,
            success: function (data) {
                console.log('success');
            }.bind(this)
        });
        Controller.GetAllProjectsFromDepartmentAjaxCall(departmentId, currentPage);
        Controller.GetTotalNumberOfProjects(departmentId);
    }

    Update(departmentId, currentPage) {
        console.log('model is: ', Context.cursor.get('model').Status);
        $.ajax({
            method: 'PUT',
            url: config.base + 'project/update',
            data: {
                Id: Context.cursor.get('model').Id,
                Name: Context.cursor.get('model').Name,
                DepartmentId: 3,
                Duration: Context.cursor.get('model').Duration,
                Status: Context.cursor.get('model').Status
            },
            async: false,
            success: function (data) {
                console.log('successfully updated')
                console.log('data updated:', data);

            }.bind(this)
        });

        Controller.GetAllProjectsFromDepartmentAjaxCall(departmentId, currentPage);

    }

    Delete(element, departmentId, currentPage){
        console.log('we are in delete method, yey', element.Id);
        const id = element.Id;
        $.ajax({
            method: 'DELETE',
            url: config.base + 'project/delete/' + id,
            async: false,
            success: function(data){
                console.log('success');
            }.bind(this)
        });
        Controller.GetAllProjectsFromDepartmentAjaxCall(departmentId, currentPage);
        Controller.GetTotalNumberOfProjects(departmentId);
    }
    GetStatusDescriptions(){
        console.log('status descriptions');
        $.ajax({
            method:'GET',
            url: config.base + "/project/statusDescriptions",
            async: false,
            success: function(data){
                Context.cursor.set('dropdownItems', data);
            }.bind(this)
        });
    }

    EditAllocation(projectId){
        console.log('controller edit allocation');
        console.log('allocation on context ',Context.cursor.get('model').Allocation )
        $.ajax({
            method: 'PUT',
            url: config.base + "project/editAllocation",
            data: {
                projectId: projectId,
                employeeId: Context.cursor.get('model').Id,
                Allocation: Context.cursor.get('model').Allocation
            },
            async: false,
            success: function(data){
                console.log('successfully changed allocation');
            }.bind(this)
        });
        Controller.GetAllProjectMembers(projectId, currentPage);
    }

    DeleteAssignment(employeeId, projectId, currentPage){
        console.log('employee id, projectId', employeeId, projectId);
        $.ajax({
            method: 'DELETE',
            url: config.base + "project/deleteEmployee/" + employeeId + "/" + projectId,
            async: false,
            success: function(data){
                console.log('successfully deleted assignment')
            }
        })
        Controller.GetAllProjectMembers(projectId, currentPage);
        Controller.GetTotalNumberProjectMembers(projectId, currentPage);
    }

}