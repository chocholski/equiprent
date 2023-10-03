import { ButtonAccessService } from "src/app/services/buttonAccessService";
import { FormComponent } from "./formComponent";

export abstract class ButtonAccessComponent extends FormComponent {

  constructor(
    protected buttonAccessService: ButtonAccessService,
    public userPermissions: number[]) {

    super();
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