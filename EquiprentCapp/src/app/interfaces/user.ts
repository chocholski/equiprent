export class UserChangeLanguageModel {
  Id: string;
  LanguageId: number;
}

export class UserChangeThemeModel {
  Id: string;
}

export class UserCreationModel {
  Email?: string;
  FirstName: string;
  IsActive: boolean;
  LanguageId: number;
  LastName: string;
  Login: string;
  Password: string;
  UserRoleId: number;
}

export class UserDetailsModel {
  CreatedById?: string;
  CreatedOn?: string;
  Email?: string;
  FirstName: string;
  Id: string;
  IsActive: boolean;
  LastName: string;
  Login: string;
  Password: string;
  UserRoleId: number;
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

export class UserProfileModel {
  Email?: string;
  FirstName: string;
  Id: string;
  LastName: string;
  Login: string;
  Password: string;
  UserRoleId: number;
}