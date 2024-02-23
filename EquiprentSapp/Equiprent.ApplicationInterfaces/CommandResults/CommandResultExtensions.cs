namespace Equiprent.ApplicationInterfaces.CommandResults
{
    public static class CommandResultExtensions
    {
        public static bool IsOk(this CommandResult commandResult) => commandResult == CommandResult.OK;
    }
}
