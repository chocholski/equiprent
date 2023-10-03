import { FormGroup } from "@angular/forms";
import { FormValidator } from "src/app/ui-controls/form-validator";

export abstract class FormComponent {

  isDisabled: boolean = false;
  isExecuting: boolean = false;
  form: FormGroup;
  formValidator: FormValidator;

  constructor() {
    this.formValidator = new FormValidator(this.form);
  }
}