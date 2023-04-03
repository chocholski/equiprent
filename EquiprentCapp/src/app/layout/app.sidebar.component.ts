import { Component, ElementRef, ViewChild } from '@angular/core';
import { LayoutService } from "./services/app.layout.service";
import { AppMenuComponent } from './app.menu.component';

@Component({
    selector: 'app-sidebar',
    templateUrl: './app.sidebar.component.html'
})
export class AppSidebarComponent {

    @ViewChild('appMenu') appMenu: AppMenuComponent;

    constructor(public layoutService: LayoutService, public el: ElementRef) { }
}

