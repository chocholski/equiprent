using Equiprent.Logic.Abstractions;

namespace Equiprent.Logic.Commands.UserRoles.Requests.Save
{
    public record SaveRequest : NameInLanguagesBaseResponse
    {
        public int Id { get; set; }
        public List<PermissionItemModel> PermissionsSelected { get; set; } = new();
    }
}
