namespace Equiprent.Logic.Queries.UserRoles.Models
{
    public class ListResponse
    {
        public int TotalRowsCount { get; set; }
        public List<UserRoleListItemModel> List { get; set; }

        public ListResponse()
        {
            List = new List<UserRoleListItemModel>();
        }

        public class UserRoleListItemModel
        {
            public int Id { get; set; }
            public string Name { get; set; } = null!;
        }
    }
}
