import { LazyLoadEvent } from "primeng/api";
import { PngTableColumn } from "./interfaces/png";
import { PngTableSearchQueryBuilder } from "./tools/png-table-search-query-builder";

export const ApiRoutes = {
  audit: {
    getObjectHistory: (event: LazyLoadEvent, columns: PngTableColumn[], entityId: string, entityTableName: string) => `audit${new PngTableSearchQueryBuilder(event, columns).create()}&entityId=${entityId}&entityTableName=${entityTableName}`,
    getFieldNames: "audit/getFieldNames"
  },
  client: {
    delete: (clientId: string) => `client/${clientId}`,
    getAll: (event: LazyLoadEvent, columns: PngTableColumn[]) => `client${new PngTableSearchQueryBuilder(event, columns).create()}`,
    getById: (clientId: string) => `client/${clientId}`,
    post: "client",
    put: "client"
  },
  identity: {
    authenticate: "identity/authenticate",
    changePassword: "identity/changePassword",
    isEmptyPassword: "identity/isEmptyPassword",
    refreshToken: "identity/refreshToken"
  },
  selectOptions: {
    audits: (event: LazyLoadEvent, columns: PngTableColumn[], entityId: string, entityTableName: string) => `audit/getFieldNames${new PngTableSearchQueryBuilder(event, columns).create()}&entityId=${entityId}&entityTableName=${entityTableName}`,
    clientTypes: "selectoptions/clientTypes",
    languages: "selectoptions/languages",
    userRoles: "selectoptions/userRoles",
    yesNoOptions: "selectoptions/yesNo"
  },
  user: {
    changeLanguage: "user/changeLanguage",
    changePassword: "user/changePassword",
    changeRole: "user/changeRole",
    changeTheme: "user/changeTheme",
    delete: (userId: string) => `user/${userId}`,
    getAll: (event: LazyLoadEvent, columns: PngTableColumn[]) => `user${new PngTableSearchQueryBuilder(event, columns).create()}`,
    getById: (userId: string) => `user/${userId}`,
    getLanguage: (userId: string) => `user/getLanguage/${userId}`,
    getTheme: (userId: string) => `user/getTheme/${userId}`,
    post: "user",
    put: "user"
  },
  userRole: {
    delete: (userRoleId: number) => `userRole/${userRoleId}`,
    getAll: (event: LazyLoadEvent, columns: PngTableColumn[]) => `userRole${new PngTableSearchQueryBuilder(event, columns).create()}`,
    getById: (userRoleId: number) => `userRole/${userRoleId}`,
    getUserRolePermissionsForCreation: "userRole/getUserRolePermissionsForCreation",
    post: "userRole",
    put: "userRole"
  }
}