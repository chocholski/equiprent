using Equiprent.Entities.Business.Clients;
using Equiprent.Logic.Queries.Clients.Responses.PagedClientsSelectionList.ClientSelectionListItemMappers.Mappers;

namespace Equiprent.Logic.Queries.Clients.Responses.PagedClientsSelectionList.ClientSelectionListItemMappers
{
    internal static class ClientSelectionListItemMapperFactory
    {
        public static ClientSelectionListItemMapper? CreateMapperFor(Client client)
        {
            if (client is PrivateClient privateClient)
            {
                return new PrivateClientSelectionListItemMapper(privateClient);
            }
            else if (client is CompanyClient companyClient)
            {
                return new CompanyClientSelectionListItemMapper(companyClient);
            }

            return null;
        }
    }
}
