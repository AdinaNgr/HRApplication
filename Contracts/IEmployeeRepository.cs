using System.Collections.Generic;
using System;
using Domain.Models;

namespace Contracts
{
    public interface IEmployeeRepository
    {
        IEnumerable<Employee> GetAll();
        IEnumerable<Employee> GetDepartmentManagers(); 
        Employee GetById(int id);
        void Add(Employee department);
        void Save();
        void Delete(int employeeId, DateTime releaseDate);
    }
}
