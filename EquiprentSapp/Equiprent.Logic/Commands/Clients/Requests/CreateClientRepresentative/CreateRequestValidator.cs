using Equiprent.ApplicationInterfaces.CommandResults;
using Equiprent.Data.DbContext;
using Equiprent.Entities.Business.ClientRepresentatives;
using Equiprent.Logic.Abstractions;
using Equiprent.Logic.Commands.Addresses.Validators;
using Equiprent.Logic.Infrastructure.FluentValidation;
using FluentValidation;

namespace Equiprent.Logic.Commands.Clients.Requests.CreateClientRepresentative
{
    public class CreateRequestValidator : RequestValidator<CreateRequest>
    {
        public CreateRequestValidator(ApplicationDbContext dbContext, IServiceProvider serviceProvider) : base(dbContext, serviceProvider)
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



        protected override CommandResult ValidateRequestWithDatabase(CreateRequest request)
        {
            if (_dbContext.ClientRepresentatives
                .Include(representative => representative.Address)
                .Any(representative =>
                    representative.ClientId == request.ClientId &&
                    !representative.IsDeleted &&
                    representative.LastName == request.LastName &&
                    representative.FirstName == request.FirstName &&
                    representative.Address!.Email == request.Address.Email &&
                    representative.Address!.PhoneNumber == request.Address.PhoneNumber))
            {
                return CommandResult.ClientRepresentative_RepresentativeExists;
            }

            return CommandResult.OK;
        }
    }
}
