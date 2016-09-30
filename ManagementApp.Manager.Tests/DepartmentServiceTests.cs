using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Contracts;
using Domain.Models;
using Manager;
using Manager.InfoModels;
using Manager.InputInfoModels;
using Manager.Services;
using Moq;
using NUnit.Framework;

namespace ManagementApp.Manager.Tests
{
    // [TestFixture]
     public class DepartmentServiceTests
    {
        private DepartmentService _departmentService;
        private Mock<IDepartmentRepository> _departmentRepositoryMock;
        private Mock<IEmployeeRepository> _employeeRepositoryMock;
        private Mock<IOfficeRepository> _officeRepositoryMock;
        private Mock<IMapper> _mapperMock;

        [SetUp]
        public void PerTestSetup()
        {
            _departmentRepositoryMock = new Mock<IDepartmentRepository>();
            _employeeRepositoryMock = new Mock<IEmployeeRepository>();
            _officeRepositoryMock = new Mock<IOfficeRepository>();
            _mapperMock = new Mock<IMapper>();
            _departmentService = new DepartmentService(_mapperMock.Object, _departmentRepositoryMock.Object, _employeeRepositoryMock.Object, _officeRepositoryMock.Object);
        }

        [Test]
        public void GetAllDepartments_ReturnsAListOfDepartments()
        {
            //Arrange
            var offices = new List<Office>
            {
                CreateOffice("Office1", "Address1", "Phone1", 1),
                CreateOffice("Office2", "Address2", "Phone2", 2)
            };

            var departmentManagers = new List<Employee>
            {
                CreateEmployee("Manager1", "Address1", new DateTime(2016, 1, 1), JobTypes.fullTime, Position.Developer, null,
                    1),
                CreateEmployee("Manager2", "Address2", new DateTime(2016, 2, 2), JobTypes.fullTime, Position.Developer, null,
                    2)
            };

            var departments = new List<Department>
            {
                CreateDepartment("Java", departmentManagers[0], offices[0], 1),
                CreateDepartment(".Net", departmentManagers[1], offices[1], 2),
            };

            var departmentsInfo = new List<DepartmentInfo>
            {
                CreateDepartmentInfo(1, "Java", "Manager1", 0, 0),
                CreateDepartmentInfo(2, ".Net", "Manager2", 0, 0)
            };

            _departmentRepositoryMock.Setup(m => m.GetAllDepartments()).Returns(departments);
            _mapperMock.Setup(m => m.Map<IEnumerable<DepartmentInfo>>(departments)).Returns(departmentsInfo);

            //Act
            var result = _departmentService.GetAllDepartments();

            //Assert
            Assert.AreEqual(2, result.Count());
        }

        [Test]
        public void GetAllDepartments_CallsGetAllDepartmentsFromRepository()
        {
            //Arrange

            //Act
            _departmentService.GetAllDepartments();

            //Assert
            _departmentRepositoryMock.Verify(x => x.GetAllDepartments(), Times.Once);
        }

        [Test]
        public void GetDepartmentById_ReturnsDepartment()
        {
            //Arrange
            var office = CreateOffice("Office1", "Address1", "Phone1", 1);
            var departmentManager = CreateEmployee("Employee1", "Address1", new DateTime(2016, 1, 1), JobTypes.fullTime, Position.Developer, null, 1);
            var department = CreateDepartment("Java", departmentManager, office, 1);
            var departmentInfo = CreateDepartmentInfo(1, "Java", "Manager1", 0, 0);

            _mapperMock.Setup(m => m.Map<DepartmentInfo>(department)).Returns(departmentInfo);
            _departmentRepositoryMock.Setup(m => m.GetDepartmentById(1)).Returns(department);

            //Act
            var result = _departmentService.GetDepartmentById(1);

            //Assert
            Assert.AreEqual(departmentInfo, result);
        }

        [Test]
        public void GetDepartmentById_CallsGetDepartmentByIdFromRepository() {
            //Arrange

            //Act
            _departmentService.GetDepartmentById(1);

            //Assert
            _departmentRepositoryMock.Verify(x => x.GetDepartmentById(1), Times.Once);
        }

