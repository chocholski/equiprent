"use strict";
(self["webpackChunkEquiprentCapp"] = self["webpackChunkEquiprentCapp"] || []).push([["main"],{

/***/ 158:
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppRoutingModule": () => (/* binding */ AppRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ 124);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _layout_app_layout_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./layout/app.layout.component */ 3725);
/* harmony import */ var _components_users_user_list__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/users/user-list */ 4760);
/* harmony import */ var _components_user_roles_user_role_list__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/user-roles/user-role-list */ 4609);
/* harmony import */ var _components_login_login__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/login/login */ 8077);







let AppRoutingModule = class AppRoutingModule {};
AppRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.NgModule)({
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_6__.RouterModule.forRoot([{
    path: 'home',
    component: _layout_app_layout_component__WEBPACK_IMPORTED_MODULE_0__.AppLayoutComponent,
    children: [{
      path: 'users',
      component: _components_users_user_list__WEBPACK_IMPORTED_MODULE_1__.UserListComponent
    }, {
      path: 'administration/user-roles',
      component: _components_user_roles_user_role_list__WEBPACK_IMPORTED_MODULE_2__.UserRoleListComponent
    }]
  }, {
    path: 'login',
    component: _components_login_login__WEBPACK_IMPORTED_MODULE_3__.LoginComponent
  }, {
    path: '**',
    redirectTo: 'home'
  }, {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }], {
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled',
    onSameUrlNavigation: 'reload'
  })],
  exports: [_angular_router__WEBPACK_IMPORTED_MODULE_6__.RouterModule]
})], AppRoutingModule);


/***/ }),

/***/ 5041:
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppComponent": () => (/* binding */ AppComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _app_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app.component.html?ngResource */ 3383);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/platform-browser */ 4497);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ngx-translate/core */ 8699);
/* harmony import */ var primeng_api__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! primeng/api */ 4356);
/* harmony import */ var _services_authentication_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./services/authentication.service */ 7053);
/* harmony import */ var _services_authorization_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./services/authorization.service */ 4519);








let AppComponent = class AppComponent {
  constructor(primengConfig, translate, authenticationService, authorizationService, titleService) {
    this.primengConfig = primengConfig;
    this.translate = translate;
    this.authenticationService = authenticationService;
    this.authorizationService = authorizationService;
    this.titleService = titleService;
    this.translate.setDefaultLang('pl');
    this.isUserLoggedIn = this.authenticationService.isLoggedIn();
    this.authorizationService.decodeTokenAndSetData();
  }
  onKeydownHandler(event) {
    event.preventDefault();
  }
  ngOnInit() {
    this.primengConfig.ripple = true;
    this.titleService.setTitle("Equiprent");
  }
};
AppComponent.ctorParameters = () => [{
  type: primeng_api__WEBPACK_IMPORTED_MODULE_3__.PrimeNGConfig
}, {
  type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__.TranslateService
}, {
  type: _services_authentication_service__WEBPACK_IMPORTED_MODULE_1__.AuthenticationService
}, {
  type: _services_authorization_service__WEBPACK_IMPORTED_MODULE_2__.AuthorizationService
}, {
  type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_5__.Title
}];
AppComponent.propDecorators = {
  onKeydownHandler: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_6__.HostListener,
    args: ['document:keydown.enter', ['$event']]
  }]
};
AppComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_7__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_6__.Component)({
  selector: 'app-root',
  template: _app_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__
})], AppComponent);


/***/ }),

/***/ 6747:
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppModule": () => (/* binding */ AppModule),
/* harmony export */   "HttpLoaderFactory": () => (/* binding */ HttpLoaderFactory),
/* harmony export */   "jwtTokenGetter": () => (/* binding */ jwtTokenGetter),
/* harmony export */   "options": () => (/* binding */ options)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/common */ 4666);
/* harmony import */ var _angular_common_locales_pl__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/common/locales/pl */ 1499);
/* harmony import */ var ngx_mask__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ngx-mask */ 446);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @ngx-translate/core */ 8699);
/* harmony import */ var _ngx_translate_http_loader__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! @ngx-translate/http-loader */ 8319);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/common/http */ 8987);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/platform-browser */ 4497);
/* harmony import */ var _auth0_angular_jwt__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @auth0/angular-jwt */ 4467);
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app.component */ 5041);
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app-routing.module */ 158);
/* harmony import */ var _layout_app_layout_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./layout/app.layout.module */ 6421);
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/environments/environment */ 2340);
/* harmony import */ var _services_menu_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./services/menu.service */ 8914);
/* harmony import */ var _services_authorization_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./services/authorization.service */ 4519);
/* harmony import */ var _services_authentication_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./services/authentication.service */ 7053);
/* harmony import */ var _services_interceptors_auth_interceptor__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./services/interceptors/auth-interceptor */ 8617);
/* harmony import */ var _services_auth_guard_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./services/auth-guard.service */ 8968);
/* harmony import */ var _components_users_user_list__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/users/user-list */ 4760);
/* harmony import */ var _components_login_login__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./components/login/login */ 8077);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var primeng_button__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! primeng/button */ 6328);
/* harmony import */ var primeng_checkbox__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! primeng/checkbox */ 749);
/* harmony import */ var primeng_password__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! primeng/password */ 8848);
/* harmony import */ var primeng_api__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! primeng/api */ 4356);
/* harmony import */ var primeng_toast__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! primeng/toast */ 9129);
/* harmony import */ var _services_interceptors_api_url_interceptor__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./services/interceptors/api-url-interceptor */ 4133);

//Angular










//Application




//Services








//primeng






(0,_angular_common__WEBPACK_IMPORTED_MODULE_12__.registerLocaleData)(_angular_common_locales_pl__WEBPACK_IMPORTED_MODULE_13__["default"], 'pl');
const options = {};
let AppModule = class AppModule {};
AppModule = (0,tslib__WEBPACK_IMPORTED_MODULE_14__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_15__.NgModule)({
  declarations: [
  //[start] app components
  _app_component__WEBPACK_IMPORTED_MODULE_0__.AppComponent,
  //[end] app components
  //[start] custom components
  _components_login_login__WEBPACK_IMPORTED_MODULE_10__.LoginComponent, _components_users_user_list__WEBPACK_IMPORTED_MODULE_9__.UserListComponent
  //[end] custom components
  ],

  imports: [
  //[start] app modules
  _layout_app_layout_module__WEBPACK_IMPORTED_MODULE_2__.AppLayoutModule, _angular_platform_browser__WEBPACK_IMPORTED_MODULE_16__.BrowserModule, _angular_common_http__WEBPACK_IMPORTED_MODULE_17__.HttpClientModule, _auth0_angular_jwt__WEBPACK_IMPORTED_MODULE_18__.JwtModule.forRoot({
    config: {
      tokenGetter: jwtTokenGetter
    }
  }), ngx_mask__WEBPACK_IMPORTED_MODULE_19__.NgxMaskModule.forRoot(options), _ngx_translate_core__WEBPACK_IMPORTED_MODULE_20__.TranslateModule.forRoot({
    loader: {
      provide: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_20__.TranslateLoader,
      useFactory: HttpLoaderFactory,
      deps: [_angular_common_http__WEBPACK_IMPORTED_MODULE_17__.HttpClient]
    }
  }), _app_routing_module__WEBPACK_IMPORTED_MODULE_1__.AppRoutingModule, _angular_forms__WEBPACK_IMPORTED_MODULE_21__.ReactiveFormsModule,
  //[end] app modules
  //[start] primeng Modules
  primeng_button__WEBPACK_IMPORTED_MODULE_22__.ButtonModule, primeng_checkbox__WEBPACK_IMPORTED_MODULE_23__.CheckboxModule, primeng_password__WEBPACK_IMPORTED_MODULE_24__.PasswordModule, primeng_toast__WEBPACK_IMPORTED_MODULE_25__.ToastModule
  //[end] primeng Modules
  ],

  providers: [
  //[start] app services
  {
    provide: _angular_common__WEBPACK_IMPORTED_MODULE_12__.LocationStrategy,
    useClass: _angular_common__WEBPACK_IMPORTED_MODULE_12__.HashLocationStrategy
  }, _services_menu_service__WEBPACK_IMPORTED_MODULE_4__.MenuService, _services_authorization_service__WEBPACK_IMPORTED_MODULE_5__.AuthorizationService, _services_authentication_service__WEBPACK_IMPORTED_MODULE_6__.AuthenticationService, {
    provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_17__.HTTP_INTERCEPTORS,
    useClass: _services_interceptors_auth_interceptor__WEBPACK_IMPORTED_MODULE_7__.AuthInterceptor,
    multi: true
  }, {
    provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_17__.HTTP_INTERCEPTORS,
    useClass: _services_interceptors_api_url_interceptor__WEBPACK_IMPORTED_MODULE_11__.ApiUrlInterceptor,
    multi: true
  }, _services_auth_guard_service__WEBPACK_IMPORTED_MODULE_8__.AuthGuard, primeng_api__WEBPACK_IMPORTED_MODULE_26__.MessageService
  //[end] app services
  ],

  bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_0__.AppComponent]
})], AppModule);

function jwtTokenGetter() {
  return localStorage.getItem(src_environments_environment__WEBPACK_IMPORTED_MODULE_3__.environment.auth_key_name);
}
function HttpLoaderFactory(http) {
  return new _ngx_translate_http_loader__WEBPACK_IMPORTED_MODULE_27__.TranslateHttpLoader(http);
}

/***/ }),

/***/ 8077:
/*!*******************************************!*\
  !*** ./src/app/components/login/login.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LoginComponent": () => (/* binding */ LoginComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _login_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./login.html?ngResource */ 1320);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/platform-browser */ 4497);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/router */ 124);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ngx-translate/core */ 8699);
/* harmony import */ var primeng_api__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! primeng/api */ 4356);
/* harmony import */ var src_app_app_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/app.component */ 5041);
/* harmony import */ var src_app_services_authentication_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/authentication.service */ 7053);
/* harmony import */ var src_app_ui_controls_form_validator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/ui-controls/form-validator */ 308);











