using System;
using Domain.Models;

namespace Manager.InfoModels
{
    public class EmployeeInfo
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public DateTime EmploymentDate { get; set; }
        public DateTime ReleasedDate { get; set; }
        public string JobType { get; set; }
        public string Position { get; set; }
        public int Allocation { get; set; }
        public int RemainingAllocation { get; set; }
        public string Department { get; set; }  
    }
}