        [Test]
        public void GetMembersOfDepartment_ReturnsDepartmentMembers()
        {
            //Arrange
            var office = CreateOffice("Office1", "Address1", "Phone1", 1);

            var employees = new List<Employee>
            {
                CreateEmployee("Employee1", "Address1", new DateTime(2016, 1, 1), JobTypes.fullTime, Position.Developer, null, 1),
                CreateEmployee("Employee2", "Address2", new DateTime(2016, 2, 2), JobTypes.fullTime, Position.Developer, null, 2)
            };

            var department = CreateDepartment("Java", employees[0], office, 1);
            department.Employees.Add(employees[0]);
            department.Employees.Add(employees[1]);

            var employeesInfo = new List<EmployeeInfo>
            {
                CreateEmployeeInfo(1, "Employee1", "fullTime", "Developer"),
                CreateEmployeeInfo(2, "Employee2", "fullTime", "Developer")
            };

            _mapperMock.Setup(m => m.Map<IEnumerable<EmployeeInfo>>(employees)).Returns(employeesInfo);
            _departmentRepositoryMock.Setup(m => m.GetMembersOfDepartment(1, 1, 1, "", 2, 0, null)).Returns(employees);

            //Act
            var result = _departmentService.GetMembersOfDepartment(1, 1, 1, jobType:2, position:0);

            //Assert
            CollectionAssert.AreEqual(employeesInfo, result);
        }

        [Test]
        public void GetMembersOfDepartment_CallsGetMembersOfDepartmentFromRepository() {
            //Arrange

            //Act
            _departmentService.GetMembersOfDepartment(1, 1, 1, name:"Employee", jobType:1, position:1);

            //Assert
            _departmentRepositoryMock.Verify(x => x.GetMembersOfDepartment(1, 1, 1, "Employee", 1, 1, null), Times.Once);
        }

        [Test]
        public void GetProjectsOfDepartment_ReturnsDepartmentProjects() {
            //Arrange
            var office = CreateOffice("Office1", "Address1", "Phone1", 1);

            var employees = new List<Employee>
            {
                CreateEmployee("Employee1", "Address1", new DateTime(2016, 1, 1), JobTypes.fullTime, Position.Developer, null, 1),
                CreateEmployee("Employee2", "Address2", new DateTime(2016, 2, 2), JobTypes.fullTime, Position.Developer, null, 2)
            };

            var department = CreateDepartment("Java", employees[0], office, 1);

            var projects = new List<Project>
            {
                CreateProject("Project1", department, "variable", Status.NotStartedYet, 1),
                CreateProject("Project2", department, "variable", Status.NotStartedYet, 2)
            };

            department.Projects.Add(projects[0]);
            department.Projects.Add(projects[1]);

            var projectsInfo = new List<ProjectInfo>
            {
                CreateProjectInfo(1, "Project1", "NotStartedYet"),
                CreateProjectInfo(2, "Project2", "NotStartedYet")
            };

            _mapperMock.Setup(m => m.Map<IEnumerable<ProjectInfo>>(projects)).Returns(projectsInfo);
            _departmentRepositoryMock.Setup(m => m.GetProjectsOfDepartment(1, 1, 1, 0)).Returns(projects);

            //Act
            var result = _departmentService.GetProjectsOfDepartment(1, 1, 1, status:0);

            //Assert
            CollectionAssert.AreEqual(projectsInfo, result);
        }

        [Test]
        public void GetProjectsOfDepartment_CallsGetAllProjectsOfADepartmentFromRepository() {
            //Arrange

            //Act
            _departmentService.GetProjectsOfDepartment(1, 1, 1, status:0);

            //Assert
            _departmentRepositoryMock.Verify(x => x.GetProjectsOfDepartment(1, 1, 1, 0), Times.Once);
        }


