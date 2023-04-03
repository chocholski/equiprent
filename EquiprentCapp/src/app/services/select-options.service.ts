import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { SelectItem } from "primeng/api";
import { Observable, catchError, map } from "rxjs";
import { SelectOption } from "../interfaces/ui-models";

@Injectable()
export class SelectOptionsService {

  constructor(private httpClient: HttpClient, public translate: TranslateService) {
  }

  private getOptions(url: string, insertAllOption: boolean): Observable<SelectItem[]> {
    return this.httpClient.get<SelectOption[]>(url).pipe(map(result => {
      var options = [];

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

        return new Observable<any>(error);
      }));
  }

  public getYesNoOptions(): Observable<SelectItem[]> {
    return this.getOptions("selectoptions/yesnoselectoptions", true);
  }

  public getLanguages(): Observable<SelectItem[]> {
    return this.getOptions("selectoptions/languagesselectoptions", false);
  }
}