using Equiprent.ApplicationInterfaces.CommandResults;
using Equiprent.Data.DbContext;
using Equiprent.Extensions;
using Equiprent.Logic.Abstractions;

namespace Equiprent.Logic.Commands.UserRoles.Requests.Save
{
    public class SaveRequestValidator : RequestValidator<SaveRequest>
    {
        public SaveRequestValidator(ApplicationDbContext dbContext, IServiceProvider serviceProvider) : base(dbContext, serviceProvider) { }

        protected override CommandResult ValidateRequestWithDatabase(SaveRequest request)
        {
            if (request is null)
                return CommandResult.BadRequest;

            var userRoleExists = false;

            foreach (var userRole in request.NameInLanguages)
            {
                var existingUserRolesInLanguage = _dbContext.UserRolesToLanguages
                    .Include(roleToLanguage => roleToLanguage.UserRole)
                    .Where(roleToLanguage =>
                        !roleToLanguage.UserRole.IsDeleted &&
                        roleToLanguage.LanguageId == userRole.LanguageId)
                    .ToList();

                var equallyNamedUserRoleExists = existingUserRolesInLanguage
                    .Where(existingRole =>
                        existingRole.Name == userRole.Name &&
                        existingRole.UserRoleId != request.Id)
                    .Any();

                if (equallyNamedUserRoleExists)
                {
                    userRoleExists = true;
                    break;
                }
            }

            if (userRoleExists)
                return CommandResult.UserRole_ExistsInDatabase;

            if (request.PermissionsSelected.IsNullOrEmpty())
                return CommandResult.UserRole_NoUserPermissionAssigned;

            return CommandResult.OK;
        }
    }
}
