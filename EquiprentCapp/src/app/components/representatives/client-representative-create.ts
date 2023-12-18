import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { AddressComponent } from "../addresses/address";
import { FormBuilder, Validators } from "@angular/forms";
import { Routes } from "src/app/routes";
import { Router } from "@angular/router";
import { Address, addressFormFields } from "src/app/interfaces/address";
import { ClientRepresentativeDialogConfigData, ClientRepresentativeCreationModel } from "src/app/interfaces/client";
import { TranslateService } from "@ngx-translate/core";
import { HttpClient } from "@angular/common/http";
import { ApiRoutes } from "src/app/api-routes";
import { ApiResultEnum } from "src/app/enums/api-result-enum";
import { DialogMessageService } from "src/app/services/messages/dialog-message.service";
import { ErrorService } from "src/app/services/errors/error.service";
import { ConsoleMessageService } from "src/app/services/messages/console-message.service";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { OpenableAsDialogForm } from "../abstract/openable-as-dialog-form";

@Component({
  selector: "client-representative-create",
  templateUrl: "./client-representative-create.html"
})
export class ClientRepresentativeCreationComponent
  extends OpenableAsDialogForm<ClientRepresentativeDialogConfigData>
  implements OnInit {

  @Input('clientId') clientId?: string;

  @ViewChild('addressForm') addressForm: AddressComponent;

  public static OPEN_AS_DIALOG_SETTINGS = <DynamicDialogConfig>{
    header: 'ClientRepresentative.Create',
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

  constructor(
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
    super(openedAsDialogConfig, openedAsDialogRef, formBuilder, router);
    this.createForm({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  public onBack() {
    this.onBackNavigateUsingLink(Routes.clientRepresentatives.navigations.list);
  }

  public onSubmit() {
    this.isExecuting = true;

    const clientRepresentativeAddress = <Address>{
      ApartmentNumber: this.addressForm.form.value.ApartmentNumber,
      City: this.addressForm.form.value.City,
      CountryId: this.addressForm.form.value.CountryId,
      Email: this.addressForm.form.value.Email,
      PhoneNumber: this.addressForm.form.value.PhoneNumber,
      PostalCode: this.addressForm.form.value.PostalCode,
      StreetName: this.addressForm.form.value.StreetName,
      StreetNumber: this.addressForm.form.value.StreetNumber
    };
    const clientRepresentative = <ClientRepresentativeCreationModel>{
      Address: clientRepresentativeAddress,
      ClientId: this.getClientRepresentativeClientId(),
      FirstName: this.form.value.FirstName,
      LastName: this.form.value.LastName
    };

    this.postClientRepresentative(clientRepresentative);
  }

  private getClientRepresentativeClientId() {
    return this._dialogConfigData ? this._dialogConfigData.ClientId : this.clientId;
  }

  private postClientRepresentative(clientRepresentative: ClientRepresentativeCreationModel) {
    this.httpClient
      .post<string>(ApiRoutes.clientRepresentative.post, clientRepresentative)
      .subscribe({
        next: result => {
          switch (result) {
            case ApiResultEnum[ApiResultEnum.OK]:
              this.onAfterSubmitSuccessNavigateUsingLink(Routes.clientRepresentatives.navigations.list);
              this.dialogMessageService.addSuccess(this.translate.instant('ClientRepresentative.Created'));
              break;

            case ApiResultEnum[ApiResultEnum.RepresentativeExists]:
              this.dialogMessageService.addError(this.translate.instant('ClientRepresentative.Messages.RepresentativeExists'));
              break;

            default:
              this.dialogMessageService.addError(this.errorService.getDefaultErrorMessage());
          }

          console.log(this.consoleMessageService.getConsoleMessageWithResultForEntityAfterCreation('ClientRepresentative', result));
        },
        error: e => {
          this.dialogMessageService.addError(this.errorService.getFirstTranslatedErrorMessage(e));
        },
        complete: () => {
          this.isExecuting = false;
        }
      });
  }
}