import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { FilterMatchMode } from "primeng/api";
import { Table } from "primeng/table";

@Injectable()
export class FilterService {

  constructor(public translate: TranslateService) {
  }

  public getPlaceholder(field: string): string {
    const capitalizedField = field.replace(/^\w/, (c) => c.toUpperCase());

    return `${this.translate.instant('General.SearchFor')} ${capitalizedField}`;
  }

  onClearFilters(dataTable: Table) {
    dataTable.reset();
  }

  onFilterGlobal(dataTable: Table, filterValue: string) {
    dataTable.filterGlobal(filterValue, FilterMatchMode.CONTAINS);
  }

  public shouldHideIcon(filterValue: string): boolean {
    let inputWidth = 0;

    const filterElement = document.getElementById('filter');
    const textContentLengthHelper = document.createElement('span');

    textContentLengthHelper.style.visibility = 'hidden';
    textContentLengthHelper.style.position = 'absolute';

    textContentLengthHelper.textContent = filterValue;

    if (filterElement)
      inputWidth = filterElement.offsetWidth;

    document.body.appendChild(textContentLengthHelper);

    const textContentWidth = textContentLengthHelper.offsetWidth;

    document.body.removeChild(textContentLengthHelper);

    return textContentWidth > inputWidth - 30;
  }
}