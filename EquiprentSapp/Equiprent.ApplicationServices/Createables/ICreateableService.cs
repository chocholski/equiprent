using Equiprent.Entities.Interfaces;

namespace Equiprent.ApplicationServices.Createables
{
    public interface ICreateableService
    {
        public Task<string> GetCreatorNameAsync(ICreateable createableEntity);
    }
}
