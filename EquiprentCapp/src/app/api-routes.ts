import { LazyLoadEvent } from "primeng/api";
import { PngTableColumn } from "./interfaces/png";
import { PngTableSearchQueryBuilder } from "./tools/png-table-search-query-builder";

export const ApiRoutes = {
  audit: {
    getObjectHistory: (event: LazyLoadEvent, columns: PngTableColumn[], entityId: string, entityTableName: string) => `audit${new PngTableSearchQueryBuilder(event, columns).create()}&entityId=${entityId}&entityTableName=${entityTableName}`,
    getFieldNames: "audit/getFieldNames"
  },
  identity: {
    authenticate: "identity/authenticate",
    changePassword: "identity/changePassword",
    isEmptyPassword: "identity/isEmptyPassword",
    refreshToken: "identity/refreshToken",
    resetPassword: "identity/resetPassword"
  },
  selectOptions: {
    audits: (event: LazyLoadEvent, columns: PngTableColumn[], entityId: string, entityTableName: string) => `audit/getFieldNames${new PngTableSearchQueryBuilder(event, columns).create()}&entityId=${entityId}&entityTableName=${entityTableName}`,
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
    delete: (userRoleId: string) => `userRole/${userRoleId}`,
    getAll: (event: LazyLoadEvent, columns: PngTableColumn[]) => `userRole${new PngTableSearchQueryBuilder(event, columns).create()}`,
    getById: (userRoleId: string) => `userRole/${userRoleId}`,
    getUserRolePermissionsForCreation: "getUserRolePermissionsForCreation",
    post: "userRole",
    put: "userRole"
  }
}