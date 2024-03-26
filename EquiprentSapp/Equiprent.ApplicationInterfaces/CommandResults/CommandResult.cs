namespace Equiprent.ApplicationInterfaces.CommandResults
{
    public enum CommandResult
    {
        //Generic
        None,
        OK,
        BadRequest,
        NotFound,

        //User
        User_LoginExists,
        User_WrongOldPassword,

        //Token
        Token_Invalid,
        Token_NotActive,
        Token_DoesNotExist,
        Token_Used,
        Token_DoesNotMatchJWT,

        //UserRole
        UserRole_ExistsInDatabase,
        UserRole_NoUserPermissionAssigned,
        UserRole_TheOnlyAssignedRoleDeletionAttempt,
        UserRole_AssignedRoleDeletionAttempt,
        UserRole_UserHasBeenAlreadyAssignedToRole,

        //Client
        Client_NameExists,
        Client_NationalIdExists,

        //ClientRepresentative
        ClientRepresentative_RepresentativeExists,

        //Manufacturers
        Manufacturer_NameExists,
        Manufacturer_NationalIdExists,

        //Equipments
        Equipment_SerialNumberExists,

        //EquipmentPhotos
        EquipmentPhoto_AlreadyExists,

        //Rentals
        Rental_OverlappingDateRanges,
    }
}
