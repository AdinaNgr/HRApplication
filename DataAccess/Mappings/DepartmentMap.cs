using Domain.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Mappings {
    public class DepartmentMap: EntityTypeConfiguration<Department> {

        public DepartmentMap()
        {
            this.Property(t => t.Name)
                .IsRequired()
                .HasMaxLength(30);

            this.HasRequired(t => t.DepartmentManager)
                .WithMany();
        }
    }
}