let LoginComponent = class LoginComponent {
  constructor(translate, formBuilder, titleService, messageService, authenticationService, app, router) {
    this.translate = translate;
    this.formBuilder = formBuilder;
    this.titleService = titleService;
    this.messageService = messageService;
    this.authenticationService = authenticationService;
    this.app = app;
    this.router = router;
    this.translate.setDefaultLang('pl');
    this.titleService.setTitle(translate.instant("AppName"));
    this.createForm();
    this.formValidator = new src_app_ui_controls_form_validator__WEBPACK_IMPORTED_MODULE_3__.FormValidator(this.form);
  }
  ngOnInit() {}
  createForm() {
    this.form = this.formBuilder.group({
      Login: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.required],
      Password: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.required]
    });
  }
  onSubmit() {
    if (!this.form.value.Login) {
      this.messageService.add({
        key: 'tst',
        severity: 'error',
        summary: this.translate.instant('General.Error'),
        detail: this.translate.instant('Messages.EnterLoginFirst')
      });
      return;
    }
    var data = {};
    data.Login = this.form.value.Login;
    data.Password = this.form.value.Password;
    this.authenticationService.login(data).subscribe(result => {
      if (result == "OK") {
        this.app.isUserLoggedIn = true;
        this.router.navigate(['home']);
      } else if (result == "NotActive") {
        this.messageService.add({
          severity: 'error',
          summary: this.translate.instant('Messages.AccountNotActive')
        });
        this.messageService.add({
          severity: 'error',
          summary: this.translate.instant('Messages.PleaseContactAdmin')
        });
      } else {
        this.messageService.add({
          severity: 'error',
          summary: this.translate.instant('Messages.InvalidLoginData')
        });
      }
    });
  }
  resetPassword() {
    this.router.navigate(['login/reset-password'], {
      queryParams: {
        'token': ''
      }
    });
  }
};
LoginComponent.ctorParameters = () => [{
  type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_5__.TranslateService
}, {
  type: _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormBuilder
}, {
  type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_6__.Title
}, {
  type: primeng_api__WEBPACK_IMPORTED_MODULE_7__.MessageService
}, {
  type: src_app_services_authentication_service__WEBPACK_IMPORTED_MODULE_2__.AuthenticationService
}, {
  type: src_app_app_component__WEBPACK_IMPORTED_MODULE_1__.AppComponent
}, {
  type: _angular_router__WEBPACK_IMPORTED_MODULE_8__.Router
}];
LoginComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_9__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_10__.Component)({
  selector: "login",
  template: _login_html_ngResource__WEBPACK_IMPORTED_MODULE_0__
})], LoginComponent);


/***/ }),

/***/ 4609:
/*!*********************************************************!*\
  !*** ./src/app/components/user-roles/user-role-list.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UserRoleListComponent": () => (/* binding */ UserRoleListComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _user_role_list_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./user-role-list.html?ngResource */ 3136);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 2560);



let UserRoleListComponent = class UserRoleListComponent {
  ngOnInit() {}
};
UserRoleListComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.Component)({
  selector: "user-role-list",
  template: _user_role_list_html_ngResource__WEBPACK_IMPORTED_MODULE_0__
})], UserRoleListComponent);


/***/ }),

/***/ 4760:
/*!***********************************************!*\
  !*** ./src/app/components/users/user-list.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UserListComponent": () => (/* binding */ UserListComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _user_list_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./user-list.html?ngResource */ 4921);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 2560);



let UserListComponent = class UserListComponent {
  ngOnInit() {}
};
UserListComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.Component)({
  selector: "user-list",
  template: _user_list_html_ngResource__WEBPACK_IMPORTED_MODULE_0__
})], UserListComponent);


/***/ }),

/***/ 451:
/*!*********************************************!*\
  !*** ./src/app/enums/userPermissionEnum.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UserPermissionEnum": () => (/* binding */ UserPermissionEnum)
/* harmony export */ });
var UserPermissionEnum;
(function (UserPermissionEnum) {
  UserPermissionEnum[UserPermissionEnum["ForAll"] = 0] = "ForAll";
  UserPermissionEnum[UserPermissionEnum["Users_CanList"] = 1] = "Users_CanList";
  UserPermissionEnum[UserPermissionEnum["Users_CanModify"] = 2] = "Users_CanModify";
  UserPermissionEnum[UserPermissionEnum["UserRoles_CanList"] = 3] = "UserRoles_CanList";
  UserPermissionEnum[UserPermissionEnum["UserRoles_CanModify"] = 4] = "UserRoles_CanModify";
})(UserPermissionEnum || (UserPermissionEnum = {}));

/***/ }),

/***/ 3246:
/*!*****************************************!*\
  !*** ./src/app/interfaces/ui-models.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Menu": () => (/* binding */ Menu)
/* harmony export */ });
class Menu {}

/***/ }),

/***/ 8811:
/*!************************************************!*\
  !*** ./src/app/layout/app.footer.component.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppFooterComponent": () => (/* binding */ AppFooterComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _app_footer_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app.footer.component.html?ngResource */ 8980);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _services_app_layout_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./services/app.layout.service */ 9139);




let AppFooterComponent = class AppFooterComponent {
  constructor(layoutService) {
    this.layoutService = layoutService;
  }
};
AppFooterComponent.ctorParameters = () => [{
  type: _services_app_layout_service__WEBPACK_IMPORTED_MODULE_1__.LayoutService
}];
AppFooterComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.Component)({
  selector: 'app-footer',
  template: _app_footer_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__
})], AppFooterComponent);


/***/ }),

/***/ 3725:
/*!************************************************!*\
  !*** ./src/app/layout/app.layout.component.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppLayoutComponent": () => (/* binding */ AppLayoutComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _app_layout_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app.layout.component.html?ngResource */ 1896);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ 124);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ 116);
/* harmony import */ var _services_app_layout_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./services/app.layout.service */ 9139);
/* harmony import */ var _app_sidebar_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app.sidebar.component */ 6762);
/* harmony import */ var _app_topbar_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app.topbar.component */ 1242);
/* harmony import */ var _services_authorization_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../services/authorization.service */ 4519);
/* harmony import */ var _services_authentication_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../services/authentication.service */ 7053);










let AppLayoutComponent = class AppLayoutComponent {
  constructor(layoutService, renderer, router, authenticationService, authorizationService) {
    this.layoutService = layoutService;
    this.renderer = renderer;
    this.router = router;
    this.authenticationService = authenticationService;
    this.authorizationService = authorizationService;
    this.isUserLoggedIn = authenticationService.isLoggedIn();
    if (!this.isUserLoggedIn) {
      this.router.navigate(['login']);
    } else {
      this.overlayMenuOpenSubscription = this.layoutService.overlayOpen$.subscribe(() => {
        if (!this.menuOutsideClickListener) {
          this.menuOutsideClickListener = this.renderer.listen('document', 'click', event => {
            const isOutsideClicked = !(this.appSidebar.el.nativeElement.isSameNode(event.target) || this.appSidebar.el.nativeElement.contains(event.target) || this.appTopbar.menuButton.nativeElement.isSameNode(event.target) || this.appTopbar.menuButton.nativeElement.contains(event.target));
            if (isOutsideClicked) {
              this.hideMenu();
            }
          });
        }
        if (!this.profileMenuOutsideClickListener) {
          this.profileMenuOutsideClickListener = this.renderer.listen('document', 'click', event => {
            const isOutsideClicked = !(this.appTopbar.menu.nativeElement.isSameNode(event.target) || this.appTopbar.menu.nativeElement.contains(event.target) || this.appTopbar.topbarMenuButton.nativeElement.isSameNode(event.target) || this.appTopbar.topbarMenuButton.nativeElement.contains(event.target));
            if (isOutsideClicked) {
              this.hideProfileMenu();
            }
          });
        }
        if (this.layoutService.state.staticMenuMobileActive) {
          this.blockBodyScroll();
        }
      });
      this.router.events.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_6__.filter)(event => event instanceof _angular_router__WEBPACK_IMPORTED_MODULE_7__.NavigationEnd)).subscribe(() => {
        this.hideMenu();
        this.hideProfileMenu();
      });
    }
  }
  hideMenu() {
    this.layoutService.state.overlayMenuActive = false;
    this.layoutService.state.staticMenuMobileActive = false;
    this.layoutService.state.menuHoverActive = false;
    if (this.menuOutsideClickListener) {
      this.menuOutsideClickListener();
      this.menuOutsideClickListener = null;
    }
    this.unblockBodyScroll();
  }
  hideProfileMenu() {
    this.layoutService.state.profileSidebarVisible = false;
    if (this.profileMenuOutsideClickListener) {
      this.profileMenuOutsideClickListener();
      this.profileMenuOutsideClickListener = null;
    }
  }
  blockBodyScroll() {
    if (document.body.classList) {
      document.body.classList.add('blocked-scroll');
    } else {
      document.body.className += ' blocked-scroll';
    }
  }
  unblockBodyScroll() {
    if (document.body.classList) {
      document.body.classList.remove('blocked-scroll');
    } else {
      document.body.className = document.body.className.replace(new RegExp('(^|\\b)' + 'blocked-scroll'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }
  }
  get containerClass() {
    return {
      'layout-theme-light': this.layoutService.config.colorScheme === 'light',
      'layout-theme-dark': this.layoutService.config.colorScheme === 'dark',
      'layout-overlay': this.layoutService.config.menuMode === 'overlay',
      'layout-static': this.layoutService.config.menuMode === 'static',
      'layout-static-inactive': this.layoutService.state.staticMenuDesktopInactive && this.layoutService.config.menuMode === 'static',
      'layout-overlay-active': this.layoutService.state.overlayMenuActive,
      'layout-mobile-active': this.layoutService.state.staticMenuMobileActive,
      'p-input-filled': this.layoutService.config.inputStyle === 'filled',
      'p-ripple-disabled': !this.layoutService.config.ripple
    };
  }
  ngOnDestroy() {
    if (this.overlayMenuOpenSubscription) {
      this.overlayMenuOpenSubscription.unsubscribe();
    }
    if (this.menuOutsideClickListener) {
      this.menuOutsideClickListener();
    }
  }
};
AppLayoutComponent.ctorParameters = () => [{
  type: _services_app_layout_service__WEBPACK_IMPORTED_MODULE_1__.LayoutService
}, {
  type: _angular_core__WEBPACK_IMPORTED_MODULE_8__.Renderer2
}, {
  type: _angular_router__WEBPACK_IMPORTED_MODULE_7__.Router
}, {
  type: _services_authentication_service__WEBPACK_IMPORTED_MODULE_5__.AuthenticationService
}, {
  type: _services_authorization_service__WEBPACK_IMPORTED_MODULE_4__.AuthorizationService
}];
AppLayoutComponent.propDecorators = {
  appSidebar: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_8__.ViewChild,
    args: [_app_sidebar_component__WEBPACK_IMPORTED_MODULE_2__.AppSidebarComponent]
  }],
  appTopbar: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_8__.ViewChild,
    args: [_app_topbar_component__WEBPACK_IMPORTED_MODULE_3__.AppTopBarComponent]
  }]
};
AppLayoutComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_9__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_8__.Component)({
  selector: 'app-layout',
  template: _app_layout_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__
})], AppLayoutComponent);


