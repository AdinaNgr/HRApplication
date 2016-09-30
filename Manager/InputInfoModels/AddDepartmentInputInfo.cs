using Domain.Models;

namespace Manager.InputInfoModels
{
    public class AddDepartmentInputInfo
    {
        public string Name { get; set; }
        public int DepartmentManagerId { get; set; }
        public int OfficeId { get; set; }
    }
}
