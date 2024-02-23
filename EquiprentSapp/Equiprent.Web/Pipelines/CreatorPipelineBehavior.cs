using Equiprent.ApplicationInterfaces.Users;
using Equiprent.Logic.Abstractions;
using MediatR;

namespace Equiprent.Web.Pipelines
{
    public sealed class CreatorPipelineBehavior<TRequest, TResponse> : IPipelineBehavior<TRequest, TResponse>
        where TRequest : IRequest<TResponse>
    {
        private readonly IUserService _userService;

        public CreatorPipelineBehavior(IUserService userService)
        {
            _userService = userService;
        }

        public async Task<TResponse> Handle(TRequest request, RequestHandlerDelegate<TResponse> next, CancellationToken cancellationToken)
        {
            if (request is ICreatorContainable createRequest)
                createRequest.CreatedById = _userService.GetUserId()!.Value;

            return await next();
        }
    }
}
