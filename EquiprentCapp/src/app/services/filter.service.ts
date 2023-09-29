import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { PngTableColumn } from "../interfaces/png";
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

  onGlobalFilter<T>(dataTable: Table, columns: PngTableColumn[], rows: T[], event: Event) {
    //TODO implement
  }

  public shouldHideIcon(filterValue: string): boolean {
    let inputWidth = 0;

    const inputElement = document.getElementById('filter');
    const textContentLengthHelper = document.createElement('span');

    textContentLengthHelper.style.visibility = 'hidden';
    textContentLengthHelper.style.position = 'absolute';

    textContentLengthHelper.textContent = filterValue;

    if (inputElement)
      inputWidth = inputElement.offsetWidth;

    document.body.appendChild(textContentLengthHelper);

    const textContentWidth = textContentLengthHelper.offsetWidth;

    document.body.removeChild(textContentLengthHelper);

    return textContentWidth > inputWidth - 30;
  }
}