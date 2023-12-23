using Equiprent.Entities.Interfaces;

namespace Equiprent.ApplicationInterfaces.Createables
{
    public interface ICreateableService
    {
        public Task<string> GetCreatorNameAsync(ICreateable createableEntity);
    }
}