        [Test]
        public void AddDepartment_CallsAddDepartmentFromRepository()
        {
            //Arrange
            var office = CreateOffice("Office1", "Address1", "Phone1", 1);
            var employee = CreateEmployee("Employee1", "Address1", new DateTime(2016, 1, 1), JobTypes.fullTime, Position.Developer, null, 1);

            var departmentInputInfo = new AddDepartmentInputInfo
            {
                Name = "javascript",
                DepartmentManagerId = 1,
                OfficeId = 1         
            };

            var department = new Department
            {
                Name = "javascript",
                DepartmentManager = employee,
                Office = office            
            };

            _mapperMock.Setup(m => m.Map<Department>(departmentInputInfo)).Returns(department);
            _departmentRepositoryMock.Setup(m => m.AddDepartment(department));

            //Act
            _departmentService.AddDepartment(departmentInputInfo);

            //Assert
            _departmentRepositoryMock.Verify(x => x.AddDepartment(department), Times.Once);
        }

        [Test]
        public void AddDepartment_ReturnsSuccessfulMessage()
        {
            //Arrange
            var office = CreateOffice("Office1", "Address1", "Phone1", 1);
            var employee = CreateEmployee("Employee1", "Address1", new DateTime(2016, 1, 1), JobTypes.fullTime, Position.Developer, null, 1);

            var departmentInputInfo = new AddDepartmentInputInfo {
                Name = "javascript",
                DepartmentManagerId = 1,
                OfficeId = 1
            };

            var department = new Department {
                Name = "javascript",
                DepartmentManager = employee,
                Office = office
            };

            _mapperMock.Setup(m => m.Map<Department>(departmentInputInfo)).Returns(department);
            _departmentRepositoryMock.Setup(m => m.AddDepartment(department));

            //Act
            var result = _departmentService.AddDepartment(departmentInputInfo);

            //Assert
            Assert.IsTrue(result.Success);
            Assert.AreEqual(result.MessageList.Count, 1);
            Assert.AreEqual(Messages.SuccessfullyAddedDepartment, result.MessageList[0]);
        }


        [Test]
        public void UpdateDepartment_ReturnsSuccessfulMessage_WhenDepartmentExists()
        {
            //Arrange
            var office = CreateOffice("Office1", "Address1", "Phone1", 1);
            var employee = CreateEmployee("Employee1", "Address1", new DateTime(2016, 1, 1), JobTypes.fullTime, Position.Developer, null, 1);

            var departmentInputInfo = new UpdateDepartmentInputInfo {Id = 1, Name = "php", DepartmentManagerId = 2};
            var department = new Department {
                Id = 1,
                Name = "javascript",
                DepartmentManager = employee,
                Office = office
            };

            _departmentRepositoryMock.Setup(m => m.GetDepartmentById(departmentInputInfo.Id)).Returns(department);

            //Act
            var result = _departmentService.UpdateDepartment(departmentInputInfo);

            //Assert
            Assert.IsTrue(result.Success);
            Assert.AreEqual(result.MessageList.Count, 1);
            Assert.AreEqual(Messages.SuccessfullyUpdatedDepartment, result.MessageList[0]);
        }

        [Test]
        public void UpdateDepartment_CallsGetDepartmentByIdFromRepository_WhenDepartmentExists()
        {
            //Arrange
            var office = CreateOffice("Office1", "Address1", "Phone1", 1);
            var employee = CreateEmployee("Employee1", "Address1", new DateTime(2016, 1, 1), JobTypes.fullTime, Position.Developer, null, 1);
            
            var departmentInputInfo = new UpdateDepartmentInputInfo { Id = 1, Name = "php", DepartmentManagerId = 2 };
            var department = new Department {
                Id = 1,
                Name = "javascript",
                DepartmentManager = employee,
                Office = office
            };

            _departmentRepositoryMock.Setup(m => m.GetDepartmentById(departmentInputInfo.Id)).Returns(department);

            //Act
            _departmentService.UpdateDepartment(departmentInputInfo);

            //Assert
            _departmentRepositoryMock.Verify(x => x.GetDepartmentById(departmentInputInfo.Id), Times.Once);
        }

