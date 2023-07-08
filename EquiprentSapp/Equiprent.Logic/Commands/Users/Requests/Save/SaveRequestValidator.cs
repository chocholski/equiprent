﻿using FluentValidation;

namespace Equiprent.Logic.Commands.Users.Requests.Save
{
    public class SaveRequestValidator : AbstractValidator<SaveRequest>
    {
        public SaveRequestValidator() 
        {
            RuleFor(r => r.Login)
                .NotEmpty();

            RuleFor(r => r.Password)
                .NotEmpty();

            RuleFor(r => r.FirstName)
                .NotEmpty();

            RuleFor(r => r.LastName)
                .NotEmpty();

            RuleFor(r => r.Email)
                .EmailAddress();
        }
    }
}