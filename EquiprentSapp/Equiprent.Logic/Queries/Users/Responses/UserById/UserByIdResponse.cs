namespace Equiprent.Logic.Queries.Users.Responses.UserById
{
    public record UserByIdResponse
    {
        public string? CreatedById { get; set; }
        public DateTime CreatedOn { get; set; }
        public string? Email { get; set; }
        public string FirstName { get; set; } = null!;
        public Guid Id { get; set; }
        public bool IsActive { get; set; }
        public string LastName { get; set; } = null!;
        public string Login { get; set; } = null!;
        public int UserRoleId { get; set; }
    }
}
