using System.Security.Claims;
using Equiprent.ApplicationServices.Users;
using Equiprent.Logic.QueryData.Authentication;
using Equiprent.Data.DbContext;
using Equiprent.Web.Authentication.Models;
using Equiprent.Web.Contracts;
using Equiprent.ApplicationServices.Identities;
using Equiprent.ApplicationServices.CommandResults;

namespace Equiprent.Web.Controllers
{
    public class IdentityController : BaseApiController
    {
        private readonly IIdentityService _identityService;
        private readonly IPasswordHasher _passwordHasher;

        public IdentityController(
            ApplicationDbContext context,
            IConfiguration configuration,
            IIdentityService identityService,
            IPasswordHasher passwordHasher) : base(context, configuration)
        {
            _identityService = identityService;
            _passwordHasher = passwordHasher;
        }

        [HttpPost(ApiRoutes.Identity.Authenticate)]
        public async Task<IActionResult> Authenticate([FromBody] TokenRequestModel model)
        {
            // return a generic HTTP Status 500 (Server Error)
            // if the client payload is invalid.
            if (model is null)
                return new StatusCodeResult(500);                

            return model.grant_type switch
            {
                "password" => new JsonResult(await _identityService.GetTokenAsync(model.grant_type, model.client_secret, model.username, model.password)),
                _ => new UnauthorizedResult(),// not supported - return a HTTP 401 (Unauthorized)
            };
        }

        [HttpPost(ApiRoutes.Identity.RefreshToken)]
        public async Task<IActionResult> RefreshToken(TokenModel tokenModel)
        {
            if (tokenModel is null)
                return BadRequest("Invalid client request");

            var principal = _identityService.GetPrincipalFromToken(tokenModel.Token);

            if (principal is null)
                return BadRequest("Invalid access token or refresh token");

            var userId = principal.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userId))
                return BadRequest("Invalid access token");

            var user = await _dbContext!.Users
                .SingleOrDefaultAsync(u => u.Id.ToString() == userId &&
                                           u.RefreshToken == tokenModel.RefreshToken);

            if (user is null)
                return BadRequest("Invalid access token or refresh token");

            return new JsonResult(await _identityService.GetTokenAsync(user));
        }

        [HttpGet(ApiRoutes.Identity.IsEmptyPassword)]
        public async Task<ActionResult<bool>> IsEmptyPassword([FromQuery] string login)
        {
            var user = await _dbContext!.Users
                .Where(u => u.Login == login)
                .Select(u => new { u.Password })
                .FirstOrDefaultAsync();

            if (user is null)
                return BadRequest();

            return string.IsNullOrEmpty(user.Password);
        }

        [HttpPut(ApiRoutes.Identity.ChangePassword)]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordModel model)
        {
            var user = await _dbContext!.Users
                .FirstOrDefaultAsync(u => u.ChangePasswordToken == model.Token);

            if (user is null)
                return GetActionResult(CommandResult.Token_WrongToken);

            user.ChangePassword(password: _passwordHasher.GetHash(model.Password));

            await _dbContext.Users.UpdateAsync(user);

            return GetActionResult(CommandResult.OK);
        }
    }
}