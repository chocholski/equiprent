using Equiprent.Logic.Infrastructure.FluentValidation;
using FluentValidation;

namespace Equiprent.Logic.Commands.Identity.Requests.Authentication
{
    public class AuthenticationRequestValidator : AbstractValidator<AuthenticationRequest>
    {
        public AuthenticationRequestValidator() 
        {
            RuleFor(r => r.GrantType)
                .NotEmpty()
                    .WithMessage(r => FluentValidationMessageCreator<AuthenticationRequest>.CreateMessageForEmptyPropertyValue(nameof(r.GrantType)));
                
            RuleFor(r => r.GrantType)
                .Equal("password")
                    .WithMessage(r => $"The grant type: {r.GrantType} is not being handled by app.");

            RuleFor(r => r.Password)
                .NotEmpty()
                    .WithMessage(r => FluentValidationMessageCreator<AuthenticationRequest>.CreateMessageForEmptyPropertyValue(nameof(r.Password)));

            RuleFor(r => r.UserName)
                .NotEmpty()
                    .WithMessage(r => FluentValidationMessageCreator<AuthenticationRequest>.CreateMessageForEmptyPropertyValue(nameof(r.UserName)));
        }
    }
}
