import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Injectable()
export class FilterService {

  constructor(public translate: TranslateService) {
  }

  public getPlaceholder(field: string): string {
    const capitalizedField = field.replace(/^\w/, (c) => c.toUpperCase());
    return `${this.translate.instant('General.SearchFor')} ${capitalizedField}`;
  }
}