﻿using System.Security.Claims;
using Equiprent.Data.DbContext;
using Microsoft.AspNetCore.Http;

namespace Equiprent.Data.Services
{
    public class UserService : IUserService
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IHttpContextAccessor _httpAccessor;

        public UserService(ApplicationDbContext dbContext, IHttpContextAccessor httpAccessor)
        {
            _dbContext = dbContext;
            _httpAccessor = httpAccessor;
        }

        public Guid? GetUserId()
        {
            var userIdClaim = _httpAccessor.HttpContext?.User?.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier);

            return userIdClaim is not null &&
                Guid.TryParse(userIdClaim.Value, out Guid userId) 
                    ? userId 
                    : null;
        }

        public async Task<int?> GetCurrentUserLanguageIdAsync()
        {
            int? result = null;
            var currentUserId = GetUserId();

            if (currentUserId.HasValue)
            {
                result = await _dbContext.Users
                    .Where(user => user.Id == currentUserId.Value)
                    .Select(user => (int?)user.LanguageId)
                    .SingleOrDefaultAsync();
            }

            return result;
        }

        public async Task SetTokenRefreshRequiredForUsersAsync(IEnumerable<Guid> userIds)
        {
            foreach (var userId in  userIds)
            {
                var refreshToken = await _dbContext.RefreshTokens
                    .Where(r => r.UserId == userId)
                    .SingleOrDefaultAsync();

                if (refreshToken is null)
                    return;

                refreshToken.IsTokenRefreshRequired = true;

                await _dbContext.RefreshTokens.UpdateAsync(refreshToken);
            }
        }
    }
}
