using Equiprent.Logic.Attributes;

namespace Equiprent.Logic.QueryData.UIModels
{   
    public class SelectListItemModel
    {
        public bool IsSelected { get; set; }

        [SortColumn]
        public string Name { get; set; } = null!;

        public string Value { get; set; } = null!;
    }
}
