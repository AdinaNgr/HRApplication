using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FluentValidation;
using Manager.InputInfoModels;

namespace Manager.Validators
{
    public class AddOfficeValidator : AbstractValidator<AddOfficeInputInfo>
    {
        public AddOfficeValidator()
        {
            RuleFor(m => m.Name).NotEmpty();
            RuleFor(m => m.Name.Length).LessThanOrEqualTo(30);

            RuleFor(m => m.Address).NotEmpty();
            RuleFor(m => m.Address.Length).LessThanOrEqualTo(100);

            RuleFor(m => m.Image).NotEmpty();

            RuleFor(m => m.Phone).NotEmpty();
            RuleFor(m => m.Phone.Length)
                .GreaterThanOrEqualTo(10)
                .LessThanOrEqualTo(14);
        }
    }
}
