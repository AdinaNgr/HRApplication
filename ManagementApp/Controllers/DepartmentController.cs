using System.Web.Http;
using System.Web.Http.Cors;
using Manager.InputInfoModels;
using Manager.Services;

namespace ManagementApp.Controllers
{
    [RoutePrefix("api/department")]
    [EnableCors("*", "*", "*")]
    public class DepartmentController : ApiController
    {
        private readonly DepartmentService _departmentService;

        public DepartmentController(DepartmentService departmentService)
        {
            _departmentService = departmentService;
        }

        [Route("getAll")]
        [HttpGet]
        public IHttpActionResult GetAll()
        {
            var result = _departmentService.GetAllDepartments();
            return Json(result);
        }

        [Route("getById/{departmentId}")]
        [HttpGet]
        public IHttpActionResult GetDepartmentById(int departmentId) {
            var result = _departmentService.GetDepartmentById(departmentId);
            return Json(result);
        }

        [Route("membersCount/{departmentId}")]
        [HttpGet]
        public IHttpActionResult CountAllMembersOfADepartment(int departmentId, string name = "",
            int? jobType = null, int? position = null, int? allocation = null) {
            return Json(_departmentService.CountAllMembersOfADepartment(departmentId, name, jobType,
                position, allocation));
        }

        [Route("members/{departmentId}/{pageSize}/{pageNumber}")]
        [HttpGet]
        public IHttpActionResult GetMembersOfDepartment(int departmentId, int pageSize, int pageNumber, string name = "", int? jobType = null, int? position = null, int? allocation = null) {
            var result = _departmentService.GetMembersOfDepartment(departmentId, pageSize, pageNumber, name, jobType, position, allocation);
            return Json(result);
        }   

        [Route("projects/{departmentId}/{pageSize}/{pageNumber}")]
        [HttpGet]
        public IHttpActionResult GetProjectsOfDepartment(int departmentId, int pageSize, int pageNumber, int? status = null) {
            var result = _departmentService.GetProjectsOfDepartment(departmentId, pageSize, pageNumber, status);
            return Json(result);
        }

        [Route("add")]
        [HttpPost]
        public IHttpActionResult Add([FromBody] AddDepartmentInputInfo inputInfo)
        {
            var result = _departmentService.AddDepartment(inputInfo);
            return Json(result);
        }

        [Route("update")]
        [HttpPut]
        public IHttpActionResult Update([FromBody]UpdateDepartmentInputInfo inputInfo)
        {
            var result = _departmentService.UpdateDepartment(inputInfo);
            return Json(result);
        }

        [Route("totalNumberOfProjectsFromDepartment/{departmentId}")]
        [HttpGet]
        public IHttpActionResult GetTotalNumberProjects(int departmentId)
        {
            var result = _departmentService.GetTotalNumberOfProjectsFromDepartment(departmentId);
            return Json(result);
        }

    }
}
