namespace Equiprent.Data.DbContext
{
    public static class ApplicationDbContextExtensions
    {
        public static async Task UpdateAsync<T>(this DbSet<T> dbSet, T entity, ApplicationDbContext context) where T : class
        {
            dbSet.Update(entity);

            await context.SaveChangesAsync();
        }
    }
}
