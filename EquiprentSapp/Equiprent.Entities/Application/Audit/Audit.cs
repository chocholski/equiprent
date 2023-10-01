namespace Equiprent.Entities.Application
{
    public partial class Audit
    {
        public string FieldName { get; set; } = null!;

        public Guid Id { get; set; }

        public string KeyValue { get; set; } = null!;

        public string? NewValue { get; set; }

        public string? OldValue { get; set; }

        public string TableName { get; set; } = null!;
    }
}
