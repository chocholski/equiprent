namespace Equiprent.Entities.Application
{
    public partial class User : ICreateable
    {
        public DateTime CreatedOn { get; set; }

        [ForeignKey(nameof(CreatedByUser))]
        public Guid? CreatedById { get; set; }
        public virtual User? CreatedByUser { get; set; }
    }
}