        [Test]
        public void UpdateDepartment_CallsSaveFromRepository_WhenDepartmentExists()
        {
            //Arrange
            var office = CreateOffice("Office1", "Address1", "Phone1", 1);
            var employee = CreateEmployee("Employee1", "Address1", new DateTime(2016, 1, 1), JobTypes.fullTime, Position.Developer, null, 1);
            
            var departmentInputInfo = new UpdateDepartmentInputInfo { Id = 1, Name = "php", DepartmentManagerId = 2 };
            var department = CreateDepartment("Java", employee, office, 1);

            _departmentRepositoryMock.Setup(m => m.GetDepartmentById(departmentInputInfo.Id)).Returns(department);

            //Act
            _departmentService.UpdateDepartment(departmentInputInfo);

            //Assert
            _departmentRepositoryMock.Verify(x => x.Save(), Times.Once);
        }

        [Test]
        public void UpdateDepartment_ReturnsErrorMessage_WhenDepartmentDoesNotExists()
        {
            //Arrange
            var departmentInputInfo = new UpdateDepartmentInputInfo { Id = 1, Name = "php", DepartmentManagerId = 2 };

            _departmentRepositoryMock.Setup(m => m.GetDepartmentById(departmentInputInfo.Id)).Returns((Department)null);

            //Act
            var result = _departmentService.UpdateDepartment(departmentInputInfo);

            //Assert
            Assert.IsFalse(result.Success);
            Assert.AreEqual(result.MessageList.Count,1);
            Assert.AreEqual(Messages.ErrorWhileUpdatingDepartment, result.MessageList[0]);
        }

        [Test]
        public void UpdateDepartment_DoesNotCallSaveFromRepository_WhenDepartmentDoesNotExists()
        {
            //Arrange
            var departmentInputInfo = new UpdateDepartmentInputInfo { Id = 1, Name = "php", DepartmentManagerId = 2 };

            _departmentRepositoryMock.Setup(m => m.GetDepartmentById(departmentInputInfo.Id)).Returns((Department)null);

            //Act
            _departmentService.UpdateDepartment(departmentInputInfo);

            //Assert
            _departmentRepositoryMock.Verify(x => x.Save(), Times.Never);
        }

        private Office CreateOffice(string name, string address, string phone, int? id = null)
        {
            var office = new Office {
                Name = name,
                Address = address,
                Phone = phone
            };
            if (id != null) {
                office.Id = (int)id;
            }
            return office;
        }

        private Employee CreateEmployee(string name, string address, DateTime employmentDate, JobTypes jobType,
            Position position, Department department, int? id = null)
        {
            var employee = new Employee {
                Name = name,
                Address = address,
                EmploymentDate = employmentDate,
                JobType = jobType,
                Position = position,
                Department = department
            };
            if (id != null) {
                employee.Id = (int)id;
            }
            return employee;
        }

        private Project CreateProject(string name, Department department, string duration, Status status, int? id = null)
        {
            var project = new Project {
                Name = name,
                Department = department,
                Duration = duration,
                Status = status
            };
            if (id != null) {
                project.Id = (int)id;
            }
            return project;
        }

        private Department CreateDepartment(string name, Employee departmentManager, Office office, int? id = null)
        {
            var department = new Department
            {
                Name = name,
                DepartmentManager = departmentManager,
                Office = office
            };
            if (id != null)
            {
                department.Id = (int)id;
            }
            return department;
        }

        private DepartmentInfo CreateDepartmentInfo(int id, string name, string departmentManager, int numberOfEmployees, int numberOfProjects)
        {
            return new DepartmentInfo
            {
                Id = id,
                Name = name,
                DepartmentManager = departmentManager,
                NumberOfEmployees = numberOfEmployees,
                NumberOfProjects = numberOfProjects
            };
        }

        private EmployeeInfo CreateEmployeeInfo(int id, string name, string jobType, string position) {
            return new EmployeeInfo {
                Id = id,
                Name = name,
                JobType = jobType,
                Position = position
            };
        }

        private ProjectInfo CreateProjectInfo(int id, string name, string status) {
            return new ProjectInfo {
                Id = id,
                Name = name,
                Status = status
            };
        }
    }
}