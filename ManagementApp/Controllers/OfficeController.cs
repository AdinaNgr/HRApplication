using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;
using Manager.InputInfoModels;
using Manager.Services;

namespace ManagementApp.Controllers
{
    [RoutePrefix("api/office")]
    [EnableCors("*", "*", "GET, POST, PUT")]
    public class OfficeController : ApiController
    {
        private readonly OfficeService _officeService;

        public OfficeController(OfficeService officeService)
        {
            _officeService = officeService;
        }

        [Route("getAll")]
        [HttpGet]
        public IHttpActionResult GetAll()
        {
            var result = _officeService.GetAll();
            return Json(result);
        }
        [Route("getPartialOffices")]
        [HttpGet]
        public IHttpActionResult GetPartial()
        {
            var result = _officeService.GetPartial();
            return Json(result);
        }
        [Route("getOfficeImagePartial")]
        [HttpGet]
        public IHttpActionResult GetImagePartial(int id)
        {
            var result = _officeService.GetImagePartialById(id);
            return Json(result);
        }

        [Route("departmentsCount/{officeId}")]
        [HttpGet]
        public IHttpActionResult GetAllDepartmentsOfAnOffice(int officeId)
        {
            return Json(_officeService.CountAllDepartmentsOfAnOffice(officeId));
        }

        [Route("departments/{officeId}/{pageSize}/{pageNumber}")]
        [HttpGet]
        public IHttpActionResult GetAllDepartmentsOfAnOffice(int officeId, int pageSize, int pageNumber) {
            var result = _officeService.GetAllDepartmentsOfAnOffice(officeId, pageSize, pageNumber);
            return Json(result);
        }

        [Route("availableEmployees/{projectId}/{officeId}/{pageSize}/{pageNumber}")]
        [HttpGet]
        public IHttpActionResult GetAllAvailableEmployeesOfAnOffice(int projectId, int officeId, int pageSize, int pageNumber, int? department = null, int? position = null) {
            var result = _officeService.GetAllAvailableEmployeesOfAnOffice(projectId, officeId, pageSize, pageNumber, department, position);
            return Json(result);
        }

        [Route("add")]
        [HttpPost]
        public IHttpActionResult Add([FromBody] AddOfficeInputInfo inputInfo)
        {
            var result = _officeService.Add(inputInfo);
            return Json(result);
        }

        [Route("update")]
        [HttpPost]
        public IHttpActionResult Update([FromBody] UpdateOfficeInputInfo inputInfo)
        {
            var result = _officeService.Update(inputInfo);
            return Json(result); 
        }

    }
}
