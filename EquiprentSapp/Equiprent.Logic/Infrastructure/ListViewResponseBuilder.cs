using Equiprent.Logic.Abstractions;
using System.Threading;

namespace Equiprent.Logic.Infrastructure
{
    public class ListViewResponseBuilder
    {
        public static async Task<TEntityViewModel?> GetListViewResponseAsync<TEntityViewModel, TEntity, TEntitySelectionModel, TEntityViewItemModel>(
            RequestParameters requestParameters,
            IQueryable<TEntity> query,
            IServiceProvider serviceProvider,
            CancellationToken cancellationToken = default)
                where TEntityViewModel : ListViewModelBaseResponse<TEntity, TEntitySelectionModel, TEntityViewItemModel>
                where TEntity : class
                where TEntitySelectionModel : class
                where TEntityViewItemModel : class
        {
            var listViewModel = Activator.CreateInstance(typeof(TEntityViewModel), requestParameters, query, serviceProvider);

            if (listViewModel is TEntityViewModel entityViewModel)
            {
                await entityViewModel.FetchAsync(cancellationToken);
                return entityViewModel;
            }

            return null;
        }
    }
}
