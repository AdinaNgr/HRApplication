using Domain.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Mappings {
    public class OfficeMap: EntityTypeConfiguration<Office> {

        public OfficeMap()
        {
            // Properties
            this.Property(t => t.Name)
                .IsRequired()
                .HasMaxLength(30);

            this.Property(t => t.Address)
                .IsRequired()
                .HasMaxLength(100);

            this.Property(t => t.Phone)
                .IsRequired()
                .HasMaxLength(20);

            this.Property(t => t.Image)
                .IsRequired();
        }
    }
}
