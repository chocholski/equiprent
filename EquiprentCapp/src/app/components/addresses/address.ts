import { Component, Input, OnInit } from "@angular/core";
import { FormComponent } from "../abstract/formComponent";
import { FormBuilder, Validators } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import { SelectItem } from "primeng/api";
import { SelectOptionsService } from "src/app/services/select-options/select-options.service";
import { Address } from "src/app/interfaces/address";

@Component({
  selector: 'address',
  templateUrl: './address.html'
})
export class AddressComponent
  extends FormComponent
  implements OnInit {

  @Input('entityAddress') entityAddress?: Address;
  @Input('showTitle') showTitle?: boolean;

  countries: SelectItem[];

  constructor(
    protected override formBuilder: FormBuilder,
    private selectOptionsService: SelectOptionsService,
    public translate: TranslateService
  ) {
    super(formBuilder);
    this.createForm({
      ApartmentNumber: [''],
      City: ['', Validators.required],
      CountryId: null,
      Email: [''],
      Id: null,
      PhoneNumber: [''],
      PostalCode: ['', Validators.required],
      StreetName: ['', Validators.required],
      StreetNumber: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.populateDropdowns();

    if (this.entityAddress) {
      this.updateForm({
        ApartmentNumber: this.entityAddress.ApartmentNumber,
        City: this.entityAddress.City,
        CountryId: this.entityAddress.CountryId,
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