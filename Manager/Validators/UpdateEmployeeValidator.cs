using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FluentValidation;
using Manager.InputInfoModels;
using Manager.Validators;

namespace Manager.Validators
{
    public class UpdateEmployeeValidator : AbstractValidator<UpdateEmployeeInputInfo>
    {
        public UpdateEmployeeValidator()
        {
            RuleFor(m => m.Id)
                .NotEmpty()
                .GreaterThan(0);

            RuleFor(m => m.Name).NotEmpty();
            RuleFor(m => m.Name.Length).LessThanOrEqualTo(30);
        }
    }
}
