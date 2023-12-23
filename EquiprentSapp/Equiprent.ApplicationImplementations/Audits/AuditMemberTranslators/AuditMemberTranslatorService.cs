using Equiprent.ApplicationImplementations.Audits.AuditMemberTranslators.Models;
using Equiprent.ApplicationInterfaces.Audits.AuditMemberTranslators;
using Microsoft.Extensions.Configuration;

namespace Equiprent.ApplicationImplementations.Audits.AuditMemberTranslators
{
    public class AuditMemberTranslatorService : IAuditMemberTranslatorService
    {
        private readonly List<TranslationItem>? _translations;

        public AuditMemberTranslatorService(IConfiguration configuration)
        {
            var filePath = configuration["Paths:AuditTranslation"];

            if (!string.IsNullOrEmpty(filePath))
            {
                if (File.Exists(filePath))
                {
                    using var file = File.OpenText(filePath);
                    var serializer = new JsonSerializer();

                    _translations = ((List<TranslationItem>)serializer.Deserialize(file, typeof(List<TranslationItem>))!)
                        .Distinct()
                        .ToList();
                }
            }
        }

        public string Translate(string dbName) => _translations?.Find(item => item.DbName == dbName)?.Translation ?? dbName;

        public string GetDbName(string translation) => _translations?.SingleOrDefault(x => x.Translation == translation)?.DbName ?? translation;
    }
}
