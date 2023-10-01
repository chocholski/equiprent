namespace Equiprent.Entities.Interfaces
{
    public interface IDeleteable
    {
        DateTime? DeletedOn { get; set; }

        bool IsDeleted { get; set; }

        void Delete()
        {
            IsDeleted = true;
            DeletedOn = DateTime.Now;
        }
    }
}
