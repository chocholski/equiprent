namespace Equiprent.Entities.Interfaces
{
    public interface ICreateable
    {
        Guid? CreatedById { get; set; }

        DateTime CreatedOn { get; set; }
    }
}
