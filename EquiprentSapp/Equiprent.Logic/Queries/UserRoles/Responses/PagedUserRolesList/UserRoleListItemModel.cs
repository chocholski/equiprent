using Equiprent.Logic.Attributes;

namespace Equiprent.Logic.Queries.UserRoles.Responses.PagedUserRolesList
{
    public class UserRoleListItemModel
    {
        public int Id { get; set; }

        [SortColumn]
        public string Name { get; set; } = null!;
    }
}
