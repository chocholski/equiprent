using Equiprent.Logic.Attributes;

namespace Equiprent.Logic.Queries.UserRoles.Responses.PagedUserRolesList
{
    public class UserRoleListItemModel
    {
        public required int Id { get; set; }

        [SortColumn]
        public required string Name { get; set; }
    }
}
