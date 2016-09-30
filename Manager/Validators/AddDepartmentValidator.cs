using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Models;
using FluentValidation;
using Manager.InfoModels;
using Manager.InputInfoModels;

namespace Manager.Validators
{
    public class AddDepartmentValidator : AbstractValidator<AddDepartmentInputInfo>
    {
        public AddDepartmentValidator()
        {
            RuleFor(m => m.Name).NotEmpty();
            RuleFor(m => m.Name.Length).LessThanOrEqualTo(30);

            RuleFor(m => m.DepartmentManagerId)
                .NotEmpty()
                .GreaterThan(0);

            RuleFor(m => m.OfficeId)
                .NotEmpty()
                .GreaterThan(0);
        }
    }
}
