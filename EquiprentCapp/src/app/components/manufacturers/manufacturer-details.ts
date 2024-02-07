import { Component, OnInit, ViewChild } from "@angular/core";
import { AccessControlFormComponent } from "../abstract/forms/access-control-form";
import { ManufacturerDetailsModel } from "src/app/interfaces/manufacturer";
import { Country, ManufacturerAddress, addressFormFields } from "src/app/interfaces/address";
import { AddressComponent } from "../addresses/address";
import { ManufacturerAddressComponent } from "../addresses/manufacturer-address";
import { TranslateService } from "@ngx-translate/core";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { FormBuilder, Validators } from "@angular/forms";
import { ErrorService } from "src/app/services/errors/error.service";
import { DialogMessageService } from "src/app/services/messages/dialog-message.service";
import { ConsoleMessageService } from "src/app/services/messages/console-message.service";
import { ConfirmationService } from "primeng/api";
import { AuthorizationService } from "src/app/services/authorization/authorization.service";
import { ApiRoutes } from "src/app/api-routes";
import { FormModeEnum } from "src/app/enums/form-mode-enum";
import { UserPermissionEnum } from "src/app/enums/user-permission-enum";
import { Routes } from "src/app/routes";

@Component({
  selector: "manufacturer-details",
  templateUrl: "./manufacturer-details.html"
})
export class ManufacturerDetailsComponent
  extends AccessControlFormComponent<ManufacturerDetailsModel>
  implements OnInit {

  public override beforeSubmitionCustomOperationsHandler = this.prepareManufacturerDetailsModel;

  protected override afterSubmitionCustomOperationsHandler = undefined;
  protected override deletedEntityInstanceIdentificationInitializer = this.getEntityInstanceName;
  protected override entityId: string;

  manufacturer: ManufacturerDetailsModel;

  readonly manufacturerAddressRequiredFields: string[] = [
    addressFormFields.City,
    addressFormFields.Country,
    addressFormFields.PostalCode,
    addressFormFields.StreetName,
    addressFormFields.StreetNumber
  ];

  public override get shouldActionsBeDisabled(): boolean {
    return super.shouldActionsBeDisabled ||
      (!this.manufacturer || this.manufacturer.IsDeleted) ||
      (this.addressForm?.form.invalid ?? false) ||
      (this.manufacturerAddressForm?.form.invalid ?? false);
  }

  @ViewChild('addressForm') addressForm: AddressComponent;
  @ViewChild('manufacturerAddressForm') manufacturerAddressForm: ManufacturerAddressComponent;

  constructor(
    protected override readonly activatedRoute: ActivatedRoute,
    protected override readonly authorizationService: AuthorizationService,
    protected override readonly confirmationService: ConfirmationService,
    protected override readonly consoleMessageService: ConsoleMessageService,
    protected override readonly dialogMessageService: DialogMessageService,
    protected override readonly errorService: ErrorService,
    protected override readonly formBuilder: FormBuilder,
    protected override readonly httpClient: HttpClient,
    protected override readonly router: Router,
    public override readonly translate: TranslateService
  ) {
    super(
      activatedRoute,
      authorizationService,
      confirmationService,
      consoleMessageService,
      'deleteManufacturer',
      ApiRoutes.manufacturer.delete,
      dialogMessageService,
      'Manufacturer',
      errorService,
      formBuilder,
      httpClient,
      FormModeEnum.Edition,
      router,
      ApiRoutes.manufacturer.put,
      translate,
      [UserPermissionEnum.Manufacturers_CanModify],
      Routes.manufacturers.navigations.list
    );

    this.createForm({
      IsOperational: false,
      Name: ['', Validators.required]
    });

    this.loadManufacturer();
  }

  ngOnInit() {
  }

  public onBack() {
    this.router.navigate([Routes.manufacturers.navigations.list]);
  }

  private getEntityInstanceName(): string {
    return this.manufacturer.Name;
  }

  private loadManufacturer() {
    if (!this.entityId)
      return;

    this.httpClient
      .get<ManufacturerDetailsModel>(ApiRoutes.manufacturer.getById(this.entityId))
      .subscribe(result => {
        this.manufacturer = result;
        this.updateForm({
          IsOperational: this.manufacturer.IsOperational,
          Name: this.manufacturer.Name,
        });
      });
  }

  private prepareManufacturerDetailsModel(): ManufacturerDetailsModel {
    const manufacturerAddress = <ManufacturerAddress>{
      ApartmentNumber: this.addressForm.form.value.ApartmentNumber,
      City: this.addressForm.form.value.City,
      Country: <Country>{
        Id: this.addressForm.form.value.CountryId
      },
      Email: this.addressForm.form.value.Email,
      Id: this.addressForm.form.value.Id,
      NationalId: this.manufacturerAddressForm.form.value.NationalId,
      PhoneNumber: this.addressForm.form.value.PhoneNumber,
      PostalCode: this.addressForm.form.value.PostalCode,
      StreetName: this.addressForm.form.value.StreetName,
      StreetNumber: this.addressForm.form.value.StreetNumber
    }
    const manufacturer = <ManufacturerDetailsModel>{
      Address: manufacturerAddress,
      Id: this.manufacturer.Id,
      IsOperational: this.form.value.IsOperational,
      Name: this.form.value.Name,
    };

    return manufacturer;
  }
}