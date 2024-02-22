using Equiprent.ApplicationInterfaces.CommandResults;
using Equiprent.Data.DbContext;
using Equiprent.Entities.Business.Manufacturers;
using Equiprent.Logic.Abstractions;
using Equiprent.Logic.Commands.Addresses.Validators;
using Equiprent.Logic.Infrastructure.FluentValidation;
using FluentValidation;

namespace Equiprent.Logic.Commands.Manufacturers.Requests.Create
{
    public class CreateRequestValidator : RequestValidator<CreateRequest>
    {
        public CreateRequestValidator(ApplicationDbContext dbContext, IServiceProvider serviceProvider) : base(dbContext, serviceProvider)
        {
            RuleFor(r => r.Address)
                .SetValidator(new AddressValidator());

            RuleFor(r => r.Name)
                .NotEmpty()
                .WithMessage(r => FluentValidationMessageCreator<Manufacturer>.CreateMessageForEmptyPropertyValue(nameof(r.Name)));
        }

        protected override CommandResult ValidateRequestWithDatabase(CreateRequest request)
        {
            if (IfExistManufacturerWithSameName(request))
                return CommandResult.Manufacturer_NameExists;

            if (IfExistManufacturerWithSameNationalId(request))
                return CommandResult.Manufacturer_NationalIdExists;

            return base.ValidateRequestWithDatabase(request);
        }

        private bool IfExistManufacturerWithSameName(CreateRequest request)
        {
            return _dbContext.Manufacturers
                .Where(m => 
                    !m.IsDeleted &&
                    m.Name == request.Name)
                .Any();
        }

        private bool IfExistManufacturerWithSameNationalId(CreateRequest request)
        {
            return _dbContext.Manufacturers
                .Include(m => m.Address)
                .Where(m =>
                    !m.IsDeleted &&
                    request.Address.NationalId == m.Address.NationalCompanyId)
                .Any();
        }
    }
}
