namespace Equiprent.ApplicationInterfaces.Users.Passwords
{
    public interface IPasswordHasher
    {
        string GetHash(string password);
    }
}
