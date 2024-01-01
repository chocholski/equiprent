import { Component, Input, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { AccessControlComponent } from "../abstract/access-controls/access-control";
import { Confirmation, ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { PngTableColumn } from "src/app/interfaces/png";
import { Table } from "primeng/table";
import { AuthorizationService } from "src/app/services/authorization/authorization.service";
import { UserPermissionEnum } from "src/app/enums/user-permission-enum";
import { FilterTypeEnum } from "src/app/enums/filter-type-enum";
import { ClientRepresentativeDialogConfigData, ClientRepresentativeListItemModel, ClientRepresentativeListModel } from "src/app/interfaces/client";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { HttpClient } from "@angular/common/http";
import { ApiRoutes } from "src/app/api-routes";
import { DialogMessageService } from "src/app/services/messages/dialog-message.service";
import { ErrorService } from "src/app/services/errors/error.service";
import { ConsoleMessageService } from "src/app/services/messages/console-message.service";
import { FilterService } from "src/app/services/filters/filter.service";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { ClientRepresentativeCreationComponent } from "./client-representative-create";
import { ClientRepresentativeDetailsComponent } from "./client-representative-details";

@Component({
  selector: "client-representative-list",
  templateUrl: "./client-representative-list.html"
})
export class ClientRepresentativeListComponent
  extends AccessControlComponent<ClientRepresentativeListItemModel>
  implements OnInit, OnDestroy {

  protected override deletedEntityInstanceIdentificationInitializer = this.getEntityInstanceName;

  @Input('clientId') clientId: string;

  @ViewChild('dataTable') dataTable: Table;

  private readonly _dataPopulator = {
    clientRepresentatives: {
      get: (event: LazyLoadEvent) => this.getClientRepresentatives(event),
      set: (clientRepresentatives: ClientRepresentativeListModel) => this.setClientRepresentatives(clientRepresentatives)
    }
  };

  private clientRepresentativeCreationDialog: DynamicDialogRef | undefined;
  private tempLazyLoadEvent: LazyLoadEvent;

  clientRepresentatives: ClientRepresentativeListItemModel[];
  cols: PngTableColumn[];
  totalRecords: number;

  constructor(
    protected override readonly authorizationService: AuthorizationService,
    protected override readonly confirmationService: ConfirmationService,
    protected override readonly consoleMessageService: ConsoleMessageService,
    protected override readonly dialogMessageService: DialogMessageService,
    private readonly dialogService: DialogService,
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
      'deleteClientRepresentative',
      ApiRoutes.clientRepresentative.delete,
      dialogMessageService,
      'ClientRepresentative',
      errorService,
      httpClient,
      () => {
        this._dataPopulator.clientRepresentatives
          .get(this.tempLazyLoadEvent)
          .subscribe(result => this._dataPopulator.clientRepresentatives.set(result));
      },
      router,
      translate,
      [UserPermissionEnum.ClientRepresentatives_CanModify]);
  }

  ngOnInit() {
    this.cols = [
      <PngTableColumn>{
        field: 'LastName',
        header: 'ClientRepresentative.LastName',
        width: '30%',
        filterType: FilterTypeEnum.Text,
        applyGlobalFiltering: true
      },
      <PngTableColumn>{
        field: 'FirstName',
        header: 'ClientRepresentative.FirstName',
        width: '20%',
        filterType: FilterTypeEnum.Text,
        applyGlobalFiltering: true
      },
      <PngTableColumn>{
        field: 'Email',
        header: 'ClientRepresentative.Email',
        width: '30%',
        filterType: FilterTypeEnum.Text,
        applyGlobalFiltering: true
      },
      <PngTableColumn>{
        field: 'PhoneNumber',
        header: 'ClientRepresentative.PhoneNumber',
        width: '20%',
        filterType: FilterTypeEnum.Text,
        applyGlobalFiltering: true
      },
      <PngTableColumn>{
        field: 'Actions',
        header: '',
        width: '20%'
      }
    ];
  }

  ngOnDestroy() {
    if (this.clientRepresentativeCreationDialog) {
      this.clientRepresentativeCreationDialog.close();
    }
  }

  public loadClientRepresentativesLazy(event: LazyLoadEvent) {
    this.tempLazyLoadEvent = event;

    this._dataPopulator.clientRepresentatives
      .get(event)
      .subscribe(result => this._dataPopulator.clientRepresentatives.set(result));
  }

  public onCreate() {
    if (!this.clientId)
      return;

    this.openClientRepresentativeDialog();
  }

  public onEdit(clientRepresentative: ClientRepresentativeListItemModel) {
    this.openClientRepresentativeDialog(clientRepresentative);
  }

  private getClientRepresentatives(event: LazyLoadEvent) {
    event.sortField ??= this.cols[0].field;

    return this.httpClient
      .get<ClientRepresentativeListModel>(ApiRoutes.clientRepresentative.getAll(event, this.cols, this.clientId));
  }

  private getEntityInstanceName(clientRepresentative: ClientRepresentativeListItemModel): string {
    return `${clientRepresentative.LastName} ${clientRepresentative.FirstName}`;
  }

  private openClientRepresentativeDialog(clientRepresentative?: ClientRepresentativeListItemModel) {

    const clientRepresentativeDialogConfigData = <ClientRepresentativeDialogConfigData>{
      ClientId: this.clientId,
      Id: clientRepresentative ? clientRepresentative.Id : undefined
    };

    this.clientRepresentativeCreationDialog = this.dialogService.open(
      clientRepresentative ? ClientRepresentativeDetailsComponent : ClientRepresentativeCreationComponent,
      clientRepresentative
        ? {
          ...ClientRepresentativeDetailsComponent.OPEN_AS_DIALOG_SETTINGS,
          data: clientRepresentativeDialogConfigData
        }
        : {
          ...ClientRepresentativeCreationComponent.OPEN_AS_DIALOG_SETTINGS,
          data: clientRepresentativeDialogConfigData
        });

    this.clientRepresentativeCreationDialog.onClose.subscribe(() => {
      this._dataPopulator.clientRepresentatives
        .get(this.tempLazyLoadEvent)
        .subscribe(result => this._dataPopulator.clientRepresentatives.set(result));
    });
  }

  private setClientRepresentatives(clientRepresentatives: ClientRepresentativeListModel) {
    this.totalRecords = clientRepresentatives.TotalRowsCount;
    this.clientRepresentatives = clientRepresentatives.List;
  }
}