import { Component, Input, OnInit } from "@angular/core";
import { SimpleFormComponent } from "../../abstract/forms/simple-form";
import { FormBuilder, Validators } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import { ClientDetailsModel } from "src/app/interfaces/client";
import { PRIVATE_CLIENT_CONTROL_NAMES } from "./private-client.constants";

@Component({
  selector: "private-client",
  templateUrl: "./private-client.component.html"
})
export class PrivateClientComponent
  extends SimpleFormComponent
  implements OnInit {

  @Input('client') client?: ClientDetailsModel;

  constructor(
    protected override formBuilder: FormBuilder,
    public translate: TranslateService
  ) {
    super(formBuilder);
    this.createForm({
      [PRIVATE_CLIENT_CONTROL_NAMES.FirstName]: ['', Validators.required],
      [PRIVATE_CLIENT_CONTROL_NAMES.LastName]: ['', Validators.required]
    });
  }

  ngOnInit() {
    if (this.client) {
      this.updateForm({
        [PRIVATE_CLIENT_CONTROL_NAMES.FirstName]: this.client.FirstName,
        [PRIVATE_CLIENT_CONTROL_NAMES.LastName]: this.client.LastName
      });
    }
  }
}