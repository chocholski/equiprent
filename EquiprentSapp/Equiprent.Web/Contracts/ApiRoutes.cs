namespace Equiprent.Web.Contracts
{
    public static class ApiRoutes
    {
        public static class Identity
        {
            public const string Authenticate = "authenticate";
            public const string RefreshToken = "refreshToken";
            public const string IsEmptyPassword = "isEmptyPassword";
            public const string ChangePassword = "changePassword";
        }
    }
}
