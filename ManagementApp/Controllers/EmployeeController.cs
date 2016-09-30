using System;
using System.Web.Http;
using System.Web.Http.Cors;
using Manager.InputInfoModels;
using Manager.Services;

namespace ManagementApp.Controllers
{
    [RoutePrefix("api/employee")]
    [EnableCors("*", "*", "*")]
    public class EmployeeController : ApiController
    {
        private readonly EmployeeService _employeeService;

        public EmployeeController(EmployeeService employeeService)
        {
            _employeeService = employeeService;
        }

        [Route("getAll")]
        [HttpGet]
        public IHttpActionResult GetAll()
        {
            var result = _employeeService.GetAll();
            return Json(result);
        }

        [Route("departmentManagers")]
        [HttpGet]
        public IHttpActionResult GetDepartmentManagers()
        {
            var result = _employeeService.GetDepartmentManagers();
            return Json(result);
        }

        [Route("getById/{id}")]
        [HttpGet]
        public IHttpActionResult GetById(int id)
        {
            var result = _employeeService.GetById(id);
            return Json(result);
        }

        [Route("add")]
        [HttpPost]
        public IHttpActionResult Add([FromBody] AddEmployeeInputInfo inputInfo)
        {
            var result = _employeeService.Add(inputInfo);
            return Json(result);
        }

        [Route("update")]
        [HttpPut]
        public IHttpActionResult Update([FromBody]UpdateEmployeeInputInfo inputInfo)
        {
            var result = _employeeService.Update(inputInfo);
            return Json(result);
        }

        [Route("delete/{employeeId}")]
        [HttpDelete]
        public IHttpActionResult Delete(int employeeId)
        {
            var result = _employeeService.Delete(employeeId, DateTime.Now);
            return Json(result);
        }

        [Route("getPositions")]
        [HttpGet]
        public IHttpActionResult GetPositions()
        {
            var result = _employeeService.GetPositions();
            return Json(result);
        }

        [Route("getJobTypes")]
        [HttpGet]
        public IHttpActionResult GetJobTypes()
        {
            var result = _employeeService.GetJobTypes();
            return Json(result);
        }
    }
}
