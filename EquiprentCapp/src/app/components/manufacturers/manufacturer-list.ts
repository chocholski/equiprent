import { Component, OnInit, ViewChild } from "@angular/core";
import { AccessControlComponent } from "../abstract/access-controls/access-control";
import { ManufacturerListItemModel, ManufacturerListModel } from "src/app/interfaces/manufacturer";
import { ConfirmationService, LazyLoadEvent } from "primeng/api";
import { PngTableColumn } from "src/app/interfaces/png";
import { Table } from "primeng/table";
import { AuthorizationService } from "src/app/services/authorization/authorization.service";
import { ConsoleMessageService } from "src/app/services/messages/console-message.service";
import { DialogMessageService } from "src/app/services/messages/dialog-message.service";
import { ErrorService } from "src/app/services/errors/error.service";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { ApiRoutes } from "src/app/api-routes";
import { UserPermissionEnum } from "src/app/enums/user-permission-enum";
import { FilterService } from "src/app/services/filters/filter.service";
import { FilterTypeEnum } from "src/app/enums/filter-type-enum";
import { Routes } from "src/app/routes";

@Component({
  selector: "manufacturer-list",
  templateUrl: "./manufacturer-list.html"
})
export class ManufacturerListComponent
  extends AccessControlComponent<ManufacturerListItemModel>
  implements OnInit {

  protected override deletedEntityInstanceIdentificationInitializer = this.getEntityInstanceName;

  private readonly _dataPopulator = {
    manufacturers: {
      get: (event: LazyLoadEvent) => this.getManufacturers(event),
      set: (manufacturers: ManufacturerListModel) => this.setManufacturers(manufacturers)
    }
  };

  private tempLazyLoadEvent: LazyLoadEvent;

  cols: PngTableColumn[];
  manufacturers: ManufacturerListItemModel[];
  totalRecords: number;

  @ViewChild('dataTable') dataTable: Table;

  constructor(
    protected override readonly authorizationService: AuthorizationService,
    protected override readonly confirmationService: ConfirmationService,
    protected override readonly consoleMessageService: ConsoleMessageService,
    protected override readonly dialogMessageService: DialogMessageService,
    protected override readonly errorService: ErrorService,
    public readonly filterService: FilterService,
    protected override readonly httpClient: HttpClient,
    protected override readonly router: Router,
    public override readonly translate: TranslateService
  ) {
    super(
      authorizationService,
      confirmationService,
      consoleMessageService,
      'deleteManufacturer',
      ApiRoutes.manufacturer.delete,
      dialogMessageService,
      'Manufacturer',
      errorService,
      httpClient,
      () => {
        this._dataPopulator.manufacturers
          .get(this.tempLazyLoadEvent)
          .subscribe(result => this._dataPopulator.manufacturers.set(result));
      },
      router,
      translate,
      [UserPermissionEnum.Manufacturers_CanModify]);
  }

  ngOnInit() {
    this.cols = [
      <PngTableColumn>{
        field: 'Name',
        header: 'Manufacturer.Name',
        width: '10%',
        filterType: FilterTypeEnum.Text,
        applyGlobalFiltering: true
      },
      <PngTableColumn>{
        field: 'IsOperational',
        header: 'Manufacturer.IsOperational',
        width: '10%'
      },
      <PngTableColumn>{
        field: 'NationalId',
        header: 'Manufacturer.NationalId',
        width: '10%',
        filterType: FilterTypeEnum.Text,
        applyGlobalFiltering: true
      },
      <PngTableColumn>{
        field: 'AddressSummary',
        header: 'Manufacturer.AddressSummary',
        width: '10%',
        filterType: FilterTypeEnum.Text,
      },
      <PngTableColumn>{
        field: 'Actions',
        header: '',
        width: '20%'
      }
    ];
  }

  public loadManufacturersLazy(event: LazyLoadEvent) {
    this.tempLazyLoadEvent = event;
    this._dataPopulator.manufacturers
      .get(event)
      .subscribe(result => this._dataPopulator.manufacturers.set(result));
  }

  public onCreate() {
    this.router.navigate([Routes.manufacturers.navigations.creation]);
  }

  public onEdit(manufacturer: ManufacturerListItemModel) {
    this.router.navigate([Routes.manufacturers.navigations.edition(manufacturer.Id)]);
  }

  private getEntityInstanceName(manufacturer: ManufacturerListItemModel): string {
    return manufacturer.Name;
  }

  private getManufacturers(event: LazyLoadEvent) {
    event.sortField ??= this.cols[0].field;

    return this.httpClient
      .get<ManufacturerListModel>(ApiRoutes.manufacturer.getAll(event, this.cols));
  }

  private setManufacturers(manufacturers: ManufacturerListModel) {
    this.totalRecords = manufacturers.TotalRowsCount;
    this.manufacturers = manufacturers.List;
  }
}