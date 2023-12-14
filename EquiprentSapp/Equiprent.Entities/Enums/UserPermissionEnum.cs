namespace Equiprent.Entities.Enums
{
    public enum UserPermissionEnum
    {
        /// <summary>
        /// For all logged users
        /// </summary>
        ForAllLoggedIn = 0,
        /// <summary>
        /// Users - listing
        /// </summary>
        Users_CanList = 1,
        /// <summary>
        /// Users - modifying
        /// </summary>
        Users_CanModify = 2,
        /// <summary>
        /// User roles - listing
        /// </summary>
        UserRoles_CanList = 3,
        /// <summary>
        /// User roles - modifying
        /// </summary>
        UserRoles_CanModify = 4,
        /// <summary>
        /// Clients - listing
        /// </summary>
        Clients_CanList = 5,
        /// <summary>
        /// Clients - modifying
        /// </summary>
        Clients_CanModify = 6,
        /// <summary>
        /// Client representatives - listing
        /// </summary>
        ClientRepresentatives_CanList = 7,
        /// <summary>
        /// Client representatives - modifying
        /// </summary>
        ClientRepresentatives_CanModify = 8,
    }
}
