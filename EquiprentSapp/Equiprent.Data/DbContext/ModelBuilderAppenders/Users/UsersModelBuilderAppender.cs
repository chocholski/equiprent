using Equiprent.Entities.Application.Users;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Equiprent.Data.DbContext.ModelBuilderAppenders.Users
{
    public class UsersModelBuilderAppender : IModelBuilderAppender
    {
        public void AppendModelBuilder(ModelBuilder builder)
        {
            builder.Entity<User>().ToTable(nameof(ApplicationDbContext.Users));
            builder.Entity<User>().Property(u => u.Id)
                .HasAnnotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn)
                .ValueGeneratedOnAdd();
        }
    }
}
