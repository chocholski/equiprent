﻿using Equiprent.Logic.Infrastructure.CQRS;

namespace Equiprent.Logic.Commands.Users.Messages
{
    public class ChangePasswordMessage : ICommand
    {
        public int Id { get; set; }
        public string OldPassword { get; set; } = null!;
        public string Password { get; set; } = null!;
    }
}
