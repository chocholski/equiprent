import { Injectable } from "@angular/core";
import { Menu } from "src/app/interfaces/ui-models";
import { UserPermissionEnum } from "../enums/userPermissionEnum";
import { AuthorizationService } from "./authorization.service";

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private static ALL_MENU_URL_PREFIX = '/home';
  private menu: Menu[] = [];

  constructor(private authorizationService: AuthorizationService) {
    this.initializeMenu();
    this.initializeMenuItems();
  }

  getFirstMenuItemUserIsAuthorizedFor(): Menu | undefined {

    var firstMenuUserIsAuthorizedFor = undefined;

    for (const menu of this.menu) {
      for (const menuItem of menu.Items || []) {
        if (this.authorizationService.isAuthorized(menuItem.Permissions || [])) {
          firstMenuUserIsAuthorizedFor = menu;
          break;
        }
      }
    }

    return firstMenuUserIsAuthorizedFor;
  }

  getMenu(): Menu[] {
    return this.menu;
  }

  initializeMenu() {

    //MENU
    this.menu.push({
      Label: "Menu.Title",
      Items: []
    });

    //ADMINISTRATION
    this.menu.push({
      Label: "Menu.Administration",
      Items: []
    });
  }

  initializeMenuItems() {

    //MENU - USERS
    this.menu.find(m => m.Label == "Menu.Title")?.Items?.push({
      Permissions: [
        UserPermissionEnum.Users_CanList
      ],
      Label: "Menu.Users",
      Icon: 'fa fa-solid fa-user',
      RouterLink: [`${MenuService.ALL_MENU_URL_PREFIX}/users`]
    });

    //ADMINISTRATION - USER ROLES
    this.menu.find(m => m.Label == "Menu.Administration")?.Items?.push({
      Permissions: [
        UserPermissionEnum.UserRoles_CanList
      ],
      Label: "Menu.UserRoles",
      Icon: 'fa fa-solid fa-users',
      RouterLink: [`${MenuService.ALL_MENU_URL_PREFIX}/user-roles`]
    });
  }
}