namespace Equiprent.Logic.Queries.Users.Responses.UserById
{
    public record UserByIdResponse
    {
        public string? CreatedById { get; set; }
        public required DateTime CreatedOn { get; set; }
        public string? Email { get; set; }
        public required string FirstName { get; set; }
        public required Guid Id { get; set; }
        public required bool IsActive { get; set; }
        public required string LastName { get; set; }
        public required string Login { get; set; }
        public required int UserRoleId { get; set; }
    }
}
