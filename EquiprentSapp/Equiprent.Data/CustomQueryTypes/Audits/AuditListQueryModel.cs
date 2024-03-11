namespace Equiprent.Data.CustomQueryTypes.Audits
{
    public class AuditListQueryModel
    {
        public required DateTime CreatedOn { get; set; }
        public required string UserName { get; set; }
        public required string FieldName { get; set; }
        public string? OldValue { get; set; }
        public string? NewValue { get; set; }
    }
}
