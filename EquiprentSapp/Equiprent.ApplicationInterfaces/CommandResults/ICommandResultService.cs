namespace Equiprent.ApplicationInterfaces.CommandResults
{
    public interface ICommandResultService
    {
        public string GetActionResultFromCommandResult(CommandResult? commandResult, string? message = null);
    }
}
