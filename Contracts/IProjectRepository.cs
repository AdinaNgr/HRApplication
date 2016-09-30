using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Models;
using System.Runtime.InteropServices;

namespace Contracts
{
    public interface IProjectRepository
    {
        void Add(Project project);
        void AddAssignment(Assignment assignment);
        void Delete(Project project);
        void DeleteEmployeeFromProject(Assignment assignment);
        Assignment GetAssignmentById(int employeeId, int projectId);
        void Save();
        IEnumerable<Project> GetAll();
        Project GetById(int id);
        IEnumerable<Assignment> GetMembersFromProject(int projectId, int pageSize, int pageNumber, string role="");
        int GetAllocationOfEmployeeFromProject(int projectId, int employeeId);
        int GetNrTeamMembers(int projectId);

    }
}
