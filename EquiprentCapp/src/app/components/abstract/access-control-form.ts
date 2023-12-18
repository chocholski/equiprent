import { AccessControl } from "src/app/tools/access-control";
import { FormComponent } from "./form";
import { FormBuilder } from "@angular/forms";
import { AuthorizationService } from "src/app/services/authorization/authorization.service";

export abstract class AccessControlFormComponent extends FormComponent {

  public readonly abstract deletionKey: string;

  private accessControl: AccessControl;

  public get hasAccessToButtons(): boolean {
    return this.accessControl.hasAccessToButtons;
  }

  constructor(
    protected authorizationService: AuthorizationService,
    protected override formBuilder: FormBuilder,
    public userPermissions: number[]) {

    super(formBuilder);

    this.accessControl = new AccessControl(this.authorizationService, this.userPermissions);
  }

  protected override updateForm(obj?: { [key: string]: any }) {
    super.updateForm(obj);

    this.setAccess();

    if (!this.form.disabled) {
      this.formValidator.updateAllControlsToTouched();
    }
  }

  private setAccess() {
    if (this.hasAccessToButtons) {
      this.form.enable();
    }
    else {
      this.form.disable();
    }

    this.isDisabled = !this.hasAccessToButtons;
  }
}