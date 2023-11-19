import { Injectable } from "@angular/core";
import { Menu, MenuArray } from "src/app/interfaces/ui-models";
import { UserPermissionEnum } from "../../enums/user-permission-enum";
import { AuthorizationService } from "../authorization/authorization.service";
import { Routes } from "../../routes";
import { Menus } from "./menus";

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private menu = new MenuArray();

  constructor(private authorizationService: AuthorizationService) {
    this.initializeMenu();
    this.initializeMenuItems();
  }

  getMenu(): MenuArray {
    return this.menu;
  }

  private getAdministrationItems() {
    return this.menu.getItemsForLabel(Menus.administration.label);
  }

  private getFirstMenuItemUserIsAuthorizedFor(): Menu | undefined {

    let firstMenuUserIsAuthorizedFor: Menu | undefined;

    for (const menu of this.menu) {
      for (const menuItem of menu.Items || []) {
        if (this.authorizationService.isAuthorized(menuItem.Permissions)) {
          firstMenuUserIsAuthorizedFor = menu;
          break;
        }
      }
    }

    return firstMenuUserIsAuthorizedFor;
  }

  private getMainMenuItems() {
    return this.menu.getItemsForLabel(Menus.main.label);
  }

  private initializeMenu() {

    //MENU
    this.menu.push({
      Label: Menus.main.label,
      Items: new MenuArray()
    });

    //ADMINISTRATION
    this.menu.push({
      Label: Menus.administration.label,
      Items: new MenuArray()
    });
  }

  private initializeMenuItems() {
    const mainMenuItems = this.getMainMenuItems();

    //CLIENTS
    mainMenuItems?.push(<Menu>{
      Permissions: [
        UserPermissionEnum.Clients_CanList
      ],
      Label: Menus.main.items.clients.label,
      Icon: Menus.main.items.clients.icon,
      RouterLink: [`/${Routes.clients.navigations.list}`]
    });

    const administrationItems = this.getAdministrationItems();

    //USERS
    administrationItems?.push(<Menu>{
      Permissions: [
        UserPermissionEnum.Users_CanList
      ],
      Label: Menus.administration.items.users.label,
      Icon: Menus.administration.items.users.icon,
      RouterLink: [`/${Routes.users.navigations.list}`]
    });

    //USER ROLES
    administrationItems?.push(<Menu>{
      Permissions: [
        UserPermissionEnum.UserRoles_CanList
      ],
      Label: Menus.administration.items.userRoles.label,
      Icon: Menus.administration.items.userRoles.icon,
      RouterLink: [`/${Routes.userRoles.navigations.list}`]
    });
  }
}