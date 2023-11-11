namespace Equiprent.Entities.Application.Users
{
    public partial class User : IDeleteable
    {
        public bool IsDeleted { get; set; }

        public DateTime? DeletedOn { get; set; }
    }
}
