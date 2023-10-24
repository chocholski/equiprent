import { SelectItem } from "primeng/api";
import { FilterTypeEnum } from "../enums/filter-type-enum";

export class PngTable {
  cols: PngTableColumn[] = [];

  constructor(cols: PngTableColumn[]) {
    this.cols = cols;
  }

  public setOptionsForColumn(columnName: string, options: SelectItem[]) {
    const column = this.cols.find(c => c.field === columnName);

    if (column) {
      column.options = options;
    }
  }
}

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
  icon: string;
}