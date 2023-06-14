namespace Equiprent.Web.Authentication.Models
{
    public record TokenModel(string Token, Guid? RefreshToken);
}
