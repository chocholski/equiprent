import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { LazyLoadEvent, SelectItem } from "primeng/api";
import { Observable, catchError, map } from "rxjs";
import { SelectOption } from "../interfaces/ui-models";
import { ApiRoutes } from "../api-routes";
import { PngTableColumn } from "../interfaces/png";

@Injectable()
export class SelectOptionsService {

  constructor(private httpClient: HttpClient, public translate: TranslateService) {
  }

  getFieldNamesForObjectHistory(event: LazyLoadEvent, columns: PngTableColumn[], entityId: string, entityTableName: string): Observable<SelectItem[]> {
    return this.getOptions(ApiRoutes.selectOptions.audits(event, columns, entityId, entityTableName), true);
  }

  getLanguages(): Observable<SelectItem[]> {
    return this.getOptions(ApiRoutes.selectOptions.languages, false);
  }

  getUserRoles(): Observable<SelectItem[]> {
    return this.getOptions(ApiRoutes.selectOptions.userRoles, false);
  }

  getYesNoOptions(): Observable<SelectItem[]> {
    return this.getOptions(ApiRoutes.selectOptions.yesNoOptions, true);
  }

  private getOptions(url: string, insertAllOption: boolean): Observable<SelectItem[]> {
    return this.httpClient
      .get<SelectOption[]>(url)
      .pipe(map(result => {
        const options: SelectItem[] = [];

        if (insertAllOption) {
          options.push({ label: this.translate.instant('General.All'), value: -1 });
        }

        for (let item of result) {
          options.push({ label: item.Name, value: item.Value });
        }

        return options;
      }),
        catchError(error => {
          console.log(error);

          return new Observable<SelectItem[]>(error);
        }));
  }
}