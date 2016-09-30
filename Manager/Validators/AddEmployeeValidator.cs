using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FluentValidation;
using Manager.InputInfoModels;

namespace Manager.Validators
{
    public class AddEmployeeValidator:AbstractValidator<AddEmployeeInputInfo>
    {
        public AddEmployeeValidator()
        {
            RuleFor(m => m.Name).NotEmpty();
            RuleFor(m => m.Name.Length).LessThanOrEqualTo(30);

            RuleFor(m => m.Address).NotEmpty();
            RuleFor(m => m.Address.Length).LessThanOrEqualTo(100);
        }
    }
}
