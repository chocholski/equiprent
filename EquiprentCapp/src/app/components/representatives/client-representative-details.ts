import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { ClientRepresentativeDetailsModel, ClientRepresentativeDialogConfigData } from "src/app/interfaces/client";
import { AddressComponent } from "../addresses/address";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { Address, addressFormFields } from "src/app/interfaces/address";
import { FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Routes } from "src/app/routes";
import { TranslateService } from "@ngx-translate/core";
import { AccessControlOpenableAsDialogForm } from "../abstract/forms/access-control-openable-as-dialog-form";
import { AuthorizationService } from "src/app/services/authorization/authorization.service";
import { UserPermissionEnum } from "src/app/enums/user-permission-enum";
import { HttpClient } from "@angular/common/http";
import { ApiRoutes } from "src/app/api-routes";
import { ConfirmationService } from "primeng/api";
import { DialogMessageService } from "src/app/services/messages/dialog-message.service";
import { ErrorService } from "src/app/services/errors/error.service";
import { ConsoleMessageService } from "src/app/services/messages/console-message.service";
import { FormModeEnum } from "src/app/enums/form-mode-enum";
import { StringBuilder } from "src/app/tools/stringBuilder";

@Component({
  selector: "client-representative-details",
  templateUrl: "./client-representative-details.html"
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
    addressFormFields.City,
    addressFormFields.Country,
    addressFormFields.Email,
    addressFormFields.PhoneNumber,
    addressFormFields.PostalCode,
    addressFormFields.StreetName,
    addressFormFields.StreetNumber
  ];

  clientRepresentative: ClientRepresentativeDetailsModel;

  public override get shouldActionsBeDisabled() {
    return super.shouldActionsBeDisabled ||
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
      ApiRoutes.clientRepresentative.delete,
      dialogMessageService,
      'ClientRepresentative',
      errorService,
      formBuilder,
      httpClient,
      FormModeEnum.Edition,
      openedAsDialogConfig,
      openedAsDialogRef,
      router,
      ApiRoutes.clientRepresentative.put,
      translate,
      [UserPermissionEnum.ClientRepresentatives_CanModify],
      Routes.clientRepresentatives.navigations.list
    );

    this.createForm({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required]
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
      .get<ClientRepresentativeDetailsModel>(ApiRoutes.clientRepresentative.getById(this.entityId))
      .subscribe(result => {
        this.clientRepresentative = result;

        this.updateForm({
          FirstName: this.clientRepresentative.FirstName,
          LastName: this.clientRepresentative.LastName
        });
      });
  }

  private prepareClientRepresentativeDetailsModel(): ClientRepresentativeDetailsModel {
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
      Id: this.entityId,
      LastName: this.form.value.LastName
    }

    return clientRepresentative;
  }
}