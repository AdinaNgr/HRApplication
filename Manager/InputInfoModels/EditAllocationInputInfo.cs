using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Manager.InputInfoModels
{
   public class EditAllocationInputInfo
    {
       public int projectId { get; set; }
       public int employeeId { get; set; }
       public int Allocation { get; set; }
    }
}
