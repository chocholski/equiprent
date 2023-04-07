export class UserChangeLanguageModel {
  Id: string;
  LanguageId: number;
}

export interface UserListModel {
  List: UserListItemModel[];
  TotalRowsCount: number;
}

export interface UserListItemModel {
  Id: string;
  Login: string;
  FirstName: string;
  LastName: string;
  UserRoleId: number;
  UserRoleName: string;
  IsActive: boolean;
}