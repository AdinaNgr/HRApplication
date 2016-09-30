using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FluentValidation;
using Manager.InputInfoModels;

namespace Manager.Validators
{
    public class UpdateProjectValidator : AbstractValidator<UpdateProjectInputInfo>
    {
        public UpdateProjectValidator()
        {
            RuleFor(m => m.Id)
                .NotEmpty()
                .GreaterThan(0);

            RuleFor(m => m.Name).NotEmpty();
            RuleFor(m => m.Name.Length).LessThanOrEqualTo(30);

            RuleFor(m => m.Duration).NotEmpty();

            RuleFor(m => m.Status).NotNull();
        }
    }
}
