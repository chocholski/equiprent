using Equiprent.Entities.Application.Users;
using Equiprent.Logic.Infrastructure.FluentValidation;
using FluentValidation;

namespace Equiprent.Logic.Commands.Users.Requests.Create
{
    public class CreateRequestValidator : AbstractValidator<CreateRequest>
    {
        public CreateRequestValidator() 
        {
            RuleFor(r => r.Email)
                .EmailAddress()
                    .When(r => !string.IsNullOrEmpty(r.Email))
                    .WithMessage(r => FluentValidationMessageCreator<User>.CreateMessageForWrongEmailAddress(nameof(r.Email)));

            RuleFor(r => r.FirstName)
                .NotEmpty()
                    .WithMessage(r => FluentValidationMessageCreator<User>.CreateMessageForEmptyPropertyValue(nameof(r.FirstName)))
                .Length(1, 200)
                    .WithMessage(r => FluentValidationMessageCreator<User>.CreateMessageForExceedingTheRangeOfLengths(nameof(r.FirstName), possibleLengthsRange: new Range(1, 200)))
                .Matches(RegexPatterns.NamePattern)
                    .WithMessage(r => FluentValidationMessageCreator<User>.CreateMessageForUnmatchingAllowedLetters(nameof(r.FirstName)));

            RuleFor(r => r.LanguageId)
                .NotEmpty()
                .WithMessage(r => FluentValidationMessageCreator<User>.CreateMessageForEmptyPropertyValue(nameof(r.LanguageId)));

            RuleFor(r => r.LastName)
                .NotEmpty()
                    .WithMessage(r => FluentValidationMessageCreator<User>.CreateMessageForEmptyPropertyValue(nameof(r.LastName)))
                .Length(1, 200)
                    .WithMessage(r => FluentValidationMessageCreator<User>.CreateMessageForExceedingTheRangeOfLengths(nameof(r.LastName), possibleLengthsRange: new Range(1, 200)))
                .Matches(RegexPatterns.NamePattern)
                    .WithMessage(r => FluentValidationMessageCreator<User>.CreateMessageForUnmatchingAllowedLetters(nameof(r.LastName)));

            RuleFor(r => r.Login)
                .NotEmpty()
                    .WithMessage(r => FluentValidationMessageCreator<User>.CreateMessageForEmptyPropertyValue(nameof(r.Login)))
                .Matches(RegexPatterns.LoginPattern)
                    .WithMessage(r => FluentValidationMessageCreator<User>.CreateMessageForUnmatchingSmallLetters(nameof(r.Login)));

            RuleFor(r => r.Password)
                .NotEmpty()
                    .WithMessage(r => FluentValidationMessageCreator<User>.CreateMessageForEmptyPropertyValue(nameof(r.Password)))
                .Length(8, 100)
                    .WithMessage(r => FluentValidationMessageCreator<User>.CreateMessageForExceedingTheRangeOfLengths(nameof(r.Password), possibleLengthsRange: new Range(8, 100)));

            RuleFor(r => r.UserRoleId)
                .NotEmpty()
                    .WithMessage(r => FluentValidationMessageCreator<User>.CreateMessageForEmptyPropertyValue(nameof(r.UserRoleId)));
        }
    }
}
