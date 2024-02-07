using Equiprent.ApplicationInterfaces.CommandResults;
using Equiprent.Data.DbContext;
using Equiprent.Entities.Business.Manufacturers;
using Equiprent.Logic.Abstractions;
using Equiprent.Logic.Commands.Addresses.Validators;
using Equiprent.Logic.Infrastructure.FluentValidation;
using FluentValidation;

namespace Equiprent.Logic.Commands.Manufacturers.Requests.Save
{
    public class SaveRequestValidator : RequestValidator<SaveRequest>
    {
        public SaveRequestValidator(ApplicationDbContext dbContext, IServiceProvider serviceProvider) : base(dbContext, serviceProvider)
        {
            RuleFor(r => r.Address)
                .SetValidator(new AddressValidator());

            RuleFor(r => r.Name)
                .NotEmpty()
                .WithMessage(r => FluentValidationMessageCreator<Manufacturer>.CreateMessageForEmptyPropertyValue(nameof(r.Name)));
        }

        protected override CommandResult ValidateRequestWithDatabase(SaveRequest request)
        {
            if (ValidateIfExistManufacturerWithSameName(request))
                return CommandResult.Manufacturer_NameExists;

            if (ValidateIfExistManufacturerWithSameNationalId(request))
                return CommandResult.Manufacturer_NationalIdExists;

            return base.ValidateRequestWithDatabase(request);
        }

        private bool ValidateIfExistManufacturerWithSameName(SaveRequest request)
        {
            return _dbContext.Manufacturers
                .Where(m =>
                    m.Id != request.Id &&
                    !m.IsDeleted &&
                    m.Name == request.Name)
                .Any();
        }

        private bool ValidateIfExistManufacturerWithSameNationalId(SaveRequest request)
        {
            return _dbContext.Manufacturers
                .Include(m => m.Address)
                .Where(m =>
                    m.Id != request.Id &&
                    !m.IsDeleted &&
                    request.Address.NationalId == m.Address.NationalCompanyId)
                .Any();
        }
    }
}
