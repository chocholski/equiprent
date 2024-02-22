using Equiprent.ApplicationInterfaces.CommandResults;
using Equiprent.Data.DbContext;
using Equiprent.Entities.Business.Equipment;
using Equiprent.Logic.Abstractions;
using Equiprent.Logic.Infrastructure.FluentValidation;
using FluentValidation;

namespace Equiprent.Logic.Commands.Equipments.Requests.Save
{
    public class SaveRequestValidator : RequestValidator<SaveRequest>
    {
        public SaveRequestValidator(ApplicationDbContext dbContext, IServiceProvider serviceProvider) : base(dbContext, serviceProvider)
        {
            RuleFor(r => r.MarketValue)
                .GreaterThanOrEqualTo(0)
                .WithMessage(r => FluentValidationMessageCreator<Equipment>.CreateMessageForNegativeNumber(nameof(r.MarketValue)));

            RuleFor(r => r.Name)
                .NotEmpty()
                .WithMessage(r => FluentValidationMessageCreator<Equipment>.CreateMessageForEmptyPropertyValue(nameof(r.Name)));

            RuleFor(r => r.PricePerDay)
                .GreaterThanOrEqualTo(0)
                .WithMessage(r => FluentValidationMessageCreator<Equipment>.CreateMessageForNegativeNumber(nameof(r.PricePerDay)));

            RuleFor(r => r.SerialNumber)
                .NotEmpty()
                .WithMessage(r => FluentValidationMessageCreator<Equipment>.CreateMessageForEmptyPropertyValue(nameof(r.SerialNumber)));
        }

        protected override CommandResult ValidateRequestWithDatabase(SaveRequest request)
        {
            if (IfExistEquipmentWithSameSerialNumber(request))
                return CommandResult.Equipment_SerialNumberExists;

            return base.ValidateRequestWithDatabase(request);
        }

        private bool IfExistEquipmentWithSameSerialNumber(SaveRequest request)
        {
            return _dbContext.Equipments
                .Where(e =>
                    e.Id != request.Id &&
                    !e.IsDeleted &&
                    e.SerialNumber.Trim() == request.SerialNumber.Trim())
                .Any();
        }
    }
}
