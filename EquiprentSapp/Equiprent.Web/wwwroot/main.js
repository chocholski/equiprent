"use strict";
(self["webpackChunkEquiprentCapp"] = self["webpackChunkEquiprentCapp"] || []).push([["main"],{

/***/ 2061:
/*!*******************************!*\
  !*** ./src/app/api-routes.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ApiRoutes": () => (/* binding */ ApiRoutes)
/* harmony export */ });
/* harmony import */ var _tools_png_table_search_query_builder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tools/png-table-search-query-builder */ 3061);

const ApiRoutes = {
  audit: {
    getObjectHistory: (event, columns, entityId, entityTableName) => `audit${new _tools_png_table_search_query_builder__WEBPACK_IMPORTED_MODULE_0__.PngTableSearchQueryBuilder(event, columns).create()}&entityId=${entityId}&entityTableName=${entityTableName}`,
    getFieldNames: "audit/getFieldNames"
  },
  client: {
    delete: clientId => `client/${clientId}`,
    getAll: (event, columns) => `client${new _tools_png_table_search_query_builder__WEBPACK_IMPORTED_MODULE_0__.PngTableSearchQueryBuilder(event, columns).create()}`,
    getById: clientId => `client/${clientId}`,
    post: "client",
    put: "client"
  },
  clientRepresentative: {
    delete: clientRepresentativeId => `client/representative/${clientRepresentativeId}`,
    getAll: (event, columns, clientId) => `client/representative${new _tools_png_table_search_query_builder__WEBPACK_IMPORTED_MODULE_0__.PngTableSearchQueryBuilder(event, columns).create()}&clientId=${clientId}`,
    getById: clientRepresentativeId => `client/representative/${clientRepresentativeId}`,
    post: "client/representative",
    put: "client/representative"
  },
  identity: {
    authenticate: "identity/authenticate",
    refreshToken: "identity/refreshToken"
  },
  selectOptions: {
    audits: (event, columns, entityId, entityTableName) => `audit/getFieldNames${new _tools_png_table_search_query_builder__WEBPACK_IMPORTED_MODULE_0__.PngTableSearchQueryBuilder(event, columns).create()}&entityId=${entityId}&entityTableName=${entityTableName}`,
    clientTypes: "selectoptions/clientTypes",
    countries: "selectoptions/countries",
    languages: "selectoptions/languages",
    userRoles: "selectoptions/userRoles",
    yesNoOptions: "selectoptions/yesNo"
  },
  user: {
    changeLanguage: "user/changeLanguage",
    changeRole: "user/changeRole",
    changeTheme: "user/changeTheme",
    delete: userId => `user/${userId}`,
    getAll: (event, columns) => `user${new _tools_png_table_search_query_builder__WEBPACK_IMPORTED_MODULE_0__.PngTableSearchQueryBuilder(event, columns).create()}`,
    getById: userId => `user/${userId}`,
    getLanguage: userId => `user/getLanguage/${userId}`,
    getTheme: userId => `user/getTheme/${userId}`,
    post: "user",
    put: "user"
  },
  userRole: {
    delete: userRoleId => `userRole/${userRoleId}`,
    getAll: (event, columns) => `userRole${new _tools_png_table_search_query_builder__WEBPACK_IMPORTED_MODULE_0__.PngTableSearchQueryBuilder(event, columns).create()}`,
    getById: userRoleId => `userRole/${userRoleId}`,
    getUserRolePermissionsForCreation: "userRole/getUserRolePermissionsForCreation",
    post: "userRole",
    put: "userRole"
  }
};

/***/ }),

/***/ 158:
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppRoutingModule": () => (/* binding */ AppRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! tslib */ 2321);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/router */ 124);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _layout_app_layout_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./layout/app.layout.component */ 3725);
/* harmony import */ var _components_users_user_list__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/users/user-list */ 4760);
/* harmony import */ var _components_user_roles_user_role_list__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/user-roles/user-role-list */ 4609);
/* harmony import */ var _components_login_login__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/login/login */ 8077);
/* harmony import */ var _services_auth_guard_auth_guard_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./services/auth-guard/auth-guard.service */ 3226);
/* harmony import */ var _enums_user_permission_enum__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./enums/user-permission-enum */ 8235);
/* harmony import */ var _components_users_user_details__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/users/user-details */ 8635);
/* harmony import */ var _components_users_user_create__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/users/user-create */ 9068);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/common */ 4666);
/* harmony import */ var _routes__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./routes */ 1311);
/* harmony import */ var _components_user_roles_user_role_create__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/user-roles/user-role-create */ 3746);
/* harmony import */ var _components_user_roles_user_role_details__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./components/user-roles/user-role-details */ 7424);
/* harmony import */ var _components_clients_client_list__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./components/clients/client-list */ 550);
/* harmony import */ var _components_clients_client_create__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./components/clients/client-create */ 4354);
/* harmony import */ var _components_clients_client_details__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./components/clients/client-details */ 1297);


















let AppRoutingModule = class AppRoutingModule {};
AppRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_14__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_15__.NgModule)({
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_16__.RouterModule.forRoot([{
    path: _routes__WEBPACK_IMPORTED_MODULE_8__.Routes.home.paths["default"],
    component: _layout_app_layout_component__WEBPACK_IMPORTED_MODULE_0__.AppLayoutComponent,
    data: {
      breadcrumb: _routes__WEBPACK_IMPORTED_MODULE_8__.Routes.home.breadcrumbs["default"]
    },
    children: [{
      path: _routes__WEBPACK_IMPORTED_MODULE_8__.Routes.clients.paths.list,
      canActivate: [_services_auth_guard_auth_guard_service__WEBPACK_IMPORTED_MODULE_4__.AuthGuard],
      data: {
        allowedPermissions: [_enums_user_permission_enum__WEBPACK_IMPORTED_MODULE_5__.UserPermissionEnum.Clients_CanList],
        breadcrumb: _routes__WEBPACK_IMPORTED_MODULE_8__.Routes.clients.breadcrumbs.list
      },
      children: [{
        path: '',
        component: _components_clients_client_list__WEBPACK_IMPORTED_MODULE_11__.ClientListComponent,
        canActivate: [_services_auth_guard_auth_guard_service__WEBPACK_IMPORTED_MODULE_4__.AuthGuard],
        data: {
          allowedPermissions: [_enums_user_permission_enum__WEBPACK_IMPORTED_MODULE_5__.UserPermissionEnum.Clients_CanList],
          breadcrumb: null
        }
      }, {
        path: _routes__WEBPACK_IMPORTED_MODULE_8__.Routes.clients.paths.create,
        component: _components_clients_client_create__WEBPACK_IMPORTED_MODULE_12__.ClientCreationComponent,
        canActivate: [_services_auth_guard_auth_guard_service__WEBPACK_IMPORTED_MODULE_4__.AuthGuard],
        data: {
          allowedPermissions: [_enums_user_permission_enum__WEBPACK_IMPORTED_MODULE_5__.UserPermissionEnum.Clients_CanModify],
          breadcrumb: _routes__WEBPACK_IMPORTED_MODULE_8__.Routes.clients.breadcrumbs.creation
        }
      }, {
        path: _routes__WEBPACK_IMPORTED_MODULE_8__.Routes.clients.paths.edit,
        component: _components_clients_client_details__WEBPACK_IMPORTED_MODULE_13__.ClientDetailsComponent,
        canActivate: [_services_auth_guard_auth_guard_service__WEBPACK_IMPORTED_MODULE_4__.AuthGuard],
        data: {
          allowedPermissions: [_enums_user_permission_enum__WEBPACK_IMPORTED_MODULE_5__.UserPermissionEnum.Clients_CanModify],
          breadcrumb: _routes__WEBPACK_IMPORTED_MODULE_8__.Routes.clients.breadcrumbs.edition
        }
      }]
    }, {
      path: _routes__WEBPACK_IMPORTED_MODULE_8__.Routes.users.paths.list,
      canActivate: [_services_auth_guard_auth_guard_service__WEBPACK_IMPORTED_MODULE_4__.AuthGuard],
      data: {
        allowedPermissions: [_enums_user_permission_enum__WEBPACK_IMPORTED_MODULE_5__.UserPermissionEnum.Users_CanList],
        breadcrumb: _routes__WEBPACK_IMPORTED_MODULE_8__.Routes.users.breadcrumbs.list
      },
      children: [{
        path: '',
        component: _components_users_user_list__WEBPACK_IMPORTED_MODULE_1__.UserListComponent,
        canActivate: [_services_auth_guard_auth_guard_service__WEBPACK_IMPORTED_MODULE_4__.AuthGuard],
        data: {
          allowedPermissions: [_enums_user_permission_enum__WEBPACK_IMPORTED_MODULE_5__.UserPermissionEnum.Users_CanList],
          breadcrumb: null
        }
      }, {
        path: _routes__WEBPACK_IMPORTED_MODULE_8__.Routes.users.paths.create,
        component: _components_users_user_create__WEBPACK_IMPORTED_MODULE_7__.UserCreationComponent,
        canActivate: [_services_auth_guard_auth_guard_service__WEBPACK_IMPORTED_MODULE_4__.AuthGuard],
        data: {
          allowedPermissions: [_enums_user_permission_enum__WEBPACK_IMPORTED_MODULE_5__.UserPermissionEnum.Users_CanModify],
          breadcrumb: _routes__WEBPACK_IMPORTED_MODULE_8__.Routes.users.breadcrumbs.creation
        }
      }, {
        path: _routes__WEBPACK_IMPORTED_MODULE_8__.Routes.users.paths.edit,
        component: _components_users_user_details__WEBPACK_IMPORTED_MODULE_6__.UserDetailsComponent,
        canActivate: [_services_auth_guard_auth_guard_service__WEBPACK_IMPORTED_MODULE_4__.AuthGuard],
        data: {
          allowedPermissions: [_enums_user_permission_enum__WEBPACK_IMPORTED_MODULE_5__.UserPermissionEnum.Users_CanList],
          breadcrumb: _routes__WEBPACK_IMPORTED_MODULE_8__.Routes.users.breadcrumbs.edition
        }
      }]
    }, {
      path: _routes__WEBPACK_IMPORTED_MODULE_8__.Routes.userRoles.paths.list,
      canActivate: [_services_auth_guard_auth_guard_service__WEBPACK_IMPORTED_MODULE_4__.AuthGuard],
      data: {
        allowedPermissions: [_enums_user_permission_enum__WEBPACK_IMPORTED_MODULE_5__.UserPermissionEnum.UserRoles_CanList],
        breadcrumb: _routes__WEBPACK_IMPORTED_MODULE_8__.Routes.userRoles.breadcrumbs.list
      },
      children: [{
        path: '',
        component: _components_user_roles_user_role_list__WEBPACK_IMPORTED_MODULE_2__.UserRoleListComponent,
        canActivate: [_services_auth_guard_auth_guard_service__WEBPACK_IMPORTED_MODULE_4__.AuthGuard],
        data: {
          allowedPermissions: [_enums_user_permission_enum__WEBPACK_IMPORTED_MODULE_5__.UserPermissionEnum.UserRoles_CanList],
          breadcrumb: null
        }
      }, {
        path: _routes__WEBPACK_IMPORTED_MODULE_8__.Routes.userRoles.paths.create,
        component: _components_user_roles_user_role_create__WEBPACK_IMPORTED_MODULE_9__.UserRoleCreationComponent,
        canActivate: [_services_auth_guard_auth_guard_service__WEBPACK_IMPORTED_MODULE_4__.AuthGuard],
        data: {
          allowedPermissions: [_enums_user_permission_enum__WEBPACK_IMPORTED_MODULE_5__.UserPermissionEnum.UserRoles_CanModify],
          breadcrumb: _routes__WEBPACK_IMPORTED_MODULE_8__.Routes.userRoles.breadcrumbs.creation
        }
      }, {
        path: _routes__WEBPACK_IMPORTED_MODULE_8__.Routes.userRoles.paths.edit,
        component: _components_user_roles_user_role_details__WEBPACK_IMPORTED_MODULE_10__.UserRoleDetailsComponent,
        canActivate: [_services_auth_guard_auth_guard_service__WEBPACK_IMPORTED_MODULE_4__.AuthGuard],
        data: {
          allowedPermissions: [_enums_user_permission_enum__WEBPACK_IMPORTED_MODULE_5__.UserPermissionEnum.UserRoles_CanList],
          breadcrumb: _routes__WEBPACK_IMPORTED_MODULE_8__.Routes.userRoles.breadcrumbs.edition
        }
      }]
    }]
  }, {
    path: _routes__WEBPACK_IMPORTED_MODULE_8__.Routes.login.paths["default"],
    component: _components_login_login__WEBPACK_IMPORTED_MODULE_3__.LoginComponent,
    data: {
      breadcrumb: null
    }
  }, {
    path: '**',
    redirectTo: _routes__WEBPACK_IMPORTED_MODULE_8__.Routes.home.paths["default"]
  }, {
    path: '',
    redirectTo: _routes__WEBPACK_IMPORTED_MODULE_8__.Routes.home.paths["default"],
    pathMatch: 'full'
  }], {
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled',
    onSameUrlNavigation: 'reload',
    useHash: false
  })],
  providers: [{
    provide: _angular_common__WEBPACK_IMPORTED_MODULE_17__.LocationStrategy,
    useClass: _angular_common__WEBPACK_IMPORTED_MODULE_17__.PathLocationStrategy
  }],
  exports: [_angular_router__WEBPACK_IMPORTED_MODULE_16__.RouterModule]
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
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! tslib */ 2321);
/* harmony import */ var _app_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app.component.html?ngResource */ 3383);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/platform-browser */ 4497);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ngx-translate/core */ 8699);
/* harmony import */ var primeng_api__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! primeng/api */ 4356);
/* harmony import */ var _services_authentication_authentication_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./services/authentication/authentication.service */ 7020);
/* harmony import */ var _services_authorization_authorization_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./services/authorization/authorization.service */ 6079);








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
  type: _services_authentication_authentication_service__WEBPACK_IMPORTED_MODULE_1__.AuthenticationService
}, {
  type: _services_authorization_authorization_service__WEBPACK_IMPORTED_MODULE_2__.AuthorizationService
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
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! tslib */ 2321);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! @angular/common */ 4666);
/* harmony import */ var _angular_common_locales_pl__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! @angular/common/locales/pl */ 1499);
/* harmony import */ var ngx_mask__WEBPACK_IMPORTED_MODULE_45__ = __webpack_require__(/*! ngx-mask */ 446);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_46__ = __webpack_require__(/*! @ngx-translate/core */ 8699);
/* harmony import */ var _ngx_translate_http_loader__WEBPACK_IMPORTED_MODULE_64__ = __webpack_require__(/*! @ngx-translate/http-loader */ 8319);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(/*! @angular/common/http */ 8987);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! @angular/platform-browser */ 4497);
/* harmony import */ var _auth0_angular_jwt__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__(/*! @auth0/angular-jwt */ 4467);
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app.component */ 5041);
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app-routing.module */ 158);
/* harmony import */ var _layout_app_layout_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./layout/app.layout.module */ 6421);
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/environments/environment */ 2340);
/* harmony import */ var _services_layout_menu_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./services/layout/menu.service */ 6308);
/* harmony import */ var _services_authorization_authorization_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./services/authorization/authorization.service */ 6079);
/* harmony import */ var _services_authentication_authentication_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./services/authentication/authentication.service */ 7020);
/* harmony import */ var _services_interceptors_auth_interceptor__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./services/interceptors/auth-interceptor */ 8617);
/* harmony import */ var _services_auth_guard_auth_guard_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./services/auth-guard/auth-guard.service */ 3226);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var _services_messages_console_message_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./services/messages/console-message.service */ 5289);
/* harmony import */ var _services_messages_dialog_message_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./services/messages/dialog-message.service */ 1323);
/* harmony import */ var _services_errors_error_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./services/errors/error.service */ 8813);
/* harmony import */ var _services_filters_filter_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./services/filters/filter.service */ 9865);
/* harmony import */ var _services_select_options_select_options_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./services/select-options/select-options.service */ 712);
/* harmony import */ var _components_addresses_address__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./components/addresses/address */ 8309);
/* harmony import */ var _components_audits_audit_list_for_entity__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./components/audits/audit-list-for-entity */ 3416);
/* harmony import */ var _components_clients_client_create__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./components/clients/client-create */ 4354);
/* harmony import */ var _components_clients_client_details__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./components/clients/client-details */ 1297);
/* harmony import */ var _components_clients_client_list__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./components/clients/client-list */ 550);
/* harmony import */ var _components_representatives_client_representative_create__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./components/representatives/client-representative-create */ 6487);
/* harmony import */ var _components_representatives_client_representative_details__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./components/representatives/client-representative-details */ 3291);
/* harmony import */ var _components_representatives_client_representative_list__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./components/representatives/client-representative-list */ 9431);
/* harmony import */ var _components_addresses_company_client_address__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./components/addresses/company-client-address */ 3320);
/* harmony import */ var _components_dialogs_deletion_dialog__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./components/dialogs/deletion-dialog */ 2167);
/* harmony import */ var _components_login_login__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./components/login/login */ 8077);
/* harmony import */ var _components_login_login_reset_password__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./components/login/login-reset-password */ 9598);
/* harmony import */ var _components_name_in_languages_name_in_languages__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./components/name-in-languages/name-in-languages */ 3679);
/* harmony import */ var _components_addresses_private_client_address__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./components/addresses/private-client-address */ 4549);
/* harmony import */ var _components_clients_private_client__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./components/clients/private-client */ 3821);
/* harmony import */ var _components_users_user_create__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./components/users/user-create */ 9068);
/* harmony import */ var _components_users_user_details__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./components/users/user-details */ 8635);
/* harmony import */ var _components_users_user_list__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./components/users/user-list */ 4760);
/* harmony import */ var _components_user_roles_user_role_create__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./components/user-roles/user-role-create */ 3746);
/* harmony import */ var _components_user_roles_user_role_details__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./components/user-roles/user-role-details */ 7424);
/* harmony import */ var _components_user_roles_user_role_list__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./components/user-roles/user-role-list */ 4609);
/* harmony import */ var _components_user_roles_user_role_permissions__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ./components/user-roles/user-role-permissions */ 2650);
/* harmony import */ var _services_interceptors_api_url_interceptor__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ./services/interceptors/api-url-interceptor */ 4133);
/* harmony import */ var primeng_breadcrumb__WEBPACK_IMPORTED_MODULE_47__ = __webpack_require__(/*! primeng/breadcrumb */ 7298);
/* harmony import */ var primeng_button__WEBPACK_IMPORTED_MODULE_48__ = __webpack_require__(/*! primeng/button */ 6328);
/* harmony import */ var primeng_checkbox__WEBPACK_IMPORTED_MODULE_49__ = __webpack_require__(/*! primeng/checkbox */ 749);
/* harmony import */ var primeng_confirmdialog__WEBPACK_IMPORTED_MODULE_50__ = __webpack_require__(/*! primeng/confirmdialog */ 97);
/* harmony import */ var primeng_api__WEBPACK_IMPORTED_MODULE_63__ = __webpack_require__(/*! primeng/api */ 4356);
/* harmony import */ var primeng_dynamicdialog__WEBPACK_IMPORTED_MODULE_52__ = __webpack_require__(/*! primeng/dynamicdialog */ 2648);
/* harmony import */ var primeng_dropdown__WEBPACK_IMPORTED_MODULE_51__ = __webpack_require__(/*! primeng/dropdown */ 8992);
/* harmony import */ var primeng_message__WEBPACK_IMPORTED_MODULE_53__ = __webpack_require__(/*! primeng/message */ 3589);
/* harmony import */ var primeng_messages__WEBPACK_IMPORTED_MODULE_54__ = __webpack_require__(/*! primeng/messages */ 8547);
/* harmony import */ var primeng_multiselect__WEBPACK_IMPORTED_MODULE_55__ = __webpack_require__(/*! primeng/multiselect */ 850);
/* harmony import */ var primeng_panelmenu__WEBPACK_IMPORTED_MODULE_56__ = __webpack_require__(/*! primeng/panelmenu */ 9028);
/* harmony import */ var primeng_password__WEBPACK_IMPORTED_MODULE_57__ = __webpack_require__(/*! primeng/password */ 8848);
/* harmony import */ var primeng_splitbutton__WEBPACK_IMPORTED_MODULE_58__ = __webpack_require__(/*! primeng/splitbutton */ 3650);
/* harmony import */ var primeng_table__WEBPACK_IMPORTED_MODULE_59__ = __webpack_require__(/*! primeng/table */ 7485);
/* harmony import */ var primeng_tabview__WEBPACK_IMPORTED_MODULE_60__ = __webpack_require__(/*! primeng/tabview */ 9504);
/* harmony import */ var primeng_toast__WEBPACK_IMPORTED_MODULE_61__ = __webpack_require__(/*! primeng/toast */ 9129);
/* harmony import */ var primeng_treetable__WEBPACK_IMPORTED_MODULE_62__ = __webpack_require__(/*! primeng/treetable */ 2385);

//Angular










//Application




//Services











//Components






















//PrimeNG




















(0,_angular_common__WEBPACK_IMPORTED_MODULE_37__.registerLocaleData)(_angular_common_locales_pl__WEBPACK_IMPORTED_MODULE_38__["default"], 'pl');
const options = {};
let AppModule = class AppModule {};
AppModule = (0,tslib__WEBPACK_IMPORTED_MODULE_39__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_40__.NgModule)({
  declarations: [
  //[start] app components
  _app_component__WEBPACK_IMPORTED_MODULE_0__.AppComponent,
  //[end] app components
  //[start] custom components
  _components_addresses_address__WEBPACK_IMPORTED_MODULE_14__.AddressComponent, _components_audits_audit_list_for_entity__WEBPACK_IMPORTED_MODULE_15__.AuditListForEntityComponent, _components_clients_client_create__WEBPACK_IMPORTED_MODULE_16__.ClientCreationComponent, _components_clients_client_details__WEBPACK_IMPORTED_MODULE_17__.ClientDetailsComponent, _components_clients_client_list__WEBPACK_IMPORTED_MODULE_18__.ClientListComponent, _components_representatives_client_representative_create__WEBPACK_IMPORTED_MODULE_19__.ClientRepresentativeCreationComponent, _components_representatives_client_representative_details__WEBPACK_IMPORTED_MODULE_20__.ClientRepresentativeDetailsComponent, _components_representatives_client_representative_list__WEBPACK_IMPORTED_MODULE_21__.ClientRepresentativeListComponent, _components_addresses_company_client_address__WEBPACK_IMPORTED_MODULE_22__.CompanyClientAddressComponent, _components_dialogs_deletion_dialog__WEBPACK_IMPORTED_MODULE_23__.DeletionDialogComponent, _components_login_login__WEBPACK_IMPORTED_MODULE_24__.LoginComponent, _components_login_login_reset_password__WEBPACK_IMPORTED_MODULE_25__.LoginResetPasswordComponent, _components_name_in_languages_name_in_languages__WEBPACK_IMPORTED_MODULE_26__.NameInLanguagesComponent, _components_addresses_private_client_address__WEBPACK_IMPORTED_MODULE_27__.PrivateClientAddressComponent, _components_clients_private_client__WEBPACK_IMPORTED_MODULE_28__.PrivateClientComponent, _components_users_user_create__WEBPACK_IMPORTED_MODULE_29__.UserCreationComponent, _components_users_user_details__WEBPACK_IMPORTED_MODULE_30__.UserDetailsComponent, _components_users_user_list__WEBPACK_IMPORTED_MODULE_31__.UserListComponent, _components_user_roles_user_role_create__WEBPACK_IMPORTED_MODULE_32__.UserRoleCreationComponent, _components_user_roles_user_role_details__WEBPACK_IMPORTED_MODULE_33__.UserRoleDetailsComponent, _components_user_roles_user_role_list__WEBPACK_IMPORTED_MODULE_34__.UserRoleListComponent, _components_user_roles_user_role_permissions__WEBPACK_IMPORTED_MODULE_35__.UserRolePermissionsComponent
  //[end] custom components
  ],

  imports: [
  //[start] app modules
  _layout_app_layout_module__WEBPACK_IMPORTED_MODULE_2__.AppLayoutModule, _app_routing_module__WEBPACK_IMPORTED_MODULE_1__.AppRoutingModule, _angular_platform_browser__WEBPACK_IMPORTED_MODULE_41__.BrowserModule, _angular_common__WEBPACK_IMPORTED_MODULE_37__.CommonModule, _angular_forms__WEBPACK_IMPORTED_MODULE_42__.FormsModule, _angular_common_http__WEBPACK_IMPORTED_MODULE_43__.HttpClientModule, _auth0_angular_jwt__WEBPACK_IMPORTED_MODULE_44__.JwtModule.forRoot({
    config: {
      tokenGetter: jwtTokenGetter
    }
  }), ngx_mask__WEBPACK_IMPORTED_MODULE_45__.NgxMaskModule.forRoot(options), _angular_forms__WEBPACK_IMPORTED_MODULE_42__.ReactiveFormsModule, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_46__.TranslateModule.forRoot({
    loader: {
      provide: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_46__.TranslateLoader,
      useFactory: HttpLoaderFactory,
      deps: [_angular_common_http__WEBPACK_IMPORTED_MODULE_43__.HttpClient]
    }
  }),
  //[end] app modules
  //[start] primeng Modules
  primeng_breadcrumb__WEBPACK_IMPORTED_MODULE_47__.BreadcrumbModule, primeng_button__WEBPACK_IMPORTED_MODULE_48__.ButtonModule, primeng_checkbox__WEBPACK_IMPORTED_MODULE_49__.CheckboxModule, primeng_confirmdialog__WEBPACK_IMPORTED_MODULE_50__.ConfirmDialogModule, primeng_dropdown__WEBPACK_IMPORTED_MODULE_51__.DropdownModule, primeng_dynamicdialog__WEBPACK_IMPORTED_MODULE_52__.DynamicDialogModule, primeng_message__WEBPACK_IMPORTED_MODULE_53__.MessageModule, primeng_messages__WEBPACK_IMPORTED_MODULE_54__.MessagesModule, primeng_multiselect__WEBPACK_IMPORTED_MODULE_55__.MultiSelectModule, primeng_panelmenu__WEBPACK_IMPORTED_MODULE_56__.PanelMenuModule, primeng_password__WEBPACK_IMPORTED_MODULE_57__.PasswordModule, primeng_splitbutton__WEBPACK_IMPORTED_MODULE_58__.SplitButtonModule, primeng_table__WEBPACK_IMPORTED_MODULE_59__.TableModule, primeng_tabview__WEBPACK_IMPORTED_MODULE_60__.TabViewModule, primeng_toast__WEBPACK_IMPORTED_MODULE_61__.ToastModule, primeng_treetable__WEBPACK_IMPORTED_MODULE_62__.TreeTableModule
  //[end] primeng Modules
  ],

  providers: [
  //[start] app services
  {
    provide: _angular_common__WEBPACK_IMPORTED_MODULE_37__.LocationStrategy,
    useClass: _angular_common__WEBPACK_IMPORTED_MODULE_37__.PathLocationStrategy
  }, {
    provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_43__.HTTP_INTERCEPTORS,
    useClass: _services_interceptors_auth_interceptor__WEBPACK_IMPORTED_MODULE_7__.AuthInterceptor,
    multi: true
  }, {
    provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_43__.HTTP_INTERCEPTORS,
    useClass: _services_interceptors_api_url_interceptor__WEBPACK_IMPORTED_MODULE_36__.ApiUrlInterceptor,
    multi: true
  }, _services_authentication_authentication_service__WEBPACK_IMPORTED_MODULE_6__.AuthenticationService, _services_auth_guard_auth_guard_service__WEBPACK_IMPORTED_MODULE_8__.AuthGuard, _services_authorization_authorization_service__WEBPACK_IMPORTED_MODULE_5__.AuthorizationService, primeng_api__WEBPACK_IMPORTED_MODULE_63__.ConfirmationService, _services_messages_console_message_service__WEBPACK_IMPORTED_MODULE_9__.ConsoleMessageService, _services_messages_dialog_message_service__WEBPACK_IMPORTED_MODULE_10__.DialogMessageService, primeng_dynamicdialog__WEBPACK_IMPORTED_MODULE_52__.DialogService, _services_errors_error_service__WEBPACK_IMPORTED_MODULE_11__.ErrorService, _services_filters_filter_service__WEBPACK_IMPORTED_MODULE_12__.FilterService, primeng_api__WEBPACK_IMPORTED_MODULE_63__.MessageService, _services_layout_menu_service__WEBPACK_IMPORTED_MODULE_4__.MenuService, _services_select_options_select_options_service__WEBPACK_IMPORTED_MODULE_13__.SelectOptionsService
  //[end] app services
  ],

  bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_0__.AppComponent]
})], AppModule);

function jwtTokenGetter() {
  return localStorage.getItem(src_environments_environment__WEBPACK_IMPORTED_MODULE_3__.environment.auth_key);
}
function HttpLoaderFactory(http) {
  return new _ngx_translate_http_loader__WEBPACK_IMPORTED_MODULE_64__.TranslateHttpLoader(http);
}

/***/ }),

/***/ 6378:
/*!***********************************************************************!*\
  !*** ./src/app/components/abstract/access-controls/access-control.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AccessControlComponent": () => (/* binding */ AccessControlComponent)
/* harmony export */ });
/* harmony import */ var src_app_tools_access_control__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/tools/access-control */ 997);
/* harmony import */ var src_app_enums_api_result_enum__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/enums/api-result-enum */ 6793);


class AccessControlComponent {
  constructor(authorizationService, confirmationService, consoleMessageService, deletionKey, deletionLinkInitializer, dialogMessageService, entityName, errorService, httpClient, onAfterDeletionSuccessOperationsHandler, router, translate, userPermissions) {
    this.authorizationService = authorizationService;
    this.confirmationService = confirmationService;
    this.consoleMessageService = consoleMessageService;
    this.deletionKey = deletionKey;
    this.deletionLinkInitializer = deletionLinkInitializer;
    this.dialogMessageService = dialogMessageService;
    this.entityName = entityName;
    this.errorService = errorService;
    this.httpClient = httpClient;
    this.onAfterDeletionSuccessOperationsHandler = onAfterDeletionSuccessOperationsHandler;
    this.router = router;
    this.translate = translate;
    this.userPermissions = userPermissions;
    this.onDeleteLabelId = 'General.Delete';
    this.accessControl = new src_app_tools_access_control__WEBPACK_IMPORTED_MODULE_0__.AccessControl(this.authorizationService, this.userPermissions);
  }
  get hasAccessToButtons() {
    return this.accessControl.hasAccessToButtons;
  }
  get onEditLabelId() {
    return this.accessControl.hasAccessToButtons ? 'General.Edit' : 'General.Details';
  }
  onDelete(entity) {
    this.confirmationService.confirm({
      key: this.deletionKey,
      message: `${this.translate.instant(this.entityName + '.DeletionConfirmation')} ${this.deletedEntityInstanceIdentificationInitializer(entity)}?`,
      accept: () => {
        this.deleteEntity(entity);
      }
    });
  }
  deleteEntity(entity) {
    this.httpClient.delete(this.deletionLinkInitializer(entity.Id)).subscribe({
      next: result => {
        var _a;
        if (result === src_app_enums_api_result_enum__WEBPACK_IMPORTED_MODULE_1__.ApiResultEnum[src_app_enums_api_result_enum__WEBPACK_IMPORTED_MODULE_1__.ApiResultEnum.OK]) {
          this.dialogMessageService.addSuccess(this.translate.instant(`${this.entityName}.Deleted`));
        } else {
          this.dialogMessageService.addError((_a = this.getErrorMessageForResult(result)) !== null && _a !== void 0 ? _a : this.errorService.getDefaultErrorMessage());
        }
        this.onAfterDeletionSuccessOperationsHandler();
        console.log(this.consoleMessageService.getConsoleMessageWithResultForEntityAfterDeletion(this.entityName, result));
      },
      error: error => {
        this.dialogMessageService.addError(this.errorService.getFirstTranslatedErrorMessage(error));
      }
    });
  }
  getErrorMessageForResult(result) {
    if (Object.keys(src_app_enums_api_result_enum__WEBPACK_IMPORTED_MODULE_1__.ApiResultEnum).includes(result)) {
      const apiErrorKey = src_app_enums_api_result_enum__WEBPACK_IMPORTED_MODULE_1__.ApiResultEnum[Number(this.getApiResultKeyByValue(result))].toString();
      return `${this.entityName}.Messages.${apiErrorKey}`;
    }
    return undefined;
  }
  getApiResultKeyByValue(value) {
    const keys = Object.keys(src_app_enums_api_result_enum__WEBPACK_IMPORTED_MODULE_1__.ApiResultEnum).filter(key => src_app_enums_api_result_enum__WEBPACK_IMPORTED_MODULE_1__.ApiResultEnum[key] === value);
    return keys.length > 0 ? keys[0] : undefined;
  }
}

/***/ }),

/***/ 6739:
/*!******************************************************************!*\
  !*** ./src/app/components/abstract/forms/access-control-form.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AccessControlFormComponent": () => (/* binding */ AccessControlFormComponent)
/* harmony export */ });
/* harmony import */ var src_app_tools_access_control__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/tools/access-control */ 997);
/* harmony import */ var _form__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./form */ 1151);
/* harmony import */ var src_app_enums_api_result_enum__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/enums/api-result-enum */ 6793);



class AccessControlFormComponent extends _form__WEBPACK_IMPORTED_MODULE_1__.FormComponent {
  constructor(activatedRoute, authorizationService, confirmationService, consoleMessageService, deletionKey, deletionLinkInitializer, dialogMessageService, entityName, errorService, formBuilder, httpClient, mode, router, submitionLink, translate, userPermissions, afterSubmitionNavigationLink) {
    super(consoleMessageService, dialogMessageService, entityName, errorService, formBuilder, httpClient, mode, router, submitionLink, translate);
    this.activatedRoute = activatedRoute;
    this.authorizationService = authorizationService;
    this.confirmationService = confirmationService;
    this.consoleMessageService = consoleMessageService;
    this.deletionKey = deletionKey;
    this.deletionLinkInitializer = deletionLinkInitializer;
    this.dialogMessageService = dialogMessageService;
    this.entityName = entityName;
    this.errorService = errorService;
    this.formBuilder = formBuilder;
    this.httpClient = httpClient;
    this.mode = mode;
    this.router = router;
    this.submitionLink = submitionLink;
    this.translate = translate;
    this.userPermissions = userPermissions;
    this.afterSubmitionNavigationLink = afterSubmitionNavigationLink;
    this.accessControl = new src_app_tools_access_control__WEBPACK_IMPORTED_MODULE_0__.AccessControl(this.authorizationService, this.userPermissions);
    this.entityId = this.activatedRoute.snapshot.params["id"];
    this.deletionLink = deletionLinkInitializer(this.entityId);
    this.isDisabled = true;
  }
  get hasAccessToButtons() {
    return this.accessControl.hasAccessToButtons;
  }
  onDelete() {
    this.confirmationService.confirm({
      key: this.deletionKey,
      message: `${this.translate.instant(this.entityName + '.DeletionConfirmation')} ${this.deletedEntityInstanceIdentificationInitializer()}?`,
      accept: () => {
        this.isExecuting = true;
        this.deleteEntity();
      }
    });
  }
  updateForm(obj) {
    super.updateForm(obj);
    this.setAccess();
    if (!this.form.disabled) {
      this.formValidator.updateAllControlsToTouched();
    }
  }
  deleteEntity() {
    this.httpClient.delete(this.deletionLink).subscribe({
      next: result => {
        var _a;
        if (result === src_app_enums_api_result_enum__WEBPACK_IMPORTED_MODULE_2__.ApiResultEnum[src_app_enums_api_result_enum__WEBPACK_IMPORTED_MODULE_2__.ApiResultEnum.OK]) {
          this.dialogMessageService.addSuccess(this.translate.instant(`${this.entityName}.Deleted`));
          if (!this.onAfterDeletionSuccessNavigateUsingLinkHandler) {
            this.router.navigate([this.afterSubmitionNavigationLink]);
          } else {
            this.onAfterDeletionSuccessNavigateUsingLinkHandler();
          }
        } else {
          this.dialogMessageService.addError((_a = this.getErrorMessageForResult(result)) !== null && _a !== void 0 ? _a : this.errorService.getDefaultErrorMessage());
        }
        console.log(this.consoleMessageService.getConsoleMessageWithResultForEntityAfterDeletion(this.entityName, result));
        this.isExecuting = false;
      },
      error: error => {
        this.dialogMessageService.addError(this.errorService.getFirstTranslatedErrorMessage(error));
        this.isExecuting = false;
      }
    });
  }
  setAccess() {
    if (this.hasAccessToButtons) {
      this.form.enable();
    } else {
      this.form.disable();
    }
    this.isDisabled = !this.hasAccessToButtons;
  }
}

/***/ }),

/***/ 4562:
/*!*************************************************************************************!*\
  !*** ./src/app/components/abstract/forms/access-control-openable-as-dialog-form.ts ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AccessControlOpenableAsDialogForm": () => (/* binding */ AccessControlOpenableAsDialogForm)
/* harmony export */ });
/* harmony import */ var _access_control_form__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./access-control-form */ 6739);

class AccessControlOpenableAsDialogForm extends _access_control_form__WEBPACK_IMPORTED_MODULE_0__.AccessControlFormComponent {
  constructor(activatedRoute, authorizationService, confirmationService, consoleMessageService, deletionKey, deletionLinkInitializer, dialogMessageService, entityName, errorService, formBuilder, httpClient, mode, openedAsDialogConfig, openedAsDialogRef, router, submitionLink, translate, userPermissions, afterSubmitionNavigationLink) {
    super(activatedRoute, authorizationService, confirmationService, consoleMessageService, deletionKey, deletionLinkInitializer, dialogMessageService, entityName, errorService, formBuilder, httpClient, mode, router, submitionLink, translate, userPermissions, afterSubmitionNavigationLink);
    this.activatedRoute = activatedRoute;
    this.authorizationService = authorizationService;
    this.confirmationService = confirmationService;
    this.consoleMessageService = consoleMessageService;
    this.deletionKey = deletionKey;
    this.deletionLinkInitializer = deletionLinkInitializer;
    this.dialogMessageService = dialogMessageService;
    this.entityName = entityName;
    this.errorService = errorService;
    this.formBuilder = formBuilder;
    this.httpClient = httpClient;
    this.mode = mode;
    this.openedAsDialogConfig = openedAsDialogConfig;
    this.openedAsDialogRef = openedAsDialogRef;
    this.router = router;
    this.submitionLink = submitionLink;
    this.translate = translate;
    this.userPermissions = userPermissions;
    this.afterSubmitionNavigationLink = afterSubmitionNavigationLink;
    this.onAfterDeletionSuccessNavigateUsingLinkHandler = this.onAfterDeletionSuccessNavigateUsingLink;
    this.onAfterSubmitionSuccessNavigateUsingLinkHandler = this.onAfterSubmitSuccessNavigateUsingLink;
    this.onBackNavigateUsingLinkHandler = this.onBackNavigateUsingLink;
    this._dialogConfigData = this.getOpenedAsDialogData(openedAsDialogConfig === null || openedAsDialogConfig === void 0 ? void 0 : openedAsDialogConfig.data);
    this.entityId = this.getEntityId();
  }
  onBack() {
    this.onBackNavigateUsingLink();
  }
  onAfterDeletionSuccessNavigateUsingLink() {
    if (this.openedAsDialogRef) {
      this.openedAsDialogRef.close();
    } else {
      this.router.navigate([this.afterSubmitionNavigationLink]);
    }
  }
  onAfterSubmitSuccessNavigateUsingLink() {
    if (this.openedAsDialogRef) {
      this.openedAsDialogRef.close();
    } else {
      this.router.navigate([this.afterSubmitionNavigationLink]);
    }
  }
  onBackNavigateUsingLink() {
    if (this.openedAsDialogRef) {
      this.openedAsDialogRef.close();
    } else {
      this.router.navigate([this.afterSubmitionNavigationLink]);
    }
  }
  getEntityId() {
    var _a;
    if (this.openedAsDialogRef) {
      return (_a = this._dialogConfigData) === null || _a === void 0 ? void 0 : _a.Id;
    } else {
      return this.activatedRoute.snapshot.params["id"];
    }
  }
  getOpenedAsDialogData(data) {
    return this.isOfTypeT(data) ? data : undefined;
  }
  isOfTypeT(value) {
    return typeof value === 'object' && value !== null;
  }
}

/***/ }),

/***/ 7602:
/*!***********************************************************************!*\
  !*** ./src/app/components/abstract/forms/dynamic-requirement-form.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DynamicRequirementFormComponent": () => (/* binding */ DynamicRequirementFormComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 2321);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _simple_form__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./simple-form */ 328);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ 2508);




let DynamicRequirementFormComponent = class DynamicRequirementFormComponent extends _simple_form__WEBPACK_IMPORTED_MODULE_0__.SimpleFormComponent {
  constructor(formBuilder) {
    super(formBuilder);
    this.formBuilder = formBuilder;
    this.requiredFields = [];
  }
  updateFormAfterInit() {
    this.requiredFields.forEach(fieldName => {
      const requiredField = this.form.get(fieldName);
      if (requiredField) {
        requiredField.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_1__.Validators.required]);
      }
    });
  }
};
DynamicRequirementFormComponent.ctorParameters = () => [{
  type: _angular_forms__WEBPACK_IMPORTED_MODULE_1__.FormBuilder
}];
DynamicRequirementFormComponent.propDecorators = {
  requiredFields: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_2__.Input,
    args: ['requiredFields']
  }]
};
DynamicRequirementFormComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.Directive)({
  selector: "dynamic-requirement-form"
})], DynamicRequirementFormComponent);


/***/ }),

/***/ 3939:
/*!*******************************************************************************************!*\
  !*** ./src/app/components/abstract/forms/form-factories/form-submition-action-factory.ts ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FormSubmitionActionFactory": () => (/* binding */ FormSubmitionActionFactory)
/* harmony export */ });
/* harmony import */ var src_app_enums_form_mode_enum__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/enums/form-mode-enum */ 7673);
/* harmony import */ var _post_action__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./post-action */ 6219);
/* harmony import */ var _put_action__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./put-action */ 1465);



class FormSubmitionActionFactory {
  constructor(consoleMessageService, httpClient) {
    this.consoleMessageService = consoleMessageService;
    this.httpClient = httpClient;
  }
  getFormSubmitionAction(mode) {
    switch (mode) {
      case src_app_enums_form_mode_enum__WEBPACK_IMPORTED_MODULE_0__.FormModeEnum.Creation:
        return new _post_action__WEBPACK_IMPORTED_MODULE_1__.PostAction(this.consoleMessageService, this.httpClient);
      case src_app_enums_form_mode_enum__WEBPACK_IMPORTED_MODULE_0__.FormModeEnum.Edition:
        return new _put_action__WEBPACK_IMPORTED_MODULE_2__.PutAction(this.consoleMessageService, this.httpClient);
      default:
        return undefined;
    }
  }
}

/***/ }),

/***/ 6219:
/*!*************************************************************************!*\
  !*** ./src/app/components/abstract/forms/form-factories/post-action.ts ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PostAction": () => (/* binding */ PostAction)
/* harmony export */ });
class PostAction {
  constructor(consoleMessageService, httpClient) {
    this.consoleMessageService = consoleMessageService;
    this.httpClient = httpClient;
    this.getConsoleMessage = (entity, result) => {
      return this.consoleMessageService.getConsoleMessageWithResultForEntityAfterCreation(entity, result);
    };
    this.successMessageTag = 'Created';
  }
  execute(formComponent) {
    const entity = formComponent.beforeSubmitionCustomOperationsHandler();
    return this.httpClient.post(formComponent.submitionLink, entity);
  }
}

/***/ }),

/***/ 1465:
/*!************************************************************************!*\
  !*** ./src/app/components/abstract/forms/form-factories/put-action.ts ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PutAction": () => (/* binding */ PutAction)
/* harmony export */ });
class PutAction {
  constructor(consoleMessageService, httpClient) {
    this.consoleMessageService = consoleMessageService;
    this.httpClient = httpClient;
    this.getConsoleMessage = (entity, result) => {
      return this.consoleMessageService.getConsoleMessageWithResultForEntityAfterUpdate(entity, result);
    };
    this.successMessageTag = 'Updated';
  }
  execute(formComponent) {
    const entity = formComponent.beforeSubmitionCustomOperationsHandler();
    return this.httpClient.put(formComponent.submitionLink, entity);
  }
}

/***/ }),

/***/ 1151:
/*!***************************************************!*\
  !*** ./src/app/components/abstract/forms/form.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FormComponent": () => (/* binding */ FormComponent)
/* harmony export */ });
/* harmony import */ var src_app_enums_form_mode_enum__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/enums/form-mode-enum */ 7673);
/* harmony import */ var src_app_ui_controls_form_validator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/ui-controls/form-validator */ 308);
/* harmony import */ var _form_factories_form_submition_action_factory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./form-factories/form-submition-action-factory */ 3939);
/* harmony import */ var src_app_enums_api_result_enum__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/enums/api-result-enum */ 6793);




class FormComponent {
  constructor(consoleMessageService, dialogMessageService, entityName, errorService, formBuilder, httpClient, mode, router, submitionLink, translate, afterSubmitionNavigationLink) {
    this.consoleMessageService = consoleMessageService;
    this.dialogMessageService = dialogMessageService;
    this.entityName = entityName;
    this.errorService = errorService;
    this.formBuilder = formBuilder;
    this.httpClient = httpClient;
    this.mode = mode;
    this.router = router;
    this.submitionLink = submitionLink;
    this.translate = translate;
    this.afterSubmitionNavigationLink = afterSubmitionNavigationLink;
    this.formMode = src_app_enums_form_mode_enum__WEBPACK_IMPORTED_MODULE_0__.FormModeEnum;
    this.isDisabled = false;
    this.isExecuting = false;
  }
  get shouldActionsBeDisabled() {
    return this.form.invalid || this.isDisabled || this.isExecuting;
  }
  get formValidator() {
    return this._formValidator;
  }
  set formValidator(validator) {
    this._formValidator = validator;
  }
  createForm(formFieldGroup) {
    this.form = this.formBuilder.group(formFieldGroup !== null && formFieldGroup !== void 0 ? formFieldGroup : {});
    this.formValidator = new src_app_ui_controls_form_validator__WEBPACK_IMPORTED_MODULE_1__.FormValidator(this.form);
  }
  onSubmit() {
    this.isExecuting = true;
    const onSubmitAction = new _form_factories_form_submition_action_factory__WEBPACK_IMPORTED_MODULE_2__.FormSubmitionActionFactory(this.consoleMessageService, this.httpClient).getFormSubmitionAction(this.mode);
    if (!onSubmitAction) return;
    onSubmitAction.execute(this).subscribe({
      next: result => {
        var _a;
        if (result === src_app_enums_api_result_enum__WEBPACK_IMPORTED_MODULE_3__.ApiResultEnum[src_app_enums_api_result_enum__WEBPACK_IMPORTED_MODULE_3__.ApiResultEnum.OK]) {
          if (!this.onAfterSubmitionSuccessNavigateUsingLinkHandler) {
            this.router.navigate([this.afterSubmitionNavigationLink]);
          } else {
            this.onAfterSubmitionSuccessNavigateUsingLinkHandler(this.afterSubmitionNavigationLink);
          }
          this.dialogMessageService.addSuccess(this.translate.instant(`${this.entityName}.${onSubmitAction.successMessageTag}`));
        } else {
          this.dialogMessageService.addError((_a = this.getErrorMessageForResult(result)) !== null && _a !== void 0 ? _a : this.errorService.getDefaultErrorMessage());
        }
        console.log(onSubmitAction.getConsoleMessage(this.entityName, result));
        if (this.afterSubmitionCustomOperationsHandler) {
          this.afterSubmitionCustomOperationsHandler();
        }
        this.isExecuting = false;
      },
      error: error => {
        const firstTranslatedErrorMessage = this.errorService.getFirstTranslatedErrorMessage(error);
        if (firstTranslatedErrorMessage !== this.errorService.getDefaultErrorMessage()) {
          this.dialogMessageService.addError(this.errorService.getFirstTranslatedErrorMessage(error));
        } else {
          const requestValidationByDatabaseErrorMessage = this.getErrorMessageForResult(this.errorService.getFirstErrorMessageKey(error));
          this.dialogMessageService.addError(requestValidationByDatabaseErrorMessage ? this.translate.instant(requestValidationByDatabaseErrorMessage) : firstTranslatedErrorMessage);
        }
        this.isExecuting = false;
      }
    });
  }
  updateForm(obj) {
    if (obj) {
      this.form.patchValue(obj);
    }
  }
  getErrorMessageForResult(result) {
    if (Object.keys(src_app_enums_api_result_enum__WEBPACK_IMPORTED_MODULE_3__.ApiResultEnum).includes(result)) {
      const apiErrorKey = src_app_enums_api_result_enum__WEBPACK_IMPORTED_MODULE_3__.ApiResultEnum[Number(this.getApiResultKeyByValue(result))].toString();
      return `${this.entityName}.Messages.${apiErrorKey}`;
    }
    return undefined;
  }
  getApiResultKeyByValue(value) {
    const keys = Object.keys(src_app_enums_api_result_enum__WEBPACK_IMPORTED_MODULE_3__.ApiResultEnum).filter(key => src_app_enums_api_result_enum__WEBPACK_IMPORTED_MODULE_3__.ApiResultEnum[key] === value);
    return keys.length > 0 ? keys[0] : undefined;
  }
}

/***/ }),

/***/ 2661:
/*!**********************************************************************!*\
  !*** ./src/app/components/abstract/forms/openable-as-dialog-form.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "OpenableAsDialogForm": () => (/* binding */ OpenableAsDialogForm)
/* harmony export */ });
/* harmony import */ var _form__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./form */ 1151);

class OpenableAsDialogForm extends _form__WEBPACK_IMPORTED_MODULE_0__.FormComponent {
  constructor(consoleMessageService, dialogMessageService, entityName, errorService, formBuilder, httpClient, mode, openedAsDialogConfig, openedAsDialogRef, router, submitionLink, translate, afterSubmitionNavigationLink) {
    super(consoleMessageService, dialogMessageService, entityName, errorService, formBuilder, httpClient, mode, router, submitionLink, translate, afterSubmitionNavigationLink);
    this.consoleMessageService = consoleMessageService;
    this.dialogMessageService = dialogMessageService;
    this.entityName = entityName;
    this.errorService = errorService;
    this.formBuilder = formBuilder;
    this.httpClient = httpClient;
    this.mode = mode;
    this.openedAsDialogConfig = openedAsDialogConfig;
    this.openedAsDialogRef = openedAsDialogRef;
    this.router = router;
    this.submitionLink = submitionLink;
    this.translate = translate;
    this.afterSubmitionNavigationLink = afterSubmitionNavigationLink;
    this.onAfterDeletionSuccessNavigateUsingLinkHandler = this.onAfterDeletionSuccessNavigateUsingLink;
    this.onAfterSubmitionSuccessNavigateUsingLinkHandler = this.onAfterSubmitSuccessNavigateUsingLink;
    this.onBackNavigateUsingLinkHandler = this.onBackNavigateUsingLink;
    this._dialogConfigData = this.getOpenedAsDialogData(openedAsDialogConfig === null || openedAsDialogConfig === void 0 ? void 0 : openedAsDialogConfig.data);
  }
  onBack() {
    this.onBackNavigateUsingLink();
  }
  onAfterDeletionSuccessNavigateUsingLink() {
    if (this.openedAsDialogRef) {
      this.openedAsDialogRef.close();
    } else {
      this.router.navigate([this.afterSubmitionNavigationLink]);
    }
  }
  onAfterSubmitSuccessNavigateUsingLink() {
    if (this.openedAsDialogRef) {
      this.openedAsDialogRef.close();
    } else {
      this.router.navigate([this.afterSubmitionNavigationLink]);
    }
  }
  onBackNavigateUsingLink() {
    if (this.openedAsDialogRef) {
      this.openedAsDialogRef.close();
    } else {
      this.router.navigate([this.afterSubmitionNavigationLink]);
    }
  }
  getOpenedAsDialogData(data) {
    return this.isOfTypeT(data) ? data : undefined;
  }
  isOfTypeT(value) {
    return typeof value === 'object' && value !== null;
  }
}

/***/ }),

/***/ 328:
/*!**********************************************************!*\
  !*** ./src/app/components/abstract/forms/simple-form.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SimpleFormComponent": () => (/* binding */ SimpleFormComponent)
/* harmony export */ });
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var src_app_enums_form_mode_enum__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/enums/form-mode-enum */ 7673);
/* harmony import */ var src_app_ui_controls_form_validator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/ui-controls/form-validator */ 308);



class SimpleFormComponent {
  constructor(formBuilder) {
    this.formBuilder = formBuilder;
    this.formMode = src_app_enums_form_mode_enum__WEBPACK_IMPORTED_MODULE_0__.FormModeEnum;
    this.isDisabled = false;
    this.isExecuting = false;
  }
  get form() {
    return this._form;
  }
  set form(value) {
    this._form = value;
  }
  get formValidator() {
    return this._formValidator;
  }
  set formValidator(value) {
    this._formValidator = value;
  }
  get shouldActionsBeDisabled() {
    return this.form.invalid || this.isDisabled || this.isExecuting;
  }
  createForm(formFieldGroup, reloadForm = false) {
    this.form = reloadForm ? new _angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormGroup(formFieldGroup) : this.formBuilder.group(formFieldGroup !== null && formFieldGroup !== void 0 ? formFieldGroup : {});
    this.formValidator = new src_app_ui_controls_form_validator__WEBPACK_IMPORTED_MODULE_1__.FormValidator(this.form);
  }
  updateForm(obj) {
    if (obj) this.form.patchValue(obj);
  }
}

/***/ }),

/***/ 8309:
/*!*************************************************!*\
  !*** ./src/app/components/addresses/address.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AddressComponent": () => (/* binding */ AddressComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! tslib */ 2321);
/* harmony import */ var _address_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./address.html?ngResource */ 9633);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ngx-translate/core */ 8699);
/* harmony import */ var src_app_services_select_options_select_options_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/select-options/select-options.service */ 712);
/* harmony import */ var _abstract_forms_dynamic_requirement_form__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../abstract/forms/dynamic-requirement-form */ 7602);







let AddressComponent = class AddressComponent extends _abstract_forms_dynamic_requirement_form__WEBPACK_IMPORTED_MODULE_2__.DynamicRequirementFormComponent {
  constructor(formBuilder, selectOptionsService, translate) {
    super(formBuilder);
    this.formBuilder = formBuilder;
    this.selectOptionsService = selectOptionsService;
    this.translate = translate;
    this.createForm({
      ApartmentNumber: [''],
      City: [''],
      CountryId: [''],
      Email: [''],
      Id: null,
      PhoneNumber: [''],
      PostalCode: [''],
      StreetName: [''],
      StreetNumber: ['']
    });
  }
  ngOnInit() {
    this.populateDropdowns();
    this.updateFormAfterInit();
    if (this.entityAddress) {
      this.updateForm({
        ApartmentNumber: this.entityAddress.ApartmentNumber,
        City: this.entityAddress.City,
        CountryId: this.entityAddress.Country.Id,
        Email: this.entityAddress.Email,
        Id: this.entityAddress.Id,
        PhoneNumber: this.entityAddress.PhoneNumber,
        PostalCode: this.entityAddress.PostalCode,
        StreetName: this.entityAddress.StreetName,
        StreetNumber: this.entityAddress.StreetNumber
      });
    }
  }
  populateDropdowns() {
    this.selectOptionsService.getCountries().subscribe(options => {
      this.countries = options;
    });
  }
};
AddressComponent.ctorParameters = () => [{
  type: _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormBuilder
}, {
  type: src_app_services_select_options_select_options_service__WEBPACK_IMPORTED_MODULE_1__.SelectOptionsService
}, {
  type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__.TranslateService
}];
AddressComponent.propDecorators = {
  entityAddress: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_5__.Input,
    args: ['entityAddress']
  }],
  showTitle: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_5__.Input,
    args: ['showTitle']
  }]
};
AddressComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.Component)({
  selector: 'address',
  template: _address_html_ngResource__WEBPACK_IMPORTED_MODULE_0__
})], AddressComponent);


/***/ }),

/***/ 3320:
/*!****************************************************************!*\
  !*** ./src/app/components/addresses/company-client-address.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CompanyClientAddressComponent": () => (/* binding */ CompanyClientAddressComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! tslib */ 2321);
/* harmony import */ var _company_client_address_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./company-client-address.html?ngResource */ 9618);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _abstract_forms_simple_form__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../abstract/forms/simple-form */ 328);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ngx-translate/core */ 8699);






let CompanyClientAddressComponent = class CompanyClientAddressComponent extends _abstract_forms_simple_form__WEBPACK_IMPORTED_MODULE_1__.SimpleFormComponent {
  constructor(formBuilder, translate) {
    super(formBuilder);
    this.formBuilder = formBuilder;
    this.translate = translate;
    this.createForm({
      NationalCompanyId: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__.Validators.required]
    });
  }
  ngOnInit() {
    if (this.clientAddress) {
      this.updateForm({
        NationalCompanyId: this.clientAddress.NationalId
      });
    }
  }
};
CompanyClientAddressComponent.ctorParameters = () => [{
  type: _angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormBuilder
}, {
  type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_3__.TranslateService
}];
CompanyClientAddressComponent.propDecorators = {
  clientAddress: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_4__.Input,
    args: ['clientAddress']
  }]
};
CompanyClientAddressComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.Component)({
  selector: 'company-client-address',
  template: _company_client_address_html_ngResource__WEBPACK_IMPORTED_MODULE_0__
})], CompanyClientAddressComponent);


/***/ }),

/***/ 4549:
/*!****************************************************************!*\
  !*** ./src/app/components/addresses/private-client-address.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PrivateClientAddressComponent": () => (/* binding */ PrivateClientAddressComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! tslib */ 2321);
/* harmony import */ var _private_client_address_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./private-client-address.html?ngResource */ 1231);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _abstract_forms_simple_form__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../abstract/forms/simple-form */ 328);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ngx-translate/core */ 8699);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ 2508);






let PrivateClientAddressComponent = class PrivateClientAddressComponent extends _abstract_forms_simple_form__WEBPACK_IMPORTED_MODULE_1__.SimpleFormComponent {
  constructor(formBuilder, translate) {
    super(formBuilder);
    this.formBuilder = formBuilder;
    this.translate = translate;
    this.createForm({
      NationalCitizenId: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__.Validators.required]
    });
  }
  ngOnInit() {
    if (this.clientAddress) {
      this.updateForm({
        NationalCitizenId: this.clientAddress.NationalId
      });
    }
  }
};
PrivateClientAddressComponent.ctorParameters = () => [{
  type: _angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormBuilder
}, {
  type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_3__.TranslateService
}];
PrivateClientAddressComponent.propDecorators = {
  clientAddress: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_4__.Input,
    args: ['clientAddress']
  }]
};
PrivateClientAddressComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.Component)({
  selector: 'private-client-address',
  template: _private_client_address_html_ngResource__WEBPACK_IMPORTED_MODULE_0__
})], PrivateClientAddressComponent);


/***/ }),

/***/ 3416:
/*!************************************************************!*\
  !*** ./src/app/components/audits/audit-list-for-entity.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AuditListForEntityComponent": () => (/* binding */ AuditListForEntityComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! tslib */ 2321);
/* harmony import */ var _audit_list_for_entity_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./audit-list-for-entity.html?ngResource */ 7944);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var src_app_interfaces_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/interfaces/png */ 7495);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common/http */ 8987);
/* harmony import */ var src_app_services_filters_filter_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/filters/filter.service */ 9865);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ngx-translate/core */ 8699);
/* harmony import */ var src_app_api_routes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/api-routes */ 2061);
/* harmony import */ var src_app_services_select_options_select_options_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/select-options/select-options.service */ 712);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ 3853);










let AuditListForEntityComponent = class AuditListForEntityComponent {
  constructor(filterService, httpClient, selectOptionsService, translate) {
    this.filterService = filterService;
    this.httpClient = httpClient;
    this.selectOptionsService = selectOptionsService;
    this.translate = translate;
    this._dataPopulator = {
      fieldNamesForObjectHistory: {
        get: () => this.getFieldNamesForObjectHistory(),
        set: options => this.setFieldNamesForObjectHistory(options)
      },
      objectHistory: {
        get: event => this.getObjectHistory(event),
        set: audits => this.setObjectHistory(audits)
      }
    };
    this.fieldNameOptions = [];
  }
  ngOnInit() {
    this.table = new src_app_interfaces_png__WEBPACK_IMPORTED_MODULE_1__.PngTable([{
      field: 'UserName',
      header: 'Audit.UserName',
      width: '20%',
      applyGlobalFiltering: true
    }, {
      field: 'CreatedOn',
      header: 'Audit.CreatedOn',
      width: '20%'
    }, {
      field: 'FieldName',
      header: 'Audit.FieldName',
      width: '20%',
      applyGlobalFiltering: true
    }, {
      field: 'OldValue',
      header: 'Audit.OldValue',
      width: '20%',
      applyGlobalFiltering: true
    }, {
      field: 'NewValue',
      header: 'Audit.NewValue',
      width: '20%',
      applyGlobalFiltering: true
    }]);
  }
  loadAuditsLazy(event) {
    this.tempLazyLoadEvent = event;
    this._dataPopulator.objectHistory.get(event).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.concatMap)(result => {
      this._dataPopulator.objectHistory.set(result);
      return this._dataPopulator.fieldNamesForObjectHistory.get();
    })).subscribe(result => {
      this._dataPopulator.fieldNamesForObjectHistory.set(result);
    });
  }
  getFieldNamesForObjectHistory() {
    return this.selectOptionsService.getFieldNamesForObjectHistory(this.tempLazyLoadEvent, this.table.cols, this.entityId, this.entityTableName);
  }
  getObjectHistory(event) {
    return this.httpClient.get(src_app_api_routes__WEBPACK_IMPORTED_MODULE_3__.ApiRoutes.audit.getObjectHistory(event, this.table.cols, this.entityId, this.entityTableName));
  }
  setFieldNamesForObjectHistory(options) {
    this.fieldNameOptions = options;
    this.table.setOptionsForColumn("FieldName", this.fieldNameOptions);
  }
  setObjectHistory(audits) {
    this.totalRecords = audits.TotalRowsCount;
    this.audits = audits.List;
  }
};
AuditListForEntityComponent.ctorParameters = () => [{
  type: src_app_services_filters_filter_service__WEBPACK_IMPORTED_MODULE_2__.FilterService
}, {
  type: _angular_common_http__WEBPACK_IMPORTED_MODULE_6__.HttpClient
}, {
  type: src_app_services_select_options_select_options_service__WEBPACK_IMPORTED_MODULE_4__.SelectOptionsService
}, {
  type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__.TranslateService
}];
AuditListForEntityComponent.propDecorators = {
  entityId: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_8__.Input
  }],
  entityTableName: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_8__.Input
  }]
};
AuditListForEntityComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_9__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_8__.Component)({
  selector: "audit-list-for-entity",
  template: _audit_list_for_entity_html_ngResource__WEBPACK_IMPORTED_MODULE_0__
})], AuditListForEntityComponent);


/***/ }),

/***/ 4354:
/*!*****************************************************!*\
  !*** ./src/app/components/clients/client-create.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ClientCreationComponent": () => (/* binding */ ClientCreationComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! tslib */ 2321);
/* harmony import */ var _client_create_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./client-create.html?ngResource */ 229);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/common/http */ 8987);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var src_app_services_messages_console_message_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/messages/console-message.service */ 5289);
/* harmony import */ var src_app_services_errors_error_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/errors/error.service */ 8813);
/* harmony import */ var src_app_services_messages_dialog_message_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/messages/dialog-message.service */ 1323);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/router */ 124);
/* harmony import */ var src_app_services_select_options_select_options_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/select-options/select-options.service */ 712);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @ngx-translate/core */ 8699);
/* harmony import */ var src_app_routes__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/routes */ 1311);
/* harmony import */ var src_app_enums_client_type_enum__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/enums/client-type-enum */ 379);
/* harmony import */ var src_app_interfaces_address__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/interfaces/address */ 2047);
/* harmony import */ var src_app_api_routes__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/api-routes */ 2061);
/* harmony import */ var _abstract_forms_form__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../abstract/forms/form */ 1151);
/* harmony import */ var src_app_enums_form_mode_enum__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/enums/form-mode-enum */ 7673);

















let ClientCreationComponent = class ClientCreationComponent extends _abstract_forms_form__WEBPACK_IMPORTED_MODULE_9__.FormComponent {
  constructor(consoleMessageService, dialogMessageService, errorService, formBuilder, httpClient, router, selectOptionsService, translate) {
    super(consoleMessageService, dialogMessageService, 'Client', errorService, formBuilder, httpClient, src_app_enums_form_mode_enum__WEBPACK_IMPORTED_MODULE_10__.FormModeEnum.Creation, router, src_app_api_routes__WEBPACK_IMPORTED_MODULE_8__.ApiRoutes.client.post, translate, src_app_routes__WEBPACK_IMPORTED_MODULE_5__.Routes.clients.navigations.list);
    this.consoleMessageService = consoleMessageService;
    this.dialogMessageService = dialogMessageService;
    this.errorService = errorService;
    this.formBuilder = formBuilder;
    this.httpClient = httpClient;
    this.router = router;
    this.selectOptionsService = selectOptionsService;
    this.translate = translate;
    this.beforeSubmitionCustomOperationsHandler = this.prepareClientCreationModel;
    this.clientAddressRequiredFields = [src_app_interfaces_address__WEBPACK_IMPORTED_MODULE_7__.addressFormFields.City, src_app_interfaces_address__WEBPACK_IMPORTED_MODULE_7__.addressFormFields.Country, src_app_interfaces_address__WEBPACK_IMPORTED_MODULE_7__.addressFormFields.PostalCode, src_app_interfaces_address__WEBPACK_IMPORTED_MODULE_7__.addressFormFields.StreetName, src_app_interfaces_address__WEBPACK_IMPORTED_MODULE_7__.addressFormFields.StreetNumber];
    this.clientType = src_app_enums_client_type_enum__WEBPACK_IMPORTED_MODULE_6__.ClientTypeEnum;
    this.createForm({
      ClientTypeId: null,
      Name: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_11__.Validators.required]
    });
  }
  get shouldActionsBeDisabled() {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    return super.shouldActionsBeDisabled || ((_b = (_a = this.addressForm) === null || _a === void 0 ? void 0 : _a.form.invalid) !== null && _b !== void 0 ? _b : false) || ((_d = (_c = this.companyClientAddressForm) === null || _c === void 0 ? void 0 : _c.form.invalid) !== null && _d !== void 0 ? _d : false) || ((_f = (_e = this.privateClientAddressForm) === null || _e === void 0 ? void 0 : _e.form.invalid) !== null && _f !== void 0 ? _f : false) || ((_h = (_g = this.privateClientForm) === null || _g === void 0 ? void 0 : _g.form.invalid) !== null && _h !== void 0 ? _h : false);
  }
  ngOnInit() {
    this.populateDropdowns();
  }
  onBack() {
    this.router.navigate([src_app_routes__WEBPACK_IMPORTED_MODULE_5__.Routes.clients.navigations.list]);
  }
  getClientNationalId() {
    var _a, _b;
    switch (Number(this.form.value.ClientTypeId)) {
      case src_app_enums_client_type_enum__WEBPACK_IMPORTED_MODULE_6__.ClientTypeEnum.Private:
        return (_a = this.privateClientAddressForm) === null || _a === void 0 ? void 0 : _a.form.value.NationalCitizenId;
      case src_app_enums_client_type_enum__WEBPACK_IMPORTED_MODULE_6__.ClientTypeEnum.Company:
        return (_b = this.companyClientAddressForm) === null || _b === void 0 ? void 0 : _b.form.value.NationalCompanyId;
      default:
        return '';
    }
  }
  populateDropdowns() {
    this.selectOptionsService.getClientTypes().subscribe(options => {
      this.clientTypes = options;
    });
  }
  prepareClientCreationModel() {
    var _a, _b;
    const clientAddress = {
      ApartmentNumber: this.addressForm.form.value.ApartmentNumber,
      City: this.addressForm.form.value.City,
      Country: {
        Id: this.addressForm.form.value.CountryId
      },
      Email: this.addressForm.form.value.Email,
      NationalId: this.getClientNationalId(),
      PhoneNumber: this.addressForm.form.value.PhoneNumber,
      PostalCode: this.addressForm.form.value.PostalCode,
      StreetName: this.addressForm.form.value.StreetName,
      StreetNumber: this.addressForm.form.value.StreetNumber
    };
    const client = {
      Addresses: [clientAddress],
      FirstName: (_a = this.privateClientForm) === null || _a === void 0 ? void 0 : _a.form.value.FirstName,
      LastName: (_b = this.privateClientForm) === null || _b === void 0 ? void 0 : _b.form.value.LastName,
      Name: this.form.value.Name,
      TypeId: this.form.value.ClientTypeId
    };
    return client;
  }
};
ClientCreationComponent.ctorParameters = () => [{
  type: src_app_services_messages_console_message_service__WEBPACK_IMPORTED_MODULE_1__.ConsoleMessageService
}, {
  type: src_app_services_messages_dialog_message_service__WEBPACK_IMPORTED_MODULE_3__.DialogMessageService
}, {
  type: src_app_services_errors_error_service__WEBPACK_IMPORTED_MODULE_2__.ErrorService
}, {
  type: _angular_forms__WEBPACK_IMPORTED_MODULE_11__.FormBuilder
}, {
  type: _angular_common_http__WEBPACK_IMPORTED_MODULE_12__.HttpClient
}, {
  type: _angular_router__WEBPACK_IMPORTED_MODULE_13__.Router
}, {
  type: src_app_services_select_options_select_options_service__WEBPACK_IMPORTED_MODULE_4__.SelectOptionsService
}, {
  type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_14__.TranslateService
}];
ClientCreationComponent.propDecorators = {
  addressForm: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_15__.ViewChild,
    args: ['addressForm']
  }],
  companyClientAddressForm: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_15__.ViewChild,
    args: ['companyClientAddressForm']
  }],
  privateClientAddressForm: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_15__.ViewChild,
    args: ['privateClientAddressForm']
  }],
  privateClientForm: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_15__.ViewChild,
    args: ['privateClientForm']
  }]
};
ClientCreationComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_16__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_15__.Component)({
  selector: "client-create",
  template: _client_create_html_ngResource__WEBPACK_IMPORTED_MODULE_0__
})], ClientCreationComponent);


/***/ }),

/***/ 1297:
/*!******************************************************!*\
  !*** ./src/app/components/clients/client-details.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ClientDetailsComponent": () => (/* binding */ ClientDetailsComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! tslib */ 2321);
/* harmony import */ var _client_details_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./client-details.html?ngResource */ 255);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var primeng_api__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! primeng/api */ 4356);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/router */ 124);
/* harmony import */ var src_app_services_authorization_authorization_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/authorization/authorization.service */ 6079);
/* harmony import */ var src_app_services_messages_console_message_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/messages/console-message.service */ 5289);
/* harmony import */ var src_app_services_messages_dialog_message_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/messages/dialog-message.service */ 1323);
/* harmony import */ var src_app_services_errors_error_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/errors/error.service */ 8813);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/common/http */ 8987);
/* harmony import */ var src_app_services_select_options_select_options_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/services/select-options/select-options.service */ 712);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @ngx-translate/core */ 8699);
/* harmony import */ var src_app_enums_user_permission_enum__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/enums/user-permission-enum */ 8235);
/* harmony import */ var src_app_api_routes__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/api-routes */ 2061);
/* harmony import */ var src_app_enums_client_type_enum__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/enums/client-type-enum */ 379);
/* harmony import */ var src_app_interfaces_address__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/interfaces/address */ 2047);
/* harmony import */ var _abstract_forms_access_control_form__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../abstract/forms/access-control-form */ 6739);
/* harmony import */ var src_app_enums_form_mode_enum__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! src/app/enums/form-mode-enum */ 7673);
/* harmony import */ var src_app_routes__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! src/app/routes */ 1311);




















let ClientDetailsComponent = class ClientDetailsComponent extends _abstract_forms_access_control_form__WEBPACK_IMPORTED_MODULE_10__.AccessControlFormComponent {
  constructor(activatedRoute, authorizationService, confirmationService, consoleMessageService, dialogMessageService, errorService, formBuilder, httpClient, router, selectOptionsService, translate) {
    super(activatedRoute, authorizationService, confirmationService, consoleMessageService, 'deleteClient', src_app_api_routes__WEBPACK_IMPORTED_MODULE_7__.ApiRoutes.client["delete"], dialogMessageService, 'Client', errorService, formBuilder, httpClient, src_app_enums_form_mode_enum__WEBPACK_IMPORTED_MODULE_11__.FormModeEnum.Edition, router, src_app_api_routes__WEBPACK_IMPORTED_MODULE_7__.ApiRoutes.client.put, translate, [src_app_enums_user_permission_enum__WEBPACK_IMPORTED_MODULE_6__.UserPermissionEnum.Clients_CanModify], src_app_routes__WEBPACK_IMPORTED_MODULE_12__.Routes.clients.navigations.list);
    this.activatedRoute = activatedRoute;
    this.authorizationService = authorizationService;
    this.confirmationService = confirmationService;
    this.consoleMessageService = consoleMessageService;
    this.dialogMessageService = dialogMessageService;
    this.errorService = errorService;
    this.formBuilder = formBuilder;
    this.httpClient = httpClient;
    this.router = router;
    this.selectOptionsService = selectOptionsService;
    this.translate = translate;
    this.beforeSubmitionCustomOperationsHandler = this.prepareClientDetailsModel;
    this.afterSubmitionCustomOperationsHandler = undefined;
    this.deletedEntityInstanceIdentificationInitializer = this.getEntityInstanceName;
    this.activeTab = 0;
    this.routes = src_app_routes__WEBPACK_IMPORTED_MODULE_12__.Routes;
    this.clientAddressRequiredFields = [src_app_interfaces_address__WEBPACK_IMPORTED_MODULE_9__.addressFormFields.City, src_app_interfaces_address__WEBPACK_IMPORTED_MODULE_9__.addressFormFields.Country, src_app_interfaces_address__WEBPACK_IMPORTED_MODULE_9__.addressFormFields.PostalCode, src_app_interfaces_address__WEBPACK_IMPORTED_MODULE_9__.addressFormFields.StreetName, src_app_interfaces_address__WEBPACK_IMPORTED_MODULE_9__.addressFormFields.StreetNumber];
    this.clientType = src_app_enums_client_type_enum__WEBPACK_IMPORTED_MODULE_8__.ClientTypeEnum;
    this.createForm({
      ClientTypeId: null,
      Name: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.required]
    });
    this.loadClient();
  }
  get shouldActionsBeDisabled() {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    return super.shouldActionsBeDisabled || ((_b = (_a = this.addressForm) === null || _a === void 0 ? void 0 : _a.form.invalid) !== null && _b !== void 0 ? _b : false) || ((_d = (_c = this.companyClientAddressForm) === null || _c === void 0 ? void 0 : _c.form.invalid) !== null && _d !== void 0 ? _d : false) || ((_f = (_e = this.privateClientAddressForm) === null || _e === void 0 ? void 0 : _e.form.invalid) !== null && _f !== void 0 ? _f : false) || ((_h = (_g = this.privateClientForm) === null || _g === void 0 ? void 0 : _g.form.invalid) !== null && _h !== void 0 ? _h : false);
  }
  ngOnInit() {
    this.populateDropdowns();
  }
  ngAfterViewInit() {
    const activeTab = this.activatedRoute.snapshot.params['activeTab'];
    if (activeTab) {
      this.switchActiveTab(Number(activeTab));
    }
  }
  onBack() {
    this.router.navigate([src_app_routes__WEBPACK_IMPORTED_MODULE_12__.Routes.clients.navigations.list]);
  }
  switchActiveTab(tabIndex) {
    this.activeTab = tabIndex;
  }
  getClientNationalId() {
    var _a, _b;
    switch (Number(this.form.value.ClientTypeId)) {
      case src_app_enums_client_type_enum__WEBPACK_IMPORTED_MODULE_8__.ClientTypeEnum.Private:
        return (_a = this.privateClientAddressForm) === null || _a === void 0 ? void 0 : _a.form.value.NationalCitizenId;
      case src_app_enums_client_type_enum__WEBPACK_IMPORTED_MODULE_8__.ClientTypeEnum.Company:
        return (_b = this.companyClientAddressForm) === null || _b === void 0 ? void 0 : _b.form.value.NationalCompanyId;
      default:
        return '';
    }
  }
  getEntityInstanceName() {
    return this.client.Name;
  }
  loadClient() {
    if (!this.entityId) return;
    this.httpClient.get(src_app_api_routes__WEBPACK_IMPORTED_MODULE_7__.ApiRoutes.client.getById(this.entityId)).subscribe(result => {
      this.client = result;
      this.updateForm({
        ClientTypeId: this.client.TypeId.toString(),
        Name: this.client.Name
      });
    });
  }
  populateDropdowns() {
    this.selectOptionsService.getClientTypes().subscribe(options => {
      this.clientTypes = options;
    });
  }
  prepareClientDetailsModel() {
    var _a, _b;
    const clientAddress = {
      ApartmentNumber: this.addressForm.form.value.ApartmentNumber,
      City: this.addressForm.form.value.City,
      Country: {
        Id: this.addressForm.form.value.CountryId
      },
      Email: this.addressForm.form.value.Email,
      Id: this.addressForm.form.value.Id,
      NationalId: this.getClientNationalId(),
      PhoneNumber: this.addressForm.form.value.PhoneNumber,
      PostalCode: this.addressForm.form.value.PostalCode,
      StreetName: this.addressForm.form.value.StreetName,
      StreetNumber: this.addressForm.form.value.StreetNumber
    };
    const client = {
      Addresses: [clientAddress],
      FirstName: (_a = this.privateClientForm) === null || _a === void 0 ? void 0 : _a.form.value.FirstName,
      Id: this.client.Id,
      LastName: (_b = this.privateClientForm) === null || _b === void 0 ? void 0 : _b.form.value.LastName,
      Name: this.form.value.Name,
      TypeId: this.form.value.ClientTypeId
    };
    return client;
  }
};
ClientDetailsComponent.ctorParameters = () => [{
  type: _angular_router__WEBPACK_IMPORTED_MODULE_14__.ActivatedRoute
}, {
  type: src_app_services_authorization_authorization_service__WEBPACK_IMPORTED_MODULE_1__.AuthorizationService
}, {
  type: primeng_api__WEBPACK_IMPORTED_MODULE_15__.ConfirmationService
}, {
  type: src_app_services_messages_console_message_service__WEBPACK_IMPORTED_MODULE_2__.ConsoleMessageService
}, {
  type: src_app_services_messages_dialog_message_service__WEBPACK_IMPORTED_MODULE_3__.DialogMessageService
}, {
  type: src_app_services_errors_error_service__WEBPACK_IMPORTED_MODULE_4__.ErrorService
}, {
  type: _angular_forms__WEBPACK_IMPORTED_MODULE_13__.FormBuilder
}, {
  type: _angular_common_http__WEBPACK_IMPORTED_MODULE_16__.HttpClient
}, {
  type: _angular_router__WEBPACK_IMPORTED_MODULE_14__.Router
}, {
  type: src_app_services_select_options_select_options_service__WEBPACK_IMPORTED_MODULE_5__.SelectOptionsService
}, {
  type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_17__.TranslateService
}];
ClientDetailsComponent.propDecorators = {
  addressForm: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_18__.ViewChild,
    args: ['addressForm']
  }],
  companyClientAddressForm: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_18__.ViewChild,
    args: ['companyClientAddressForm']
  }],
  privateClientAddressForm: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_18__.ViewChild,
    args: ['privateClientAddressForm']
  }],
  privateClientForm: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_18__.ViewChild,
    args: ['privateClientForm']
  }]
};
ClientDetailsComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_19__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_18__.Component)({
  selector: "client-details",
  template: _client_details_html_ngResource__WEBPACK_IMPORTED_MODULE_0__
})], ClientDetailsComponent);


/***/ }),

/***/ 550:
/*!***************************************************!*\
  !*** ./src/app/components/clients/client-list.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ClientListComponent": () => (/* binding */ ClientListComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! tslib */ 2321);
/* harmony import */ var _client_list_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./client-list.html?ngResource */ 93);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _abstract_access_controls_access_control__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../abstract/access-controls/access-control */ 6378);
/* harmony import */ var primeng_api__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! primeng/api */ 4356);
/* harmony import */ var src_app_services_authorization_authorization_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/authorization/authorization.service */ 6079);
/* harmony import */ var src_app_enums_user_permission_enum__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/enums/user-permission-enum */ 8235);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/router */ 124);
/* harmony import */ var src_app_routes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/routes */ 1311);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @ngx-translate/core */ 8699);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/common/http */ 8987);
/* harmony import */ var src_app_api_routes__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/api-routes */ 2061);
/* harmony import */ var src_app_services_messages_dialog_message_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/services/messages/dialog-message.service */ 1323);
/* harmony import */ var src_app_services_errors_error_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/services/errors/error.service */ 8813);
/* harmony import */ var src_app_services_messages_console_message_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/services/messages/console-message.service */ 5289);
/* harmony import */ var src_app_services_select_options_select_options_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/services/select-options/select-options.service */ 712);
/* harmony import */ var src_app_services_filters_filter_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/services/filters/filter.service */ 9865);
/* harmony import */ var src_app_enums_filter_type_enum__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! src/app/enums/filter-type-enum */ 3501);


















let ClientListComponent = class ClientListComponent extends _abstract_access_controls_access_control__WEBPACK_IMPORTED_MODULE_1__.AccessControlComponent {
  constructor(authorizationService, confirmationService, consoleMessageService, dialogMessageService, errorService, filterService, httpClient, router, selectOptionService, translate) {
    super(authorizationService, confirmationService, consoleMessageService, 'deleteClient', src_app_api_routes__WEBPACK_IMPORTED_MODULE_5__.ApiRoutes.client["delete"], dialogMessageService, 'Client', errorService, httpClient, () => {
      this._dataPopulator.clients.get(this.tempLazyLoadEvent).subscribe(result => this._dataPopulator.clients.set(result));
    }, router, translate, [src_app_enums_user_permission_enum__WEBPACK_IMPORTED_MODULE_3__.UserPermissionEnum.Clients_CanModify]);
    this.authorizationService = authorizationService;
    this.confirmationService = confirmationService;
    this.consoleMessageService = consoleMessageService;
    this.dialogMessageService = dialogMessageService;
    this.errorService = errorService;
    this.filterService = filterService;
    this.httpClient = httpClient;
    this.router = router;
    this.selectOptionService = selectOptionService;
    this.translate = translate;
    this.deletedEntityInstanceIdentificationInitializer = this.getEntityInstanceName;
    this._dataPopulator = {
      multiSelects: {
        clientTypes: {
          get: () => this.getClientTypeMultiSelectData(),
          set: clientTypes => this.setClientTypeMultiSelectData(clientTypes)
        }
      },
      clients: {
        get: event => this.getClients(event),
        set: clients => this.setClients(clients)
      }
    };
  }
  ngOnInit() {
    this.cols = [{
      field: 'Name',
      header: 'Client.Name',
      width: '20%',
      filterType: src_app_enums_filter_type_enum__WEBPACK_IMPORTED_MODULE_11__.FilterTypeEnum.Text,
      applyGlobalFiltering: true
    }, {
      field: 'FirstName',
      header: 'Client.FirstName',
      width: '20%',
      filterType: src_app_enums_filter_type_enum__WEBPACK_IMPORTED_MODULE_11__.FilterTypeEnum.Text
    }, {
      field: 'LastName',
      header: 'Client.LastName',
      width: '20%',
      filterType: src_app_enums_filter_type_enum__WEBPACK_IMPORTED_MODULE_11__.FilterTypeEnum.Text
    }, {
      field: 'TypeName',
      header: 'Client.TypeName',
      width: '20%',
      filterType: src_app_enums_filter_type_enum__WEBPACK_IMPORTED_MODULE_11__.FilterTypeEnum.Text,
      applyGlobalFiltering: true,
      replaceWith: 'ClientTypeId'
    }, {
      field: 'Actions',
      header: '',
      width: '20%'
    }];
    this._dataPopulator.multiSelects.clientTypes.get().subscribe(clientTypes => this._dataPopulator.multiSelects.clientTypes.set(clientTypes));
  }
  loadClientsLazy(event) {
    this.tempLazyLoadEvent = event;
    this._dataPopulator.clients.get(event).subscribe(result => this._dataPopulator.clients.set(result));
  }
  onCreate() {
    this.router.navigate([src_app_routes__WEBPACK_IMPORTED_MODULE_4__.Routes.clients.navigations.creation]);
  }
  onEdit(client) {
    this.router.navigate([src_app_routes__WEBPACK_IMPORTED_MODULE_4__.Routes.clients.navigations.edition(client.Id)]);
  }
  getClients(event) {
    var _a;
    (_a = event.sortField) !== null && _a !== void 0 ? _a : event.sortField = this.cols[0].field;
    return this.httpClient.get(src_app_api_routes__WEBPACK_IMPORTED_MODULE_5__.ApiRoutes.client.getAll(event, this.cols));
  }
  getClientTypeMultiSelectData() {
    return this.selectOptionService.getClientTypes();
  }
  getEntityInstanceName(client) {
    return client.Name;
  }
  setClientTypeMultiSelectData(clientTypes) {
    this.clientTypeOptions = clientTypes;
    const clientTypeColumn = this.cols.find(c => c.field === "TypeName");
    if (clientTypeColumn) {
      clientTypeColumn.options = this.clientTypeOptions;
    }
  }
  setClients(clients) {
    this.totalRecords = clients.TotalRowsCount;
    this.clients = clients.List;
  }
};
ClientListComponent.ctorParameters = () => [{
  type: src_app_services_authorization_authorization_service__WEBPACK_IMPORTED_MODULE_2__.AuthorizationService
}, {
  type: primeng_api__WEBPACK_IMPORTED_MODULE_12__.ConfirmationService
}, {
  type: src_app_services_messages_console_message_service__WEBPACK_IMPORTED_MODULE_8__.ConsoleMessageService
}, {
  type: src_app_services_messages_dialog_message_service__WEBPACK_IMPORTED_MODULE_6__.DialogMessageService
}, {
  type: src_app_services_errors_error_service__WEBPACK_IMPORTED_MODULE_7__.ErrorService
}, {
  type: src_app_services_filters_filter_service__WEBPACK_IMPORTED_MODULE_10__.FilterService
}, {
  type: _angular_common_http__WEBPACK_IMPORTED_MODULE_13__.HttpClient
}, {
  type: _angular_router__WEBPACK_IMPORTED_MODULE_14__.Router
}, {
  type: src_app_services_select_options_select_options_service__WEBPACK_IMPORTED_MODULE_9__.SelectOptionsService
}, {
  type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_15__.TranslateService
}];
ClientListComponent.propDecorators = {
  dataTable: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_16__.ViewChild,
    args: ['dataTable']
  }]
};
ClientListComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_17__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_16__.Component)({
  selector: "client-list",
  template: _client_list_html_ngResource__WEBPACK_IMPORTED_MODULE_0__
})], ClientListComponent);


/***/ }),

/***/ 3821:
/*!******************************************************!*\
  !*** ./src/app/components/clients/private-client.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PrivateClientComponent": () => (/* binding */ PrivateClientComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! tslib */ 2321);
/* harmony import */ var _private_client_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./private-client.html?ngResource */ 8340);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _abstract_forms_simple_form__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../abstract/forms/simple-form */ 328);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ngx-translate/core */ 8699);






let PrivateClientComponent = class PrivateClientComponent extends _abstract_forms_simple_form__WEBPACK_IMPORTED_MODULE_1__.SimpleFormComponent {
  constructor(formBuilder, translate) {
    super(formBuilder);
    this.formBuilder = formBuilder;
    this.translate = translate;
    this.createForm({
      FirstName: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__.Validators.required],
      LastName: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__.Validators.required]
    });
  }
  ngOnInit() {
    if (this.client) {
      this.updateForm({
        FirstName: this.client.FirstName,
        LastName: this.client.LastName
      });
    }
  }
};
PrivateClientComponent.ctorParameters = () => [{
  type: _angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormBuilder
}, {
  type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_3__.TranslateService
}];
PrivateClientComponent.propDecorators = {
  client: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_4__.Input,
    args: ['client']
  }]
};
PrivateClientComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.Component)({
  selector: "private-client",
  template: _private_client_html_ngResource__WEBPACK_IMPORTED_MODULE_0__
})], PrivateClientComponent);


/***/ }),

/***/ 2167:
/*!*******************************************************!*\
  !*** ./src/app/components/dialogs/deletion-dialog.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DeletionDialogComponent": () => (/* binding */ DeletionDialogComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 2321);
/* harmony import */ var _deletion_dialog_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./deletion-dialog.html?ngResource */ 6514);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ngx-translate/core */ 8699);




let DeletionDialogComponent = class DeletionDialogComponent {
  constructor(translate) {
    this.translate = translate;
  }
  ngOnInit() {}
};
DeletionDialogComponent.ctorParameters = () => [{
  type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_1__.TranslateService
}];
DeletionDialogComponent.propDecorators = {
  deletionKey: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_2__.Input,
    args: ['deletionKey']
  }]
};
DeletionDialogComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.Component)({
  selector: "deletion-dialog",
  template: _deletion_dialog_html_ngResource__WEBPACK_IMPORTED_MODULE_0__
})], DeletionDialogComponent);


/***/ }),

/***/ 9598:
/*!**********************************************************!*\
  !*** ./src/app/components/login/login-reset-password.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LoginResetPasswordComponent": () => (/* binding */ LoginResetPasswordComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! tslib */ 2321);
/* harmony import */ var _login_reset_password_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./login-reset-password.html?ngResource */ 8089);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 124);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ngx-translate/core */ 8699);
/* harmony import */ var primeng_api__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! primeng/api */ 4356);
/* harmony import */ var src_app_services_errors_error_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/errors/error.service */ 8813);
/* harmony import */ var _abstract_forms_simple_form__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../abstract/forms/simple-form */ 328);









let LoginResetPasswordComponent = class LoginResetPasswordComponent extends _abstract_forms_simple_form__WEBPACK_IMPORTED_MODULE_2__.SimpleFormComponent {
  constructor(activatedRoute, errorService, formBuilder, dialogMessageService, translate) {
    super(formBuilder);
    this.activatedRoute = activatedRoute;
    this.errorService = errorService;
    this.formBuilder = formBuilder;
    this.dialogMessageService = dialogMessageService;
    this.translate = translate;
    this.activatedRoute.queryParams.subscribe(params => {
      this.token = params['token'];
      this.createForm({
        Email: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__.Validators.required]
      });
    });
  }
  ngOnInit() {}
  onSubmit() {
    if (!this.form.value.Email) {
      this.dialogMessageService.add({
        severity: 'error',
        summary: this.errorService.getDefaultErrorMessage(),
        detail: this.translate.instant('Messages.EnterEmailFirst')
      });
      return;
    }
    // const model = <ResetPasswordModel>{
    //   Email: this.form.value.Email,
    //   Language: this.translate.currentLang
    // };
    //[TODO]
    // this.http.put<string>(ApiRoutes.identity.resetPassword, model).subscribe(result => {
    //   if (result == "OK") {
    //     this.messageService.add({ key: 'tst', severity: 'success', summary: this.translate.instant('Messages.EmailWithPasswordResetInstructionsSent') });
    //   }
    //   else if (result == "WrongToken") {
    //     this.messageService.add({ key: 'tst', severity: 'error', summary: this.translate.instant('Messages.CantChangeUserPassword') });
    //   }
    //   else if (result == "EmailDoesntExist") {
    //     this.messageService.add({ severity: 'error', summary: this.translate.instant('Messages.ProvidedEmailDoesNotExist') });
    //   }
    //   console.log(`Reset password has been ended with result: ${result}`);
    // }, error => console.log(error));
  }
};

LoginResetPasswordComponent.ctorParameters = () => [{
  type: _angular_router__WEBPACK_IMPORTED_MODULE_4__.ActivatedRoute
}, {
  type: src_app_services_errors_error_service__WEBPACK_IMPORTED_MODULE_1__.ErrorService
}, {
  type: _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormBuilder
}, {
  type: primeng_api__WEBPACK_IMPORTED_MODULE_5__.MessageService
}, {
  type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__.TranslateService
}];
LoginResetPasswordComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_7__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_8__.Component)({
  selector: "login-reset-password",
  template: _login_reset_password_html_ngResource__WEBPACK_IMPORTED_MODULE_0__
})], LoginResetPasswordComponent);


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
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! tslib */ 2321);
/* harmony import */ var _login_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./login.html?ngResource */ 1320);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/platform-browser */ 4497);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/router */ 124);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @ngx-translate/core */ 8699);
/* harmony import */ var src_app_app_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/app.component */ 5041);
/* harmony import */ var src_app_enums_language_code_enum__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/enums/language-code-enum */ 1072);
/* harmony import */ var src_app_services_authentication_authentication_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/authentication/authentication.service */ 7020);
/* harmony import */ var src_app_services_errors_error_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/errors/error.service */ 8813);
/* harmony import */ var src_app_services_messages_dialog_message_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/services/messages/dialog-message.service */ 1323);
/* harmony import */ var src_app_services_select_options_select_options_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/services/select-options/select-options.service */ 712);
/* harmony import */ var src_app_enums_api_result_enum__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/enums/api-result-enum */ 6793);
/* harmony import */ var src_app_routes__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/routes */ 1311);
/* harmony import */ var _abstract_forms_simple_form__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../abstract/forms/simple-form */ 328);
















let LoginComponent = class LoginComponent extends _abstract_forms_simple_form__WEBPACK_IMPORTED_MODULE_9__.SimpleFormComponent {
  constructor(app, authenticationService, dialogMessageService, errorService, formBuilder, router, selectOptionsService, titleService, translate) {
    super(formBuilder);
    this.app = app;
    this.authenticationService = authenticationService;
    this.dialogMessageService = dialogMessageService;
    this.errorService = errorService;
    this.formBuilder = formBuilder;
    this.router = router;
    this.selectOptionsService = selectOptionsService;
    this.titleService = titleService;
    this.translate = translate;
    this.translate.setDefaultLang('pl');
    this.titleService.setTitle(translate.instant('AppName'));
    this.createForm({
      Login: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_10__.Validators.required],
      Password: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_10__.Validators.required]
    });
  }
  ngOnInit() {
    this.selectOptionsService.getLanguages().subscribe(options => {
      this.languages = options;
      const languageIdFromStorage = localStorage.getItem('languageId');
      if (languageIdFromStorage) {
        this.languageId = Number(languageIdFromStorage);
        this.setLanguage(this.languageId);
      }
    });
  }
  onSubmit() {
    if (!this.form.value.Login) {
      this.dialogMessageService.addError(this.errorService.getDefaultErrorMessage());
      return;
    }
    const data = {
      Login: this.form.value.Login,
      Password: this.form.value.Password
    };
    this.authenticationService.login(data).subscribe(result => {
      switch (result) {
        case src_app_enums_api_result_enum__WEBPACK_IMPORTED_MODULE_7__.ApiResultEnum[src_app_enums_api_result_enum__WEBPACK_IMPORTED_MODULE_7__.ApiResultEnum.OK]:
          this.app.isUserLoggedIn = true;
          this.router.navigate([src_app_routes__WEBPACK_IMPORTED_MODULE_8__.Routes.home.navigations["default"]]);
          break;
        case src_app_enums_api_result_enum__WEBPACK_IMPORTED_MODULE_7__.ApiResultEnum[src_app_enums_api_result_enum__WEBPACK_IMPORTED_MODULE_7__.ApiResultEnum.NotActive]:
          this.dialogMessageService.addError(this.translate.instant('Messages.AccountNotActive'));
          this.dialogMessageService.addError(this.translate.instant('Messages.PleaseContactAdmin'));
          break;
        default:
          this.dialogMessageService.addError(this.translate.instant('Messages.InvalidLoginData'));
          break;
      }
    });
  }
  getLanguageCodeById(id) {
    switch (id) {
      case src_app_enums_language_code_enum__WEBPACK_IMPORTED_MODULE_2__.LanguageCodeEnum.Pl.valueOf():
        return "pl";
      case src_app_enums_language_code_enum__WEBPACK_IMPORTED_MODULE_2__.LanguageCodeEnum.En.valueOf():
        return "en";
      default:
        return "---";
    }
  }
  setLanguage(languageId) {
    const lang = this.getLanguageCodeById(languageId);
    this.translate.use(lang).subscribe(() => {
      this.titleService.setTitle(this.translate.instant('AppName'));
    });
  }
};
LoginComponent.ctorParameters = () => [{
  type: src_app_app_component__WEBPACK_IMPORTED_MODULE_1__.AppComponent
}, {
  type: src_app_services_authentication_authentication_service__WEBPACK_IMPORTED_MODULE_3__.AuthenticationService
}, {
  type: src_app_services_messages_dialog_message_service__WEBPACK_IMPORTED_MODULE_5__.DialogMessageService
}, {
  type: src_app_services_errors_error_service__WEBPACK_IMPORTED_MODULE_4__.ErrorService
}, {
  type: _angular_forms__WEBPACK_IMPORTED_MODULE_10__.FormBuilder
}, {
  type: _angular_router__WEBPACK_IMPORTED_MODULE_11__.Router
}, {
  type: src_app_services_select_options_select_options_service__WEBPACK_IMPORTED_MODULE_6__.SelectOptionsService
}, {
  type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_12__.Title
}, {
  type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_13__.TranslateService
}];
LoginComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_14__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_15__.Component)({
  selector: "login",
  template: _login_html_ngResource__WEBPACK_IMPORTED_MODULE_0__
})], LoginComponent);


/***/ }),

/***/ 3679:
/*!*******************************************************************!*\
  !*** ./src/app/components/name-in-languages/name-in-languages.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NameInLanguagesComponent": () => (/* binding */ NameInLanguagesComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! tslib */ 2321);
/* harmony import */ var _name_in_languages_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./name-in-languages.html?ngResource */ 6520);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ngx-translate/core */ 8699);
/* harmony import */ var src_app_services_select_options_select_options_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/select-options/select-options.service */ 712);
/* harmony import */ var _abstract_forms_simple_form__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../abstract/forms/simple-form */ 328);







let NameInLanguagesComponent = class NameInLanguagesComponent extends _abstract_forms_simple_form__WEBPACK_IMPORTED_MODULE_2__.SimpleFormComponent {
  constructor(formBuilder, selectOptionsService, translate) {
    super(formBuilder);
    this.formBuilder = formBuilder;
    this.selectOptionsService = selectOptionsService;
    this.translate = translate;
    this.isValid = new _angular_core__WEBPACK_IMPORTED_MODULE_3__.EventEmitter();
  }
  ngOnInit() {
    this.selectOptionsService.getLanguages().subscribe(languages => {
      this.languages = languages;
      this.createForm();
      if (this.nameInLanguages) {
        this.updateForm();
        this.isValid.emit(true);
      }
      if (this.disabled) {
        this.form.disable();
      } else {
        this.form.enable();
      }
    });
  }
  getNameInLanguages() {
    const data = [];
    this.languages.forEach(l => {
      data.push({
        LanguageId: Number(l.value),
        Name: this.form.controls[l.label].value
      });
    });
    return data;
  }
  onChangeInput() {
    let isFormValid = true;
    Object.keys(this.form.controls).forEach(key => {
      var _a, _b;
      isFormValid = isFormValid && ((_b = (_a = this.form.get(key)) === null || _a === void 0 ? void 0 : _a.valid) !== null && _b !== void 0 ? _b : true);
    });
    this.isValid.emit(isFormValid);
  }
  createForm() {
    const group = {};
    this.languages.forEach(l => {
      group[l.label] = new _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormControl('');
      group[l.label].setValidators(_angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.required);
    });
    super.createForm(group, true);
  }
  updateForm() {
    this.languages.forEach(l => {
      const data = this.nameInLanguages.find(d => d.LanguageId == l.value);
      this.form.controls[l.label].patchValue(data === null || data === void 0 ? void 0 : data.Name);
    });
  }
};
NameInLanguagesComponent.ctorParameters = () => [{
  type: _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormBuilder
}, {
  type: src_app_services_select_options_select_options_service__WEBPACK_IMPORTED_MODULE_1__.SelectOptionsService
}, {
  type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_5__.TranslateService
}];
NameInLanguagesComponent.propDecorators = {
  disabled: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.Input,
    args: ['disabled']
  }],
  nameInLanguages: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.Input,
    args: ['nameInLanguages']
  }],
  isValid: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.Output,
    args: ['isValid']
  }]
};
NameInLanguagesComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.Component)({
  selector: 'name-in-languages',
  template: _name_in_languages_html_ngResource__WEBPACK_IMPORTED_MODULE_0__
})], NameInLanguagesComponent);


/***/ }),

/***/ 6487:
/*!****************************************************************************!*\
  !*** ./src/app/components/representatives/client-representative-create.ts ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ClientRepresentativeCreationComponent": () => (/* binding */ ClientRepresentativeCreationComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! tslib */ 2321);
/* harmony import */ var _client_representative_create_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./client-representative-create.html?ngResource */ 5730);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var src_app_routes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/routes */ 1311);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/router */ 124);
/* harmony import */ var src_app_interfaces_address__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/interfaces/address */ 2047);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @ngx-translate/core */ 8699);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/common/http */ 8987);
/* harmony import */ var src_app_api_routes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/api-routes */ 2061);
/* harmony import */ var src_app_services_messages_dialog_message_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/messages/dialog-message.service */ 1323);
/* harmony import */ var src_app_services_errors_error_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/services/errors/error.service */ 8813);
/* harmony import */ var src_app_services_messages_console_message_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/services/messages/console-message.service */ 5289);
/* harmony import */ var primeng_dynamicdialog__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! primeng/dynamicdialog */ 2648);
/* harmony import */ var _abstract_forms_openable_as_dialog_form__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../abstract/forms/openable-as-dialog-form */ 2661);
/* harmony import */ var src_app_enums_form_mode_enum__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/enums/form-mode-enum */ 7673);
















let ClientRepresentativeCreationComponent = class ClientRepresentativeCreationComponent extends _abstract_forms_openable_as_dialog_form__WEBPACK_IMPORTED_MODULE_7__.OpenableAsDialogForm {
  constructor(consoleMessageService, dialogMessageService, errorService, formBuilder, httpClient, openedAsDialogConfig, openedAsDialogRef, router, translate) {
    super(consoleMessageService, dialogMessageService, 'ClientRepresentative', errorService, formBuilder, httpClient, src_app_enums_form_mode_enum__WEBPACK_IMPORTED_MODULE_8__.FormModeEnum.Creation, openedAsDialogConfig, openedAsDialogRef, router, src_app_api_routes__WEBPACK_IMPORTED_MODULE_3__.ApiRoutes.clientRepresentative.post, translate, src_app_routes__WEBPACK_IMPORTED_MODULE_1__.Routes.clientRepresentatives.navigations.list);
    this.consoleMessageService = consoleMessageService;
    this.dialogMessageService = dialogMessageService;
    this.errorService = errorService;
    this.formBuilder = formBuilder;
    this.httpClient = httpClient;
    this.openedAsDialogConfig = openedAsDialogConfig;
    this.openedAsDialogRef = openedAsDialogRef;
    this.router = router;
    this.translate = translate;
    this.beforeSubmitionCustomOperationsHandler = this.prepareClientRepresentativeCreationModel;
    this.clientRepresentativeAddressRequiredFields = [src_app_interfaces_address__WEBPACK_IMPORTED_MODULE_2__.addressFormFields.City, src_app_interfaces_address__WEBPACK_IMPORTED_MODULE_2__.addressFormFields.Country, src_app_interfaces_address__WEBPACK_IMPORTED_MODULE_2__.addressFormFields.Email, src_app_interfaces_address__WEBPACK_IMPORTED_MODULE_2__.addressFormFields.PhoneNumber, src_app_interfaces_address__WEBPACK_IMPORTED_MODULE_2__.addressFormFields.PostalCode, src_app_interfaces_address__WEBPACK_IMPORTED_MODULE_2__.addressFormFields.StreetName, src_app_interfaces_address__WEBPACK_IMPORTED_MODULE_2__.addressFormFields.StreetNumber];
    this.createForm({
      FirstName: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.required],
      LastName: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.required]
    });
  }
  get shouldActionsBeDisabled() {
    var _a, _b;
    return super.shouldActionsBeDisabled || ((_b = (_a = this.addressForm) === null || _a === void 0 ? void 0 : _a.form.invalid) !== null && _b !== void 0 ? _b : false);
  }
  ngOnInit() {}
  getClientRepresentativeClientId() {
    return this._dialogConfigData ? this._dialogConfigData.ClientId : this.clientId;
  }
  prepareClientRepresentativeCreationModel() {
    const clientRepresentativeAddress = {
      ApartmentNumber: this.addressForm.form.value.ApartmentNumber,
      City: this.addressForm.form.value.City,
      Country: {
        Id: this.addressForm.form.value.CountryId
      },
      Email: this.addressForm.form.value.Email,
      PhoneNumber: this.addressForm.form.value.PhoneNumber,
      PostalCode: this.addressForm.form.value.PostalCode,
      StreetName: this.addressForm.form.value.StreetName,
      StreetNumber: this.addressForm.form.value.StreetNumber
    };
    const clientRepresentative = {
      Address: clientRepresentativeAddress,
      ClientId: this.getClientRepresentativeClientId(),
      FirstName: this.form.value.FirstName,
      LastName: this.form.value.LastName
    };
    return clientRepresentative;
  }
};
ClientRepresentativeCreationComponent.OPEN_AS_DIALOG_SETTINGS = {
  header: 'ClientRepresentative.Create',
  height: 'auto',
  modal: true,
  style: {
    margin: 0,
    padding: 0
  },
  width: '50vw'
};
ClientRepresentativeCreationComponent.ctorParameters = () => [{
  type: src_app_services_messages_console_message_service__WEBPACK_IMPORTED_MODULE_6__.ConsoleMessageService
}, {
  type: src_app_services_messages_dialog_message_service__WEBPACK_IMPORTED_MODULE_4__.DialogMessageService
}, {
  type: src_app_services_errors_error_service__WEBPACK_IMPORTED_MODULE_5__.ErrorService
}, {
  type: _angular_forms__WEBPACK_IMPORTED_MODULE_9__.FormBuilder
}, {
  type: _angular_common_http__WEBPACK_IMPORTED_MODULE_10__.HttpClient
}, {
  type: primeng_dynamicdialog__WEBPACK_IMPORTED_MODULE_11__.DynamicDialogConfig
}, {
  type: primeng_dynamicdialog__WEBPACK_IMPORTED_MODULE_11__.DynamicDialogRef
}, {
  type: _angular_router__WEBPACK_IMPORTED_MODULE_12__.Router
}, {
  type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_13__.TranslateService
}];
ClientRepresentativeCreationComponent.propDecorators = {
  clientId: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_14__.Input,
    args: ['clientId']
  }],
  addressForm: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_14__.ViewChild,
    args: ['addressForm']
  }]
};
ClientRepresentativeCreationComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_15__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_14__.Component)({
  selector: "client-representative-create",
  template: _client_representative_create_html_ngResource__WEBPACK_IMPORTED_MODULE_0__
})], ClientRepresentativeCreationComponent);


/***/ }),

/***/ 3291:
/*!*****************************************************************************!*\
  !*** ./src/app/components/representatives/client-representative-details.ts ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ClientRepresentativeDetailsComponent": () => (/* binding */ ClientRepresentativeDetailsComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! tslib */ 2321);
/* harmony import */ var _client_representative_details_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./client-representative-details.html?ngResource */ 5685);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var primeng_dynamicdialog__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! primeng/dynamicdialog */ 2648);
/* harmony import */ var src_app_interfaces_address__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/interfaces/address */ 2047);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/router */ 124);
/* harmony import */ var src_app_routes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/routes */ 1311);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @ngx-translate/core */ 8699);
/* harmony import */ var _abstract_forms_access_control_openable_as_dialog_form__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../abstract/forms/access-control-openable-as-dialog-form */ 4562);
/* harmony import */ var src_app_services_authorization_authorization_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/authorization/authorization.service */ 6079);
/* harmony import */ var src_app_enums_user_permission_enum__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/enums/user-permission-enum */ 8235);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/common/http */ 8987);
/* harmony import */ var src_app_api_routes__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/api-routes */ 2061);
/* harmony import */ var primeng_api__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! primeng/api */ 4356);
/* harmony import */ var src_app_services_messages_dialog_message_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/services/messages/dialog-message.service */ 1323);
/* harmony import */ var src_app_services_errors_error_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/services/errors/error.service */ 8813);
/* harmony import */ var src_app_services_messages_console_message_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/services/messages/console-message.service */ 5289);
/* harmony import */ var src_app_enums_form_mode_enum__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/enums/form-mode-enum */ 7673);
/* harmony import */ var src_app_tools_stringBuilder__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! src/app/tools/stringBuilder */ 6856);




















let ClientRepresentativeDetailsComponent = class ClientRepresentativeDetailsComponent extends _abstract_forms_access_control_openable_as_dialog_form__WEBPACK_IMPORTED_MODULE_3__.AccessControlOpenableAsDialogForm {
  constructor(activatedRoute, authorizationService, confirmationService, consoleMessageService, dialogMessageService, errorService, formBuilder, httpClient, openedAsDialogConfig, openedAsDialogRef, router, translate) {
    super(activatedRoute, authorizationService, confirmationService, consoleMessageService, 'deleteClientRepresentative', src_app_api_routes__WEBPACK_IMPORTED_MODULE_6__.ApiRoutes.clientRepresentative["delete"], dialogMessageService, 'ClientRepresentative', errorService, formBuilder, httpClient, src_app_enums_form_mode_enum__WEBPACK_IMPORTED_MODULE_10__.FormModeEnum.Edition, openedAsDialogConfig, openedAsDialogRef, router, src_app_api_routes__WEBPACK_IMPORTED_MODULE_6__.ApiRoutes.clientRepresentative.put, translate, [src_app_enums_user_permission_enum__WEBPACK_IMPORTED_MODULE_5__.UserPermissionEnum.ClientRepresentatives_CanModify], src_app_routes__WEBPACK_IMPORTED_MODULE_2__.Routes.clientRepresentatives.navigations.list);
    this.activatedRoute = activatedRoute;
    this.authorizationService = authorizationService;
    this.confirmationService = confirmationService;
    this.consoleMessageService = consoleMessageService;
    this.dialogMessageService = dialogMessageService;
    this.errorService = errorService;
    this.formBuilder = formBuilder;
    this.httpClient = httpClient;
    this.openedAsDialogConfig = openedAsDialogConfig;
    this.openedAsDialogRef = openedAsDialogRef;
    this.router = router;
    this.translate = translate;
    this.beforeSubmitionCustomOperationsHandler = this.prepareClientRepresentativeDetailsModel;
    this.afterSubmitionCustomOperationsHandler = undefined;
    this.deletedEntityInstanceIdentificationInitializer = this.getEntityInstanceName;
    this.clientRepresentativeAddressRequiredFields = [src_app_interfaces_address__WEBPACK_IMPORTED_MODULE_1__.addressFormFields.City, src_app_interfaces_address__WEBPACK_IMPORTED_MODULE_1__.addressFormFields.Country, src_app_interfaces_address__WEBPACK_IMPORTED_MODULE_1__.addressFormFields.Email, src_app_interfaces_address__WEBPACK_IMPORTED_MODULE_1__.addressFormFields.PhoneNumber, src_app_interfaces_address__WEBPACK_IMPORTED_MODULE_1__.addressFormFields.PostalCode, src_app_interfaces_address__WEBPACK_IMPORTED_MODULE_1__.addressFormFields.StreetName, src_app_interfaces_address__WEBPACK_IMPORTED_MODULE_1__.addressFormFields.StreetNumber];
    this.createForm({
      FirstName: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_12__.Validators.required],
      LastName: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_12__.Validators.required]
    });
    this.loadClientRepresentative();
  }
  get shouldActionsBeDisabled() {
    var _a, _b;
    return super.shouldActionsBeDisabled || ((_b = (_a = this.addressForm) === null || _a === void 0 ? void 0 : _a.form.invalid) !== null && _b !== void 0 ? _b : false);
  }
  ngOnInit() {}
  getEntityInstanceName() {
    return new src_app_tools_stringBuilder__WEBPACK_IMPORTED_MODULE_11__.StringBuilder(this.clientRepresentative.LastName).append(' ').append(this.clientRepresentative.FirstName).toString();
  }
  loadClientRepresentative() {
    if (!this.entityId) return;
    this.httpClient.get(src_app_api_routes__WEBPACK_IMPORTED_MODULE_6__.ApiRoutes.clientRepresentative.getById(this.entityId)).subscribe(result => {
      this.clientRepresentative = result;
      this.updateForm({
        FirstName: this.clientRepresentative.FirstName,
        LastName: this.clientRepresentative.LastName
      });
    });
  }
  prepareClientRepresentativeDetailsModel() {
    const clientRepresentativeAddress = {
      ApartmentNumber: this.addressForm.form.value.ApartmentNumber,
      City: this.addressForm.form.value.City,
      Country: {
        Id: this.addressForm.form.value.CountryId
      },
      Email: this.addressForm.form.value.Email,
      Id: this.addressForm.form.value.Id,
      PhoneNumber: this.addressForm.form.value.PhoneNumber,
      PostalCode: this.addressForm.form.value.PostalCode,
      StreetName: this.addressForm.form.value.StreetName,
      StreetNumber: this.addressForm.form.value.StreetNumber
    };
    const clientRepresentative = {
      Address: clientRepresentativeAddress,
      ClientId: this.clientRepresentative.ClientId,
      FirstName: this.form.value.FirstName,
      Id: this.entityId,
      LastName: this.form.value.LastName
    };
    return clientRepresentative;
  }
};
ClientRepresentativeDetailsComponent.OPEN_AS_DIALOG_SETTINGS = {
  header: 'ClientRepresentative.Details',
  height: 'auto',
  modal: true,
  style: {
    margin: 0,
    padding: 0
  },
  width: '50vw'
};
ClientRepresentativeDetailsComponent.ctorParameters = () => [{
  type: _angular_router__WEBPACK_IMPORTED_MODULE_13__.ActivatedRoute
}, {
  type: src_app_services_authorization_authorization_service__WEBPACK_IMPORTED_MODULE_4__.AuthorizationService
}, {
  type: primeng_api__WEBPACK_IMPORTED_MODULE_14__.ConfirmationService
}, {
  type: src_app_services_messages_console_message_service__WEBPACK_IMPORTED_MODULE_9__.ConsoleMessageService
}, {
  type: src_app_services_messages_dialog_message_service__WEBPACK_IMPORTED_MODULE_7__.DialogMessageService
}, {
  type: src_app_services_errors_error_service__WEBPACK_IMPORTED_MODULE_8__.ErrorService
}, {
  type: _angular_forms__WEBPACK_IMPORTED_MODULE_12__.FormBuilder
}, {
  type: _angular_common_http__WEBPACK_IMPORTED_MODULE_15__.HttpClient
}, {
  type: primeng_dynamicdialog__WEBPACK_IMPORTED_MODULE_16__.DynamicDialogConfig
}, {
  type: primeng_dynamicdialog__WEBPACK_IMPORTED_MODULE_16__.DynamicDialogRef
}, {
  type: _angular_router__WEBPACK_IMPORTED_MODULE_13__.Router
}, {
  type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_17__.TranslateService
}];
ClientRepresentativeDetailsComponent.propDecorators = {
  clientId: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_18__.Input,
    args: ['clientId']
  }],
  addressForm: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_18__.ViewChild,
    args: ['addressForm']
  }]
};
ClientRepresentativeDetailsComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_19__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_18__.Component)({
  selector: "client-representative-details",
  template: _client_representative_details_html_ngResource__WEBPACK_IMPORTED_MODULE_0__
})], ClientRepresentativeDetailsComponent);


/***/ }),

/***/ 9431:
/*!**************************************************************************!*\
  !*** ./src/app/components/representatives/client-representative-list.ts ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ClientRepresentativeListComponent": () => (/* binding */ ClientRepresentativeListComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! tslib */ 2321);
/* harmony import */ var _client_representative_list_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./client-representative-list.html?ngResource */ 6875);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _abstract_access_controls_access_control__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../abstract/access-controls/access-control */ 6378);
/* harmony import */ var primeng_api__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! primeng/api */ 4356);
/* harmony import */ var src_app_services_authorization_authorization_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/authorization/authorization.service */ 6079);
/* harmony import */ var src_app_enums_user_permission_enum__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/enums/user-permission-enum */ 8235);
/* harmony import */ var src_app_enums_filter_type_enum__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/enums/filter-type-enum */ 3501);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/router */ 124);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @ngx-translate/core */ 8699);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/common/http */ 8987);
/* harmony import */ var src_app_api_routes__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/api-routes */ 2061);
/* harmony import */ var src_app_services_messages_dialog_message_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/services/messages/dialog-message.service */ 1323);
/* harmony import */ var src_app_services_errors_error_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/services/errors/error.service */ 8813);
/* harmony import */ var src_app_services_messages_console_message_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/services/messages/console-message.service */ 5289);
/* harmony import */ var src_app_services_filters_filter_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/services/filters/filter.service */ 9865);
/* harmony import */ var primeng_dynamicdialog__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! primeng/dynamicdialog */ 2648);
/* harmony import */ var _client_representative_create__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./client-representative-create */ 6487);
/* harmony import */ var _client_representative_details__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./client-representative-details */ 3291);



















let ClientRepresentativeListComponent = class ClientRepresentativeListComponent extends _abstract_access_controls_access_control__WEBPACK_IMPORTED_MODULE_1__.AccessControlComponent {
  constructor(authorizationService, confirmationService, consoleMessageService, dialogMessageService, dialogService, errorService, filterService, httpClient, router, translate) {
    super(authorizationService, confirmationService, consoleMessageService, 'deleteClientRepresentative', src_app_api_routes__WEBPACK_IMPORTED_MODULE_5__.ApiRoutes.clientRepresentative["delete"], dialogMessageService, 'ClientRepresentative', errorService, httpClient, () => {
      this._dataPopulator.clientRepresentatives.get(this.tempLazyLoadEvent).subscribe(result => this._dataPopulator.clientRepresentatives.set(result));
    }, router, translate, [src_app_enums_user_permission_enum__WEBPACK_IMPORTED_MODULE_3__.UserPermissionEnum.ClientRepresentatives_CanModify]);
    this.authorizationService = authorizationService;
    this.confirmationService = confirmationService;
    this.consoleMessageService = consoleMessageService;
    this.dialogMessageService = dialogMessageService;
    this.dialogService = dialogService;
    this.errorService = errorService;
    this.filterService = filterService;
    this.httpClient = httpClient;
    this.router = router;
    this.translate = translate;
    this.deletedEntityInstanceIdentificationInitializer = this.getEntityInstanceName;
    this._dataPopulator = {
      clientRepresentatives: {
        get: event => this.getClientRepresentatives(event),
        set: clientRepresentatives => this.setClientRepresentatives(clientRepresentatives)
      }
    };
  }
  ngOnInit() {
    this.cols = [{
      field: 'LastName',
      header: 'ClientRepresentative.LastName',
      width: '30%',
      filterType: src_app_enums_filter_type_enum__WEBPACK_IMPORTED_MODULE_4__.FilterTypeEnum.Text,
      applyGlobalFiltering: true
    }, {
      field: 'FirstName',
      header: 'ClientRepresentative.FirstName',
      width: '20%',
      filterType: src_app_enums_filter_type_enum__WEBPACK_IMPORTED_MODULE_4__.FilterTypeEnum.Text,
      applyGlobalFiltering: true
    }, {
      field: 'Email',
      header: 'ClientRepresentative.Email',
      width: '30%',
      filterType: src_app_enums_filter_type_enum__WEBPACK_IMPORTED_MODULE_4__.FilterTypeEnum.Text,
      applyGlobalFiltering: true
    }, {
      field: 'PhoneNumber',
      header: 'ClientRepresentative.PhoneNumber',
      width: '20%',
      filterType: src_app_enums_filter_type_enum__WEBPACK_IMPORTED_MODULE_4__.FilterTypeEnum.Text,
      applyGlobalFiltering: true
    }, {
      field: 'Actions',
      header: '',
      width: '20%'
    }];
  }
  ngOnDestroy() {
    if (this.clientRepresentativeCreationDialog) {
      this.clientRepresentativeCreationDialog.close();
    }
  }
  loadClientRepresentativesLazy(event) {
    this.tempLazyLoadEvent = event;
    this._dataPopulator.clientRepresentatives.get(event).subscribe(result => this._dataPopulator.clientRepresentatives.set(result));
  }
  onCreate() {
    if (!this.clientId) return;
    this.openClientRepresentativeDialog();
  }
  onEdit(clientRepresentative) {
    this.openClientRepresentativeDialog(clientRepresentative);
  }
  getClientRepresentatives(event) {
    var _a;
    (_a = event.sortField) !== null && _a !== void 0 ? _a : event.sortField = this.cols[0].field;
    return this.httpClient.get(src_app_api_routes__WEBPACK_IMPORTED_MODULE_5__.ApiRoutes.clientRepresentative.getAll(event, this.cols, this.clientId));
  }
  getEntityInstanceName(clientRepresentative) {
    return `${clientRepresentative.LastName} ${clientRepresentative.FirstName}`;
  }
  openClientRepresentativeDialog(clientRepresentative) {
    const clientRepresentativeDialogConfigData = {
      ClientId: this.clientId,
      Id: clientRepresentative ? clientRepresentative.Id : undefined
    };
    this.clientRepresentativeCreationDialog = this.dialogService.open(clientRepresentative ? _client_representative_details__WEBPACK_IMPORTED_MODULE_11__.ClientRepresentativeDetailsComponent : _client_representative_create__WEBPACK_IMPORTED_MODULE_10__.ClientRepresentativeCreationComponent, clientRepresentative ? Object.assign(Object.assign({}, _client_representative_details__WEBPACK_IMPORTED_MODULE_11__.ClientRepresentativeDetailsComponent.OPEN_AS_DIALOG_SETTINGS), {
      data: clientRepresentativeDialogConfigData
    }) : Object.assign(Object.assign({}, _client_representative_create__WEBPACK_IMPORTED_MODULE_10__.ClientRepresentativeCreationComponent.OPEN_AS_DIALOG_SETTINGS), {
      data: clientRepresentativeDialogConfigData
    }));
    this.clientRepresentativeCreationDialog.onClose.subscribe(() => {
      this._dataPopulator.clientRepresentatives.get(this.tempLazyLoadEvent).subscribe(result => this._dataPopulator.clientRepresentatives.set(result));
    });
  }
  setClientRepresentatives(clientRepresentatives) {
    this.totalRecords = clientRepresentatives.TotalRowsCount;
    this.clientRepresentatives = clientRepresentatives.List;
  }
};
ClientRepresentativeListComponent.ctorParameters = () => [{
  type: src_app_services_authorization_authorization_service__WEBPACK_IMPORTED_MODULE_2__.AuthorizationService
}, {
  type: primeng_api__WEBPACK_IMPORTED_MODULE_12__.ConfirmationService
}, {
  type: src_app_services_messages_console_message_service__WEBPACK_IMPORTED_MODULE_8__.ConsoleMessageService
}, {
  type: src_app_services_messages_dialog_message_service__WEBPACK_IMPORTED_MODULE_6__.DialogMessageService
}, {
  type: primeng_dynamicdialog__WEBPACK_IMPORTED_MODULE_13__.DialogService
}, {
  type: src_app_services_errors_error_service__WEBPACK_IMPORTED_MODULE_7__.ErrorService
}, {
  type: src_app_services_filters_filter_service__WEBPACK_IMPORTED_MODULE_9__.FilterService
}, {
  type: _angular_common_http__WEBPACK_IMPORTED_MODULE_14__.HttpClient
}, {
  type: _angular_router__WEBPACK_IMPORTED_MODULE_15__.Router
}, {
  type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_16__.TranslateService
}];
ClientRepresentativeListComponent.propDecorators = {
  clientId: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_17__.Input,
    args: ['clientId']
  }],
  dataTable: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_17__.ViewChild,
    args: ['dataTable']
  }]
};
ClientRepresentativeListComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_18__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_17__.Component)({
  selector: "client-representative-list",
  template: _client_representative_list_html_ngResource__WEBPACK_IMPORTED_MODULE_0__
})], ClientRepresentativeListComponent);


/***/ }),

/***/ 7250:
/*!***************************************************************************************!*\
  !*** ./src/app/components/user-roles/fillers/user-role-permissions-filler-factory.ts ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UserRolePermissionsFillerFactory": () => (/* binding */ UserRolePermissionsFillerFactory)
/* harmony export */ });
/* harmony import */ var src_app_enums_form_mode_enum__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/enums/form-mode-enum */ 7673);
/* harmony import */ var _user_role_permissions_on_creation_filler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./user-role-permissions-on-creation-filler */ 2543);
/* harmony import */ var _user_role_permissions_on_edition_filler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./user-role-permissions-on-edition-filler */ 4685);



class UserRolePermissionsFillerFactory {
  static makeFiller(formMode, source, destinations) {
    let filler;
    switch (formMode) {
      case src_app_enums_form_mode_enum__WEBPACK_IMPORTED_MODULE_0__.FormModeEnum.Creation:
        filler = new _user_role_permissions_on_creation_filler__WEBPACK_IMPORTED_MODULE_1__.UserRolePermissionsOnCreationFiller(source, destinations);
        break;
      case src_app_enums_form_mode_enum__WEBPACK_IMPORTED_MODULE_0__.FormModeEnum.Edition:
        filler = new _user_role_permissions_on_edition_filler__WEBPACK_IMPORTED_MODULE_2__.UserRolePermissionsOnEditionFiller(source, destinations);
        break;
      default:
        throw new Error(`[${this.constructor.name}] Unsupported form mode.`);
    }
    return filler;
  }
}

/***/ }),

/***/ 1781:
/*!*******************************************************************************!*\
  !*** ./src/app/components/user-roles/fillers/user-role-permissions-filler.ts ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UserRolePermissionsFiller": () => (/* binding */ UserRolePermissionsFiller)
/* harmony export */ });
/* harmony import */ var src_app_icon_mapper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/icon-mapper */ 6554);

class UserRolePermissionsFiller {
  getIconStyleClassNameForPermission(permission) {
    return permission.Name.endsWith('.CanList') ? src_app_icon_mapper__WEBPACK_IMPORTED_MODULE_0__.LIST_ICON_NAME : permission.Name.endsWith('.CanModify') ? src_app_icon_mapper__WEBPACK_IMPORTED_MODULE_0__.MODIFY_ICON_NAME : src_app_icon_mapper__WEBPACK_IMPORTED_MODULE_0__.Icons[permission.Name];
  }
}

/***/ }),

/***/ 2543:
/*!*******************************************************************************************!*\
  !*** ./src/app/components/user-roles/fillers/user-role-permissions-on-creation-filler.ts ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UserRolePermissionsOnCreationFiller": () => (/* binding */ UserRolePermissionsOnCreationFiller)
/* harmony export */ });
/* harmony import */ var _user_role_permissions_filler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./user-role-permissions-filler */ 1781);
/* harmony import */ var src_app_icon_mapper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/icon-mapper */ 6554);
/* harmony import */ var _models_user_permission_node__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../models/user-permission-node */ 7010);



class UserRolePermissionsOnCreationFiller extends _user_role_permissions_filler__WEBPACK_IMPORTED_MODULE_0__.UserRolePermissionsFiller {
  constructor(source, destinations) {
    super();
    this.source = source;
    this.destinations = destinations;
  }
  createChildNode(permission) {
    const result = new _models_user_permission_node__WEBPACK_IMPORTED_MODULE_2__.UserPermissionNode();
    result.data = {
      icon: this.getIconStyleClassNameForPermission(permission),
      id: permission.Id,
      name: permission.Name,
      linkedPermissionIds: permission.LinkedPermissionsIds
    };
    return result;
  }
  createParentNode(permissionsGroup, children) {
    const result = new _models_user_permission_node__WEBPACK_IMPORTED_MODULE_2__.UserPermissionNode();
    result.children = children;
    result.data = {
      icon: src_app_icon_mapper__WEBPACK_IMPORTED_MODULE_1__.Icons[permissionsGroup.Name],
      id: null,
      name: permissionsGroup.Name,
      linkedPermissionIds: []
    };
    return result;
  }
  fill() {
    for (const permissionsGroup of this.source) {
      const permissionsGroupChildren = [];
      for (const permission of permissionsGroup.Permissions) {
        permissionsGroupChildren.push(this.createChildNode(permission));
      }
      this.destinations.allItems.push(this.createParentNode(permissionsGroup, permissionsGroupChildren));
    }
  }
}

/***/ }),

/***/ 4685:
/*!******************************************************************************************!*\
  !*** ./src/app/components/user-roles/fillers/user-role-permissions-on-edition-filler.ts ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UserRolePermissionsOnEditionFiller": () => (/* binding */ UserRolePermissionsOnEditionFiller)
/* harmony export */ });
/* harmony import */ var src_app_icon_mapper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/icon-mapper */ 6554);
/* harmony import */ var _user_role_permissions_filler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./user-role-permissions-filler */ 1781);
/* harmony import */ var _models_user_permission_node__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../models/user-permission-node */ 7010);



class UserRolePermissionsOnEditionFiller extends _user_role_permissions_filler__WEBPACK_IMPORTED_MODULE_1__.UserRolePermissionsFiller {
  constructor(source, destinations) {
    super();
    this.source = source;
    this.destinations = destinations;
  }
  createChildNode(permission) {
    const result = new _models_user_permission_node__WEBPACK_IMPORTED_MODULE_2__.UserPermissionNode();
    result.data = {
      icon: this.getIconStyleClassNameForPermission(permission),
      id: permission.Id,
      isSelected: permission.IsSelected,
      linkedPermissionIds: permission.LinkedPermissionsIds,
      name: permission.Name
    };
    result.expanded = true;
    result.partialSelected = permission.IsSelected ? false : undefined;
    return result;
  }
  createParentNode(permissionsGroup, children) {
    const result = new _models_user_permission_node__WEBPACK_IMPORTED_MODULE_2__.UserPermissionNode();
    result.children = children;
    result.data = {
      icon: src_app_icon_mapper__WEBPACK_IMPORTED_MODULE_0__.Icons[permissionsGroup.Name],
      id: null,
      isSelected: children.every(c => c.isSelected()),
      linkedPermissionIds: [],
      name: permissionsGroup.Name
    };
    result.expanded = true;
    result.partialSelected = !children.every(c => c.isSelected()) && children.some(c => c.isSelected());
    return result;
  }
  fill() {
    this.updateUserRolePermissions();
    this.updateUserRolePermissionsSelected();
  }
  updateUserRolePermissions() {
    for (const permissionsGroup of this.source) {
      const permissionsGroupChildren = [];
      for (const permission of permissionsGroup.Permissions) {
        permissionsGroupChildren.push(this.createChildNode(permission));
      }
      this.destinations.allItems.push(this.createParentNode(permissionsGroup, permissionsGroupChildren));
    }
  }
  updateUserRolePermissionsSelected() {
    for (const permissionNode of this.destinations.allItems) {
      if (permissionNode.hasChildren()) {
        for (const childPermissionNode of permissionNode.children) {
          this.destinations.selectedItems.tryPush(childPermissionNode);
        }
      }
      this.destinations.selectedItems.tryPush(permissionNode);
    }
  }
}

/***/ }),

/***/ 7010:
/*!**********************************************************************!*\
  !*** ./src/app/components/user-roles/models/user-permission-node.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UserPermissionNode": () => (/* binding */ UserPermissionNode)
/* harmony export */ });
class UserPermissionNode {
  constructor() {
    this.children = [];
  }
  hasChildren() {
    return this.children !== undefined && this.children.length > 0;
  }
  hasLinkedPermissions() {
    return this.data.linkedPermissionIds.length > 0;
  }
  isSelected() {
    var _a;
    return (_a = this.data.isSelected) !== null && _a !== void 0 ? _a : false;
  }
}

/***/ }),

/***/ 3746:
/*!***********************************************************!*\
  !*** ./src/app/components/user-roles/user-role-create.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UserRoleCreationComponent": () => (/* binding */ UserRoleCreationComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! tslib */ 2321);
/* harmony import */ var _user_role_create_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./user-role-create.html?ngResource */ 4035);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/common/http */ 8987);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var src_app_services_messages_console_message_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/messages/console-message.service */ 5289);
/* harmony import */ var src_app_services_errors_error_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/errors/error.service */ 8813);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var src_app_services_messages_dialog_message_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/messages/dialog-message.service */ 1323);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/router */ 124);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @ngx-translate/core */ 8699);
/* harmony import */ var src_app_routes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/routes */ 1311);
/* harmony import */ var src_app_api_routes__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/api-routes */ 2061);
/* harmony import */ var src_app_interfaces_user_role__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/interfaces/user-role */ 7940);
/* harmony import */ var _abstract_forms_form__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../abstract/forms/form */ 1151);
/* harmony import */ var src_app_enums_form_mode_enum__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/enums/form-mode-enum */ 7673);















let UserRoleCreationComponent = class UserRoleCreationComponent extends _abstract_forms_form__WEBPACK_IMPORTED_MODULE_7__.FormComponent {
  constructor(consoleMessageService, dialogMessageService, errorService, formBuilder, httpClient, router, translate) {
    super(consoleMessageService, dialogMessageService, 'UserRole', errorService, formBuilder, httpClient, src_app_enums_form_mode_enum__WEBPACK_IMPORTED_MODULE_8__.FormModeEnum.Creation, router, src_app_api_routes__WEBPACK_IMPORTED_MODULE_5__.ApiRoutes.userRole.post, translate, src_app_routes__WEBPACK_IMPORTED_MODULE_4__.Routes.userRoles.navigations.list);
    this.consoleMessageService = consoleMessageService;
    this.dialogMessageService = dialogMessageService;
    this.errorService = errorService;
    this.formBuilder = formBuilder;
    this.httpClient = httpClient;
    this.router = router;
    this.translate = translate;
    this.beforeSubmitionCustomOperationsHandler = this.prepareUserRoleCreationModel;
    this._dataPopulator = {
      userPermissions: {
        get: () => this.httpClient.get(src_app_api_routes__WEBPACK_IMPORTED_MODULE_5__.ApiRoutes.userRole.getUserRolePermissionsForCreation),
        set: userPermissions => this.groupedUserPermissions = userPermissions.List
      }
    };
    this.isNameInLanguagesValid = false;
    this.createForm();
  }
  ngOnInit() {
    this._dataPopulator.userPermissions.get().subscribe(result => this._dataPopulator.userPermissions.set(result));
  }
  onBack() {
    this.router.navigate([src_app_routes__WEBPACK_IMPORTED_MODULE_4__.Routes.userRoles.navigations.list]);
  }
  onIsNameInLanguagesValid(value) {
    this.isNameInLanguagesValid = value;
  }
  prepareUserRoleCreationModel() {
    const userRole = new src_app_interfaces_user_role__WEBPACK_IMPORTED_MODULE_6__.UserRoleCreationModel();
    userRole.NameInLanguages = this.nameInLanguages.getNameInLanguages();
    const permissionsSubmitted = this.userRolePermissions.getPermissionsSubmitted();
    for (const permission of permissionsSubmitted) {
      if (!userRole.doesPermissionExistWithinSelected(permission.Id)) {
        userRole.PermissionsSelected.push(permission);
      }
    }
    return userRole;
  }
};
UserRoleCreationComponent.ctorParameters = () => [{
  type: src_app_services_messages_console_message_service__WEBPACK_IMPORTED_MODULE_1__.ConsoleMessageService
}, {
  type: src_app_services_messages_dialog_message_service__WEBPACK_IMPORTED_MODULE_3__.DialogMessageService
}, {
  type: src_app_services_errors_error_service__WEBPACK_IMPORTED_MODULE_2__.ErrorService
}, {
  type: _angular_forms__WEBPACK_IMPORTED_MODULE_9__.FormBuilder
}, {
  type: _angular_common_http__WEBPACK_IMPORTED_MODULE_10__.HttpClient
}, {
  type: _angular_router__WEBPACK_IMPORTED_MODULE_11__.Router
}, {
  type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_12__.TranslateService
}];
UserRoleCreationComponent.propDecorators = {
  nameInLanguages: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_13__.ViewChild,
    args: ['nameInLanguages']
  }],
  userRolePermissions: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_13__.ViewChild,
    args: ['userRolePermissions']
  }]
};
UserRoleCreationComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_14__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_13__.Component)({
  selector: "user-role-create",
  template: _user_role_create_html_ngResource__WEBPACK_IMPORTED_MODULE_0__
})], UserRoleCreationComponent);


/***/ }),

/***/ 7424:
/*!************************************************************!*\
  !*** ./src/app/components/user-roles/user-role-details.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UserRoleDetailsComponent": () => (/* binding */ UserRoleDetailsComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! tslib */ 2321);
/* harmony import */ var _user_role_details_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./user-role-details.html?ngResource */ 2713);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/common/http */ 8987);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var src_app_services_messages_console_message_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/messages/console-message.service */ 5289);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/router */ 124);
/* harmony import */ var src_app_enums_user_permission_enum__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/enums/user-permission-enum */ 8235);
/* harmony import */ var primeng_api__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! primeng/api */ 4356);
/* harmony import */ var src_app_services_errors_error_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/errors/error.service */ 8813);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var src_app_services_messages_dialog_message_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/messages/dialog-message.service */ 1323);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @ngx-translate/core */ 8699);
/* harmony import */ var src_app_interfaces_user_permission__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/interfaces/user-permission */ 7110);
/* harmony import */ var src_app_routes__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/routes */ 1311);
/* harmony import */ var src_app_api_routes__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/api-routes */ 2061);
/* harmony import */ var src_app_interfaces_user_role__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/interfaces/user-role */ 7940);
/* harmony import */ var src_app_services_authorization_authorization_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/services/authorization/authorization.service */ 6079);
/* harmony import */ var _abstract_forms_access_control_form__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../abstract/forms/access-control-form */ 6739);
/* harmony import */ var src_app_enums_form_mode_enum__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! src/app/enums/form-mode-enum */ 7673);



















let UserRoleDetailsComponent = class UserRoleDetailsComponent extends _abstract_forms_access_control_form__WEBPACK_IMPORTED_MODULE_10__.AccessControlFormComponent {
  constructor(activatedRoute, authorizationService, confirmationService, consoleMessageService, dialogMessageService, errorService, formBuilder, httpClient, router, translate) {
    super(activatedRoute, authorizationService, confirmationService, consoleMessageService, 'deleteUserRole', src_app_api_routes__WEBPACK_IMPORTED_MODULE_7__.ApiRoutes.userRole["delete"], dialogMessageService, 'UserRole', errorService, formBuilder, httpClient, src_app_enums_form_mode_enum__WEBPACK_IMPORTED_MODULE_11__.FormModeEnum.Edition, router, src_app_api_routes__WEBPACK_IMPORTED_MODULE_7__.ApiRoutes.userRole.put, translate, [src_app_enums_user_permission_enum__WEBPACK_IMPORTED_MODULE_2__.UserPermissionEnum.UserRoles_CanModify], src_app_routes__WEBPACK_IMPORTED_MODULE_6__.Routes.userRoles.navigations.list);
    this.activatedRoute = activatedRoute;
    this.authorizationService = authorizationService;
    this.confirmationService = confirmationService;
    this.consoleMessageService = consoleMessageService;
    this.dialogMessageService = dialogMessageService;
    this.errorService = errorService;
    this.formBuilder = formBuilder;
    this.httpClient = httpClient;
    this.router = router;
    this.translate = translate;
    this.beforeSubmitionCustomOperationsHandler = this.prepareUserRoleDetailsModel;
    this.afterSubmitionCustomOperationsHandler = undefined;
    this.deletedEntityInstanceIdentificationInitializer = this.getEntityInstanceName;
    this.isNameInLanguagesValid = false;
    this.selectedUserPermissions = new src_app_interfaces_user_permission__WEBPACK_IMPORTED_MODULE_5__.SelectedUserPermissionNodeArray();
    this.userPermissionColumns = [];
    this.userPermissionGroups = [];
    this.createForm();
    this.loadUserRole();
  }
  ngOnInit() {}
  onBack() {
    this.router.navigate([src_app_routes__WEBPACK_IMPORTED_MODULE_6__.Routes.userRoles.navigations.list]);
  }
  onIsNameInLanguagesValid(value) {
    this.isNameInLanguagesValid = value;
  }
  getEntityInstanceName() {
    return this.userRole.Name;
  }
  loadUserRole() {
    if (!this.entityId) return;
    this.httpClient.get(src_app_api_routes__WEBPACK_IMPORTED_MODULE_7__.ApiRoutes.userRole.getById(this.entityId)).subscribe(result => {
      this.userRole = result;
      this.updateForm();
    });
  }
  updateForm() {
    if (!this.userRole) return;
    super.updateForm();
  }
  prepareUserRoleDetailsModel() {
    const userRole = new src_app_interfaces_user_role__WEBPACK_IMPORTED_MODULE_8__.UserRoleDetailsModel();
    userRole.Id = this.userRole.Id;
    userRole.NameInLanguages = this.nameInLanguages.getNameInLanguages();
    const permissionsSubmitted = this.userRolePermissions.getPermissionsSubmitted();
    for (const permission of permissionsSubmitted) {
      if (!userRole.doesPermissionExistWithinSelected(permission.Id)) {
        userRole.PermissionsSelected.push(permission);
      }
    }
    return userRole;
  }
};
UserRoleDetailsComponent.ctorParameters = () => [{
  type: _angular_router__WEBPACK_IMPORTED_MODULE_12__.ActivatedRoute
}, {
  type: src_app_services_authorization_authorization_service__WEBPACK_IMPORTED_MODULE_9__.AuthorizationService
}, {
  type: primeng_api__WEBPACK_IMPORTED_MODULE_13__.ConfirmationService
}, {
  type: src_app_services_messages_console_message_service__WEBPACK_IMPORTED_MODULE_1__.ConsoleMessageService
}, {
  type: src_app_services_messages_dialog_message_service__WEBPACK_IMPORTED_MODULE_4__.DialogMessageService
}, {
  type: src_app_services_errors_error_service__WEBPACK_IMPORTED_MODULE_3__.ErrorService
}, {
  type: _angular_forms__WEBPACK_IMPORTED_MODULE_14__.FormBuilder
}, {
  type: _angular_common_http__WEBPACK_IMPORTED_MODULE_15__.HttpClient
}, {
  type: _angular_router__WEBPACK_IMPORTED_MODULE_12__.Router
}, {
  type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_16__.TranslateService
}];
UserRoleDetailsComponent.propDecorators = {
  nameInLanguages: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_17__.ViewChild,
    args: ['nameInLanguages']
  }],
  userRolePermissions: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_17__.ViewChild,
    args: ['userRolePermissions']
  }]
};
UserRoleDetailsComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_18__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_17__.Component)({
  selector: 'user-role-details',
  template: _user_role_details_html_ngResource__WEBPACK_IMPORTED_MODULE_0__
})], UserRoleDetailsComponent);


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
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! tslib */ 2321);
/* harmony import */ var _user_role_list_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./user-role-list.html?ngResource */ 3136);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/common/http */ 8987);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @ngx-translate/core */ 8699);
/* harmony import */ var src_app_services_filters_filter_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/filters/filter.service */ 9865);
/* harmony import */ var primeng_api__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! primeng/api */ 4356);
/* harmony import */ var src_app_services_select_options_select_options_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/select-options/select-options.service */ 712);
/* harmony import */ var src_app_enums_filter_type_enum__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/enums/filter-type-enum */ 3501);
/* harmony import */ var src_app_api_routes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/api-routes */ 2061);
/* harmony import */ var src_app_services_messages_console_message_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/services/messages/console-message.service */ 5289);
/* harmony import */ var src_app_services_errors_error_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/services/errors/error.service */ 8813);
/* harmony import */ var src_app_services_messages_dialog_message_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/services/messages/dialog-message.service */ 1323);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/router */ 124);
/* harmony import */ var src_app_enums_user_permission_enum__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/enums/user-permission-enum */ 8235);
/* harmony import */ var src_app_routes__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/routes */ 1311);
/* harmony import */ var _abstract_access_controls_access_control__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../abstract/access-controls/access-control */ 6378);
/* harmony import */ var src_app_services_authorization_authorization_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! src/app/services/authorization/authorization.service */ 6079);


















let UserRoleListComponent = class UserRoleListComponent extends _abstract_access_controls_access_control__WEBPACK_IMPORTED_MODULE_10__.AccessControlComponent {
  constructor(authorizationService, confirmationService, consoleMessageService, dialogMessageService, errorService, filterService, httpClient, router, selectOptionsService, translate) {
    super(authorizationService, confirmationService, consoleMessageService, 'deleteUserRole', src_app_api_routes__WEBPACK_IMPORTED_MODULE_4__.ApiRoutes.userRole["delete"], dialogMessageService, 'UserRole', errorService, httpClient, () => {
      this._dataPopulator.userRoles.get(this.tempLazyLoadEvent).subscribe(result => this._dataPopulator.userRoles.set(result));
    }, router, translate, [src_app_enums_user_permission_enum__WEBPACK_IMPORTED_MODULE_8__.UserPermissionEnum.UserRoles_CanModify]);
    this.authorizationService = authorizationService;
    this.confirmationService = confirmationService;
    this.consoleMessageService = consoleMessageService;
    this.dialogMessageService = dialogMessageService;
    this.errorService = errorService;
    this.filterService = filterService;
    this.httpClient = httpClient;
    this.router = router;
    this.selectOptionsService = selectOptionsService;
    this.translate = translate;
    this.deletedEntityInstanceIdentificationInitializer = this.getEntityInstanceName;
    this._dataPopulator = {
      multiSelects: {
        userRoles: {
          get: () => this.getUserRoleMultiSelectData(),
          set: userRoles => this.setUserRoleMultiSelectData(userRoles)
        }
      },
      userRoles: {
        get: event => this.getUserRoles(event),
        set: userRoles => this.setUserRoles(userRoles)
      }
    };
  }
  ngOnInit() {
    this.cols = [{
      field: 'Id',
      header: 'UserRole.Id',
      width: '10%',
      filterType: src_app_enums_filter_type_enum__WEBPACK_IMPORTED_MODULE_3__.FilterTypeEnum.Numeric
    }, {
      field: 'Name',
      header: 'UserRole.Name',
      width: '70%',
      filterType: src_app_enums_filter_type_enum__WEBPACK_IMPORTED_MODULE_3__.FilterTypeEnum.Text,
      applyGlobalFiltering: true,
      replaceWith: 'Id'
    }, {
      field: 'Actions',
      header: '',
      width: '20%'
    }];
    this._dataPopulator.multiSelects.userRoles.get().subscribe(userRoles => this._dataPopulator.multiSelects.userRoles.set(userRoles));
  }
  loadUserRolesLazy(event) {
    this.tempLazyLoadEvent = event;
    this._dataPopulator.userRoles.get(event).subscribe(result => this._dataPopulator.userRoles.set(result));
  }
  onCreate() {
    this.router.navigate([src_app_routes__WEBPACK_IMPORTED_MODULE_9__.Routes.userRoles.navigations.creation]);
  }
  onEdit(userRole) {
    this.router.navigate([src_app_routes__WEBPACK_IMPORTED_MODULE_9__.Routes.userRoles.navigations.edition(userRole.Id)]);
  }
  getEntityInstanceName(userRole) {
    return userRole.Name;
  }
  getUserRoleMultiSelectData() {
    return this.selectOptionsService.getUserRoles();
  }
  getUserRoles(event) {
    var _a, _b;
    (_a = event.sortField) !== null && _a !== void 0 ? _a : event.sortField = (_b = this.cols[0]) === null || _b === void 0 ? void 0 : _b.field;
    return this.httpClient.get(src_app_api_routes__WEBPACK_IMPORTED_MODULE_4__.ApiRoutes.userRole.getAll(event, this.cols));
  }
  setUserRoleMultiSelectData(userRoles) {
    this.userRoleOptions = userRoles;
    const userRoleColumn = this.cols.find(c => c.field === "Name");
    if (userRoleColumn) {
      userRoleColumn.options = this.userRoleOptions;
    }
  }
  setUserRoles(userRoles) {
    this.totalRecords = userRoles.TotalRowsCount;
    this.userRoles = userRoles.List;
  }
};
UserRoleListComponent.ctorParameters = () => [{
  type: src_app_services_authorization_authorization_service__WEBPACK_IMPORTED_MODULE_11__.AuthorizationService
}, {
  type: primeng_api__WEBPACK_IMPORTED_MODULE_12__.ConfirmationService
}, {
  type: src_app_services_messages_console_message_service__WEBPACK_IMPORTED_MODULE_5__.ConsoleMessageService
}, {
  type: src_app_services_messages_dialog_message_service__WEBPACK_IMPORTED_MODULE_7__.DialogMessageService
}, {
  type: src_app_services_errors_error_service__WEBPACK_IMPORTED_MODULE_6__.ErrorService
}, {
  type: src_app_services_filters_filter_service__WEBPACK_IMPORTED_MODULE_1__.FilterService
}, {
  type: _angular_common_http__WEBPACK_IMPORTED_MODULE_13__.HttpClient
}, {
  type: _angular_router__WEBPACK_IMPORTED_MODULE_14__.Router
}, {
  type: src_app_services_select_options_select_options_service__WEBPACK_IMPORTED_MODULE_2__.SelectOptionsService
}, {
  type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_15__.TranslateService
}];
UserRoleListComponent.propDecorators = {
  dataTable: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_16__.ViewChild,
    args: ['dataTable']
  }]
};
UserRoleListComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_17__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_16__.Component)({
  selector: "user-role-list",
  template: _user_role_list_html_ngResource__WEBPACK_IMPORTED_MODULE_0__
})], UserRoleListComponent);


/***/ }),

/***/ 2650:
/*!****************************************************************!*\
  !*** ./src/app/components/user-roles/user-role-permissions.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UserRolePermissionsComponent": () => (/* binding */ UserRolePermissionsComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! tslib */ 2321);
/* harmony import */ var _user_role_permissions_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./user-role-permissions.html?ngResource */ 8698);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ngx-translate/core */ 8699);
/* harmony import */ var src_app_enums_form_mode_enum__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/enums/form-mode-enum */ 7673);
/* harmony import */ var src_app_interfaces_user_permission__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/interfaces/user-permission */ 7110);
/* harmony import */ var _fillers_user_role_permissions_filler_factory__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./fillers/user-role-permissions-filler-factory */ 7250);







let UserRolePermissionsComponent = class UserRolePermissionsComponent {
  constructor(translate) {
    this.translate = translate;
    this.selectedUserPermissionNodes = new src_app_interfaces_user_permission__WEBPACK_IMPORTED_MODULE_2__.SelectedUserPermissionNodeArray();
    this.userPermissionNodes = [];
    this.userRolePermissionColumns = [];
    this.formMode = src_app_enums_form_mode_enum__WEBPACK_IMPORTED_MODULE_1__.FormModeEnum.Creation;
    this.userRolePermissionColumns = [{
      icon: 'icon',
      field: 'name',
      header: 'UserPermission.Name'
    }];
  }
  ngOnInit() {
    _fillers_user_role_permissions_filler_factory__WEBPACK_IMPORTED_MODULE_3__.UserRolePermissionsFillerFactory.makeFiller(this.formMode, this.groupedUserPermissions, {
      allItems: this.userPermissionNodes,
      selectedItems: this.selectedUserPermissionNodes
    }).fill();
  }
  getPermissionsSubmitted() {
    const permissionsSubmitted = [];
    for (const permissionNode of this.selectedUserPermissionNodes) {
      if (!permissionNode.hasChildren()) {
        permissionsSubmitted.push({
          Id: permissionNode.data.id
        });
      } else {
        for (const childPermissionNode of permissionNode.children) {
          permissionsSubmitted.push({
            Id: childPermissionNode.data.id
          });
        }
      }
    }
    return permissionsSubmitted;
  }
  onPermissionSelected(permissionNode) {
    if (!permissionNode.hasLinkedPermissions()) return;
    for (const linkedPermissionId of permissionNode.data.linkedPermissionIds) {
      const isPermissionAlreadySelected = this.selectedUserPermissionNodes.find(p => p.data.id === linkedPermissionId);
      if (!isPermissionAlreadySelected) {
        const permissionToBeSelected = this.getPermissionNodeToBeSelected(linkedPermissionId);
        if (permissionToBeSelected) {
          this.selectedUserPermissionNodes.push(permissionToBeSelected);
        }
      }
    }
  }
  findPermissionById(permissionNode, idToFind) {
    if (permissionNode.data && permissionNode.data.id === idToFind) return permissionNode;
    if (permissionNode.hasChildren()) {
      for (const nodeChild of permissionNode.children) {
        const result = this.findPermissionById(nodeChild, idToFind);
        if (result) return result;
      }
    }
    return undefined;
  }
  getPermissionNodeToBeSelected(permissionId) {
    let permission;
    for (const userPermissionGroup of this.userPermissionNodes) {
      permission = this.findPermissionById(userPermissionGroup, permissionId);
      if (permission) return permission;
    }
    return permission;
  }
};
UserRolePermissionsComponent.ctorParameters = () => [{
  type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__.TranslateService
}];
UserRolePermissionsComponent.propDecorators = {
  formMode: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_5__.Input
  }],
  groupedUserPermissions: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_5__.Input
  }]
};
UserRolePermissionsComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.Component)({
  selector: 'user-role-permissions',
  template: _user_role_permissions_html_ngResource__WEBPACK_IMPORTED_MODULE_0__
})], UserRolePermissionsComponent);


/***/ }),

/***/ 9068:
/*!*************************************************!*\
  !*** ./src/app/components/users/user-create.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UserCreationComponent": () => (/* binding */ UserCreationComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! tslib */ 2321);
/* harmony import */ var _user_create_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./user-create.html?ngResource */ 7828);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/common/http */ 8987);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/router */ 124);
/* harmony import */ var src_app_services_select_options_select_options_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/select-options/select-options.service */ 712);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @ngx-translate/core */ 8699);
/* harmony import */ var src_app_tools_regexPatterns__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/tools/regexPatterns */ 6132);
/* harmony import */ var src_app_api_routes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/api-routes */ 2061);
/* harmony import */ var src_app_services_errors_error_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/errors/error.service */ 8813);
/* harmony import */ var src_app_services_messages_dialog_message_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/services/messages/dialog-message.service */ 1323);
/* harmony import */ var src_app_services_messages_console_message_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/services/messages/console-message.service */ 5289);
/* harmony import */ var src_app_routes__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/routes */ 1311);
/* harmony import */ var _abstract_forms_form__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../abstract/forms/form */ 1151);
/* harmony import */ var src_app_enums_form_mode_enum__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/enums/form-mode-enum */ 7673);
















let UserCreationComponent = class UserCreationComponent extends _abstract_forms_form__WEBPACK_IMPORTED_MODULE_8__.FormComponent {
  constructor(consoleMessageService, dialogMessageService, errorService, formBuilder, httpClient, router, selectOptionsService, translate) {
    super(consoleMessageService, dialogMessageService, 'User', errorService, formBuilder, httpClient, src_app_enums_form_mode_enum__WEBPACK_IMPORTED_MODULE_9__.FormModeEnum.Creation, router, src_app_api_routes__WEBPACK_IMPORTED_MODULE_3__.ApiRoutes.user.post, translate, src_app_routes__WEBPACK_IMPORTED_MODULE_7__.Routes.users.navigations.list);
    this.consoleMessageService = consoleMessageService;
    this.dialogMessageService = dialogMessageService;
    this.errorService = errorService;
    this.formBuilder = formBuilder;
    this.httpClient = httpClient;
    this.router = router;
    this.selectOptionsService = selectOptionsService;
    this.translate = translate;
    this.beforeSubmitionCustomOperationsHandler = this.prepareUserCreationModel;
    this.createForm({
      Email: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_10__.Validators.pattern(src_app_tools_regexPatterns__WEBPACK_IMPORTED_MODULE_2__.RegexPatterns.emailPattern)],
      FirstName: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_10__.Validators.required],
      IsActive: false,
      LanguageId: null,
      LastName: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_10__.Validators.required],
      Login: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_10__.Validators.required],
      Password: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_10__.Validators.pattern(src_app_tools_regexPatterns__WEBPACK_IMPORTED_MODULE_2__.RegexPatterns.passwordPattern)],
      UserRoleId: null
    });
  }
  ngOnInit() {
    this.populateDropdowns();
  }
  onBack() {
    this.router.navigate([src_app_routes__WEBPACK_IMPORTED_MODULE_7__.Routes.users.navigations.list]);
  }
  populateDropdowns() {
    this.selectOptionsService.getLanguages().subscribe(options => {
      this.languages = options;
    });
    this.selectOptionsService.getUserRoles().subscribe(options => {
      this.userRoles = options;
    });
  }
  prepareUserCreationModel() {
    const user = {
      Email: this.form.value.Email,
      FirstName: this.form.value.FirstName,
      IsActive: this.form.value.IsActive,
      LanguageId: this.form.value.LanguageId,
      LastName: this.form.value.LastName,
      Login: this.form.value.Login,
      Password: this.form.value.Password,
      UserRoleId: this.form.value.UserRoleId
    };
    return user;
  }
};
UserCreationComponent.ctorParameters = () => [{
  type: src_app_services_messages_console_message_service__WEBPACK_IMPORTED_MODULE_6__.ConsoleMessageService
}, {
  type: src_app_services_messages_dialog_message_service__WEBPACK_IMPORTED_MODULE_5__.DialogMessageService
}, {
  type: src_app_services_errors_error_service__WEBPACK_IMPORTED_MODULE_4__.ErrorService
}, {
  type: _angular_forms__WEBPACK_IMPORTED_MODULE_10__.FormBuilder
}, {
  type: _angular_common_http__WEBPACK_IMPORTED_MODULE_11__.HttpClient
}, {
  type: _angular_router__WEBPACK_IMPORTED_MODULE_12__.Router
}, {
  type: src_app_services_select_options_select_options_service__WEBPACK_IMPORTED_MODULE_1__.SelectOptionsService
}, {
  type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_13__.TranslateService
}];
UserCreationComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_14__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_15__.Component)({
  selector: "user-create",
  template: _user_create_html_ngResource__WEBPACK_IMPORTED_MODULE_0__
})], UserCreationComponent);


/***/ }),

/***/ 8635:
/*!**************************************************!*\
  !*** ./src/app/components/users/user-details.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UserDetailsComponent": () => (/* binding */ UserDetailsComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! tslib */ 2321);
/* harmony import */ var _user_details_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./user-details.html?ngResource */ 3537);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/common/http */ 8987);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/router */ 124);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @ngx-translate/core */ 8699);
/* harmony import */ var primeng_api__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! primeng/api */ 4356);
/* harmony import */ var src_app_api_routes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/api-routes */ 2061);
/* harmony import */ var src_app_enums_user_permission_enum__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/enums/user-permission-enum */ 8235);
/* harmony import */ var src_app_services_select_options_select_options_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/select-options/select-options.service */ 712);
/* harmony import */ var src_app_tools_primeNgHelper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/tools/primeNgHelper */ 3833);
/* harmony import */ var src_app_tools_regexPatterns__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/tools/regexPatterns */ 6132);
/* harmony import */ var src_app_services_errors_error_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/services/errors/error.service */ 8813);
/* harmony import */ var src_app_services_messages_dialog_message_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/services/messages/dialog-message.service */ 1323);
/* harmony import */ var src_app_services_messages_console_message_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/services/messages/console-message.service */ 5289);
/* harmony import */ var src_app_routes__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/routes */ 1311);
/* harmony import */ var src_app_services_authorization_authorization_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/services/authorization/authorization.service */ 6079);
/* harmony import */ var _abstract_forms_access_control_form__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../abstract/forms/access-control-form */ 6739);
/* harmony import */ var src_app_enums_form_mode_enum__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! src/app/enums/form-mode-enum */ 7673);
/* harmony import */ var src_app_tools_stringBuilder__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! src/app/tools/stringBuilder */ 6856);





















let UserDetailsComponent = class UserDetailsComponent extends _abstract_forms_access_control_form__WEBPACK_IMPORTED_MODULE_11__.AccessControlFormComponent {
  constructor(activatedRoute, authorizationService, confirmationService, consoleMessageService, dialogMessageService, errorService, formBuilder, httpClient, router, selectOptionsService, translate) {
    super(activatedRoute, authorizationService, confirmationService, consoleMessageService, 'deleteUser', src_app_api_routes__WEBPACK_IMPORTED_MODULE_1__.ApiRoutes.user["delete"], dialogMessageService, 'User', errorService, formBuilder, httpClient, src_app_enums_form_mode_enum__WEBPACK_IMPORTED_MODULE_12__.FormModeEnum.Edition, router, src_app_api_routes__WEBPACK_IMPORTED_MODULE_1__.ApiRoutes.user.put, translate, [src_app_enums_user_permission_enum__WEBPACK_IMPORTED_MODULE_2__.UserPermissionEnum.Users_CanModify], src_app_routes__WEBPACK_IMPORTED_MODULE_9__.Routes.users.navigations.list);
    this.activatedRoute = activatedRoute;
    this.authorizationService = authorizationService;
    this.confirmationService = confirmationService;
    this.consoleMessageService = consoleMessageService;
    this.dialogMessageService = dialogMessageService;
    this.errorService = errorService;
    this.formBuilder = formBuilder;
    this.httpClient = httpClient;
    this.router = router;
    this.selectOptionsService = selectOptionsService;
    this.translate = translate;
    this.beforeSubmitionCustomOperationsHandler = this.prepareUserDetailsModel;
    this.afterSubmitionCustomOperationsHandler = undefined;
    this.deletedEntityInstanceIdentificationInitializer = this.getEntityInstanceName;
    this.createForm({
      CreatedOn: [{
        value: '',
        disabled: true
      }],
      Email: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_14__.Validators.pattern(src_app_tools_regexPatterns__WEBPACK_IMPORTED_MODULE_5__.RegexPatterns.emailPattern)],
      FirstName: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_14__.Validators.required],
      IsActive: false,
      LastName: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_14__.Validators.required],
      Login: [{
        value: '',
        disabled: true
      }],
      UserRoleId: null,
      Password: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_14__.Validators.pattern(src_app_tools_regexPatterns__WEBPACK_IMPORTED_MODULE_5__.RegexPatterns.passwordPattern)]
    });
    this.loadUser();
  }
  ngOnInit() {
    this.populateDropdowns();
  }
  onBack() {
    this.router.navigate([src_app_routes__WEBPACK_IMPORTED_MODULE_9__.Routes.users.navigations.list]);
  }
  getEntityInstanceName() {
    return new src_app_tools_stringBuilder__WEBPACK_IMPORTED_MODULE_13__.StringBuilder(this.user.LastName).append(' ').append(this.user.FirstName).toString();
  }
  isPasswordFieldFilled() {
    return this.form.value.Password.length > 0;
  }
  loadUser() {
    if (!this.entityId) return;
    this.httpClient.get(src_app_api_routes__WEBPACK_IMPORTED_MODULE_1__.ApiRoutes.user.getById(this.entityId)).subscribe(result => {
      var _a;
      this.user = result;
      this.updateForm({
        CreatedOn: src_app_tools_primeNgHelper__WEBPACK_IMPORTED_MODULE_4__.PrimeNgHelper.getDateFromCalendarAsString(new Date((_a = this.user.CreatedOn) !== null && _a !== void 0 ? _a : "")),
        Email: this.user.Email,
        FirstName: this.user.FirstName,
        IsActive: this.user.IsActive,
        LastName: this.user.LastName,
        Login: this.user.Login,
        UserRoleId: this.user.UserRoleId.toString()
      });
    });
  }
  populateDropdowns() {
    this.selectOptionsService.getUserRoles().subscribe(options => {
      this.userRoles = options;
    });
  }
  prepareUserDetailsModel() {
    const user = {
      Email: this.form.value.Email,
      FirstName: this.form.value.FirstName,
      Id: this.user.Id,
      IsActive: this.form.value.IsActive,
      LastName: this.form.value.LastName,
      UserRoleId: this.form.value.UserRoleId
    };
    if (this.isPasswordFieldFilled()) {
      user.Password = this.form.value.Password;
    }
    return user;
  }
};
UserDetailsComponent.ctorParameters = () => [{
  type: _angular_router__WEBPACK_IMPORTED_MODULE_15__.ActivatedRoute
}, {
  type: src_app_services_authorization_authorization_service__WEBPACK_IMPORTED_MODULE_10__.AuthorizationService
}, {
  type: primeng_api__WEBPACK_IMPORTED_MODULE_16__.ConfirmationService
}, {
  type: src_app_services_messages_console_message_service__WEBPACK_IMPORTED_MODULE_8__.ConsoleMessageService
}, {
  type: src_app_services_messages_dialog_message_service__WEBPACK_IMPORTED_MODULE_7__.DialogMessageService
}, {
  type: src_app_services_errors_error_service__WEBPACK_IMPORTED_MODULE_6__.ErrorService
}, {
  type: _angular_forms__WEBPACK_IMPORTED_MODULE_14__.FormBuilder
}, {
  type: _angular_common_http__WEBPACK_IMPORTED_MODULE_17__.HttpClient
}, {
  type: _angular_router__WEBPACK_IMPORTED_MODULE_15__.Router
}, {
  type: src_app_services_select_options_select_options_service__WEBPACK_IMPORTED_MODULE_3__.SelectOptionsService
}, {
  type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_18__.TranslateService
}];
UserDetailsComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_19__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_20__.Component)({
  selector: "user-details",
  template: _user_details_html_ngResource__WEBPACK_IMPORTED_MODULE_0__
})], UserDetailsComponent);


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
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! tslib */ 2321);
/* harmony import */ var _user_list_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./user-list.html?ngResource */ 4921);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/common/http */ 8987);
/* harmony import */ var primeng_api__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! primeng/api */ 4356);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @ngx-translate/core */ 8699);
/* harmony import */ var _services_filters_filter_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/filters/filter.service */ 9865);
/* harmony import */ var src_app_services_select_options_select_options_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/select-options/select-options.service */ 712);
/* harmony import */ var src_app_api_routes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/api-routes */ 2061);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/router */ 124);
/* harmony import */ var src_app_tools_stringBuilder__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/tools/stringBuilder */ 6856);
/* harmony import */ var src_app_enums_user_permission_enum__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/enums/user-permission-enum */ 8235);
/* harmony import */ var src_app_services_errors_error_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/services/errors/error.service */ 8813);
/* harmony import */ var src_app_services_messages_dialog_message_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/services/messages/dialog-message.service */ 1323);
/* harmony import */ var src_app_services_messages_console_message_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/services/messages/console-message.service */ 5289);
/* harmony import */ var src_app_routes__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/routes */ 1311);
/* harmony import */ var _abstract_access_controls_access_control__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../abstract/access-controls/access-control */ 6378);
/* harmony import */ var src_app_services_authorization_authorization_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! src/app/services/authorization/authorization.service */ 6079);
/* harmony import */ var src_app_enums_filter_type_enum__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! src/app/enums/filter-type-enum */ 3501);



















let UserListComponent = class UserListComponent extends _abstract_access_controls_access_control__WEBPACK_IMPORTED_MODULE_10__.AccessControlComponent {
  constructor(authorizationService, confirmationService, consoleMessageService, dialogMessageService, errorService, filterService, httpClient, router, selectOptionsService, translate) {
    super(authorizationService, confirmationService, consoleMessageService, 'deleteUser', src_app_api_routes__WEBPACK_IMPORTED_MODULE_3__.ApiRoutes.user["delete"], dialogMessageService, 'User', errorService, httpClient, () => {
      this._dataPopulator.users.get(this.tempLazyLoadEvent).subscribe(result => this._dataPopulator.users.set(result));
    }, router, translate, [src_app_enums_user_permission_enum__WEBPACK_IMPORTED_MODULE_5__.UserPermissionEnum.Users_CanModify]);
    this.authorizationService = authorizationService;
    this.confirmationService = confirmationService;
    this.consoleMessageService = consoleMessageService;
    this.dialogMessageService = dialogMessageService;
    this.errorService = errorService;
    this.filterService = filterService;
    this.httpClient = httpClient;
    this.router = router;
    this.selectOptionsService = selectOptionsService;
    this.translate = translate;
    this.deletedEntityInstanceIdentificationInitializer = this.getEntityInstanceName;
    this._dataPopulator = {
      multiSelects: {
        userRoles: {
          get: () => this.getUserRoleMultiSelectData(),
          set: userRoles => this.setUserRoleMultiSelectData(userRoles)
        }
      },
      users: {
        get: event => this.getUsers(event),
        set: users => this.setUsers(users)
      }
    };
  }
  ngOnInit() {
    this.cols = [{
      field: 'Login',
      header: 'User.Login',
      width: '10%',
      filterType: src_app_enums_filter_type_enum__WEBPACK_IMPORTED_MODULE_12__.FilterTypeEnum.Text,
      applyGlobalFiltering: true
    }, {
      field: 'FirstName',
      header: 'User.FirstName',
      width: '20%',
      filterType: src_app_enums_filter_type_enum__WEBPACK_IMPORTED_MODULE_12__.FilterTypeEnum.Text,
      applyGlobalFiltering: true
    }, {
      field: 'LastName',
      header: 'User.LastName',
      width: '20%',
      filterType: src_app_enums_filter_type_enum__WEBPACK_IMPORTED_MODULE_12__.FilterTypeEnum.Text,
      applyGlobalFiltering: true
    }, {
      field: 'UserRoleName',
      header: 'User.UserRoleName',
      width: '20%',
      filterType: src_app_enums_filter_type_enum__WEBPACK_IMPORTED_MODULE_12__.FilterTypeEnum.Text,
      applyGlobalFiltering: true,
      replaceWith: 'UserRoleId'
    }, {
      field: 'IsActive',
      header: 'User.IsActive',
      width: '10%'
    }, {
      field: 'Actions',
      header: '',
      width: '20%'
    }];
    this._dataPopulator.multiSelects.userRoles.get().subscribe(userRoles => this._dataPopulator.multiSelects.userRoles.set(userRoles));
  }
  loadUsersLazy(event) {
    this.tempLazyLoadEvent = event;
    this._dataPopulator.users.get(event).subscribe(result => this._dataPopulator.users.set(result));
  }
  onCreate() {
    this.router.navigate([src_app_routes__WEBPACK_IMPORTED_MODULE_9__.Routes.users.navigations.creation]);
  }
  onEdit(user) {
    this.router.navigate([src_app_routes__WEBPACK_IMPORTED_MODULE_9__.Routes.users.navigations.edition(user.Id)]);
  }
  getEntityInstanceName(user) {
    return new src_app_tools_stringBuilder__WEBPACK_IMPORTED_MODULE_4__.StringBuilder(user.LastName).append(' ').append(user.FirstName).toString();
  }
  getUserRoleMultiSelectData() {
    return this.selectOptionsService.getUserRoles();
  }
  getUsers(event) {
    var _a, _b;
    (_a = event.sortField) !== null && _a !== void 0 ? _a : event.sortField = (_b = this.cols[0]) === null || _b === void 0 ? void 0 : _b.field;
    return this.httpClient.get(src_app_api_routes__WEBPACK_IMPORTED_MODULE_3__.ApiRoutes.user.getAll(event, this.cols));
  }
  setUserRoleMultiSelectData(userRoles) {
    this.userRoleOptions = userRoles;
    const userRoleColumn = this.cols.find(c => c.field === "UserRoleName");
    if (userRoleColumn) {
      userRoleColumn.options = this.userRoleOptions;
    }
  }
  setUsers(users) {
    this.totalRecords = users.TotalRowsCount;
    this.users = users.List;
  }
};
UserListComponent.ctorParameters = () => [{
  type: src_app_services_authorization_authorization_service__WEBPACK_IMPORTED_MODULE_11__.AuthorizationService
}, {
  type: primeng_api__WEBPACK_IMPORTED_MODULE_13__.ConfirmationService
}, {
  type: src_app_services_messages_console_message_service__WEBPACK_IMPORTED_MODULE_8__.ConsoleMessageService
}, {
  type: src_app_services_messages_dialog_message_service__WEBPACK_IMPORTED_MODULE_7__.DialogMessageService
}, {
  type: src_app_services_errors_error_service__WEBPACK_IMPORTED_MODULE_6__.ErrorService
}, {
  type: _services_filters_filter_service__WEBPACK_IMPORTED_MODULE_1__.FilterService
}, {
  type: _angular_common_http__WEBPACK_IMPORTED_MODULE_14__.HttpClient
}, {
  type: _angular_router__WEBPACK_IMPORTED_MODULE_15__.Router
}, {
  type: src_app_services_select_options_select_options_service__WEBPACK_IMPORTED_MODULE_2__.SelectOptionsService
}, {
  type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_16__.TranslateService
}];
UserListComponent.propDecorators = {
  dataTable: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_17__.ViewChild,
    args: ['dataTable']
  }]
};
UserListComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_18__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_17__.Component)({
  selector: "user-list",
  template: _user_list_html_ngResource__WEBPACK_IMPORTED_MODULE_0__
})], UserListComponent);


/***/ }),

/***/ 6793:
/*!******************************************!*\
  !*** ./src/app/enums/api-result-enum.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ApiResultEnum": () => (/* binding */ ApiResultEnum)
/* harmony export */ });
var ApiResultEnum;
(function (ApiResultEnum) {
  ApiResultEnum[ApiResultEnum["AssignedRoleDeletionAttempt"] = 0] = "AssignedRoleDeletionAttempt";
  ApiResultEnum[ApiResultEnum["BadRequest"] = 1] = "BadRequest";
  ApiResultEnum[ApiResultEnum["DoesNotExist"] = 2] = "DoesNotExist";
  ApiResultEnum[ApiResultEnum["DoesNotMatchJWT"] = 3] = "DoesNotMatchJWT";
  ApiResultEnum[ApiResultEnum["Error"] = 4] = "Error";
  ApiResultEnum[ApiResultEnum["ExistsInDatabase"] = 5] = "ExistsInDatabase";
  ApiResultEnum[ApiResultEnum["Invalid"] = 6] = "Invalid";
  ApiResultEnum[ApiResultEnum["LoginExists"] = 7] = "LoginExists";
  ApiResultEnum[ApiResultEnum["NameExists"] = 8] = "NameExists";
  ApiResultEnum[ApiResultEnum["NationalIdExists"] = 9] = "NationalIdExists";
  ApiResultEnum[ApiResultEnum["None"] = 10] = "None";
  ApiResultEnum[ApiResultEnum["NotActive"] = 11] = "NotActive";
  ApiResultEnum[ApiResultEnum["NotFound"] = 12] = "NotFound";
  ApiResultEnum[ApiResultEnum["NoUserPermissionAssigned"] = 13] = "NoUserPermissionAssigned";
  ApiResultEnum[ApiResultEnum["OK"] = 14] = "OK";
  ApiResultEnum[ApiResultEnum["RepresentativeExists"] = 15] = "RepresentativeExists";
  ApiResultEnum[ApiResultEnum["TheOnlyAssignedRoleDeletionAttempt"] = 16] = "TheOnlyAssignedRoleDeletionAttempt";
  ApiResultEnum[ApiResultEnum["Used"] = 17] = "Used";
  ApiResultEnum[ApiResultEnum["UserHasBeenAlreadyAssignedToRole"] = 18] = "UserHasBeenAlreadyAssignedToRole";
  ApiResultEnum[ApiResultEnum["WrongOldPassword"] = 19] = "WrongOldPassword";
})(ApiResultEnum || (ApiResultEnum = {}));

/***/ }),

/***/ 379:
/*!*******************************************!*\
  !*** ./src/app/enums/client-type-enum.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ClientTypeEnum": () => (/* binding */ ClientTypeEnum)
/* harmony export */ });
var ClientTypeEnum;
(function (ClientTypeEnum) {
  ClientTypeEnum[ClientTypeEnum["Private"] = 1] = "Private";
  ClientTypeEnum[ClientTypeEnum["Company"] = 2] = "Company";
})(ClientTypeEnum || (ClientTypeEnum = {}));

/***/ }),

/***/ 8822:
/*!*************************************************!*\
  !*** ./src/app/enums/error-messag-type-enum.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ErrorMessageTypeEnum": () => (/* binding */ ErrorMessageTypeEnum)
/* harmony export */ });
var ErrorMessageTypeEnum;
(function (ErrorMessageTypeEnum) {
  ErrorMessageTypeEnum["Email"] = "Email";
  ErrorMessageTypeEnum["Empty"] = "Empty";
  ErrorMessageTypeEnum["Length"] = "Length";
  ErrorMessageTypeEnum["MatchAllowedLetters"] = "MatchAllowedLetters";
  ErrorMessageTypeEnum["MatchSmallLetters"] = "MatchSmallLetters";
})(ErrorMessageTypeEnum || (ErrorMessageTypeEnum = {}));

/***/ }),

/***/ 3501:
/*!*******************************************!*\
  !*** ./src/app/enums/filter-type-enum.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FilterTypeEnum": () => (/* binding */ FilterTypeEnum)
/* harmony export */ });
var FilterTypeEnum;
(function (FilterTypeEnum) {
  FilterTypeEnum["Date"] = "date";
  FilterTypeEnum["Numeric"] = "numeric";
  FilterTypeEnum["Text"] = "text";
})(FilterTypeEnum || (FilterTypeEnum = {}));

/***/ }),

/***/ 7673:
/*!*****************************************!*\
  !*** ./src/app/enums/form-mode-enum.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FormModeEnum": () => (/* binding */ FormModeEnum)
/* harmony export */ });
var FormModeEnum;
(function (FormModeEnum) {
  FormModeEnum[FormModeEnum["Creation"] = 0] = "Creation";
  FormModeEnum[FormModeEnum["Edition"] = 1] = "Edition";
})(FormModeEnum || (FormModeEnum = {}));

/***/ }),

/***/ 1072:
/*!*********************************************!*\
  !*** ./src/app/enums/language-code-enum.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LanguageCodeEnum": () => (/* binding */ LanguageCodeEnum)
/* harmony export */ });
var LanguageCodeEnum;
(function (LanguageCodeEnum) {
  LanguageCodeEnum[LanguageCodeEnum["En"] = 1] = "En";
  LanguageCodeEnum[LanguageCodeEnum["Pl"] = 2] = "Pl";
})(LanguageCodeEnum || (LanguageCodeEnum = {}));

/***/ }),

/***/ 3778:
/*!************************************************!*\
  !*** ./src/app/enums/message-lifetime-enum.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MessageLifeTimeEnum": () => (/* binding */ MessageLifeTimeEnum)
/* harmony export */ });
var MessageLifeTimeEnum;
(function (MessageLifeTimeEnum) {
  MessageLifeTimeEnum[MessageLifeTimeEnum["Error"] = 2000] = "Error";
  MessageLifeTimeEnum[MessageLifeTimeEnum["Info"] = 2000] = "Info";
  MessageLifeTimeEnum[MessageLifeTimeEnum["Success"] = 3000] = "Success";
  MessageLifeTimeEnum[MessageLifeTimeEnum["Warning"] = 2000] = "Warning";
})(MessageLifeTimeEnum || (MessageLifeTimeEnum = {}));

/***/ }),

/***/ 7908:
/*!********************************************!*\
  !*** ./src/app/enums/message-type-enum.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MessageTypeEnum": () => (/* binding */ MessageTypeEnum)
/* harmony export */ });
var MessageTypeEnum;
(function (MessageTypeEnum) {
  MessageTypeEnum["Error"] = "error";
  MessageTypeEnum["Info"] = "info";
  MessageTypeEnum["Success"] = "success";
  MessageTypeEnum["Warning"] = "warn";
})(MessageTypeEnum || (MessageTypeEnum = {}));

/***/ }),

/***/ 8144:
/*!***********************************************!*\
  !*** ./src/app/enums/search-operator-enum.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SearchOperatorEnum": () => (/* binding */ SearchOperatorEnum)
/* harmony export */ });
var SearchOperatorEnum;
(function (SearchOperatorEnum) {
  SearchOperatorEnum["MatchAll"] = "and";
  SearchOperatorEnum["MatchAny"] = "or";
})(SearchOperatorEnum || (SearchOperatorEnum = {}));

/***/ }),

/***/ 8235:
/*!***********************************************!*\
  !*** ./src/app/enums/user-permission-enum.ts ***!
  \***********************************************/
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
  UserPermissionEnum[UserPermissionEnum["Clients_CanList"] = 5] = "Clients_CanList";
  UserPermissionEnum[UserPermissionEnum["Clients_CanModify"] = 6] = "Clients_CanModify";
  UserPermissionEnum[UserPermissionEnum["ClientRepresentatives_CanList"] = 7] = "ClientRepresentatives_CanList";
  UserPermissionEnum[UserPermissionEnum["ClientRepresentatives_CanModify"] = 8] = "ClientRepresentatives_CanModify";
})(UserPermissionEnum || (UserPermissionEnum = {}));

/***/ }),

/***/ 6554:
/*!********************************!*\
  !*** ./src/app/icon-mapper.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Icons": () => (/* binding */ Icons),
/* harmony export */   "LIST_ICON_NAME": () => (/* binding */ LIST_ICON_NAME),
/* harmony export */   "MODIFY_ICON_NAME": () => (/* binding */ MODIFY_ICON_NAME)
/* harmony export */ });
const LIST_ICON_NAME = 'pi pi-list';
const MODIFY_ICON_NAME = 'pi pi-pencil';
const Icons = {
  'Permissions.Clients': 'fa fa-solid fa-face-smile',
  'Permissions.ClientRepresentatives': 'fa fa-solid fa-circle-user',
  'Permissions.UserRoles': 'pi pi-users',
  'Permissions.Users': 'pi pi-user'
};

/***/ }),

/***/ 2047:
/*!***************************************!*\
  !*** ./src/app/interfaces/address.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addressFormFields": () => (/* binding */ addressFormFields)
/* harmony export */ });
const addressFormFields = {
  ApartmentNumber: 'ApartmentNumber',
  City: 'City',
  Country: 'CountryId',
  Email: 'Email',
  PhoneNumber: 'PhoneNumber',
  PostalCode: 'PostalCode',
  StreetName: 'StreetName',
  StreetNumber: 'StreetNumber'
};

/***/ }),

/***/ 5466:
/*!************************************************!*\
  !*** ./src/app/interfaces/name-in-language.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NameInLanguage": () => (/* binding */ NameInLanguage),
/* harmony export */   "NameInLanguagesBase": () => (/* binding */ NameInLanguagesBase)
/* harmony export */ });
class NameInLanguage {}
class NameInLanguagesBase {}

/***/ }),

/***/ 7495:
/*!***********************************!*\
  !*** ./src/app/interfaces/png.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PngTable": () => (/* binding */ PngTable),
/* harmony export */   "PngTableColumn": () => (/* binding */ PngTableColumn),
/* harmony export */   "PngTreeColumn": () => (/* binding */ PngTreeColumn)
/* harmony export */ });
/* harmony import */ var _enums_filter_type_enum__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../enums/filter-type-enum */ 3501);

class PngTable {
  constructor(cols) {
    this.cols = [];
    this.cols = cols;
  }
  setOptionsForColumn(columnName, options) {
    const column = this.cols.find(c => c.field === columnName);
    if (column) {
      column.options = options;
    }
  }
}
class PngTableColumn {
  constructor(field, header, width, applyGlobalFiltering) {
    this.filterType = _enums_filter_type_enum__WEBPACK_IMPORTED_MODULE_0__.FilterTypeEnum.Text;
    this.field = field;
    this.header = header;
    this.width = width;
    this.applyGlobalFiltering = applyGlobalFiltering ? applyGlobalFiltering : false;
    this.filterType = _enums_filter_type_enum__WEBPACK_IMPORTED_MODULE_0__.FilterTypeEnum.Text;
  }
}
class PngTreeColumn {}

/***/ }),

/***/ 3246:
/*!*****************************************!*\
  !*** ./src/app/interfaces/ui-models.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Menu": () => (/* binding */ Menu),
/* harmony export */   "MenuArray": () => (/* binding */ MenuArray)
/* harmony export */ });
class Menu {}
class MenuArray extends Array {
  getItemsForLabel(label) {
    var _a;
    return (_a = this.find(m => m.Label == label)) === null || _a === void 0 ? void 0 : _a.Items;
  }
}

/***/ }),

/***/ 7110:
/*!***********************************************!*\
  !*** ./src/app/interfaces/user-permission.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PermissionGroupItemModel": () => (/* binding */ PermissionGroupItemModel),
/* harmony export */   "PermissionItemModel": () => (/* binding */ PermissionItemModel),
/* harmony export */   "SelectedUserPermissionNodeArray": () => (/* binding */ SelectedUserPermissionNodeArray)
/* harmony export */ });
class PermissionGroupItemModel {}
class PermissionItemModel {}
class SelectedUserPermissionNodeArray extends Array {
  tryPush(item) {
    if (item.data.isSelected) this.push(item);
  }
}

/***/ }),

/***/ 7940:
/*!*****************************************!*\
  !*** ./src/app/interfaces/user-role.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UserRoleCreationModel": () => (/* binding */ UserRoleCreationModel),
/* harmony export */   "UserRoleDetailsModel": () => (/* binding */ UserRoleDetailsModel)
/* harmony export */ });
/* harmony import */ var _name_in_language__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./name-in-language */ 5466);

class UserRoleCreationModel extends _name_in_language__WEBPACK_IMPORTED_MODULE_0__.NameInLanguagesBase {
  constructor() {
    super(...arguments);
    this.PermissionsSelected = [];
  }
  doesPermissionExistWithinSelected(permissionId) {
    return this.PermissionsSelected.find(p => p.Id === permissionId);
  }
}
class UserRoleDetailsModel extends _name_in_language__WEBPACK_IMPORTED_MODULE_0__.NameInLanguagesBase {
  constructor() {
    super(...arguments);
    this.GroupedPermissions = [];
    this.PermissionsSelected = [];
  }
  doesPermissionExistWithinSelected(permissionId) {
    return this.PermissionsSelected.find(p => p.Id === permissionId);
  }
}

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
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! tslib */ 2321);
/* harmony import */ var _app_footer_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app.footer.component.html?ngResource */ 8980);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common/http */ 8987);
/* harmony import */ var _services_app_layout_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./services/app.layout.service */ 9139);
/* harmony import */ var _api_routes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../api-routes */ 2061);
/* harmony import */ var _services_authorization_authorization_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/authorization/authorization.service */ 6079);
/* harmony import */ var _enums_api_result_enum__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../enums/api-result-enum */ 6793);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ngx-translate/core */ 8699);









let AppFooterComponent = class AppFooterComponent {
  constructor(httpClient, layoutService, translate) {
    this.httpClient = httpClient;
    this.layoutService = layoutService;
    this.translate = translate;
    this.isDarkModeThemeSelected = false;
    const isDarkModeThemeSelectedFromStorage = localStorage.getItem('isDarkModeThemeSelected');
    if (isDarkModeThemeSelectedFromStorage) {
      this.isDarkModeThemeSelected = Boolean(isDarkModeThemeSelectedFromStorage);
    }
    this.httpClient.get(_api_routes__WEBPACK_IMPORTED_MODULE_2__.ApiRoutes.user.getTheme(_services_authorization_authorization_service__WEBPACK_IMPORTED_MODULE_3__.AuthorizationService.currentUserId)).subscribe({
      next: result => {
        this.isDarkModeThemeSelected = result;
        this.changeTheme();
      }
    });
  }
  changeUserTheme() {
    localStorage.setItem('isDarkModeThemeSelected', this.isDarkModeThemeSelected.toString());
    const model = {
      Id: _services_authorization_authorization_service__WEBPACK_IMPORTED_MODULE_3__.AuthorizationService.currentUserId
    };
    this.httpClient.post(_api_routes__WEBPACK_IMPORTED_MODULE_2__.ApiRoutes.user.changeTheme, model).subscribe({
      next: result => {
        if (result === _enums_api_result_enum__WEBPACK_IMPORTED_MODULE_4__.ApiResultEnum[_enums_api_result_enum__WEBPACK_IMPORTED_MODULE_4__.ApiResultEnum.OK]) {
          this.changeTheme();
        }
      }
    });
  }
  changeTheme() {
    const theme = this.isDarkModeThemeSelected ? 'arya-blue' : 'saga-orange';
    const colorScheme = this.isDarkModeThemeSelected ? 'dark' : 'light';
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
};
AppFooterComponent.ctorParameters = () => [{
  type: _angular_common_http__WEBPACK_IMPORTED_MODULE_5__.HttpClient
}, {
  type: _services_app_layout_service__WEBPACK_IMPORTED_MODULE_1__.LayoutService
}, {
  type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__.TranslateService
}];
AppFooterComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_7__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_8__.Component)({
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
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! tslib */ 2321);
/* harmony import */ var _app_layout_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app.layout.component.html?ngResource */ 1896);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ 124);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ 116);
/* harmony import */ var _services_app_layout_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./services/app.layout.service */ 9139);
/* harmony import */ var _app_sidebar_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app.sidebar.component */ 6762);
/* harmony import */ var _app_topbar_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app.topbar.component */ 1242);
/* harmony import */ var _services_authentication_authentication_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../services/authentication/authentication.service */ 7020);
/* harmony import */ var _routes__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../routes */ 1311);










let AppLayoutComponent = class AppLayoutComponent {
  constructor(authenticationService, layoutService, renderer, router) {
    this.authenticationService = authenticationService;
    this.layoutService = layoutService;
    this.renderer = renderer;
    this.router = router;
    this.isUserLoggedIn = this.authenticationService.isLoggedIn();
    if (!this.isUserLoggedIn) {
      this.router.navigate([_routes__WEBPACK_IMPORTED_MODULE_5__.Routes.login.navigations["default"]]);
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
  blockBodyScroll() {
    if (document.body.classList) {
      document.body.classList.add('blocked-scroll');
    } else {
      document.body.className += ' blocked-scroll';
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
  type: _services_authentication_authentication_service__WEBPACK_IMPORTED_MODULE_4__.AuthenticationService
}, {
  type: _services_app_layout_service__WEBPACK_IMPORTED_MODULE_1__.LayoutService
}, {
  type: _angular_core__WEBPACK_IMPORTED_MODULE_8__.Renderer2
}, {
  type: _angular_router__WEBPACK_IMPORTED_MODULE_7__.Router
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
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! tslib */ 2321);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/platform-browser */ 4497);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/common/http */ 8987);
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/platform-browser/animations */ 7146);
/* harmony import */ var primeng_inputtext__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! primeng/inputtext */ 9906);
/* harmony import */ var primeng_sidebar__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! primeng/sidebar */ 4179);
/* harmony import */ var primeng_badge__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! primeng/badge */ 2381);
/* harmony import */ var primeng_radiobutton__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! primeng/radiobutton */ 9902);
/* harmony import */ var primeng_inputswitch__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! primeng/inputswitch */ 3585);
/* harmony import */ var primeng_ripple__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! primeng/ripple */ 4538);
/* harmony import */ var _app_menu_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app.menu.component */ 3217);
/* harmony import */ var _app_menuitem_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app.menuitem.component */ 2937);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/router */ 124);
/* harmony import */ var _app_topbar_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app.topbar.component */ 1242);
/* harmony import */ var _app_footer_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app.footer.component */ 8811);
/* harmony import */ var _config_config_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./config/config.module */ 7622);
/* harmony import */ var _app_sidebar_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./app.sidebar.component */ 6762);
/* harmony import */ var _app_layout_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./app.layout.component */ 3725);
/* harmony import */ var primeng_messages__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! primeng/messages */ 8547);
/* harmony import */ var primeng_breadcrumb__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! primeng/breadcrumb */ 7298);
/* harmony import */ var primeng_panelmenu__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! primeng/panelmenu */ 9028);
/* harmony import */ var primeng_splitbutton__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! primeng/splitbutton */ 3650);





















//primeng



let AppLayoutModule = class AppLayoutModule {};
AppLayoutModule = (0,tslib__WEBPACK_IMPORTED_MODULE_7__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_8__.NgModule)({
  declarations: [_app_footer_component__WEBPACK_IMPORTED_MODULE_3__.AppFooterComponent, _app_layout_component__WEBPACK_IMPORTED_MODULE_6__.AppLayoutComponent, _app_menu_component__WEBPACK_IMPORTED_MODULE_0__.AppMenuComponent, _app_menuitem_component__WEBPACK_IMPORTED_MODULE_1__.AppMenuitemComponent, _app_sidebar_component__WEBPACK_IMPORTED_MODULE_5__.AppSidebarComponent, _app_topbar_component__WEBPACK_IMPORTED_MODULE_2__.AppTopBarComponent],
  imports: [_config_config_module__WEBPACK_IMPORTED_MODULE_4__.AppConfigModule, primeng_badge__WEBPACK_IMPORTED_MODULE_9__.BadgeModule, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_10__.BrowserAnimationsModule, _angular_platform_browser__WEBPACK_IMPORTED_MODULE_11__.BrowserModule, _angular_forms__WEBPACK_IMPORTED_MODULE_12__.FormsModule, _angular_common_http__WEBPACK_IMPORTED_MODULE_13__.HttpClientModule, primeng_inputswitch__WEBPACK_IMPORTED_MODULE_14__.InputSwitchModule, primeng_inputtext__WEBPACK_IMPORTED_MODULE_15__.InputTextModule, primeng_radiobutton__WEBPACK_IMPORTED_MODULE_16__.RadioButtonModule, primeng_ripple__WEBPACK_IMPORTED_MODULE_17__.RippleModule, _angular_router__WEBPACK_IMPORTED_MODULE_18__.RouterModule, primeng_sidebar__WEBPACK_IMPORTED_MODULE_19__.SidebarModule,
  //primeng
  primeng_breadcrumb__WEBPACK_IMPORTED_MODULE_20__.BreadcrumbModule, primeng_messages__WEBPACK_IMPORTED_MODULE_21__.MessagesModule, primeng_panelmenu__WEBPACK_IMPORTED_MODULE_22__.PanelMenuModule, primeng_splitbutton__WEBPACK_IMPORTED_MODULE_23__.SplitButtonModule],
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
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! tslib */ 2321);
/* harmony import */ var _app_menu_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app.menu.component.html?ngResource */ 4695);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 124);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ngx-translate/core */ 8699);
/* harmony import */ var _services_app_layout_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./services/app.layout.service */ 9139);
/* harmony import */ var _services_authorization_authorization_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/authorization/authorization.service */ 6079);
/* harmony import */ var _services_layout_menu_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/layout/menu.service */ 6308);








let AppMenuComponent = class AppMenuComponent {
  constructor(layoutService, router, menuService, authorizationService, translate) {
    this.layoutService = layoutService;
    this.router = router;
    this.menuService = menuService;
    this.authorizationService = authorizationService;
    this.translate = translate;
    this.model = [];
    this.buildMenu();
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
    if (!this.model) return;
    const allMenuPermissions = [];
    (_a = menu.Items) === null || _a === void 0 ? void 0 : _a.forEach(menuItem => {
      var _a;
      return (_a = menuItem.Permissions) === null || _a === void 0 ? void 0 : _a.forEach(permission => allMenuPermissions.push(permission));
    });
    //TODO
    const isAuthorized = this.isAuthorized(allMenuPermissions);
    if (isAuthorized) {
      const menuItems = [];
      (_b = menu.Items) === null || _b === void 0 ? void 0 : _b.forEach(m => menuItems.push({
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
  appendMenuItem(menuItemLabel, permissions, label, icon, routerLink) {
    if (!this.model) return;
    const isAuthorized = this.isAuthorized(permissions);
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
    let isAuthorized = false;
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
  type: _services_app_layout_service__WEBPACK_IMPORTED_MODULE_1__.LayoutService
}, {
  type: _angular_router__WEBPACK_IMPORTED_MODULE_4__.Router
}, {
  type: _services_layout_menu_service__WEBPACK_IMPORTED_MODULE_3__.MenuService
}, {
  type: _services_authorization_authorization_service__WEBPACK_IMPORTED_MODULE_2__.AuthorizationService
}, {
  type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_5__.TranslateService
}];
AppMenuComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_7__.Component)({
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
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 2321);
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
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! tslib */ 2321);
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
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 2321);
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
AppSidebarComponent.propDecorators = {
  appMenu: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_2__.ViewChild,
    args: ['appMenu']
  }]
};
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
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! tslib */ 2321);
/* harmony import */ var _app_topbar_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app.topbar.component.html?ngResource */ 4951);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var primeng_api__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! primeng/api */ 4356);
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../app.component */ 5041);
/* harmony import */ var _services_app_layout_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./services/app.layout.service */ 9139);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @ngx-translate/core */ 8699);
/* harmony import */ var _services_authentication_authentication_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/authentication/authentication.service */ 7020);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/router */ 124);
/* harmony import */ var _services_select_options_select_options_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../services/select-options/select-options.service */ 712);
/* harmony import */ var _enums_language_code_enum__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../enums/language-code-enum */ 1072);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/platform-browser */ 4497);
/* harmony import */ var _services_authorization_authorization_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../services/authorization/authorization.service */ 6079);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/common/http */ 8987);
/* harmony import */ var _api_routes__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../api-routes */ 2061);
/* harmony import */ var _enums_api_result_enum__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../enums/api-result-enum */ 6793);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! rxjs */ 116);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! rxjs */ 3853);
/* harmony import */ var _tools_stringBuilder__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../tools/stringBuilder */ 6856);
/* harmony import */ var _routes__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../routes */ 1311);



















let AppTopBarComponent = class AppTopBarComponent {
  constructor(activatedRoute, app, authenticationService, config, httpClient, layoutService, router, selectOptionsService, titleService, translate) {
    this.activatedRoute = activatedRoute;
    this.app = app;
    this.authenticationService = authenticationService;
    this.config = config;
    this.httpClient = httpClient;
    this.layoutService = layoutService;
    this.router = router;
    this.selectOptionsService = selectOptionsService;
    this.titleService = titleService;
    this.translate = translate;
    this.home = {
      icon: 'pi pi-home',
      url: 'home'
    };
    this.breadcrumbItems = [];
    this.userMenuItems = [];
    this.updateWithLanguageOnInit();
  }
  setTheme(withDarkMode) {
    const theme = withDarkMode ? 'arya-blue' : 'saga-orange';
    const colorScheme = withDarkMode ? 'dark' : 'light';
    const themeLink = document.getElementById('theme-css');
    const newHref = themeLink.getAttribute('href').replace(this.layoutService.config.theme, theme);
    this.layoutService.config.colorScheme;
    this.replaceThemeLink(newHref, () => {
      this.layoutService.config.theme = theme;
      this.layoutService.config.colorScheme = colorScheme;
      this.layoutService.onConfigUpdate();
    });
  }
  createBreadcrumbs(route, urlBuilder = new _tools_stringBuilder__WEBPACK_IMPORTED_MODULE_9__.StringBuilder(), breadcrumbs = []) {
    const children = route.children;
    if (children.length === 0) return breadcrumbs;
    for (const child of children) {
      const routeURL = child.snapshot.url.map(segment => segment.path).join('/');
      if (routeURL !== '') {
        urlBuilder.append(`/${routeURL}`);
      }
      const label = child.snapshot.data['breadcrumb'];
      if (label) {
        breadcrumbs.push({
          label: label,
          url: urlBuilder.toString(),
          target: "_self"
        });
      }
      return this.createBreadcrumbs(child, urlBuilder, breadcrumbs);
    }
    return breadcrumbs;
  }
  getLanguageCodeById(id) {
    switch (id) {
      case _enums_language_code_enum__WEBPACK_IMPORTED_MODULE_5__.LanguageCodeEnum.Pl.valueOf():
        return "pl";
      case _enums_language_code_enum__WEBPACK_IMPORTED_MODULE_5__.LanguageCodeEnum.En.valueOf():
        return "en";
      default:
        return "---";
    }
  }
  initializeLayout() {
    var _a, _b;
    this.titleService.setTitle(this.translate.instant('AppName'));
    (_b = (_a = this.appSidebar) === null || _a === void 0 ? void 0 : _a.appMenu) === null || _b === void 0 ? void 0 : _b.buildMenu();
  }
  initializeUserMenu(languages) {
    this.userMenuItems = [{
      label: this.translate.instant('Language.Plural'),
      icon: 'fa fa-solid fa-language',
      items: languages.map(l => ({
        label: l.label,
        command: () => this.onLanguageChange(l.value)
      }))
    }, {
      label: this.translate.instant('General.LogOut'),
      icon: 'fa fa-power-off',
      command: () => this.logout()
    }];
  }
  logout() {
    if (this.authenticationService.logout()) {
      this.router.navigate([_routes__WEBPACK_IMPORTED_MODULE_10__.Routes.login.navigations["default"]]);
    }
  }
  onLanguageChange(id) {
    const currentUserId = _services_authorization_authorization_service__WEBPACK_IMPORTED_MODULE_6__.AuthorizationService.currentUserId;
    if (!currentUserId) return;
    this.languageId = Number(id);
    localStorage.setItem('languageId', this.languageId.toString());
    const model = {
      Id: currentUserId,
      LanguageId: this.languageId
    };
    this.httpClient.put(_api_routes__WEBPACK_IMPORTED_MODULE_7__.ApiRoutes.user.changeLanguage, model).subscribe(result => {
      if (result === _enums_api_result_enum__WEBPACK_IMPORTED_MODULE_8__.ApiResultEnum[_enums_api_result_enum__WEBPACK_IMPORTED_MODULE_8__.ApiResultEnum.OK]) {
        this.updateWithLanguageOnLanguageChange();
      }
    });
  }
  updateBreadcrumbItemsWithLanguage() {
    this.breadcrumbItems = this.breadcrumbItems.map(breadcrumbItem => Object.assign(Object.assign({}, breadcrumbItem), {
      label: this.translate.instant(breadcrumbItem.label)
    }));
  }
  updateWithLanguageOnInit() {
    const userLanguageId = _services_authorization_authorization_service__WEBPACK_IMPORTED_MODULE_6__.AuthorizationService.currentUserLanguageId;
    if (userLanguageId) {
      this.languageId = Number(userLanguageId);
    } else {
      const languageIdFromStorage = localStorage.getItem('languageId');
      if (languageIdFromStorage) {
        this.languageId = Number(languageIdFromStorage);
      }
    }
    if (this.languageId) {
      const language = this.getLanguageCodeById(this.languageId);
      this.router.events.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_11__.filter)(event => event instanceof _angular_router__WEBPACK_IMPORTED_MODULE_12__.Scroll || event instanceof _angular_router__WEBPACK_IMPORTED_MODULE_12__.NavigationEnd)).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_13__.concatMap)(() => {
        this.breadcrumbItems = this.createBreadcrumbs(this.activatedRoute.root);
        return this.translate.use(language);
      }), (0,rxjs__WEBPACK_IMPORTED_MODULE_13__.concatMap)(() => {
        this.initializeLayout();
        return this.translate.get('primeng');
      }), (0,rxjs__WEBPACK_IMPORTED_MODULE_13__.concatMap)(translation => {
        this.config.setTranslation(translation);
        return this.selectOptionsService.getLanguages();
      })).subscribe(languages => {
        this.initializeUserMenu(languages);
        this.updateBreadcrumbItemsWithLanguage();
      });
    }
  }
  updateWithLanguageOnLanguageChange() {
    const language = this.getLanguageCodeById(this.languageId);
    this.translate.use(language).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_13__.concatMap)(() => {
      this.initializeLayout();
      return this.translate.get('primeng');
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_13__.concatMap)(translation => {
      this.config.setTranslation(translation);
      return this.selectOptionsService.getLanguages();
    })).subscribe(languages => {
      this.initializeUserMenu(languages);
      this.updateBreadcrumbItemsWithLanguage();
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
};
AppTopBarComponent.ctorParameters = () => [{
  type: _angular_router__WEBPACK_IMPORTED_MODULE_12__.ActivatedRoute
}, {
  type: _app_component__WEBPACK_IMPORTED_MODULE_1__.AppComponent
}, {
  type: _services_authentication_authentication_service__WEBPACK_IMPORTED_MODULE_3__.AuthenticationService
}, {
  type: primeng_api__WEBPACK_IMPORTED_MODULE_14__.PrimeNGConfig
}, {
  type: _angular_common_http__WEBPACK_IMPORTED_MODULE_15__.HttpClient
}, {
  type: _services_app_layout_service__WEBPACK_IMPORTED_MODULE_2__.LayoutService
}, {
  type: _angular_router__WEBPACK_IMPORTED_MODULE_12__.Router
}, {
  type: _services_select_options_select_options_service__WEBPACK_IMPORTED_MODULE_4__.SelectOptionsService
}, {
  type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_16__.Title
}, {
  type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_17__.TranslateService
}];
AppTopBarComponent.propDecorators = {
  appSidebar: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_18__.Input,
    args: ['appSidebar']
  }],
  menuButton: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_18__.ViewChild,
    args: ['menubutton']
  }],
  topbarMenuButton: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_18__.ViewChild,
    args: ['topbarmenubutton']
  }],
  menu: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_18__.ViewChild,
    args: ['topbarmenu']
  }]
};
AppTopBarComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_19__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_18__.Component)({
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
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ 2321);
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
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 2321);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 4666);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var primeng_sidebar__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! primeng/sidebar */ 4179);
/* harmony import */ var primeng_radiobutton__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! primeng/radiobutton */ 9902);
/* harmony import */ var primeng_button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! primeng/button */ 6328);
/* harmony import */ var primeng_inputswitch__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! primeng/inputswitch */ 3585);
/* harmony import */ var _app_config_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app.config.component */ 3876);









let AppConfigModule = class AppConfigModule {};
AppConfigModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
  imports: [primeng_button__WEBPACK_IMPORTED_MODULE_3__.ButtonModule, _angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule, primeng_inputswitch__WEBPACK_IMPORTED_MODULE_6__.InputSwitchModule, primeng_radiobutton__WEBPACK_IMPORTED_MODULE_7__.RadioButtonModule, primeng_sidebar__WEBPACK_IMPORTED_MODULE_8__.SidebarModule],
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
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 2321);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ 228);



let LayoutService = class LayoutService {
  constructor() {
    this.config = {
      ripple: false,
      inputStyle: 'outlined',
      menuMode: 'static',
      colorScheme: 'light',
      theme: 'arya-blue',
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

/***/ 1311:
/*!***************************!*\
  !*** ./src/app/routes.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Routes": () => (/* binding */ Routes)
/* harmony export */ });
const Routes = {
  home: {
    breadcrumbs: {
      default: 'General.Dashboard'
    },
    navigations: {
      default: 'home'
    },
    paths: {
      default: 'home'
    }
  },
  login: {
    navigations: {
      default: 'login'
    },
    paths: {
      default: 'login'
    }
  },
  clientRepresentatives: {
    breadcrumbs: {
      creation: 'ClientRepresentative.Create',
      edition: 'ClientRepresentative.Edit',
      list: 'ClientRepresentative.List'
    },
    navigations: {
      creation: 'home/client-representatives/create',
      edition: id => `home/client-representatives/edit/${id}`,
      list: 'home/client-representatives'
    },
    paths: {
      create: 'create',
      edit: 'edit/:id',
      list: 'client-representatives'
    }
  },
  clients: {
    breadcrumbs: {
      creation: 'Client.Create',
      edition: 'Client.Edit',
      list: 'Client.List'
    },
    navigations: {
      creation: 'home/clients/create',
      edition: id => `home/clients/edit/${id}`,
      list: 'home/clients'
    },
    paths: {
      create: 'create',
      edit: 'edit/:id',
      list: 'clients'
    },
    tabs: {
      general: {
        index: 0
      },
      representatives: {
        index: 1
      },
      audits: {
        index: 2
      }
    }
  },
  userRoles: {
    breadcrumbs: {
      creation: 'UserRole.Create',
      edition: 'UserRole.Edit',
      list: 'UserRole.List'
    },
    navigations: {
      creation: 'home/user-roles/create',
      edition: id => `home/user-roles/edit/${id}`,
      list: 'home/user-roles'
    },
    paths: {
      create: 'create',
      edit: 'edit/:id',
      list: 'user-roles'
    }
  },
  users: {
    breadcrumbs: {
      creation: 'User.Create',
      edition: 'User.Edit',
      list: 'User.List'
    },
    navigations: {
      creation: 'home/users/create',
      edition: id => `home/users/edit/${id}`,
      list: 'home/users'
    },
    paths: {
      create: 'create',
      edit: 'edit/:id',
      list: 'users'
    }
  }
};

/***/ }),

/***/ 3226:
/*!***********************************************************!*\
  !*** ./src/app/services/auth-guard/auth-guard.service.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AuthGuard": () => (/* binding */ AuthGuard)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 2321);
/* harmony import */ var _authorization_authorization_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../authorization/authorization.service */ 6079);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 124);
/* harmony import */ var _routes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../routes */ 1311);





let AuthGuard = class AuthGuard {
  constructor(authorizationService, router) {
    this.authorizationService = authorizationService;
    this.router = router;
  }
  canActivate(next, state) {
    return this.getCanActivateResult(false, next);
  }
  canActivateChild(next, state) {
    return this.getCanActivateResult(true, next);
  }
  getCanActivateResult(checkForChild, next) {
    const allowedPermissions = next.data['allowedPermissions'];
    const isAuthorized = this.authorizationService.isAuthorized(allowedPermissions);
    if (!isAuthorized) {
      if (checkForChild) this.authorizationService.resetAllData();else this.authorizationService.decodeTokenAndSetData();
      this.router.navigate([_routes__WEBPACK_IMPORTED_MODULE_1__.Routes.login.navigations["default"]]);
    }
    this.authorizationService.decodeTokenAndSetData();
    return isAuthorized;
  }
};
AuthGuard.ctorParameters = () => [{
  type: _authorization_authorization_service__WEBPACK_IMPORTED_MODULE_0__.AuthorizationService
}, {
  type: _angular_router__WEBPACK_IMPORTED_MODULE_2__.Router
}];
AuthGuard = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.Injectable)()], AuthGuard);


/***/ }),

/***/ 7020:
/*!*******************************************************************!*\
  !*** ./src/app/services/authentication/authentication.service.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AuthenticationService": () => (/* binding */ AuthenticationService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! tslib */ 2321);
/* harmony import */ var _authorization_authorization_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../authorization/authorization.service */ 6079);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 4666);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common/http */ 8987);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs */ 833);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs */ 745);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ 635);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ 3158);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../environments/environment */ 2340);
/* harmony import */ var _api_routes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../api-routes */ 2061);
/* harmony import */ var _enums_api_result_enum__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../enums/api-result-enum */ 6793);










let AuthenticationService = class AuthenticationService {
  constructor(authorizationService, httpClient, platformId) {
    this.authorizationService = authorizationService;
    this.httpClient = httpClient;
    this.platformId = platformId;
  }
  getAuth() {
    if ((0,_angular_common__WEBPACK_IMPORTED_MODULE_4__.isPlatformBrowser)(this.platformId)) {
      const key = localStorage.getItem(_environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.auth_key);
      if (key) {
        return JSON.parse(key);
      }
    }
    return null;
  }
  isLoggedIn() {
    return (0,_angular_common__WEBPACK_IMPORTED_MODULE_4__.isPlatformBrowser)(this.platformId) && localStorage.getItem(_environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.auth_key) != null;
  }
  // performs the login
  login(authData) {
    const data = {
      UserName: authData.Login,
      Password: authData.Password,
      // required when signing up with username/password
      GrantType: "password",
      // space-separated list of scopes for which the token is issued
      Scope: "offline_access profile email"
    };
    return this.httpClient.post(_api_routes__WEBPACK_IMPORTED_MODULE_2__.ApiRoutes.identity.authenticate, data).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.map)(res => {
      const token = res && res.Token;
      if (res.Code == 165) {
        return _enums_api_result_enum__WEBPACK_IMPORTED_MODULE_3__.ApiResultEnum[_enums_api_result_enum__WEBPACK_IMPORTED_MODULE_3__.ApiResultEnum.NotActive];
      } else if (res.Code !== 200) {
        return _enums_api_result_enum__WEBPACK_IMPORTED_MODULE_3__.ApiResultEnum[_enums_api_result_enum__WEBPACK_IMPORTED_MODULE_3__.ApiResultEnum.Error];
      }
      if (token) {
        // store username and jwt token
        this.setAuth(res);
        this.authorizationService.decodeTokenAndSetData();
        return _enums_api_result_enum__WEBPACK_IMPORTED_MODULE_3__.ApiResultEnum[_enums_api_result_enum__WEBPACK_IMPORTED_MODULE_3__.ApiResultEnum.OK];
      }
      return "Error";
    }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.catchError)(error => {
      console.log(error);
      return new rxjs__WEBPACK_IMPORTED_MODULE_7__.Observable(error);
    }));
  }
  logout() {
    this.setAuth(null);
    this.authorizationService.resetAllData();
    return true;
  }
  refreshToken() {
    const tokenData = JSON.parse(localStorage.getItem(_environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.auth_key) || '');
    const data = {
      Token: tokenData.Token,
      RefreshToken: tokenData.RefreshToken
    };
    return this.httpClient.post(_api_routes__WEBPACK_IMPORTED_MODULE_2__.ApiRoutes.identity.refreshToken, data).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.map)(res => {
      this.setAuth(res);
      this.authorizationService.decodeTokenAndSetData();
      return _enums_api_result_enum__WEBPACK_IMPORTED_MODULE_3__.ApiResultEnum[_enums_api_result_enum__WEBPACK_IMPORTED_MODULE_3__.ApiResultEnum.OK];
    }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.catchError)(error => {
      console.log(error);
      return new rxjs__WEBPACK_IMPORTED_MODULE_7__.Observable(error);
    }));
  }
  setAuth(auth) {
    if ((0,_angular_common__WEBPACK_IMPORTED_MODULE_4__.isPlatformBrowser)(this.platformId)) {
      if (auth) {
        localStorage.setItem(_environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.auth_key, JSON.stringify(auth));
        this.isLoggedIn$ = (0,rxjs__WEBPACK_IMPORTED_MODULE_8__.of)(true);
      } else {
        localStorage.removeItem(_environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.auth_key);
        this.isLoggedIn$ = (0,rxjs__WEBPACK_IMPORTED_MODULE_8__.of)(false);
      }
    }
    return true;
  }
};
AuthenticationService.ctorParameters = () => [{
  type: _authorization_authorization_service__WEBPACK_IMPORTED_MODULE_0__.AuthorizationService
}, {
  type: _angular_common_http__WEBPACK_IMPORTED_MODULE_9__.HttpClient
}, {
  type: undefined,
  decorators: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_10__.Inject,
    args: [_angular_core__WEBPACK_IMPORTED_MODULE_10__.PLATFORM_ID]
  }]
}];
AuthenticationService = (0,tslib__WEBPACK_IMPORTED_MODULE_11__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_10__.Injectable)()], AuthenticationService);


/***/ }),

/***/ 6079:
/*!*****************************************************************!*\
  !*** ./src/app/services/authorization/authorization.service.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AuthorizationService": () => (/* binding */ AuthorizationService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 2321);
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
  static get currentUserPermissions() {
    return this._currentUserPermissions;
  }
  static get currentUserRoleId() {
    return this._currentUserRoleId;
  }
  static get currentUserRoleName() {
    return this._currentUserRoleName;
  }
  decodeToken() {
    const token = localStorage.getItem(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.auth_key);
    return this.jwtHelperService.decodeToken(token || '');
  }
  decodeTokenAndSetData() {
    const decodedToken = this.decodeToken();
    if (decodedToken) {
      AuthorizationService_1._currentUserId = decodedToken['sub'];
      AuthorizationService_1._currentUserName = decodedToken['given_name'];
      AuthorizationService_1._currentUserLanguageId = decodedToken['userlanguageid'];
      AuthorizationService_1._currentUserRoleId = decodedToken['userroleid'];
      AuthorizationService_1._currentUserRoleName = decodedToken['userrolename'];
      AuthorizationService_1._currentUserRoles = decodedToken['role'];
      AuthorizationService_1._currentUserPermissions = [];
      var currentUserPermissionsTextArray = decodedToken['permissions'].split(',');
      currentUserPermissionsTextArray.forEach(item => {
        var _a;
        return (_a = AuthorizationService_1._currentUserPermissions) === null || _a === void 0 ? void 0 : _a.push(Number(item));
      });
    } else {
      this.resetAllData();
    }
  }
  isAuthorized(allowedPermissions) {
    if (allowedPermissions === undefined) return false;
    // check if the list of allowed permissions is empty, if empty, authorize the user to access the page
    if (allowedPermissions == null || allowedPermissions.length === 0) return true;
    const decodedToken = this.decodeToken();
    // check if it was decoded successfully, if not the token is not valid, deny access
    if (!decodedToken) return false;
    // check if the user roles is in the list of allowed permissions, return true if allowed and false if not allowed
    var permissions = [];
    var permissionsTextArray = decodedToken['permissions'].split(',');
    permissionsTextArray.forEach(item => permissions.push(Number(item)));
    return allowedPermissions.some(r => permissions.includes(r));
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

/***/ 8813:
/*!**************************************************!*\
  !*** ./src/app/services/errors/error.service.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ErrorService": () => (/* binding */ ErrorService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 2321);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ngx-translate/core */ 8699);
/* harmony import */ var _tools_stringBuilder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../tools/stringBuilder */ 6856);
/* harmony import */ var _enums_error_messag_type_enum__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../enums/error-messag-type-enum */ 8822);
var ErrorService_1;





let ErrorService = ErrorService_1 = class ErrorService {
  constructor(translate) {
    this.translate = translate;
    this.errorMessage = new ErrorMessage();
    this.errorMessageBuilder = new ErrorMessageBuilder(translate, this.errorMessage);
  }
  getDefaultErrorMessage() {
    return this.translate.instant('General.Error.Global');
  }
  getFirstErrorMessageKey(error) {
    if (this.isValidErrorObject(error)) {
      const errorObject = error.errors;
      const firstErrorPropertyName = this.getFirstErrorName(errorObject);
      if (!firstErrorPropertyName) return;
      const firstError = errorObject[firstErrorPropertyName];
      if (!firstError) return;
      const splitError = this.getSplitError(firstError);
      return splitError[0];
    } else {
      return this.getDefaultErrorMessage();
    }
  }
  getFirstTranslatedErrorMessage(error) {
    if (this.isValidErrorObject(error)) {
      const errorObject = error.errors;
      const firstErrorPropertyName = this.getFirstErrorName(errorObject);
      if (!firstErrorPropertyName) return;
      const firstError = errorObject[firstErrorPropertyName];
      if (!firstError) return;
      const splitError = this.getSplitError(firstError);
      this.fillErrorMessageBasedOnError(splitError);
      if (!this.errorMessage.hasRequiredPropertiesAssigned()) {
        return this.getDefaultErrorMessage();
      }
      this.errorMessageBuilder.build();
      return this.errorMessageBuilder.getMessage();
    } else {
      return this.getDefaultErrorMessage();
    }
  }
  fillErrorMessageBasedOnError(error) {
    for (const message of error) {
      const splitMessage = message.split(ErrorService_1._messageInnerSeparator);
      switch (splitMessage[0]) {
        case ErrorService_1._idMessagePart:
          this.errorMessage.id = splitMessage[1];
          break;
        case ErrorService_1._maxLengthMessagePart:
          this.errorMessage.maxLength = splitMessage[1];
          break;
        case ErrorService_1._minLengthMessagePart:
          this.errorMessage.minLength = splitMessage[1];
          break;
        case ErrorService_1._typeMessagePart:
          this.errorMessage.type = splitMessage[1];
          break;
      }
    }
  }
  getFirstErrorName(errors) {
    return Object.keys(errors)[0];
  }
  getSplitError(error) {
    return Array.isArray(error) ? error[0].split(ErrorService_1._messageSeparator) : error.split(ErrorService_1._messageSeparator);
  }
  isValidErrorObject(error) {
    return error === null || error === void 0 ? void 0 : error.errors;
  }
};
ErrorService._idMessagePart = "ID";
ErrorService._maxLengthMessagePart = "MAX";
ErrorService._messageSeparator = "|";
ErrorService._messageInnerSeparator = ":";
ErrorService._minLengthMessagePart = "MIN";
ErrorService._typeMessagePart = "TYPE";
ErrorService.ctorParameters = () => [{
  type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__.TranslateService
}];
ErrorService = ErrorService_1 = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.Injectable)()], ErrorService);

class ErrorMessage {
  hasRequiredPropertiesAssigned() {
    return this.id && this.type;
  }
}
class ErrorMessageBuilder {
  constructor(translate, errorMessage) {
    this.resultMessageBuilder = new _tools_stringBuilder__WEBPACK_IMPORTED_MODULE_0__.StringBuilder();
    this.message = errorMessage;
    this.translate = translate;
  }
  append(messagePart) {
    this.resultMessageBuilder.append(messagePart);
    return this;
  }
  build() {
    this.clean();
    this.append(this.translate.instant('Messages.TheValueOfTheField')).append(" ").append("'").withId().append("'").append(" ").withTypeSpecificMessagePart().append(".");
  }
  clean() {
    if (this.resultMessageBuilder.length() > 0) this.resultMessageBuilder = new _tools_stringBuilder__WEBPACK_IMPORTED_MODULE_0__.StringBuilder();
  }
  getMessage() {
    return this.resultMessageBuilder.toString();
  }
  withId() {
    return this.append(this.translate.instant(this.message.id));
  }
  withTypeSpecificMessagePart() {
    let typeSpecificMessage = '';
    switch (this.message.type) {
      case _enums_error_messag_type_enum__WEBPACK_IMPORTED_MODULE_1__.ErrorMessageTypeEnum.Email:
        typeSpecificMessage = this.translate.instant('General.Error.IsNotValidEmail');
        break;
      case _enums_error_messag_type_enum__WEBPACK_IMPORTED_MODULE_1__.ErrorMessageTypeEnum.Empty:
        typeSpecificMessage = this.translate.instant('General.Error.IsEmpty');
        break;
      case _enums_error_messag_type_enum__WEBPACK_IMPORTED_MODULE_1__.ErrorMessageTypeEnum.Length:
        typeSpecificMessage = this.translate.instant('General.Error.HasIncorrectLength', {
          minLength: this.message.minLength,
          maxLength: this.message.maxLength
        });
        break;
      case _enums_error_messag_type_enum__WEBPACK_IMPORTED_MODULE_1__.ErrorMessageTypeEnum.MatchAllowedLetters:
        typeSpecificMessage = this.translate.instant('General.Error.IsNotMatchingAllowedLetters');
        break;
      case _enums_error_messag_type_enum__WEBPACK_IMPORTED_MODULE_1__.ErrorMessageTypeEnum.MatchSmallLetters:
        typeSpecificMessage = this.translate.instant('General.Error.IsNotMatchingSmallLetters');
        break;
    }
    return this.append(typeSpecificMessage);
  }
}

/***/ }),

/***/ 9865:
/*!****************************************************!*\
  !*** ./src/app/services/filters/filter.service.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FilterService": () => (/* binding */ FilterService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 2321);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ngx-translate/core */ 8699);
/* harmony import */ var primeng_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! primeng/api */ 4356);




let FilterService = class FilterService {
  constructor(translate) {
    this.translate = translate;
  }
  getPlaceholder(field) {
    const capitalizedField = field.replace(/^\w/, c => c.toUpperCase());
    return `${this.translate.instant('General.SearchFor')} ${capitalizedField}`;
  }
  onClearFilters(dataTable) {
    dataTable.reset();
  }
  onFilterGlobal(dataTable, filterValue) {
    dataTable.filterGlobal(filterValue, primeng_api__WEBPACK_IMPORTED_MODULE_0__.FilterMatchMode.CONTAINS);
  }
  shouldHideIcon(filterValue) {
    let inputWidth = 0;
    const filterElement = document.getElementById('filter');
    const textContentLengthHelper = document.createElement('span');
    textContentLengthHelper.style.visibility = 'hidden';
    textContentLengthHelper.style.position = 'absolute';
    textContentLengthHelper.textContent = filterValue;
    if (filterElement) inputWidth = filterElement.offsetWidth;
    document.body.appendChild(textContentLengthHelper);
    const textContentWidth = textContentLengthHelper.offsetWidth;
    document.body.removeChild(textContentLengthHelper);
    return textContentWidth > inputWidth - 30;
  }
};
FilterService.ctorParameters = () => [{
  type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_1__.TranslateService
}];
FilterService = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.Injectable)()], FilterService);


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
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 2321);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/environments/environment */ 2340);



let ApiUrlInterceptor = class ApiUrlInterceptor {
  intercept(req, next) {
    const baseAddress = req.url.includes('assets/i18n') ? `${location.protocol === 'https:' ? 'https' : 'http'}://${window.location.host}` : src_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.apiUrl;
    const apiRequest = req.clone({
      url: `${baseAddress}${req.url}`
    });
    return next.handle(apiRequest);
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
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! tslib */ 2321);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _authentication_authentication_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../authentication/authentication.service */ 7020);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 5474);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ 3158);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 9337);
/* harmony import */ var src_app_enums_api_result_enum__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/enums/api-result-enum */ 6793);






let AuthInterceptor = class AuthInterceptor {
  constructor(injector) {
    this.injector = injector;
  }
  intercept(request, next) {
    const authenticationService = this.injector.get(_authentication_authentication_service__WEBPACK_IMPORTED_MODULE_0__.AuthenticationService);
    const token = authenticationService.isLoggedIn() ? authenticationService.getAuth().Token : null;
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
          ApiKey: '5f97f178-1fb8-4a24-a71c-0b145a3709c4'
        }
      });
    }
    return next.handle(request).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.catchError)(errorResponse => {
      if (errorResponse.status === 401 && !this.isRefreshingToken) {
        this.isRefreshingToken = true;
        console.log("refreshing token...");
        authenticationService.refreshToken().subscribe(result => {
          console.log(`token refreshed with result: ${result}`);
          if (result === src_app_enums_api_result_enum__WEBPACK_IMPORTED_MODULE_1__.ApiResultEnum[src_app_enums_api_result_enum__WEBPACK_IMPORTED_MODULE_1__.ApiResultEnum.OK]) {
            this.isRefreshingToken = false;
            window.location.reload();
            return (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.tap)(() => src_app_enums_api_result_enum__WEBPACK_IMPORTED_MODULE_1__.ApiResultEnum[src_app_enums_api_result_enum__WEBPACK_IMPORTED_MODULE_1__.ApiResultEnum.OK]);
          } else {
            console.error(errorResponse);
            return (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.throwError)(() => errorResponse.error);
          }
        });
      }
      console.error(errorResponse);
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.throwError)(() => errorResponse.error);
    }));
  }
};
AuthInterceptor.ctorParameters = () => [{
  type: _angular_core__WEBPACK_IMPORTED_MODULE_5__.Injector
}];
AuthInterceptor = (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.Injectable)()], AuthInterceptor);


/***/ }),

/***/ 6308:
/*!*************************************************!*\
  !*** ./src/app/services/layout/menu.service.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MenuService": () => (/* binding */ MenuService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! tslib */ 2321);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var src_app_interfaces_ui_models__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/interfaces/ui-models */ 3246);
/* harmony import */ var _enums_user_permission_enum__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../enums/user-permission-enum */ 8235);
/* harmony import */ var _authorization_authorization_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../authorization/authorization.service */ 6079);
/* harmony import */ var _routes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../routes */ 1311);
/* harmony import */ var _menus__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./menus */ 2836);







let MenuService = class MenuService {
  constructor(authorizationService) {
    this.authorizationService = authorizationService;
    this.menu = new src_app_interfaces_ui_models__WEBPACK_IMPORTED_MODULE_0__.MenuArray();
    this.initializeMenu();
    this.initializeMenuItems();
  }
  getMenu() {
    return this.menu;
  }
  getAdministrationItems() {
    return this.menu.getItemsForLabel(_menus__WEBPACK_IMPORTED_MODULE_4__.Menus.administration.label);
  }
  getFirstMenuItemUserIsAuthorizedFor() {
    let firstMenuUserIsAuthorizedFor;
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
  getMainMenuItems() {
    return this.menu.getItemsForLabel(_menus__WEBPACK_IMPORTED_MODULE_4__.Menus.main.label);
  }
  initializeMenu() {
    //MENU
    this.menu.push({
      Label: _menus__WEBPACK_IMPORTED_MODULE_4__.Menus.main.label,
      Items: new src_app_interfaces_ui_models__WEBPACK_IMPORTED_MODULE_0__.MenuArray()
    });
    //ADMINISTRATION
    this.menu.push({
      Label: _menus__WEBPACK_IMPORTED_MODULE_4__.Menus.administration.label,
      Items: new src_app_interfaces_ui_models__WEBPACK_IMPORTED_MODULE_0__.MenuArray()
    });
  }
  initializeMenuItems() {
    const mainMenuItems = this.getMainMenuItems();
    //CLIENTS
    mainMenuItems === null || mainMenuItems === void 0 ? void 0 : mainMenuItems.push({
      Permissions: [_enums_user_permission_enum__WEBPACK_IMPORTED_MODULE_1__.UserPermissionEnum.Clients_CanList],
      Label: _menus__WEBPACK_IMPORTED_MODULE_4__.Menus.main.items.clients.label,
      Icon: _menus__WEBPACK_IMPORTED_MODULE_4__.Menus.main.items.clients.icon,
      RouterLink: [`/${_routes__WEBPACK_IMPORTED_MODULE_3__.Routes.clients.navigations.list}`]
    });
    const administrationItems = this.getAdministrationItems();
    //USERS
    administrationItems === null || administrationItems === void 0 ? void 0 : administrationItems.push({
      Permissions: [_enums_user_permission_enum__WEBPACK_IMPORTED_MODULE_1__.UserPermissionEnum.Users_CanList],
      Label: _menus__WEBPACK_IMPORTED_MODULE_4__.Menus.administration.items.users.label,
      Icon: _menus__WEBPACK_IMPORTED_MODULE_4__.Menus.administration.items.users.icon,
      RouterLink: [`/${_routes__WEBPACK_IMPORTED_MODULE_3__.Routes.users.navigations.list}`]
    });
    //USER ROLES
    administrationItems === null || administrationItems === void 0 ? void 0 : administrationItems.push({
      Permissions: [_enums_user_permission_enum__WEBPACK_IMPORTED_MODULE_1__.UserPermissionEnum.UserRoles_CanList],
      Label: _menus__WEBPACK_IMPORTED_MODULE_4__.Menus.administration.items.userRoles.label,
      Icon: _menus__WEBPACK_IMPORTED_MODULE_4__.Menus.administration.items.userRoles.icon,
      RouterLink: [`/${_routes__WEBPACK_IMPORTED_MODULE_3__.Routes.userRoles.navigations.list}`]
    });
  }
};
MenuService.ctorParameters = () => [{
  type: _authorization_authorization_service__WEBPACK_IMPORTED_MODULE_2__.AuthorizationService
}];
MenuService = (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_6__.Injectable)({
  providedIn: 'root'
})], MenuService);


/***/ }),

/***/ 2836:
/*!******************************************!*\
  !*** ./src/app/services/layout/menus.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Menus": () => (/* binding */ Menus)
/* harmony export */ });
const Menus = {
  administration: {
    label: 'Menu.Administration',
    items: {
      userRoles: {
        label: 'Menu.UserRoles',
        icon: 'fa fa-solid fa-users'
      },
      users: {
        label: 'Menu.Users',
        icon: 'fa fa-solid fa-user'
      }
    }
  },
  main: {
    label: 'Menu.Title',
    items: {
      clients: {
        label: 'Menu.Clients',
        icon: 'fa fa-solid fa-face-smile'
      }
    }
  }
};

/***/ }),

/***/ 5289:
/*!**************************************************************!*\
  !*** ./src/app/services/messages/console-message.service.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ConsoleMessageService": () => (/* binding */ ConsoleMessageService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 2321);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _tools_database_operation_type__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../tools/database-operation-type */ 1421);



let ConsoleMessageService = class ConsoleMessageService {
  constructor() {}
  getConsoleMessageWithResultForEntityAfterCreation(entity, result) {
    return this.getConsoleMessage(entity, result, _tools_database_operation_type__WEBPACK_IMPORTED_MODULE_0__.DataBaseOperationTypeMessagePartsForConsole.create);
  }
  getConsoleMessageWithResultForEntityAfterDeletion(entity, result) {
    return this.getConsoleMessage(entity, result, _tools_database_operation_type__WEBPACK_IMPORTED_MODULE_0__.DataBaseOperationTypeMessagePartsForConsole["delete"]);
  }
  getConsoleMessageWithResultForEntityAfterUpdate(entity, result) {
    return this.getConsoleMessage(entity, result, _tools_database_operation_type__WEBPACK_IMPORTED_MODULE_0__.DataBaseOperationTypeMessagePartsForConsole.update);
  }
  getConsoleMessage(entity, result, operation) {
    return `The ${entity} has been ${operation.name} with result: ${result}`;
  }
};
ConsoleMessageService.ctorParameters = () => [];
ConsoleMessageService = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.Injectable)()], ConsoleMessageService);


/***/ }),

/***/ 1323:
/*!*************************************************************!*\
  !*** ./src/app/services/messages/dialog-message.service.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DialogMessageService": () => (/* binding */ DialogMessageService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 2321);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var primeng_api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! primeng/api */ 4356);
/* harmony import */ var _tools_message_type__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../tools/message-type */ 2135);




let DialogMessageService = class DialogMessageService {
  constructor(messageService) {
    this.messageService = messageService;
  }
  addError(summary) {
    this.addMessage(_tools_message_type__WEBPACK_IMPORTED_MODULE_0__.MessageTypes.error, summary);
  }
  addInfo(summary) {
    this.addMessage(_tools_message_type__WEBPACK_IMPORTED_MODULE_0__.MessageTypes.info, summary);
  }
  addSuccess(summary) {
    this.addMessage(_tools_message_type__WEBPACK_IMPORTED_MODULE_0__.MessageTypes.success, summary);
  }
  addWarning(summary) {
    this.addMessage(_tools_message_type__WEBPACK_IMPORTED_MODULE_0__.MessageTypes.warning, summary);
  }
  addMessage(type, summary) {
    this.messageService.add({
      severity: type.name,
      summary: summary,
      life: type.lifeTime
    });
  }
};
DialogMessageService.ctorParameters = () => [{
  type: primeng_api__WEBPACK_IMPORTED_MODULE_1__.MessageService
}];
DialogMessageService = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.Injectable)()], DialogMessageService);


/***/ }),

/***/ 712:
/*!*******************************************************************!*\
  !*** ./src/app/services/select-options/select-options.service.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SelectOptionsService": () => (/* binding */ SelectOptionsService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! tslib */ 2321);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common/http */ 8987);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ngx-translate/core */ 8699);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 635);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 3158);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 833);
/* harmony import */ var _api_routes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../api-routes */ 2061);






let SelectOptionsService = class SelectOptionsService {
  constructor(httpClient, translate) {
    this.httpClient = httpClient;
    this.translate = translate;
  }
  getClientTypes() {
    return this.getOptions(_api_routes__WEBPACK_IMPORTED_MODULE_0__.ApiRoutes.selectOptions.clientTypes);
  }
  getCountries() {
    return this.getOptions(_api_routes__WEBPACK_IMPORTED_MODULE_0__.ApiRoutes.selectOptions.countries);
  }
  getFieldNamesForObjectHistory(event, columns, entityId, entityTableName) {
    return this.getOptions(_api_routes__WEBPACK_IMPORTED_MODULE_0__.ApiRoutes.selectOptions.audits(event, columns, entityId, entityTableName), true);
  }
  getLanguages() {
    return this.getOptions(_api_routes__WEBPACK_IMPORTED_MODULE_0__.ApiRoutes.selectOptions.languages);
  }
  getUserRoles() {
    return this.getOptions(_api_routes__WEBPACK_IMPORTED_MODULE_0__.ApiRoutes.selectOptions.userRoles);
  }
  getYesNoOptions() {
    return this.getOptions(_api_routes__WEBPACK_IMPORTED_MODULE_0__.ApiRoutes.selectOptions.yesNoOptions, true);
  }
  getOptions(url, insertAllOption = false) {
    return this.httpClient.get(url).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_1__.map)(result => {
      const options = [];
      if (insertAllOption) {
        options.push({
          label: this.translate.instant('General.All'),
          value: -1
        });
      }
      for (let item of result) {
        options.push({
          label: item.Name,
          value: item.Value
        });
      }
      return options;
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.catchError)(error => {
      console.log(error);
      return new rxjs__WEBPACK_IMPORTED_MODULE_3__.Observable(error);
    }));
  }
};
SelectOptionsService.ctorParameters = () => [{
  type: _angular_common_http__WEBPACK_IMPORTED_MODULE_4__.HttpClient
}, {
  type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_5__.TranslateService
}];
SelectOptionsService = (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_7__.Injectable)()], SelectOptionsService);


/***/ }),

/***/ 997:
/*!*****************************************!*\
  !*** ./src/app/tools/access-control.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AccessControl": () => (/* binding */ AccessControl)
/* harmony export */ });
class AccessControl {
  constructor(authorizationService, permissions) {
    this.authorizationService = authorizationService;
    this.permissions = permissions;
    this.hasAccessToButtons = true;
    this.determineWhetherUserHasAccessToButtons();
  }
  determineWhetherUserHasAccessToButtons() {
    this.permissions.forEach(permission => {
      this.hasAccessToButtons = this.hasAccessToButtons && this.authorizationService.isAuthorized([permission]);
    });
  }
}

/***/ }),

/***/ 1421:
/*!**************************************************!*\
  !*** ./src/app/tools/database-operation-type.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DataBaseOperationTypeMessagePartsForConsole": () => (/* binding */ DataBaseOperationTypeMessagePartsForConsole)
/* harmony export */ });
const DataBaseOperationTypeMessagePartsForConsole = {
  create: {
    name: "created"
  },
  delete: {
    name: "deleted"
  },
  update: {
    name: "updated"
  }
};

/***/ }),

/***/ 2135:
/*!***************************************!*\
  !*** ./src/app/tools/message-type.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MessageTypes": () => (/* binding */ MessageTypes)
/* harmony export */ });
/* harmony import */ var _enums_message_lifetime_enum__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../enums/message-lifetime-enum */ 3778);
/* harmony import */ var _enums_message_type_enum__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../enums/message-type-enum */ 7908);


const MessageTypes = {
  error: {
    name: _enums_message_type_enum__WEBPACK_IMPORTED_MODULE_1__.MessageTypeEnum.Error,
    lifeTime: _enums_message_lifetime_enum__WEBPACK_IMPORTED_MODULE_0__.MessageLifeTimeEnum.Error
  },
  info: {
    name: _enums_message_type_enum__WEBPACK_IMPORTED_MODULE_1__.MessageTypeEnum.Info,
    lifeTime: _enums_message_lifetime_enum__WEBPACK_IMPORTED_MODULE_0__.MessageLifeTimeEnum.Info
  },
  success: {
    name: _enums_message_type_enum__WEBPACK_IMPORTED_MODULE_1__.MessageTypeEnum.Success,
    lifeTime: _enums_message_lifetime_enum__WEBPACK_IMPORTED_MODULE_0__.MessageLifeTimeEnum.Success
  },
  warning: {
    name: _enums_message_type_enum__WEBPACK_IMPORTED_MODULE_1__.MessageTypeEnum.Warning,
    lifeTime: _enums_message_lifetime_enum__WEBPACK_IMPORTED_MODULE_0__.MessageLifeTimeEnum.Warning
  }
};

/***/ }),

/***/ 3061:
/*!*********************************************************!*\
  !*** ./src/app/tools/png-table-search-query-builder.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PngTableSearchQueryBuilder": () => (/* binding */ PngTableSearchQueryBuilder)
/* harmony export */ });
/* harmony import */ var primeng_api__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! primeng/api */ 4356);
/* harmony import */ var _stringBuilder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./stringBuilder */ 6856);
/* harmony import */ var _primeNgHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./primeNgHelper */ 3833);
/* harmony import */ var _enums_search_operator_enum__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../enums/search-operator-enum */ 8144);




class PngTableSearchQueryBuilder {
  constructor(event, columns) {
    this.event = event;
    this.columns = columns;
    this.resultUriBuilder = new _stringBuilder__WEBPACK_IMPORTED_MODULE_0__.StringBuilder();
  }
  create() {
    this.buildBaseUri();
    this.addFilters();
    return this.resultUriBuilder.toString();
  }
  buildBaseUri() {
    var _a, _b;
    var _c;
    (_a = (_c = this.event).sortField) !== null && _a !== void 0 ? _a : _c.sortField = (_b = this.columns[0]) === null || _b === void 0 ? void 0 : _b.field;
    this.resultUriBuilder.append(`?sf=${this.event.sortField}&so=${this.event.sortOrder}&pc=${this.event.rows}&sr=${this.event.first}`);
  }
  addFilters() {
    let whereBuilder = new _stringBuilder__WEBPACK_IMPORTED_MODULE_0__.StringBuilder();
    this.addGlobalFilters(whereBuilder);
    this.addLocalFilters(whereBuilder);
    if (whereBuilder.length() > 1) {
      whereBuilder.removeFromEnd(2);
    }
    this.resultUriBuilder.append(`&f=${whereBuilder.toString()}`);
  }
  addGlobalFilters(whereBuilder) {
    var _a;
    if (this.event.globalFilter) {
      const globalFilterColumns = this.columns.filter(c => c.applyGlobalFiltering === true);
      for (const column of globalFilterColumns) {
        const replaceWith = (_a = column.replaceWith) !== null && _a !== void 0 ? _a : column.field;
        let value = this.event.globalFilter;
        let matchMode = primeng_api__WEBPACK_IMPORTED_MODULE_3__.FilterMatchMode.CONTAINS;
        if (column.options) {
          value = column.options.filter(o => {
            var _a;
            return (_a = o.label) === null || _a === void 0 ? void 0 : _a.toLowerCase().includes(value.toLowerCase());
          }).map(o => o.value).join(", ");
          matchMode = primeng_api__WEBPACK_IMPORTED_MODULE_3__.FilterMatchMode.IN;
        }
        whereBuilder.append(`${replaceWith}|${matchMode}|${value}|${_enums_search_operator_enum__WEBPACK_IMPORTED_MODULE_2__.SearchOperatorEnum.MatchAny}|${column.filterType}||`);
      }
    }
  }
  addLocalFilters(whereBuilder) {
    var _a, _b;
    for (const column of this.columns) {
      const filtersGroup = (_a = this.event.filters) === null || _a === void 0 ? void 0 : _a[column.field];
      if (filtersGroup === undefined) continue;
      const replaceWith = (_b = column.replaceWith) !== null && _b !== void 0 ? _b : column.field;
      const filters = filtersGroup;
      for (const filter of filters) {
        if (filter.value == null) continue;
        let value = undefined;
        if (Array.isArray(filter.value)) {
          const filterValues = filter.value;
          const valueBuilder = new _stringBuilder__WEBPACK_IMPORTED_MODULE_0__.StringBuilder();
          filterValues.forEach(fv => valueBuilder.append(`${fv.value},`));
          if (valueBuilder.length() > 0) valueBuilder.removeFromEnd(1);
          value = valueBuilder.toString();
        } else {
          value = filter.value;
        }
        if (PngTableSearchQueryBuilder.DATE_MATCH_MODES.find(mode => mode == filter.matchMode)) value = _primeNgHelper__WEBPACK_IMPORTED_MODULE_1__.PrimeNgHelper.getDateFromCalendarAsString(value);
        whereBuilder.append(`${replaceWith}|${filter.matchMode}|${value}|${filter.operator}|${column.filterType}||`);
      }
    }
  }
}
PngTableSearchQueryBuilder.DATE_MATCH_MODES = [primeng_api__WEBPACK_IMPORTED_MODULE_3__.FilterMatchMode.DATE_IS, primeng_api__WEBPACK_IMPORTED_MODULE_3__.FilterMatchMode.DATE_AFTER, primeng_api__WEBPACK_IMPORTED_MODULE_3__.FilterMatchMode.DATE_BEFORE, primeng_api__WEBPACK_IMPORTED_MODULE_3__.FilterMatchMode.DATE_IS_NOT];

/***/ }),

/***/ 3833:
/*!****************************************!*\
  !*** ./src/app/tools/primeNgHelper.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PrimeNgHelper": () => (/* binding */ PrimeNgHelper)
/* harmony export */ });
/* harmony import */ var _stringBuilder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./stringBuilder */ 6856);

class PrimeNgHelper {
  static getDateFromCalendar(date) {
    if (!isNaN(Date.parse(date))) {
      const parsedDate = new Date(date);
      return new Date(Date.UTC(parsedDate.getFullYear(), parsedDate.getMonth(), parsedDate.getDate()));
    }
    return null;
  }
  static getDateFromCalendarAsString(date) {
    date = new Date(date);
    if (!date) return;
    date = new Date(date.setMinutes(date.getMinutes() - date.getTimezoneOffset()));
    return new _stringBuilder__WEBPACK_IMPORTED_MODULE_0__.StringBuilder(date.getFullYear().toString()).append('-').append((date.getMonth() + 1).toLocaleString('pl-PL', {
      minimumIntegerDigits: 2,
      useGrouping: false
    })).append('-').append(date.getDate().toLocaleString('pl-PL', {
      minimumIntegerDigits: 2,
      useGrouping: false
    })).toString();
  }
}

/***/ }),

/***/ 6132:
/*!****************************************!*\
  !*** ./src/app/tools/regexPatterns.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RegexPatterns": () => (/* binding */ RegexPatterns)
/* harmony export */ });
class RegexPatterns {}
// static emailPattern = '^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$';
RegexPatterns.emailPattern = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$";
RegexPatterns.phoneNumberPattern = '^[+]*[(]{0,1}[0-9\\s]{1,4}[)]{0,1}[-\s\.[0-9\\s]*$';
RegexPatterns.bankAccountPattern = '^[0-9]{26}$';
RegexPatterns.postalCodePattern = /\d{2}-\d{3}/;
RegexPatterns.passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/;
RegexPatterns.passwordOrEmptyPattern = /^$|[0-9a-zA-Z]{8,20}$/;
RegexPatterns.decimalNumber = /^\d+[\d\s]*[,]?[\d]{0,2}?$/;
RegexPatterns.regonPattern = /^(?:[^\d]|^)(\d{9}|\d{14})(?:[^\d]|$)/;
RegexPatterns.vehicleRegistrationNumberPattern = /^[A-Z]|[0-9]/;

/***/ }),

/***/ 6856:
/*!****************************************!*\
  !*** ./src/app/tools/stringBuilder.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "StringBuilder": () => (/* binding */ StringBuilder)
/* harmony export */ });
class StringBuilder {
  constructor(initialValue) {
    this.value = [];
    if (initialValue) this.append(initialValue);
  }
  append(text) {
    this.value.push(text);
    return this;
  }
  appendLine(text) {
    return this.append(text ? text : '').append('\n');
  }
  removeFromEnd(numberOfChars) {
    var _a;
    if (this.value.length == 0) {
      return this;
    }
    if (numberOfChars >= this.value[this.value.length - 1].length) {
      this.value = [];
    } else {
      this.value[this.value.length - 1] = (_a = this.value[this.value.length - 1]) === null || _a === void 0 ? void 0 : _a.slice(0, -numberOfChars);
    }
    return this;
  }
  charAtEquals(index, char) {
    if (index < 0 || index >= this.value.length) {
      return false;
    }
    return this.value[index] === char;
  }
  length() {
    return this.value.length > 0 ? this.value[this.value.length - 1].length : 0;
  }
  toString() {
    return this.value.join('');
  }
}

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
  auth_key: "Equiprent"
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

module.exports = "<router-outlet></router-outlet>\r\n";

/***/ }),

/***/ 9633:
/*!**************************************************************!*\
  !*** ./src/app/components/addresses/address.html?ngResource ***!
  \**************************************************************/
/***/ ((module) => {

module.exports = "<div *ngIf=\"form\">\r\n  <form [formGroup]=\"form\">\r\n    <div *ngIf=\"showTitle\" class=\"field col-12 m-0\">\r\n      <h5>Address</h5>\r\n    </div>\r\n    <div class=\"p-fluid p-formgrid grid px-0 py-0 m-0\">\r\n      <div class=\"field col-12 md:col-6 py-0 mb-0\">\r\n        <div class=\"flex-wrap mb-3\">\r\n          <label [class]=\"'block font-medium mb-2' + requiredFields.includes('StreetName') ? ' text-900' : ''\">\r\n            {{ 'Address.StreetName' | translate }}\r\n          </label>\r\n          <input pInputText class=\"p-inputtext mb-2\" formControlName=\"StreetName\" type=\"text\" />\r\n          <p-message *ngIf=\"formValidator.hasError('StreetName')\" severity=\"error\"\r\n            [text]=\"translate.instant('Messages.FieldRequired')\"></p-message>\r\n        </div>\r\n        <div class=\"flex-wrap mb-3\">\r\n          <label [class]=\"'block font-medium mb-2' + requiredFields.includes('StreetNumber') ? ' text-900' : ''\">\r\n            {{ 'Address.StreetNumber' | translate }}\r\n          </label>\r\n          <input pInputText class=\"p-inputtext mb-2\" formControlName=\"StreetNumber\" type=\"text\" />\r\n          <p-message *ngIf=\"formValidator.hasError('StreetNumber')\" severity=\"error\"\r\n            [text]=\"translate.instant('Messages.FieldRequired')\"></p-message>\r\n        </div>\r\n        <div class=\"flex-wrap mb-3\">\r\n          <label [class]=\"'block font-medium mb-2' + requiredFields.includes('ApartmentNumber') ? ' text-900' : ''\">\r\n            {{ 'Address.ApartmentNumber' | translate }}\r\n          </label>\r\n          <input pInputText class=\"p-inputtext mb-2\" formControlName=\"ApartmentNumber\" type=\"text\" />\r\n        </div>\r\n      </div>\r\n      <div class=\"field col-12 md:col-6 py-0 mb-0\">\r\n        <div class=\"flex-wrap mb-4\">\r\n          <label [class]=\"'block font-medium mb-2' + requiredFields.includes('CountryId') ? ' text-900' : ''\">{{\r\n            'Address.Country' | translate }}</label>\r\n          <p-dropdown class=\"mb-2\" [options]=\"countries\" formControlName=\"CountryId\"\r\n            [placeholder]=\"translate.instant('Address.SelectCountry')\" [showClear]=\"false\">\r\n            <ng-template let-role pTemplate=\"selectedItem\">\r\n              <div>{{ role.label | translate }}</div>\r\n            </ng-template>\r\n            <ng-template let-role pTemplate=\"item\">\r\n              <div>{{ role.label | translate }}</div>\r\n            </ng-template>\r\n          </p-dropdown>\r\n        </div>\r\n        <div class=\"flex-wrap mb-3\">\r\n          <label [class]=\"'block font-medium mb-2' + requiredFields.includes('PostalCode') ? ' text-900' : ''\">\r\n            {{ 'Address.PostalCode' | translate }}\r\n          </label>\r\n          <input pInputText class=\"p-inputtext mb-2\" formControlName=\"PostalCode\" type=\"text\" />\r\n          <p-message *ngIf=\"formValidator.hasError('PostalCode')\" severity=\"error\"\r\n            [text]=\"translate.instant('Messages.FieldRequired')\"></p-message>\r\n        </div>\r\n        <div class=\"flex-wrap mb-3\">\r\n          <label [class]=\"'block font-medium mb-2' + requiredFields.includes('City') ? ' text-900' : ''\">\r\n            {{ 'Address.City' | translate }}\r\n          </label>\r\n          <input pInputText class=\"p-inputtext mb-2\" formControlName=\"City\" type=\"text\" />\r\n          <p-message *ngIf=\"formValidator.hasError('City')\" severity=\"error\"\r\n            [text]=\"translate.instant('Messages.FieldRequired')\"></p-message>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <div class=\"p-fluid p-formgrid grid px-0 py-0 m-0\">\r\n      <div class=\"field col-12 md:col-6 py-0 mb-0\">\r\n        <div class=\"flex-wrap mb-3\">\r\n          <label [class]=\"'block font-medium mb-2' + requiredFields.includes('Email') ? ' text-900' : ''\">\r\n            {{ 'Address.Email' | translate }}\r\n          </label>\r\n          <input pInputText class=\"p-inputtext mb-2\" formControlName=\"Email\" type=\"text\" />\r\n          <p-message *ngIf=\"formValidator.hasError('Email')\" severity=\"error\"\r\n            [text]=\"translate.instant('Messages.FieldRequired')\"></p-message>\r\n        </div>\r\n      </div>\r\n      <div class=\"col-12 md:col-6 py-0 mb-0\">\r\n        <div class=\"flex-wrap mb-3\">\r\n          <label [class]=\"'block font-medium mb-2' + requiredFields.includes('PhoneNumber') ? ' text-900' : ''\">\r\n            {{ 'Address.PhoneNumber' | translate }}\r\n          </label>\r\n          <input pInputText class=\"p-inputtext mb-2\" formControlName=\"PhoneNumber\" type=\"text\" />\r\n          <p-message *ngIf=\"formValidator.hasError('PhoneNumber')\" severity=\"error\"\r\n            [text]=\"translate.instant('Messages.FieldRequired')\"></p-message>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </form>\r\n</div>";

/***/ }),

/***/ 9618:
/*!*****************************************************************************!*\
  !*** ./src/app/components/addresses/company-client-address.html?ngResource ***!
  \*****************************************************************************/
/***/ ((module) => {

module.exports = "<div *ngIf=\"form\">\r\n  <form [formGroup]=\"form\">\r\n    <div class=\"p-fluid p-formgrid grid px-0 py-0 m-0\">\r\n      <div class=\"field col-12 md:col-6 py-0 mb-0\">\r\n        <div class=\"flex-wrap mb-3\">\r\n          <label class=\"block text-900 font-medium mb-2\">\r\n            {{ 'CompanyClientAddress.NationalCompanyId' | translate }}\r\n          </label>\r\n          <input pInputText class=\"p-inputtext mb-2\" formControlName=\"NationalCompanyId\" type=\"text\" />\r\n          <p-message *ngIf=\"formValidator.hasError('NationalCompanyId')\" severity=\"error\"\r\n            [text]=\"translate.instant('Messages.FieldRequired')\"></p-message>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </form>\r\n</div>";

/***/ }),

/***/ 1231:
/*!*****************************************************************************!*\
  !*** ./src/app/components/addresses/private-client-address.html?ngResource ***!
  \*****************************************************************************/
/***/ ((module) => {

module.exports = "<div *ngIf=\"form\">\r\n  <form [formGroup]=\"form\">\r\n    <div class=\"p-fluid p-formgrid grid px-0 py-0 m-0\">\r\n      <div class=\"field col-12 md:col-6 py-0 mb-0\">\r\n        <div class=\"flex-wrap mb-3\">\r\n          <label class=\"block text-900 font-medium mb-2\">\r\n            {{ 'PrivateClientAddress.NationalCitizenId' | translate }}\r\n          </label>\r\n          <input pInputText class=\"p-inputtext mb-2\" formControlName=\"NationalCitizenId\" type=\"text\" />\r\n          <p-message *ngIf=\"formValidator.hasError('NationalCitizenId')\" severity=\"error\"\r\n            [text]=\"translate.instant('Messages.FieldRequired')\"></p-message>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </form>\r\n</div>";

/***/ }),

/***/ 7944:
/*!*************************************************************************!*\
  !*** ./src/app/components/audits/audit-list-for-entity.html?ngResource ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = "<div class=\"grid\">\r\n  <div class=\"col-12\">\r\n    <div class=\"card\">\r\n      <div class=\"col-12\">\r\n        <p-table #dataTable [value]=\"audits\" [columns]=\"table.cols\" sortField=\"CreatedOn\" [sortOrder]=\"-1\" [lazy]=\"true\"\r\n          (onLazyLoad)=\"loadAuditsLazy($event)\" [rows]=\"10\" [rowsPerPageOptions]=\"[10, 25, 50]\"\r\n          [totalRecords]=\"totalRecords\" [rowHover]=\"true\" styleClass=\"p-datatable-gridlines\" [paginator]=\"true\"\r\n          responsiveLayout=\"scroll\">\r\n          <ng-template pTemplate=\"caption\">\r\n            <div class=\"flex flex-column md:flex-row md:justify-content-between gap-2\">\r\n              <button pButton [label]=\"translate.instant('General.Clear')\" class=\"p-button-outlined mb-2\"\r\n                icon=\"pi pi-filter-slash\" (click)=\"filterService.onClearFilters(dataTable)\"></button>\r\n              <div class=\"grid formgrid\">\r\n                <div class=\"col-12 mb-2 lg:col-4 lg:mb-0 mt-2\">\r\n                  <span class=\"p-input-icon-right\">\r\n                    <i *ngIf=\"filter.value && !filterService.shouldHideIcon(filter.value)\" class=\"pi pi-search\"></i>\r\n                    <input type=\"text\" pInputText #filter id=\"filter\"\r\n                      (input)=\"filterService.onFilterGlobal(dataTable, filter.value)\"\r\n                      [placeholder]=\"translate.instant('General.SearchKeyword')\" />\r\n                  </span>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </ng-template>\r\n          <ng-template pTemplate=\"header\" let-columns>\r\n            <tr>\r\n              <th *ngFor=\"let col of columns\" style=\"min-width: 12rem\" [ngSwitch]=\"col.field\">\r\n                <div class=\"flex justify-content-between align-items-center\">\r\n                  {{ col.header | translate }}\r\n                  <p-columnFilter *ngSwitchCase=\"'UserName'\" pInputText type=\"text\"\r\n                    [placeholder]=\"filterService.getPlaceholder(translate.instant(col.header))\" display=\"menu\"\r\n                    field=\"UserName\">\r\n                  </p-columnFilter>\r\n                  <p-columnFilter *ngSwitchCase=\"'CreatedOn'\" pInputText type=\"text\"\r\n                    [placeholder]=\"filterService.getPlaceholder(translate.instant(col.header))\" display=\"menu\"\r\n                    field=\"CreatedOn\">\r\n                  </p-columnFilter>\r\n                  <p-columnFilter *ngSwitchCase=\"'FieldName'\"\r\n                    [placeholder]=\"filterService.getPlaceholder(translate.instant(col.header))\" display=\"menu\"\r\n                    field=\"FieldName\" matchMode=\"in\" [showMatchModes]=\"false\" [showOperator]=\"false\"\r\n                    [showAddButton]=\"false\">\r\n                    <ng-template pTemplate=\"header\">\r\n                      <div>\r\n                        <span class=\"font-bold\">{{translate.instant('Audit.FieldNamePicker')}}</span>\r\n                      </div>\r\n                    </ng-template>\r\n                    <ng-template pTemplate=\"filter\" let-value let-filter=\"filterCallback\">\r\n                      <p-multiSelect [ngModel]=\"value\" [options]=\"fieldNameOptions\"\r\n                        [placeholder]=\"filterService.getPlaceholder(translate.instant(col.header))\"\r\n                        (onChange)=\"filter($event.value)\" optionLabel=\"label\">\r\n                        <ng-template let-option pTemplate=\"item\">\r\n                          <div class=\"p-multiselect-representative-option\">\r\n                            <span class=\"ml-1\">{{option.label}}</span>\r\n                          </div>\r\n                        </ng-template>\r\n                      </p-multiSelect>\r\n                    </ng-template>\r\n                  </p-columnFilter>\r\n                  <p-columnFilter *ngSwitchCase=\"'OldValue'\" pInputText type=\"text\"\r\n                    [placeholder]=\"filterService.getPlaceholder(translate.instant(col.header))\" display=\"menu\"\r\n                    field=\"OldValue\">\r\n                  </p-columnFilter>\r\n                  <p-columnFilter *ngSwitchCase=\"'NewValue'\" pInputText type=\"text\"\r\n                    [placeholder]=\"filterService.getPlaceholder(translate.instant(col.header))\" display=\"menu\"\r\n                    field=\"NewValue\">\r\n                  </p-columnFilter>\r\n                </div>\r\n              </th>\r\n            </tr>\r\n          </ng-template>\r\n          <ng-template pTemplate=\"body\" let-audit let-columns=\"columns\">\r\n            <tr>\r\n              <td>\r\n                {{audit.UserName}}\r\n              </td>\r\n              <td>\r\n                {{audit.CreatedOn | date:'yyyy-MM-dd HH:mm:ss' }}\r\n              </td>\r\n              <td>\r\n                {{audit.Translation}}\r\n              </td>\r\n              <td>\r\n                {{audit.OldValue}}\r\n              </td>\r\n              <td>\r\n                {{audit.NewValue}}\r\n              </td>\r\n            </tr>\r\n          </ng-template>\r\n        </p-table>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>";

/***/ }),

/***/ 229:
/*!******************************************************************!*\
  !*** ./src/app/components/clients/client-create.html?ngResource ***!
  \******************************************************************/
/***/ ((module) => {

module.exports = "<div class=\"grid form-grid\">\r\n  <div class=\"col-12\">\r\n    <div class=\"card pb-0\">\r\n      <p-tabView>\r\n        <p-tabPanel header=\"{{ 'General.GeneralTab' | translate }}\">\r\n          <form [formGroup]=\"form\">\r\n            <div class=\"col-12 pb-0 px-0\">\r\n              <div class=\"card no-border p-0\">\r\n                <div class=\"p-fluid p-formgrid grid mb-3\">\r\n                  <div\r\n                    [class]=\"'field col-12 md:col-6' + (form && form.value.ClientTypeId !== undefined ? ' mb-0 pb-0' : '')\">\r\n                    <div class=\"flex-wrap mb-3\">\r\n                      <label class=\"block text-900 font-medium mb-2\">{{ 'Client.Name' | translate }}</label>\r\n                      <input pInputText class=\"p-inputtext mb-2\" id=\"name\" formControlName=\"Name\" type=\"text\" />\r\n                      <p-message *ngIf=\"formValidator.hasError('Name')\" severity=\"error\"\r\n                        [text]=\"translate.instant('Messages.FieldRequired')\"></p-message>\r\n                    </div>\r\n                  </div>\r\n                  <div\r\n                    [class]=\"'field col-12 md:col-6' + (form && form.value.ClientTypeId !== undefined ? ' mb-0 pb-0' : '')\">\r\n                    <div class=\"flex-wrap mb-4\">\r\n                      <label class=\"block text-900 font-medium mb-2\">{{ 'Client.Type' | translate }}</label>\r\n                      <p-dropdown class=\"mb-2\" [options]=\"clientTypes\" formControlName=\"ClientTypeId\"\r\n                        [placeholder]=\"translate.instant('Client.SelectType')\" [showClear]=\"false\">\r\n                        <ng-template let-role pTemplate=\"selectedItem\">\r\n                          <div>{{ role.label | translate }}</div>\r\n                        </ng-template>\r\n                        <ng-template let-role pTemplate=\"item\">\r\n                          <div>{{ role.label | translate }}</div>\r\n                        </ng-template>\r\n                      </p-dropdown>\r\n                    </div>\r\n                  </div>\r\n                  <div *ngIf=\"form.value.ClientTypeId === clientType.Private.toString()\" class=\"field col-12 px-0 py-0\">\r\n                    <private-client #privateClientForm>\r\n                    </private-client>\r\n                  </div>\r\n                  <div class=\"field col-12 px-0 py-0\">\r\n                    <address #addressForm [requiredFields]=\"clientAddressRequiredFields\" [showTitle]=\"true\"></address>\r\n                  </div>\r\n                  <div *ngIf=\"form.value.ClientTypeId === clientType.Private.toString()\" class=\"field col-12 px-0 py-0\">\r\n                    <private-client-address #privateClientAddressForm>\r\n                    </private-client-address>\r\n                  </div>\r\n                  <div *ngIf=\"form.value.ClientTypeId === clientType.Company.toString()\" class=\"field col-12 px-0 py-0\">\r\n                    <company-client-address #companyClientAddressForm>\r\n                    </company-client-address>\r\n                  </div>\r\n                </div>\r\n                <div class=\"p-formgrid grid\">\r\n                  <div class=\"field col-12 items-centered mb-0\">\r\n                    <button pButton pRipple type=\"button\" icon=\"pi pi-save\"\r\n                      [label]=\"translate.instant('General.Create')\" class=\"p-button-raised p-button-success mr-2\"\r\n                      [disabled]=\"shouldActionsBeDisabled\" (click)=\"onSubmit()\"></button>\r\n                    <button pButton pRipple type=\"button\" icon=\"pi pi-undo\"\r\n                      [label]=\"translate.instant('General.Cancel')\" class=\"p-button-raised\" [disabled]=\"isExecuting\"\r\n                      (click)=\"onBack()\"></button>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </form>\r\n        </p-tabPanel>\r\n      </p-tabView>\r\n    </div>\r\n  </div>\r\n</div>";

/***/ }),

/***/ 255:
/*!*******************************************************************!*\
  !*** ./src/app/components/clients/client-details.html?ngResource ***!
  \*******************************************************************/
/***/ ((module) => {

module.exports = "<div [class]=\"'grid' + (activeTab === routes.clients.tabs.general.index ? ' form-grid' : '')\">\r\n  <div class=\" col-12\">\r\n    <div class=\"card pb-0\">\r\n      <p-tabView (onChange)=\"switchActiveTab($event.index)\">\r\n        <p-tabPanel header=\"{{ 'General.GeneralTab' | translate }}\"\r\n          [selected]=\"activeTab === routes.clients.tabs.general.index\">\r\n          <form [formGroup]=\"form\">\r\n            <div class=\"col-12 pb-0 px-0\">\r\n              <div class=\"card no-border p-0\">\r\n                <div class=\"p-fluid p-formgrid grid mb-3\">\r\n                  <div\r\n                    [class]=\"'field col-12 md:col-6' + (form && form.value.ClientTypeId !== undefined ? ' mb-0 pb-0' : '')\">\r\n                    <div class=\"flex-wrap mb-3\">\r\n                      <label class=\"block text-900 font-medium mb-2\">{{ 'Client.Name' | translate }}</label>\r\n                      <input pInputText class=\"p-inputtext mb-2\" id=\"name\" formControlName=\"Name\" type=\"text\" />\r\n                      <p-message *ngIf=\"formValidator.hasError('Name')\" severity=\"error\"\r\n                        [text]=\"translate.instant('Messages.FieldRequired')\"></p-message>\r\n                    </div>\r\n                  </div>\r\n                  <div\r\n                    [class]=\"'field col-12 md:col-6' + (form && form.value.ClientTypeId !== undefined ? ' mb-0 pb-0' : '')\">\r\n                    <div class=\"flex-wrap mb-4\">\r\n                      <label class=\"block text-900 font-medium mb-2\">{{ 'Client.Type' | translate }}</label>\r\n                      <p-dropdown class=\"mb-2\" [options]=\"clientTypes\" formControlName=\"ClientTypeId\"\r\n                        [placeholder]=\"translate.instant('Client.SelectType')\" [showClear]=\"false\">\r\n                        <ng-template let-role pTemplate=\"selectedItem\">\r\n                          <div>{{ role.label | translate }}</div>\r\n                        </ng-template>\r\n                        <ng-template let-role pTemplate=\"item\">\r\n                          <div>{{ role.label | translate }}</div>\r\n                        </ng-template>\r\n                      </p-dropdown>\r\n                    </div>\r\n                  </div>\r\n                  <div *ngIf=\"client && form.value.ClientTypeId === clientType.Private.toString()\"\r\n                    class=\"field col-12 px-0 py-0\">\r\n                    <private-client #privateClientForm [client]=\"client\">\r\n                    </private-client>\r\n                  </div>\r\n                  <div *ngIf=\"client\" class=\"field col-12 px-0 py-0\">\r\n                    <address #addressForm [entityAddress]=\"client.Addresses[0]\"\r\n                      [requiredFields]=\"clientAddressRequiredFields\" [showTitle]=\"true\"></address>\r\n                  </div>\r\n                  <div *ngIf=\"client && form.value.ClientTypeId === clientType.Private.toString()\"\r\n                    class=\"field col-12 px-0 py-0\">\r\n                    <private-client-address #privateClientAddressForm [clientAddress]=\"client.Addresses[0]\">\r\n                    </private-client-address>\r\n                  </div>\r\n                  <div *ngIf=\"client && form.value.ClientTypeId === clientType.Company.toString()\"\r\n                    class=\"field col-12 px-0 py-0\">\r\n                    <company-client-address #companyClientAddressForm [clientAddress]=\"client.Addresses[0]\">\r\n                    </company-client-address>\r\n                  </div>\r\n                </div>\r\n                <div class=\"p-formgrid grid\">\r\n                  <div class=\"field col-12 items-centered mb-0\">\r\n                    <button *ngIf=\"hasAccessToButtons && !isDisabled\" pButton pRipple type=\"button\" icon=\"pi pi-save\"\r\n                      [label]=\"translate.instant('General.Save')\" class=\"p-button-raised p-button-success mr-2\"\r\n                      [disabled]=\"shouldActionsBeDisabled\" (click)=\"onSubmit()\"></button>\r\n                    <button *ngIf=\"hasAccessToButtons && !isDisabled\" pButton pRipple type=\"button\" icon=\"pi pi-trash\"\r\n                      [label]=\"translate.instant('General.Delete')\" class=\"p-button-raised p-button-danger mr-2\"\r\n                      [disabled]=\"shouldActionsBeDisabled\" (click)=\"onDelete()\"></button>\r\n                    <button pButton pRipple type=\"button\" icon=\"pi pi-undo\"\r\n                      [label]=\"translate.instant('General.Cancel')\" class=\"p-button-raised\" [disabled]=\"isExecuting\"\r\n                      (click)=\"onBack()\"></button>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </form>\r\n        </p-tabPanel>\r\n        <p-tabPanel *ngIf=\"client && form.value.ClientTypeId === clientType.Company.toString()\"\r\n          header=\"{{ 'Client.RepresentativesTab' | translate }}\"\r\n          [selected]=\"activeTab === routes.clients.tabs.representatives.index\">\r\n          <client-representative-list [clientId]=\"client.Id\"></client-representative-list>\r\n        </p-tabPanel>\r\n        <p-tabPanel header=\"{{ 'Audit.History' | translate}}\"\r\n          [selected]=\"activeTab === routes.clients.tabs.audits.index\">\r\n          <audit-list-for-entity #audits *ngIf=\"client\" [entityId]=\"client.Id\"\r\n            [entityTableName]=\"form.value.ClientTypeId === clientType.Company.toString() ? 'CompanyClients' : 'PrivateClients'\"\r\n            translation=\"Client\"></audit-list-for-entity>\r\n        </p-tabPanel>\r\n      </p-tabView>\r\n    </div>\r\n    <deletion-dialog [deletionKey]=\"deletionKey\"></deletion-dialog>\r\n  </div>\r\n</div>";

/***/ }),

/***/ 93:
/*!****************************************************************!*\
  !*** ./src/app/components/clients/client-list.html?ngResource ***!
  \****************************************************************/
/***/ ((module) => {

module.exports = "<div class=\"grid\">\r\n  <div class=\"col-12\">\r\n    <div class=\"card\">\r\n      <div class=\"col-12\">\r\n        <div class=\"flex flex-column md:flex-row\">\r\n          <button *ngIf=\"hasAccessToButtons\" pButton [label]=\"translate.instant('General.Create')\"\r\n            class=\"p-button-outlined ml-auto\" icon=\"fa fa-face-smile\" (click)=\"onCreate()\"></button>\r\n        </div>\r\n      </div>\r\n      <div class=\"col-12\">\r\n        <p-table #dataTable [value]=\"clients\" [columns]=\"cols\" dataKey=\"Id\" sortField=\"Name\" [lazy]=\"true\"\r\n          (onLazyLoad)=\"loadClientsLazy($event)\" [rows]=\"25\" [rowsPerPageOptions]=\"[25, 50, 100]\"\r\n          [totalRecords]=\"totalRecords\" [rowHover]=\"true\" styleClass=\"p-datatable-gridlines\" [paginator]=\"true\"\r\n          responsiveLayout=\"scroll\">\r\n          <ng-template pTemplate=\"caption\">\r\n            <div class=\"flex flex-column md:flex-row md:justify-content-between gap-2\">\r\n              <button pButton [label]=\"translate.instant('General.Clear')\" class=\"p-button-outlined mb-2\"\r\n                icon=\"pi pi-filter-slash\" (click)=\"filterService.onClearFilters(dataTable)\"></button>\r\n              <div class=\"grid formgrid\">\r\n                <div class=\"col-12 mb-2 lg:col-4 lg:mb-0 mt-2\">\r\n                  <span class=\"p-input-icon-right\">\r\n                    <i *ngIf=\"filter.value && !filterService.shouldHideIcon(filter.value)\" class=\"pi pi-search\"></i>\r\n                    <input type=\"text\" pInputText #filter id=\"filter\"\r\n                      (input)=\"filterService.onFilterGlobal(dataTable, filter.value)\"\r\n                      [placeholder]=\"translate.instant('General.SearchKeyword')\" />\r\n                  </span>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </ng-template>\r\n          <ng-template pTemplate=\"header\" let-columns>\r\n            <tr>\r\n              <th *ngFor=\"let col of columns\" style=\"min-width: 12rem\" [ngSwitch]=\"col.field\">\r\n                <div class=\"flex justify-content-between align-items-center\">\r\n                  {{ col.header | translate }}\r\n                  <p-columnFilter *ngSwitchCase=\"'Name'\" pInputText type=\"text\"\r\n                    [placeholder]=\"filterService.getPlaceholder(translate.instant(col.header))\" display=\"menu\"\r\n                    field=\"Name\">\r\n                  </p-columnFilter>\r\n                  <p-columnFilter *ngSwitchCase=\"'FirstName'\" pInputText type=\"text\"\r\n                    [placeholder]=\"filterService.getPlaceholder(translate.instant(col.header))\" display=\"menu\"\r\n                    field=\"FirstName\">\r\n                  </p-columnFilter>\r\n                  <p-columnFilter *ngSwitchCase=\"'LastName'\" pInputText type=\"text\"\r\n                    [placeholder]=\"filterService.getPlaceholder(translate.instant(col.header))\" display=\"menu\"\r\n                    field=\"LastName\">\r\n                  </p-columnFilter>\r\n                  <p-columnFilter *ngSwitchCase=\"'TypeName'\"\r\n                    [placeholder]=\"filterService.getPlaceholder(translate.instant(col.header))\" display=\"menu\"\r\n                    field=\"TypeName\" matchMode=\"in\" [showMatchModes]=\"false\" [showOperator]=\"false\"\r\n                    [showAddButton]=\"false\">\r\n                    <ng-template pTemplate=\"header\">\r\n                      <div>\r\n                        <span class=\"font-bold\">{{translate.instant('Client.ClientTypePicker')}}</span>\r\n                      </div>\r\n                    </ng-template>\r\n                    <ng-template pTemplate=\"filter\" let-value let-filter=\"filterCallback\">\r\n                      <p-multiSelect [ngModel]=\"value\" [options]=\"clientTypeOptions\"\r\n                        [placeholder]=\"filterService.getPlaceholder(translate.instant(col.header))\"\r\n                        (onChange)=\"filter($event.value)\" optionLabel=\"label\">\r\n                        <ng-template let-option pTemplate=\"item\">\r\n                          <div class=\"p-multiselect-representative-option\">\r\n                            <span class=\"ml-1\">{{option.label}}</span>\r\n                          </div>\r\n                        </ng-template>\r\n                      </p-multiSelect>\r\n                    </ng-template>\r\n                  </p-columnFilter>\r\n                </div>\r\n              </th>\r\n            </tr>\r\n          </ng-template>\r\n          <ng-template pTemplate=\"body\" let-client let-columns=\"columns\">\r\n            <tr>\r\n              <td>\r\n                {{client.Name}}\r\n              </td>\r\n              <td>\r\n                {{client.FirstName}}\r\n              </td>\r\n              <td>\r\n                {{client.LastName}}\r\n              </td>\r\n              <td>\r\n                {{client.TypeName}}\r\n              </td>\r\n              <td class=\"items-centered gap-2\">\r\n                <button pButton pRipple class=\"p-button-raised\" type=\"button\"\r\n                  [class]=\"hasAccessToButtons ? 'p-button-raised' : 'p-button-raised p-button-warning'\"\r\n                  icon=\"pi pi-pencil\" [label]=\"translate.instant(onEditLabelId)\" (click)=\"onEdit(client)\"></button>\r\n                <button *ngIf=\"hasAccessToButtons\" pButton pRipple type=\"button\" icon=\"pi pi-trash\"\r\n                  [label]=\"translate.instant(onDeleteLabelId)\" class=\"p-button-raised p-button-danger\"\r\n                  (click)=\"onDelete(client)\"></button>\r\n              </td>\r\n            </tr>\r\n          </ng-template>\r\n        </p-table>\r\n      </div>\r\n    </div>\r\n    <deletion-dialog [deletionKey]=\"deletionKey\"></deletion-dialog>\r\n  </div>\r\n</div>\r\n<router-outlet></router-outlet>";

/***/ }),

/***/ 8340:
/*!*******************************************************************!*\
  !*** ./src/app/components/clients/private-client.html?ngResource ***!
  \*******************************************************************/
/***/ ((module) => {

module.exports = "<div *ngIf=\"form\">\r\n  <form [formGroup]=\"form\">\r\n    <div class=\"p-fluid p-formgrid grid px-0 py-0 m-0\">\r\n      <div class=\"field col-12 md:col-6 py-0 mb-0\">\r\n        <div class=\"flex-wrap mb-3\">\r\n          <label class=\"block text-900 font-medium mb-2\">{{ 'Client.FirstName' | translate }}</label>\r\n          <input pInputText class=\"p-inputtext mb-2\" id=\"firstName\" formControlName=\"FirstName\" type=\"text\" />\r\n          <p-message *ngIf=\"formValidator.hasError('FirstName')\" severity=\"error\"\r\n            [text]=\"translate.instant('Messages.FieldRequired')\"></p-message>\r\n        </div>\r\n      </div>\r\n      <div class=\"field col-12 md:col-6 py-0 mb-0\">\r\n        <div class=\"flex-wrap mb-3\">\r\n          <label class=\"block text-900 font-medium mb-2\">{{ 'Client.LastName' | translate }}</label>\r\n          <input pInputText class=\"p-inputtext mb-2\" id=\"lastName\" formControlName=\"LastName\" type=\"text\" />\r\n          <p-message *ngIf=\"formValidator.hasError('LastName')\" severity=\"error\"\r\n            [text]=\"translate.instant('Messages.FieldRequired')\"></p-message>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </form>\r\n</div>";

/***/ }),

/***/ 6514:
/*!********************************************************************!*\
  !*** ./src/app/components/dialogs/deletion-dialog.html?ngResource ***!
  \********************************************************************/
/***/ ((module) => {

module.exports = "<p-confirmDialog *ngIf=\"deletionKey\" [header]=\"translate.instant('ClientRepresentative.Deletion')\" [key]=\"deletionKey\"\r\n  icon=\"pi pi-exclamation-triangle\" [style]=\"{width: '350px'}\" acceptButtonStyleClass=\"p-button-text\"\r\n  rejectButtonStyleClass=\"p-button-text\" [acceptLabel]=\"translate.instant('General.Yes')\"\r\n  [rejectLabel]=\"translate.instant('General.No')\">\r\n</p-confirmDialog>";

/***/ }),

/***/ 8089:
/*!***********************************************************************!*\
  !*** ./src/app/components/login/login-reset-password.html?ngResource ***!
  \***********************************************************************/
/***/ ((module) => {

module.exports = "<div\r\n  class=\"surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden login-body\">\r\n  <div class=\"flex flex-column align-items-center justify-content-center\">\r\n    <div class=\"login-panel\">\r\n      <div class=\"w-full surface-card py-8 px-5 sm:px-8\" style=\"border-radius:53px\">\r\n        <div class=\"text-center mb-5\">\r\n          <div class=\"text-900 text-3xl font-medium mb-3\">{{ 'User.PasswordChange' | translate }}</div>\r\n        </div>\r\n\r\n        <form [formGroup]=\"form\">\r\n          <div>\r\n            <label for=\"email\" class=\"block text-900 text-xl font-medium mb-2\">{{ 'User.Email' | translate }}</label>\r\n            <input pInputText id=\"email\" formControlName=\"Email\" type=\"email\" class=\"p-inputtext w-full mb-5\"\r\n              style=\"padding:1rem\" autocomplete=\"off\">\r\n            <button pButton pRipple label=\"{{ 'General.Send' | translate }}\" class=\"w-full p-3 text-xl\"\r\n              (click)=\"onSubmit()\"></button>\r\n          </div>\r\n        </form>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n<p-toast key=\"tst\"></p-toast>";

/***/ }),

/***/ 1320:
/*!********************************************************!*\
  !*** ./src/app/components/login/login.html?ngResource ***!
  \********************************************************/
/***/ ((module) => {

module.exports = "<div\r\n  class=\"surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden login-body\">\r\n  <div class=\"flex flex-column align-items-center justify-content-center\">\r\n    <div class=\"login-panel\">\r\n      <div class=\"w-full surface-card py-8 px-5 sm:px-8\" style=\"border-radius:53px\">\r\n        <div class=\"text-center mb-5\">\r\n          <div class=\"text-900 text-3xl font-medium mb-3\">{{ 'General.Welcome' | translate }}</div>\r\n          <span class=\"text-600 font-medium\">{{ 'General.SignInToContinue' | translate }}</span>\r\n        </div>\r\n\r\n        <form [formGroup]=\"form\">\r\n          <div>\r\n            <label for=\"login\" class=\"block text-900 text-xl font-medium mb-2\">{{ 'User.Login' | translate }}</label>\r\n            <input pInputText id=\"login\" formControlName=\"Login\" type=\"text\" class=\"p-inputtext w-full md:w-30rem mb-5\"\r\n              style=\"padding:1rem\" autocomplete=\"off\">\r\n            <label for=\"password\" class=\"block text-900 font-medium text-xl mb-2\">{{ 'User.Password' | translate\r\n              }}</label>\r\n            <p-password id=\"password\" formControlName=\"Password\" [toggleMask]=\"true\" styleClass=\"mb-5\"\r\n              [feedback]=\"false\" inputStyleClass=\"w-full p-3 md:w-30rem\"></p-password>\r\n\r\n            <div class=\"flex align-items-center justify-content-between mb-5 gap-5\">\r\n              <!-- [TODO] Forgot password -->\r\n              <!-- <a class=\"font-medium no-underline ml-2 text-right cursor-pointer\" style=\"color: var(--primary-color)\"\r\n                [routerLink]=\"\" (click)=\"resetPassword()\">{{\r\n                'General.ForgotPassword' | translate }}?</a> -->\r\n            </div>\r\n            <button pButton pRipple label=\"{{ 'General.SignIn' | translate }}\" class=\"w-full p-3 text-xl\"\r\n              (click)=\"onSubmit()\"></button>\r\n          </div>\r\n        </form>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n<p-toast key=\"tst\"></p-toast>";

/***/ }),

/***/ 6520:
/*!********************************************************************************!*\
  !*** ./src/app/components/name-in-languages/name-in-languages.html?ngResource ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = "<div *ngIf=\"form\">\r\n  <form [formGroup]=\"form\">\r\n    <div *ngFor=\"let language of languages\">\r\n      <label [class]=\"!disabled ? 'block text-900 font-medium mb-2' : 'block font-medium mb-2'\">{{ 'General.Name' |\r\n        translate }} ({{ language.label }})</label>\r\n      <input pInputText class=\"p-inputtext mb-2\" [formControlName]=\"language.label!\" type=\"text\"\r\n        (onChange)=\"onChangeInput()\" />\r\n      <p-message *ngIf=\"formValidator.hasError(language.label!)\" severity=\"error\"\r\n        [text]=\"translate.instant('Messages.FieldRequired')\"></p-message>\r\n    </div>\r\n  </form>\r\n</div>";

/***/ }),

/***/ 5730:
/*!*****************************************************************************************!*\
  !*** ./src/app/components/representatives/client-representative-create.html?ngResource ***!
  \*****************************************************************************************/
/***/ ((module) => {

module.exports = "<div class=\"grid form-grid\">\r\n  <div class=\"col-12\">\r\n    <div class=\"card pb-0\">\r\n      <form [formGroup]=\"form\">\r\n        <div class=\"col-12 pb-0 px-0\">\r\n          <div class=\"card no-border p-0\">\r\n            <div class=\"p-fluid p-formgrid grid mb-3\">\r\n              <div class=\"field col-12 md:col-6 mb-0 pb-0\">\r\n                <div class=\"flex-wrap mb-3\">\r\n                  <label class=\"block text-900 font-medium mb-2\">{{ 'ClientRepresentative.LastName' | translate\r\n                    }}</label>\r\n                  <input pInputText class=\"p-inputtext mb-2\" id=\"lastName\" formControlName=\"LastName\" type=\"text\" />\r\n                  <p-message *ngIf=\"formValidator.hasError('LastName')\" severity=\"error\"\r\n                    [text]=\"translate.instant('Messages.FieldRequired')\"></p-message>\r\n                </div>\r\n              </div>\r\n              <div class=\"field col-12 md:col-6 mb-0 pb-0\">\r\n                <div class=\"flex-wrap mb-3\">\r\n                  <label class=\"block text-900 font-medium mb-2\">{{ 'ClientRepresentative.FirstName' | translate\r\n                    }}</label>\r\n                  <input pInputText class=\"p-inputtext mb-2\" id=\"firstName\" formControlName=\"FirstName\" type=\"text\" />\r\n                  <p-message *ngIf=\"formValidator.hasError('FirstName')\" severity=\"error\"\r\n                    [text]=\"translate.instant('Messages.FieldRequired')\"></p-message>\r\n                </div>\r\n              </div>\r\n              <div class=\"field col-12 px-0 py-0\">\r\n                <address #addressForm [requiredFields]=\"clientRepresentativeAddressRequiredFields\" [showTitle]=\"true\">\r\n                </address>\r\n              </div>\r\n            </div>\r\n            <div class=\"p-formgrid grid\">\r\n              <div class=\"field col-12 items-centered mb-0\">\r\n                <button pButton pRipple type=\"button\" icon=\"pi pi-save\" [label]=\"translate.instant('General.Create')\"\r\n                  class=\"p-button-raised p-button-success mr-2\"\r\n                  [disabled]=\"form.invalid || addressForm.form.invalid || isExecuting\" (click)=\"onSubmit()\"></button>\r\n                <button pButton pRipple type=\"button\" icon=\"pi pi-undo\" [label]=\"translate.instant('General.Cancel')\"\r\n                  class=\"p-button-raised\" [disabled]=\"isExecuting\" (click)=\"onBack()\"></button>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </form>\r\n    </div>\r\n  </div>\r\n</div>";

/***/ }),

/***/ 5685:
/*!******************************************************************************************!*\
  !*** ./src/app/components/representatives/client-representative-details.html?ngResource ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = "<div class=\"grid form-grid\">\r\n  <div class=\"col-12\">\r\n    <div class=\"card pb-0\">\r\n      <form [formGroup]=\"form\">\r\n        <div class=\"col-12 pb-0 px-0\">\r\n          <div class=\"card no-border p-0\">\r\n            <div class=\"p-fluid p-formgrid grid mb-3\">\r\n              <div class=\"field col-12 md:col-6 mb-0 pb-0\">\r\n                <div class=\"flex-wrap mb-3\">\r\n                  <label class=\"block text-900 font-medium mb-2\">{{ 'ClientRepresentative.LastName' | translate\r\n                    }}</label>\r\n                  <input pInputText class=\"p-inputtext mb-2\" id=\"lastName\" formControlName=\"LastName\" type=\"text\" />\r\n                  <p-message *ngIf=\"formValidator.hasError('LastName')\" severity=\"error\"\r\n                    [text]=\"translate.instant('Messages.FieldRequired')\"></p-message>\r\n                </div>\r\n              </div>\r\n              <div class=\"field col-12 md:col-6 mb-0 pb-0\">\r\n                <div class=\"flex-wrap mb-3\">\r\n                  <label class=\"block text-900 font-medium mb-2\">{{ 'ClientRepresentative.FirstName' | translate\r\n                    }}</label>\r\n                  <input pInputText class=\"p-inputtext mb-2\" id=\"firstName\" formControlName=\"FirstName\" type=\"text\" />\r\n                  <p-message *ngIf=\"formValidator.hasError('FirstName')\" severity=\"error\"\r\n                    [text]=\"translate.instant('Messages.FieldRequired')\"></p-message>\r\n                </div>\r\n              </div>\r\n              <div *ngIf=\"clientRepresentative\" class=\"field col-12 px-0 py-0\">\r\n                <address #addressForm [entityAddress]=\"clientRepresentative.Address\"\r\n                  [requiredFields]=\"clientRepresentativeAddressRequiredFields\" [showTitle]=\"true\">\r\n                </address>\r\n              </div>\r\n            </div>\r\n            <div class=\"p-formgrid grid\">\r\n              <div class=\"field col-12 items-centered mb-0\">\r\n                <button *ngIf=\"hasAccessToButtons\" pButton pRipple type=\"button\" icon=\"pi pi-save\"\r\n                  [label]=\"translate.instant('General.Save')\" class=\"p-button-raised p-button-success mr-2\"\r\n                  [disabled]=\"shouldActionsBeDisabled\" (click)=\"onSubmit()\"></button>\r\n                <button *ngIf=\"hasAccessToButtons\" pButton pRipple type=\"button\" icon=\"pi pi-trash\"\r\n                  [label]=\"translate.instant('General.Delete')\" class=\"p-button-raised p-button-danger mr-2\"\r\n                  [disabled]=\"shouldActionsBeDisabled\" (click)=\"onDelete()\"></button>\r\n                <button pButton pRipple type=\"button\" icon=\"pi pi-undo\" [label]=\"translate.instant('General.Cancel')\"\r\n                  class=\"p-button-raised\" [disabled]=\"isExecuting\" (click)=\"onBack()\"></button>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </form>\r\n    </div>\r\n    <deletion-dialog [deletionKey]=\"deletionKey\"></deletion-dialog>\r\n  </div>\r\n</div>";

/***/ }),

/***/ 6875:
/*!***************************************************************************************!*\
  !*** ./src/app/components/representatives/client-representative-list.html?ngResource ***!
  \***************************************************************************************/
/***/ ((module) => {

module.exports = "<div class=\"grid\">\r\n  <div class=\"col-12\">\r\n    <div class=\"card\">\r\n      <div class=\"col-12\">\r\n        <div class=\"flex flex-column md:flex-row\">\r\n          <button *ngIf=\"hasAccessToButtons && clientId\" pButton [label]=\"translate.instant('General.Create')\"\r\n            class=\"p-button-outlined ml-auto\" icon=\"fa fa-user-circle\" (click)=\"onCreate()\"></button>\r\n        </div>\r\n      </div>\r\n      <div class=\"col-12\">\r\n        <p-table #dataTable [value]=\"clientRepresentatives\" [columns]=\"cols\" dataKey=\"Id\" sortField=\"LastName\"\r\n          [lazy]=\"true\" (onLazyLoad)=\"loadClientRepresentativesLazy($event)\" [rows]=\"10\"\r\n          [rowsPerPageOptions]=\"[10, 25, 50]\" [totalRecords]=\"totalRecords\" [rowHover]=\"true\"\r\n          styleClass=\"p-datatable-gridlines\" [paginator]=\"true\" responsiveLayout=\"scroll\">\r\n          <ng-template pTemplate=\"caption\">\r\n            <div class=\"flex flex-column md:flex-row md:justify-content-between gap-2\">\r\n              <button pButton [label]=\"translate.instant('General.Clear')\" class=\"p-button-outlined mb-2\"\r\n                icon=\"pi pi-filter-slash\" (click)=\"filterService.onClearFilters(dataTable)\"></button>\r\n              <div class=\"grid formgrid\">\r\n                <div class=\"col-12 mb-2 lg:col-4 lg:mb-0 mt-2\">\r\n                  <span class=\"p-input-icon-right\">\r\n                    <i *ngIf=\"filter.value && !filterService.shouldHideIcon(filter.value)\" class=\"pi pi-search\"></i>\r\n                    <input type=\"text\" pInputText #filter id=\"filter\"\r\n                      (input)=\"filterService.onFilterGlobal(dataTable, filter.value)\"\r\n                      [placeholder]=\"translate.instant('General.SearchKeyword')\" />\r\n                  </span>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </ng-template>\r\n          <ng-template pTemplate=\"header\" let-columns>\r\n            <tr>\r\n              <th *ngFor=\"let col of columns\" style=\"min-width: 12rem\" [ngSwitch]=\"col.field\">\r\n                <div class=\"flex justify-content-between align-items-center\">\r\n                  {{ col.header | translate }}\r\n                  <p-columnFilter *ngSwitchCase=\"'LastName'\" pInputText type=\"text\"\r\n                    [placeholder]=\"filterService.getPlaceholder(translate.instant(col.header))\" display=\"menu\"\r\n                    field=\"LastName\">\r\n                  </p-columnFilter>\r\n                  <p-columnFilter *ngSwitchCase=\"'FirstName'\" pInputText type=\"text\"\r\n                    [placeholder]=\"filterService.getPlaceholder(translate.instant(col.header))\" display=\"menu\"\r\n                    field=\"FirstName\">\r\n                  </p-columnFilter>\r\n                  <p-columnFilter *ngSwitchCase=\"'Email'\" pInputText type=\"text\"\r\n                    [placeholder]=\"filterService.getPlaceholder(translate.instant(col.header))\" display=\"menu\"\r\n                    field=\"Email\">\r\n                  </p-columnFilter>\r\n                  <p-columnFilter *ngSwitchCase=\"'PhoneNumber'\" pInputText type=\"text\"\r\n                    [placeholder]=\"filterService.getPlaceholder(translate.instant(col.header))\" display=\"menu\"\r\n                    field=\"PhoneNumber\">\r\n                  </p-columnFilter>\r\n                </div>\r\n              </th>\r\n            </tr>\r\n          </ng-template>\r\n          <ng-template pTemplate=\"body\" let-clientRepresentative let-columns=\"columns\">\r\n            <tr>\r\n              <td>\r\n                {{clientRepresentative.LastName}}\r\n              </td>\r\n              <td>\r\n                {{clientRepresentative.FirstName}}\r\n              </td>\r\n              <td>\r\n                {{clientRepresentative.Email}}\r\n              </td>\r\n              <td>\r\n                {{clientRepresentative.PhoneNumber}}\r\n              </td>\r\n              <td class=\"items-centered gap-2\">\r\n                <button *ngIf=\"hasAccessToButtons && clientId\" pButton pRipple class=\"p-button-raised\" type=\"button\"\r\n                  [class]=\"hasAccessToButtons ? 'p-button-raised' : 'p-button-raised p-button-warning'\"\r\n                  icon=\"pi pi-pencil\" [label]=\"translate.instant(onEditLabelId)\"\r\n                  (click)=\"onEdit(clientRepresentative)\"></button>\r\n                <button *ngIf=\"hasAccessToButtons && clientId\" pButton pRipple type=\"button\" icon=\"pi pi-trash\"\r\n                  [label]=\"translate.instant(onDeleteLabelId)\" class=\"p-button-raised p-button-danger\"\r\n                  (click)=\"onDelete(clientRepresentative)\"></button>\r\n              </td>\r\n            </tr>\r\n          </ng-template>\r\n        </p-table>\r\n      </div>\r\n      <deletion-dialog [deletionKey]=\"deletionKey\"></deletion-dialog>\r\n    </div>\r\n  </div>\r\n</div>";

/***/ }),

/***/ 4035:
/*!************************************************************************!*\
  !*** ./src/app/components/user-roles/user-role-create.html?ngResource ***!
  \************************************************************************/
/***/ ((module) => {

module.exports = "<div class=\"grid form-grid\">\r\n  <div class=\"col-12\">\r\n    <div class=\"card pb-0\">\r\n      <p-tabView>\r\n        <p-tabPanel header=\"{{ 'General.GeneralTab' | translate }}\">\r\n          <form [formGroup]=\"form\">\r\n            <div class=\"col-12 pb-0 px-0\">\r\n              <div class=\"card no-border p-0\">\r\n                <div class=\"p-fluid p-formgrid grid mb-3\">\r\n                  <div class=\"field col-12 md:col-6\">\r\n                    <name-in-languages #nameInLanguages [disabled]=\"false\"\r\n                      (isValid)=\"onIsNameInLanguagesValid($event)\"></name-in-languages>\r\n                  </div>\r\n                </div>\r\n                <user-role-permissions *ngIf=\"groupedUserPermissions\" #userRolePermissions\r\n                  [formMode]=\"formMode.Creation\"\r\n                  [groupedUserPermissions]=\"groupedUserPermissions\"></user-role-permissions>\r\n                <div class=\"p-formgrid grid\">\r\n                  <div class=\"field col-12 items-centered mb-0\">\r\n                    <button pButton pRipple type=\"button\" icon=\"pi pi-save\"\r\n                      [label]=\"translate.instant('General.Create')\" class=\"p-button-raised p-button-success mr-2\"\r\n                      [disabled]=\"shouldActionsBeDisabled\" (click)=\"onSubmit()\"></button>\r\n                    <button pButton pRipple type=\"button\" icon=\"pi pi-undo\"\r\n                      [label]=\"translate.instant('General.Cancel')\" class=\"p-button-raised\" [disabled]=\"isExecuting\"\r\n                      (click)=\"onBack()\"></button>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </form>\r\n        </p-tabPanel>\r\n      </p-tabView>\r\n    </div>\r\n  </div>\r\n</div>";

/***/ }),

/***/ 2713:
/*!*************************************************************************!*\
  !*** ./src/app/components/user-roles/user-role-details.html?ngResource ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = "<div class=\"grid form-grid\">\r\n  <div class=\"col-12\">\r\n    <div class=\"card pb-0\">\r\n      <p-tabView>\r\n        <p-tabPanel header=\"{{ 'General.GeneralTab' | translate }}\">\r\n          <form [formGroup]=\"form\">\r\n            <div class=\"col-12 pb-0 px-0\">\r\n              <div class=\"card no-border p-0\">\r\n                <div class=\"p-fluid p-formgrid grid mb-3\">\r\n                  <div class=\"field col-12 md:col-6\">\r\n                    <name-in-languages *ngIf=\"userRole\" #nameInLanguages [disabled]=\"!hasAccessToButtons\"\r\n                      [nameInLanguages]=\"userRole.NameInLanguages\"\r\n                      (isValid)=\"onIsNameInLanguagesValid($event)\"></name-in-languages>\r\n                  </div>\r\n                </div>\r\n                <user-role-permissions *ngIf=\"userRole\" #userRolePermissions [formMode]=\"formMode.Edition\"\r\n                  [groupedUserPermissions]=\"userRole.GroupedPermissions\"></user-role-permissions>\r\n                <div class=\"p-formgrid grid\">\r\n                  <div class=\"field col-12 items-centered mb-0\">\r\n                    <button *ngIf=\"hasAccessToButtons && !isDisabled\" pButton pRipple type=\"button\" icon=\"pi pi-save\"\r\n                      [label]=\"translate.instant('General.Save')\" class=\"p-button-raised p-button-success mr-2\"\r\n                      [disabled]=\"shouldActionsBeDisabled\" (click)=\"onSubmit()\"></button>\r\n                    <button *ngIf=\"hasAccessToButtons && !isDisabled\" pButton pRipple type=\"button\" icon=\"pi pi-trash\"\r\n                      [label]=\"translate.instant('General.Delete')\" class=\"p-button-raised p-button-danger mr-2\"\r\n                      [disabled]=\"shouldActionsBeDisabled\" (click)=\"onDelete()\"></button>\r\n                    <button pButton pRipple type=\"button\" icon=\"pi pi-undo\"\r\n                      [label]=\"translate.instant('General.Cancel')\" class=\"p-button-raised\" [disabled]=\"isExecuting\"\r\n                      (click)=\"onBack()\"></button>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </form>\r\n        </p-tabPanel>\r\n        <p-tabPanel header=\"{{ 'Audit.History' | translate}}\">\r\n          <audit-list-for-entity #audits *ngIf=\"userRole\" [entityId]=\"userRole.Id.toString()\"\r\n            entityTableName=\"UserRoles\" translation=\"UserRole\"></audit-list-for-entity>\r\n        </p-tabPanel>\r\n      </p-tabView>\r\n    </div>\r\n    <deletion-dialog [deletionKey]=\"deletionKey\"></deletion-dialog>\r\n  </div>\r\n</div>";

/***/ }),

/***/ 3136:
/*!**********************************************************************!*\
  !*** ./src/app/components/user-roles/user-role-list.html?ngResource ***!
  \**********************************************************************/
/***/ ((module) => {

module.exports = "<div class=\"grid\">\r\n  <div class=\"col-12\">\r\n    <div class=\"card\">\r\n      <div class=\"col-12\">\r\n        <div class=\"flex flex-column md:flex-row\">\r\n          <button *ngIf=\"hasAccessToButtons\" pButton [label]=\"translate.instant('General.Create')\"\r\n            class=\"p-button-outlined ml-auto\" icon=\"pi pi-users\" (click)=\"onCreate()\"></button>\r\n        </div>\r\n      </div>\r\n      <div class=\"col-12\">\r\n        <p-table #dataTable [value]=\"userRoles\" [columns]=\"cols\" dataKey=\"Id\" sortField=\"Id\" [lazy]=\"true\"\r\n          (onLazyLoad)=\"loadUserRolesLazy($event)\" [rows]=\"10\" [rowsPerPageOptions]=\"[10, 25, 50]\"\r\n          [totalRecords]=\"totalRecords\" [rowHover]=\"true\" styleClass=\"p-datatable-gridlines\" [paginator]=\"true\"\r\n          responsiveLayout=\"scroll\">\r\n          <ng-template pTemplate=\"caption\">\r\n            <div class=\"flex flex-column md:flex-row md:justify-content-between gap-2\">\r\n              <button pButton [label]=\"translate.instant('General.Clear')\" class=\"p-button-outlined mb-2\"\r\n                icon=\"pi pi-filter-slash\" (click)=\"filterService.onClearFilters(dataTable)\"></button>\r\n              <div class=\"grid formgrid\">\r\n                <div class=\"col-12 mb-2 lg:col-4 lg:mb-0\">\r\n                  <span class=\"p-input-icon-right\">\r\n                    <i *ngIf=\"filter.value && !filterService.shouldHideIcon(filter.value)\" class=\"pi pi-search\"></i>\r\n                    <input type=\"text\" pInputText #filter id=\"filter\"\r\n                      (input)=\"filterService.onFilterGlobal(dataTable, filter.value)\"\r\n                      [placeholder]=\"translate.instant('General.SearchKeyword')\" />\r\n                  </span>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </ng-template>\r\n          <ng-template pTemplate=\"header\" let-columns>\r\n            <tr>\r\n              <th *ngFor=\"let col of columns\" style=\"min-width: 12rem\" [ngSwitch]=\"col.field\">\r\n                <div class=\"flex justify-content-between align-items-center\">\r\n                  {{ col.header | translate }}\r\n                  <p-columnFilter *ngSwitchCase=\"'Id'\" pInputText type=\"numeric\"\r\n                    [placeholder]=\"filterService.getPlaceholder(translate.instant(col.header))\" display=\"menu\"\r\n                    field=\"Id\">\r\n                  </p-columnFilter>\r\n                  <p-columnFilter *ngSwitchCase=\"'Name'\"\r\n                    [placeholder]=\"filterService.getPlaceholder(translate.instant(col.header))\" display=\"menu\"\r\n                    field=\"Name\" matchMode=\"in\" [showMatchModes]=\"false\" [showOperator]=\"false\" [showAddButton]=\"false\">\r\n                    <ng-template pTemplate=\"header\">\r\n                      <div>\r\n                        <span class=\"font-bold\">{{translate.instant('UserRole.UserRolePicker')}}</span>\r\n                      </div>\r\n                    </ng-template>\r\n                    <ng-template pTemplate=\"filter\" let-value let-filter=\"filterCallback\">\r\n                      <p-multiSelect [ngModel]=\"value\" [options]=\"userRoleOptions\"\r\n                        [placeholder]=\"filterService.getPlaceholder(translate.instant(col.header))\"\r\n                        (onChange)=\"filter($event.value)\" optionLabel=\"label\">\r\n                        <ng-template let-option pTemplate=\"item\">\r\n                          <div class=\"p-multiselect-representative-option\">\r\n                            <span class=\"ml-1\">{{option.label}}</span>\r\n                          </div>\r\n                        </ng-template>\r\n                      </p-multiSelect>\r\n                    </ng-template>\r\n                  </p-columnFilter>\r\n                </div>\r\n              </th>\r\n            </tr>\r\n          </ng-template>\r\n          <ng-template pTemplate=\"body\" let-userRole let-columns=\"columns\">\r\n            <tr>\r\n              <td>\r\n                {{userRole.Id}}\r\n              </td>\r\n              <td>\r\n                {{userRole.Name}}\r\n              </td>\r\n              <td class=\"items-centered gap-2\">\r\n                <button *ngIf=\"hasAccessToButtons\" pButton pRipple class=\"p-button-raised\" type=\"button\"\r\n                  [class]=\"hasAccessToButtons ? 'p-button-raised' : 'p-button-raised p-button-warning'\"\r\n                  icon=\"pi pi-pencil\" [label]=\"translate.instant(onEditLabelId)\" (click)=\"onEdit(userRole)\"></button>\r\n                <button *ngIf=\"hasAccessToButtons\" pButton pRipple type=\"button\" icon=\"pi pi-trash\"\r\n                  [label]=\"translate.instant(onDeleteLabelId)\" class=\"p-button-raised p-button-danger\"\r\n                  (click)=\"onDelete(userRole)\"></button>\r\n              </td>\r\n            </tr>\r\n          </ng-template>\r\n        </p-table>\r\n      </div>\r\n    </div>\r\n    <deletion-dialog [deletionKey]=\"deletionKey\"></deletion-dialog>\r\n  </div>\r\n</div>\r\n<router-outlet></router-outlet>";

/***/ }),

/***/ 8698:
/*!*****************************************************************************!*\
  !*** ./src/app/components/user-roles/user-role-permissions.html?ngResource ***!
  \*****************************************************************************/
/***/ ((module) => {

module.exports = "<div class=\"p-fluid p-formgrid grid mb-3\">\r\n  <p-treeTable [value]=\"userPermissionNodes\" [columns]=\"userRolePermissionColumns\" selectionMode=\"checkbox\"\r\n    [(selection)]=\"selectedUserPermissionNodes\" (onNodeSelect)=\"onPermissionSelected($event.node)\">\r\n    <ng-template pTemplate=\"header\" let-columns>\r\n      <tr>\r\n        <th *ngFor=\"let col of columns\">\r\n          <label class=\"block text-900 font-medium mb-2\">{{col.header | translate}}</label>\r\n        </th>\r\n      </tr>\r\n    </ng-template>\r\n    <ng-template pTemplate=\"body\" let-rowNode let-rowData=\"rowData\" let-columns=\"columns\">\r\n      <tr>\r\n        <td *ngFor=\"let col of columns; let i = index\">\r\n          <p-treeTableToggler [rowNode]=\"rowNode\" *ngIf=\"i === 0\"></p-treeTableToggler>\r\n          <p-treeTableCheckbox [value]=\"rowNode\" *ngIf=\"i === 0\"></p-treeTableCheckbox>\r\n          <i [class]=\"rowData[col.icon] + ' px-2'\"></i>\r\n          {{rowData[col.field] | translate}}\r\n        </td>\r\n      </tr>\r\n    </ng-template>\r\n  </p-treeTable>\r\n</div>";

/***/ }),

/***/ 7828:
/*!**************************************************************!*\
  !*** ./src/app/components/users/user-create.html?ngResource ***!
  \**************************************************************/
/***/ ((module) => {

module.exports = "<div class=\"grid form-grid\">\r\n  <div class=\"col-12\">\r\n    <div class=\"card pb-0\">\r\n      <p-tabView>\r\n        <p-tabPanel header=\"{{ 'General.GeneralTab' | translate }}\">\r\n          <form [formGroup]=\"form\">\r\n            <div class=\"col-12 pb-0 px-0\">\r\n              <div class=\"card no-border p-0\">\r\n                <div class=\"p-fluid p-formgrid grid mb-3\">\r\n                  <div class=\"field col-12 md:col-6\">\r\n\r\n                    <div class=\"flex-wrap mb-3\">\r\n                      <label class=\"block text-900 font-medium mb-2\">{{ 'User.Login' | translate }}</label>\r\n                      <input pInputText class=\"p-inputtext mb-2\" id=\"login\" formControlName=\"Login\" type=\"text\" />\r\n                      <p-message *ngIf=\"formValidator.hasError('Login')\" severity=\"error\"\r\n                        [text]=\"translate.instant('Messages.FieldRequired')\"></p-message>\r\n                    </div>\r\n\r\n                    <div class=\"flex-wrap mb-3\">\r\n                      <label class=\"block text-900 font-medium mb-2\">{{ 'User.FirstName' | translate }}</label>\r\n                      <input pInputText class=\"p-inputtext mb-2\" id=\"firstName\" formControlName=\"FirstName\"\r\n                        type=\"text\" />\r\n                      <p-message *ngIf=\"formValidator.hasError('FirstName')\" severity=\"error\"\r\n                        [text]=\"translate.instant('Messages.FieldRequired')\"></p-message>\r\n                    </div>\r\n\r\n                    <div class=\"flex-wrap mb-3\">\r\n                      <label class=\"block text-900 font-medium mb-2\">{{ 'User.LastName' | translate\r\n                        }}</label>\r\n                      <input pInputText class=\"p-inputtext mb-2\" id=\"lastName\" formControlName=\"LastName\" type=\"text\" />\r\n                      <p-message *ngIf=\"formValidator.hasError('LastName')\" severity=\"error\"\r\n                        [text]=\"translate.instant('Messages.FieldRequired')\"></p-message>\r\n                    </div>\r\n\r\n                    <div class=\"flex-wrap mb-3\">\r\n                      <label class=\"block text-900 font-medium mb-2\">{{ 'User.Password' | translate\r\n                        }}</label>\r\n                      <input pInputText class=\"p-inputtext mb-2\" id=\"password\" formControlName=\"Password\"\r\n                        type=\"password\" />\r\n                      <p-message *ngIf=\"formValidator.hasError('Password')\" severity=\"error\"\r\n                        [text]=\"translate.instant('Messages.FieldMustContainCharacters', { numberOfCharacters: '8-20' })\"></p-message>\r\n                    </div>\r\n\r\n                    <div class=\"flex-wrap mb-3\">\r\n                      <div class=\"field-checkbox\">\r\n                        <p-checkbox name=\"isActive\" formControlName=\"IsActive\" id=\"isActive\"\r\n                          [binary]=\"true\"></p-checkbox>\r\n                        <label for=\"isActive\">{{ 'User.IsActive' | translate }}</label>\r\n                      </div>\r\n                    </div>\r\n\r\n                  </div>\r\n\r\n                  <div class=\"field col-12 md:col-6\">\r\n\r\n                    <div class=\"flex-wrap mb-4\">\r\n                      <label class=\"block text-900 font-medium mb-2\">{{ 'User.Language' | translate }}</label>\r\n                      <p-dropdown class=\"mb-2\" [options]=\"languages\" formControlName=\"LanguageId\"\r\n                        [placeholder]=\"translate.instant('User.SelectLanguage')\" [showClear]=\"false\">\r\n                        <ng-template let-role pTemplate=\"selectedItem\">\r\n                          <div>{{ role.label | translate }}</div>\r\n                        </ng-template>\r\n                        <ng-template let-role pTemplate=\"item\">\r\n                          <div>{{ role.label | translate }}</div>\r\n                        </ng-template>\r\n                      </p-dropdown>\r\n                    </div>\r\n\r\n                    <div class=\"flex-wrap mb-4\">\r\n                      <label class=\"block text-900 font-medium mb-2\">{{ 'User.UserRole' | translate }}</label>\r\n                      <p-dropdown class=\"mb-2\" [options]=\"userRoles\" formControlName=\"UserRoleId\"\r\n                        [placeholder]=\"translate.instant('User.SelectUserRole')\" [showClear]=\"false\">\r\n                        <ng-template let-role pTemplate=\"selectedItem\">\r\n                          <div>{{ role.label | translate }}</div>\r\n                        </ng-template>\r\n                        <ng-template let-role pTemplate=\"item\">\r\n                          <div>{{ role.label | translate }}</div>\r\n                        </ng-template>\r\n                      </p-dropdown>\r\n                    </div>\r\n\r\n                    <div class=\"flex-wrap mb-3\">\r\n                      <label class=\"block text-900 font-medium mb-2\">{{ 'User.Email' | translate }}</label>\r\n                      <input pInputText class=\"p-inputtext mb-2\" id=\"email\" formControlName=\"Email\" type=\"email\"\r\n                        maxlength=\"100\" />\r\n                      <p-message *ngIf=\"formValidator.hasError('Email')\" severity=\"error\"\r\n                        [text]=\"translate.instant('Messages.FieldInvalid')\"></p-message>\r\n                    </div>\r\n\r\n                  </div>\r\n                </div>\r\n                <div class=\"p-formgrid grid\">\r\n                  <div class=\"field col-12 items-centered mb-0\">\r\n                    <button pButton pRipple type=\"button\" icon=\"pi pi-save\"\r\n                      [label]=\"translate.instant('General.Create')\" class=\"p-button-raised p-button-success mr-2\"\r\n                      [disabled]=\"shouldActionsBeDisabled\" (click)=\"onSubmit()\"></button>\r\n                    <button pButton pRipple type=\"button\" icon=\"pi pi-undo\"\r\n                      [label]=\"translate.instant('General.Cancel')\" class=\"p-button-raised\" [disabled]=\"isExecuting\"\r\n                      (click)=\"onBack()\"></button>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </form>\r\n        </p-tabPanel>\r\n      </p-tabView>\r\n    </div>\r\n  </div>\r\n</div>";

/***/ }),

/***/ 3537:
/*!***************************************************************!*\
  !*** ./src/app/components/users/user-details.html?ngResource ***!
  \***************************************************************/
/***/ ((module) => {

module.exports = "<div class=\"grid form-grid\">\r\n  <div class=\"col-12\">\r\n    <div class=\"card pb-0\">\r\n      <p-tabView>\r\n        <p-tabPanel header=\"{{ 'General.GeneralTab' | translate }}\">\r\n          <form [formGroup]=\"form\">\r\n            <div class=\"col-12 pb-0 px-0\">\r\n              <div class=\"card no-border p-0\">\r\n                <div class=\"p-fluid p-formgrid grid mb-3\">\r\n                  <div class=\"field col-12 md:col-6\">\r\n                    <div class=\"flex-wrap mb-3\">\r\n                      <label class=\"block font-medium mb-2\">{{ 'User.Login' | translate }}</label>\r\n                      <input pInputText class=\"p-inputtext mb-2\" id=\"login\" formControlName=\"Login\" type=\"text\"\r\n                        readonly />\r\n                      <p-message *ngIf=\"formValidator.hasError('Login')\" severity=\"error\"\r\n                        [text]=\"translate.instant('Messages.FieldRequired')\"></p-message>\r\n                    </div>\r\n                    <div class=\"flex-wrap mb-3\">\r\n                      <label class=\"block text-900 font-medium mb-2\">{{ 'User.FirstName' | translate\r\n                        }}</label>\r\n                      <input pInputText class=\"p-inputtext mb-2\" id=\"firstName\" formControlName=\"FirstName\"\r\n                        type=\"text\" />\r\n                      <p-message *ngIf=\"formValidator.hasError('FirstName')\" severity=\"error\"\r\n                        [text]=\"translate.instant('Messages.FieldRequired')\"></p-message>\r\n                    </div>\r\n                    <div class=\"flex-wrap mb-3\">\r\n                      <label class=\"block text-900 font-medium mb-2\">{{ 'User.LastName' | translate\r\n                        }}</label>\r\n                      <input pInputText class=\"p-inputtext mb-2\" id=\"lastName\" formControlName=\"LastName\" type=\"text\" />\r\n                      <p-message *ngIf=\"formValidator.hasError('LastName')\" severity=\"error\"\r\n                        [text]=\"translate.instant('Messages.FieldRequired')\"></p-message>\r\n                    </div>\r\n                    <div *ngIf=\"hasAccessToButtons\" class=\"flex-wrap mb-3\">\r\n                      <label class=\"block text-900 font-medium mb-2\">{{ 'User.Password' | translate\r\n                        }}</label>\r\n                      <input pInputText class=\"p-inputtext mb-2\" id=\"password\" formControlName=\"Password\"\r\n                        type=\"password\" />\r\n                      <p-message *ngIf=\"formValidator.hasError('Password')\" severity=\"error\"\r\n                        [text]=\"translate.instant('Messages.FieldMustContainCharacters', { numberOfCharacters: '8-20' })\"></p-message>\r\n                    </div>\r\n                    <div class=\"flex-wrap mb-3\">\r\n                      <div class=\"field-checkbox\">\r\n                        <p-checkbox name=\"isActive\" formControlName=\"IsActive\" id=\"isActive\"\r\n                          [binary]=\"true\"></p-checkbox>\r\n                        <label for=\"isActive\">{{ 'User.IsActive' | translate }}</label>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"field col-12 md:col-6\">\r\n                    <div class=\"flex-wrap mb-3\">\r\n                      <label class=\"block font-medium mb-2\">{{ 'User.CreatedOn' | translate }}</label>\r\n                      <input pInputText class=\"p-inputtext mb-2\" id=\"createdOn\" formControlName=\"CreatedOn\" type=\"text\"\r\n                        readonly />\r\n                    </div>\r\n                    <div class=\"flex-wrap mb-4\">\r\n                      <label class=\"block text-900 font-medium mb-2\">{{ 'User.UserRole' | translate }}</label>\r\n                      <p-dropdown class=\"mb-2\" [options]=\"userRoles\" formControlName=\"UserRoleId\"\r\n                        [placeholder]=\"translate.instant('User.SelectUserRole')\" [showClear]=\"true\">\r\n                        <ng-template let-role pTemplate=\"selectedItem\">\r\n                          <div>{{ role.label | translate }}</div>\r\n                        </ng-template>\r\n                        <ng-template let-role pTemplate=\"item\">\r\n                          <div>{{ role.label | translate }}</div>\r\n                        </ng-template>\r\n                      </p-dropdown>\r\n                    </div>\r\n                    <div class=\"flex-wrap mb-3\">\r\n                      <label class=\"block text-900 font-medium mb-2\">{{ 'User.Email' | translate }}</label>\r\n                      <input pInputText class=\"p-inputtext mb-2\" id=\"email\" formControlName=\"Email\" type=\"email\"\r\n                        maxlength=\"100\" />\r\n                      <p-message *ngIf=\"formValidator.hasError('Email')\" severity=\"error\"\r\n                        [text]=\"translate.instant('Messages.FieldInvalid')\"></p-message>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n                <div class=\"p-formgrid grid\">\r\n                  <div class=\"field col-12 items-centered mb-0\">\r\n                    <button *ngIf=\"hasAccessToButtons\" pButton pRipple type=\"button\" icon=\"pi pi-save\"\r\n                      [label]=\"translate.instant('General.Save')\" class=\"p-button-raised p-button-success mr-2\"\r\n                      [disabled]=\"shouldActionsBeDisabled\" (click)=\"onSubmit()\"></button>\r\n                    <button *ngIf=\"hasAccessToButtons\" pButton pRipple type=\"button\" icon=\"pi pi-trash\"\r\n                      [label]=\"translate.instant('General.Delete')\" class=\"p-button-raised p-button-danger mr-2\"\r\n                      [disabled]=\"shouldActionsBeDisabled\" (click)=\"onDelete()\"></button>\r\n                    <button pButton pRipple type=\"button\" icon=\"pi pi-undo\"\r\n                      [label]=\"translate.instant('General.Cancel')\" class=\"p-button-raised\" [disabled]=\"isExecuting\"\r\n                      (click)=\"onBack()\"></button>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </form>\r\n        </p-tabPanel>\r\n        <p-tabPanel header=\"{{ 'Audit.History' | translate}}\">\r\n          <audit-list-for-entity #audits *ngIf=\"user\" [entityId]=\"user.Id\" entityTableName=\"Users\"\r\n            translation=\"User\"></audit-list-for-entity>\r\n        </p-tabPanel>\r\n      </p-tabView>\r\n    </div>\r\n    <deletion-dialog [deletionKey]=\"deletionKey\"></deletion-dialog>\r\n  </div>\r\n</div>";

/***/ }),

/***/ 4921:
/*!************************************************************!*\
  !*** ./src/app/components/users/user-list.html?ngResource ***!
  \************************************************************/
/***/ ((module) => {

module.exports = "<div class=\"grid\">\r\n  <div class=\"col-12\">\r\n    <div class=\"card\">\r\n      <div class=\"col-12\">\r\n        <div class=\"flex flex-column md:flex-row\">\r\n          <button *ngIf=\"hasAccessToButtons\" pButton [label]=\"translate.instant('General.Create')\"\r\n            class=\"p-button-outlined ml-auto\" icon=\"pi pi-user\" (click)=\"onCreate()\"></button>\r\n        </div>\r\n      </div>\r\n      <div class=\"col-12\">\r\n        <p-table #dataTable [value]=\"users\" [columns]=\"cols\" dataKey=\"Id\" sortField=\"Login\" [lazy]=\"true\"\r\n          (onLazyLoad)=\"loadUsersLazy($event)\" [rows]=\"10\" [rowsPerPageOptions]=\"[10, 25, 50]\"\r\n          [totalRecords]=\"totalRecords\" [rowHover]=\"true\" styleClass=\"p-datatable-gridlines\" [paginator]=\"true\"\r\n          responsiveLayout=\"scroll\">\r\n          <ng-template pTemplate=\"caption\">\r\n            <div class=\"flex flex-column md:flex-row md:justify-content-between gap-2\">\r\n              <button pButton [label]=\"translate.instant('General.Clear')\" class=\"p-button-outlined mb-2\"\r\n                icon=\"pi pi-filter-slash\" (click)=\"filterService.onClearFilters(dataTable)\"></button>\r\n              <div class=\"grid formgrid\">\r\n                <div class=\"col-12 mb-2 lg:col-4 lg:mb-0 mt-2\">\r\n                  <span class=\"p-input-icon-right\">\r\n                    <i *ngIf=\"filter.value && !filterService.shouldHideIcon(filter.value)\" class=\"pi pi-search\"></i>\r\n                    <input type=\"text\" pInputText #filter id=\"filter\"\r\n                      (input)=\"filterService.onFilterGlobal(dataTable, filter.value)\"\r\n                      [placeholder]=\"translate.instant('General.SearchKeyword')\" />\r\n                  </span>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </ng-template>\r\n          <ng-template pTemplate=\"header\" let-columns>\r\n            <tr>\r\n              <th *ngFor=\"let col of columns\" style=\"min-width: 12rem\" [ngSwitch]=\"col.field\">\r\n                <div class=\"flex justify-content-between align-items-center\">\r\n                  {{ col.header | translate }}\r\n                  <p-columnFilter *ngSwitchCase=\"'Login'\" pInputText type=\"text\"\r\n                    [placeholder]=\"filterService.getPlaceholder(translate.instant(col.header))\" display=\"menu\"\r\n                    field=\"Login\">\r\n                  </p-columnFilter>\r\n                  <p-columnFilter *ngSwitchCase=\"'FirstName'\" pInputText type=\"text\"\r\n                    [placeholder]=\"filterService.getPlaceholder(translate.instant(col.header))\" display=\"menu\"\r\n                    field=\"FirstName\">\r\n                  </p-columnFilter>\r\n                  <p-columnFilter *ngSwitchCase=\"'LastName'\" pInputText type=\"text\"\r\n                    [placeholder]=\"filterService.getPlaceholder(translate.instant(col.header))\" display=\"menu\"\r\n                    field=\"LastName\">\r\n                  </p-columnFilter>\r\n                  <p-columnFilter *ngSwitchCase=\"'UserRoleName'\"\r\n                    [placeholder]=\"filterService.getPlaceholder(translate.instant(col.header))\" display=\"menu\"\r\n                    field=\"UserRoleName\" matchMode=\"in\" [showMatchModes]=\"false\" [showOperator]=\"false\"\r\n                    [showAddButton]=\"false\">\r\n                    <ng-template pTemplate=\"header\">\r\n                      <div>\r\n                        <span class=\"font-bold\">{{translate.instant('User.UserRolePicker')}}</span>\r\n                      </div>\r\n                    </ng-template>\r\n                    <ng-template pTemplate=\"filter\" let-value let-filter=\"filterCallback\">\r\n                      <p-multiSelect [ngModel]=\"value\" [options]=\"userRoleOptions\"\r\n                        [placeholder]=\"filterService.getPlaceholder(translate.instant(col.header))\"\r\n                        (onChange)=\"filter($event.value)\" optionLabel=\"label\">\r\n                        <ng-template let-option pTemplate=\"item\">\r\n                          <div class=\"p-multiselect-representative-option\">\r\n                            <span class=\"ml-1\">{{option.label}}</span>\r\n                          </div>\r\n                        </ng-template>\r\n                      </p-multiSelect>\r\n                    </ng-template>\r\n                  </p-columnFilter>\r\n                  <p-columnFilter *ngSwitchCase=\"'IsActive'\" type=\"boolean\" display=\"menu\" field=\"IsActive\">\r\n                  </p-columnFilter>\r\n                </div>\r\n              </th>\r\n            </tr>\r\n          </ng-template>\r\n          <ng-template pTemplate=\"body\" let-user let-columns=\"columns\">\r\n            <tr>\r\n              <td>\r\n                {{user.Login}}\r\n              </td>\r\n              <td>\r\n                {{user.FirstName}}\r\n              </td>\r\n              <td>\r\n                {{user.LastName}}\r\n              </td>\r\n              <td>\r\n                {{user.UserRoleName}}\r\n              </td>\r\n              <td>\r\n                <input type=\"checkbox\" [checked]=\"user.IsActive\" disabled />\r\n              </td>\r\n              <td class=\"items-centered gap-2\">\r\n                <button *ngIf=\"hasAccessToButtons\" pButton pRipple class=\"p-button-raised\" type=\"button\"\r\n                  [class]=\"hasAccessToButtons ? 'p-button-raised' : 'p-button-raised p-button-warning'\"\r\n                  icon=\"pi pi-pencil\" [label]=\"translate.instant(onEditLabelId)\" (click)=\"onEdit(user)\"></button>\r\n                <button *ngIf=\"hasAccessToButtons\" pButton pRipple type=\"button\" icon=\"pi pi-trash\"\r\n                  [label]=\"translate.instant(onDeleteLabelId)\" class=\"p-button-raised p-button-danger\"\r\n                  (click)=\"onDelete(user)\"></button>\r\n              </td>\r\n            </tr>\r\n          </ng-template>\r\n        </p-table>\r\n      </div>\r\n    </div>\r\n    <deletion-dialog [deletionKey]=\"deletionKey\"></deletion-dialog>\r\n  </div>\r\n</div>\r\n<router-outlet></router-outlet>";

/***/ }),

/***/ 8980:
/*!*************************************************************!*\
  !*** ./src/app/layout/app.footer.component.html?ngResource ***!
  \*************************************************************/
/***/ ((module) => {

module.exports = "<div class=\"layout-footer py-0\">\r\n    <div class=\"col-12 field grid py-0 my-0\">\r\n        <div class=\"md:col-11 layout-footer pl-6 py-0\" style=\"border: 0;\">\r\n            <p class=\"mt-3\">by</p>\r\n            <span class=\"font-medium ml-2\">Alec Chocholski</span>\r\n        </div>\r\n        <div class=\"md:col-1 layout-footer pb-0 pt-3 pl-6\" style=\"border: 0;\">\r\n            <div class=\"field grid\">\r\n                <h5 class=\"col-12 mb-0 mt-1 py-0 md:col-7 md:mb-0\" style=\"font-size: 0.85rem; margin-right: -0.52rem;\">\r\n                    {{ translate.instant('General.DarkMode') }}\r\n                </h5>\r\n                <div class=\"col-12 md:col-5\">\r\n                    <p-inputSwitch [(ngModel)]=\"isDarkModeThemeSelected\" (onChange)=\"changeUserTheme()\"></p-inputSwitch>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>";

/***/ }),

/***/ 1896:
/*!*************************************************************!*\
  !*** ./src/app/layout/app.layout.component.html?ngResource ***!
  \*************************************************************/
/***/ ((module) => {

module.exports = "<div *ngIf=\"isUserLoggedIn\" class=\"layout-wrapper\" [ngClass]=\"containerClass\">\r\n    <app-topbar [appSidebar]=\"appSidebar\"></app-topbar>\r\n    <div class=\"layout-sidebar\">\r\n        <app-sidebar #appSidebar></app-sidebar>\r\n    </div>\r\n    <div class=\"layout-main-container\">\r\n        <div class=\"layout-main\" style=\"width: 100%;\">\r\n            <router-outlet></router-outlet>\r\n            <div class=\"col-12\"\r\n                style=\"margin-top: auto; position: absolute; bottom: 0; width: 20%; right: 0; z-index: 9999;\">\r\n                <p-messages></p-messages>\r\n            </div>\r\n        </div>\r\n        <app-footer></app-footer>\r\n    </div>\r\n    <div class=\"layout-mask\"></div>\r\n</div>\r\n\r\n<div *ngIf=\"!isUserLoggedIn\" class=\"layout-wrapper\" [ngClass]=\"containerClass\">\r\n    <div class=\"layout-main-container\" style=\"margin: 0;\">\r\n        <div class=\"layout-main\">\r\n            <router-outlet></router-outlet>\r\n        </div>\r\n    </div>\r\n</div>";

/***/ }),

/***/ 4695:
/*!***********************************************************!*\
  !*** ./src/app/layout/app.menu.component.html?ngResource ***!
  \***********************************************************/
/***/ ((module) => {

module.exports = "<ul class=\"layout-menu\">\r\n    <ng-container *ngFor=\"let item of model; let i = index;\">\r\n        <li app-menuitem [item]=\"item\" [index]=\"i\" [root]=\"true\"></li>\r\n        <li class=\"menu-separator\"></li>\r\n    </ng-container>\r\n</ul>";

/***/ }),

/***/ 6448:
/*!**************************************************************!*\
  !*** ./src/app/layout/app.sidebar.component.html?ngResource ***!
  \**************************************************************/
/***/ ((module) => {

module.exports = "<app-menu #appMenu></app-menu>";

/***/ }),

/***/ 4951:
/*!*************************************************************!*\
  !*** ./src/app/layout/app.topbar.component.html?ngResource ***!
  \*************************************************************/
/***/ ((module) => {

module.exports = "<div class=\"layout-topbar\">\r\n    <a class=\"layout-topbar-logo\" routerLink=\"\">\r\n        <img src=\"assets/layout/images/logo.png\" alt=\"logo\" style=\"height: 2.5em; margin-right: 1em;\">\r\n        <span>EQUIPRENT</span>\r\n    </a>\r\n\r\n    <button #menubutton class=\"p-link layout-menu-button layout-topbar-button\" (click)=\"layoutService.onMenuToggle()\">\r\n        <i class=\"pi pi-bars\"></i>\r\n    </button>\r\n\r\n    <button #topbarmenubutton class=\"p-link layout-topbar-menu-button layout-topbar-button\"\r\n        (click)=\"layoutService.showProfileSidebar()\">\r\n        <i class=\"pi pi-ellipsis-v\"></i>\r\n    </button>\r\n\r\n    <div class=\"layout-topbar-menu\">\r\n        <p-breadcrumb #breadcrumb [model]=\"breadcrumbItems\" [home]=\"home\"></p-breadcrumb>\r\n    </div>\r\n\r\n    <div #topbarmenu class=\"layout-topbar-menu\" style=\"margin-right: 1.5em;\"\r\n        [ngClass]=\"{'layout-topbar-menu-mobile-active': layoutService.state.profileSidebarVisible}\">\r\n        <div class=\"formgroup-inline\">\r\n            <p-splitButton class=\"field p-link\" [label]=\"translate.instant('General.Profile')\"\r\n                icon=\"fa fa-solid fa-user\" [model]=\"userMenuItems\"></p-splitButton>\r\n        </div>\r\n    </div>\r\n\r\n</div>";

/***/ }),

/***/ 9737:
/*!********************************************************************!*\
  !*** ./src/app/layout/config/app.config.component.html?ngResource ***!
  \********************************************************************/
/***/ ((module) => {

module.exports = "<button class=\"layout-config-button p-link\" type=\"button\" (click)=\"onConfigButtonClick()\">\r\n    <i class=\"pi pi-cog\"></i>\r\n</button>\r\n\r\n<p-sidebar [(visible)]=\"visible\" position=\"right\" [transitionOptions]=\"'.3s cubic-bezier(0, 0, 0.2, 1)'\" styleClass=\"layout-config-sidebar w-20rem\">\r\n    <h5>Scale</h5>\r\n    <div class=\"flex align-items-center\">\r\n        <button icon=\"pi pi-minus\" type=\"button\" pButton (click)=\"decrementScale()\" class=\"p-button-text p-button-rounded w-2rem h-2rem mr-2\" [disabled]=\"scale === scales[0]\"></button>\r\n        <div class=\"flex gap-2 align-items-center\">\r\n            <i class=\"pi pi-circle-fill text-300\" *ngFor=\"let s of scales\" [ngClass]=\"{'text-primary-500': s === scale}\"></i>\r\n        </div>\r\n        <button icon=\"pi pi-plus\"  type=\"button\" pButton (click)=\"incrementScale()\" class=\"p-button-text p-button-rounded w-2rem h-2rem ml-2\" [disabled]=\"scale === scales[scales.length - 1]\"></button>\r\n    </div>\r\n\r\n    <ng-container *ngIf=\"!minimal\">\r\n        <h5>Menu Type</h5>\r\n        <div class=\"field-radiobutton\">\r\n            <p-radioButton name=\"menuMode\" value=\"static\" [(ngModel)]=\"menuMode\" inputId=\"mode1\"></p-radioButton>\r\n            <label for=\"mode1\">Static</label>\r\n        </div>\r\n        <div class=\"field-radiobutton\">\r\n            <p-radioButton name=\"menuMode\" value=\"overlay\" [(ngModel)]=\"menuMode\" inputId=\"mode2\"></p-radioButton>\r\n            <label for=\"mode2\">Overlay</label>\r\n        </div>\r\n    </ng-container>\r\n\r\n    <ng-container *ngIf=\"!minimal\">\r\n        <h5>Input Style</h5>\r\n        <div class=\"flex\">\r\n            <div class=\"field-radiobutton flex-1\">\r\n                <p-radioButton name=\"inputStyle\" value=\"outlined\" [(ngModel)]=\"inputStyle\" inputId=\"outlined_input\"></p-radioButton>\r\n                <label for=\"outlined_input\">Outlined</label>\r\n            </div>\r\n            <div class=\"field-radiobutton flex-1\">\r\n                <p-radioButton name=\"inputStyle\" value=\"filled\" [(ngModel)]=\"inputStyle\" inputId=\"filled_input\"></p-radioButton>\r\n                <label for=\"filled_input\">Filled</label>\r\n            </div>\r\n        </div>\r\n\r\n        <h5>Ripple Effect</h5>\r\n        <p-inputSwitch [(ngModel)]=\"ripple\"></p-inputSwitch>\r\n    </ng-container>\r\n\r\n\r\n    <h5>Bootstrap</h5>\r\n    <div class=\"grid\">\r\n        <div class=\"col-3\">\r\n            <button class=\"p-link w-2rem h-2rem\" (click)=\"changeTheme('bootstrap4-light-blue', 'light')\">\r\n                <img src=\"assets/layout/images/themes/bootstrap4-light-blue.svg\" class=\"w-2rem h-2rem\" alt=\"Bootstrap Light Blue\">\r\n            </button>\r\n        </div>\r\n        <div class=\"col-3\">\r\n            <button class=\"p-link w-2rem h-2rem\" (click)=\"changeTheme('bootstrap4-light-purple', 'light')\">\r\n                <img src=\"assets/layout/images/themes/bootstrap4-light-purple.svg\" class=\"w-2rem h-2rem\" alt=\"Bootstrap Light Purple\">\r\n            </button>\r\n        </div>\r\n        <div class=\"col-3\">\r\n            <button class=\"p-link w-2rem h-2rem\" (click)=\"changeTheme('bootstrap4-dark-blue', 'dark')\">\r\n                <img src=\"assets/layout/images/themes/bootstrap4-dark-blue.svg\" class=\"w-2rem h-2rem\" alt=\"Bootstrap Dark Blue\">\r\n            </button>\r\n        </div>\r\n        <div class=\"col-3\">\r\n            <button class=\"p-link w-2rem h-2rem\" (click)=\"changeTheme('bootstrap4-dark-purple', 'dark')\">\r\n                <img src=\"assets/layout/images/themes/bootstrap4-dark-purple.svg\" class=\"w-2rem h-2rem\" alt=\"Bootstrap Dark Purple\">\r\n            </button>\r\n        </div>\r\n    </div>\r\n\r\n    <h5>Material Design</h5>\r\n    <div class=\"grid\">\r\n        <div class=\"col-3\">\r\n            <button class=\"p-link w-2rem h-2rem\" (click)=\"changeTheme('md-light-indigo', 'light')\">\r\n                <img src=\"assets/layout/images/themes/md-light-indigo.svg\" class=\"w-2rem h-2rem\" alt=\"Material Light Indigo\">\r\n            </button>\r\n        </div>\r\n        <div class=\"col-3\">\r\n            <button class=\"p-link w-2rem h-2rem\" (click)=\"changeTheme('md-light-deeppurple', 'light')\">\r\n                <img src=\"assets/layout/images/themes/md-light-deeppurple.svg\" class=\"w-2rem h-2rem\" alt=\"Material Light DeepPurple\">\r\n            </button>\r\n        </div>\r\n        <div class=\"col-3\">\r\n            <button class=\"p-link w-2rem h-2rem\" (click)=\"changeTheme('md-dark-indigo', 'dark')\">\r\n                <img src=\"assets/layout/images/themes/md-dark-indigo.svg\" class=\"w-2rem h-2rem\" alt=\"Material Dark Indigo\">\r\n            </button>\r\n        </div>\r\n        <div class=\"col-3\">\r\n            <button class=\"p-link w-2rem h-2rem\" (click)=\"changeTheme('md-dark-deeppurple', 'dark')\">\r\n                <img src=\"assets/layout/images/themes/md-dark-deeppurple.svg\" class=\"w-2rem h-2rem\" alt=\"Material Dark DeepPurple\">\r\n            </button>\r\n        </div>\r\n    </div>\r\n\r\n    <h5>Material Design Compact</h5>\r\n    <div class=\"grid\">\r\n        <div class=\"col-3\">\r\n            <button class=\"p-link w-2rem h-2rem\" (click)=\"changeTheme('mdc-light-indigo', 'light')\">\r\n                <img src=\"assets/layout/images/themes/md-light-indigo.svg\" class=\"w-2rem h-2rem\" alt=\"Material Light Indigo\">\r\n            </button>\r\n        </div>\r\n        <div class=\"col-3\">\r\n            <button class=\"p-link w-2rem h-2rem\" (click)=\"changeTheme('mdc-light-deeppurple', 'light')\">\r\n                <img src=\"assets/layout/images/themes/md-light-deeppurple.svg\" class=\"w-2rem h-2rem\" alt=\"Material Light Deep Purple\">\r\n            </button>\r\n        </div>\r\n        <div class=\"col-3\">\r\n            <button class=\"p-link w-2rem h-2rem\" (click)=\"changeTheme('mdc-dark-indigo', 'dark')\">\r\n                <img src=\"assets/layout/images/themes/md-dark-indigo.svg\" class=\"w-2rem h-2rem\" alt=\"Material Dark Indigo\">\r\n            </button>\r\n        </div>\r\n        <div class=\"col-3\">\r\n            <button class=\"p-link w-2rem h-2rem\" (click)=\"changeTheme('mdc-dark-deeppurple', 'dark')\">\r\n                <img src=\"assets/layout/images/themes/md-dark-deeppurple.svg\" class=\"w-2rem h-2rem\" alt=\"Material Dark Deep Purple\">\r\n            </button>\r\n        </div>\r\n    </div>\r\n\r\n    <h5>Tailwind</h5>\r\n    <div class=\"grid\">\r\n        <div class=\"col-3\">\r\n            <button class=\"p-link w-2rem h-2rem\" (click)=\"changeTheme('tailwind-light', 'light')\">\r\n                <img src=\"assets/layout/images/themes/tailwind-light.png\" class=\"w-2rem h-2rem\" alt=\"Tailwind Light\">\r\n            </button>\r\n        </div>\r\n    </div>\r\n\r\n    <h5>Fluent UI</h5>\r\n    <div class=\"grid\">\r\n        <div class=\"col-3\">\r\n            <button class=\"p-link w-2rem h-2rem\" (click)=\"changeTheme('fluent-light', 'light')\">\r\n                <img src=\"assets/layout/images/themes/fluent-light.png\" class=\"w-2rem h-2rem\" alt=\"Fluent Light\">\r\n            </button>\r\n        </div>\r\n    </div>\r\n\r\n    <h5>PrimeOne Design - 2022</h5>\r\n    <div class=\"grid\">\r\n        <div class=\"col-3\">\r\n            <button class=\"p-link w-2rem h-2rem\" (click)=\"changeTheme('lara-light-indigo', 'light')\">\r\n                <img src=\"assets/layout/images/themes/lara-light-indigo.png\" class=\"w-2rem h-2rem\" alt=\"Lara Light Indigo\">\r\n            </button>\r\n        </div>\r\n        <div class=\"col-3\">\r\n            <button class=\"p-link w-2rem h-2rem\" (click)=\"changeTheme('lara-light-blue', 'light')\">\r\n                <img src=\"assets/layout/images/themes/lara-light-blue.png\" class=\"w-2rem h-2rem\" alt=\"Lara Light Blue\">\r\n            </button>\r\n        </div>\r\n        <div class=\"col-3\">\r\n            <button class=\"p-link w-2rem h-2rem\" (click)=\"changeTheme('lara-light-purple', 'light')\">\r\n                <img src=\"assets/layout/images/themes/lara-light-purple.png\" class=\"w-2rem h-2rem\" alt=\"Lara Light Purple\">\r\n            </button>\r\n        </div>\r\n        <div class=\"col-3\">\r\n            <button class=\"p-link w-2rem h-2rem\" (click)=\"changeTheme('lara-light-teal', 'light')\">\r\n                <img src=\"assets/layout/images/themes/lara-light-teal.png\" class=\"w-2rem h-2rem\" alt=\"Lara Light Teal\">\r\n            </button>\r\n        </div>\r\n        <div class=\"col-3\">\r\n            <button class=\"p-link w-2rem h-2rem\" (click)=\"changeTheme('lara-dark-indigo', 'dark')\">\r\n                <img src=\"assets/layout/images/themes/lara-dark-indigo.png\" class=\"w-2rem h-2rem\" alt=\"Lara Dark Indigo\">\r\n            </button>\r\n        </div>\r\n        <div class=\"col-3\">\r\n            <button class=\"p-link w-2rem h-2rem\" (click)=\"changeTheme('lara-dark-blue', 'dark')\">\r\n                <img src=\"assets/layout/images/themes/lara-dark-blue.png\" class=\"w-2rem h-2rem\" alt=\"Lara Dark Blue\">\r\n            </button>\r\n        </div>\r\n        <div class=\"col-3\">\r\n            <button class=\"p-link w-2rem h-2rem\" (click)=\"changeTheme('lara-dark-purple', 'dark')\">\r\n                <img src=\"assets/layout/images/themes/lara-dark-purple.png\" class=\"w-2rem h-2rem\" alt=\"Lara Dark Purple\">\r\n            </button>\r\n        </div>\r\n        <div class=\"col-3\">\r\n            <button class=\"p-link w-2rem h-2rem\" (click)=\"changeTheme('lara-dark-teal', 'dark')\">\r\n                <img src=\"assets/layout/images/themes/lara-dark-teal.png\" class=\"w-2rem h-2rem\" alt=\"Lara Dark Teal\">\r\n            </button>\r\n        </div>\r\n    </div>\r\n\r\n    <h5>PrimeOne Design - 2021</h5>\r\n    <div class=\"grid\">\r\n        <div class=\"col-3\">\r\n            <button class=\"p-link w-2rem h-2rem\" (click)=\"changeTheme('saga-blue', 'light')\">\r\n                <img src=\"assets/layout/images/themes/saga-blue.png\" class=\"w-2rem h-2rem\" alt=\"Saga Blue\">\r\n            </button>\r\n        </div>\r\n        <div class=\"col-3\">\r\n            <button class=\"p-link w-2rem h-2rem\" (click)=\"changeTheme('saga-green', 'light')\">\r\n                <img src=\"assets/layout/images/themes/saga-green.png\" class=\"w-2rem h-2rem\" alt=\"Saga Green\">\r\n            </button>\r\n        </div>\r\n        <div class=\"col-3\">\r\n            <button class=\"p-link w-2rem h-2rem\" (click)=\"changeTheme('saga-orange', 'light')\">\r\n                <img src=\"assets/layout/images/themes/saga-orange.png\" class=\"w-2rem h-2rem\" alt=\"Saga Orange\">\r\n            </button>\r\n        </div>\r\n        <div class=\"col-3\">\r\n            <button class=\"p-link w-2rem h-2rem\" (click)=\"changeTheme('saga-purple', 'light')\">\r\n                <img src=\"assets/layout/images/themes/saga-purple.png\" class=\"w-2rem h-2rem\" alt=\"Saga Purple\">\r\n            </button>\r\n        </div>\r\n        <div class=\"col-3\">\r\n            <button class=\"p-link w-2rem h-2rem\" (click)=\"changeTheme('vela-blue', 'dark')\">\r\n                <img src=\"assets/layout/images/themes/vela-blue.png\" class=\"w-2rem h-2rem\" alt=\"Vela Blue\">\r\n            </button>\r\n        </div>\r\n        <div class=\"col-3\">\r\n            <button class=\"p-link w-2rem h-2rem\" (click)=\"changeTheme('vela-green', 'dark')\">\r\n                <img src=\"assets/layout/images/themes/vela-green.png\" class=\"w-2rem h-2rem\" alt=\"Vela Green\">\r\n            </button>\r\n        </div>\r\n        <div class=\"col-3\">\r\n            <button class=\"p-link w-2rem h-2rem\" (click)=\"changeTheme('vela-orange', 'dark')\">\r\n                <img src=\"assets/layout/images/themes/vela-orange.png\" class=\"w-2rem h-2rem\" alt=\"Vela Orange\">\r\n            </button>\r\n        </div>\r\n        <div class=\"col-3\">\r\n            <button class=\"p-link w-2rem h-2rem\" (click)=\"changeTheme('vela-purple', 'dark')\">\r\n                <img src=\"assets/layout/images/themes/vela-purple.png\" class=\"w-2rem h-2rem\" alt=\"Vela Purple\">\r\n            </button>\r\n        </div>\r\n        <div class=\"col-3\">\r\n            <button class=\"p-link w-2rem h-2rem\" (click)=\"changeTheme('arya-blue', 'dark')\">\r\n                <img src=\"assets/layout/images/themes/arya-blue.png\" class=\"w-2rem h-2rem\" alt=\"Arya Blue\">\r\n            </button>\r\n        </div>\r\n        <div class=\"col-3\">\r\n            <button class=\"p-link w-2rem h-2rem\" (click)=\"changeTheme('arya-green', 'dark')\">\r\n                <img src=\"assets/layout/images/themes/arya-green.png\" class=\"w-2rem h-2rem\" alt=\"Arya Green\">\r\n            </button>\r\n        </div>\r\n        <div class=\"col-3\">\r\n            <button class=\"p-link w-2rem h-2rem\" (click)=\"changeTheme('arya-orange', 'dark')\">\r\n                <img src=\"assets/layout/images/themes/arya-orange.png\" class=\"w-2rem h-2rem\" alt=\"Arya Orange\">\r\n            </button>\r\n        </div>\r\n        <div class=\"col-3\">\r\n            <button class=\"p-link w-2rem h-2rem\" (click)=\"changeTheme('arya-purple', 'dark')\">\r\n                <img src=\"assets/layout/images/themes/arya-purple.png\" class=\"w-2rem h-2rem\" alt=\"Arya Purple\">\r\n            </button>\r\n        </div>\r\n    </div>\r\n</p-sidebar>\r\n";

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendor"], () => (__webpack_exec__(6344), __webpack_exec__(4431)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=main.js.map