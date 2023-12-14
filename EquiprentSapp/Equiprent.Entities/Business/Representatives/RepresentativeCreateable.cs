namespace Equiprent.Entities.Business.Representatives
{
    public abstract partial class Representative : ICreateable
    {
        public Guid? CreatedById { get; set; }

        public DateTime CreatedOn { get; set; }
    }
}
