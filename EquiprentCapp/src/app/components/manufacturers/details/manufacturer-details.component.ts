import { Component, OnInit, ViewChild } from "@angular/core";
import { AccessControlForm } from "../../abstract/forms/access-control-form";
import { ManufacturerDetailsModel } from "src/app/interfaces/manufacturer";
import { Country, ManufacturerAddress } from "src/app/interfaces/address";
import { AddressComponent } from "../../addresses/address/address.component";
import { ManufacturerAddressComponent } from "../../addresses/manufacturer-address/manufacturer-address.component";
import { TranslateService } from "@ngx-translate/core";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { FormBuilder, Validators } from "@angular/forms";
import { ErrorService } from "src/app/services/errors/error.service";
import { DialogMessageService } from "src/app/services/messages/dialog-message.service";
import { ConsoleMessageService } from "src/app/services/messages/console-message.service";
import { ConfirmationService } from "primeng/api";
import { AuthorizationService } from "src/app/services/authorization/authorization.service";
import { API_ROUTES } from "src/app/constants/api-routes.constants";
import { FormModeEnum } from "src/app/enums/form-mode.enum";
import { UserPermissionEnum } from "src/app/enums/user-permission.enum";
import { ROUTES } from "src/app/constants/routes.constants";
import { ADDRESS_CONTROL_NAMES } from "../../addresses/address/address.constants";
import { MANUFACTURER_DETAILS_CONTROL_NAMES } from "./manufacturer-details.constants";
import { MANUFACTURER_ADDRESS_CONTROL_NAMES } from "../../addresses/manufacturer-address/manufacturer-address.constants";

@Component({
  selector: "manufacturer-details",
  templateUrl: "./manufacturer-details.component.html"
})
export class ManufacturerDetailsComponent
  extends AccessControlForm<ManufacturerDetailsModel>
  implements OnInit {

  public override beforeSubmitionCustomOperationsHandler = this.prepareManufacturerDetailsModel;

  protected override afterSubmitionCustomOperationsHandler = undefined;
  protected override deletedEntityInstanceIdentificationInitializer = this.getEntityInstanceName;
  protected override entityId: string;

  manufacturer: ManufacturerDetailsModel;

  readonly manufacturerAddressRequiredFields: string[] = [
    ADDRESS_CONTROL_NAMES.City,
    ADDRESS_CONTROL_NAMES.Country,
    ADDRESS_CONTROL_NAMES.PostalCode,
    ADDRESS_CONTROL_NAMES.StreetName,
    ADDRESS_CONTROL_NAMES.StreetNumber
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
      API_ROUTES.manufacturer.delete,
      dialogMessageService,
      'Manufacturer',
      errorService,
      formBuilder,
      httpClient,
      FormModeEnum.Edition,
      router,
      API_ROUTES.manufacturer.put,
      translate,
      [UserPermissionEnum.Manufacturers_CanModify],
      ROUTES.manufacturers.navigations.list
    );

    this.createForm({
      [MANUFACTURER_DETAILS_CONTROL_NAMES.IsOperational]: false,
      [MANUFACTURER_DETAILS_CONTROL_NAMES.Name]: ['', Validators.required]
    });

    this.loadManufacturer();
  }

  ngOnInit() {
  }

  public onBack() {
    this.router.navigate([ROUTES.manufacturers.navigations.list]);
  }

  private getEntityInstanceName(): string {
    return this.manufacturer.Name;
  }

  private loadManufacturer() {
    if (!this.entityId)
      return;

    this.httpClient
      .get<ManufacturerDetailsModel>(API_ROUTES.manufacturer.getById(this.entityId))
      .subscribe(result => {
        this.manufacturer = result;
        this.updateForm({
          IsOperational: this.manufacturer.IsOperational,
          Name: this.manufacturer.Name,
        });

        if (result.IsDeleted) {
          this.form.get(MANUFACTURER_DETAILS_CONTROL_NAMES.IsOperational)?.disable();
        }
      });
  }

  private prepareManufacturerDetailsModel(): ManufacturerDetailsModel {
    const manufacturerAddress = <ManufacturerAddress>{
      ApartmentNumber: this.addressForm.form.value[ADDRESS_CONTROL_NAMES.ApartmentNumber],
      City: this.addressForm.form.value[ADDRESS_CONTROL_NAMES.City],
      Country: <Country>{
        Id: this.addressForm.form.value[ADDRESS_CONTROL_NAMES.Country]
      },
      Email: this.addressForm.form.value[ADDRESS_CONTROL_NAMES.Email],
      Id: this.addressForm.form.value[ADDRESS_CONTROL_NAMES.Id],
      NationalId: this.manufacturerAddressForm.form.value[MANUFACTURER_ADDRESS_CONTROL_NAMES.NationalId],
      PhoneNumber: this.addressForm.form.value[ADDRESS_CONTROL_NAMES.PhoneNumber],
      PostalCode: this.addressForm.form.value[ADDRESS_CONTROL_NAMES.PostalCode],
      StreetName: this.addressForm.form.value[ADDRESS_CONTROL_NAMES.StreetName],
      StreetNumber: this.addressForm.form.value[ADDRESS_CONTROL_NAMES.StreetNumber],
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