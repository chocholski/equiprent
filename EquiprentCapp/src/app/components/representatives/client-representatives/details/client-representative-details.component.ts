import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { ClientRepresentativeDetailsModel, ClientRepresentativeDialogConfigData } from "src/app/interfaces/client";
import { AddressComponent } from "../../../addresses/address/address.component";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { Address, Country } from "src/app/interfaces/address";
import { FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ROUTES } from "src/app/constants/routes.constants";
import { TranslateService } from "@ngx-translate/core";
import { AccessControlOpenableAsDialogForm } from "../../../abstract/forms/access-control-openable-as-dialog-form";
import { AuthorizationService } from "src/app/services/authorization/authorization.service";
import { UserPermissionEnum } from "src/app/enums/user-permission.enum";
import { HttpClient } from "@angular/common/http";
import { API_ROUTES } from "src/app/constants/api-routes.constants";
import { ConfirmationService } from "primeng/api";
import { DialogMessageService } from "src/app/services/messages/dialog-message.service";
import { ErrorService } from "src/app/services/errors/error.service";
import { ConsoleMessageService } from "src/app/services/messages/console-message.service";
import { FormModeEnum } from "src/app/enums/form-mode.enum";
import { StringBuilder } from "src/app/tools/stringBuilder";
import { ADDRESS_CONTROL_NAMES } from "src/app/components/addresses/address/address.constants";
import { CLIENT_REPRESENTATIVE_DETAILS_CONTROL_NAMES } from "./client-representative-details.constants";

@Component({
  selector: "client-representative-details",
  templateUrl: "./client-representative-details.component.html"
})
export class ClientRepresentativeDetailsComponent
  extends AccessControlOpenableAsDialogForm<ClientRepresentativeDialogConfigData, ClientRepresentativeDetailsModel>
  implements OnInit {

  public static readonly OPEN_AS_DIALOG_SETTINGS = <DynamicDialogConfig>{
    header: 'ClientRepresentative.Details',
    height: 'auto',
    modal: true,
    style: { margin: 0, padding: 0 },
    width: '50vw'
  };

  public override readonly beforeSubmitionCustomOperationsHandler = this.prepareClientRepresentativeDetailsModel;

  protected override readonly afterSubmitionCustomOperationsHandler = undefined;
  protected override readonly deletedEntityInstanceIdentificationInitializer = this.getEntityInstanceName;
  protected override readonly entityId: string;

  @Input('clientId') clientId?: string;

  @ViewChild('addressForm') addressForm: AddressComponent;

  readonly clientRepresentativeAddressRequiredFields: string[] = [
    ADDRESS_CONTROL_NAMES.City,
    ADDRESS_CONTROL_NAMES.Country,
    ADDRESS_CONTROL_NAMES.Email,
    ADDRESS_CONTROL_NAMES.PhoneNumber,
    ADDRESS_CONTROL_NAMES.PostalCode,
    ADDRESS_CONTROL_NAMES.StreetName,
    ADDRESS_CONTROL_NAMES.StreetNumber
  ];

  clientRepresentative: ClientRepresentativeDetailsModel;

  public override get shouldActionsBeDisabled() {
    return super.shouldActionsBeDisabled ||
      !this.clientRepresentative ||
      (this.addressForm?.form.invalid ?? false);
  }

  constructor(
    protected override readonly activatedRoute: ActivatedRoute,
    protected override readonly authorizationService: AuthorizationService,
    protected override readonly confirmationService: ConfirmationService,
    protected override readonly consoleMessageService: ConsoleMessageService,
    protected override readonly dialogMessageService: DialogMessageService,
    protected override readonly errorService: ErrorService,
    protected override readonly formBuilder: FormBuilder,
    protected override readonly httpClient: HttpClient,
    public override readonly openedAsDialogConfig: DynamicDialogConfig,
    public override readonly openedAsDialogRef: DynamicDialogRef,
    protected override readonly router: Router,
    public override readonly translate: TranslateService) {

    super(
      activatedRoute,
      authorizationService,
      confirmationService,
      consoleMessageService,
      'deleteClientRepresentative',
      API_ROUTES.clientRepresentative.delete,
      dialogMessageService,
      'ClientRepresentative',
      errorService,
      formBuilder,
      httpClient,
      FormModeEnum.Edition,
      openedAsDialogConfig,
      openedAsDialogRef,
      router,
      API_ROUTES.clientRepresentative.put,
      translate,
      [UserPermissionEnum.ClientRepresentatives_CanModify],
      ROUTES.clientRepresentatives.navigations.list
    );

    this.createForm({
      [CLIENT_REPRESENTATIVE_DETAILS_CONTROL_NAMES.FirstName]: ['', Validators.required],
      [CLIENT_REPRESENTATIVE_DETAILS_CONTROL_NAMES.LastName]: ['', Validators.required]
    });

    this.loadClientRepresentative();
  }

  ngOnInit() {
  }

  private getEntityInstanceName(): string {
    return new StringBuilder(this.clientRepresentative.LastName)
      .append(' ')
      .append(this.clientRepresentative.FirstName)
      .toString();
  }

  private loadClientRepresentative() {
    if (!this.entityId)
      return;

    this.httpClient
      .get<ClientRepresentativeDetailsModel>(API_ROUTES.clientRepresentative.getById(this.entityId))
      .subscribe(result => {
        this.clientRepresentative = result;
        this.updateForm({
          [CLIENT_REPRESENTATIVE_DETAILS_CONTROL_NAMES.FirstName]: this.clientRepresentative.FirstName,
          [CLIENT_REPRESENTATIVE_DETAILS_CONTROL_NAMES.LastName]: this.clientRepresentative.LastName
        });
      });
  }

  private prepareClientRepresentativeDetailsModel(): ClientRepresentativeDetailsModel {
    const clientRepresentativeAddress = <Address>{
      ApartmentNumber: this.addressForm.form.value[ADDRESS_CONTROL_NAMES.ApartmentNumber],
      City: this.addressForm.form.value[ADDRESS_CONTROL_NAMES.City],
      Country: <Country>{
        Id: this.addressForm.form.value[ADDRESS_CONTROL_NAMES.Country]
      },
      Email: this.addressForm.form.value[ADDRESS_CONTROL_NAMES.Email],
      Id: this.addressForm.form.value[ADDRESS_CONTROL_NAMES.Id],
      PhoneNumber: this.addressForm.form.value[ADDRESS_CONTROL_NAMES.PhoneNumber],
      PostalCode: this.addressForm.form.value[ADDRESS_CONTROL_NAMES.PostalCode],
      StreetName: this.addressForm.form.value[ADDRESS_CONTROL_NAMES.StreetName],
      StreetNumber: this.addressForm.form.value[ADDRESS_CONTROL_NAMES.StreetNumber],
    };
    const clientRepresentative = <ClientRepresentativeDetailsModel>{
      Address: clientRepresentativeAddress,
      ClientId: this.clientRepresentative.ClientId,
      FirstName: this.form.value[CLIENT_REPRESENTATIVE_DETAILS_CONTROL_NAMES.FirstName],
      Id: this.entityId,
      LastName: this.form.value[CLIENT_REPRESENTATIVE_DETAILS_CONTROL_NAMES.LastName]
    }

    return clientRepresentative;
  }
}