namespace Equiprent.Entities.Interfaces
{
    public interface ICreateable
    {
        DateTime CreatedOn { get; set; }
        Guid? CreatedById { get; set; }
    }
}
