namespace Equiprent.Entities.Application.UserPermissions
{
    public partial class UserPermission : DictionaryBase
    {
        [MaxLength(50)]
        public required string SystemName { get; set; }
    }
}
