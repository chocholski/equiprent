import { Injectable } from "@angular/core";
import { Menu, MenuArray } from "src/app/interfaces/ui-models";
import { UserPermissionEnum } from "../../enums/user-permission.enum";
import { AuthorizationService } from "../../services/authorization/authorization.service";
import { ROUTES } from "../../constants/routes.constants";
import { Menus } from "./menus";

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private menu = new MenuArray();

  constructor(private readonly authorizationService: AuthorizationService) {
    this.initializeMenu();
    this.initializeMenuItems();
  }

  public getMenu(): MenuArray {
    return this.menu;
  }

  public getFirstMenuItemUserIsAuthorizedFor(): Menu | undefined {
    const firstMenuUserIsAuthorizedFor = this.menu.find(menu =>
      (menu.Items || []).some(menuItem => this.authorizationService.isAuthorized(menuItem.Permissions)));

    return firstMenuUserIsAuthorizedFor;
  }

  private getAdministrationItems() {
    return this.menu.getItemsForLabel(Menus.administration.label);
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
      RouterLink: [`/${ROUTES.clients.navigations.list}`]
    });

    //EQUIPMENTS
    mainMenuItems?.push(<Menu>{
      Permissions: [
        UserPermissionEnum.Equipments_CanList
      ],
      Label: Menus.main.items.equipments.label,
      Icon: Menus.main.items.equipments.icon,
      RouterLink: [`/${ROUTES.equipments.navigations.list}`]
    });

    //MANUFACTURERS
    mainMenuItems?.push(<Menu>{
      Permissions: [
        UserPermissionEnum.Manufacturers_CanList
      ],
      Label: Menus.main.items.manufacturers.label,
      Icon: Menus.main.items.manufacturers.icon,
      RouterLink: [`/${ROUTES.manufacturers.navigations.list}`]
    });

    const administrationItems = this.getAdministrationItems();

    //USERS
    administrationItems?.push(<Menu>{
      Permissions: [
        UserPermissionEnum.Users_CanList
      ],
      Label: Menus.administration.items.users.label,
      Icon: Menus.administration.items.users.icon,
      RouterLink: [`/${ROUTES.users.navigations.list}`]
    });

    //USER ROLES
    administrationItems?.push(<Menu>{
      Permissions: [
        UserPermissionEnum.UserRoles_CanList
      ],
      Label: Menus.administration.items.userRoles.label,
      Icon: Menus.administration.items.userRoles.icon,
      RouterLink: [`/${ROUTES.userRoles.navigations.list}`]
    });
  }
}