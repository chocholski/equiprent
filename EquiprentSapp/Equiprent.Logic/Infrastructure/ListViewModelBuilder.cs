using Equiprent.Logic.Abstractions;
using Equiprent.Logic.Infrastructure.RequestParamsHelpers;

namespace Equiprent.Logic.Infrastructure
{
    public class ListViewModelBuilder
    {
        public static async Task<TEntityViewModel?> GetListViewModelAsync<TEntityViewModel, TEntity, TEntityViewItemModel>(IQueryable<TEntity> query, RequestParameters requestParameters)
            where TEntityViewModel : ListViewModelBase<TEntity, TEntityViewItemModel>
            where TEntity : class
            where TEntityViewItemModel : class
        {
            var listViewModel = Activator.CreateInstance(typeof(TEntityViewModel), query, requestParameters);

            if (listViewModel is TEntityViewModel entityViewModel)
            {
                await entityViewModel.FetchAsync();

                return entityViewModel;
            }

            return null;
        }
    }
}
