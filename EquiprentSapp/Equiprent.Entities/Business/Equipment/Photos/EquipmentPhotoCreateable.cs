
using Equiprent.Entities.Application.Users;

namespace Equiprent.Entities.Business.Equipment.Photos
{
    public partial class EquipmentPhoto : ICreateable
    {
        [ForeignKey("CreatedByUser")]
        public Guid? CreatedById { get; set; }
        public virtual User? CreatedByUser { get; set; }

        public DateTime CreatedOn { get; set; }
    }
}
