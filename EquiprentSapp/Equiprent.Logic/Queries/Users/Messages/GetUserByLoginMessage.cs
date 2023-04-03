using Equiprent.Logic.Queries.Users.Models;

using static Equiprent.Logic.Infrastructure.CQRS.Queries;
namespace Equiprent.Logic.Queries.Users.Messages
{
    public record GetUserByLoginMessage : IQuery<DetailsModel>
    {
        public string Login { get; set; }

        public GetUserByLoginMessage(string login)
        {
            Login = login;
        }
    }
}
