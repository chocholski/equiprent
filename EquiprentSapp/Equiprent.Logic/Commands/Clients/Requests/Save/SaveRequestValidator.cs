using Equiprent.ApplicationInterfaces.CommandResults;
using Equiprent.Data.DbContext;
using Equiprent.Entities.Business.Clients;
using Equiprent.Entities.Enums;
using Equiprent.Logic.Abstractions;
using Equiprent.Logic.Commands.Addresses.Validators;
using Equiprent.Logic.Infrastructure.FluentValidation;
using FluentValidation;

namespace Equiprent.Logic.Commands.Clients.Requests.Save
{
    public class SaveRequestValidator : RequestValidator<SaveRequest>
    {
        public SaveRequestValidator(ApplicationDbContext dbContext, IServiceProvider serviceProvider) : base(dbContext, serviceProvider) 
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

        protected override CommandResult ValidateRequestWithDatabase(SaveRequest request)
        {
            if (ValidateIfExistClientWithSameName(request))
                return CommandResult.Client_NameExists;

            if (ValidateIfExistClientWithSameNationalId(request))
                return CommandResult.Client_NationalIdExists;

            return CommandResult.OK;
        }

        private bool ValidateIfExistClientWithSameNationalId(SaveRequest request)
        {
            return request.TypeId switch
            {
                (int)ClientTypeEnum.Private => ValidateIfExistPrivateClientWithSameCitizenNationalId(request),
                (int)ClientTypeEnum.Company => ValidateIfExistCompanyClientWithSameCompanyNationalId(request),
                _ => false
            };
        }

        private bool ValidateIfExistClientWithSameName(SaveRequest request)
        {
            return _dbContext.Clients
                .Where(c =>
                    !c.IsDeleted &&
                    c.Id != request.Id &&
                    c.Name == request.Name)
                .Any();
        }

        private  bool ValidateIfExistPrivateClientWithSameCitizenNationalId(SaveRequest request)
        {
            return _dbContext.PrivateClientAddresses
                .Include(clientAddress => clientAddress.PrivateClient)
                .Where(clientAddress =>
                    !clientAddress.PrivateClient.IsDeleted &&
                    clientAddress.PrivateClientId != request.Id &&
                    !string.IsNullOrEmpty(clientAddress.NationalCitizenId) &&
                    request.Addresses.Select(address => address.NationalId).Contains(clientAddress.NationalCitizenId))
                .Any();
        }

        private bool ValidateIfExistCompanyClientWithSameCompanyNationalId(SaveRequest request)
        {
            return _dbContext.CompanyClientAddresses
                .Include(clientAddress => clientAddress.CompanyClient)
                .Where(clientAddress =>
                    !clientAddress.CompanyClient.IsDeleted &&
                    clientAddress.CompanyClientId != request.Id &&
                    !string.IsNullOrEmpty(clientAddress.NationalCompanyId) &&
                    request.Addresses.Select(address => address.NationalId).Contains(clientAddress.NationalCompanyId))
                .Any();
        }
    }
}
