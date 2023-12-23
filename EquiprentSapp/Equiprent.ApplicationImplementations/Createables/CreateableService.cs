using Equiprent.ApplicationInterfaces.Createables;
using Equiprent.Data.DbContext;
using Equiprent.Entities.Interfaces;

namespace Equiprent.ApplicationImplementations.Createables
{
    public class CreateableService : ICreateableService
    {
        private readonly ApplicationDbContext _dbContext;

        public CreateableService(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<string> GetCreatorNameAsync(ICreateable createableEntity)
        {
            if (createableEntity.CreatedById.HasValue)
            {
                var creator = await _dbContext.Users
                    .Where(u => u.Id == createableEntity.CreatedById.Value)
                    .SingleOrDefaultAsync();

                return creator?.GetName() ?? string.Empty;
            }

            return string.Empty;
        }
    }
}
