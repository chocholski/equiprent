﻿using Equiprent.ApplicationInterfaces.UserPermissions;
using Equiprent.Data.DbContext;
using Equiprent.Entities.Application.UserPermissions;
using Equiprent.Extensions;

namespace Equiprent.ApplicationImplementations.UserPermissions
{
    public class UserPermissionService : IUserPermissionService
    {
        private readonly ApplicationDbContext _dbContext;

        public UserPermissionService(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<UserPermission>> GetAllUserPermissionsAsync()
        {
            return await _dbContext.UserPermissions.ToListAsync();
        }

        public async Task<List<UserPermission>> GetUserPermissionsForUserAsync(Guid userId)
        {
            var userRoleId = await _dbContext.Users
                .Where(u => u.Id == userId)
                .Select(u => u.UserRoleId)
                .SingleOrDefaultAsync();

            var permissions = new List<UserPermission>()
                .AppendRange(await GetUserRolePermissionsAsync(userRoleId));

            return permissions!;
        }

        public async Task<List<UserPermission>> GetUserRolePermissionsAsync(int roleId)
        {
            var userPermissionsForRole = await _dbContext.UserPermissionToRoles
                .Include(userPermissionToRole => userPermissionToRole.UserPermission)
                .Where(userPermissionToRole => userPermissionToRole.UserRoleId == roleId &&
                                               !userPermissionToRole.UserPermission.IsDeleted)
                .Select(userPermissionToRole => userPermissionToRole.UserPermission)
                .ToListAsync();

            var permissions = new List<UserPermission>()
                .AppendRange(userPermissionsForRole);

            return permissions!;
        }

        public async Task<List<int>> GetIdsOfPermissionsLinkedToPermissionAsync(int permissionId)
        {
            var result = await GetNotNormalizedAllLinkedPermissionsIdsAsync(permissionId);

            NormalizeAllLinkedPermissionsIds(permissionsIdsToNormalize: ref result, mainPermissionId: permissionId);

            return result;
        }

        private async Task<List<int>> GetNotNormalizedAllLinkedPermissionsIdsAsync(int permissionId)
        {
            var result = new List<int>();

            var permissionBeingCheckedId = await _dbContext.UserPermissions
                .Where(permission =>
                    !permission.IsDeleted &&
                    permission.Id == permissionId)
                .Select(permission => permission.Id)
                .SingleOrDefaultAsync();

            if (await IsPermissionLinked(permissionBeingCheckedId))
            {
                var linkedPermissionsIds = await _dbContext.UserPermissionToUserPermissions
                    .Include(item => item.UserPermission)
                    .Include(item => item.LinkedUserPermission)
                    .Where(item =>
                        !item.UserPermission.IsDeleted &&
                        !item.LinkedUserPermission.IsDeleted &&
                        item.UserPermissionId == permissionBeingCheckedId)
                    .Select(item => item.LinkedUserPermissionId)
                    .ToListAsync();

                foreach (var id in linkedPermissionsIds)
                {
                    if (!result.Any(permissionId => permissionId == id))
                        result.AddRange(await GetNotNormalizedAllLinkedPermissionsIdsAsync(id));
                }

                if (!result.Any(permissionId => permissionId == permissionBeingCheckedId))
                    result.Add(permissionBeingCheckedId);
            }
            else
            {
                result.Add(permissionBeingCheckedId);
            }

            return result;
        }

        public async Task<bool> IsPermissionLinked(int permissionId)
        {
            return await _dbContext.UserPermissionToUserPermissions
                .Include(item => item.UserPermission)
                .Include(item => item.LinkedUserPermission)
                .Where(item =>
                    !item.UserPermission.IsDeleted &&
                    !item.LinkedUserPermission.IsDeleted &&
                    item.UserPermissionId == permissionId)
                .AnyAsync();
        }

        private static void NormalizeAllLinkedPermissionsIds(ref List<int> permissionsIdsToNormalize, int mainPermissionId)
        {
            permissionsIdsToNormalize = permissionsIdsToNormalize.Distinct().ToList();

            if (permissionsIdsToNormalize.Contains(mainPermissionId))
                permissionsIdsToNormalize.Remove(mainPermissionId);
        }
    }
}