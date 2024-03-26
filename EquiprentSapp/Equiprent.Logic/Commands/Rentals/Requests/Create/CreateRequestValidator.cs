using Equiprent.ApplicationInterfaces.CommandResults;
using Equiprent.Data.DbContext;
using Equiprent.Entities.Business.Rentals;
using Equiprent.Logic.Abstractions;
using Equiprent.Logic.Infrastructure.FluentValidation;
using FluentValidation;

namespace Equiprent.Logic.Commands.Rentals.Requests.Create
{
    public class CreateRequestValidator : RequestValidator<CreateRequest>
    {
        public CreateRequestValidator(ApplicationDbContext dbContext, IServiceProvider serviceProvider) : base(dbContext, serviceProvider)
        {
            RuleFor(r => r.End)
                .NotEmpty()
                    .WithMessage(r => FluentValidationMessageCreator<Rental>.CreateMessageForIncorrectDate(nameof(r.End)))
                .GreaterThanOrEqualTo(r => r.Start)
                    .WithMessage(r => FluentValidationMessageCreator<Rental>.CreateMessageForIncorrectDate(nameof(r.End)));

            RuleFor(r => r.Start)
                .NotEmpty()
                    .WithMessage(r => FluentValidationMessageCreator<Rental>.CreateMessageForIncorrectDate(nameof(r.Start)))
                .LessThanOrEqualTo(r => r.End)
                    .WithMessage(r => FluentValidationMessageCreator<Rental>.CreateMessageForIncorrectDate(nameof(r.Start)));
        }

        protected override CommandResult ValidateRequestWithDatabase(CreateRequest request)
        {
            if (IfExistsRentalForEquipmentWithinTheSameDateRanges(request))
                return CommandResult.Rental_OverlappingDateRanges;

            return base.ValidateRequestWithDatabase(request);
        }

        private bool IfExistsRentalForEquipmentWithinTheSameDateRanges(CreateRequest request)
        {
            return _dbContext.Rentals
                .Where(r =>
                    !r.IsDeleted &&
                    r.EquipmentId == request.EquipmentId &&
                    (
                        (
                            r.Start >= request.Start &&
                            r.Start <= request.End
                        ) ||
                        (
                            r.End >= request.Start &&
                            r.End <= request.End
                        )
                    ))
                .Any();
        }
    }
}
