import { FormGroup } from '@angular/forms';

export class FormValidator {
  form: FormGroup;
  constructor(currentForm: FormGroup) {
    this.form = currentForm;
  }
  // retrieve a FormControl
  getFormControl(name: string) {
    return this.form.get(name);
  }
  // returns TRUE if the FormControl is valid
  isValid(name: string) {
    var e = this.getFormControl(name);
    return e && e.valid;
  }
  // returns TRUE if the FormControl has been changed
  isChanged(name: string) {
    var e = this.getFormControl(name);
    return e && (e.dirty || e.touched);
  }
  // returns TRUE if the FormControl is invalid after user changes
  hasError(name: string) {
    var e = this.getFormControl(name);
    return e && (e.dirty || e.touched) && !e.valid;
  }

  updateAllControlsToTouched() {
    if (this.form) {
      Object.keys(this.form.controls).forEach(key => {
        this.form.get(key)!.markAsTouched();
      });
    }
  }
}