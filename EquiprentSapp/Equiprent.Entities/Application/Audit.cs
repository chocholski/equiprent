namespace Equiprent.Entities.Application
{
    public class Audit : ICreateable
    {
        public Guid Id { get; set; }

        public string TableName { get; set; } = null!;

        #region ICreateable
        public DateTime CreatedOn { get; set; }

        [ForeignKey("CreatedByUser")]
        public int? CreatedById { get; set; }
        public virtual User? CreatedByUser { get; set; }
        #endregion       

        public int KeyValue { get; set; }

        public string FieldName { get; set; } = null!;

        public string? OldValue { get; set; }

        public string? NewValue { get; set; }
    }
}
