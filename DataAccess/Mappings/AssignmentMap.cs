using Domain.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Mappings {
    public class AssignmentMap: EntityTypeConfiguration<Assignment> {

        public AssignmentMap()
        {
            this.HasKey(t => new { t.EmployeeId, t.ProjectId });
        }

    }
}
