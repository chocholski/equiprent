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

namespace Equiprent.Web.Controllers
{
    public class TokenController : BaseApiController
    {
        private readonly IPasswordHasher _passwordHasher;
        private readonly IUserPermissionsService _userPermissionsService;
        private readonly ILanguageableService _languageableService;

        public TokenController(ApplicationDbContext context, IConfiguration configuration, IPasswordHasher passwordHasher, IUserPermissionsService userPermissionsService, ILanguageableService languageableService) : base(context, configuration)
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
            {
                return new StatusCodeResult(500);
            }                

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

            var user = await DbContext!.ApplicationUsers.SingleOrDefaultAsync(x => x.Id.ToString() == userId && x.RefreshToken == tokenModel.RefreshToken);

            if (user is null)
            {
                return BadRequest("Invalid access token or refresh token");
            }

            return new JsonResult(await GetToken(user));
        }

        private ClaimsPrincipal? GetPrincipalFromExpiredToken(string? token)
        {
            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateAudience = false,
                ValidateIssuer = false,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["Auth:Jwt:Key"]!)),
                ValidateLifetime = false
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out SecurityToken securityToken);

            if (securityToken is not JwtSecurityToken jwtSecurityToken || !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
            {
                throw new SecurityTokenException("Invalid token");
            }

            return principal;
        }

        [HttpGet("isemptypassword")]
        public async Task<ActionResult<bool>> IsEmptyPassword([FromQuery] string login)
        {
            var user = await DbContext!.ApplicationUsers.FirstOrDefaultAsync(x => x.Login == login);

            if (user is null)
            {
                return BadRequest();
            }

            return string.IsNullOrEmpty(user.Password);
        }


        //[HttpPut("resetpassword")]
        //public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordModel model)
        //{
        //    var user = await DbContext!.ApplicationUsers.FirstOrDefaultAsync(x => x.Login == model.LoginOrEmail ||
        //                                                                         x.Email == model.LoginOrEmail);

        //    if (user == null)
        //        return GetActionResult(CommandGenericResult.Token_LoginOrEmailExists);

        //    if (string.IsNullOrEmpty(user.Email))
        //        return GetActionResult(CommandGenericResult.Token_EmptyEmail);

        //    user.ChangePasswordToken = Guid.NewGuid();

        //    NotificationTemplate? template = null;
        //    switch (model.Language.Trim().ToUpper())
        //    {
        //        case "PL":
        //            template = await DbContext.NotificationTemplates.FirstOrDefaultAsync(x => x.Id == (int)NotificationTemplateEnum.ResetPassword_PL);
        //            break;
        //        case "EN":
        //            template = await DbContext.NotificationTemplates.FirstOrDefaultAsync(x => x.Id == (int)NotificationTemplateEnum.ResetPassword_EN);
        //            break;
        //    }

        //    if (template is not null)
        //    {
        //        string angularAppAddress = Configuration["Auth:Jwt:Audience"];
        //        var notification = new Notification
        //        {
        //            Recipients = user.Email,
        //            Subject = template?.Subject,
        //            Body = string.Format(template!.Body, $"{angularAppAddress}{(angularAppAddress.Last() == '/' ? string.Empty : '/')}login/reset-password?token={user.ChangePasswordToken}"),
        //            NotificationStatusId = (int)NotificationStatusEnum.New,
        //            CreatedOn = DateTime.Now,
        //            CreatedById = 1
        //        };

        //        DbContext.Notifications.Add(notification);
        //        await DbContext.SaveChangesAsync();
        //    }

        //    return GetActionResult(CommandGenericResult.Generic_OK);
        //}

        [HttpPut("changepassword")]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordModel model)
        {
            var user = await DbContext!.ApplicationUsers.FirstOrDefaultAsync(x => x.ChangePasswordToken == model.Token);

            if (user is null)
            {
                return GetActionResult(CommandResult.Token_WrongToken);
            }

            user.ChangePasswordToken = null;
            user.Password = _passwordHasher.GetHash(model.Password);

            DbContext.ApplicationUsers.Update(user);
            await DbContext.SaveChangesAsync();

            return GetActionResult(CommandResult.OK);
        }

        private async Task<TokenResponseModel> GetToken(TokenRequestModel model)
        {
            // check if there's an user with the given username
            var user = await DbContext!.ApplicationUsers
                .Include(x => x.UserRole)
                .SingleOrDefaultAsync(y => y.Login == model.username);

            if (user is null)
            {
                return new TokenResponseModel()
                {
                    token = null,
                    expiration = 0,
                    code = (int)HttpStatusCode.Unauthorized
                };
            }

            var hashedPassword = _passwordHasher.GetHash(model.password);

            if (user.Password.ToLower() != hashedPassword.ToLower())
            {
                // user does not exists or password mismatch
                return new TokenResponseModel()
                {
                    token = null,
                    expiration = 0,
                    code = (int)HttpStatusCode.Unauthorized
                };
            }

            return await GetToken(user);
        }
        private async Task<TokenResponseModel> GetToken(User user)
        {
            if (user is null)
            {
                return new TokenResponseModel()
                {
                    token = null,
                    expiration = 0,
                    code = (int)HttpStatusCode.Unauthorized
                };
            }

            if (!user.IsActive)
            {
                return new TokenResponseModel()
                {
                    token = null,
                    expiration = 0,
                    code = (int)CommandResult.Token_NotActice
                };
            }

            // username & password matches: create and return theJwt token.
            DateTime now = DateTime.UtcNow;

            var userRoleIdWithName = await _languageableService.GetEntityIdsWithNamesInCurrentUserLanguageAsync<UserRoleToLanguage>(EntityIdsFilterModeEnum.Include, new List<int> { user.UserRoleId }, user.LanguageId);

            //add the registered claims for JWT (RFC7519).
            //For more info, see https: //tools.ietf.org/html/rfc7519#section-4.1
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

            var tokenExpirationMins = Configuration.GetValue<int>("Auth:Jwt:TokenExpirationInMinutes");
            var issuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["Auth:Jwt:Key"]!));
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = now.Add(TimeSpan.FromMinutes(tokenExpirationMins)),
                SigningCredentials = new SigningCredentials(issuerSigningKey, SecurityAlgorithms.HmacSha256Signature),
                Issuer = Configuration["Auth:Jwt:Issuer"],
                Audience = Configuration["Auth:Jwt:Audience"],
                NotBefore = now
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var encodedToken = tokenHandler.WriteToken(token);

            user.RefreshToken = Guid.NewGuid();
            user.IsTokenRefreshRequired = false;

            DbContext!.ApplicationUsers.Update(user);
            await DbContext.SaveChangesAsync();

            // build & return the response
            return new TokenResponseModel()
            {
                token = encodedToken,
                refreshToken = user.RefreshToken,
                expiration = tokenExpirationMins,
                code = (int)HttpStatusCode.OK
            };
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

    public class ResetPasswordModel
    {
        public string LoginOrEmail { get; set; } = null!;
        public string Language { get; set; } = null!;
    }

    public class ChangePasswordModel
    {
        public Guid Token { get; set; }
        public string Password { get; set; } = null!;
    }

    public class TokenModel
    {
        public string Token { get; set; } = null!;
        public Guid? RefreshToken { get; set; } = null!;
    }
}