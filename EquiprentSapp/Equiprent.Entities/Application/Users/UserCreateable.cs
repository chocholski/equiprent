namespace Equiprent.Entities.Application.Users
{
    public partial class User : ICreateable
    {
        [ForeignKey(nameof(CreatedByUser))]
        public Guid? CreatedById { get; set; }
        public virtual User? CreatedByUser { get; set; }

        public DateTime CreatedOn { get; set; }
    }
}
