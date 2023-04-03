using Equiprent.Entities.Interfaces;

namespace Equiprent.ApplicationServices.Createable
{
    public interface ICreateableService
    {
        public string GetCreatorName(ICreateable createableEntity);
        public Task<string> GetCreatorNameAsync(ICreateable createableEntity);
    }
}
