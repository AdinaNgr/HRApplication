namespace Manager.InfoModels
{
    public class DepartmentInfo
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string DepartmentManager { get; set; }
        public int DepartmentManagerId { get; set; }
        public int NumberOfEmployees { get; set; }
        public int NumberOfProjects { get; set; }
    }
}
