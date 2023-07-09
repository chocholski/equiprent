namespace Equiprent.Logic.QueryData.Authentication
{
    public record ChangePasswordRequest(Guid Token, string Password);
}
