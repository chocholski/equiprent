export interface PngTableColumn {
  field: string;
  header: string;
  width?: string;
  replaceWith?: string;
  operator: SearchOperatorEnum;
}

export enum SearchOperatorEnum {
  None = 0,
  StringEqual = 1,
  Unequal = 2,
  LowerThan = 3,
  LowerThanOrEqualTo = 4,
  GreaterThan = 5,
  GreaterThanOrEqualTo = 6,
  Like = 7,
  DateEqual = 8,
  NumberEqual = 9,
  BoolEqual = 10,
  Special = 11,
  Ignore = 12
}