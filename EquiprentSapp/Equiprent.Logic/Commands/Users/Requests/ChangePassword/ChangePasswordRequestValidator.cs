using FluentValidation;

namespace Equiprent.Logic.Commands.Users.Requests.ChangePassword
{
    public class ChangePasswordRequestValidator : AbstractValidator<ChangePasswordRequest>
    {
        public ChangePasswordRequestValidator() 
        {
            RuleFor(r => r.OldPassword)
                .NotEmpty();

            RuleFor(r => r.Password)
                .NotEmpty();
        }
    }
}
