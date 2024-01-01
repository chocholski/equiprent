using Equiprent.ApplicationInterfaces.CommandResults;

namespace Equiprent.ApplicationImplementations.CommandResults
{
    public class CommandResultService : ICommandResultService
    {
        public string GetActionResultFromCommandResult(CommandResult? commandResult, string? message = null)
        {
            commandResult ??= CommandResult.BadRequest;

            if (string.IsNullOrEmpty(message))
            {
                var splitCommandResult = commandResult!.ToString()!.Split('_');
                message = splitCommandResult[splitCommandResult.Length > 1 ? 1 : 0];
            }

            return message;
        }
    }
}
