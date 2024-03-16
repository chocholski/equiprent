import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { LazyLoadEvent, SelectItem } from "primeng/api";
import { Observable, catchError, map } from "rxjs";
import { SelectOption } from "../../interfaces/ui-models";
import { API_ROUTES } from "../../constants/api-routes.constants";
import { PngTableColumn } from "../../interfaces/png";

@Injectable()
export class SelectOptionsService {

  constructor(
    private readonly httpClient: HttpClient,
    public readonly translate: TranslateService) {
  }

  getClientTypes(): Observable<SelectItem[]> {
    return this.getOptions(API_ROUTES.selectOptions.clientTypes);
  }

  getCountries(): Observable<SelectItem[]> {
    return this.getOptions(API_ROUTES.selectOptions.countries);
  }

  getFieldNamesForObjectHistory(event: LazyLoadEvent, columns: PngTableColumn[], entityId: string, entityTableName: string): Observable<SelectItem[]> {
    return this.getOptions(API_ROUTES.selectOptions.audits(event, columns, entityId, entityTableName), true);
  }

  getEquipmentTypes(): Observable<SelectItem[]> {
    return this.getOptions(API_ROUTES.selectOptions.equipmentTypes);
  }

  getLanguages(): Observable<SelectItem[]> {
    return this.getOptions(API_ROUTES.selectOptions.languages);
  }

  getManufacturers(): Observable<SelectItem[]> {
    return this.getOptions(API_ROUTES.selectOptions.manufacturers);
  }

  getUserRoles(): Observable<SelectItem[]> {
    return this.getOptions(API_ROUTES.selectOptions.userRoles);
  }

  getYesNoOptions(): Observable<SelectItem[]> {
    return this.getOptions(API_ROUTES.selectOptions.yesNoOptions, true);
  }

  private getOptions(url: string, insertAllOption: boolean = false): Observable<SelectItem[]> {
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