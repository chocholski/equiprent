﻿using Equiprent.Entities.Interfaces;
using Microsoft.EntityFrameworkCore.Infrastructure;

namespace Equiprent.Data.DbContext
{
    public static class ApplicationDbContextExtensions
    {
        public static async Task AddAndSaveAsync<T>(this DbSet<T> dbSet, T entity) where T : class
        {
            dbSet.Add(entity);
            await dbSet.GetService<ApplicationDbContext>().SaveChangesAsync();
        }

        public static async Task UpdateAndSaveAsync<T>(this DbSet<T> dbSet, T entity) where T : class
        {
            dbSet.Update(entity);
            await dbSet.GetService<ApplicationDbContext>().SaveChangesAsync();
        }

        public static void SoftDelete<T>(this DbSet<T> dbSet, T entity) where T : class, IDeleteable
        {
            entity.IsDeleted = true;
            dbSet.Update(entity);
        }

        public static async Task SoftDeleteAndSaveAsync<T>(this DbSet<T> dbSet, T entity) where T : class, IDeleteable
        {
            entity.IsDeleted = true;
            dbSet.Update(entity);
            await dbSet.GetService<ApplicationDbContext>().SaveChangesAsync();
        }

        public static async Task AddRangeAndSaveAsync<T>(this DbSet<T> dbSet, IEnumerable<T> entities) where T : class
        {
            dbSet.AddRange(entities);
            await dbSet.GetService<ApplicationDbContext>().SaveChangesAsync();
        }

        public static async Task UpdateRangeAndSaveAsync<T>(this DbSet<T> dbSet, IEnumerable<T> entities) where T : class
        {
            dbSet.UpdateRange(entities);
            await dbSet.GetService<ApplicationDbContext>().SaveChangesAsync();
        }

        public static async Task RemoveRangeAndSaveAsync<T>(this DbSet<T> dbSet, IEnumerable<T> entitites) where T : class
        {
            dbSet.RemoveRange(entitites);
            await dbSet.GetService<ApplicationDbContext>().SaveChangesAsync();
        }
    }
}
