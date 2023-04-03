namespace Equiprent.Data.CustomQueries
{
    public class AuditQueries
    {
        public static string GetAudit(string id, string tableName)
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
                where
                    a.TableName = '{tableName}' and a.KeyValue = '{id}'
                ";
        }
    }
}
