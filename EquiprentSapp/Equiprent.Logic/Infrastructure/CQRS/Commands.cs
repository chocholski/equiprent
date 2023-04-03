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
        Task<CommandResult> HandleAsync(TCommand command);
    }

    public interface ICommandHandler<TCommand, TResult> : ICommandHandler where TCommand : ICommand
    {
        Task<TResult?> HandleAsync(TCommand command);
    }

    public interface ICommandDispatcher
    {
        Task<CommandResult> SendCommandAsync<TCommand>(TCommand command) where TCommand : ICommand;
        Task<TResult?> SendCommandAsync<TCommand, TResult>(TCommand command) where TCommand : ICommand;
    }

    public class CommandDispatcher : ICommandDispatcher
    {
        private IServiceProvider _serviceProvider;
        public CommandDispatcher(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }

        public async Task<CommandResult> SendCommandAsync<TCommand>(TCommand command) where TCommand : ICommand
        {
            var service = _serviceProvider.GetService(typeof(ICommandHandler<TCommand>)) as ICommandHandler<TCommand>;
            return service is not null ? await service.HandleAsync(command) : CommandResult.BadRequest;
        }

        public async Task<TResult?> SendCommandAsync<TCommand, TResult>(TCommand command) where TCommand : ICommand
        {
            var service = this._serviceProvider.GetService(typeof(ICommandHandler<TCommand, TResult>)) as ICommandHandler<TCommand, TResult>;
            return service is not null ? await service.HandleAsync(command) : default;
        }
    }
}
