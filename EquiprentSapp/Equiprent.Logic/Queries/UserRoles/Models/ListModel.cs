namespace Equiprent.Logic.Queries.UserRoles.Models
{
    public class ListModel
    {
        public int TotalRowsCount { get; set; }
        public List<UserRoleListItemModel> List { get; set; }

        public ListModel()
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
