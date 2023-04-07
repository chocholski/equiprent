namespace Equiprent.Entities.Application
{
    public partial class Audit
    {
        public Guid Id { get; set; }

        public string TableName { get; set; } = null!;      

        public string KeyValue { get; set; }

        public string FieldName { get; set; } = null!;

        public string? OldValue { get; set; }

        public string? NewValue { get; set; }
    }
}
