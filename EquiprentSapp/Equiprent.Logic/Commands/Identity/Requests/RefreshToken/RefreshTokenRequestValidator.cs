using Equiprent.Logic.Infrastructure.FluentValidation;
using FluentValidation;

namespace Equiprent.Logic.Commands.Identity.Requests.RefreshToken
{
    public class RefreshTokenRequestValidator : AbstractValidator<RefreshTokenRequest>
    {
        public RefreshTokenRequestValidator()
        {
            RuleFor(r => r.Token)
                .NotEmpty()
                .WithMessage(r => FluentValidationMessageCreator<RefreshTokenRequest>.CreateMessageForEmptyPropertyValue(nameof(r.Token)));
        }
    }
}
