using System;
using Domain.Models;

namespace Manager.InputInfoModels
{
    public class AddProjectInputInfo
    {
        public string Name { get; set; }
        public int DepartmentId { get; set; }
        public string Duration { get; set; }
        public string Status { get; set; }
    }
}