/***/ }),

/***/ 6421:
/*!*********************************************!*\
  !*** ./src/app/layout/app.layout.module.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppLayoutModule": () => (/* binding */ AppLayoutModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/platform-browser */ 4497);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/common/http */ 8987);
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/platform-browser/animations */ 7146);
/* harmony import */ var primeng_inputtext__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! primeng/inputtext */ 9906);
/* harmony import */ var primeng_sidebar__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! primeng/sidebar */ 4179);
/* harmony import */ var primeng_badge__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! primeng/badge */ 2381);
/* harmony import */ var primeng_radiobutton__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! primeng/radiobutton */ 9902);
/* harmony import */ var primeng_inputswitch__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! primeng/inputswitch */ 3585);
/* harmony import */ var primeng_ripple__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! primeng/ripple */ 4538);
/* harmony import */ var _app_menu_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app.menu.component */ 3217);
/* harmony import */ var _app_menuitem_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app.menuitem.component */ 2937);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/router */ 124);
/* harmony import */ var _app_topbar_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app.topbar.component */ 1242);
/* harmony import */ var _app_footer_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app.footer.component */ 8811);
/* harmony import */ var _config_config_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./config/config.module */ 7622);
/* harmony import */ var _app_sidebar_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./app.sidebar.component */ 6762);
/* harmony import */ var _app_layout_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./app.layout.component */ 3725);




















let AppLayoutModule = class AppLayoutModule {};
AppLayoutModule = (0,tslib__WEBPACK_IMPORTED_MODULE_7__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_8__.NgModule)({
  declarations: [_app_menuitem_component__WEBPACK_IMPORTED_MODULE_1__.AppMenuitemComponent, _app_topbar_component__WEBPACK_IMPORTED_MODULE_2__.AppTopBarComponent, _app_footer_component__WEBPACK_IMPORTED_MODULE_3__.AppFooterComponent, _app_menu_component__WEBPACK_IMPORTED_MODULE_0__.AppMenuComponent, _app_sidebar_component__WEBPACK_IMPORTED_MODULE_5__.AppSidebarComponent, _app_layout_component__WEBPACK_IMPORTED_MODULE_6__.AppLayoutComponent],
  imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_9__.BrowserModule, _angular_forms__WEBPACK_IMPORTED_MODULE_10__.FormsModule, _angular_common_http__WEBPACK_IMPORTED_MODULE_11__.HttpClientModule, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_12__.BrowserAnimationsModule, primeng_inputtext__WEBPACK_IMPORTED_MODULE_13__.InputTextModule, primeng_sidebar__WEBPACK_IMPORTED_MODULE_14__.SidebarModule, primeng_badge__WEBPACK_IMPORTED_MODULE_15__.BadgeModule, primeng_radiobutton__WEBPACK_IMPORTED_MODULE_16__.RadioButtonModule, primeng_inputswitch__WEBPACK_IMPORTED_MODULE_17__.InputSwitchModule, primeng_ripple__WEBPACK_IMPORTED_MODULE_18__.RippleModule, _angular_router__WEBPACK_IMPORTED_MODULE_19__.RouterModule, _config_config_module__WEBPACK_IMPORTED_MODULE_4__.AppConfigModule],
  exports: [_app_layout_component__WEBPACK_IMPORTED_MODULE_6__.AppLayoutComponent]
})], AppLayoutModule);


/***/ }),

/***/ 3217:
/*!**********************************************!*\
  !*** ./src/app/layout/app.menu.component.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppMenuComponent": () => (/* binding */ AppMenuComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _app_menu_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app.menu.component.html?ngResource */ 4695);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 124);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ngx-translate/core */ 8699);
/* harmony import */ var _interfaces_ui_models__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../interfaces/ui-models */ 3246);
/* harmony import */ var _services_app_layout_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./services/app.layout.service */ 9139);
/* harmony import */ var _services_authorization_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/authorization.service */ 4519);
/* harmony import */ var _services_menu_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../services/menu.service */ 8914);









let AppMenuComponent = class AppMenuComponent {
  constructor(layoutService, router, menuService, authorizationService, translate) {
    this.layoutService = layoutService;
    this.router = router;
    this.menuService = menuService;
    this.authorizationService = authorizationService;
    this.translate = translate;
    this.users = new _interfaces_ui_models__WEBPACK_IMPORTED_MODULE_1__.Menu();
    this.userRoles = new _interfaces_ui_models__WEBPACK_IMPORTED_MODULE_1__.Menu();
    this.model = [];
    this.translate.use('pl').subscribe(x => {
      this.buildMenu();
    });
    this.router.events.forEach(() => {
      this.buildMenu();
    });
  }
  ngOnInit() {}
  buildMenu() {
    this.authorizationService.decodeTokenAndSetData();
    this.model = [];
    var menu = this.menuService.getMenu();
    menu.forEach(menu => this.appendMenu(menu));
    this.model = [...this.model];
  }
  appendMenu(menu) {
    var _a, _b;
    if (!this.model) {
      return;
    }
    var allMenuPermissions = [];
    (_a = menu.Items) === null || _a === void 0 ? void 0 : _a.forEach(menuItem => {
      var _a;
      return (_a = menuItem.Permissions) === null || _a === void 0 ? void 0 : _a.forEach(permission => allMenuPermissions.push(permission));
    });
    //TODO
    var isAuthorized = this.isAuthorized(allMenuPermissions) || true;
    if (isAuthorized) {
      var menuItems = [];
      (_b = menu.Items) === null || _b === void 0 ? void 0 : _b.forEach(x => menuItems.push({
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
  appendMenuItem(menuItemLabel, permissions, label, icon, routerLink) {
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
        menuItem.items = menuItem.items.concat([{
          label: this.translate.instant(label),
          icon: icon,
          routerLink: routerLink
        }]);
      }
    }
  }
  isAuthorized(permissions) {
    var isAuthorized = false;
    for (const permission of permissions) {
      if (this.authorizationService.isAuthorized([permission])) {
        isAuthorized = true;
        break;
      }
    }
    return isAuthorized;
  }
};
AppMenuComponent.ctorParameters = () => [{
  type: _services_app_layout_service__WEBPACK_IMPORTED_MODULE_2__.LayoutService
}, {
  type: _angular_router__WEBPACK_IMPORTED_MODULE_5__.Router
}, {
  type: _services_menu_service__WEBPACK_IMPORTED_MODULE_4__.MenuService
}, {
  type: _services_authorization_service__WEBPACK_IMPORTED_MODULE_3__.AuthorizationService
}, {
  type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__.TranslateService
}];
AppMenuComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_7__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_8__.Component)({
  selector: 'app-menu',
  template: _app_menu_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__
})], AppMenuComponent);


/***/ }),

/***/ 7326:
/*!********************************************!*\
  !*** ./src/app/layout/app.menu.service.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MenuService": () => (/* binding */ MenuService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ 228);



let MenuService = class MenuService {
  constructor() {
    this.menuSource = new rxjs__WEBPACK_IMPORTED_MODULE_0__.Subject();
    this.resetSource = new rxjs__WEBPACK_IMPORTED_MODULE_0__.Subject();
    this.menuSource$ = this.menuSource.asObservable();
    this.resetSource$ = this.resetSource.asObservable();
  }
  onMenuStateChange(event) {
    this.menuSource.next(event);
  }
  reset() {
    this.resetSource.next(true);
  }
};
MenuService = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.Injectable)({
  providedIn: 'root'
})], MenuService);


/***/ }),

/***/ 2937:
/*!**************************************************!*\
  !*** ./src/app/layout/app.menuitem.component.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppMenuitemComponent": () => (/* binding */ AppMenuitemComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 124);
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/animations */ 4851);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ 116);
/* harmony import */ var _app_menu_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app.menu.service */ 7326);
/* harmony import */ var _services_app_layout_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./services/app.layout.service */ 9139);







