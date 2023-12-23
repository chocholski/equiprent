using Microsoft.EntityFrameworkCore;

namespace Equiprent.ApplicationInterfaces.Database.Events.Saving
{
    public interface IDbContextSavingHandler
    {
        public Task OnBeforeSaveChangesAsync(DbContext dbContext, Guid? currentUserId);
        public Task OnAfterSaveChangesAsync();
    }
}
