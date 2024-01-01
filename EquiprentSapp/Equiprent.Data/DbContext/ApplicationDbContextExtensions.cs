using Equiprent.Entities.Interfaces;
using Microsoft.EntityFrameworkCore.Infrastructure;
using System.Threading;

namespace Equiprent.Data.DbContext
{
    public static class ApplicationDbContextExtensions
    {
        public static async Task AddAndSaveAsync<T>(this DbSet<T> dbSet, T entity, CancellationToken cancellationToken = default) where T : class
        {
            dbSet.Add(entity);
            await dbSet.GetService<ApplicationDbContext>().SaveChangesAsync(cancellationToken);
        }

        public static async Task UpdateAndSaveAsync<T>(this DbSet<T> dbSet, T entity, CancellationToken cancellationToken = default) where T : class
        {
            dbSet.Update(entity);
            await dbSet.GetService<ApplicationDbContext>().SaveChangesAsync(cancellationToken);
        }

        public static void SoftDelete<T>(this DbSet<T> dbSet, T entity) where T : class, IDeleteable
        {
            entity.IsDeleted = true;
            dbSet.Update(entity);
        }

        public static async Task SoftDeleteAndSaveAsync<T>(this DbSet<T> dbSet, T entity, CancellationToken cancellationToken = default) where T : class, IDeleteable
        {
            entity.IsDeleted = true;
            dbSet.Update(entity);
            await dbSet.GetService<ApplicationDbContext>().SaveChangesAsync(cancellationToken);
        }

        public static async Task AddRangeAndSaveAsync<T>(this DbSet<T> dbSet, IEnumerable<T> entities, CancellationToken cancellationToken = default) where T : class
        {
            dbSet.AddRange(entities);
            await dbSet.GetService<ApplicationDbContext>().SaveChangesAsync(cancellationToken);
        }

        public static async Task UpdateRangeAndSaveAsync<T>(this DbSet<T> dbSet, IEnumerable<T> entities, CancellationToken cancellationToken = default) where T : class
        {
            dbSet.UpdateRange(entities);
            await dbSet.GetService<ApplicationDbContext>().SaveChangesAsync(cancellationToken);
        }

        public static async Task RemoveRangeAndSaveAsync<T>(this DbSet<T> dbSet, IEnumerable<T> entities, CancellationToken cancellationToken = default) where T : class
        {
            dbSet.RemoveRange(entities);
            await dbSet.GetService<ApplicationDbContext>().SaveChangesAsync(cancellationToken);
        }
    }
}
