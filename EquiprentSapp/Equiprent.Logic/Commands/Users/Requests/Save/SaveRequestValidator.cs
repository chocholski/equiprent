using FluentValidation;

namespace Equiprent.Logic.Commands.Users.Requests.Save
{
    public class SaveRequestValidator : AbstractValidator<SaveRequest>
    {
        public SaveRequestValidator() 
        {
            RuleFor(r => r.Email)
                .EmailAddress()
                    .When(r => !string.IsNullOrEmpty(r.Email));

            RuleFor(r => r.FirstName)
                .NotEmpty()
                .Length(1, 200)
                .Matches(RegexPatterns.NamePattern);

            RuleFor(r => r.LastName)
                .NotEmpty()
                .Length(1, 200)
                .Matches(RegexPatterns.NamePattern);

            RuleFor(r => r.Password)
                .Length(8, 100)
                    .When(r => !string.IsNullOrEmpty(r.Password));

            RuleFor(r => r.UserRoleId)
                .NotEmpty();
        }
    }
}
