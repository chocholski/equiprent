using Equiprent.ApplicationServices.UserPermissions;
using Equiprent.Data.DbContext;
using Equiprent.Data.Services;
using Equiprent.Logic.Abstractions;
using Equiprent.Logic.Queries.UserRoles.Requests;
using Equiprent.Logic.Queries.UserRoles.Responses.UserRoleById;
using static Equiprent.Logic.Infrastructure.CQRS.Queries;

namespace Equiprent.Logic.Queries.UserRoles.Handlers
{
    public class GetUserRoleByIdHandler : IQueryHandler<GetUserRoleByIdRequest, UserRoleByIdResponse>
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IUserPermissionService _userPermissionsService;
        private readonly IUserService _userResolverService;

        public GetUserRoleByIdHandler(
            ApplicationDbContext dbContext,
            IUserPermissionService userPermissionsService,
            IUserService userResolverService)
        {
            _dbContext = dbContext;
            _userPermissionsService = userPermissionsService;
            _userResolverService = userResolverService;
        }

        public async Task<UserRoleByIdResponse?> HandleAsync(GetUserRoleByIdRequest request)
        {
            var userRole = await _dbContext.UserRoles
                .SingleOrDefaultAsync(r => !r.IsDeleted && r.Id == request.RoleId);

            if (userRole is null)
                return null;

            var allUserPermissions = await _userPermissionsService.GetAllUserPermissionsAsync();
            var userRolePermissions = await _userPermissionsService.GetUserRolePermissionsAsync(userRole.Id);

            var userRolePermissionsList = new List<UserRolePermissionListItemModel>(
                allUserPermissions
                    .Select(p => new UserRolePermissionListItemModel
                    {
                        UserPermissionId = p.Id,
                        SystemName = p.SystemName,
                        Name = p.Name,
                        IsSelected = userRolePermissions.Contains(p)
                    }));

            var userPermissionsInGroups = userRolePermissionsList
                .GroupBy(p => p.SystemName.Split("_")[0])
                .Select(g => new
                {
                    GroupName = $"Permissions.{g.Key}",
                    PermissionsList = g.ToList()
                })
                .ToList();

            var listGroupModel = new List<UserRolePermissionsListGroupItemModel>();

            foreach (var group in userPermissionsInGroups)
            {
                var groupModel = new UserRolePermissionsListGroupItemModel
                {
                    GroupName = group.GroupName
                };

                foreach (var permission in group.PermissionsList)
                {
                    groupModel.Permissions.Add(new UserRolePermissionListItemModel
                    {
                        UserPermissionId = permission.UserPermissionId,
                        SystemName = permission.SystemName,
                        Name = permission.Name,
                        IsSelected = permission.IsSelected,
                        LinkedUserPermissions = await _userPermissionsService.GetAllLinkedPermissionsIdsAsync(permission.UserPermissionId)
                    });
                }

                listGroupModel.Add(groupModel);
            }

            var result = new UserRoleByIdResponse
            {
                Id = userRole.Id,
                UserRolePermissionsList = listGroupModel
            };

            var currentUserLanguageId = await _userResolverService.GetCurrentUserLanguageIdAsync();

            if (!currentUserLanguageId.HasValue)
                return result;

            result.NameInLanguages = await _dbContext.UserRolesToLanguages
                .Where(roleToLanguage => roleToLanguage.UserRoleId == userRole.Id)
                .Select(roleToLanguage => new NameInLanguage(roleToLanguage.Name, roleToLanguage.LanguageId, roleToLanguage.Language.Name))
                .ToListAsync();

            result.Name = result.NameInLanguages
                .Where(nameInLanguage => nameInLanguage.LanguageId == currentUserLanguageId.Value)
                .Select(nameInLanguage => nameInLanguage.Name)
                .FirstOrDefault()
                ??
                string.Empty;

            return result;
        }
    }
}
