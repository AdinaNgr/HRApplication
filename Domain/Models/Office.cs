using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models
{
    public class Office
    {
        public Office()
        {
            this.Departments = new List<Department>();
        }
        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public virtual ICollection<Department> Departments { get; set; }
        public string Phone { get; set; }
        public string Image { get; set; }
    }
}
