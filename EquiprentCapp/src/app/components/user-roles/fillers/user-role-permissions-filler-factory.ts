import { FormModeEnum } from "src/app/enums/form-mode-enum";
import { PermissionGroupItemModel } from "src/app/interfaces/user-permission";
import { UserRolePermissionsDestinations } from "src/app/interfaces/user-role";
import { UserRolePermissionsOnCreationFiller } from "./user-role-permissions-on-creation-filler";
import { UserRolePermissionsOnEditionFiller } from "./user-role-permissions-on-edition-filler";
import { UserRolePermissionsFiller } from "./user-role-permissions-filler";

export class UserRolePermissionsFillerFactory {
  static makeFiller(formMode: FormModeEnum, source: PermissionGroupItemModel[], destinations: UserRolePermissionsDestinations) {

    let filler: UserRolePermissionsFiller;

    switch (formMode) {
      case FormModeEnum.Creation:
        filler = new UserRolePermissionsOnCreationFiller(source, destinations);
        break;

      case FormModeEnum.Edition:
        filler = new UserRolePermissionsOnEditionFiller(source, destinations);
        break;

      default:
        throw new Error(`[${this.constructor.name}] Unsupported form mode.`);
    }

    return filler;
  }
}