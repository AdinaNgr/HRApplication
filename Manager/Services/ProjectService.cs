using System;
using AutoMapper;
using Contracts;
using Domain.Models;
using Manager.InfoModels;
using Manager.InputInfoModels;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using FluentValidation.Results;
using Manager.Validators;
using Domain.Extensions;
namespace Manager.Services
{
    public class ProjectService
    {
        private readonly IProjectRepository _projectRepository;
        private readonly IDepartmentRepository _departmentRepository;
        private readonly IMapper _mapper;
        private readonly AddProjectValidator _addProjectValidator;
        private readonly UpdateProjectValidator _updateProjectValidator;
        private readonly AddAssignmentValidator _addAssignmentValidator;

        public ProjectService(IMapper mapper, IProjectRepository projectRepository, IDepartmentRepository departmentRepository)
        {
            _projectRepository = projectRepository;
            _mapper = mapper;
            _departmentRepository = departmentRepository;

            _addProjectValidator = new AddProjectValidator();
            _updateProjectValidator = new UpdateProjectValidator();
            _addAssignmentValidator = new AddAssignmentValidator();
        }

        public OperationResult Add(AddProjectInputInfo infoInput)
        {
            var result = _addProjectValidator.Validate(infoInput);
            if (result.IsValid)
            {
                Project newProject = _mapper.Map<Project>(infoInput);
                newProject.Department = _departmentRepository.GetDepartmentById(infoInput.DepartmentId);
                _projectRepository.Add(newProject);

                return new OperationResult(true, Messages.SuccessfullyAddedProject);
            }
            return new OperationResult(false, Messages.ErrorWhileAddingProject);

        }

        public OperationResult AddAssignment(AddAssignmentInputInfo infoInput)
        {
            
            var result = _addAssignmentValidator.Validate(infoInput);
            if (result.IsValid)
            {
                Assignment newAssignment = _mapper.Map<Assignment>(infoInput);
                _projectRepository.AddAssignment(newAssignment);

                return new OperationResult(true, Messages.SuccessfullyAddedNewAssignment);
            }
            return new OperationResult(false, Messages.ErrorWhileAddingAssignment);

        }

        public OperationResult Delete(int projectId) {
            Project project = _projectRepository.GetById(projectId);
            if (project == null) {
                return new OperationResult(false, Messages.ErrorWhileDeletingProject);
            }
            _projectRepository.Delete(project);
            return new OperationResult(true, Messages.SuccessfullyDeletedProject);
        }

        public OperationResult DeleteEmployeeFromProject(int employeeId, int projectId)
        {
            Assignment assignment = _projectRepository.GetAssignmentById(employeeId, projectId);
            if (assignment == null)
            {
                return new OperationResult(false, Messages.ErrorWhileDeletingEmployeeFromProject);
            }
            _projectRepository.DeleteEmployeeFromProject(assignment);
            return new OperationResult(true, Messages.SuccessfullyDeletedEmployeeFromProject);
        }


        public OperationResult Update(UpdateProjectInputInfo inputInfo) {
            var result = _updateProjectValidator.Validate(inputInfo);
            if (result.IsValid)
            {
                var project = _projectRepository.GetById(inputInfo.Id);
                if (project == null)
                {
                    return new OperationResult(false, Messages.ErrorWhileUpdatingProject);
                }

                project.Name = inputInfo.Name;
                project.Duration = inputInfo.Duration;
                project.Status = inputInfo.Status;

                _projectRepository.Save();

                return new OperationResult(true, Messages.SuccessfullyUpdatedProject);
            }
            return new OperationResult(false, Messages.ErrorWhileDeletingProject);
           
        }

        public OperationResult EditAllocation(EditAllocationInputInfo inputInfo)
        {
            EditAllocationValidator validator = new EditAllocationValidator();
            var result = validator.Validate(inputInfo);
            if (result.IsValid)
            {
                Assignment assignment = _projectRepository.GetAssignmentById(inputInfo.employeeId, inputInfo.projectId);
                if (assignment == null)
                {
                    return new OperationResult(false, Messages.ErrorWhileEditingAllocation);
                }
                assignment.Allocation = inputInfo.Allocation;
                _projectRepository.Save();
                return new OperationResult(true, Messages.SuccessfullyEditedAllocation);
            }
            return new OperationResult(false, Messages.ErrorWhileEditingAllocation);
          
        }

        public IEnumerable<ProjectInfo> GetAll()
        {
            var projects = _projectRepository.GetAll();
            var projectsInfo = _mapper.Map<IEnumerable<ProjectInfo>>(projects);
            return projectsInfo;
        }
        public ProjectInfo GetById(int id)
        {

            Project project = _projectRepository.GetById(id);
            var newProject = _mapper.Map<ProjectInfo>(project);
            return newProject;

        }

        public IEnumerable<ProjectMemberInfo> GetMembersFromProject(int projectId, int pageSize, int pageNumber, string role="")
        {
            var assignments = _projectRepository.GetMembersFromProject(projectId, pageSize, pageNumber, role);
            var assignmentsInfo = _mapper.Map<IEnumerable<ProjectMemberInfo>>(assignments);

            return assignmentsInfo;
        }

        public int GetAllocationOfEmployeeFromProject(int projectId, int employeeId)
        {
            return _projectRepository.GetAllocationOfEmployeeFromProject(projectId, employeeId);
        }

        public int GetNrTeamMembers(int projectId)
        {
            return _projectRepository.GetNrTeamMembers(projectId);
        }


        public IEnumerable<StatusTypeInfo> GetStatusDescription()
        {
            var values = Enum.GetValues(typeof(Status));
            
            foreach (Status value in values)
            {
                yield return new StatusTypeInfo {Index = (int) value, Description = value.GetDescriptionFromEnumValue()};
            }

            //return from Status value in values
                //select new StatusTypeInfo {Index = (int)value, Description = value.GetDescriptionFromEnumValue()};
            
        }

      
      
    }
}
