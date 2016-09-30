using System;
using System.Collections.Generic;
using System.Data.Entity.Core.Objects;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;
using Contracts;
using DataAccess.Context;
using DataAccess.Extensions;
using Domain.Models;

namespace DataAccess.Repositories
{
    public class OfficeRepository: IOfficeRepository
    {
        private readonly DbContext _context;

        public OfficeRepository(DbContext context)
        {
            _context = context;
        }

        public IEnumerable<Office> GetAll()
        {
            return _context.Offices.ToArray();
        }

        public Office GetById(int id)
        {
            return _context.Offices.SingleOrDefault(o => o.Id == id);
        }

        public int CountAllDepartmentsOfAnOffice(int officeId)
        {
            return
                _context.Departments.Where(d => d.Office.Id == officeId)
                    .OrderBy(d => d.Id).Count();
        }

        public IEnumerable<Department> GetAllDepartmentsOfAnOffice(int officeId, int pageSize, int pageNumber)
        {
            var office = GetById(officeId);
            return office.Departments.AsQueryable()
                .OrderBy(d => d.Id)
                .Paginate(pageSize, pageNumber)
                .ToArray();
        }

        public IEnumerable<Employee> GetAllAvailableEmployeesOfAnOffice(int projectId, int officeId, int pageSize, int pageNumber, int? department = null, int? position = null)
        {
            return _context.Employees
                .Where(e =>
                    (e.Department.Office.Id == officeId) &&
                    ((department.HasValue && e.Department.Id == department) || !department.HasValue) &&
                    ((position.HasValue && (int)e.Position == position) || !position.HasValue)
                )
                .Join(_context.Assignments,
                    employee => employee.Id, assignment => assignment.EmployeeId,
                    (employee, assignment) => new
                    {
                        employee,
                        assignment
                    }
                )
               
                .GroupBy(x => x.employee)
                .Select(g => new {
                    Employee = g.Key,
                    Allocation = g.Sum(x => x.assignment.Allocation)
                })
                .Where(x => x.Allocation < 100)
                .OrderBy(x => x.Employee.Id)
                .Paginate(pageSize, pageNumber)
                .ToArray().Select(x => x.Employee)
                .Where(e => e.Assignments.Where(a => a.ProjectId == projectId).Count() == 0);

           
        }

        public void Add(Office office)
        {
            _context.Offices.Add(office);
            Save();
        }

        public void Save()
        {
            _context.SaveChanges();
        }

    }
}
