import { ButtonAccessService } from "src/app/services/buttonAccessService";
import { FormComponent } from "./formComponent";
import { FormBuilder } from "@angular/forms";

export abstract class ButtonAccessComponent extends FormComponent {

  constructor(
    protected buttonAccessService: ButtonAccessService,
    protected override formBuilder: FormBuilder,
    public userPermissions: number[]) {

    super(formBuilder);
    this.buttonAccessService.assignPermissions(userPermissions);
  }

  protected setAccess() {
    if (this.buttonAccessService.hasAccessToButtons) {
      this.form.enable();
    }
    else {
      this.form.disable();
    }

    this.isDisabled = !this.buttonAccessService.hasAccessToButtons;
  }
}