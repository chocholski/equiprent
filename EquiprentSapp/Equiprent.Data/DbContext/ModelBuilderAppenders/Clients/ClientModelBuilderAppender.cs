using Equiprent.Entities.Business.ClientLocations;
using Equiprent.Entities.Business.Clients;

namespace Equiprent.Data.DbContext.ModelBuilderAppenders.Clients
{
    public class ClientModelBuilderAppender : IModelBuilderAppender
    {
        public void AppendModelBuilder(ModelBuilder builder)
        {
            builder.Entity<CompanyClient>();
            builder.Entity<CompanyClientLocation>();
            builder.Entity<PrivateClient>();
            builder.Entity<PrivateClientLocation>();
        }
    }
}
