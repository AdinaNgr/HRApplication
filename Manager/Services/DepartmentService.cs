using System;
using System.Collections.Generic;
using AutoMapper;
using Contracts;
using Domain.Models;
using Manager.InfoModels;
using Manager.InputInfoModels;
using Manager.Validators;

namespace Manager.Services
{
    public class DepartmentService
    {
        private readonly IDepartmentRepository _departmentRepository;
        private readonly IEmployeeRepository _employeeRepository;
        private readonly IOfficeRepository _officeRepository;
        private readonly IMapper _mapper;
        private readonly AddDepartmentValidator _addDepartmentValidator;
        private readonly UpdateDepartmentValidator _updateDepartmentValidator;

        public DepartmentService(IMapper mapper, IDepartmentRepository departmentRepository, IEmployeeRepository employeeRepository, IOfficeRepository officeRepository)
        {
            _departmentRepository = departmentRepository;
            _employeeRepository = employeeRepository;
            _officeRepository = officeRepository;
            _mapper = mapper;

            _addDepartmentValidator = new AddDepartmentValidator();
            _updateDepartmentValidator = new UpdateDepartmentValidator();
        }

        public IEnumerable<DepartmentInfo> GetAllDepartments()
        {
            var departments = _departmentRepository.GetAllDepartments();
            var departmentsInfos = _mapper.Map<IEnumerable<DepartmentInfo>>(departments);

            return departmentsInfos;
        }

        public DepartmentInfo GetDepartmentById(int departmentId) {
            var department = _departmentRepository.GetDepartmentById(departmentId);
            var departmentInfo = _mapper.Map<DepartmentInfo>(department);

            return departmentInfo;
        }

        public IEnumerable<ProjectInfo> GetProjectsOfDepartment(int departmentId, int pageSize, int pageNumber, int? status = null) {
            var projects = _departmentRepository.GetProjectsOfDepartment(departmentId, pageSize, pageNumber, status);
            var projectsInfos = _mapper.Map<IEnumerable<ProjectInfo>>(projects);

            return projectsInfos;
        }

        public int CountAllMembersOfADepartment(int departmentId, string name = "",
            int? jobType = null, int? position = null, int? allocation = null)
        {
            return _departmentRepository.CountAllMembersOfADepartment(departmentId, name, jobType,
                position, allocation);
        }

        public IEnumerable<EmployeeInfo> GetMembersOfDepartment(int departmentId, int pageSize, int pageNumber, string name = "", int? jobType = null, int? position = null, int? allocation = null)
        {
            var employees = _departmentRepository.GetMembersOfDepartment(departmentId, pageSize, pageNumber, name, jobType, position, allocation);
            var employeesInfos = _mapper.Map<IEnumerable<EmployeeInfo>>(employees);

            return employeesInfos;
        }

        public IEnumerable<ProjectInfo> FilterProjectsOfADepartmentByStatus(int departmentId, string status)
        {
            var projects = _departmentRepository.FilterProjectsOfADepartmentByStatus(departmentId, status);
            var projectsInfos = _mapper.Map<IEnumerable<ProjectInfo>>(projects);

            return projectsInfos;
        }
        public OperationResult AddDepartment(AddDepartmentInputInfo inputInfo)
        {
            var validationResult = _addDepartmentValidator.Validate(inputInfo);
            if (!validationResult.IsValid) {
                return new OperationResult(false, validationResult);
            }

            var newDepartment = _mapper.Map<Department>(inputInfo);
            newDepartment.DepartmentManager = _employeeRepository.GetById(inputInfo.DepartmentManagerId);
            newDepartment.Office = _officeRepository.GetById(inputInfo.OfficeId);

            _departmentRepository.AddDepartment(newDepartment);

            return new OperationResult(true, Messages.SuccessfullyAddedDepartment);
        }

        public OperationResult UpdateDepartment(UpdateDepartmentInputInfo inputInfo)
        {
            var validationResult = _updateDepartmentValidator.Validate(inputInfo);
            if (!validationResult.IsValid) {
                return new OperationResult(false, validationResult);
            }

            var department = _departmentRepository.GetDepartmentById(inputInfo.Id);

            if (department == null)
            {
                return new OperationResult(false, Messages.ErrorWhileUpdatingDepartment);
            }

            department.Name = inputInfo.Name;
            department.DepartmentManager = _employeeRepository.GetById(inputInfo.DepartmentManagerId);

            _departmentRepository.Save();

            return new OperationResult(true, Messages.SuccessfullyUpdatedDepartment);
        }
        public int GetTotalNumberOfProjectsFromDepartment(int departmentId)
        {
            return _departmentRepository.GetTotalNumberOfProjectsFromDepartment(departmentId);
        }


    }
}
