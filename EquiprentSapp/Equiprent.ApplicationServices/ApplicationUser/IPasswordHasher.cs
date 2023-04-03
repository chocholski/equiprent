namespace Equiprent.ApplicationServices.ApplicationUser
{
    public interface IPasswordHasher
    {
        string GetHash(string password);
    }
}
