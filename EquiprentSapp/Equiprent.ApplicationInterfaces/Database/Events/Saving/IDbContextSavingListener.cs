namespace Equiprent.ApplicationInterfaces.Database.Events.Saving
{
    public interface IDbContextSavingListener
    {
        public Task OnBeforeSaveChangesAsync(Guid? currentUserId);
        public Task OnAfterSaveChangesAsync();
    }
}
