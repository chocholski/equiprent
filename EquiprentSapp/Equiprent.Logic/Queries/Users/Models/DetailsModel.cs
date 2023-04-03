namespace Equiprent.Logic.Queries.Users.Models
{
    public class DetailsModel
    {
        public int Id { get; set; }
        public string Login { get; set; } = null!;
        public DateTime CreatedOn { get; set; }
        public string? CreatedByLogin { get; set; }
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string? Email { get; set; }
        public int UserRoleId { get; set; }
        public int DepartmentId { get; set; }
        public int PositionId { get; set; }
        public int? ManagerId { get; set; }
        public string? ManagerName { get; set; }
        public int CalendarTypeAssignedId { get; set; }
        public bool IsActive { get; set; }
        //public bool IsEditableByCurrentUser { get; set; }
    }
}
