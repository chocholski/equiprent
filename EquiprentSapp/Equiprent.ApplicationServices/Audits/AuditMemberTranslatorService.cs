using System.IO;
using Microsoft.Extensions.Configuration;

namespace Equiprent.ApplicationServices.Audits
{
    public class AuditMemberTranslatorService : IAuditMemberTranslatorService
    {
        private readonly List<TranslationItem>? _translations;

        public AuditMemberTranslatorService(IConfiguration configuration)
        {
            var filePath = configuration["AuditTranslationPath"];

            if (!string.IsNullOrEmpty(filePath) )
            {
                if (File.Exists(filePath))
                {
                    using var file = File.OpenText(filePath);
                    var serializer = new JsonSerializer();

                    _translations = (List<TranslationItem>)serializer.Deserialize(file, typeof(List<TranslationItem>))!;
                }
            }
        }

        public string Translate(string dbName)
        {
            if (_translations is null)
            {
                return dbName;
            }

            return _translations.Find(x => x.DbName == dbName)?.Translation ?? dbName;
        }

        public string GetDbName(string translation)
        {
            if (_translations is null)
            {
                return translation;
            }

            return _translations.SingleOrDefault(x => x.Translation == translation)?.DbName ?? translation;
        }

        private class TranslationItem
        {
            public string DbName { get; set; } = null!;
            public string Translation { get; set; } = null!;
        }
    }
}
