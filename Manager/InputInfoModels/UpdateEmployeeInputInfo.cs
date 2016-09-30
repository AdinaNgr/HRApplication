using System;


namespace Manager.InputInfoModels
{
    public class UpdateEmployeeInputInfo
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public DateTime EmploymentDate { get; set; }
        public string JobType { get; set; }
        public string Position { get; set; }
        public int DepartmentId { get; set; }
    }
}
