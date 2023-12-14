namespace Equiprent.Entities.Business.Representatives
{
    public abstract partial class Representative : IDeleteable
    {
        public DateTime? DeletedOn { get; set; }

        public bool IsDeleted { get; set; }
    }
}
