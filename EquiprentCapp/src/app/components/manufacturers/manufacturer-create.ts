import { Component, OnInit, ViewChild } from "@angular/core";
import { FormComponent } from "../abstract/forms/form";
import { ManufacturerCreationModel } from "src/app/interfaces/manufacturer";
import { ManufacturerAddressComponent } from "../addresses/manufacturer-address";
import { Country, ManufacturerAddress, addressFormFields } from "src/app/interfaces/address";
import { AddressComponent } from "../addresses/address";
import { TranslateService } from "@ngx-translate/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { FormBuilder, Validators } from "@angular/forms";
import { ErrorService } from "src/app/services/errors/error.service";
import { DialogMessageService } from "src/app/services/messages/dialog-message.service";
import { ConsoleMessageService } from "src/app/services/messages/console-message.service";
import { FormModeEnum } from "src/app/enums/form-mode-enum";
import { ApiRoutes } from "src/app/api-routes";
import { Routes } from "src/app/routes";

@Component({
  selector: "manufacturer-create",
  templateUrl: "./manufacturer-create.html"
})
export class ManufacturerCreationComponent
  extends FormComponent<ManufacturerCreationModel>
  implements OnInit {

  public override readonly beforeSubmitionCustomOperationsHandler = this.prepareManufacturerCreationModel;

  @ViewChild('addressForm') addressForm: AddressComponent;
  @ViewChild('manufacturerAddressForm') manufacturerAddressForm: ManufacturerAddressComponent;

  readonly manufacturerAddressRequiredFields: string[] = [
    addressFormFields.City,
    addressFormFields.Country,
    addressFormFields.PostalCode,
    addressFormFields.StreetName,
    addressFormFields.StreetNumber
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
      ApiRoutes.manufacturer.post,
      translate,
      Routes.manufacturers.navigations.list
    );

    this.createForm({
      IsOperational: false,
      Name: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  public onBack() {
    this.router.navigate([Routes.manufacturers.navigations.list]);
  }

  private prepareManufacturerCreationModel(): ManufacturerCreationModel {
    const manufacturerAddress = <ManufacturerAddress>{
      ApartmentNumber: this.addressForm.form.value.ApartmentNumber,
      City: this.addressForm.form.value.City,
      Country: <Country>{
        Id: this.addressForm.form.value.CountryId,
      },
      Email: this.addressForm.form.value.Email,
      NationalId: this.manufacturerAddressForm.form.value.NationalId,
      PhoneNumber: this.addressForm.form.value.PhoneNumber,
      PostalCode: this.addressForm.form.value.PostalCode,
      StreetName: this.addressForm.form.value.StreetName,
      StreetNumber: this.addressForm.form.value.StreetNumber,
    };
    const manufacturer = <ManufacturerCreationModel>{
      Address: manufacturerAddress,
      IsOperational: this.form.value.IsOperational,
      Name: this.form.value.Name,
    };

    return manufacturer;
  }
}