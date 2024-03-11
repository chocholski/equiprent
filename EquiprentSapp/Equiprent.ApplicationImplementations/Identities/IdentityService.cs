using Equiprent.ApplicationImplementations.Identities.Models;
using Equiprent.ApplicationImplementations.Options.Jwt;
using Equiprent.ApplicationInterfaces.CommandResults;
using Equiprent.ApplicationInterfaces.Identities;
using Equiprent.ApplicationInterfaces.Identities.Models;
using Equiprent.ApplicationInterfaces.Languageables;
using Equiprent.ApplicationInterfaces.Languageables.Models;
using Equiprent.ApplicationInterfaces.UserPermissions;
using Equiprent.ApplicationInterfaces.Users.Passwords;
using Equiprent.Data.DbContext;
using Equiprent.Entities.Application.RefreshTokens;
using Equiprent.Entities.Application.UserRoleToLanguages;
using Equiprent.Entities.Application.Users;
using Equiprent.Entities.Enums;
using Equiprent.Extensions;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
using System.Text;

namespace Equiprent.ApplicationImplementations.Identities
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

        private static IAuthenticationResult GetAuthenticationResult(int code, int expiration = 0, string? token = null, Guid? refreshToken = null) =>
            new AuthenticationResult(token, refreshToken, expiration, code);

        public async Task<IAuthenticationResult> GetTokenAsync(string grantType, string? clientSecret, string userName, string password, CancellationToken cancellationToken = default)
        {
            var user = await _dbContext!.Users
                .Include(u => u.UserRole)
                .SingleOrDefaultAsync(u => u.Login == userName, cancellationToken);

            if (user is null)
                return GetAuthenticationResult(code: (int)HttpStatusCode.Unauthorized);

            var hashedPassword = _passwordHasher.GetHash(password);

            if (user.Password.ToLower() != hashedPassword.ToLower())
                return GetAuthenticationResult(code: (int)HttpStatusCode.Unauthorized);

            return await GenerateAuthenticationResultForUserAsync(user, cancellationToken);
        }

        public async Task<IAuthenticationResult> RefreshTokenAsync(string token, Guid? refreshToken, CancellationToken cancellationToken = default)
        {
            var validatedToken = GetPrincipalFromToken(token);

            if (validatedToken is null)
                return GetAuthenticationResult(code: (int)CommandResult.Token_Invalid, token: token, refreshToken: refreshToken);

            var expiryDateUnix = long.Parse(validatedToken.Claims.Single(c => c.Type == JwtRegisteredClaimNames.Exp).Value);
            var expiryDateUtc = DateTime.UnixEpoch.AddSeconds(expiryDateUnix);

            var storedRefreshToken = await _dbContext.RefreshTokens
                .SingleOrDefaultAsync(r => r.Token == refreshToken, cancellationToken);

            var userId = validatedToken.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userId))
                return GetAuthenticationResult(code: (int)HttpStatusCode.BadRequest, token: token, refreshToken: refreshToken);

            var user = await _dbContext.Users
                .SingleOrDefaultAsync(u => !u.IsDeleted && u.Id.ToString() == userId, cancellationToken);

            if (user is null)
                return GetAuthenticationResult(code: (int)HttpStatusCode.BadRequest, token: token, refreshToken: refreshToken);

            if (storedRefreshToken is null)
                return GetAuthenticationResult(code: (int)CommandResult.Token_DoesNotExist);

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

                await _dbContext.RefreshTokens.UpdateAndSaveAsync(storedRefreshToken, cancellationToken);
            }

            if (storedRefreshToken.Invalidated)
                return GetAuthenticationResult(code: (int)CommandResult.Token_Invalid);

            if (storedRefreshToken.Used)
                return GetAuthenticationResult(code: (int)CommandResult.Token_Used);

            var jti = validatedToken.Claims.Single(c => c.Type == JwtRegisteredClaimNames.Jti).Value;

            if (storedRefreshToken.JwtId != jti)
                return GetAuthenticationResult(code: (int)CommandResult.Token_DoesNotMatchJWT);

            storedRefreshToken.Used = true;
            await _dbContext.RefreshTokens.UpdateAndSaveAsync(storedRefreshToken, cancellationToken);

            return await GenerateAuthenticationResultForUserAsync(user, cancellationToken);
        }

        private async Task<IAuthenticationResult> GenerateAuthenticationResultForUserAsync(User user, CancellationToken cancellationToken)
        {
            if (user is null)
                return GetAuthenticationResult(code: (int)HttpStatusCode.Unauthorized);

            if (!user.IsActive)
                return GetAuthenticationResult(code: (int)CommandResult.Token_NotActive);

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtOptions.TokenValidationParameters!.Key!));
            var tokenLifetime = _jwtOptions.TokenLifetime;
            var now = DateTime.UtcNow;
            var userRoleTranslations = await _languageableService
                .GetEntityTranslationsInCurrentUserLanguageAsync<UserRoleToLanguage>(EntityIdsFilterModeEnum.Include, user.LanguageId, cancellationToken, user.UserRoleId.ToString());

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim(JwtRegisteredClaimNames.Iat, new DateTimeOffset(now).ToUnixTimeSeconds().ToString()),
                    new Claim(ClaimTypes.Role, userRoleTranslations.GetNameForId(user.UserRoleId.ToString())),
                    new Claim("userlanguageid", user.LanguageId.ToString()),
                    new Claim("userroleid", user.UserRoleId.ToString()),
                    new Claim("userrolename", userRoleTranslations.GetNameForId(user.UserRoleId.ToString())),
                    new Claim("permissions", await GetUserPermissionsForUserAsText(user.Id, cancellationToken)),
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

            await _dbContext.RefreshTokens.AddAndSaveAsync(refreshToken, cancellationToken);

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

        private async Task<string> GetUserPermissionsForUserAsText(Guid userId, CancellationToken cancellationToken = default)
        {
            var userPermissionsForUser = await _userPermissionService.GetUserPermissionsForUserAsync(userId, cancellationToken);

            var userPermissionsForUserIds = new List<int> { (int)UserPermissionEnum.ForAllLoggedIn }
                .AppendRange(
                    userPermissionsForUser
                        .Select(userPermission => userPermission.Id)
                        .ToList());

            return string.Join(',', userPermissionsForUserIds!);
        }
    }
}
