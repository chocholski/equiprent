
namespace Equiprent.Entities.Business.Rentals.Sublettings
{
    public partial class Subletting : ICreateable
    {
        public Guid? CreatedById { get; set; }

        public required DateTime CreatedOn { get; set; }
    }
}
