import { Component, OnInit, ViewChild } from "@angular/core";
import { AccessControlSelectListComponent } from "../../abstract/access-controls/access-control-select-list";
import { SelectResult } from "src/app/interfaces/selection";
import { LazyLoadEvent, SelectItem } from "primeng/api";
import { Table } from "primeng/table";
import { AuthorizationService } from "src/app/services/authorization/authorization.service";
import { HttpClient } from "@angular/common/http";
import { SelectOptionsService } from "src/app/services/select-options/select-options.service";
import { TranslateService } from "@ngx-translate/core";
import { UserPermissionEnum } from "src/app/enums/user-permission.enum";
import { PngTableColumn } from "src/app/interfaces/png";
import { FilterTypeEnum } from "src/app/enums/filter-type.enum";
import { API_ROUTES } from "src/app/constants/api-routes.constants";
import { EquipmentSelectListItemModel, EquipmentSelectListModel } from "src/app/interfaces/equipment";
import { FilterService } from "src/app/services/filters/filter.service";

@Component({
  selector: "equipment-select-list",
  templateUrl: "./equipment-select-list.component.html"
})
export class EquipmentSelectListComponent
  extends AccessControlSelectListComponent<EquipmentSelectListItemModel>
  implements OnInit {

  protected override selectionHandler = this.equipmentSelectionHandler;

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
      set: (equipments: EquipmentSelectListModel) => this.setEquipments(equipments)
    }
  };

  private tempLazyLoadEvent: LazyLoadEvent;

  cols: PngTableColumn[];
  equipments: EquipmentSelectListItemModel[];
  manufacturerOptions: SelectItem[];
  totalRecords: number;
  typeOptions: SelectItem[];

  @ViewChild('dataTable') dataTable: Table;

  constructor(
    protected override readonly authorizationService: AuthorizationService,
    public readonly filterService: FilterService,
    private readonly httpClient: HttpClient,
    public readonly selectOptionsService: SelectOptionsService,
    public readonly translate: TranslateService
  ) {
    super(
      authorizationService,
      [UserPermissionEnum.Equipments_CanList]);
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

  private equipmentSelectionHandler(equipment: EquipmentSelectListItemModel): SelectResult {
    return <SelectResult>{
      Id: equipment.Id,
      Name: equipment.Name,
    };
  }

  private getManufacturerMultiSelectData() {
    return this.selectOptionsService.getManufacturers();
  }

  private getEquipments(event: LazyLoadEvent) {
    event.sortField ??= this.cols[0]?.field;

    return this.httpClient
      .get<EquipmentSelectListModel>(API_ROUTES.equipment.select(event, this.cols, this.ignoredIds as string[]));
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

  private setEquipments(equipments: EquipmentSelectListModel) {
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