let AppMenuitemComponent = class AppMenuitemComponent {
  constructor(layoutService, cd, router, menuService) {
    this.layoutService = layoutService;
    this.cd = cd;
    this.router = router;
    this.menuService = menuService;
    this.active = false;
    this.key = "";
    this.menuSourceSubscription = this.menuService.menuSource$.subscribe(value => {
      Promise.resolve(null).then(() => {
        if (value.routeEvent) {
          this.active = value.key === this.key || value.key.startsWith(this.key + '-') ? true : false;
        } else {
          if (value.key !== this.key && !value.key.startsWith(this.key + '-')) {
            this.active = false;
          }
        }
      });
    });
    this.menuResetSubscription = this.menuService.resetSource$.subscribe(() => {
      this.active = false;
    });
    this.router.events.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.filter)(event => event instanceof _angular_router__WEBPACK_IMPORTED_MODULE_3__.NavigationEnd)).subscribe(params => {
      if (this.item.routerLink) {
        this.updateActiveStateFromRoute();
      }
    });
  }
  ngOnInit() {
    this.key = this.parentKey ? this.parentKey + '-' + this.index : String(this.index);
    if (this.item.routerLink) {
      this.updateActiveStateFromRoute();
    }
  }
  updateActiveStateFromRoute() {
    let activeRoute = this.router.isActive(this.item.routerLink[0], {
      paths: 'exact',
      queryParams: 'ignored',
      matrixParams: 'ignored',
      fragment: 'ignored'
    });
    if (activeRoute) {
      this.menuService.onMenuStateChange({
        key: this.key,
        routeEvent: true
      });
    }
  }
  itemClick(event) {
    // avoid processing disabled items
    if (this.item.disabled) {
      event.preventDefault();
      return;
    }
    // execute command
    if (this.item.command) {
      this.item.command({
        originalEvent: event,
        item: this.item
      });
    }
    // toggle active state
    if (this.item.items) {
      this.active = !this.active;
    }
    this.menuService.onMenuStateChange({
      key: this.key
    });
  }
  get submenuAnimation() {
    return this.root ? 'expanded' : this.active ? 'expanded' : 'collapsed';
  }
  get activeClass() {
    return this.active && !this.root;
  }
  ngOnDestroy() {
    if (this.menuSourceSubscription) {
      this.menuSourceSubscription.unsubscribe();
    }
    if (this.menuResetSubscription) {
      this.menuResetSubscription.unsubscribe();
    }
  }
};
AppMenuitemComponent.ctorParameters = () => [{
  type: _services_app_layout_service__WEBPACK_IMPORTED_MODULE_1__.LayoutService
}, {
  type: _angular_core__WEBPACK_IMPORTED_MODULE_4__.ChangeDetectorRef
}, {
  type: _angular_router__WEBPACK_IMPORTED_MODULE_3__.Router
}, {
  type: _app_menu_service__WEBPACK_IMPORTED_MODULE_0__.MenuService
}];
AppMenuitemComponent.propDecorators = {
  item: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_4__.Input
  }],
  index: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_4__.Input
  }],
  root: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_4__.Input
  }, {
    type: _angular_core__WEBPACK_IMPORTED_MODULE_4__.HostBinding,
    args: ['class.layout-root-menuitem']
  }],
  parentKey: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_4__.Input
  }],
  activeClass: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_4__.HostBinding,
    args: ['class.active-menuitem']
  }]
};
AppMenuitemComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.Component)({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: '[app-menuitem]',
  template: `
		<ng-container>
            <div *ngIf="root && item.visible !== false" class="layout-menuitem-root-text">{{item.label}}</div>
			<a *ngIf="(!item.routerLink || item.items) && item.visible !== false" [attr.href]="item.url" (click)="itemClick($event)"
			   [ngClass]="item.class" [attr.target]="item.target" tabindex="0" pRipple>
				<i [ngClass]="item.icon" class="layout-menuitem-icon"></i>
				<span class="layout-menuitem-text">{{item.label}}</span>
				<i class="pi pi-fw pi-angle-down layout-submenu-toggler" *ngIf="item.items"></i>
			</a>
			<a *ngIf="(item.routerLink && !item.items) && item.visible !== false" (click)="itemClick($event)" [ngClass]="item.class" 
			   [routerLink]="item.routerLink" routerLinkActive="active-route" [routerLinkActiveOptions]="item.routerLinkActiveOptions||{ paths: 'exact', queryParams: 'ignored', matrixParams: 'ignored', fragment: 'ignored' }"
               [fragment]="item.fragment" [queryParamsHandling]="item.queryParamsHandling" [preserveFragment]="item.preserveFragment" 
               [skipLocationChange]="item.skipLocationChange" [replaceUrl]="item.replaceUrl" [state]="item.state" [queryParams]="item.queryParams"
               [attr.target]="item.target" tabindex="0" pRipple>
				<i [ngClass]="item.icon" class="layout-menuitem-icon"></i>
				<span class="layout-menuitem-text">{{item.label}}</span>
				<i class="pi pi-fw pi-angle-down layout-submenu-toggler" *ngIf="item.items"></i>
			</a>

			<ul *ngIf="item.items && item.visible !== false" [@children]="submenuAnimation">
				<ng-template ngFor let-child let-i="index" [ngForOf]="item.items">
					<li app-menuitem [item]="child" [index]="i" [parentKey]="key" [class]="child.badgeClass"></li>
				</ng-template>
			</ul>
		</ng-container>
    `,
  animations: [(0,_angular_animations__WEBPACK_IMPORTED_MODULE_6__.trigger)('children', [(0,_angular_animations__WEBPACK_IMPORTED_MODULE_6__.state)('collapsed', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_6__.style)({
    height: '0'
  })), (0,_angular_animations__WEBPACK_IMPORTED_MODULE_6__.state)('expanded', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_6__.style)({
    height: '*'
  })), (0,_angular_animations__WEBPACK_IMPORTED_MODULE_6__.transition)('collapsed <=> expanded', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_6__.animate)('400ms cubic-bezier(0.86, 0, 0.07, 1)'))])]
})], AppMenuitemComponent);


/***/ }),

/***/ 6762:
/*!*************************************************!*\
  !*** ./src/app/layout/app.sidebar.component.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppSidebarComponent": () => (/* binding */ AppSidebarComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _app_sidebar_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app.sidebar.component.html?ngResource */ 6448);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _services_app_layout_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./services/app.layout.service */ 9139);




let AppSidebarComponent = class AppSidebarComponent {
  constructor(layoutService, el) {
    this.layoutService = layoutService;
    this.el = el;
  }
};
AppSidebarComponent.ctorParameters = () => [{
  type: _services_app_layout_service__WEBPACK_IMPORTED_MODULE_1__.LayoutService
}, {
  type: _angular_core__WEBPACK_IMPORTED_MODULE_2__.ElementRef
}];
AppSidebarComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.Component)({
  selector: 'app-sidebar',
  template: _app_sidebar_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__
})], AppSidebarComponent);


/***/ }),

/***/ 1242:
/*!************************************************!*\
  !*** ./src/app/layout/app.topbar.component.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppTopBarComponent": () => (/* binding */ AppTopBarComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _app_topbar_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app.topbar.component.html?ngResource */ 4951);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../app.component */ 5041);
/* harmony import */ var _services_app_layout_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./services/app.layout.service */ 9139);





let AppTopBarComponent = class AppTopBarComponent {
  constructor(layoutService, app) {
    this.layoutService = layoutService;
    this.app = app;
  }
};
AppTopBarComponent.ctorParameters = () => [{
  type: _services_app_layout_service__WEBPACK_IMPORTED_MODULE_2__.LayoutService
}, {
  type: _app_component__WEBPACK_IMPORTED_MODULE_1__.AppComponent
}];
AppTopBarComponent.propDecorators = {
  menuButton: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.ViewChild,
    args: ['menubutton']
  }],
  topbarMenuButton: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.ViewChild,
    args: ['topbarmenubutton']
  }],
  menu: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.ViewChild,
    args: ['topbarmenu']
  }]
};
AppTopBarComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.Component)({
  selector: 'app-topbar',
  template: _app_topbar_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__
})], AppTopBarComponent);


/***/ }),

/***/ 3876:
/*!*******************************************************!*\
  !*** ./src/app/layout/config/app.config.component.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppConfigComponent": () => (/* binding */ AppConfigComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _app_config_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app.config.component.html?ngResource */ 9737);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _services_app_layout_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/app.layout.service */ 9139);
/* harmony import */ var _app_menu_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../app.menu.service */ 7326);





let AppConfigComponent = class AppConfigComponent {
  constructor(layoutService, menuService) {
    this.layoutService = layoutService;
    this.menuService = menuService;
    this.minimal = false;
    this.scales = [12, 13, 14, 15, 16];
  }
  get visible() {
    return this.layoutService.state.configSidebarVisible;
  }
  set visible(_val) {
    this.layoutService.state.configSidebarVisible = _val;
  }
  get scale() {
    return this.layoutService.config.scale;
  }
  set scale(_val) {
    this.layoutService.config.scale = _val;
  }
  get menuMode() {
    return this.layoutService.config.menuMode;
  }
  set menuMode(_val) {
    this.layoutService.config.menuMode = _val;
  }
  get inputStyle() {
    return this.layoutService.config.inputStyle;
  }
  set inputStyle(_val) {
    this.layoutService.config.inputStyle = _val;
  }
  get ripple() {
    return this.layoutService.config.ripple;
  }
  set ripple(_val) {
    this.layoutService.config.ripple = _val;
  }
  onConfigButtonClick() {
    this.layoutService.showConfigSidebar();
  }
  changeTheme(theme, colorScheme) {
    const themeLink = document.getElementById('theme-css');
    const newHref = themeLink.getAttribute('href').replace(this.layoutService.config.theme, theme);
    this.layoutService.config.colorScheme;
    this.replaceThemeLink(newHref, () => {
      this.layoutService.config.theme = theme;
      this.layoutService.config.colorScheme = colorScheme;
      this.layoutService.onConfigUpdate();
    });
  }
  replaceThemeLink(href, onComplete) {
    const id = 'theme-css';
    const themeLink = document.getElementById('theme-css');
    const cloneLinkElement = themeLink.cloneNode(true);
    cloneLinkElement.setAttribute('href', href);
    cloneLinkElement.setAttribute('id', id + '-clone');
    themeLink.parentNode.insertBefore(cloneLinkElement, themeLink.nextSibling);
    cloneLinkElement.addEventListener('load', () => {
      themeLink.remove();
      cloneLinkElement.setAttribute('id', id);
      onComplete();
    });
  }
  decrementScale() {
    this.scale--;
    this.applyScale();
  }
  incrementScale() {
    this.scale++;
    this.applyScale();
  }
  applyScale() {
    document.documentElement.style.fontSize = this.scale + 'px';
  }
};
AppConfigComponent.ctorParameters = () => [{
  type: _services_app_layout_service__WEBPACK_IMPORTED_MODULE_1__.LayoutService
}, {
  type: _app_menu_service__WEBPACK_IMPORTED_MODULE_2__.MenuService
}];
AppConfigComponent.propDecorators = {
  minimal: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.Input
  }]
};
AppConfigComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.Component)({
  selector: 'app-config',
  template: _app_config_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__
})], AppConfigComponent);


/***/ }),

/***/ 7622:
/*!************************************************!*\
  !*** ./src/app/layout/config/config.module.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppConfigModule": () => (/* binding */ AppConfigModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 4666);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var primeng_sidebar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! primeng/sidebar */ 4179);
