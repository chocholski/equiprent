import { Component, Input, OnInit } from "@angular/core";
import { FormComponent } from "../abstract/form";
import { TranslateService } from "@ngx-translate/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ClientAddress } from "src/app/interfaces/address";

@Component({
  selector: 'private-client-address',
  templateUrl: './private-client-address.html'
})
export class PrivateClientAddressComponent
  extends FormComponent
  implements OnInit {

  @Input('clientAddress') clientAddress?: ClientAddress;

  constructor(
    protected override formBuilder: FormBuilder,
    public translate: TranslateService
  ) {
    super(formBuilder);
    this.createForm({
      NationalCitizenId: ['', Validators.required]
    });
  }

  ngOnInit() {
    if (this.clientAddress) {
      this.updateForm({
        NationalCitizenId: this.clientAddress.NationalId
      });
    }
  }
}