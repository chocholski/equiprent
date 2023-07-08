﻿using Equiprent.Logic.Infrastructure.CQRS;

namespace Equiprent.Logic.Commands.Users.Requests.Delete
{
    public record DeleteRequest(Guid Id) : ICommand;
}