using Equiprent.Entities.Business.Clients.Representatives;
using Equiprent.Logic.GeneralModels;
using Equiprent.Logic.Infrastructure.FluentValidation;
using FluentValidation;

namespace Equiprent.Logic.Commands.Addresses.Validators
{
    public class ClientRepresentativeAddressValidator : AbstractValidator<AddressModel>
    {
        public ClientRepresentativeAddressValidator()
        {
            RuleFor(a => a.City)
                .NotEmpty()
                    .WithMessage(a => FluentValidationMessageCreator<ClientRepresentative>.CreateMessageForEmptyPropertyValue(nameof(a.City)))
                .Length(1, 200)
                    .WithMessage(a => FluentValidationMessageCreator<ClientRepresentative>.CreateMessageForExceedingTheRangeOfLengths(nameof(a.City), new Range(1, 200)));

            RuleFor(a => a.Email)
                .NotEmpty()
                    .WithMessage(a => FluentValidationMessageCreator<ClientRepresentative>.CreateMessageForEmptyPropertyValue(nameof(a.Email)))
                .EmailAddress()
                    .WithMessage(a => FluentValidationMessageCreator<ClientRepresentative>.CreateMessageForWrongEmailAddress(nameof(a.Email)));

            RuleFor(a => a.PhoneNumber)
                .NotEmpty()
                    .WithMessage(a => FluentValidationMessageCreator<ClientRepresentative>.CreateMessageForEmptyPropertyValue(nameof(a.PhoneNumber)))
                .Matches(RegexPatterns.PhoneNumberPattern)
                    .WithMessage(a => FluentValidationMessageCreator<ClientRepresentative>.CreateMessageForWrongEmailAddress(nameof(a.PhoneNumber)));

            RuleFor(a => a.PostalCode)
                .NotEmpty()
                    .WithMessage(a => FluentValidationMessageCreator<ClientRepresentative>.CreateMessageForEmptyPropertyValue(nameof(a.PostalCode)))
                .Length(1, 7)
                    .WithMessage(a => FluentValidationMessageCreator<ClientRepresentative>.CreateMessageForExceedingTheRangeOfLengths(nameof(a.PostalCode), possibleLengthsRange: new Range(1, 7)));

            RuleFor(a => a.StreetName)
               .NotEmpty()
               .WithMessage(a => FluentValidationMessageCreator<ClientRepresentative>.CreateMessageForEmptyPropertyValue(nameof(a.StreetName)));

            RuleFor(a => a.StreetNumber)
                .NotEmpty()
                    .WithMessage(a => FluentValidationMessageCreator<ClientRepresentative>.CreateMessageForEmptyPropertyValue(nameof(a.StreetNumber)))
                .Length(1, 50)
                    .WithMessage(a => FluentValidationMessageCreator<ClientRepresentative>.CreateMessageForExceedingTheRangeOfLengths(nameof(a.StreetNumber), possibleLengthsRange: new Range(1, 50)));
        }
    }
}
