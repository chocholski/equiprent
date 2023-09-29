using System.IO;
using Equiprent.ApplicationServices.Audits.Models;
using Microsoft.Extensions.Configuration;

namespace Equiprent.ApplicationServices.Audits
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
