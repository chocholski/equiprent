namespace Equiprent.ApplicationServices.Users
{
    public interface IPasswordHasher
    {
        string GetHash(string password);
    }
}
