namespace Equiprent.Logic.Queries.Users.Responses.UserProfileById
{
    public record UserProfileByIdResponse
    {
        public string? Email { get; set; }
        public required string FirstName { get; set; } = null!;
        public required Guid Id { get; set; }
        public required string LastName { get; set; } = null!;
        public required string Login { get; set; } = null!;
        public required int UserRoleId { get; set; }
    }
}
