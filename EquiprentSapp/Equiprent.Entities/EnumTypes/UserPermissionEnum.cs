namespace Equiprent.Entities.EnumTypes
{
    public enum UserPermissionEnum
    {
        /// <summary>
        /// Dla wszystkich zalogowanych użytkowników
        /// </summary>
        ForAllLoggedIn = 0,
        /// <summary>
        /// Użytkownicy - przeglądanie
        /// </summary>
        Users_CanList = 1,
        /// <summary>
        /// Użytkownicy - modyfikowanie
        /// </summary>
        Users_CanModify = 2,
        /// <summary>
        /// Role użytkowników - przeglądanie
        /// </summary>
        UserRoles_CanList = 3,
        /// <summary>
        /// Role użytkowników - modyfikowanie
        /// </summary>
        UserRoles_CanModify = 4
    }
}
