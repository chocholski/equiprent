namespace Equiprent.Entities.Application
{
    public class UserPermission : DictionaryBase, IDeleteable
    {
        [MaxLength(50)]
        public string SystemName { get; set; } = null!;

        #region IDeleteable
        public bool IsDeleted { get; set; }

        public DateTime? DeletedOn { get; set; }
        #endregion        
    }
}
