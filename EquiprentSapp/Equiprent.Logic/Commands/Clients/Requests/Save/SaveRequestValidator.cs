using Equiprent.Entities.Business.Clients;
using Equiprent.Logic.Commands.Addresses.Validators;
using Equiprent.Logic.Infrastructure.FluentValidation;
using FluentValidation;

namespace Equiprent.Logic.Commands.Clients.Requests.Save
{
    public class SaveRequestValidator : AbstractValidator<SaveRequest>
    {
        public SaveRequestValidator() 
        {
            RuleForEach(r => r.Addresses)
                .SetValidator(new AddressValidator());

            RuleFor(r => r.FirstName)
                .NotEmpty()
                .When(r => !string.IsNullOrEmpty(r.FirstName))
                .WithMessage(r => FluentValidationMessageCreator<Client>.CreateMessageForEmptyPropertyValue(nameof(r.FirstName)));

            RuleFor(r => r.LastName)
                .NotEmpty()
                .When(r => !string.IsNullOrEmpty(r.LastName))
                .WithMessage(r => FluentValidationMessageCreator<Client>.CreateMessageForEmptyPropertyValue(nameof(r.LastName)));

            RuleFor(r => r.Name)
                .NotEmpty()
                .WithMessage(r => FluentValidationMessageCreator<Client>.CreateMessageForEmptyPropertyValue(nameof(r.Name)));
        }
    }
}
