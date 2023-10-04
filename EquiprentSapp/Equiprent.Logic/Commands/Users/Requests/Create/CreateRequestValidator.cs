using FluentValidation;

namespace Equiprent.Logic.Commands.Users.Requests.Create
{
    public class CreateRequestValidator : AbstractValidator<CreateRequest>
    {
        public CreateRequestValidator() 
        {
            RuleFor(r => r.Email)
                .EmailAddress()
                    .When(r => !string.IsNullOrEmpty(r.Email));

            RuleFor(r => r.FirstName)
                .NotEmpty()
                .Length(1, 200)
                .Matches(RegexPatterns.NamePattern);

            RuleFor(r => r.LanguageId)
                .NotEmpty();

            RuleFor(r => r.LastName)
                .NotEmpty()
                .Length(1, 200)
                .Matches(RegexPatterns.NamePattern);

            RuleFor(r => r.Login)
                .NotEmpty()
                .Matches("[a-z]+");

            RuleFor(r => r.Password)
                .NotEmpty()
                .Length(8, 100);

            RuleFor(r => r.UserRoleId)
                .NotEmpty();
        }
    }
}
