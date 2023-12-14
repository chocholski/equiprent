namespace Equiprent.Entities.Business.Clients
{
    public abstract partial class Client : IDeleteable
    {
        public DateTime? DeletedOn { get; set; }

        public bool IsDeleted { get; set; }
    }
}
