using Equiprent.ApplicationInterfaces.Users;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;

namespace Equiprent.ApplicationImplementations.Users
{
    public class UserService : IUserService
    {
        private readonly IHttpContextAccessor _httpAccessor;

        public UserService(IHttpContextAccessor httpAccessor)
        {
            _httpAccessor = httpAccessor;
        }

        public Guid? GetUserId()
        {
            var userIdClaim = _httpAccessor.HttpContext?.User?.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier);

            return userIdClaim is not null &&
                Guid.TryParse(userIdClaim.Value, out Guid userId) ? userId : null;
        }
    }
}
