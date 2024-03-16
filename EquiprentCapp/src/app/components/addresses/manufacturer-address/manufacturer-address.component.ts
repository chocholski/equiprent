import { Component, Input, OnInit } from "@angular/core";
import { SimpleFormComponent } from "../../abstract/forms/simple-form";
import { FormBuilder, Validators } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import { ManufacturerAddress } from "src/app/interfaces/address";
import { MANUFACTURER_ADDRESS_CONTROL_NAMES } from "./manufacturer-address.constants";

@Component({
  selector: 'manufacturer-address',
  templateUrl: './manufacturer-address.component.html'
})
export class ManufacturerAddressComponent
  extends SimpleFormComponent
  implements OnInit {

  @Input('manufacturerAddress') manufacturerAddress?: ManufacturerAddress;

  constructor(
    protected override readonly formBuilder: FormBuilder,
    public readonly translate: TranslateService
  ) {
    super(formBuilder);
    this.createForm({
      [MANUFACTURER_ADDRESS_CONTROL_NAMES.NationalId]: ['', Validators.required]
    });
  }

  ngOnInit() {
    if (this.manufacturerAddress) {
      this.updateForm({
        [MANUFACTURER_ADDRESS_CONTROL_NAMES.NationalId]: this.manufacturerAddress.NationalId
      });
    }
  }
}