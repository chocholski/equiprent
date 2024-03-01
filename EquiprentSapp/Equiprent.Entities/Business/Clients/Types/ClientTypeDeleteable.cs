namespace Equiprent.Entities.Business.ClientTypes
{
    public partial class ClientType : IDeleteable
    {
        public DateTime? DeletedOn { get; set; }

        public bool IsDeleted { get; set; }
    }
}
