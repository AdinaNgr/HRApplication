using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using Contracts;
using DataAccess.Extensions;
using Domain.Models;
using DbContext = DataAccess.Context.DbContext;

namespace DataAccess.Repositories
{
    public class DepartmentRepository: IDepartmentRepository
    {
        private readonly DbContext _context;

        public DepartmentRepository(DbContext context)
        {
            _context = context;
        }

        public IEnumerable<Department> GetAllDepartments()
        {
            return _context.Departments.ToArray();
        }

        public Department GetDepartmentById(int departmentId)
        {
            return _context.Departments.SingleOrDefault(d=>d.Id == departmentId);
        }

        public int CountAllMembersOfADepartment(int departmentId, string name = "", int? jobType = null, int? position = null, int? allocation = null) {
            var department = GetDepartmentById(departmentId);
            return department.Employees.AsQueryable()

                .Where(
                    x =>
                        (((!name.Equals("") && x.Name.Contains(name)) || name.Equals("")) &&
                         ((jobType.HasValue && (int)x.JobType == jobType) || !jobType.HasValue) &&
                         ((position.HasValue && (int)x.Position == position) || !position.HasValue) &&
                         ((allocation.HasValue && x.GetAllocation() == allocation) || !allocation.HasValue)))
                .OrderBy(x => x.Id).Count();
        }

        public IEnumerable<Employee> GetMembersOfDepartment(int departmentId, int pageSize, int pageNumber, string name = "", int? jobType = null, int? position = null, int? allocation = null)
        {
            var department = GetDepartmentById(departmentId);
            return department.Employees.AsQueryable()

                .Where(
                    x =>
                        (((!name.Equals("") && x.Name.Contains(name)) || name.Equals("")) &&
                         ((jobType.HasValue && (int)x.JobType == jobType) || !jobType.HasValue) &&
                         ((position.HasValue && (int)x.Position == position) || !position.HasValue) &&
                         ((allocation.HasValue && x.GetAllocation() == allocation) || !allocation.HasValue)))
                .OrderBy(x => x.Id)
                .Paginate(pageSize, pageNumber)
                .ToArray();
        }

        public IEnumerable<Project> GetProjectsOfDepartment(int departmentId, int pageSize, int pageNumber, int? status = null)
        {
            var department = GetDepartmentById(departmentId);
            return department.Projects.AsQueryable()
                .Where(
                    p => ((status.HasValue && (int)p.Status == status) || !status.HasValue)
                )
                .OrderBy(p => p.Id)
                .Paginate(pageSize, pageNumber)
                .ToArray();
        }

        public IEnumerable<Project> FilterProjectsOfADepartmentByStatus(int departmentId, string status)
        {
            return _context.Projects.Where(p => p.Department.Id == departmentId && p.Status.ToString() == status).ToArray();
        }
        public void AddDepartment(Department department)
        {
            _context.Departments.Add(department);
            Save();
        }

        public void Save()
        {
            _context.SaveChanges();
        }

        public int GetTotalNumberOfProjectsFromDepartment(int departmentId)
        {
            return _context.Projects.Where(p => p.Department.Id == departmentId).Count();
        }
    }
}
