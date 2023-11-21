using Equiprent.Entities.Business.Addresses;
using Equiprent.Logic.Commands.Addresses.Models;
using Equiprent.Logic.Infrastructure.FluentValidation;
using FluentValidation;

namespace Equiprent.Logic.Commands.Addresses.Validators
{
    public class ClientAddressValidator : AbstractValidator<ClientAddressModel>
    {
        public ClientAddressValidator() : base()
        {
            RuleFor(a => a.Email)
                .EmailAddress()
                .When(a => !string.IsNullOrEmpty(a.Email))
                .WithMessage(a => FluentValidationMessageCreator<Address>.CreateMessageForWrongEmailAddress(nameof(a.Email)));

            RuleFor(a => a.PhoneNumber)
                .Matches(RegexPatterns.PhoneNumberPattern)
                .When(a => !string.IsNullOrEmpty(a.PhoneNumber))
                .WithMessage(a => FluentValidationMessageCreator<Address>.CreateMessageForWrongEmailAddress(nameof(a.PhoneNumber)));

            RuleFor(a => a.StreetName)
               .NotEmpty()
               .WithMessage(a => FluentValidationMessageCreator<Address>.CreateMessageForEmptyPropertyValue(nameof(a.StreetName)));

            RuleFor(a => a.StreetNumber)
                .NotEmpty()
                    .WithMessage(a => FluentValidationMessageCreator<Address>.CreateMessageForEmptyPropertyValue(nameof(a.StreetNumber)))
                .Length(1, 50)
                    .WithMessage(a => FluentValidationMessageCreator<Address>.CreateMessageForExceedingTheRangeOfLengths(nameof(a.StreetNumber), possibleLengthsRange: new Range(1, 50)));

            RuleFor(a => a.NationalId)
                .NotEmpty()
                .WithMessage(r => FluentValidationMessageCreator<Address>.CreateMessageForEmptyPropertyValue(nameof(r.NationalId)));
        }
    }
}
