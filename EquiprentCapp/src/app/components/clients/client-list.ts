import { Component, OnInit, ViewChild } from '@angular/core';
import { AccessControlComponent } from '../abstract/accessControlComponent';
import { Confirmation, ConfirmationService, LazyLoadEvent, SelectItem } from 'primeng/api';
import { PngTableColumn } from 'src/app/interfaces/png';
import { Table } from 'primeng/table';
import { AuthorizationService } from 'src/app/services/authorization/authorization.service';
import { UserPermissionEnum } from 'src/app/enums/user-permission-enum';
import { ClientListItemModel, ClientListModel } from 'src/app/interfaces/client';
import { Router } from '@angular/router';
import { Routes } from 'src/app/routes';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { ApiRoutes } from 'src/app/api-routes';
import { ApiResultEnum } from 'src/app/enums/api-result-enum';
import { DialogMessageService } from 'src/app/services/messages/dialog-message.service';
import { ErrorService } from 'src/app/services/errors/error.service';
import { ConsoleMessageService } from 'src/app/services/messages/console-message.service';
import { SelectOptionsService } from 'src/app/services/select-options/select-options.service';
import { FilterService } from 'src/app/services/filters/filter.service';

@Component({
  selector: "client-list",
  templateUrl: "./client-list.html"
})
export class ClientListComponent
  extends AccessControlComponent
  implements OnInit {

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
    protected override authorizationService: AuthorizationService,
    private confirmationService: ConfirmationService,
    private consoleMessageService: ConsoleMessageService,
    private dialogMessageService: DialogMessageService,
    private errorService: ErrorService,
    public filterService: FilterService,
    private httpClient: HttpClient,
    private router: Router,
    private selectOptionService: SelectOptionsService,
    public translate: TranslateService) {
    super(authorizationService, [UserPermissionEnum.Clients_CanModify]);
  }

  ngOnInit() {
    this.cols = [
      <PngTableColumn>{
        field: 'Name',
        header: 'Client.Name',
        width: '20%',
        applyGlobalFiltering: true
      },
      <PngTableColumn>{
        field: 'FirstName',
        header: 'Client.FirstName',
        width: '20%',
        applyGlobalFiltering: true
      },
      <PngTableColumn>{
        field: 'LastName',
        header: 'Client.LastName',
        width: '20%',
        applyGlobalFiltering: true
      },
      <PngTableColumn>{
        field: 'TypeName',
        header: 'Client.TypeName',
        width: '20%',
        applyGlobalFiltering: true,
        replaceWith: 'TypeId'
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
    this.router.navigate([Routes.clients.navigations.creation]);
  }

  public onDelete(client: ClientListItemModel) {
    this.confirmationService.confirm(<Confirmation>{
      key: 'deleteClient',
      message: `${this.translate.instant('Client.DeletionConfirmation')} ${client.Name}?`,
      accept: () => {
        this.deleteClient(client);
      }
    });
  }

  public onEdit(client: ClientListItemModel) {
    this.router.navigate([Routes.clients.navigations.edition(client.Id)]);
  }

  private deleteClient(client: ClientListItemModel) {
    this.httpClient
      .delete<string>(ApiRoutes.client.delete(client.Id))
      .subscribe({
        next: result => {
          if (result === ApiResultEnum[ApiResultEnum.OK]) {
            this.dialogMessageService.addSuccess(this.translate.instant('Client.Deleted'));

            this._dataPopulator.clients
              .get(this.tempLazyLoadEvent)
              .subscribe(result => this._dataPopulator.clients.set(result));
          }
          else {
            this.dialogMessageService.addError(this.errorService.getDefaultErrorMessage());
          }

          console.log(this.consoleMessageService.getConsoleMessageWithResultForEntityAfterDeletion('Client', result));
        },
        error: () => {
          this.dialogMessageService.addError(this.errorService.getDefaultErrorMessage());
        }
      });
  }

  private getClients(event: LazyLoadEvent) {
    event.sortField ??= this.cols[0].field;

    return this.httpClient
      .get<ClientListModel>(ApiRoutes.client.getAll(event, this.cols));
  }

  private getClientTypeMultiSelectData() {
    return this.selectOptionService.getClientTypes();
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