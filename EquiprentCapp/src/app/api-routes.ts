import { LazyLoadEvent } from "primeng/api";
import { PngTableColumn } from "./interfaces/png";
import { PngTableSearchQueryBuilder } from "./tools/png-table-search-query-builder";
import { EquipmentPhotoBase } from "./interfaces/equipment";

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
  clientRepresentative: {
    delete: (clientRepresentativeId: string) => `client/representative/${clientRepresentativeId}`,
    getAll: (event: LazyLoadEvent, columns: PngTableColumn[], clientId: string) => `client/representative${new PngTableSearchQueryBuilder(event, columns).create()}&clientId=${clientId}`,
    getById: (clientRepresentativeId: string) => `client/representative/${clientRepresentativeId}`,
    post: "client/representative",
    put: "client/representative"
  },
  equipment: {
    delete: (equipmentId: string) => `equipment/${equipmentId}`,
    getAll: (event: LazyLoadEvent, columns: PngTableColumn[]) => `equipment${new PngTableSearchQueryBuilder(event, columns).create()}`,
    file: {
      photo: {
        download: (photoId: string) => `equipment/file/photo/download/${photoId}`,
        makeThumbnailForFile: `equipment/file/photo/makeThumbnailForFile`,
        uploadMultiple: `equipment/file/photo/uploadMultiple`,
      }
    },
    getById: (equipmentId: string) => `equipment/${equipmentId}`,
    post: "equipment",
    put: "equipment"
  },
  identity: {
    authenticate: "identity/authenticate",
    refreshToken: "identity/refreshToken"
  },
  manufacturer: {
    delete: (manufacturerId: string) => `manufacturer/${manufacturerId}`,
    getAll: (event: LazyLoadEvent, columns: PngTableColumn[]) => `manufacturer${new PngTableSearchQueryBuilder(event, columns).create()}`,
    getById: (manufacturerId: string) => `manufacturer/${manufacturerId}`,
    post: "manufacturer",
    put: "manufacturer"
  },
  selectOptions: {
    audits: (event: LazyLoadEvent, columns: PngTableColumn[], entityId: string, entityTableName: string) => `audit/getFieldNames${new PngTableSearchQueryBuilder(event, columns).create()}&entityId=${entityId}&entityTableName=${entityTableName}`,
    clientTypes: "selectoptions/clientTypes",
    countries: "selectoptions/countries",
    equipmentTypes: "selectoptions/equipmentTypes",
    languages: "selectoptions/languages",
    manufacturers: "selectoptions/manufacturers",
    userRoles: "selectoptions/userRoles",
    yesNoOptions: "selectoptions/yesNo"
  },
  user: {
    changeLanguage: "user/changeLanguage",
    changeRole: "user/changeRole",
    changeTheme: "user/changeTheme",
    delete: (userId: string) => `user/${userId}`,
    getAll: (event: LazyLoadEvent, columns: PngTableColumn[]) => `user${new PngTableSearchQueryBuilder(event, columns).create()}`,
    getById: (userId: string) => `user/${userId}`,
    getLanguage: (userId: string) => `user/getLanguage/${userId}`,
    getProfileById: (userId: string) => `user/profile/${userId}`,
    getTheme: (userId: string) => `user/getTheme/${userId}`,
    post: "user",
    put: "user",
    saveProfile: "user/profile"
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