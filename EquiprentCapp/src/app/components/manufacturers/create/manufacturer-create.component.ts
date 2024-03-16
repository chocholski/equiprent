import { Component, OnInit, ViewChild } from "@angular/core";
import { Form } from "../../abstract/forms/form";
import { ManufacturerCreationModel } from "src/app/interfaces/manufacturer";
import { ManufacturerAddressComponent } from "../../addresses/manufacturer-address/manufacturer-address.component";
import { Country, ManufacturerAddress } from "src/app/interfaces/address";
import { AddressComponent } from "../../addresses/address/address.component";
import { TranslateService } from "@ngx-translate/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { FormBuilder, Validators } from "@angular/forms";
import { ErrorService } from "src/app/services/errors/error.service";
import { DialogMessageService } from "src/app/services/messages/dialog-message.service";
import { ConsoleMessageService } from "src/app/services/messages/console-message.service";
import { FormModeEnum } from "src/app/enums/form-mode.enum";
import { API_ROUTES } from "src/app/constants/api-routes.constants";
import { ROUTES } from "src/app/constants/routes.constants";
import { ADDRESS_CONTROL_NAMES } from "../../addresses/address/address.constants";
import { MANUFACTURER_ADDRESS_CONTROL_NAMES } from "../../addresses/manufacturer-address/manufacturer-address.constants";
import { MANUFACTURER_CREATE_CONTROL_NAMES } from "./manufacturer-create.constants";

@Component({
  selector: "manufacturer-create",
  templateUrl: "./manufacturer-create.component.html"
})
export class ManufacturerCreationComponent
  extends Form<ManufacturerCreationModel>
  implements OnInit {

  public override readonly beforeSubmitionCustomOperationsHandler = this.prepareManufacturerCreationModel;

  @ViewChild('addressForm') addressForm: AddressComponent;
  @ViewChild('manufacturerAddressForm') manufacturerAddressForm: ManufacturerAddressComponent;

  readonly manufacturerAddressRequiredFields: string[] = [
    ADDRESS_CONTROL_NAMES.City,
    ADDRESS_CONTROL_NAMES.Country,
    ADDRESS_CONTROL_NAMES.PostalCode,
    ADDRESS_CONTROL_NAMES.StreetName,
    ADDRESS_CONTROL_NAMES.StreetNumber
  ];

  public override get shouldActionsBeDisabled(): boolean {
    return super.shouldActionsBeDisabled ||
      (this.addressForm?.form.invalid ?? false) ||
      (this.manufacturerAddressForm?.form.invalid ?? false);
  }

  constructor(
    protected override readonly consoleMessageService: ConsoleMessageService,
    protected override readonly dialogMessageService: DialogMessageService,
    protected override readonly errorService: ErrorService,
    protected override readonly formBuilder: FormBuilder,
    protected override readonly httpClient: HttpClient,
    protected override readonly router: Router,
    public override readonly translate: TranslateService
  ) {
    super(
      consoleMessageService,
      dialogMessageService,
      'Manufacturer',
      errorService,
      formBuilder,
      httpClient,
      FormModeEnum.Creation,
      router,
      API_ROUTES.manufacturer.post,
      translate,
      ROUTES.manufacturers.navigations.list
    );

    this.createForm({
      [MANUFACTURER_CREATE_CONTROL_NAMES.IsOperational]: false,
      [MANUFACTURER_CREATE_CONTROL_NAMES.Name]: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  public onBack() {
    this.router.navigate([ROUTES.manufacturers.navigations.list]);
  }

  private prepareManufacturerCreationModel(): ManufacturerCreationModel {
    const manufacturerAddress = <ManufacturerAddress>{
      ApartmentNumber: this.addressForm.form.value[ADDRESS_CONTROL_NAMES.ApartmentNumber],
      City: this.addressForm.form.value[ADDRESS_CONTROL_NAMES.City],
      Country: <Country>{
        Id: this.addressForm.form.value[ADDRESS_CONTROL_NAMES.Country],
      },
      Email: this.addressForm.form.value[ADDRESS_CONTROL_NAMES.Email],
      NationalId: this.manufacturerAddressForm.form.value[MANUFACTURER_ADDRESS_CONTROL_NAMES.NationalId],
      PhoneNumber: this.addressForm.form.value[ADDRESS_CONTROL_NAMES.PhoneNumber],
      PostalCode: this.addressForm.form.value[ADDRESS_CONTROL_NAMES.PostalCode],
      StreetName: this.addressForm.form.value[ADDRESS_CONTROL_NAMES.StreetName],
      StreetNumber: this.addressForm.form.value[ADDRESS_CONTROL_NAMES.StreetNumber],
    };

    const manufacturer = <ManufacturerCreationModel>{
      Address: manufacturerAddress,
      IsOperational: this.form.value[MANUFACTURER_CREATE_CONTROL_NAMES.IsOperational],
      Name: this.form.value[MANUFACTURER_CREATE_CONTROL_NAMES.Name],
    };

    return manufacturer;
  }
}