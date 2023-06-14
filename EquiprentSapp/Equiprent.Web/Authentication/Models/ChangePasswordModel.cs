namespace Equiprent.Web.Authentication.Models
{
    public record ChangePasswordModel(Guid Token, string Password);
}
