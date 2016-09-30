using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Remoting.Messaging;
using Contracts;
using DataAccess.Context;
using Domain.Models;

namespace DataAccess.Repositories
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly DbContext _context;

        public EmployeeRepository(DbContext context)
        {
            _context = context;
        }

        public IEnumerable<Employee> GetAll()
        {
            return _context.Employees.ToArray();
        }

        public IEnumerable<Employee> GetDepartmentManagers()
        {
            return _context.Employees.Where(e => e.Position == Position.DepartmentManager).ToArray();
        }

        public Employee GetById(int id)
        {
            return _context.Employees.SingleOrDefault(d=>d.Id == id);
        }

        public void Add(Employee employee)
        {
            employee.EmploymentDate = DateTime.Now;
            _context.Employees.Add(employee);
            _context.SaveChanges();
        }
        
        public void Save()
        {
            _context.SaveChanges();
        }

        public void Delete(int employeeId, DateTime releaseDate)
        {
            var employee = GetById(employeeId);
            employee.ReleasedDate = releaseDate;
            Save();
        }

    }
}
