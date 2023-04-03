namespace Equiprent.Entities.Interfaces
{
    public interface ICreateable
    {
        DateTime CreatedOn { get; set; }
        int? CreatedById { get; set; }
    }
}
