import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { ClientRepresentativeDetailsModel, ClientRepresentativeDialogConfigData } from "src/app/interfaces/client";
import { AddressComponent } from "../addresses/address";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { Address, addressFormFields } from "src/app/interfaces/address";
import { FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Routes } from "src/app/routes";
import { TranslateService } from "@ngx-translate/core";
import { AccessControlOpenableAsDialogForm } from "../abstract/access-control-openable-as-dialog-form";
import { AuthorizationService } from "src/app/services/authorization/authorization.service";
import { UserPermissionEnum } from "src/app/enums/user-permission-enum";
import { HttpClient } from "@angular/common/http";
import { ApiRoutes } from "src/app/api-routes";
import { Confirmation, ConfirmationService } from "primeng/api";
import { ApiResultEnum } from "src/app/enums/api-result-enum";
import { DialogMessageService } from "src/app/services/messages/dialog-message.service";
import { ErrorService } from "src/app/services/errors/error.service";
import { ConsoleMessageService } from "src/app/services/messages/console-message.service";

@Component({
  selector: "client-representative-details",
  templateUrl: "./client-representative-details.html"
})
export class ClientRepresentativeDetailsComponent
  extends AccessControlOpenableAsDialogForm<ClientRepresentativeDialogConfigData>
  implements OnInit {

  @Input('clientId') clientId?: string;

  @ViewChild('addressForm') addressForm: AddressComponent;

  public static OPEN_AS_DIALOG_SETTINGS = <DynamicDialogConfig>{
    header: 'ClientRepresentative.Details',
    height: 'auto',
    modal: true,
    style: { margin: 0, padding: 0 },
    width: '50vw'
  };

  readonly clientRepresentativeAddressRequiredFields: string[] = [
    addressFormFields.City,
    addressFormFields.Country,
    addressFormFields.Email,
    addressFormFields.PhoneNumber,
    addressFormFields.PostalCode,
    addressFormFields.StreetName,
    addressFormFields.StreetNumber
  ];

  public override get shouldActionsBeDisabled() {
    return super.shouldActionsBeDisabled ||
      (this.addressForm?.form.invalid ?? false);
  }

  public override deletionKey: string = 'deleteClientRepresentative';

  private clientRepresentativeId: string;

  clientRepresentative: ClientRepresentativeDetailsModel;

  constructor(
    private activatedRoute: ActivatedRoute,
    protected override authorizationService: AuthorizationService,
    private confirmationService: ConfirmationService,
    private consoleMessageService: ConsoleMessageService,
    private dialogMessageService: DialogMessageService,
    private errorService: ErrorService,
    protected override formBuilder: FormBuilder,
    private httpClient: HttpClient,
    public override openedAsDialogConfig: DynamicDialogConfig,
    public override openedAsDialogRef: DynamicDialogRef,
    protected override router: Router,
    public translate: TranslateService
  ) {
    super(
      authorizationService,
      openedAsDialogConfig,
      openedAsDialogRef,
      formBuilder,
      router,
      [UserPermissionEnum.ClientRepresentatives_CanModify]
    );

    this.clientRepresentativeId = this.getClientRepresentativeId();
    this.isDisabled = true;

    this.createForm({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required]
    });

    this.loadClientRepresentative();
  }

  ngOnInit() {
  }

  public onBack() {
    this.onBackNavigateUsingLink(Routes.clientRepresentatives.navigations.list);
  }

  public onDelete() {
    this.confirmationService.confirm(<Confirmation>{
      key: this.deletionKey,
      message: `${this.translate.instant('ClientRepresentative.DeletionConfirmation')} '${this.clientRepresentative.LastName} ${this.clientRepresentative.FirstName}'?`,
      accept: () => {
        this.isExecuting = true;
        this.deleteClientRepresentative();
      }
    });
  }

  public onSubmit() {
    this.isExecuting = true;

    const clientRepresentativeAddress = <Address>{
      ApartmentNumber: this.addressForm.form.value.ApartmentNumber,
      City: this.addressForm.form.value.City,
      CountryId: this.addressForm.form.value.CountryId,
      Email: this.addressForm.form.value.Email,
      Id: this.addressForm.form.value.Id,
      PhoneNumber: this.addressForm.form.value.PhoneNumber,
      PostalCode: this.addressForm.form.value.PostalCode,
      StreetName: this.addressForm.form.value.StreetName,
      StreetNumber: this.addressForm.form.value.StreetNumber
    };
    const clientRepresentative = <ClientRepresentativeDetailsModel>{
      Address: clientRepresentativeAddress,
      ClientId: this.clientRepresentative.ClientId,
      FirstName: this.form.value.FirstName,
      Id: this.clientRepresentativeId,
      LastName: this.form.value.LastName
    }

    this.putClientRepresentative(clientRepresentative);
  }

  private deleteClientRepresentative() {
    this.httpClient
      .delete<string>(ApiRoutes.clientRepresentative.delete(this.clientRepresentative.Id))
      .subscribe({
        next: result => {
          if (result === ApiResultEnum[ApiResultEnum.OK]) {
            this.dialogMessageService.addSuccess(this.translate.instant('ClientRepresentative.Deleted'));
            super.onAfterDeletionSuccessNavigateUsingLink(Routes.clientRepresentatives.navigations.list);
          }
          else {
            this.dialogMessageService.addError(this.errorService.getDefaultErrorMessage());
          }

          console.log(this.consoleMessageService.getConsoleMessageWithResultForEntityAfterDeletion('ClientRepresentative', result));
        },
        error: e => {
          this.dialogMessageService.addError(this.errorService.getFirstTranslatedErrorMessage(e));
        },
        complete: () => {
          this.isExecuting = false;
        }
      })
  }

  private getClientRepresentativeId() {
    if (this.openedAsDialogRef) {
      return this._dialogConfigData?.Id;
    }
    else {
      return this.activatedRoute.snapshot.params["id"];
    }
  }

  private loadClientRepresentative() {
    if (!this.clientRepresentativeId)
      return;

    this.httpClient
      .get<ClientRepresentativeDetailsModel>(ApiRoutes.clientRepresentative.getById(this.clientRepresentativeId))
      .subscribe(result => {
        this.clientRepresentative = result;

        this.updateForm({
          FirstName: this.clientRepresentative.FirstName,
          LastName: this.clientRepresentative.LastName
        });
      });
  }

  private putClientRepresentative(clientRepresentative: ClientRepresentativeDetailsModel) {
    this.httpClient
      .put<string>(ApiRoutes.clientRepresentative.put, clientRepresentative)
      .subscribe({
        next: result => {
          if (result === ApiResultEnum[ApiResultEnum.OK]) {
            this.onAfterSubmitSuccessNavigateUsingLink(Routes.clientRepresentatives.navigations.list);
            this.dialogMessageService.addSuccess(this.translate.instant('ClientRepresentative.Updated'));
          }
        },
        error: e => {
          this.dialogMessageService.addError(this.errorService.getFirstTranslatedErrorMessage(e));
        },
        complete: () => {
          this.isExecuting = false;
        }
      })
  }
}