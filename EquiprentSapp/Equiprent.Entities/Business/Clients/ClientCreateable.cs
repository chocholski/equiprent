namespace Equiprent.Entities.Business.Clients
{
    public abstract partial class Client : ICreateable
    {
        [CloneableProperty]
        public Guid? CreatedById { get; set; }

        [CloneableProperty]
        public DateTime CreatedOn { get; set; }
    }
}
