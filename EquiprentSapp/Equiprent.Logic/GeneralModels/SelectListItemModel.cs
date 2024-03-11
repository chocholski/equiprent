using Equiprent.Logic.Attributes;

namespace Equiprent.Logic.GeneralModels
{
    public class SelectListItemModel
    {
        public bool IsSelected { get; set; }

        [SortColumn]
        public required string Name { get; set; }

        public required string Value { get; set; }
    }
}
