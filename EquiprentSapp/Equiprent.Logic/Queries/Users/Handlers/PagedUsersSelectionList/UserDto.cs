namespace Equiprent.Logic.Queries.Users.Handlers.PagedUsersSelectionList
{
    public class UserDto
    {
        public required string FirstName { get; set; }

        public required Guid Id { get; set; }

        public required string LastName { get; set; }

        public required string Login { get; set; }

        public required int UserRoleId { get; set; }

        public string? UserRoleName { get; set; }
    }
}
