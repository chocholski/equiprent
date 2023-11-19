import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Menu } from '../interfaces/ui-models';
import { LayoutService } from './services/app.layout.service';
import { AuthorizationService } from '../services/authorization/authorization.service';
import { MenuService } from '../services/layout/menu.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

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

    public buildMenu() {
        this.authorizationService.decodeTokenAndSetData();
        this.model = [];

        var menu = this.menuService.getMenu();

        menu.forEach(menu => this.appendMenu(menu));

        this.model = [...this.model];
    }

    private appendMenu(menu: Menu) {
        if (!this.model)
            return;

        const allMenuPermissions: number[] = [];

        menu.Items?.forEach(menuItem => menuItem.Permissions?.forEach(permission => allMenuPermissions.push(permission)));

        //TODO
        const isAuthorized = this.isAuthorized(allMenuPermissions);

        if (isAuthorized) {

            const menuItems: { label: string; icon: string | undefined; routerLink: string[] | undefined; }[] = [];

            menu.Items?.forEach(m => menuItems.push({
                label: this.translate.instant(m.Label),
                icon: m.Icon,
                routerLink: m.RouterLink
            }));

            this.model.push({
                label: this.translate.instant(menu.Label),
                items: menuItems
            });
        }
    }

    private appendMenuItem(menuItemLabel: string, permissions: number[], label: string, icon: string, routerLink?: string[]) {
        if (!this.model)
            return;

        const isAuthorized = this.isAuthorized(permissions);

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
        let isAuthorized = false;

        for (const permission of permissions) {
            if (this.authorizationService.isAuthorized([permission])) {
                isAuthorized = true;
                break;
            }
        }

        return isAuthorized;
    }
}
