using Equiprent.Logic.Commands.Users.Requests.Create;
using FluentValidation;
using FluentValidation.AspNetCore;

namespace Equiprent.Web.Installers
{
    public class FluentValidationInstaller : IInstaller
    {
        public void InstallServices(WebApplicationBuilder builder)
        {
            builder.Services.AddFluentValidationAutoValidation();
            builder.Services.AddValidatorsFromAssemblyContaining<CreateRequestValidator>();
        }
    }
}
