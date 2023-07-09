using Microsoft.AspNetCore.Mvc.Filters;

namespace Equiprent.Web.Filters
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
    public class ApiKeyFilterAttribute : Attribute, IAsyncActionFilter
    {
        private const string ApiKeyHeaderName = "ApiKey";

        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            if (!context.HttpContext.Request.Headers.TryGetValue(ApiKeyHeaderName, out var potentialApiKey))
            {
                context.Result = new UnauthorizedResult();

                return;
            }

            var configuration = context.HttpContext.RequestServices.GetService<IConfiguration>();
            var apiKey = configuration?.GetValue<string>(key: "ApiKey");

            if (apiKey is null || !apiKey!.Equals(potentialApiKey))
            {
                context.Result = new UnauthorizedResult();

                return;
            }

            await next();
        }
    }
}
