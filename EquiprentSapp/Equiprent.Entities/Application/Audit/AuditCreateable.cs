namespace Equiprent.Entities.Application
{
    public partial class Audit : ICreateable
    {
        public DateTime CreatedOn { get; set; }

        [ForeignKey("CreatedByUser")]
        public Guid? CreatedById { get; set; }
        public virtual User? CreatedByUser { get; set; }
    }
}
