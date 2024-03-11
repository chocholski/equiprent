namespace Equiprent.Entities.Application.Audits
{
    public partial class Audit
    {
        public required string FieldName { get; set; }

        public Guid Id { get; set; }

        public required string KeyValue { get; set; }

        public string? NewValue { get; set; }

        public string? OldValue { get; set; }

        public required string TableName { get; set; }
    }
}
