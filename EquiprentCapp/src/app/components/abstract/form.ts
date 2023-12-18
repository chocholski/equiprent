import { FormBuilder, FormGroup } from "@angular/forms";
import { FormModeEnum } from "src/app/enums/form-mode-enum";
import { FormValidator } from "src/app/ui-controls/form-validator";

export abstract class FormComponent {

  public readonly formMode: typeof FormModeEnum = FormModeEnum;

  public form: FormGroup;
  protected formValidator: FormValidator;

  isDisabled: boolean = false;
  isExecuting: boolean = false;

  constructor(protected formBuilder: FormBuilder) { }

  public get shouldActionsBeDisabled(): boolean {
    return this.form.invalid ||
      this.isDisabled ||
      this.isExecuting;
  }

  protected createForm(formFieldGroup?: object) {
    this.form = this.formBuilder.group(formFieldGroup ?? {});
    this.formValidator = new FormValidator(this.form);
  }

  protected updateForm(obj?: { [key: string]: any }) {
    if (obj)
      this.form.patchValue(obj);
  }
}