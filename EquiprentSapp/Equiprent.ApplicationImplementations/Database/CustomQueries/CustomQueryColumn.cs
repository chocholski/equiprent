namespace Equiprent.ApplicationImplementations.Database.CustomQueries
{
    public class CustomQueryColumn
    {
        public string? ColumnAlias { get; set; }

        public string ColumnName { get; set; } = null!;

        public JoinedTable? JoinedTable { get; set; }

        public string? TableAlias { get; set; }

        public string? JoinedForeignKey { get; set; }

        public string TableName { get; set; } = null!;

        public CustomQueryColumn(string tableName, string columnName)
        {
            TableName = tableName;
            ColumnName = columnName;
        }

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