/* harmony import */ var primeng_radiobutton__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! primeng/radiobutton */ 9902);
/* harmony import */ var primeng_button__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! primeng/button */ 6328);
/* harmony import */ var primeng_inputswitch__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! primeng/inputswitch */ 3585);
/* harmony import */ var _app_config_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app.config.component */ 3876);









let AppConfigModule = class AppConfigModule {};
AppConfigModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormsModule, primeng_sidebar__WEBPACK_IMPORTED_MODULE_5__.SidebarModule, primeng_radiobutton__WEBPACK_IMPORTED_MODULE_6__.RadioButtonModule, primeng_button__WEBPACK_IMPORTED_MODULE_7__.ButtonModule, primeng_inputswitch__WEBPACK_IMPORTED_MODULE_8__.InputSwitchModule],
  declarations: [_app_config_component__WEBPACK_IMPORTED_MODULE_0__.AppConfigComponent],
  exports: [_app_config_component__WEBPACK_IMPORTED_MODULE_0__.AppConfigComponent]
})], AppConfigModule);


/***/ }),

/***/ 9139:
/*!*******************************************************!*\
  !*** ./src/app/layout/services/app.layout.service.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LayoutService": () => (/* binding */ LayoutService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ 228);



let LayoutService = class LayoutService {
  constructor() {
    this.config = {
      ripple: false,
      inputStyle: 'outlined',
      menuMode: 'static',
      colorScheme: 'light',
      theme: 'lara-light-indigo',
      scale: 14
    };
    this.state = {
      staticMenuDesktopInactive: false,
      overlayMenuActive: false,
      profileSidebarVisible: false,
      configSidebarVisible: false,
      staticMenuMobileActive: false,
      menuHoverActive: false
    };
    this.configUpdate = new rxjs__WEBPACK_IMPORTED_MODULE_0__.Subject();
    this.overlayOpen = new rxjs__WEBPACK_IMPORTED_MODULE_0__.Subject();
    this.configUpdate$ = this.configUpdate.asObservable();
    this.overlayOpen$ = this.overlayOpen.asObservable();
  }
  onMenuToggle() {
    if (this.isOverlay()) {
      this.state.overlayMenuActive = !this.state.overlayMenuActive;
      if (this.state.overlayMenuActive) {
        this.overlayOpen.next(null);
      }
    }
    if (this.isDesktop()) {
      this.state.staticMenuDesktopInactive = !this.state.staticMenuDesktopInactive;
    } else {
      this.state.staticMenuMobileActive = !this.state.staticMenuMobileActive;
      if (this.state.staticMenuMobileActive) {
        this.overlayOpen.next(null);
      }
    }
  }
  showProfileSidebar() {
    this.state.profileSidebarVisible = !this.state.profileSidebarVisible;
    if (this.state.profileSidebarVisible) {
      this.overlayOpen.next(null);
    }
  }
  showConfigSidebar() {
    this.state.configSidebarVisible = true;
  }
  isOverlay() {
    return this.config.menuMode === 'overlay';
  }
  isDesktop() {
    return window.innerWidth > 991;
  }
  isMobile() {
    return !this.isDesktop();
  }
  onConfigUpdate() {
    this.configUpdate.next(this.config);
  }
};
LayoutService = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.Injectable)({
  providedIn: 'root'
})], LayoutService);


/***/ }),

/***/ 8968:
/*!************************************************!*\
  !*** ./src/app/services/auth-guard.service.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AuthGuard": () => (/* binding */ AuthGuard)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _authorization_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./authorization.service */ 4519);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ 124);




let AuthGuard = class AuthGuard {
  constructor(router, authorizationService) {
    this.router = router;
    this.authorizationService = authorizationService;
  }
  canActivate(next, state) {
    const allowedPermissions = next.data['allowedPermissions'];
    const isAuthorized = this.authorizationService.isAuthorized(allowedPermissions);
    if (!isAuthorized) {
      this.authorizationService.decodeTokenAndSetData();
      this.router.navigate(['login']);
    }
    this.authorizationService.decodeTokenAndSetData();
    return isAuthorized;
  }
  canActivateChild(next, state) {
    const allowedPermissions = next.data['allowedPermissions'];
    const isAuthorized = this.authorizationService.isAuthorized(allowedPermissions);
    if (!isAuthorized) {
      this.authorizationService.resetAllData();
      this.router.navigate(['login']);
    }
    this.authorizationService.decodeTokenAndSetData();
    return isAuthorized;
  }
};
AuthGuard.ctorParameters = () => [{
  type: _angular_router__WEBPACK_IMPORTED_MODULE_1__.Router
}, {
  type: _authorization_service__WEBPACK_IMPORTED_MODULE_0__.AuthorizationService
}];
AuthGuard = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.Injectable)()], AuthGuard);


/***/ }),

/***/ 7053:
/*!****************************************************!*\
  !*** ./src/app/services/authentication.service.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AuthenticationService": () => (/* binding */ AuthenticationService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _authorization_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./authorization.service */ 4519);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 4666);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common/http */ 8987);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 833);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ 745);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ 635);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 3158);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../environments/environment */ 2340);








let AuthenticationService = class AuthenticationService {
  constructor(authorizationService, httpClient, platformId) {
    this.authorizationService = authorizationService;
    this.httpClient = httpClient;
    this.platformId = platformId;
  }
  // performs the login
  login(authData) {
    var url = "token/authenticate";
    var data = {
      username: authData.Login,
      password: authData.Password,
      // required when signing up with username/password
      grant_type: "password",
      // space-separated list of scopes for which the token is issued
      scope: "offline_access profile email"
    };
    return this.httpClient.post(url, data).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.map)(res => {
      let token = res && res.token;
      if (res.code == CustomResponeCode.NotActice) {
        return "NotActice";
      } else if (res.code != 200) {
        return "Error";
      }
      // if the token is there, login has been successful
      if (token) {
        // store username and jwt token
        this.setAuth(res);
        this.authorizationService.decodeTokenAndSetData();
        // successful login
        return "OK";
      }
      return "Error";
      // failed login
    }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.catchError)(error => {
      console.log(error);
      return new rxjs__WEBPACK_IMPORTED_MODULE_4__.Observable(error);
    }));
  }
  // performs the logout
  logout() {
    this.setAuth(null);
    this.authorizationService.resetAllData();
    return true;
  }
  refreshToken() {
    var url = "token/refreshToken";
    const tokenData = JSON.parse(localStorage.getItem(_environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.auth_key_name) || '');
    var data = {
      Token: tokenData.token,
      RefreshToken: tokenData.refreshToken
    };
    return this.httpClient.post(url, data).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.map)(res => {
      this.setAuth(res);
      this.authorizationService.decodeTokenAndSetData();
      return "OK";
    }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.catchError)(error => {
      console.log(error);
      return new rxjs__WEBPACK_IMPORTED_MODULE_4__.Observable(error);
    }));
  }
  // Persist auth into localStorage or removes it if a NULL argument is given
  setAuth(auth) {
    if ((0,_angular_common__WEBPACK_IMPORTED_MODULE_5__.isPlatformBrowser)(this.platformId)) {
      if (auth) {
        localStorage.setItem(_environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.auth_key_name, JSON.stringify(auth));
        this.isLoggedIn$ = (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(true);
      } else {
        localStorage.removeItem(_environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.auth_key_name);
        this.isLoggedIn$ = (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(false);
      }
    }
    return true;
  }
  // Retrieves the auth JSON object (or NULL if none)
  getAuth() {
    if ((0,_angular_common__WEBPACK_IMPORTED_MODULE_5__.isPlatformBrowser)(this.platformId)) {
      var i = localStorage.getItem(_environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.auth_key_name);
      if (i) {
        return JSON.parse(i);
      }
    }
    return null;
  }
  // Returns TRUE if the user is logged in, FALSE otherwise.
  isLoggedIn() {
    if ((0,_angular_common__WEBPACK_IMPORTED_MODULE_5__.isPlatformBrowser)(this.platformId)) {
      return localStorage.getItem(_environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.auth_key_name) != null;
    }
    return false;
  }
};
AuthenticationService.ctorParameters = () => [{
  type: _authorization_service__WEBPACK_IMPORTED_MODULE_0__.AuthorizationService
}, {
  type: _angular_common_http__WEBPACK_IMPORTED_MODULE_7__.HttpClient
}, {
  type: undefined,
  decorators: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_8__.Inject,
    args: [_angular_core__WEBPACK_IMPORTED_MODULE_8__.PLATFORM_ID]
  }]
}];
AuthenticationService = (0,tslib__WEBPACK_IMPORTED_MODULE_9__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_8__.Injectable)()], AuthenticationService);

var CustomResponeCode;
(function (CustomResponeCode) {
  CustomResponeCode[CustomResponeCode["NotActice"] = 165] = "NotActice";
})(CustomResponeCode || (CustomResponeCode = {}));

/***/ }),

/***/ 4519:
/*!***************************************************!*\
  !*** ./src/app/services/authorization.service.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AuthorizationService": () => (/* binding */ AuthorizationService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _auth0_angular_jwt__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @auth0/angular-jwt */ 4467);
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/environments/environment */ 2340);
var AuthorizationService_1;




