import { Component, Input, OnInit } from "@angular/core";
import { FormComponent } from "../abstract/form";
import { FormBuilder, Validators } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import { ClientAddress } from "src/app/interfaces/address";

@Component({
  selector: 'company-client-address',
  templateUrl: './company-client-address.html'
})
export class CompanyClientAddressComponent
  extends FormComponent
  implements OnInit {

  @Input('clientAddress') clientAddress?: ClientAddress;

  constructor(
    protected override formBuilder: FormBuilder,
    public translate: TranslateService
  ) {
    super(formBuilder);
    this.createForm({
      NationalCompanyId: ['', Validators.required]
    });
  }

  ngOnInit() {
    if (this.clientAddress) {
      this.updateForm({
        NationalCompanyId: this.clientAddress.NationalId
      });
    }
  }
}