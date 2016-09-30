using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Models;

namespace Manager.InputInfoModels
{
    public class UpdateProjectInputInfo
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Duration { get; set; }
        public Status Status { get; set; }
    }
}
