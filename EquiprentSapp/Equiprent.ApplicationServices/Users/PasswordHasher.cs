using System.Security.Cryptography;

namespace Equiprent.ApplicationServices.Users
{
    public class PasswordHasher : IPasswordHasher
    {
        public string GetHash(string password)
        {
            var hashedBytes = SHA256.HashData(Encoding.UTF8.GetBytes(password));
            var hash = BitConverter.ToString(hashedBytes).Replace("-", string.Empty).ToLower();

            return hash;
        }
    }
}
