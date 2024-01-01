using Equiprent.Data.DbContext;
using Equiprent.Web.Contracts;
using Equiprent.Logic.Commands.Identity.Requests.Authentication;
using Equiprent.Logic.Commands.Identity.Requests.RefreshToken;

namespace Equiprent.Web.Controllers
{
    public class IdentityController : BaseApiController
    {
        public IdentityController(ApplicationDbContext context, IServiceProvider serviceProvider) : base(context, serviceProvider)
        {
        }

        [HttpPost(ApiRoutes.Identity.Authenticate)]
        public async Task<IActionResult> Authenticate([FromBody] AuthenticationRequest? request)
        {
            if (request is null)
                return new StatusCodeResult(500);                

            return request.GrantType switch
            {
                "password" => new JsonResult(await _mediator.Send(request)),
                _ => new UnauthorizedResult()
            };
        }

        [HttpPost(ApiRoutes.Identity.RefreshToken)]
        public async Task<IActionResult> Refresh(RefreshTokenRequest request)
        {
            return new JsonResult(await _mediator.Send(request));
        }
    }
}