let AuthorizationService = AuthorizationService_1 = class AuthorizationService {
  constructor(jwtHelperService) {
    this.jwtHelperService = jwtHelperService;
    //property let to use static properties.
    this.AS = AuthorizationService_1;
  }
  static get currentUserId() {
    return this._currentUserId;
  }
  static get currentUserName() {
    return this._currentUserName;
  }
  static get currentUserRoles() {
    return this._currentUserRoles;
  }
  static get currentUserLanguageId() {
    return this._currentUserLanguageId;
  }
  static get currentUserRoleId() {
    return this._currentUserRoleId;
  }
  static get currentUserRoleName() {
    return this._currentUserRoleName;
  }
  static get currentUserPermissions() {
    return this._currentUserPermissions;
  }
  isAuthorized(allowedPermissions) {
    // check if the list of allowed permissions is empty, if empty, authorize the user to access the page
    if (allowedPermissions == null || allowedPermissions.length === 0) {
      return true;
    }
    const decodedToken = this.decodeToken();
    // check if it was decoded successfully, if not the token is not valid, deny access
    if (!decodedToken) {
      console.log('Invalid token');
      return false;
    }
    // check if the user roles is in the list of allowed permissions, return true if allowed and false if not allowed
    var permissions = [];
    var permissionsStr = decodedToken['permissions'].split(',');
    permissionsStr.forEach(str => {
      permissions.push(Number(str));
    });
    return allowedPermissions.some(r => permissions.includes(r));
  }
  decodeToken() {
    const token = localStorage.getItem(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.auth_key_name);
    return this.jwtHelperService.decodeToken(token || '');
  }
  decodeTokenAndSetData() {
    const decodedToken = this.decodeToken();
    if (decodedToken) {
      AuthorizationService_1._currentUserId = Number(decodedToken['sub']);
      AuthorizationService_1._currentUserName = decodedToken['given_name'];
      AuthorizationService_1._currentUserLanguageId = decodedToken['userlanguageid'];
      AuthorizationService_1._currentUserRoleId = decodedToken['userroleid'];
      AuthorizationService_1._currentUserRoleName = decodedToken['userrolename'];
      AuthorizationService_1._currentUserRoles = decodedToken['role'];
      AuthorizationService_1._currentUserPermissions = [];
      var currentUserPermissionsStr = decodedToken['permissions'].split(',');
      currentUserPermissionsStr.forEach(str => {
        var _a;
        (_a = AuthorizationService_1._currentUserPermissions) === null || _a === void 0 ? void 0 : _a.push(Number(str));
      });
    } else {
      this.resetAllData();
    }
  }
  resetAllData() {
    AuthorizationService_1._currentUserId = undefined;
    AuthorizationService_1._currentUserName = undefined;
    AuthorizationService_1._currentUserLanguageId = undefined;
    AuthorizationService_1._currentUserRoleId = undefined;
    AuthorizationService_1._currentUserRoleName = undefined;
    AuthorizationService_1._currentUserRoles = undefined;
    AuthorizationService_1._currentUserPermissions = undefined;
  }
};
AuthorizationService.ctorParameters = () => [{
  type: _auth0_angular_jwt__WEBPACK_IMPORTED_MODULE_1__.JwtHelperService
}];
AuthorizationService = AuthorizationService_1 = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.Injectable)({
  providedIn: 'root'
})], AuthorizationService);


/***/ }),

/***/ 4133:
/*!**************************************************************!*\
  !*** ./src/app/services/interceptors/api-url-interceptor.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ApiUrlInterceptor": () => (/* binding */ ApiUrlInterceptor)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/environments/environment */ 2340);



let ApiUrlInterceptor = class ApiUrlInterceptor {
  intercept(req, next) {
    var apiReq = undefined;
    if (req.url.includes('assets/i18n')) {
      if (location.protocol == 'https:') {
        apiReq = req.clone({
          url: `https://${window.location.host}${req.url}`
        });
      } else {
        apiReq = req.clone({
          url: `http://${window.location.host}${req.url}`
        });
      }
    } else {
      apiReq = req.clone({
        url: `${src_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.apiUrl}${req.url}`
      });
    }
    return next.handle(apiReq);
  }
};
ApiUrlInterceptor = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.Injectable)()], ApiUrlInterceptor);


/***/ }),

/***/ 8617:
/*!***********************************************************!*\
  !*** ./src/app/services/interceptors/auth-interceptor.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AuthInterceptor": () => (/* binding */ AuthInterceptor)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _authentication_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../authentication.service */ 7053);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 5474);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ 3158);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ 9337);





let AuthInterceptor = class AuthInterceptor {
  constructor(injector) {
    this.injector = injector;
  }
  intercept(request, next) {
    var auth = this.injector.get(_authentication_service__WEBPACK_IMPORTED_MODULE_0__.AuthenticationService);
    var token = auth.isLoggedIn() ? auth.getAuth().token : null;
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    return next.handle(request).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.catchError)(error => {
      if (error.status == 401 && !this.isRefreshingToken) {
        this.isRefreshingToken = true;
        console.log("refreshing token...");
        auth.refreshToken().subscribe(result => {
          console.log("token refreshed with result: " + result);
          this.isRefreshingToken = false;
          if (result == "OK") {
            window.location.reload();
            return (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(x => "OK");
          } else {
            console.error(error);
            return (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.throwError)(error.message);
          }
        });
      }
      console.error(error);
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.throwError)(error.message);
    }));
  }
};
AuthInterceptor.ctorParameters = () => [{
  type: _angular_core__WEBPACK_IMPORTED_MODULE_4__.Injector
}];
AuthInterceptor = (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.Injectable)()], AuthInterceptor);


/***/ }),

/***/ 8914:
/*!******************************************!*\
  !*** ./src/app/services/menu.service.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MenuService": () => (/* binding */ MenuService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _enums_userPermissionEnum__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../enums/userPermissionEnum */ 451);
/* harmony import */ var _authorization_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./authorization.service */ 4519);
var MenuService_1;




let MenuService = MenuService_1 = class MenuService {
  constructor(authorizationService) {
    this.authorizationService = authorizationService;
    this.menu = [];
    this.initializeMenu();
    this.initializeMenuItems();
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
    var _a, _b, _c, _d;
    //MENU - USERS
    (_b = (_a = this.menu.find(m => m.Label == "Menu.Title")) === null || _a === void 0 ? void 0 : _a.Items) === null || _b === void 0 ? void 0 : _b.push({
      Permissions: [_enums_userPermissionEnum__WEBPACK_IMPORTED_MODULE_0__.UserPermissionEnum.Users_CanList],
      Label: "Menu.Users",
      Icon: 'fa fa-solid fa-user',
      RouterLink: [`${MenuService_1.ALL_MENU_URL_PREFIX}/users`]
    });
    //ADMINISTRATION - USER ROLES
    (_d = (_c = this.menu.find(m => m.Label == "Menu.Administration")) === null || _c === void 0 ? void 0 : _c.Items) === null || _d === void 0 ? void 0 : _d.push({
      Permissions: [_enums_userPermissionEnum__WEBPACK_IMPORTED_MODULE_0__.UserPermissionEnum.UserRoles_CanList],
      Label: "Menu.UserRoles",
      Icon: 'fa fa-solid fa-users',
      RouterLink: [`${MenuService_1.ALL_MENU_URL_PREFIX}/administration/user-roles`]
    });
  }
  getMenu() {
    return this.menu;
  }
  getFirstMenuItemUserIsAuthorizedFor() {
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
};
MenuService.ALL_MENU_URL_PREFIX = '/home';
MenuService.ctorParameters = () => [{
  type: _authorization_service__WEBPACK_IMPORTED_MODULE_1__.AuthorizationService
}];
MenuService = MenuService_1 = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.Injectable)({
  providedIn: 'root'
})], MenuService);


/***/ }),

/***/ 308:
/*!***********************************************!*\
  !*** ./src/app/ui-controls/form-validator.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FormValidator": () => (/* binding */ FormValidator)
/* harmony export */ });
class FormValidator {
  constructor(currentForm) {
    this.form = currentForm;
  }
  // retrieve a FormControl
  getFormControl(name) {
    return this.form.get(name);
  }
  // returns TRUE if the FormControl is valid
  isValid(name) {
    var e = this.getFormControl(name);
    return e && e.valid;
  }
  // returns TRUE if the FormControl has been changed
  isChanged(name) {
    var e = this.getFormControl(name);
    return e && (e.dirty || e.touched);
  }
  // returns TRUE if the FormControl is invalid after user changes
  hasError(name) {
    var e = this.getFormControl(name);
    return e && (e.dirty || e.touched) && !e.valid;
  }
  updateAllControlsToTouched() {
    if (this.form) {
      Object.keys(this.form.controls).forEach(key => {
        this.form.get(key).markAsTouched();
      });
    }
  }
}

/***/ }),

/***/ 2340:
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "environment": () => (/* binding */ environment)
/* harmony export */ });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
  production: false,
  apiUrl: 'http://localhost:61869/api/',
  auth_key_name: "Equiprent"
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

/***/ }),

/***/ 4431:
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ 6057);
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app/app.module */ 6747);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./environments/environment */ 2340);
/// <reference types="@angular/localize" />




if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.production) {
  (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.enableProdMode)();
}
(0,_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_3__.platformBrowserDynamic)().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_0__.AppModule).catch(err => console.error(err));

/***/ }),

/***/ 3383:
/*!***********************************************!*\
  !*** ./src/app/app.component.html?ngResource ***!
  \***********************************************/
/***/ ((module) => {

module.exports = "<router-outlet></router-outlet>\n";

/***/ }),

/***/ 1320:
/*!********************************************************!*\
  !*** ./src/app/components/login/login.html?ngResource ***!
  \********************************************************/
/***/ ((module) => {

module.exports = "<div class=\"surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden\">\r\n  <div class=\"flex flex-column align-items-center justify-content-center\">\r\n    <div class=\"login-panel\">\r\n      <div class=\"w-full surface-card py-8 px-5 sm:px-8\" style=\"border-radius:53px\">\r\n        <div class=\"text-center mb-5\">\r\n          <div class=\"text-900 text-3xl font-medium mb-3\">{{ 'General.Welcome' | translate }}</div>\r\n          <span class=\"text-600 font-medium\">{{ 'General.SignInToContinue' | translate }}</span>\r\n        </div>\r\n\r\n        <form [formGroup]=\"form\">\r\n          <div>\r\n            <label for=\"login\" class=\"block text-900 text-xl font-medium mb-2\">{{ 'User.Login' | translate }}</label>\r\n            <input pInputText id=\"login\" formControlName=\"Login\" type=\"text\" class=\"p-inputtext w-full md:w-30rem mb-5\"\r\n              style=\"padding:1rem\" autocomplete=\"off\">\r\n            <label for=\"password\" class=\"block text-900 font-medium text-xl mb-2\">{{ 'User.Password' | translate\r\n              }}</label>\r\n            <p-password id=\"password\" formControlName=\"Password\" [toggleMask]=\"true\" styleClass=\"mb-5\"\r\n              inputStyleClass=\"w-full p-3 md:w-30rem\"></p-password>\r\n\r\n            <div class=\"flex align-items-center justify-content-between mb-5 gap-5\">\r\n              <div class=\"flex align-items-center\">\r\n                <p-checkbox id=\"rememberme1\" [binary]=\"true\" styleClass=\"mr-2\"></p-checkbox>\r\n                <label for=\"rememberme1\">{{ 'General.RememberMe' | translate }}</label>\r\n              </div>\r\n              <a class=\"font-medium no-underline ml-2 text-right cursor-pointer\" style=\"color: var(--primary-color)\"\r\n                [routerLink]=\"\" (click)=\"resetPassword()\">{{\r\n                'General.ForgotPassword' | translate }}?</a>\r\n            </div>\r\n            <button pButton pRipple label=\"{{ 'General.SignIn' | translate }}\" class=\"w-full p-3 text-xl\"\r\n              (click)=\"onSubmit()\"></button>\r\n          </div>\r\n        </form>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n<p-toast key=\"tst\"></p-toast>";

/***/ }),

