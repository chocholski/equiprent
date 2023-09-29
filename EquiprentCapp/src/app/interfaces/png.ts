import { SearchOperatorEnum } from "../enums/searchOperatorEnum";

export interface PngTableColumn {
  field: string;
  filterMatchMode?: string;
  header: string;
  operator: SearchOperatorEnum;
  replaceWith?: string;
  width?: string;
}