import { FormBuilder, FormGroup } from "@angular/forms";
import { FormValidator } from "src/app/ui-controls/form-validator";

export abstract class FormComponent {

  protected form: FormGroup;
  protected formValidator: FormValidator;

  isDisabled: boolean = false;
  isExecuting: boolean = false;

  constructor(protected formBuilder: FormBuilder) { }

  protected createForm(formFieldGroup: object) {
    this.form = this.formBuilder.group(formFieldGroup);
    this.formValidator = new FormValidator(this.form);
  }
}