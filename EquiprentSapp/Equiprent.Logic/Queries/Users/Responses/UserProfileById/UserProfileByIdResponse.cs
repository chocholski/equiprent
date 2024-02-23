namespace Equiprent.Logic.Queries.Users.Responses.UserProfileById
{
    public record UserProfileByIdResponse
    {
        public string? Email { get; set; }
        public string FirstName { get; set; } = null!;
        public Guid Id { get; set; }
        public string LastName { get; set; } = null!;
        public string Login { get; set; } = null!;
        public int UserRoleId { get; set; }
    }
}
