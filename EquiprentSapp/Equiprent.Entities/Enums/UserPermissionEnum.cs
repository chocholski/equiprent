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
        /// <summary>
        /// Equipments - listing
        /// </summary>
        Equipments_CanList = 9,
        /// <summary>
        /// Equipments - modifying
        /// </summary>
        Equipments_CanModify = 10,
        /// <summary>
        /// Manufacturers - listing
        /// </summary>
        Manufacturers_CanList = 11,
        /// <summary>
        /// Manufacturers - modifying
        /// </summary>
        Manufacturers_CanModify = 12,
        /// <summary>
        /// Rentals - listing
        /// </summary>
        Rentals_CanList = 13,
        /// <summary>
        /// Rentals - modifying
        /// </summary>
        Rentals_CanModify = 14,
    }
}
