import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import { SelectItem } from "primeng/api";
import { SelectOptionsService } from "src/app/services/select-options/select-options.service";
import { Address } from "src/app/interfaces/address";
import { DynamicRequirementFormComponent } from "../abstract/forms/dynamic-requirement-form";

@Component({
  selector: 'address',
  templateUrl: './address.html'
})
export class AddressComponent
  extends DynamicRequirementFormComponent
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
      ApartmentNumber: [''],
      City: [''],
      CountryId: [''],
      Email: [''],
      Id: null,
      PhoneNumber: [''],
      PostalCode: [''],
      StreetName: [''],
      StreetNumber: ['']
    });
  }

  ngOnInit() {
    this.populateDropdowns();
    this.updateFormAfterInit();

    if (this.entityAddress) {
      this.updateForm({
        ApartmentNumber: this.entityAddress.ApartmentNumber,
        City: this.entityAddress.City,
        CountryId: this.entityAddress.Country.Id,
        Email: this.entityAddress.Email,
        Id: this.entityAddress.Id,
        PhoneNumber: this.entityAddress.PhoneNumber,
        PostalCode: this.entityAddress.PostalCode,
        StreetName: this.entityAddress.StreetName,
        StreetNumber: this.entityAddress.StreetNumber
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