using Equiprent.Logic.Attributes;

namespace Equiprent.Logic.Queries.Users.Responses.PagedUsersSelectionList
{
    public class UserSelectionListItemModel
    {
        public required string FirstName { get; set; }

        public required Guid Id { get; set; }

        public required string LastName { get; set; }

        [SortColumn]
        public required string Login { get; set; }

        public required int UserRoleId { get; set; }

        public required string UserRoleName { get; set; }
    }
}
