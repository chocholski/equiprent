import { Component, Input, OnInit } from "@angular/core";
import { SimpleFormComponent } from "../../abstract/forms/simple-form";
import { TranslateService } from "@ngx-translate/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ClientAddress } from "src/app/interfaces/address";
import { PRIVATE_CLIENT_ADDRESS_CONTROL_NAMES } from "./private-client-address.constants";

@Component({
  selector: 'private-client-address',
  templateUrl: './private-client-address.component.html'
})
export class PrivateClientAddressComponent
  extends SimpleFormComponent
  implements OnInit {

  @Input('clientAddress') clientAddress?: ClientAddress;

  constructor(
    protected override readonly formBuilder: FormBuilder,
    public readonly translate: TranslateService
  ) {
    super(formBuilder);
    this.createForm({
      [PRIVATE_CLIENT_ADDRESS_CONTROL_NAMES.NationalCitizenId]: ['', Validators.required]
    });
  }

  ngOnInit() {
    if (this.clientAddress) {
      this.updateForm({
        [PRIVATE_CLIENT_ADDRESS_CONTROL_NAMES.NationalCitizenId]: this.clientAddress.NationalId
      });
    }
  }
}