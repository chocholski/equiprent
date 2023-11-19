using Equiprent.Entities.Business.ClientAddresses;
using Equiprent.Entities.Business.Clients;

namespace Equiprent.Data.DbContext.ModelBuilderAppenders.Clients
{
    public class ClientModelBuilderAppender : IModelBuilderAppender
    {
        public void AppendModelBuilder(ModelBuilder builder)
        {
            builder.Entity<CompanyClient>();
            builder.Entity<CompanyClientAddress>();
            builder.Entity<PrivateClient>();
            builder.Entity<PrivateClientAddress>();
        }
    }
}
