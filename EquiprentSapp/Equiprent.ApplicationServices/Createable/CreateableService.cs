using Equiprent.Entities.Interfaces;

namespace Equiprent.ApplicationServices.Createable
{
    public class CreateableService : ICreateableService
    {
        private readonly ApplicationDbContext _dbContext;

        public CreateableService(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public string GetCreatorName(ICreateable createableEntity)
        {
            if (createableEntity.CreatedById.HasValue)
            {
                var creator = _dbContext.ApplicationUsers
                    .Where(x => x.Id == createableEntity.CreatedById.Value)
                    .SingleOrDefault();

                if (creator is not null)
                {
                    return creator.GetName();
                }
            }

            return string.Empty;
        }

        public async Task<string> GetCreatorNameAsync(ICreateable createableEntity)
        {
            if (createableEntity.CreatedById.HasValue)
            {
                var creator = await _dbContext.ApplicationUsers
                    .Where(x => x.Id == createableEntity.CreatedById.Value)
                    .SingleOrDefaultAsync();

                if (creator is not null)
                {
                    return creator.GetName();
                }
            }

            return string.Empty;
        }
    }
}
