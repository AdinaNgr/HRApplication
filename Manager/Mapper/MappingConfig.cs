using System.Linq;
using AutoMapper;
using Domain.Models;
using Manager.InfoModels;
using Manager.InputInfoModels;
using Domain.Extensions;

namespace Manager.Mapper
{
    public class MappingConfig: Profile
    {
        public MappingConfig()
        {
            CreateMap<Department, DepartmentInfo>()
            .ForMember(
                departmentInfo => departmentInfo.NumberOfEmployees, 
                department => department.MapFrom(src => src.Employees.Count))
            .ForMember(
                 departmentInfo => departmentInfo.NumberOfProjects,
                 department => department.MapFrom(src => src.Projects.Count))
            .ForMember(
                 departmentInfo => departmentInfo.DepartmentManager,
                 department => department.MapFrom(src => src.DepartmentManager.Name))
            .ForMember(
                 departmentInfo => departmentInfo.DepartmentManagerId,
                 department => department.MapFrom(src => src.DepartmentManager.Id)
            );
            CreateMap<AddDepartmentInputInfo, Department>();

            CreateMap<Office, OfficePartialInfo>();
            CreateMap<Office, OfficeImagePartialInfo>();
            CreateMap<Office, OfficeInfo>();
            CreateMap<AddOfficeInputInfo, Office>();
            CreateMap<UpdateOfficeInputInfo, Office>();

            CreateMap<Employee, EmployeeInfo>()
               /* .ForMember(
                    employeeInfo => employeeInfo.JobType,
                    employee => employee.MapFrom(src => src.JobType.ToString()))
                .ForMember(
                    employeeInfo => employeeInfo.Position,
                    employee => employee.MapFrom(src => src.Position.ToString()))
                    */
                .ForMember(
                    employeeInfo => employeeInfo.Allocation,
                    employee => employee.MapFrom(src => src.GetAllocation())
                )
                .ForMember(
                    employeeInfo => employeeInfo.RemainingAllocation,
                    employee => employee.MapFrom(src => src.GetRemainingAllocation())
                )
                .ForMember(
                    employeeInfo => employeeInfo.Department,
                    employee => employee.MapFrom(src => src.Department.Name)
                );

            CreateMap<AddEmployeeInputInfo, Employee>();

            CreateMap<Project, ProjectInfo>()
            .ForMember(
                projectInfo => projectInfo.NrMembers,
                project => project.MapFrom(src => src.Assignments.Count)
            )
            .ForMember(
                projectInfo => projectInfo.Status,
                project => project.MapFrom(src => src.Status.GetDescriptionFromEnumValue()));
            CreateMap<AddProjectInputInfo, Project>();
            CreateMap<Assignment, ProjectMemberInfo>()
                .ForMember(
                    assignmentInfo => assignmentInfo.Id,
                    assignment => assignment.MapFrom(src => src.EmployeeId)
                 )
                .ForMember(
                    assignmentInfo => assignmentInfo.Name,
                    assignment => assignment.MapFrom(src => src.Employee.Name))
                .ForMember(
                    assignmentInfo => assignmentInfo.Position,
                    assignment => assignment.MapFrom(src => src.Employee.Position.ToString()));
            CreateMap<AddAssignmentInputInfo, Assignment>();

        }

        #region helpers
        

        #endregion
    }
}