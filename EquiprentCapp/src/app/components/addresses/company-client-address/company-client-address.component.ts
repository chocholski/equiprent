import { Component, Input, OnInit } from "@angular/core";
import { SimpleFormComponent } from "../../abstract/forms/simple-form";
import { FormBuilder, Validators } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import { ClientAddress } from "src/app/interfaces/address";
import { COMPANY_CLIENT_ADDRESS_CONTROL_NAMES } from "./company-client-address.constants";

@Component({
  selector: 'company-client-address',
  templateUrl: './company-client-address.component.html'
})
export class CompanyClientAddressComponent
  extends SimpleFormComponent
  implements OnInit {

  @Input('clientAddress') clientAddress?: ClientAddress;

  constructor(
    protected override readonly formBuilder: FormBuilder,
    public readonly translate: TranslateService
  ) {
    super(formBuilder);
    this.createForm({
      [COMPANY_CLIENT_ADDRESS_CONTROL_NAMES.NationalCompanyId]: ['', Validators.required]
    });
  }

  ngOnInit() {
    if (this.clientAddress) {
      this.updateForm({
        [COMPANY_CLIENT_ADDRESS_CONTROL_NAMES.NationalCompanyId]: this.clientAddress.NationalId
      });
    }
  }
}