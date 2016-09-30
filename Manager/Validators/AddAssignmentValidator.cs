using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FluentValidation;
using Manager.InputInfoModels;

namespace Manager.Validators
{
    public class AddAssignmentValidator : AbstractValidator<AddAssignmentInputInfo>
    {
        public AddAssignmentValidator()
        {
            RuleFor(m => m.Allocation).NotEmpty();
            RuleFor(m => m.ProjectId).NotEmpty();
            RuleFor(m => m.EmployeeId).NotEmpty();
        }
    }
}
