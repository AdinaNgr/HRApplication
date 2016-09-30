using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Manager.InputInfoModels
{
    public class AddAssignmentInputInfo
    {
        public int EmployeeId { get; set; }
        public int ProjectId { get; set; }
        public int Allocation { get; set; }
    }
}