/***/ 3136:
/*!**********************************************************************!*\
  !*** ./src/app/components/user-roles/user-role-list.html?ngResource ***!
  \**********************************************************************/
/***/ ((module) => {

module.exports = "";

/***/ }),

/***/ 4921:
/*!************************************************************!*\
  !*** ./src/app/components/users/user-list.html?ngResource ***!
  \************************************************************/
/***/ ((module) => {

module.exports = "";

/***/ }),

/***/ 8980:
/*!*************************************************************!*\
  !*** ./src/app/layout/app.footer.component.html?ngResource ***!
  \*************************************************************/
/***/ ((module) => {

module.exports = "<div class=\"layout-footer\">\n    by\n    <span class=\"font-medium ml-2\">Alec Chocholski</span>\n</div>\n";

/***/ }),

/***/ 1896:
/*!*************************************************************!*\
  !*** ./src/app/layout/app.layout.component.html?ngResource ***!
  \*************************************************************/
/***/ ((module) => {

module.exports = "<div *ngIf=\"isUserLoggedIn\" class=\"layout-wrapper\" [ngClass]=\"containerClass\">\n    <app-topbar></app-topbar>\n    <div class=\"layout-sidebar\">\n        <app-sidebar></app-sidebar>\n    </div>\n    <div class=\"layout-main-container\">\n        <div class=\"layout-main\">\n            <router-outlet></router-outlet>\n        </div>\n        <app-footer></app-footer>\n    </div>\n    <div class=\"layout-mask\"></div>\n</div>\n\n<div *ngIf=\"!isUserLoggedIn\" class=\"layout-wrapper\" [ngClass]=\"containerClass\">\n    <div class=\"layout-main-container\" style=\"margin: 0;\">\n        <div class=\"layout-main\">\n            <router-outlet></router-outlet>\n        </div>\n    </div>\n</div>";

/***/ }),

/***/ 4695:
/*!***********************************************************!*\
  !*** ./src/app/layout/app.menu.component.html?ngResource ***!
  \***********************************************************/
/***/ ((module) => {

module.exports = "<ul class=\"layout-menu\">\n    <ng-container *ngFor=\"let item of model; let i = index;\">\n        <li app-menuitem [item]=\"item\" [index]=\"i\" [root]=\"true\"></li>\n        <li class=\"menu-separator\"></li>\n    </ng-container>\n</ul>\n";

/***/ }),

/***/ 6448:
/*!**************************************************************!*\
  !*** ./src/app/layout/app.sidebar.component.html?ngResource ***!
  \**************************************************************/
/***/ ((module) => {

module.exports = " <app-menu></app-menu>\n";

/***/ }),

/***/ 4951:
/*!*************************************************************!*\
  !*** ./src/app/layout/app.topbar.component.html?ngResource ***!
  \*************************************************************/
/***/ ((module) => {

module.exports = "<div class=\"layout-topbar\">\n    <a class=\"layout-topbar-logo\" routerLink=\"\">\n        <img src=\"assets/layout/images/logo.png\" alt=\"logo\" style=\"height: 2.5em; margin-right: 1em;\">\n        <span>EQUIPRENT</span>\n    </a>\n\n    <button #menubutton class=\"p-link layout-menu-button layout-topbar-button\" (click)=\"layoutService.onMenuToggle()\">\n        <i class=\"pi pi-bars\"></i>\n    </button>\n\n    <button #topbarmenubutton class=\"p-link layout-topbar-menu-button layout-topbar-button\"\n        (click)=\"layoutService.showProfileSidebar()\">\n        <i class=\"pi pi-ellipsis-v\"></i>\n    </button>\n\n    <div #topbarmenu class=\"layout-topbar-menu\"\n        [ngClass]=\"{'layout-topbar-menu-mobile-active': layoutService.state.profileSidebarVisible}\">\n        <button class=\"p-link layout-topbar-button\">\n            <i class=\"fa fa-solid fa-user\"></i>\n            <span>Profile</span>\n        </button>\n    </div>\n</div>";

/***/ }),

/***/ 9737:
/*!********************************************************************!*\
  !*** ./src/app/layout/config/app.config.component.html?ngResource ***!
  \********************************************************************/
