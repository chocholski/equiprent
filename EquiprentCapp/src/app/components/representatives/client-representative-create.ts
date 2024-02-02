import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { AddressComponent } from "../addresses/address";
import { FormBuilder, Validators } from "@angular/forms";
import { Routes } from "src/app/routes";
import { Router } from "@angular/router";
import { Address, Country, addressFormFields } from "src/app/interfaces/address";
import { ClientRepresentativeDialogConfigData, ClientRepresentativeCreationModel } from "src/app/interfaces/client";
import { TranslateService } from "@ngx-translate/core";
import { HttpClient } from "@angular/common/http";
import { ApiRoutes } from "src/app/api-routes";
import { DialogMessageService } from "src/app/services/messages/dialog-message.service";
import { ErrorService } from "src/app/services/errors/error.service";
import { ConsoleMessageService } from "src/app/services/messages/console-message.service";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { OpenableAsDialogForm } from "../abstract/forms/openable-as-dialog-form";
import { FormModeEnum } from "src/app/enums/form-mode-enum";

@Component({
  selector: "client-representative-create",
  templateUrl: "./client-representative-create.html"
})
export class ClientRepresentativeCreationComponent
  extends OpenableAsDialogForm<ClientRepresentativeDialogConfigData, ClientRepresentativeCreationModel>
  implements OnInit {

  public override readonly beforeSubmitionCustomOperationsHandler = this.prepareClientRepresentativeCreationModel;

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
    protected override readonly consoleMessageService: ConsoleMessageService,
    protected override readonly dialogMessageService: DialogMessageService,
    protected override readonly errorService: ErrorService,
    protected override readonly formBuilder: FormBuilder,
    protected override readonly httpClient: HttpClient,
    public override readonly openedAsDialogConfig: DynamicDialogConfig,
    public override readonly openedAsDialogRef: DynamicDialogRef,
    protected override readonly router: Router,
    public override readonly translate: TranslateService
  ) {
    super(
      consoleMessageService,
      dialogMessageService,
      'ClientRepresentative',
      errorService,
      formBuilder,
      httpClient,
      FormModeEnum.Creation,
      openedAsDialogConfig,
      openedAsDialogRef,
      router,
      ApiRoutes.clientRepresentative.post,
      translate,
      Routes.clientRepresentatives.navigations.list);

    this.createForm({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  private getClientRepresentativeClientId() {
    return this._dialogConfigData ? this._dialogConfigData.ClientId : this.clientId;
  }

  private prepareClientRepresentativeCreationModel(): ClientRepresentativeCreationModel {
    const clientRepresentativeAddress = <Address>{
      ApartmentNumber: this.addressForm.form.value.ApartmentNumber,
      City: this.addressForm.form.value.City,
      Country: <Country>{
        Id: this.addressForm.form.value.CountryId
      },
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

    return clientRepresentative;
  }
}