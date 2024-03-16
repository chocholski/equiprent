import { Component, OnInit, ViewChild } from "@angular/core";
import { AccessControlComponent } from "../../abstract/access-controls/access-control";
import { EquipmentListItemModel, EquipmentListModel } from "src/app/interfaces/equipment";
import { ConfirmationService, LazyLoadEvent, SelectItem } from "primeng/api";
import { PngTableColumn } from "src/app/interfaces/png";
import { Table } from "primeng/table";
import { AuthorizationService } from "src/app/services/authorization/authorization.service";
import { ConsoleMessageService } from "src/app/services/messages/console-message.service";
import { DialogMessageService } from "src/app/services/messages/dialog-message.service";
import { ErrorService } from "src/app/services/errors/error.service";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { API_ROUTES } from "src/app/constants/api-routes.constants";
import { UserPermissionEnum } from "src/app/enums/user-permission.enum";
import { FilterTypeEnum } from "src/app/enums/filter-type.enum";
import { ROUTES } from "src/app/constants/routes.constants";
import { StringBuilder } from "src/app/tools/stringBuilder";
import { SelectOptionsService } from "src/app/services/select-options/select-options.service";
import { FilterService } from "src/app/services/filters/filter.service";

@Component({
  selector: "equipment-list",
  templateUrl: "./equipment-list.component.html"
})
export class EquipmentListComponent
  extends AccessControlComponent<EquipmentListItemModel>
  implements OnInit {

  protected override deletedEntityInstanceIdentificationInitializer = this.getEntityInstanceName;

  private readonly _dataPopulator = {
    multiSelects: {
      manufacturers: {
        get: () => this.getManufacturerMultiSelectData(),
        set: (manufacturers: SelectItem[]) => this.setManufacturerMultiSelectData(manufacturers)
      },
      types: {
        get: () => this.getTypeMultiSelectData(),
        set: (types: SelectItem[]) => this.setTypeMultiSelectData(types)
      }
    },
    equipments: {
      get: (event: LazyLoadEvent) => this.getEquipments(event),
      set: (equipments: EquipmentListModel) => this.setEquipments(equipments)
    }
  };

  private tempLazyLoadEvent: LazyLoadEvent;

  cols: PngTableColumn[];
  equipments: EquipmentListItemModel[];
  manufacturerOptions: SelectItem[];
  totalRecords: number;
  typeOptions: SelectItem[];

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
    private readonly selectOptionsService: SelectOptionsService,
    public override readonly translate: TranslateService
  ) {
    super(
      authorizationService,
      confirmationService,
      consoleMessageService,
      'deleteManufacturer',
      API_ROUTES.equipment.delete,
      dialogMessageService,
      'Equipment',
      errorService,
      httpClient,
      () => {
        this._dataPopulator.equipments
          .get(this.tempLazyLoadEvent)
          .subscribe(result => this._dataPopulator.equipments.set(result));
      },
      router,
      translate,
      [UserPermissionEnum.Equipments_CanModify]);
  }

  ngOnInit() {
    this.cols = [
      <PngTableColumn>{
        field: 'Name',
        header: 'Equipment.Name',
        width: '10%',
        filterType: FilterTypeEnum.Text,
        applyGlobalFiltering: true
      },
      <PngTableColumn>{
        field: 'ManufacturerName',
        header: 'Equipment.ManufacturerName',
        width: '20%',
        filterType: FilterTypeEnum.Text,
        applyGlobalFiltering: true,
        replaceWith: 'ManufacturerId'
      },
      <PngTableColumn>{
        field: 'SerialNumber',
        header: 'Equipment.SerialNumber',
        width: '10%',
        filterType: FilterTypeEnum.Text,
        applyGlobalFiltering: true
      },
      <PngTableColumn>{
        field: 'TypeName',
        header: 'Equipment.TypeName',
        width: '20%',
        filterType: FilterTypeEnum.Text,
        applyGlobalFiltering: true,
        replaceWith: 'TypeId'
      },
      <PngTableColumn>{
        field: 'Actions',
        header: '',
        width: '20%'
      }
    ];

    this._dataPopulator.multiSelects.manufacturers
      .get()
      .subscribe(manufacturers => this._dataPopulator.multiSelects.manufacturers.set(manufacturers));

    this._dataPopulator.multiSelects.types
      .get()
      .subscribe(types => this._dataPopulator.multiSelects.types.set(types));
  }

  public loadEquipmentsLazy(event: LazyLoadEvent) {
    this.tempLazyLoadEvent = event;
    this._dataPopulator.equipments
      .get(event)
      .subscribe(result => this._dataPopulator.equipments.set(result));
  }

  public onCreate() {
    this.router.navigate([ROUTES.equipments.navigations.creation]);
  }

  public onEdit(equipment: EquipmentListItemModel) {
    this.router.navigate([ROUTES.equipments.navigations.edition(equipment.Id)]);
  }

  private getEntityInstanceName(equipment: EquipmentListItemModel): string {
    return new StringBuilder(equipment.Name)
      .append(' ')
      .append(equipment.SerialNumber)
      .toString();
  }

  private getManufacturerMultiSelectData() {
    return this.selectOptionsService.getManufacturers();
  }

  private getEquipments(event: LazyLoadEvent) {
    event.sortField ??= this.cols[0]?.field;

    return this.httpClient
      .get<EquipmentListModel>(API_ROUTES.equipment.getAll(event, this.cols));
  }

  private getTypeMultiSelectData() {
    return this.selectOptionsService.getEquipmentTypes();
  }

  private setManufacturerMultiSelectData(manufacturers: SelectItem[]) {
    this.manufacturerOptions = manufacturers;

    const manufacturerColumn = this.cols.find(c => c.field === "ManufacturerName");
    if (manufacturerColumn) {
      manufacturerColumn.options = this.manufacturerOptions;
    }
  }

  private setEquipments(equipments: EquipmentListModel) {
    this.totalRecords = equipments.TotalRowsCount;
    this.equipments = equipments.List;
  }

  private setTypeMultiSelectData(types: SelectItem[]) {
    this.typeOptions = types;

    const typeColumn = this.cols.find(c => c.field === "TypeName");
    if (typeColumn) {
      typeColumn.options = this.typeOptions;
    }
  }
}