using Equiprent.Data.DbContext;

namespace Equiprent.ApplicationImplementations.Database.CustomQueries
{
    public class CustomQueryBuilder
    {
        private readonly ApplicationDbContext _dbContext;

        public CustomQueryBuilder(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }
    }
}
