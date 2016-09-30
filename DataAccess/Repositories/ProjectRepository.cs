using System.Collections.Generic;
using System.Linq;
using Contracts;
using DataAccess.Context;
using Domain.Models;
using System;
using System.Runtime.InteropServices;
using DataAccess.Extensions;

namespace DataAccess.Repositories
{
    public class ProjectRepository : IProjectRepository
    {
        private readonly DbContext _context;

        public ProjectRepository(DbContext context)
        {
            _context = context;
        }

        public void Add(Project project)
        {
            _context.Projects.Add(project);
            Save();
        }

        public void AddAssignment(Assignment assignment)
        {
            _context.Assignments.Add(assignment);
            Save();
        }
        public void Delete(Project project) {
            _context.Projects.Remove(project);
            _context.SaveChanges();
        }
        public void DeleteEmployeeFromProject(Assignment assignment)
        {
            _context.Assignments.Remove(assignment);
            _context.SaveChanges();
        }

        public Assignment GetAssignmentById(int employeeId, int projectId)
        {
            return _context.Assignments.SingleOrDefault(a => a.ProjectId == projectId && a.EmployeeId == employeeId);
        }

        public void Save()
        {
            _context.SaveChanges();
        }

        public IEnumerable<Project> GetAll()
        {
            return _context.Projects.Paginate(5, 1).ToArray();
        }
        public Project GetById(int id)
        {
            return _context.Projects.SingleOrDefault(p => p.Id == id);
        }

        public IEnumerable<Assignment> GetMembersFromProject(int projectId, int pageSize, int pageNumber, string role="")

        {
            return _context.Assignments.Where(ep => (ep.ProjectId == projectId) && (((!role.Equals("")) && ep.Employee.Position.ToString() == role) || role.Equals(""))).OrderBy(ep =>ep.Project.Id).Paginate(pageSize, pageNumber).ToArray();
        }

        public int GetAllocationOfEmployeeFromProject(int projectId, int employeeId)
        {
            Assignment assignment = _context.Assignments.SingleOrDefault(ep => ep.ProjectId == projectId && ep.EmployeeId ==employeeId);
            return assignment.Allocation;
        }

        public int GetNrTeamMembers(int projectId)
        {
            var assignments = _context.Assignments.Where(asgn => asgn.ProjectId == projectId);
            int nr = assignments.Count();
            return nr;

        }
       

      

    }

}
