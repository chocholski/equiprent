using Microsoft.EntityFrameworkCore;

namespace Equiprent.ApplicationInterfaces.Database.Events.Saving
{
    public interface IDbContextSavingStrategy
    {
        public Task OnBeforeSaveChangesAsync(DbContext dbContext);
        public Task OnAfterSaveChangesAsync(DbContext dbContext);
    }
}
