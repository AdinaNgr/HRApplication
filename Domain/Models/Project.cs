using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models
{
    public enum Status
    {
        [Description("Not Started Yet")]
        NotStartedYet,
        [Description("In Progress")]
        InProgress,
        [Description("On Hold")]
        OnHold,
        Finished,
    };
    public class Project
    {
        public Project()
        {
            this.Assignments = new List<Assignment>();
        }
        public int Id { get; set; }
        public string Name { get; set; }
        public virtual Department Department { get; set; }
        public virtual ICollection<Assignment> Assignments { get; set; }
        public string Duration { get; set; }
        public Status Status { get; set; }
    }
}
