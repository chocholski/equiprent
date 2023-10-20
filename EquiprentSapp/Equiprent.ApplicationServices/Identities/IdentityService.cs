using Equiprent.ApplicationServices.Languageables;
using Equiprent.ApplicationServices.Users;
using Equiprent.ApplicationServices.UserPermissions;
using Equiprent.Data.DbContext;
using Equiprent.Entities.Application;
using Equiprent.Entities.Enums;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
using Equiprent.ApplicationServices.Options.Jwt;
using Equiprent.Entities.Application.RefreshToken;
using Equiprent.Extensions;
using Equiprent.ApplicationServices.Languageables.Enums;

namespace Equiprent.ApplicationServices.Identities
{
    public class IdentityService : IIdentityService
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IPasswordHasher _passwordHasher;
        private readonly ILanguageableService _languageableService;
        private readonly IUserPermissionService _userPermissionService;
        private readonly JwtOptions _jwtOptions;
        private readonly TokenValidationParameters _tokenValidationParameters;

        public IdentityService(
            ApplicationDbContext dbContext,
            IPasswordHasher passwordHasher,
            ILanguageableService languageableService,
            IUserPermissionService userPermissionService,
            JwtOptions jwtOptions,
            TokenValidationParameters tokenValidationParameters)
        {
            _dbContext = dbContext;
            _passwordHasher = passwordHasher;
            _languageableService = languageableService;
            _userPermissionService = userPermissionService;
            _jwtOptions = jwtOptions;
            _tokenValidationParameters = tokenValidationParameters;
        }

        private static AuthenticationResult GetAuthenticationResult(int code, int expiration = 0, string? token = null, Guid? refreshToken = null) =>
            new(token, refreshToken, expiration, code);

        public async Task<AuthenticationResult> GetTokenAsync(string grantType, string? clientSecret, string userName, string password)
        {
            var user = await _dbContext!.Users
                .Include(u => u.UserRole)
                .SingleOrDefaultAsync(u => u.Login == userName);

            if (user is null)
                return GetAuthenticationResult(code: (int)HttpStatusCode.Unauthorized);

            var hashedPassword = _passwordHasher.GetHash(password);

            if (user.Password.ToLower() != hashedPassword.ToLower())
                return GetAuthenticationResult(code: (int)HttpStatusCode.Unauthorized);

            return await GenerateAuthenticationResultForUserAsync(user);
        }

        public async Task<AuthenticationResult> RefreshTokenAsync(string token, Guid? refreshToken)
        {
            var validatedToken = GetPrincipalFromToken(token);

            if (validatedToken is null)
                return GetAuthenticationResult(code: (int)CommandResults.CommandResult.Token_Invalid, token: token, refreshToken: refreshToken);

            var expiryDateUnix = long.Parse(validatedToken.Claims.Single(c => c.Type == JwtRegisteredClaimNames.Exp).Value);
            var expiryDateUtc = DateTime.UnixEpoch.AddSeconds(expiryDateUnix);

            var storedRefreshToken = await _dbContext.RefreshTokens
                .SingleOrDefaultAsync(r => r.Token == refreshToken);

            var userId = validatedToken.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userId))
                return GetAuthenticationResult(code: (int)HttpStatusCode.BadRequest, token: token, refreshToken: refreshToken);

            var user = await _dbContext.Users
                .SingleOrDefaultAsync(u => !u.IsDeleted && u.Id.ToString() == userId);

            if (user is null)
                return GetAuthenticationResult(code: (int)HttpStatusCode.BadRequest, token: token, refreshToken: refreshToken);

            if (storedRefreshToken is null)
                return GetAuthenticationResult(code: (int)CommandResults.CommandResult.Token_DoesNotExist);

            if (expiryDateUtc > DateTime.UtcNow)
            {
                var userStoredRefreshTokens = await _dbContext.RefreshTokens
                    .Where(token => token.UserId == user.Id)
                    .ToListAsync();

                if (userStoredRefreshTokens.Any())
                {
                    foreach (var userRefreshToken in userStoredRefreshTokens)
                    {
                        userRefreshToken.IsTokenRefreshRequired = false;

                        _dbContext.RefreshTokens.Update(userRefreshToken);
                    }
                }

                await _dbContext.RefreshTokens.UpdateAndSaveAsync(storedRefreshToken);

                return GetAuthenticationResult(code: (int)HttpStatusCode.OK, token: token, refreshToken: refreshToken);
            }

            if (storedRefreshToken.Invalidated)
                return GetAuthenticationResult(code: (int)CommandResults.CommandResult.Token_Invalid);

            if (storedRefreshToken.Used)
                return GetAuthenticationResult(code: (int)CommandResults.CommandResult.Token_Used);

            var jti = validatedToken.Claims.Single(c => c.Type == JwtRegisteredClaimNames.Jti).Value;

            if (storedRefreshToken.JwtId != jti)
                return GetAuthenticationResult(code: (int)CommandResults.CommandResult.Token_DoesNotMatchJWT);

            storedRefreshToken.Used = true;

            await _dbContext.RefreshTokens.UpdateAndSaveAsync(storedRefreshToken);

            return await GenerateAuthenticationResultForUserAsync(user);
        }

        private async Task<AuthenticationResult> GenerateAuthenticationResultForUserAsync(User user)
        {
            if (user is null)
                return GetAuthenticationResult(code: (int)HttpStatusCode.Unauthorized);

            if (!user.IsActive)
                return GetAuthenticationResult(code: (int)CommandResults.CommandResult.Token_NotActive);

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtOptions.TokenValidationParameters.Key));
            var tokenLifetime = _jwtOptions.TokenLifetime;
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
                Expires = now.Add(tokenLifetime),
                SigningCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature),
                Issuer = _jwtOptions.TokenValidationParameters.ValidIssuer,
                Audience = _jwtOptions.TokenValidationParameters.ValidAudience,
                NotBefore = now
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            var refreshToken = new RefreshToken
            {
                JwtId = token.Id,
                UserId = user.Id,
                CreatedOn = now,
                IsTokenRefreshRequired = false
            };

            await _dbContext.RefreshTokens.AddAndSaveAsync(refreshToken);

            return GetAuthenticationResult(
                code: (int)HttpStatusCode.OK,
                expiration: (int)tokenLifetime.TotalMinutes,
                token: tokenHandler.WriteToken(token),
                refreshToken: refreshToken.Token);
        }

        private ClaimsPrincipal? GetPrincipalFromToken(string? token)
        {
            var tokenHandler = new JwtSecurityTokenHandler();

            try
            {
                _tokenValidationParameters.ValidateLifetime = false;

                var principal = tokenHandler.ValidateToken(token, _tokenValidationParameters, out var validatedToken);

                if (!IsJwtWithValidSecurityAlgorithm(validatedToken))
                    return null;

                return principal;
            }
            catch
            {
                return null;
            }
        }

        private static bool IsJwtWithValidSecurityAlgorithm(SecurityToken validatedToken) =>
            validatedToken is JwtSecurityToken jwtSecurityToken &&
                jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase);

        private async Task<string> GetUserPermissionsForUserAsText(Guid userId)
        {
            var userPermissionsForUser = await _userPermissionService.GetUserPermissionsForUserAsync(userId);

            var userPermissionsForUserIds = new List<int> { (int)UserPermissionEnum.ForAllLoggedIn }
                .AppendRange(
                    userPermissionsForUser
                        .Select(userPermission => userPermission.Id)
                        .ToList());

            return string.Join(',', userPermissionsForUserIds!);
        }
    }
}
