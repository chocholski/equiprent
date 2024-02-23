namespace Equiprent.Logic.Queries.Users.Handlers.PagedUsersList
{
    public class UserDto
    {
        public string FirstName { get; set; } = null!;

        public Guid Id { get; set; }

        public bool IsActive { get; set; }

        public string LastName { get; set; } = null!;

        public string Login { get; set; } = null!;

        public int UserRoleId { get; set; }

        public string UserRoleName { get; set; } = null!;
    }
}
