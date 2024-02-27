namespace Equiprent.Data.CustomQueries.Queries.Audits
{
    public static class AuditQueries
    {
        public static string GetAuditQuery(string id, string tableName)
        {
            return $@"
                SELECT 
                    u.Login as UserName,
	                a.CreatedOn,
                    a.FieldName,
	                a.OldValue,
	                a.NewValue
                FROM 
	                Audits a
                INNER JOIN 
                    Users u ON u.Id = a.CreatedById
                WHERE
                    a.TableName = '{tableName}'
                    AND
                    a.KeyValue = '{id}'
                ";
        }
    }
}
