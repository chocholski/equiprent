﻿using Equiprent.Logic.Abstractions;
using Equiprent.Logic.Infrastructure.CQRS;

namespace Equiprent.Logic.Commands.UserRoles.Requests.Create
{
    public record CreateRequest : NameInLanguagesBaseResponse, ICommand
    {
        public List<PermissionItemModel> PermissionsSelected { get; set; } = new();
    }
}
