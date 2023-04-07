namespace Equiprent.Entities.Application
{
    public partial class UserPermission : DictionaryBase
    {
        [MaxLength(50)]
        public string SystemName { get; set; } = null!;
    }
}
