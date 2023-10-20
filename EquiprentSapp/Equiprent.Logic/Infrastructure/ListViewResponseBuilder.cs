using Equiprent.Logic.Abstractions;

namespace Equiprent.Logic.Infrastructure
{
    public class ListViewResponseBuilder
    {
        public static async Task<TEntityViewModel?> GetListViewResponseAsync<TEntityViewModel, TEntity, TEntityViewItemModel>(
            RequestParameters requestParameters,
            IQueryable<TEntity> query,
            IServiceProvider serviceProvider)
                where TEntityViewModel : ListViewModelBaseResponse<TEntity, TEntityViewItemModel>
                where TEntity : class
                where TEntityViewItemModel : class
        {
            var listViewModel = Activator.CreateInstance(typeof(TEntityViewModel), requestParameters, query, serviceProvider);

            if (listViewModel is TEntityViewModel entityViewModel)
            {
                await entityViewModel.FetchAsync();

                return entityViewModel;
            }

            return null;
        }
    }
}
