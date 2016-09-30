using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models {
     public class Assignment {
        public int EmployeeId { get; set; }
        public int ProjectId { get; set; }
        public virtual Employee Employee { get; set; }
        public virtual Project Project { get; set; }
        public int Allocation { get; set; }
    }
}
