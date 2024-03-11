﻿using Equiprent.ApplicationInterfaces.CommandResults;
using Equiprent.Logic.GeneralModels;
using MediatR;

namespace Equiprent.Logic.Commands.Clients.Requests.SaveClientRepresentative
{
    public class SaveRequest : IRequest<CommandResult?>
    {
        public required AddressModel Address { get; set; }
        public Guid ClientId { get; set; }
        public required string FirstName { get; set; }
        public Guid Id { get; set; }
        public required string LastName { get; set; }
    }
}
