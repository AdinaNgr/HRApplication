using System;
using System.Collections.Generic;
using AutoMapper;
using Contracts;
using Domain.Models;
using Manager.InfoModels;
using Manager.InputInfoModels;
using Manager.Validators;
using Domain.Extensions;

namespace Manager.Services
{
    public class EmployeeService
    {
        private readonly IEmployeeRepository _employeeRepository;
        private readonly IDepartmentRepository _departmentRepository;
        private readonly IMapper _mapper;
        private readonly AddEmployeeValidator _addEmployeeValidator;
        private readonly UpdateEmployeeValidator _updateEmployeeValidator;

        public EmployeeService(IMapper mapper, IEmployeeRepository employeeRepository, IDepartmentRepository departmentRepository)
        {
            _employeeRepository = employeeRepository;
            _departmentRepository = departmentRepository;
            _mapper = mapper;

            _addEmployeeValidator = new AddEmployeeValidator();
            _updateEmployeeValidator = new UpdateEmployeeValidator();
        }

        public IEnumerable<EmployeeInfo> GetAll()
        {
            var employees = _employeeRepository.GetAll();
            var employeeInfos = _mapper.Map<IEnumerable<EmployeeInfo>>(employees);

            return employeeInfos;
        }

        public IEnumerable<EmployeeInfo> GetDepartmentManagers() {
            var employees = _employeeRepository.GetDepartmentManagers();
            var employeeInfos = _mapper.Map<IEnumerable<EmployeeInfo>>(employees);

            return employeeInfos;
        }

        public EmployeeInfo GetById(int id)
        {
            var employee = _employeeRepository.GetById(id);
            var employeeInfo = _mapper.Map<EmployeeInfo>(employee);

            return employeeInfo;
        }

        public OperationResult Add(AddEmployeeInputInfo inputInfo)
        {
            var validationResult = _addEmployeeValidator.Validate(inputInfo);
            if (!validationResult.IsValid) {
                return new OperationResult(false, validationResult);
            }

            var newEmployee = _mapper.Map<Employee>(inputInfo);
            newEmployee.Department = _departmentRepository.GetDepartmentById(inputInfo.DepartmentId);
            _employeeRepository.Add(newEmployee);

            return new OperationResult(true, Messages.SuccessfullyAddedEmployee);
        }

        public OperationResult Update(UpdateEmployeeInputInfo inputInfo)
        {
            var validationResult = _updateEmployeeValidator.Validate(inputInfo);
            if (!validationResult.IsValid) {
                return new OperationResult(false, validationResult);
            }

            var employee = _employeeRepository.GetById(inputInfo.Id);

            if (employee == null)
            {
                return new OperationResult(false, Messages.ErrorWhileUpdatingEmployee);
            }

            employee.Name = inputInfo.Name;
            _employeeRepository.Save();

            return new OperationResult(true, Messages.SuccessfullyUpdatedEmployee);
        }

        public OperationResult Delete(int employeeId, DateTime releaseDate)
        {
            var employee = _employeeRepository.GetById(employeeId);

            if (employee == null)
            {
                return new OperationResult(false, Messages.ErrorWhileDeletingEmployee);
            }

            _employeeRepository.Delete(employee.Id, releaseDate);
            return new OperationResult(true, Messages.SuccessfullyDeletedEmployee);
        }

        public IEnumerable<ProjectInfo> GetProjectsOfEmployee(int employeeId)
        {
            var employee = _employeeRepository.GetById(employeeId);
            var projects = new List<Project>();
            foreach (var assignment in employee.Assignments)
            {
                projects.Add(assignment.Project);
            }

            var projectsInfos = _mapper.Map<IEnumerable<ProjectInfo>>(projects);

            return projectsInfos;
        }

        public IEnumerable<PositionTypeInfo> GetPositions()
        {
            var values = Enum.GetValues(typeof(Position));

            foreach (Position position in values)
            {
                yield return
                    new PositionTypeInfo {Index = (int) position, Description = position.GetDescriptionFromEnumValue()};
            }
        }

        public IEnumerable<JobTypeInfo> GetJobTypes()
        {
            var values = Enum.GetValues(typeof(JobTypes));

            foreach (JobTypes jobType in values)
            {
                yield return
                    new JobTypeInfo() { Index = (int)jobType, Description = jobType.GetDescriptionFromEnumValue() };
            }
        }

    }
}
