using Equiprent.ApplicationServices.CommandResults;

namespace Equiprent.Logic.Infrastructure.CQRS
{
    public interface ICommand
    {
    }

    public interface ICommandHandler
    {
    }

    public interface ICommandHandler<TCommand> : ICommandHandler where TCommand : ICommand
    {
        Task<CommandResult> ValidateAsync(TCommand command)
        {
            return Task.FromResult(CommandResult.OK);
        }

        Task<CommandResult> HandleAsync(TCommand command);
    }

    public interface ICommandHandler<TCommand, TResult> : ICommandHandler where TCommand : ICommand
    {
        Task<CommandResult> ValidateAsync(TCommand command)
        {
            return Task.FromResult(CommandResult.OK);
        }

        Task<TResult?> HandleAsync(TCommand command);
    }

    public interface ICommandDispatcher
    {
        Task<CommandResult> SendCommandAsync<TCommand>(TCommand command) where TCommand : ICommand;
        Task<TResult?> SendCommandAsync<TCommand, TResult>(TCommand command) where TCommand : ICommand;
    }

    public class CommandDispatcher : ICommandDispatcher
    {
        private readonly IServiceProvider _serviceProvider;

        public CommandDispatcher(IServiceProvider serviceProvider) => _serviceProvider = serviceProvider;

        public async Task<CommandResult> SendCommandAsync<TCommand>(TCommand command) where TCommand : ICommand
        {
            var service = _serviceProvider.GetService(typeof(ICommandHandler<TCommand>)) as ICommandHandler<TCommand>;

            if (service is not null)
            {
                var validationResult = await service.ValidateAsync(command);

                return validationResult is CommandResult.OK
                    ? await service.HandleAsync(command)
                    : validationResult;
            }
            else
                return CommandResult.BadRequest;
        }

        public async Task<TResult?> SendCommandAsync<TCommand, TResult>(TCommand command) where TCommand : ICommand
        {
            var service = _serviceProvider.GetService(typeof(ICommandHandler<TCommand, TResult>)) as ICommandHandler<TCommand, TResult>;

            if (service is not null)
            {
                var validationResult = await service.ValidateAsync(command);

                return validationResult is CommandResult.OK
                    ? await service.HandleAsync(command)
                    : default;
            }
            else
                return default;
        }
    }
}
