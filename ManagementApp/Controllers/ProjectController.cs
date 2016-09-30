using System;
using System.Runtime.InteropServices;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Xml;
using Manager.InputInfoModels;
using Manager.Services;

namespace ManagementApp.Controllers
{
    [RoutePrefix("api/project")]
    [EnableCors("*","*", "*")]
    public class ProjectController : ApiController
    {
        private readonly ProjectService _projectService;

        public ProjectController(ProjectService projectService)
        {
            _projectService = projectService;
        }

        [Route("add")]
        [HttpPost]
        public IHttpActionResult Add([FromBody] AddProjectInputInfo inputInfo)
        {
            var result = _projectService.Add(inputInfo);
            return Json(result);
        }

        [Route("addAssignment")]
        [HttpPost]
        public IHttpActionResult AddAssignment([FromBody] AddAssignmentInputInfo inputInfo)
        {
            var result = _projectService.AddAssignment(inputInfo);
            return Json(result);
        }

        [Route("delete/{projectId}")]
        [HttpDelete]
        public IHttpActionResult Delete(int projectId) {
            var result = _projectService.Delete(projectId);
            return Json(result);
        }

        [Route("deleteEmployee/{employeeId}/{projectId}")]
        [HttpDelete]
        public IHttpActionResult DeleteEmployeeFromProject(int employeeId, int projectId)
        {
            var result = _projectService.DeleteEmployeeFromProject(employeeId, projectId);
            return Json(result);
        }

        [Route("update")]
        [HttpPut]
        public IHttpActionResult Update([FromBody] UpdateProjectInputInfo inputInfo) {
            var result = _projectService.Update(inputInfo);
            return Json(result);
        }
        [Route("editAllocation")]
        [HttpPut]
        public IHttpActionResult EditAllcation([FromBody] EditAllocationInputInfo inputInfo) {
            var result = _projectService.EditAllocation(inputInfo);
            return Json(result);
        }

        [Route("getAll")]
        [HttpGet]
        public IHttpActionResult GetAll()
        {
            var result = _projectService.GetAll();
            return Json(result);
        }

        [Route("getById/{id}")]
        [HttpGet]
        public IHttpActionResult GetById(int id)
        {
            var result = _projectService.GetById(id);
            return Json(result);
        }

        [Route("members/{projectId}/{pageSize}/{pageNumber}")]
        [HttpGet]
        public IHttpActionResult GetMembersFromProject(int projectId, int pageSize, int pageNumber, string role="")
        {
            var result = _projectService.GetMembersFromProject(projectId, pageSize, pageNumber, role);
            return Json(result);
        }

        [Route("employeeAllocation/{projectId}/{employeeId}")]
        [HttpGet]
        public IHttpActionResult GetAllocationOfEmployeeFromProject(int projectId, int employeeId)
        {
            var result = _projectService.GetAllocationOfEmployeeFromProject(projectId, employeeId);
            return Json(result);
        }
        [Route("numberOfMembers/{projectId}")]
        [HttpGet]
        public IHttpActionResult GetNrTeamMembers(int projectId)
        {
            var result = _projectService.GetNrTeamMembers(projectId);
            return Json(result);
        }


        [Route("statusDescriptions")]
        [HttpGet]
        public IHttpActionResult GetStatusDescription()
        {
            var result = _projectService.GetStatusDescription();
            return Json(result);
        }

    }
}
