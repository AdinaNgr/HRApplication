using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models {
    public enum Position
    {
        Developer,
        [Description("Project Manager")]
        ProjectManager,
        QA,
        [Description("Department Manager")]
        DepartmentManager
    };
    public enum JobTypes
    {
        [Description("Part time (4 hours)")]
        partTime4,
        [Description("Part time (6 hours)")]
        partTime6,
        [Description("Full time")]
        fullTime
    };
    public class Employee {
        public Employee()
        {
            this.Assignments = new List<Assignment>();
        }
        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public virtual ICollection<Assignment> Assignments { get; set; }
        public DateTime EmploymentDate { get; set; }
        public DateTime? ReleasedDate { get; set; }
        public JobTypes JobType { get; set; }
        public Position Position { get; set; }
        public virtual Department Department { get; set; }

        public int GetRemainingAllocation() {
            return 100 - GetAllocation();
        }

        public int GetAllocation() {
            int totalAllocation = 0;
            foreach (var assignment in Assignments) {
                totalAllocation += assignment.Allocation;
            }
            return totalAllocation;
        }
    }
}
