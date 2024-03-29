import { Directive, Input, OnInit } from "@angular/core";
import { SimpleFormComponent as SimpleForm } from "./simple-form";
import { FormBuilder, Validators } from "@angular/forms";

@Directive({
  selector: "dynamic-requirement-form"
})
export abstract class DynamicRequirementForm
  extends SimpleForm {

  @Input('requiredFields') requiredFields: string[] = [];

  constructor(
    protected override readonly formBuilder: FormBuilder
  ) {
    super(formBuilder);
  }

  protected updateFormAfterInit(): void {
    this.requiredFields.forEach(fieldName => {
      const requiredField = this.form.get(fieldName);
      if (requiredField) {
        requiredField.setValidators([Validators.required]);
      }
    });
  }
}