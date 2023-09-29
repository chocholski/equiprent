export class UserChangeLanguageModel {
  Id: string;
  LanguageId: number;
}

export interface UserListModel {
  List: UserListItemModel[];
  TotalRowsCount: number;
}

export interface UserListItemModel {
  FirstName: string;
  Id: string;
  IsActive: boolean;
  LastName: string;
  Login: string;
  UserRoleId: number;
  UserRoleName: string;
}