namespace Equiprent.Data.CustomQueries.Builders
{
    public record CustomQueryColumn(string ColumnName)
    {
        public string? ColumnAlias { get; set; }

        public JoinedTable? JoinedTable { get; set; }

        public string? TableAlias { get; set; }

        public string? TableName { get; set; }

        public string? JoinedForeignKey { get; set; }

        public bool Validate()
        {
            return !GetType()
                .GetProperties()
                .Where(p =>
                    (
                        p.PropertyType == typeof(string) ||
                        Nullable.GetUnderlyingType(p.PropertyType) == typeof(string)
                    ) &&
                    (((string?)p.GetValue(this))?.Contains(';') ?? false))
                .Any();
        }
    }
}
