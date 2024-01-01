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
import { ApiResultEnum } from "src/app/enums/api-result-enum";
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
  extends AccessControlComponent
  implements OnInit, OnDestroy {

  @Input('clientId') clientId: string;

  @ViewChild('dataTable') dataTable: Table;

  private readonly _dataPopulator = {
    clientRepresentatives: {
      get: (event: LazyLoadEvent) => this.getClientRepresentatives(event),
      set: (clientRepresentatives: ClientRepresentativeListModel) => this.setClientRepresentatives(clientRepresentatives)
    }
  };

  public override readonly deletionKey: string = 'deleteClientRepresentative';

  private clientRepresentativeCreationDialog: DynamicDialogRef | undefined;
  private tempLazyLoadEvent: LazyLoadEvent;

  clientRepresentatives: ClientRepresentativeListItemModel[];
  cols: PngTableColumn[];
  totalRecords: number;

  constructor(
    protected override authorizationService: AuthorizationService,
    private confirmationService: ConfirmationService,
    private consoleMessageService: ConsoleMessageService,
    private dialogMessageService: DialogMessageService,
    private dialogService: DialogService,
    private errorService: ErrorService,
    public filterService: FilterService,
    private httpClient: HttpClient,
    private router: Router,
    public translate: TranslateService
  ) {
    super(authorizationService, [UserPermissionEnum.ClientRepresentatives_CanModify]);
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

  handleErrors(withResult: string): string {
    return this.errorService.getDefaultErrorMessage();
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

  public onDelete(clientRepresentative: ClientRepresentativeListItemModel) {
    this.confirmationService.confirm(<Confirmation>{
      key: this.deletionKey,
      message: `${this.translate.instant('ClientRepresentative.DeletionConfirmation')} ${clientRepresentative.LastName} ${clientRepresentative.FirstName}?`,
      accept: () => {
        this.deleteClientRepresentative(clientRepresentative);
      }
    });
  }

  public onEdit(clientRepresentative: ClientRepresentativeListItemModel) {
    this.openClientRepresentativeDialog(clientRepresentative);
  }

  private deleteClientRepresentative(clientRepresentative: ClientRepresentativeListItemModel) {
    this.httpClient
      .delete<string>(ApiRoutes.clientRepresentative.delete(clientRepresentative.Id))
      .subscribe({
        next: result => {
          if (result === ApiResultEnum[ApiResultEnum.OK]) {
            this.dialogMessageService.addSuccess(this.translate.instant('ClientRepresentative.Deleted'));

            this._dataPopulator.clientRepresentatives
              .get(this.tempLazyLoadEvent)
              .subscribe(result => this._dataPopulator.clientRepresentatives.set(result));
          }
          else {
            this.dialogMessageService.addError(this.handleErrors(result));
          }

          console.log(this.consoleMessageService.getConsoleMessageWithResultForEntityAfterDeletion('ClientRepresentative', result));
        },
        error: e => {
          this.dialogMessageService.addError(this.errorService.getFirstTranslatedErrorMessage(e));
        }
      });
  }

  private getClientRepresentatives(event: LazyLoadEvent) {
    event.sortField ??= this.cols[0].field;

    return this.httpClient
      .get<ClientRepresentativeListModel>(ApiRoutes.clientRepresentative.getAll(event, this.cols, this.clientId));
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