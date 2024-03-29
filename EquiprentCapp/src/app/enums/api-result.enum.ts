export enum ApiResultEnum {
  AssignedRoleDeletionAttempt,
  BadRequest,
  DoesNotExist,
  DoesNotMatchJWT,
  Error,
  ExistsInDatabase,
  Invalid,
  LoginExists,
  NameExists,
  NationalIdExists,
  None,
  NotActive,
  NotFound,
  NoUserPermissionAssigned,
  OK,
  RepresentativeExists,
  TheOnlyAssignedRoleDeletionAttempt,
  Used,
  UserHasBeenAlreadyAssignedToRole,
  WrongOldPassword,
}