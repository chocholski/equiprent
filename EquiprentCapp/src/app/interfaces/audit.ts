export interface AuditListModel {
  List: AuditListItemModel[];
  TotalRowsCount: number;
}

export interface AuditListItemModel {
  CreatedOn: string,
  FieldName: string,
  NewValue: string,
  OldValue: string,
  Translation: string,
  UserName: string,
}