using Equiprent.Entities.Business.ClientRepresentatives;
using Equiprent.Logic.Commands.Addresses.Validators;
using Equiprent.Logic.Infrastructure.FluentValidation;
using FluentValidation;

namespace Equiprent.Logic.Commands.Clients.Requests.CreateClientRepresentative
{
    public class CreateRequestValidator : AbstractValidator<CreateRequest>
    {
        public CreateRequestValidator() 
        {
            RuleFor(r => r.Address)
                .SetValidator(new ClientRepresentativeAddressValidator());

            RuleFor(r => r.ClientId)
                .NotEmpty()
                .WithMessage(r => FluentValidationMessageCreator<ClientRepresentative>.CreateMessageForEmptyPropertyValue(nameof(r.ClientId)));

            RuleFor(r => r.FirstName)
                .NotEmpty()
                .WithMessage(r => FluentValidationMessageCreator<ClientRepresentative>.CreateMessageForEmptyPropertyValue(nameof(r.FirstName)));

            RuleFor(r => r.LastName)
                .NotEmpty()
                .WithMessage(r => FluentValidationMessageCreator<ClientRepresentative>.CreateMessageForEmptyPropertyValue(nameof(r.LastName)));
        }
    }
}
