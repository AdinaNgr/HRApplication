namespace DataAccess.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class initial : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Assignments",
                c => new
                    {
                        EmployeeId = c.Int(nullable: false),
                        ProjectId = c.Int(nullable: false),
                        Allocation = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.EmployeeId, t.ProjectId })
                .ForeignKey("dbo.Employees", t => t.EmployeeId, cascadeDelete: true)
                .ForeignKey("dbo.Projects", t => t.ProjectId, cascadeDelete: true)
                .Index(t => t.EmployeeId)
                .Index(t => t.ProjectId);
            
            CreateTable(
                "dbo.Employees",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false, maxLength: 30),
                        Address = c.String(nullable: false, maxLength: 100),
                        EmploymentDate = c.DateTime(nullable: false),
                        ReleasedDate = c.DateTime(),
                        JobType = c.Int(nullable: false),
                        Position = c.Int(nullable: false),
                        Department_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Departments", t => t.Department_Id)
                .Index(t => t.Department_Id);
            
            CreateTable(
                "dbo.Departments",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false, maxLength: 30),
                        DepartmentManager_Id = c.Int(nullable: false),
                        Office_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Employees", t => t.DepartmentManager_Id, cascadeDelete: true)
                .ForeignKey("dbo.Offices", t => t.Office_Id)
                .Index(t => t.DepartmentManager_Id)
                .Index(t => t.Office_Id);
            
            CreateTable(
                "dbo.Offices",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false, maxLength: 30),
                        Address = c.String(nullable: false, maxLength: 100),
                        Phone = c.String(nullable: false, maxLength: 20),
                        Image = c.Binary(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Projects",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false, maxLength: 30),
                        Duration = c.String(),
                        Status = c.Int(nullable: false),
                        Department_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Departments", t => t.Department_Id)
                .Index(t => t.Department_Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Projects", "Department_Id", "dbo.Departments");
            DropForeignKey("dbo.Assignments", "ProjectId", "dbo.Projects");
            DropForeignKey("dbo.Departments", "Office_Id", "dbo.Offices");
            DropForeignKey("dbo.Employees", "Department_Id", "dbo.Departments");
            DropForeignKey("dbo.Departments", "DepartmentManager_Id", "dbo.Employees");
            DropForeignKey("dbo.Assignments", "EmployeeId", "dbo.Employees");
            DropIndex("dbo.Projects", new[] { "Department_Id" });
            DropIndex("dbo.Departments", new[] { "Office_Id" });
            DropIndex("dbo.Departments", new[] { "DepartmentManager_Id" });
            DropIndex("dbo.Employees", new[] { "Department_Id" });
            DropIndex("dbo.Assignments", new[] { "ProjectId" });
            DropIndex("dbo.Assignments", new[] { "EmployeeId" });
            DropTable("dbo.Projects");
            DropTable("dbo.Offices");
            DropTable("dbo.Departments");
            DropTable("dbo.Employees");
            DropTable("dbo.Assignments");
        }
    }
}
