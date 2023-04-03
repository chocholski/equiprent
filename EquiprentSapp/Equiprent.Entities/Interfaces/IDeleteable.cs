namespace Equiprent.Entities.Interfaces
{
    public interface IDeleteable
    {
        bool IsDeleted { get; set; }
        DateTime? DeletedOn { get; set; }

        void Delete()
        {
            IsDeleted = true;
            DeletedOn = DateTime.Now;
        }
    }
}
