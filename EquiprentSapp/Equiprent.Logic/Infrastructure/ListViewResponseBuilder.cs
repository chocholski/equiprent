using Equiprent.ApplicationServices.Database;
using Equiprent.Logic.Abstractions;

namespace Equiprent.Logic.Infrastructure
{
    public class ListViewResponseBuilder
    {
        public static async Task<TEntityViewModel?> GetListViewResponseAsync<TEntityViewModel, TEntity, TEntityViewItemModel>(
            RequestParameters requestParameters,
            IDbStatementService dbStatementService,
            IQueryable<TEntity> query)
                where TEntityViewModel : ListViewModelBaseResponse<TEntity, TEntityViewItemModel>
                where TEntity : class
                where TEntityViewItemModel : class
        {
            var listViewModel = Activator.CreateInstance(typeof(TEntityViewModel), requestParameters, dbStatementService, query);

            if (listViewModel is TEntityViewModel entityViewModel)
            {
                await entityViewModel.FetchAsync();

                return entityViewModel;
            }

            return null;
        }
    }
}
