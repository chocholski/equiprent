using Equiprent.ApplicationImplementations.CommandResults;
using Microsoft.Extensions.DependencyInjection;

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
        Task<CommandResult> ValidateAsync(TCommand command) => Task.FromResult(CommandResult.OK);
        Task<CommandResult> HandleAsync(TCommand command);
    }

    public interface ICommandHandler<TCommand, TResult> : ICommandHandler where TCommand : ICommand
    {
        Task<CommandResult> ValidateAsync(TCommand command) => Task.FromResult(CommandResult.OK);
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

        public async Task<CommandResult> SendCommandAsync<TCommand>(TCommand command)
            where TCommand : ICommand
        {
            var service = _serviceProvider.GetService<ICommandHandler<TCommand>>();

            if (service is null)
                return CommandResult.BadRequest;

            var validationResult = await service.ValidateAsync(command);

            return validationResult is CommandResult.OK
                ? await service.HandleAsync(command)
                : validationResult;
        }

        public async Task<TResult?> SendCommandAsync<TCommand, TResult>(TCommand command)
            where TCommand : ICommand
        {
            var service = _serviceProvider.GetService<ICommandHandler<TCommand, TResult>>();

            if (service is null)
                return default;

            var validationResult = await service.ValidateAsync(command);

            return validationResult is CommandResult.OK
                ? await service.HandleAsync(command)
                : default;
        }
    }
}
