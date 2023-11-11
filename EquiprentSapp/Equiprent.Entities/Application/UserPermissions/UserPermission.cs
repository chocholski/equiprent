namespace Equiprent.Entities.Application.UserPermissions
{
    public partial class UserPermission : DictionaryBase
    {
        [MaxLength(50)]
        public string SystemName { get; set; } = null!;
    }
}
