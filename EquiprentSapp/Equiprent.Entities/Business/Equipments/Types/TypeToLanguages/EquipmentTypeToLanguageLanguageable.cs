﻿using Equiprent.Entities.Application.Languages;

namespace Equiprent.Entities.Business.Equipments.Types.TypeToLanguages
{
    public partial class EquipmentTypeToLanguage : ILanguageable
    {
        [ForeignKey(nameof(Language))]
        public int LanguageId { get; set; }
        public virtual Language Language { get; set; } = null!;
    }
}