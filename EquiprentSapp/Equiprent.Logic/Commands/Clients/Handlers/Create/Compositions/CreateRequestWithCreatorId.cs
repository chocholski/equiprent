using Equiprent.Logic.Commands.Clients.Requests.Create;

namespace Equiprent.Logic.Commands.Clients.Handlers.Create.Compositions
{
    internal class CreateRequestWithCreatorId : CreateRequest
    {
        public Guid CreatedById { get; set; }
       
        public CreateRequestWithCreatorId(CreateRequest request, Guid createdById)
        {
            CopyPropertiesFromRequest(request);
            CreatedById = createdById;
        }

        private void CopyPropertiesFromRequest(CreateRequest sourceRequest)
        {
            var requestProperties = sourceRequest.GetType().GetProperties();
            foreach (var requestProperty in requestProperties)
            {
                var destinationProperty = GetType().GetProperty(requestProperty.Name);
                if (destinationProperty != null && destinationProperty.CanWrite)
                {
                    var value = requestProperty.GetValue(sourceRequest, null);
                    destinationProperty.SetValue(this, value, null);
                }
            }
        }
    }
}
