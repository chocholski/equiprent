namespace Equiprent.Logic.Infrastructure.CQRS
{
    public class Queries
    {
        public interface IQuery<TResult>
        {
        }

        public interface IQueryHandler<TQuery, TResult> where TQuery : IQuery<TResult>
        {
            Task<TResult?> HandleAsync(TQuery query);
        }

        public interface IQueryDispatcher
        {
            Task<TResult?> SendQueryAsync<TQuery, TResult>(TQuery query) where TQuery : IQuery<TResult>;
        }

        public class QueryDispatcher : IQueryDispatcher
        {
            private readonly IServiceProvider _serviceProvider;

            public QueryDispatcher(IServiceProvider serviceProvider)
            {
                _serviceProvider = serviceProvider;
            }

            public async Task<TResult?> SendQueryAsync<TQuery, TResult>(TQuery query) where TQuery : IQuery<TResult>
            {
                var service = _serviceProvider.GetService(typeof(IQueryHandler<TQuery, TResult>)) as IQueryHandler<TQuery, TResult>;

                return service is not null ? await service.HandleAsync(query) : default;
            }
        }
    }
}
