import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import { SelectItem } from "primeng/api";
import { SelectOptionsService } from "src/app/services/select-options/select-options.service";
import { Address } from "src/app/interfaces/address";
import { DynamicRequirementForm } from "../../abstract/forms/dynamic-requirement-form";
import { ADDRESS_CONTROL_NAMES } from "./address.constants";

@Component({
  selector: 'address',
  templateUrl: './address.component.html'
})
export class AddressComponent
  extends DynamicRequirementForm
  implements OnInit {

  @Input('entityAddress') entityAddress?: Address;
  @Input('showTitle') showTitle?: boolean;

  countries: SelectItem[];

  constructor(
    protected override readonly formBuilder: FormBuilder,
    private readonly selectOptionsService: SelectOptionsService,
    public readonly translate: TranslateService
  ) {
    super(formBuilder);
    this.createForm({
      [ADDRESS_CONTROL_NAMES.ApartmentNumber]: [''],
      [ADDRESS_CONTROL_NAMES.City]: [''],
      [ADDRESS_CONTROL_NAMES.Country]: [''],
      [ADDRESS_CONTROL_NAMES.Email]: [''],
      [ADDRESS_CONTROL_NAMES.Id]: null,
      [ADDRESS_CONTROL_NAMES.PhoneNumber]: [''],
      [ADDRESS_CONTROL_NAMES.PostalCode]: [''],
      [ADDRESS_CONTROL_NAMES.StreetName]: [''],
      [ADDRESS_CONTROL_NAMES.StreetNumber]: ['']
    });
  }

  ngOnInit() {
    this.populateDropdowns();
    this.updateFormAfterInit();

    if (this.entityAddress) {
      this.updateForm({
        [ADDRESS_CONTROL_NAMES.ApartmentNumber]: this.entityAddress.ApartmentNumber,
        [ADDRESS_CONTROL_NAMES.City]: this.entityAddress.City,
        [ADDRESS_CONTROL_NAMES.Country]: this.entityAddress.Country.Id,
        [ADDRESS_CONTROL_NAMES.Email]: this.entityAddress.Email,
        [ADDRESS_CONTROL_NAMES.Id]: this.entityAddress.Id,
        [ADDRESS_CONTROL_NAMES.PhoneNumber]: this.entityAddress.PhoneNumber,
        [ADDRESS_CONTROL_NAMES.PostalCode]: this.entityAddress.PostalCode,
        [ADDRESS_CONTROL_NAMES.StreetName]: this.entityAddress.StreetName,
        [ADDRESS_CONTROL_NAMES.StreetNumber]: this.entityAddress.StreetNumber
      });
    }
  }

  private populateDropdowns() {
    this.selectOptionsService
      .getCountries()
      .subscribe(options => {
        this.countries = options;
      });
  }
}