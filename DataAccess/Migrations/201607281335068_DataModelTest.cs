namespace DataAccess.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class DataModelTest : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Departments",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        OfficeId = c.Int(nullable: false),
                        DepartmentManager_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Employees", t => t.DepartmentManager_Id)
                .ForeignKey("dbo.Offices", t => t.OfficeId, cascadeDelete: true)
                .Index(t => t.OfficeId)
                .Index(t => t.DepartmentManager_Id);
            
            CreateTable(
                "dbo.Employees",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Adress = c.String(),
                        EmploymentDate = c.DateTime(nullable: false),
                        ReleaseDate = c.DateTime(nullable: false),
                        EmploymentHours = c.Int(nullable: false),
                        PositionId = c.Int(nullable: false),
                        Department_Id = c.Int(),
                        Department_Id1 = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Departments", t => t.Department_Id)
                .ForeignKey("dbo.Positions", t => t.PositionId, cascadeDelete: true)
                .ForeignKey("dbo.Departments", t => t.Department_Id1)
                .Index(t => t.PositionId)
                .Index(t => t.Department_Id)
                .Index(t => t.Department_Id1);
            
            CreateTable(
                "dbo.Positions",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.ProjectAllocations",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        AllocationPercentage = c.Int(nullable: false),
                        ProjectId = c.Int(nullable: false),
                        EmployeeId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Employees", t => t.EmployeeId, cascadeDelete: true)
                .ForeignKey("dbo.Projects", t => t.ProjectId, cascadeDelete: true)
                .Index(t => t.ProjectId)
                .Index(t => t.EmployeeId);
            
            CreateTable(
                "dbo.Projects",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Status = c.String(),
                        Duration = c.Int(),
                        DepartmentId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Departments", t => t.DepartmentId, cascadeDelete: true)
                .Index(t => t.DepartmentId);
            
            CreateTable(
                "dbo.Offices",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Address = c.String(),
                        Phone = c.String(),
                        Image = c.Binary(),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Departments", "OfficeId", "dbo.Offices");
            DropForeignKey("dbo.Employees", "Department_Id1", "dbo.Departments");
            DropForeignKey("dbo.Departments", "DepartmentManager_Id", "dbo.Employees");
            DropForeignKey("dbo.Projects", "DepartmentId", "dbo.Departments");
            DropForeignKey("dbo.ProjectAllocations", "ProjectId", "dbo.Projects");
            DropForeignKey("dbo.ProjectAllocations", "EmployeeId", "dbo.Employees");
            DropForeignKey("dbo.Employees", "PositionId", "dbo.Positions");
            DropForeignKey("dbo.Employees", "Department_Id", "dbo.Departments");
            DropIndex("dbo.Projects", new[] { "DepartmentId" });
            DropIndex("dbo.ProjectAllocations", new[] { "EmployeeId" });
            DropIndex("dbo.ProjectAllocations", new[] { "ProjectId" });
            DropIndex("dbo.Employees", new[] { "Department_Id1" });
            DropIndex("dbo.Employees", new[] { "Department_Id" });
            DropIndex("dbo.Employees", new[] { "PositionId" });
            DropIndex("dbo.Departments", new[] { "DepartmentManager_Id" });
            DropIndex("dbo.Departments", new[] { "OfficeId" });
            DropTable("dbo.Offices");
            DropTable("dbo.Projects");
            DropTable("dbo.ProjectAllocations");
            DropTable("dbo.Positions");
            DropTable("dbo.Employees");
            DropTable("dbo.Departments");
        }
    }
}
