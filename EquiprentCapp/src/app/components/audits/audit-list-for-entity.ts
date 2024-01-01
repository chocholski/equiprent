import { Component, Input, OnInit } from "@angular/core";
import { LazyLoadEvent, SelectItem } from "primeng/api";
import { PngTable, PngTableColumn } from "src/app/interfaces/png";
import { HttpClient } from "@angular/common/http";
import { FilterService } from "src/app/services/filters/filter.service";
import { TranslateService } from "@ngx-translate/core";
import { ApiRoutes } from "src/app/api-routes";
import { SelectOptionsService } from "src/app/services/select-options/select-options.service";
import { AuditListItemModel, AuditListModel } from "src/app/interfaces/audit";
import { concatMap } from 'rxjs/operators';

@Component({
  selector: "audit-list-for-entity",
  templateUrl: "./audit-list-for-entity.html"
})
export class AuditListForEntityComponent implements OnInit {

  private readonly _dataPopulator = {
    fieldNamesForObjectHistory: {
      get: () => this.getFieldNamesForObjectHistory(),
      set: (options: SelectItem[]) => this.setFieldNamesForObjectHistory(options)
    },
    objectHistory: {
      get: (event: LazyLoadEvent) => this.getObjectHistory(event),
      set: (audits: AuditListModel) => this.setObjectHistory(audits)
    }
  };

  private tempLazyLoadEvent: LazyLoadEvent;

  public audits: AuditListItemModel[];
  public table: PngTable;
  public fieldNameOptions: SelectItem[] = [];
  public totalRecords: number;

  @Input() entityId: string;
  @Input() entityTableName: string;

  constructor(
    public readonly filterService: FilterService,
    private readonly httpClient: HttpClient,
    private readonly selectOptionsService: SelectOptionsService,
    public readonly translate: TranslateService) {
  }

  ngOnInit() {
    this.table = new PngTable([
      <PngTableColumn>{
        field: 'UserName',
        header: 'Audit.UserName',
        width: '20%',
        applyGlobalFiltering: true
      },
      <PngTableColumn>{
        field: 'CreatedOn',
        header: 'Audit.CreatedOn',
        width: '20%'
      },
      <PngTableColumn>{
        field: 'FieldName',
        header: 'Audit.FieldName',
        width: '20%',
        applyGlobalFiltering: true
      },
      <PngTableColumn>{
        field: 'OldValue',
        header: 'Audit.OldValue',
        width: '20%',
        applyGlobalFiltering: true
      },
      <PngTableColumn>{
        field: 'NewValue',
        header: 'Audit.NewValue',
        width: '20%',
        applyGlobalFiltering: true
      }
    ]);
  }

  public loadAuditsLazy(event: LazyLoadEvent) {
    this.tempLazyLoadEvent = event;

    this._dataPopulator.objectHistory
      .get(event)
      .pipe(
        concatMap(result => {
          this._dataPopulator.objectHistory.set(result);

          return this._dataPopulator.fieldNamesForObjectHistory.get();
        })
      )
      .subscribe(result => {
        this._dataPopulator.fieldNamesForObjectHistory.set(result);
      });
  }

  private getFieldNamesForObjectHistory() {
    return this.selectOptionsService
      .getFieldNamesForObjectHistory(this.tempLazyLoadEvent, this.table.cols, this.entityId, this.entityTableName);
  }

  private getObjectHistory(event: LazyLoadEvent) {
    return this.httpClient
      .get<AuditListModel>(ApiRoutes.audit.getObjectHistory(event, this.table.cols, this.entityId, this.entityTableName));
  }

  private setFieldNamesForObjectHistory(options: SelectItem[]) {
    this.fieldNameOptions = options;
    this.table.setOptionsForColumn("FieldName", this.fieldNameOptions);
  }

  private setObjectHistory(audits: AuditListModel) {
    this.totalRecords = audits.TotalRowsCount;
    this.audits = audits.List;
  }
}