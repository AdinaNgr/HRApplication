using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FluentValidation;
using Manager.InputInfoModels;

namespace Manager.Validators
{
    public class EditAllocationValidator : AbstractValidator<EditAllocationInputInfo>
    {
        public EditAllocationValidator()
        {
            RuleFor(m => m.projectId)
                .NotEmpty()
                .GreaterThan(0);

            RuleFor(m => m.employeeId)
                .NotEmpty()
                .GreaterThan(0);

            RuleFor(m => m.Allocation).NotNull()
                                      .GreaterThanOrEqualTo(0)
                                      .LessThanOrEqualTo(100);
        }
    }
}
