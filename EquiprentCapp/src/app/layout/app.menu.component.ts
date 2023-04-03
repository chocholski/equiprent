import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Menu } from '../interfaces/ui-models';
import { LayoutService } from './services/app.layout.service';
import { AuthorizationService } from '../services/authorization.service';
import { MenuService } from '../services/menu.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    users: Menu = new Menu();
    userRoles: Menu = new Menu();

    model: any[] = [];

    constructor(public layoutService: LayoutService,
        private router: Router,
        private menuService: MenuService,
        private authorizationService: AuthorizationService,
        public translate: TranslateService) {
        this.buildMenu();
        this.router.events.forEach(() => {
            this.buildMenu();
        });
    }

    ngOnInit() {
    }

    buildMenu() {
        this.authorizationService.decodeTokenAndSetData();
        this.model = [];

        var menu = this.menuService.getMenu();

        menu.forEach(menu => this.appendMenu(menu));

        this.model = [...this.model];
    }

    appendMenu(menu: Menu) {
        if (!this.model) {
            return;
        }

        var allMenuPermissions: number[] = [];
        menu.Items?.forEach(menuItem => menuItem.Permissions?.forEach(permission => allMenuPermissions.push(permission)));

        //TODO
        var isAuthorized = this.isAuthorized(allMenuPermissions);

        if (isAuthorized) {

            var menuItems: { label: string; icon: string | undefined; routerLink: string[] | undefined; }[] = [];
            menu.Items?.forEach(x => menuItems.push({
                label: this.translate.instant(x.Label),
                icon: x.Icon,
                routerLink: x.RouterLink
            }));

            this.model.push({
                label: this.translate.instant(menu.Label),
                items: menuItems
            });
        }
    }

    appendMenuItem(menuItemLabel: string, permissions: number[], label: string, icon: string, routerLink?: string[]) {
        if (!this.model) {
            return;
        }

        var isAuthorized = this.isAuthorized(permissions) || true;

        if (isAuthorized) {
            var menuItem = this.model.find(x => x.label == this.translate.instant(menuItemLabel));

            if (menuItem) {
                if (!menuItem.items) {
                    menuItem.items = [];
                }

                menuItem.items = menuItem.items.concat([
                    { label: this.translate.instant(label), icon: icon, routerLink: routerLink }
                ]);
            }
        }
    }

    private isAuthorized(permissions: number[]): boolean {
        var isAuthorized = false;

        for (const permission of permissions) {
            if (this.authorizationService.isAuthorized([permission])) {
                isAuthorized = true;
                break;
            }
        }

        return isAuthorized;
    }
}
