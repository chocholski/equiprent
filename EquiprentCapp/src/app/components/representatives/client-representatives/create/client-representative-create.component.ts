import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { AddressComponent } from "../../../addresses/address/address.component";
import { FormBuilder, Validators } from "@angular/forms";
import { ROUTES } from "src/app/constants/routes.constants";
import { Router } from "@angular/router";
import { Address, Country } from "src/app/interfaces/address";
import { ClientRepresentativeDialogConfigData, ClientRepresentativeCreationModel } from "src/app/interfaces/client";
import { TranslateService } from "@ngx-translate/core";
import { HttpClient } from "@angular/common/http";
import { API_ROUTES } from "src/app/constants/api-routes.constants";
import { DialogMessageService } from "src/app/services/messages/dialog-message.service";
import { ErrorService } from "src/app/services/errors/error.service";
import { ConsoleMessageService } from "src/app/services/messages/console-message.service";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { OpenableAsDialogForm } from "../../../abstract/forms/openable-as-dialog-form";
import { FormModeEnum } from "src/app/enums/form-mode.enum";
import { ADDRESS_CONTROL_NAMES } from "src/app/components/addresses/address/address.constants";
import { CLIENT_REPRESENTATIVE_CREATE_CONTROL_NAMES } from "./client-representative-create.constants";

@Component({
  selector: "client-representative-create",
  templateUrl: "./client-representative-create.component.html"
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
    ADDRESS_CONTROL_NAMES.City,
    ADDRESS_CONTROL_NAMES.Country,
    ADDRESS_CONTROL_NAMES.Email,
    ADDRESS_CONTROL_NAMES.PhoneNumber,
    ADDRESS_CONTROL_NAMES.PostalCode,
    ADDRESS_CONTROL_NAMES.StreetName,
    ADDRESS_CONTROL_NAMES.StreetNumber
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
      API_ROUTES.clientRepresentative.post,
      translate,
      ROUTES.clientRepresentatives.navigations.list);

    this.createForm({
      [CLIENT_REPRESENTATIVE_CREATE_CONTROL_NAMES.FirstName]: ['', Validators.required],
      [CLIENT_REPRESENTATIVE_CREATE_CONTROL_NAMES.LastName]: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  private getClientRepresentativeClientId() {
    return this._dialogConfigData ? this._dialogConfigData.ClientId : this.clientId;
  }

  private prepareClientRepresentativeCreationModel(): ClientRepresentativeCreationModel {
    const clientRepresentativeAddress = <Address>{
      ApartmentNumber: this.addressForm.form.value[ADDRESS_CONTROL_NAMES.ApartmentNumber],
      City: this.addressForm.form.value[ADDRESS_CONTROL_NAMES.City],
      Country: <Country>{
        Id: this.addressForm.form.value[ADDRESS_CONTROL_NAMES.Country]
      },
      Email: this.addressForm.form.value[ADDRESS_CONTROL_NAMES.Email],
      PhoneNumber: this.addressForm.form.value[ADDRESS_CONTROL_NAMES.PhoneNumber],
      PostalCode: this.addressForm.form.value[ADDRESS_CONTROL_NAMES.PostalCode],
      StreetName: this.addressForm.form.value[ADDRESS_CONTROL_NAMES.StreetName],
      StreetNumber: this.addressForm.form.value[ADDRESS_CONTROL_NAMES.StreetNumber]
    };
    const clientRepresentative = <ClientRepresentativeCreationModel>{
      Address: clientRepresentativeAddress,
      ClientId: this.getClientRepresentativeClientId(),
      FirstName: this.form.value[CLIENT_REPRESENTATIVE_CREATE_CONTROL_NAMES.FirstName],
      LastName: this.form.value[CLIENT_REPRESENTATIVE_CREATE_CONTROL_NAMES.LastName],
    };

    return clientRepresentative;
  }
}