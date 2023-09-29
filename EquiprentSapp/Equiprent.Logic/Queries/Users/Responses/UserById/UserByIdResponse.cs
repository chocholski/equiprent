namespace Equiprent.Logic.Queries.Users.Responses.UserById
{
    public record UserByIdResponse
    {
        public int Id { get; set; }
        public string Login { get; set; } = null!;
        public DateTime CreatedOn { get; set; }
        public string? CreatedByLogin { get; set; }
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string? Email { get; set; }
        public int UserRoleId { get; set; }
        public bool IsActive { get; set; }
    }
}
