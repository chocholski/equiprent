namespace Equiprent.Web.Contracts
{
    public static partial class ApiRoutes
    {
        public static class Client
        {
            public const string Selection = "selection";

            public static class Representative
            {
                public const string Delete = "representative/{id}";
                public const string DeleteManyForClient = "representative/{clientId}";
                public const string GetAll = "representative";
                public const string GetById = "representative/{id}";
                public const string Post = "representative";
                public const string Put = "representative";
            }
        }
    }
}
