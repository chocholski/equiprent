import { SelectItem } from "primeng/api";
import { FilterTypeEnum } from "../enums/filterTypeEnum";

export class PngTableColumn {
  applyGlobalFiltering: boolean;
  field: string;
  filterMatchMode?: string;
  header: string;
  options?: SelectItem[];
  replaceWith?: string;
  filterType: FilterTypeEnum = FilterTypeEnum.Text;
  width?: string;
}

export class PngTreeColumn {
  field: string;
  header: string;
}