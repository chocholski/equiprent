﻿namespace Equiprent.ApplicationInterfaces.CommandResults
{
    public enum CommandResult
    {
        //Generic
        None = 0,
        OK = 1,
        BadRequest = 2,
        NotFound = 3,

        //User
        User_LoginExists = 100,
        User_WrongOldPassword = 101,

        //Token
        Token_Invalid = 200,
        Token_NotActive = 201,
        Token_DoesNotExist = 202,
        Token_Used = 203,
        Token_DoesNotMatchJWT = 204,

        //UserRole
        UserRole_ExistsInDatabase = 300,
        UserRole_NoUserPermissionAssigned = 301,
        UserRole_TheOnlyAssignedRoleDeletionAttempt = 302,
        UserRole_AssignedRoleDeletionAttempt = 303,
        UserRole_UserHasBeenAlreadyAssignedToRole = 304,

        //Client
        Client_NameExists = 400,
        Client_NationalIdExists = 401,

        //ClientRepresentative
        ClientRepresentative_RepresentativeExists = 500,

        //Manufacturers
        Manufacturer_NameExists = 600,
        Manufacturer_NationalIdExists = 601,
    }
}
