using System.Collections.Generic;
using Domain.Models;

namespace DataAccess.Migrations {
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<DataAccess.Context.DbContext> {
        public Configuration() {
            AutomaticMigrationsEnabled = true;
        }

        protected override void Seed(DataAccess.Context.DbContext context) {

            Office office1 = new Office() {
                Name = "Alpha",
                Address = "San Jose, California",
                Phone = "400684315332",
                Image= "data:image/jpeg;base64,/9j/"
            };

            Office office2 = new Office() {
                Name = "Beta",
                Address = "Charlington, Hungary",
                Phone = "0846598555",
                Image= "data:image/jpeg;base64,/9j/"
            };

            Office office3 = new Office() {
                Name = "Gamma",
                Address = "Bucharest, Romania",
                Phone = "0754668995",
                Image= "data:image/jpeg;base64,/9j/"
            };
            Office office4 = new Office()
            {
                Name = "Delta",
                Address = "Xian Hua, China",
                Phone = "0085684311",
                Image= "data:image/jpeg;base64,/9j/"
            };
            Office office5 = new Office()
            {
                Name = "Main",
                Address = "Cluj-Napoca, Romania",
                Phone = "0744688795",
                Image= "data:image/jpeg;base64,/9j/"
            };


            Employee departmentManager = new Employee() {
                Name = "DepartmentManager",
                Address = "DepartmentManagerAddress",
                EmploymentDate = new DateTime(2016, 1, 1),
                JobType = JobTypes.fullTime,
                Position = Position.DepartmentManager
            };

            Department department1 = new Department() {
                Name = "Department1",
                DepartmentManager = departmentManager,
                Office = office1
            };

            Department department2 = new Department() {
                Name = "Department2",
                DepartmentManager = departmentManager,
                Office = office1
            };

            Department department3 = new Department() {
                Name = "Department3",
                DepartmentManager = departmentManager,
                Office = office2
            };


            Employee employee2 = new Employee() {
                Name = "Employee2",
                Address = "Address2",
                EmploymentDate = new DateTime(2016, 2, 2),
                Department = department1,
                JobType = JobTypes.fullTime,
                Position = Position.Developer
            };

            Employee employee3 = new Employee() {
                Name = "Employee3",
                Address = "Address3",
                EmploymentDate = new DateTime(2016, 3, 3),
                Department = department1,
                JobType = JobTypes.fullTime,
                Position = Position.QA
            };

            Employee employee4 = new Employee() {
                Name = "Employee4",
                Address = "Address4",
                EmploymentDate = new DateTime(2016, 4, 4),
                Department = department1,
                JobType = JobTypes.fullTime,
                Position = Position.Developer
            };
            Employee employee5 = new Employee()
            {
                Name = "Employee4",
                Address = "Address4",
                EmploymentDate = new DateTime(2016, 4, 4),
                Department = department1,
                JobType = JobTypes.fullTime,
                Position = Position.Developer
            };


            Project project1 = new Project() {
                Name = "Project1",
                Duration = "variable",
                Status = Status.NotStartedYet,
                Department = department1
            };

            Project project2 = new Project() {
                Name = "Project2",
                Duration = "3 months",
                Status = Status.NotStartedYet,
                Department = department1
            };

            Project project3 = new Project() {
                Name = "Project3",
                Duration = "4 months",
                Status = Status.InProgress,
                Department = department2
            };


            Assignment assignment1 = new Assignment() {
                Employee = employee2,
                Project = project1,
                Allocation = 50
            };

            Assignment assignment2 = new Assignment() {
                Employee = employee2,
                Project = project2,
                Allocation = 30
            };

            Assignment assignment3 = new Assignment() {
                Employee = employee3,
                Project = project3,
                Allocation = 30
            };

            Assignment assignment4 = new Assignment()
            {
                Employee = employee4,
                Project = project1,
                Allocation = 30
            };


            context.Offices.AddOrUpdate(
                p => p.Id,
                office1,
                office2,
                office3,
                office4,
                office5
                );

            context.Employees.AddOrUpdate(
                p => p.Id,
                departmentManager,
                employee2,
                employee3,
                employee4
                );

            context.Departments.AddOrUpdate(
                p => p.Id,
                department1,
                department2,
                department3
                );

            context.Projects.AddOrUpdate(
                p => p.Id,
                project1,
                project2,
                project3
                );

            context.Assignments.AddOrUpdate(
                p => new { p.EmployeeId, p.ProjectId },
                assignment1,
                assignment2,
                assignment3,
                assignment4
                );

            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data. E.g.
            //
            //    context.People.AddOrUpdate(
            //      p => p.FullName,
            //      new Person { FullName = "Andrew Peters" },
            //      new Person { FullName = "Brice Lambson" },
            //      new Person { FullName = "Rowan Miller" }
            //    );
            //
        }
    }
}
