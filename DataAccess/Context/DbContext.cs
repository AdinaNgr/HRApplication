using Domain.Models;
using System.Data.Entity;
using DataAccess.Mappings;

namespace DataAccess.Context
{
    public class DbContext : System.Data.Entity.DbContext
    {
        public DbContext() : base("DbContext")
        {

        }
        public DbSet<Office> Offices { get; set; }
        public DbSet<Department> Departments { get; set; }
        public DbSet<Project> Projects { get; set; }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Assignment> Assignments { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Configurations.Add(new AssignmentMap());
            modelBuilder.Configurations.Add(new DepartmentMap());
            modelBuilder.Configurations.Add(new EmployeeMap());
            modelBuilder.Configurations.Add(new OfficeMap());
            modelBuilder.Configurations.Add(new ProjectMap());
        }


    }
}