/***/ ((module) => {

module.exports = "<button class=\"layout-config-button p-link\" type=\"button\" (click)=\"onConfigButtonClick()\">\n    <i class=\"pi pi-cog\"></i>\n</button>\n\n<p-sidebar [(visible)]=\"visible\" position=\"right\" [transitionOptions]=\"'.3s cubic-bezier(0, 0, 0.2, 1)'\" styleClass=\"layout-config-sidebar w-20rem\">\n    <h5>Scale</h5>\n    <div class=\"flex align-items-center\">\n        <button icon=\"pi pi-minus\" type=\"button\" pButton (click)=\"decrementScale()\" class=\"p-button-text p-button-rounded w-2rem h-2rem mr-2\" [disabled]=\"scale === scales[0]\"></button>\n        <div class=\"flex gap-2 align-items-center\">\n            <i class=\"pi pi-circle-fill text-300\" *ngFor=\"let s of scales\" [ngClass]=\"{'text-primary-500': s === scale}\"></i>\n        </div>\n        <button icon=\"pi pi-plus\"  type=\"button\" pButton (click)=\"incrementScale()\" class=\"p-button-text p-button-rounded w-2rem h-2rem ml-2\" [disabled]=\"scale === scales[scales.length - 1]\"></button>\n    </div>\n\n    <ng-container *ngIf=\"!minimal\">\n        <h5>Menu Type</h5>\n        <div class=\"field-radiobutton\">\n            <p-radioButton name=\"menuMode\" value=\"static\" [(ngModel)]=\"menuMode\" inputId=\"mode1\"></p-radioButton>\n            <label for=\"mode1\">Static</label>\n        </div>\n        <div class=\"field-radiobutton\">\n            <p-radioButton name=\"menuMode\" value=\"overlay\" [(ngModel)]=\"menuMode\" inputId=\"mode2\"></p-radioButton>\n            <label for=\"mode2\">Overlay</label>\n        </div>\n    </ng-container>\n\n    <ng-container *ngIf=\"!minimal\">\n        <h5>Input Style</h5>\n        <div class=\"flex\">\n            <div class=\"field-radiobutton flex-1\">\n                <p-radioButton name=\"inputStyle\" value=\"outlined\" [(ngModel)]=\"inputStyle\" inputId=\"outlined_input\"></p-radioButton>\n                <label for=\"outlined_input\">Outlined</label>\n            </div>\n            <div class=\"field-radiobutton flex-1\">\n                <p-radioButton name=\"inputStyle\" value=\"filled\" [(ngModel)]=\"inputStyle\" inputId=\"filled_input\"></p-radioButton>\n                <label for=\"filled_input\">Filled</label>\n            </div>\n        </div>\n\n        <h5>Ripple Effect</h5>\n        <p-inputSwitch [(ngModel)]=\"ripple\"></p-inputSwitch>\n    </ng-container>\n\n\n    <h5>Bootstrap</h5>\n    <div class=\"grid\">\n        <div class=\"col-3\">\n            <button class=\"p-link w-2rem h-2rem\" (click)=\"changeTheme('bootstrap4-light-blue', 'light')\">\n                <img src=\"assets/layout/images/themes/bootstrap4-light-blue.svg\" class=\"w-2rem h-2rem\" alt=\"Bootstrap Light Blue\">\n            </button>\n        </div>\n        <div class=\"col-3\">\n            <button class=\"p-link w-2rem h-2rem\" (click)=\"changeTheme('bootstrap4-light-purple', 'light')\">\n                <img src=\"assets/layout/images/themes/bootstrap4-light-purple.svg\" class=\"w-2rem h-2rem\" alt=\"Bootstrap Light Purple\">\n            </button>\n        </div>\n        <div class=\"col-3\">\n            <button class=\"p-link w-2rem h-2rem\" (click)=\"changeTheme('bootstrap4-dark-blue', 'dark')\">\n                <img src=\"assets/layout/images/themes/bootstrap4-dark-blue.svg\" class=\"w-2rem h-2rem\" alt=\"Bootstrap Dark Blue\">\n            </button>\n        </div>\n        <div class=\"col-3\">\n            <button class=\"p-link w-2rem h-2rem\" (click)=\"changeTheme('bootstrap4-dark-purple', 'dark')\">\n                <img src=\"assets/layout/images/themes/bootstrap4-dark-purple.svg\" class=\"w-2rem h-2rem\" alt=\"Bootstrap Dark Purple\">\n            </button>\n        </div>\n    </div>\n\n    <h5>Material Design</h5>\n    <div class=\"grid\">\n        <div class=\"col-3\">\n            <button class=\"p-link w-2rem h-2rem\" (click)=\"changeTheme('md-light-indigo', 'light')\">\n                <img src=\"assets/layout/images/themes/md-light-indigo.svg\" class=\"w-2rem h-2rem\" alt=\"Material Light Indigo\">\n            </button>\n        </div>\n        <div class=\"col-3\">\n            <button class=\"p-link w-2rem h-2rem\" (click)=\"changeTheme('md-light-deeppurple', 'light')\">\n                <img src=\"assets/layout/images/themes/md-light-deeppurple.svg\" class=\"w-2rem h-2rem\" alt=\"Material Light DeepPurple\">\n            </button>\n        </div>\n        <div class=\"col-3\">\n            <button class=\"p-link w-2rem h-2rem\" (click)=\"changeTheme('md-dark-indigo', 'dark')\">\n                <img src=\"assets/layout/images/themes/md-dark-indigo.svg\" class=\"w-2rem h-2rem\" alt=\"Material Dark Indigo\">\n            </button>\n        </div>\n        <div class=\"col-3\">\n            <button class=\"p-link w-2rem h-2rem\" (click)=\"changeTheme('md-dark-deeppurple', 'dark')\">\n                <img src=\"assets/layout/images/themes/md-dark-deeppurple.svg\" class=\"w-2rem h-2rem\" alt=\"Material Dark DeepPurple\">\n            </button>\n        </div>\n    </div>\n\n    <h5>Material Design Compact</h5>\n    <div class=\"grid\">\n        <div class=\"col-3\">\n            <button class=\"p-link w-2rem h-2rem\" (click)=\"changeTheme('mdc-light-indigo', 'light')\">\n                <img src=\"assets/layout/images/themes/md-light-indigo.svg\" class=\"w-2rem h-2rem\" alt=\"Material Light Indigo\">\n            </button>\n        </div>\n        <div class=\"col-3\">\n            <button class=\"p-link w-2rem h-2rem\" (click)=\"changeTheme('mdc-light-deeppurple', 'light')\">\n                <img src=\"assets/layout/images/themes/md-light-deeppurple.svg\" class=\"w-2rem h-2rem\" alt=\"Material Light Deep Purple\">\n            </button>\n        </div>\n        <div class=\"col-3\">\n            <button class=\"p-link w-2rem h-2rem\" (click)=\"changeTheme('mdc-dark-indigo', 'dark')\">\n                <img src=\"assets/layout/images/themes/md-dark-indigo.svg\" class=\"w-2rem h-2rem\" alt=\"Material Dark Indigo\">\n            </button>\n        </div>\n        <div class=\"col-3\">\n            <button class=\"p-link w-2rem h-2rem\" (click)=\"changeTheme('mdc-dark-deeppurple', 'dark')\">\n                <img src=\"assets/layout/images/themes/md-dark-deeppurple.svg\" class=\"w-2rem h-2rem\" alt=\"Material Dark Deep Purple\">\n            </button>\n        </div>\n    </div>\n\n    <h5>Tailwind</h5>\n    <div class=\"grid\">\n        <div class=\"col-3\">\n            <button class=\"p-link w-2rem h-2rem\" (click)=\"changeTheme('tailwind-light', 'light')\">\n                <img src=\"assets/layout/images/themes/tailwind-light.png\" class=\"w-2rem h-2rem\" alt=\"Tailwind Light\">\n            </button>\n        </div>\n    </div>\n\n    <h5>Fluent UI</h5>\n    <div class=\"grid\">\n        <div class=\"col-3\">\n            <button class=\"p-link w-2rem h-2rem\" (click)=\"changeTheme('fluent-light', 'light')\">\n                <img src=\"assets/layout/images/themes/fluent-light.png\" class=\"w-2rem h-2rem\" alt=\"Fluent Light\">\n            </button>\n        </div>\n    </div>\n\n    <h5>PrimeOne Design - 2022</h5>\n    <div class=\"grid\">\n        <div class=\"col-3\">\n            <button class=\"p-link w-2rem h-2rem\" (click)=\"changeTheme('lara-light-indigo', 'light')\">\n                <img src=\"assets/layout/images/themes/lara-light-indigo.png\" class=\"w-2rem h-2rem\" alt=\"Lara Light Indigo\">\n            </button>\n        </div>\n        <div class=\"col-3\">\n            <button class=\"p-link w-2rem h-2rem\" (click)=\"changeTheme('lara-light-blue', 'light')\">\n                <img src=\"assets/layout/images/themes/lara-light-blue.png\" class=\"w-2rem h-2rem\" alt=\"Lara Light Blue\">\n            </button>\n        </div>\n        <div class=\"col-3\">\n            <button class=\"p-link w-2rem h-2rem\" (click)=\"changeTheme('lara-light-purple', 'light')\">\n                <img src=\"assets/layout/images/themes/lara-light-purple.png\" class=\"w-2rem h-2rem\" alt=\"Lara Light Purple\">\n            </button>\n        </div>\n        <div class=\"col-3\">\n            <button class=\"p-link w-2rem h-2rem\" (click)=\"changeTheme('lara-light-teal', 'light')\">\n                <img src=\"assets/layout/images/themes/lara-light-teal.png\" class=\"w-2rem h-2rem\" alt=\"Lara Light Teal\">\n            </button>\n        </div>\n        <div class=\"col-3\">\n            <button class=\"p-link w-2rem h-2rem\" (click)=\"changeTheme('lara-dark-indigo', 'dark')\">\n                <img src=\"assets/layout/images/themes/lara-dark-indigo.png\" class=\"w-2rem h-2rem\" alt=\"Lara Dark Indigo\">\n            </button>\n        </div>\n        <div class=\"col-3\">\n            <button class=\"p-link w-2rem h-2rem\" (click)=\"changeTheme('lara-dark-blue', 'dark')\">\n                <img src=\"assets/layout/images/themes/lara-dark-blue.png\" class=\"w-2rem h-2rem\" alt=\"Lara Dark Blue\">\n            </button>\n        </div>\n        <div class=\"col-3\">\n            <button class=\"p-link w-2rem h-2rem\" (click)=\"changeTheme('lara-dark-purple', 'dark')\">\n                <img src=\"assets/layout/images/themes/lara-dark-purple.png\" class=\"w-2rem h-2rem\" alt=\"Lara Dark Purple\">\n            </button>\n        </div>\n        <div class=\"col-3\">\n            <button class=\"p-link w-2rem h-2rem\" (click)=\"changeTheme('lara-dark-teal', 'dark')\">\n                <img src=\"assets/layout/images/themes/lara-dark-teal.png\" class=\"w-2rem h-2rem\" alt=\"Lara Dark Teal\">\n            </button>\n        </div>\n    </div>\n\n    <h5>PrimeOne Design - 2021</h5>\n    <div class=\"grid\">\n        <div class=\"col-3\">\n            <button class=\"p-link w-2rem h-2rem\" (click)=\"changeTheme('saga-blue', 'light')\">\n                <img src=\"assets/layout/images/themes/saga-blue.png\" class=\"w-2rem h-2rem\" alt=\"Saga Blue\">\n            </button>\n        </div>\n        <div class=\"col-3\">\n            <button class=\"p-link w-2rem h-2rem\" (click)=\"changeTheme('saga-green', 'light')\">\n                <img src=\"assets/layout/images/themes/saga-green.png\" class=\"w-2rem h-2rem\" alt=\"Saga Green\">\n            </button>\n        </div>\n        <div class=\"col-3\">\n            <button class=\"p-link w-2rem h-2rem\" (click)=\"changeTheme('saga-orange', 'light')\">\n                <img src=\"assets/layout/images/themes/saga-orange.png\" class=\"w-2rem h-2rem\" alt=\"Saga Orange\">\n            </button>\n        </div>\n        <div class=\"col-3\">\n            <button class=\"p-link w-2rem h-2rem\" (click)=\"changeTheme('saga-purple', 'light')\">\n                <img src=\"assets/layout/images/themes/saga-purple.png\" class=\"w-2rem h-2rem\" alt=\"Saga Purple\">\n            </button>\n        </div>\n        <div class=\"col-3\">\n            <button class=\"p-link w-2rem h-2rem\" (click)=\"changeTheme('vela-blue', 'dark')\">\n                <img src=\"assets/layout/images/themes/vela-blue.png\" class=\"w-2rem h-2rem\" alt=\"Vela Blue\">\n            </button>\n        </div>\n        <div class=\"col-3\">\n            <button class=\"p-link w-2rem h-2rem\" (click)=\"changeTheme('vela-green', 'dark')\">\n                <img src=\"assets/layout/images/themes/vela-green.png\" class=\"w-2rem h-2rem\" alt=\"Vela Green\">\n            </button>\n        </div>\n        <div class=\"col-3\">\n            <button class=\"p-link w-2rem h-2rem\" (click)=\"changeTheme('vela-orange', 'dark')\">\n                <img src=\"assets/layout/images/themes/vela-orange.png\" class=\"w-2rem h-2rem\" alt=\"Vela Orange\">\n            </button>\n        </div>\n        <div class=\"col-3\">\n            <button class=\"p-link w-2rem h-2rem\" (click)=\"changeTheme('vela-purple', 'dark')\">\n                <img src=\"assets/layout/images/themes/vela-purple.png\" class=\"w-2rem h-2rem\" alt=\"Vela Purple\">\n            </button>\n        </div>\n        <div class=\"col-3\">\n            <button class=\"p-link w-2rem h-2rem\" (click)=\"changeTheme('arya-blue', 'dark')\">\n                <img src=\"assets/layout/images/themes/arya-blue.png\" class=\"w-2rem h-2rem\" alt=\"Arya Blue\">\n            </button>\n        </div>\n        <div class=\"col-3\">\n            <button class=\"p-link w-2rem h-2rem\" (click)=\"changeTheme('arya-green', 'dark')\">\n                <img src=\"assets/layout/images/themes/arya-green.png\" class=\"w-2rem h-2rem\" alt=\"Arya Green\">\n            </button>\n        </div>\n        <div class=\"col-3\">\n            <button class=\"p-link w-2rem h-2rem\" (click)=\"changeTheme('arya-orange', 'dark')\">\n                <img src=\"assets/layout/images/themes/arya-orange.png\" class=\"w-2rem h-2rem\" alt=\"Arya Orange\">\n            </button>\n        </div>\n        <div class=\"col-3\">\n            <button class=\"p-link w-2rem h-2rem\" (click)=\"changeTheme('arya-purple', 'dark')\">\n                <img src=\"assets/layout/images/themes/arya-purple.png\" class=\"w-2rem h-2rem\" alt=\"Arya Purple\">\n            </button>\n        </div>\n    </div>\n</p-sidebar>\n";

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendor"], () => (__webpack_exec__(6344), __webpack_exec__(4431)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=main.js.map