import { Component, OnInit, ViewChild } from '@angular/core';
import { LazyLoadEvent, SelectItem } from 'primeng/api';
import { PngTableColumn } from 'src/app/interfaces/png';
import { Table } from 'primeng/table';
import { AuthorizationService } from 'src/app/services/authorization/authorization.service';
import { UserPermissionEnum } from 'src/app/enums/user-permission.enum';
import { ClientSelectListItemModel, ClientSelectListModel } from 'src/app/interfaces/client';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { API_ROUTES } from 'src/app/constants/api-routes.constants';
import { SelectOptionsService } from 'src/app/services/select-options/select-options.service';
import { FilterService } from 'src/app/services/filters/filter.service';
import { FilterTypeEnum } from 'src/app/enums/filter-type.enum';
import { AccessControlSelectListComponent } from '../../abstract/access-controls/access-control-select-list';
import { SelectResult } from 'src/app/interfaces/selection';

@Component({
  selector: "client-select-list",
  templateUrl: "./client-select-list.component.html"
})
export class ClientSelectListComponent
  extends AccessControlSelectListComponent<ClientSelectListItemModel>
  implements OnInit {

  protected override selectionHandler = this.clientSelectionHandler;

  private readonly _dataPopulator = {
    multiSelects: {
      clientTypes: {
        get: () => this.getClientTypeMultiSelectData(),
        set: (clientTypes: SelectItem[]) => this.setClientTypeMultiSelectData(clientTypes)
      }
    },
    clients: {
      get: (event: LazyLoadEvent) => this.getClients(event),
      set: (clients: ClientSelectListModel) => this.setClients(clients)
    }
  };

  private tempLazyLoadEvent: LazyLoadEvent;

  clients: ClientSelectListItemModel[];
  clientTypes: SelectItem[];
  cols: PngTableColumn[];
  totalRecords: number;

  @ViewChild('dataTable') dataTable: Table;

  constructor(
    protected override readonly authorizationService: AuthorizationService,
    public readonly filterService: FilterService,
    private readonly httpClient: HttpClient,
    private readonly router: Router,
    private readonly selectOptionService: SelectOptionsService,
    public readonly translate: TranslateService
  ) {
    super(
      authorizationService,
      [UserPermissionEnum.ForAllLoggedIn]);
  }

  ngOnInit() {
    this.cols = [
      <PngTableColumn>{
        field: 'Name',
        header: 'Client.Name',
        width: '20%',
        filterType: FilterTypeEnum.Text,
        applyGlobalFiltering: true,
      },
      <PngTableColumn>{
        field: 'FirstName',
        header: 'Client.FirstName',
        width: '20%',
        filterType: FilterTypeEnum.Text,
      },
      <PngTableColumn>{
        field: 'LastName',
        header: 'Client.LastName',
        width: '20%',
        filterType: FilterTypeEnum.Text,
      },
      <PngTableColumn>{
        field: 'TypeName',
        header: 'Client.TypeName',
        width: '20%',
        filterType: FilterTypeEnum.Text,
        applyGlobalFiltering: true,
        replaceWith: 'ClientTypeId'
      },
      <PngTableColumn>{
        field: 'Actions',
        header: '',
        width: '20%'
      }
    ];

    this._dataPopulator.multiSelects.clientTypes
      .get()
      .subscribe(clientTypes => this._dataPopulator.multiSelects.clientTypes.set(clientTypes));
  }

  public loadClientsLazy(event: LazyLoadEvent) {
    this.tempLazyLoadEvent = event;
    this._dataPopulator.clients
      .get(event)
      .subscribe(result => this._dataPopulator.clients.set(result));
  }

  private clientSelectionHandler(client: ClientSelectListItemModel): SelectResult {
    return <SelectResult>{
      Id: client.Id,
      Name: client.Name,
    };
  }

  private getClients(event: LazyLoadEvent) {
    event.sortField ??= this.cols[0].field;
    return this.httpClient
      .get<ClientSelectListModel>(API_ROUTES.client.select(event, this.cols));
  }

  private getClientTypeMultiSelectData() {
    return this.selectOptionService.getClientTypes();
  }

  private setClientTypeMultiSelectData(clientTypes: SelectItem[]) {
    this.clientTypes = clientTypes;
    const clientTypeColumn = this.cols.find(c => c.field === "TypeName");
    if (clientTypeColumn) {
      clientTypeColumn.options = this.clientTypes;
    }
  }

  private setClients(clients: ClientSelectListModel) {
    this.totalRecords = clients.TotalRowsCount;
    this.clients = clients.List;
  }
}