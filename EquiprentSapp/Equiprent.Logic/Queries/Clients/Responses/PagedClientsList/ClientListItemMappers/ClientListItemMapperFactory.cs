using Equiprent.Entities.Business.Clients;
using Equiprent.Logic.Queries.Clients.Responses.PagedClientsList.ClientListItemMappers.Mappers;

namespace Equiprent.Logic.Queries.Clients.Responses.PagedClientsList.ClientListItemMappers
{
    internal static class ClientListItemMapperFactory
    {
        public static ClientListItemMapper? CreateMapperFor(Client client)
        {
            if (client is PrivateClient privateClient)
            {
                return new PrivateClientListItemMapper(privateClient);
            }
            else if (client is CompanyClient companyClient)
            {
                return new CompanyClientListItemMapper(companyClient);
            }

            return null;
        }
    }
}
