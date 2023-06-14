using System.Net;
using System.Security.Claims;
using Equiprent.ApplicationServices.ApplicationUser;
using Equiprent.Logic.QueryData.Authentication;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using Equiprent.Entities.EnumTypes;
using Equiprent.ApplicationServices.UserPermissions;
using Equiprent.ApplicationServices.Languageable;
using Equiprent.Entities.Application;
using Equiprent.Web.Options.Jwt;
using Equiprent.Data.DbContext;
using Equiprent.Web.Authentication.Models;

namespace Equiprent.Web.Controllers
{
    public class TokenController : BaseApiController
    {
        private readonly IPasswordHasher _passwordHasher;
        private readonly IUserPermissionsService _userPermissionsService;
        private readonly ILanguageableService _languageableService;

        public TokenController(
            ApplicationDbContext context,
            IConfiguration configuration,
            IPasswordHasher passwordHasher,
            IUserPermissionsService userPermissionsService,
            ILanguageableService languageableService) : base(context, configuration)
        {
            _passwordHasher = passwordHasher;
            _userPermissionsService = userPermissionsService;
            _languageableService = languageableService;
        }

        [HttpPost("authenticate")]
        public async Task<IActionResult> Jwt([FromBody] TokenRequestModel model)
        {
            // return a generic HTTP Status 500 (Server Error)
            // if the client payload is invalid.
            if (model is null)
                return new StatusCodeResult(500);                

            return model.grant_type switch
            {
                "password" => new JsonResult(await GetToken(model)),
                _ => new UnauthorizedResult(),// not supported - return a HTTP 401 (Unauthorized)
            };
        }

        [HttpPost("refreshToken")]
        public async Task<IActionResult> RefreshToken(TokenModel tokenModel)
        {
            if (tokenModel is null)
            {
                return BadRequest("Invalid client request");
            }

            var principal = GetPrincipalFromExpiredToken(tokenModel.Token);

            if (principal is null)
            {
                return BadRequest("Invalid access token or refresh token");
            }

            var userId = principal.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userId))
            {
                return BadRequest("Invalid access token");
            }

            var user = await _dbContext!.ApplicationUsers.SingleOrDefaultAsync(u => u.Id.ToString() == userId && u.RefreshToken == tokenModel.RefreshToken);

            if (user is null)
            {
                return BadRequest("Invalid access token or refresh token");
            }

            return new JsonResult(await GetToken(user));
        }

        private ClaimsPrincipal? GetPrincipalFromExpiredToken(string? token)
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
            {
                throw new SecurityTokenException("Invalid token");
            }

            return principal;
        }

        [HttpGet("isemptypassword")]
        public async Task<ActionResult<bool>> IsEmptyPassword([FromQuery] string login)
        {
            var user = await _dbContext!.ApplicationUsers
                .Where(u => u.Login == login)
                .Select(u => new { u.Password })
                .FirstOrDefaultAsync();

            if (user is null)
            {
                return BadRequest();
            }

            return string.IsNullOrEmpty(user.Password);
        }

        [HttpPut("changepassword")]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordModel model)
        {
            var user = await _dbContext!.ApplicationUsers
                .FirstOrDefaultAsync(u => u.ChangePasswordToken == model.Token);

            if (user is null)
                return GetActionResult(CommandResult.Token_WrongToken);

            user.ChangePassword(password: _passwordHasher.GetHash(model.Password));

            await _dbContext.ApplicationUsers.UpdateAsync(user, _dbContext);

            return GetActionResult(CommandResult.OK);
        }

        private async Task<TokenResponseModel> GetToken(TokenRequestModel model)
        {
            var user = await _dbContext!.ApplicationUsers
                .Include(u => u.UserRole)
                .SingleOrDefaultAsync(u => u.Login == model.username);

            if (user is null)
                return CreateToken(code: (int)HttpStatusCode.Unauthorized);

            var hashedPassword = _passwordHasher.GetHash(model.password);

            if (user.Password.ToLower() != hashedPassword.ToLower())
                return CreateToken(code: (int)HttpStatusCode.Unauthorized);

            return await GetToken(user);
        }

        private static TokenResponseModel CreateToken(int code, int expiration = 0, string? token = null, Guid? refreshToken = null) => new()
        {
            token = token,
            expiration = expiration,
            code = code,
            refreshToken = refreshToken
        };

        private async Task<TokenResponseModel> GetToken(User user)
        {
            if (user is null)
                return CreateToken(code: (int)HttpStatusCode.Unauthorized);

            if (!user.IsActive)
                return CreateToken(code: (int)CommandResult.Token_NotActive);

            var now = DateTime.UtcNow;
            var userRoleIdWithName = await _languageableService.GetEntityIdsWithNamesInCurrentUserLanguageAsync<UserRoleToLanguage>(EntityIdsFilterModeEnum.Include, new List<int> { user.UserRoleId }, user.LanguageId);
            var claims = new[]
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
            };

            var jwtOptions = new JwtOptions();
            _configuration.Bind(nameof(JwtOptions), jwtOptions);

            var tokenExpirationMins = _configuration.GetValue<int>("Jwt:TokenExpirationInMinutes");
            var issuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtOptions.TokenValidationParameters.Key));
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = now.Add(TimeSpan.FromMinutes(tokenExpirationMins)),
                SigningCredentials = new SigningCredentials(issuerSigningKey, SecurityAlgorithms.HmacSha256Signature),
                Issuer = jwtOptions.TokenValidationParameters.ValidIssuer,
                Audience = jwtOptions.TokenValidationParameters.ValidAudience,
                NotBefore = now
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var encodedToken = tokenHandler.WriteToken(token: tokenHandler.CreateToken(tokenDescriptor));

            user.RefreshToken = Guid.NewGuid();
            user.IsTokenRefreshRequired = false;

            await _dbContext!.ApplicationUsers.UpdateAsync(user, _dbContext);

            return CreateToken(
                code: (int)HttpStatusCode.OK,
                expiration: tokenExpirationMins,
                token: encodedToken,
                refreshToken: user.RefreshToken);
        }

        private async Task<string> GetUserPermissionsForUserAsText(Guid userId)
        {
            var userPermissionsForUser = await _userPermissionsService.GetUserPermissionsForUserAsync(userId);

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