using Equiprent.ApplicationInterfaces.CommandResults;
using Equiprent.Data.DbContext;
using FluentValidation;
using Microsoft.Extensions.DependencyInjection;

namespace Equiprent.Logic.Abstractions
{
    public class RequestValidator<T> : AbstractValidator<T>
    {
        protected readonly ApplicationDbContext _dbContext;

        public RequestValidator(ApplicationDbContext dbContext, IServiceProvider serviceProvider)
        {
            _dbContext = dbContext;

            RuleFor(r => r)
                .Custom((request, context) =>
                {
                    var commandResultService = serviceProvider.GetRequiredService<ICommandResultService>();

                    var validationWithDatabaseResult = ValidateRequestWithDatabase(request);
                    if (validationWithDatabaseResult is not CommandResult.OK)
                    {
                        context.AddFailure(new FluentValidation.Results.ValidationFailure(
                            typeof(T).Name,
                            commandResultService.GetActionResultFromCommandResult(validationWithDatabaseResult)));
                    }
                });
        }

        protected virtual CommandResult ValidateRequestWithDatabase(T request) => CommandResult.OK;
    }
}
