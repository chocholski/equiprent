using Equiprent.ApplicationInterfaces.CommandResults;
using Equiprent.Data.DbContext;
using Equiprent.Extensions;
using Equiprent.Logic.Abstractions;

namespace Equiprent.Logic.Commands.UserRoles.Requests.Create
{
    public class CreateRequestValidator : RequestValidator<CreateRequest>
    {
        public CreateRequestValidator(ApplicationDbContext dbContext, IServiceProvider serviceProvider) : base(dbContext, serviceProvider) { }

        protected override CommandResult ValidateRequestWithDatabase(CreateRequest request)
        {
            if (request is null)
                return CommandResult.BadRequest;

            var existingUserRolesNamesInLanguages = _dbContext.UserRolesToLanguages
                .Include(roleToLanguage => roleToLanguage.UserRole)
                .Where(roleToLanguage => !roleToLanguage.UserRole.IsDeleted)
                .GroupBy(roleToLanguage => roleToLanguage.LanguageId)
                .Select(g => new { g.Key, Names = g.ToList().Select(roleToLanguage => roleToLanguage.Name).ToList() })
                .ToDictionary(kvp => kvp.Key, kvp => kvp.Names);

            var doesUserRoleExistWithinDatabase = request.NameInLanguages
                .Any(userRole =>
                    existingUserRolesNamesInLanguages.Any(roleNameInLanguage =>
                        roleNameInLanguage.Key == userRole.LanguageId &&
                        roleNameInLanguage.Value.Contains(userRole.Name)));

            if (doesUserRoleExistWithinDatabase)
                return CommandResult.UserRole_ExistsInDatabase;

            if (request.PermissionsSelected.IsNullOrEmpty())
                return CommandResult.UserRole_NoUserPermissionAssigned;

            return CommandResult.OK;
        }
    }
}
