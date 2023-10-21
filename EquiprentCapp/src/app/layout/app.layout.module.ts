import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import { SidebarModule } from 'primeng/sidebar';
import { BadgeModule } from 'primeng/badge';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputSwitchModule } from 'primeng/inputswitch';
import { RippleModule } from 'primeng/ripple';
import { AppMenuComponent } from './app.menu.component';
import { AppMenuitemComponent } from './app.menuitem.component';
import { RouterModule } from '@angular/router';
import { AppTopBarComponent } from './app.topbar.component';
import { AppFooterComponent } from './app.footer.component';
import { AppConfigModule } from './config/config.module';
import { AppSidebarComponent } from "./app.sidebar.component";
import { AppLayoutComponent } from "./app.layout.component";
import { MessagesModule } from 'primeng/messages';


//primeng
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { PanelMenuModule } from 'primeng/panelmenu';
import { SplitButtonModule } from 'primeng/splitbutton';

@NgModule({
    declarations: [
        AppFooterComponent,
        AppLayoutComponent,
        AppMenuComponent,
        AppMenuitemComponent,
        AppSidebarComponent,
        AppTopBarComponent,
    ],
    imports: [
        AppConfigModule,
        BadgeModule,
        BrowserAnimationsModule,
        BrowserModule,
        FormsModule,
        HttpClientModule,
        InputSwitchModule,
        InputTextModule,
        RadioButtonModule,
        RippleModule,
        RouterModule,
        SidebarModule,
        //primeng
        BreadcrumbModule,
        MessagesModule,
        PanelMenuModule,
        SplitButtonModule,
    ],
    exports: [AppLayoutComponent]
})
export class AppLayoutModule { }
