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
        const menu = this.menuService.getMenu();
        menu.forEach(menu => this.appendMenu(menu));
        this.model = [...this.model];
    }

    private appendMenu(menu: Menu) {
        if (!this.model)
            return;

        const menuItemsCurrentUserIsAuthorizedFor = menu.Items!.filter(item => this.isLoggedUserAuthorizedForMenu(item.Permissions!));
        const menuItems: { label: string; icon: string | undefined; routerLink: string[] | undefined; }[] = [];

        menuItemsCurrentUserIsAuthorizedFor.forEach(m => menuItems.push({
            label: this.translate.instant(m.Label),
            icon: m.Icon,
            routerLink: m.RouterLink
        }));

        this.model.push({
            label: this.translate.instant(menu.Label),
            items: menuItems
        });
    }

    private isLoggedUserAuthorizedForMenu(permissions: number[]): boolean {
        return permissions.some(permission => this.authorizationService.isAuthorized([permission]));
    }
}
