using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FluentValidation;
using Manager.InputInfoModels;

namespace Manager.Validators
{
    public class UpdateDepartmentValidator: AbstractValidator<UpdateDepartmentInputInfo>
    {
        public UpdateDepartmentValidator()
        {
            RuleFor(m => m.Id)
                .NotEmpty()
                .GreaterThan(0);

            RuleFor(m => m.Name).NotEmpty();
            RuleFor(m => m.Name.Length).LessThanOrEqualTo(30);

            RuleFor(m => m.DepartmentManagerId)
                .NotEmpty()
                .GreaterThan(0);
        }
    }
}
