namespace Equiprent.Web.Contracts
{
    public static partial class ApiRoutes
    {
        public static class Identity
        {
            public const string Authenticate = "authenticate";
            public const string ChangePassword = "changePassword";
            public const string IsEmptyPassword = "isEmptyPassword";
            public const string RefreshToken = "refreshToken";
        }
    }
}
