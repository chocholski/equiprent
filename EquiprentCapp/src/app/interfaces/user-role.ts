export interface UserRoleListModel {
  List: UserRoleListItemModel[];
  TotalRowsCount: number;
}

export interface UserRoleListItemModel {
  Id: string;
  Name: string;
}