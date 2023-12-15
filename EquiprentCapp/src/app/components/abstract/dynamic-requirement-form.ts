import { Directive, Input, OnInit } from "@angular/core";
import { FormComponent } from "./form";
import { FormBuilder, Validators } from "@angular/forms";

@Directive({
  selector: "dynamic-requirement-form"
})
export abstract class DynamicRequirementFormComponent
  extends FormComponent {

  @Input('requiredFields') requiredFields: string[] = [];

  constructor(
    protected override formBuilder: FormBuilder
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