using Equiprent.ApplicationInterfaces.UserPermissions;
using Equiprent.ApplicationInterfaces.Users.Languages;
using Equiprent.Data.DbContext;
using Equiprent.Entities.Application.UserRoles;
using Equiprent.Logic.Abstractions;
using Equiprent.Logic.Queries.UserRoles.Requests;
using Equiprent.Logic.Queries.UserRoles.Responses.UserRoleById;
using MediatR;
using System.Threading;

namespace Equiprent.Logic.Queries.UserRoles.Handlers.UserRoleById
{
    public class GetUserRoleByIdHandler : IRequestHandler<GetUserRoleByIdRequest, UserRoleByIdResponse?>
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IUserLanguageService _userLanguageService;
        private readonly IUserPermissionService _userPermissionsService;

        private UserRoleByIdResponse? _response;

        public GetUserRoleByIdHandler(
            ApplicationDbContext dbContext,
            IUserLanguageService userLanguageService,
            IUserPermissionService userPermissionsService)
        {
            _dbContext = dbContext;
            _userLanguageService = userLanguageService;
            _userPermissionsService = userPermissionsService;
        }

        public async Task<UserRoleByIdResponse?> Handle(GetUserRoleByIdRequest request, CancellationToken cancellationToken)
        {
            var userRole = await GetUserRoleAsync(request.RoleId);

            if (userRole is null)
                return null;

            _response = new UserRoleByIdResponse { Id = userRole.Id };

            await SetResponseUserRolePermissionsAsync(cancellationToken);
            await SetResponseUserRoleNameInLanguagesAsync(cancellationToken);

            return _response;
        }

        private async Task<UserRole?> GetUserRoleAsync(int userRoleId)
        {
            return await _dbContext.UserRoles
                .SingleOrDefaultAsync(role => !role.IsDeleted && role.Id == userRoleId);
        }

        private async Task SetResponseUserRoleNameInLanguagesAsync(CancellationToken cancellationToken = default)
        {
            if (_response is null)
                return;

            var currentUserLanguageId = await _userLanguageService.GetCurrentUserLanguageIdAsync(cancellationToken);

            if (!currentUserLanguageId.HasValue)
                return;

            _response.NameInLanguages = await _dbContext.UserRolesToLanguages
                .Where(roleToLanguage => roleToLanguage.UserRoleId == _response.Id)
                .Select(roleToLanguage => new NameInLanguage(roleToLanguage.Name, roleToLanguage.LanguageId, roleToLanguage.Language.Name))
                .ToListAsync(cancellationToken);

            _response.Name = _response.NameInLanguages
                .Where(nameInLanguage => nameInLanguage.LanguageId == currentUserLanguageId.Value)
                .Select(nameInLanguage => nameInLanguage.Name)
                .FirstOrDefault()
                ??
                string.Empty;
        }

        private async Task SetResponseUserRolePermissionsAsync(CancellationToken cancellationToken = default)
        {
            if (_response is null)
                return;

            var groupedUserPermissions = await GetUserRolePermissionsGroupedBySystemNameAsync(cancellationToken);
            var groupedPermissionsModel = new List<PermissionGroupItemModel>();

            foreach (var permissionGroup in groupedUserPermissions)
            {
                var permissionGroupItemModel = new PermissionGroupItemModel
                {
                    Name = permissionGroup.Name
                };

                foreach (var permission in permissionGroup.Permissions)
                {
                    permissionGroupItemModel.Permissions.Add(new PermissionItemModel
                    {
                        Id = permission.Id,
                        IsSelected = permission.IsSelected,
                        LinkedPermissionsIds = await _userPermissionsService.GetIdsOfPermissionsLinkedToPermissionAsync(permission.Id, cancellationToken),
                        Name = permission.Name,
                        SystemName = permission.SystemName,
                    });
                }

                groupedPermissionsModel.Add(permissionGroupItemModel);
            }

            _response.GroupedPermissions = groupedPermissionsModel;
        }

        private async Task<List<PermissionGroupItemModel>> GetUserRolePermissionsGroupedBySystemNameAsync(CancellationToken cancellationToken = default)
        {
            if (_response is null)
                return new List<PermissionGroupItemModel>();

            var allUserPermissions = await _userPermissionsService.GetAllUserPermissionsAsync(cancellationToken);
            var userRolePermissions = await _userPermissionsService.GetUserRolePermissionsAsync(_response.Id, cancellationToken);

            var userRolePermissionsModel = new List<PermissionItemModel>(
                allUserPermissions
                    .Select(permission => new PermissionItemModel
                    {
                        Id = permission.Id,
                        SystemName = permission.SystemName,
                        Name = permission.Name,
                        IsSelected = userRolePermissions.Contains(permission)
                    }));

            return userRolePermissionsModel
                .GroupBy(model => model.SystemName.Split("_")[0])
                .Select(g => new PermissionGroupItemModel
                {
                    Name = $"Permissions.{g.Key}",
                    Permissions = g.ToList()
                })
                .ToList();
        }
    }
}
