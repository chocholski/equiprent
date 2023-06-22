using Equiprent.ApplicationServices.Languageables;
using Equiprent.ApplicationServices.Users;
using Equiprent.ApplicationServices.UserPermissions;
using Equiprent.Data.DbContext;
using Equiprent.Entities.Application;
using Equiprent.Entities.EnumTypes;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
using Equiprent.ApplicationServices.Options.Jwt;

namespace Equiprent.ApplicationServices.Identities
{
    public class IdentityService : IIdentityService
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IConfiguration _configuration;
        private readonly IPasswordHasher _passwordHasher;
        private readonly ILanguageableService _languageableService;
        private readonly IUserPermissionService _userPermissionService;

        public IdentityService(
            ApplicationDbContext dbContext,
            IConfiguration configuration,
            IPasswordHasher passwordHasher,
            ILanguageableService languageableService,
            IUserPermissionService userPermissionService)
        {
            _dbContext = dbContext;
            _configuration = configuration;
            _passwordHasher = passwordHasher;
            _languageableService = languageableService;
            _userPermissionService = userPermissionService;
        }

        private static AuthenticationResult CreateToken(int code, int expiration = 0, string? token = null, Guid? refreshToken = null) => new(token, refreshToken, expiration, code);

        public async Task<AuthenticationResult> GetTokenAsync(string grantType, string? clientSecret, string userName, string password)
        {
            var user = await _dbContext!.Users
                .Include(u => u.UserRole)
                .SingleOrDefaultAsync(u => u.Login == userName);

            if (user is null)
                return CreateToken(code: (int)HttpStatusCode.Unauthorized);

            var hashedPassword = _passwordHasher.GetHash(password);

            if (user.Password.ToLower() != hashedPassword.ToLower())
                return CreateToken(code: (int)HttpStatusCode.Unauthorized);

            return await GetTokenAsync(user);
        }

        public async Task<AuthenticationResult> GetTokenAsync(User user)
        {
            if (user is null)
                return CreateToken(code: (int)HttpStatusCode.Unauthorized);

            if (!user.IsActive)
                return CreateToken(code: (int)CommandResults.CommandResult.Token_NotActive);

            var jwtOptions = new JwtOptions();
            _configuration.Bind(nameof(JwtOptions), jwtOptions);

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtOptions.TokenValidationParameters.Key));
            var tokenExpirationMins = jwtOptions.TokenExpirationInMinutes;
            var now = DateTime.UtcNow;
            var userRoleIdWithName = await _languageableService
                .GetEntityIdsWithNamesInCurrentUserLanguageAsync<UserRoleToLanguage>(EntityIdsFilterModeEnum.Include, user.LanguageId, user.UserRoleId);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim(JwtRegisteredClaimNames.Iat, new DateTimeOffset(now).ToUnixTimeSeconds().ToString()),
                    new Claim(ClaimTypes.Role, userRoleIdWithName.GetNameForId(user.UserRoleId)),
                    new Claim("userlanguageid", user.LanguageId.ToString()),
                    new Claim("userroleid", user.UserRoleId.ToString()),
                    new Claim("userrolename", userRoleIdWithName.GetNameForId(user.UserRoleId)),
                    new Claim("permissions", await GetUserPermissionsForUserAsText(user.Id)),
                    new Claim(ClaimTypes.GivenName, user.GetName())
                }),
                Expires = now.Add(TimeSpan.FromMinutes(tokenExpirationMins)),
                SigningCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature),
                Issuer = jwtOptions.TokenValidationParameters.ValidIssuer,
                Audience = jwtOptions.TokenValidationParameters.ValidAudience,
                NotBefore = now
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);

            user.ChangeRefreshToken(refreshToken: Guid.NewGuid());

            await _dbContext!.Users.UpdateAsync(user);

            return CreateToken(
                code: (int)HttpStatusCode.OK,
                expiration: tokenExpirationMins,
                token: tokenHandler.WriteToken(token),
                refreshToken: user.RefreshToken);
        }

        public ClaimsPrincipal? GetPrincipalFromToken(string? token)
        {
            var jwtOptions = new JwtOptions();
            _configuration.Bind(nameof(JwtOptions), jwtOptions);

            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateAudience = false,
                ValidateIssuer = false,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtOptions.TokenValidationParameters.Key)),
                ValidateLifetime = false
            };

            var principal = new JwtSecurityTokenHandler()
                .ValidateToken(token, tokenValidationParameters, out SecurityToken securityToken);

            if (securityToken is not JwtSecurityToken jwtSecurityToken || !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
                throw new SecurityTokenException("Invalid token");

            return principal;
        }

        private async Task<string> GetUserPermissionsForUserAsText(Guid userId)
        {
            var userPermissionsForUser = await _userPermissionService.GetUserPermissionsForUserAsync(userId);

            var userPermissionsForUserIds = new List<int>
            {
                (int)UserPermissionEnum.ForAllLoggedIn
            };

            userPermissionsForUserIds.AddRange(userPermissionsForUser
                .Select(userPermission => userPermission.Id)
                .ToList());

            return string.Join(',', userPermissionsForUserIds);
        }
    }
}
