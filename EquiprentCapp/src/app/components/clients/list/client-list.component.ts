import { Component, OnInit, ViewChild } from '@angular/core';
import { AccessControlComponent } from '../../abstract/access-controls/access-control';
import { ConfirmationService, LazyLoadEvent, SelectItem } from 'primeng/api';
import { PngTableColumn } from 'src/app/interfaces/png';
import { Table } from 'primeng/table';
import { AuthorizationService } from 'src/app/services/authorization/authorization.service';
import { UserPermissionEnum } from 'src/app/enums/user-permission.enum';
import { ClientListItemModel, ClientListModel } from 'src/app/interfaces/client';
import { Router } from '@angular/router';
import { ROUTES } from 'src/app/constants/routes.constants';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { API_ROUTES } from 'src/app/constants/api-routes.constants';
import { DialogMessageService } from 'src/app/services/messages/dialog-message.service';
import { ErrorService } from 'src/app/services/errors/error.service';
import { ConsoleMessageService } from 'src/app/services/messages/console-message.service';
import { SelectOptionsService } from 'src/app/services/select-options/select-options.service';
import { FilterService } from 'src/app/services/filters/filter.service';
import { FilterTypeEnum } from 'src/app/enums/filter-type.enum';

@Component({
  selector: "client-list",
  templateUrl: "./client-list.component.html"
})
export class ClientListComponent
  extends AccessControlComponent<ClientListItemModel>
  implements OnInit {

  protected override deletedEntityInstanceIdentificationInitializer = this.getEntityInstanceName;

  private readonly _dataPopulator = {
    multiSelects: {
      clientTypes: {
        get: () => this.getClientTypeMultiSelectData(),
        set: (clientTypes: SelectItem[]) => this.setClientTypeMultiSelectData(clientTypes)
      }
    },
    clients: {
      get: (event: LazyLoadEvent) => this.getClients(event),
      set: (clients: ClientListModel) => this.setClients(clients)
    }
  };

  private tempLazyLoadEvent: LazyLoadEvent;

  clients: ClientListItemModel[];
  clientTypeOptions: SelectItem[];
  cols: PngTableColumn[];
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
    private readonly selectOptionService: SelectOptionsService,
    public override readonly translate: TranslateService
  ) {
    super(
      authorizationService,
      confirmationService,
      consoleMessageService,
      'deleteClient',
      API_ROUTES.client.delete,
      dialogMessageService,
      'Client',
      errorService,
      httpClient,
      () => {
        this._dataPopulator.clients
          .get(this.tempLazyLoadEvent)
          .subscribe(result => this._dataPopulator.clients.set(result));
      },
      router,
      translate,
      [UserPermissionEnum.Clients_CanModify]);
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

  public onCreate() {
    this.router.navigate([ROUTES.clients.navigations.creation]);
  }

  public onEdit(client: ClientListItemModel) {
    this.router.navigate([ROUTES.clients.navigations.edition(client.Id)]);
  }

  private getClients(event: LazyLoadEvent) {
    event.sortField ??= this.cols[0].field;

    return this.httpClient
      .get<ClientListModel>(API_ROUTES.client.getAll(event, this.cols));
  }

  private getClientTypeMultiSelectData() {
    return this.selectOptionService.getClientTypes();
  }

  private getEntityInstanceName(client: ClientListItemModel): string {
    return client.Name;
  }

  private setClientTypeMultiSelectData(clientTypes: SelectItem[]) {
    this.clientTypeOptions = clientTypes;

    const clientTypeColumn = this.cols.find(c => c.field === "TypeName");
    if (clientTypeColumn) {
      clientTypeColumn.options = this.clientTypeOptions;
    }
  }

  private setClients(clients: ClientListModel) {
    this.totalRecords = clients.TotalRowsCount;
    this.clients = clients.List;
  }
}