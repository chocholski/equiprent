import { FormBuilder, FormGroup } from "@angular/forms";
import { FormModeEnum } from "src/app/enums/form-mode-enum";
import { FormValidator } from "src/app/ui-controls/form-validator";

export abstract class SimpleFormComponent {

  public readonly formMode: typeof FormModeEnum = FormModeEnum;

  public get form(): FormGroup {
    return this._form;
  };
  private set form(value: FormGroup) {
    this._form = value;
  }

  protected get formValidator(): FormValidator {
    return this._formValidator;
  }
  private set formValidator(value: FormValidator) {
    this._formValidator = value;
  }

  private _form: FormGroup;
  private _formValidator: FormValidator;

  isDisabled: boolean = false;
  isExecuting: boolean = false;

  constructor(protected readonly formBuilder: FormBuilder) { }

  public get shouldActionsBeDisabled(): boolean {
    return this.form.invalid ||
      this.isDisabled ||
      this.isExecuting;
  }

  protected createForm(formFieldGroup?: object, reloadForm = false) {
    this.form = reloadForm ? new FormGroup(formFieldGroup) : this.formBuilder.group(formFieldGroup ?? {});
    this.formValidator = new FormValidator(this.form);
  }

  protected updateForm(obj?: { [key: string]: any }) {
    if (obj)
      this.form.patchValue(obj);
  }
}