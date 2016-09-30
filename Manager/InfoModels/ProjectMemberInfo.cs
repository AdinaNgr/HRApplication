using Domain.Models;
using System;
using System.Collections.Generic;
namespace Manager.InfoModels
{
    public class ProjectMemberInfo
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Position { get; set; }
        public int Allocation { get; set; }
    }
}
