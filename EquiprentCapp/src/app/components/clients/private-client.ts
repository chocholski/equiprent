import { Component, Input, OnInit } from "@angular/core";
import { FormComponent } from "../abstract/formComponent";
import { FormBuilder, Validators } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import { ClientDetailsModel } from "src/app/interfaces/client";

@Component({
  selector: "private-client",
  templateUrl: "./private-client.html"
})
export class PrivateClientComponent
  extends FormComponent
  implements OnInit {

  @Input('client') client?: ClientDetailsModel;

  constructor(
    protected override formBuilder: FormBuilder,
    public translate: TranslateService
  ) {
    super(formBuilder);
    this.createForm({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required]
    });
  }

  ngOnInit() {
    if (this.client) {
      this.updateForm({
        FirstName: this.client.FirstName,
        LastName: this.client.LastName
      });
    }
  }
}