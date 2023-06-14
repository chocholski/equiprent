namespace Equiprent.Logic.Infrastructure
{
    public enum CommandResult
    {
        //Generic
        None = 0,
        OK = 1,
        BadRequest = 2,
        NotFound = 3,

        //ApplicationUser
        User_LoginExists = 100,
        User_WrongOldPassword = 101,

        //Token
        Token_LoginOrEmailExists = 200,
        Token_EmptyEmail = 201,
        Token_WrongToken = 202,
        Token_NotActive = 203,

        //ApplicationRole
        Role_ExistsInDatabase = 300,
        Role_NoUserPermissionAssigned = 301,
        Role_TheOnlyAssignedRoleDeletionAttempt = 302,
        Role_AssignedRoleDeletionAttempt = 303,

        //UserRole
        UserRole_UserHasBeenAlreadyAssignedToRole = 1000
    }
}