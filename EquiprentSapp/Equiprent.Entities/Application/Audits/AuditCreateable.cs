using Equiprent.Entities.Application.Users;

namespace Equiprent.Entities.Application.Audits
{
    public partial class Audit : ICreateable
    {
        [ForeignKey("CreatedByUser")]
        public Guid? CreatedById { get; set; }
        public virtual User? CreatedByUser { get; set; }

        public DateTime CreatedOn { get; set; }
    }
}
