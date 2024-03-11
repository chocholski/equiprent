using Equiprent.Logic.Attributes;

namespace Equiprent.Logic.Queries.Users.Responses.PagedUsersList
{
    public class UserListItemViewModel
    {
        [SortColumn]
        public required string FirstName { get; set; }

        public required Guid Id { get; set; }

        public required bool IsActive { get; set; }

        public required string LastName { get; set; }

        public required string Login { get; set; }

        public required int UserRoleId { get; set; }

        public required string UserRoleName { get; set; }
    }
}
