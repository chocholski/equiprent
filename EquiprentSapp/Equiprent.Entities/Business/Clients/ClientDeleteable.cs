namespace Equiprent.Entities.Business.Clients
{
    public partial class Client : IDeleteable
    {
        public DateTime? DeletedOn { get; set; }
        public bool IsDeleted { get; set; }
    }
}
