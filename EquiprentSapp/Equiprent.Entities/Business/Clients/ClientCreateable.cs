namespace Equiprent.Entities.Business.Clients
{
    public partial class Client : ICreateable
    {
        public Guid? CreatedById { get; set; }
        public DateTime CreatedOn { get; set; }
    }
}
