import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { IconsService } from "src/app/services/icons/icons.service";

@Component({
  selector: 'selectable-input',
  templateUrl: './selectable-input.component.html'
})
export class SelectableFieldIconComponent
  implements OnInit {

  @Input('form') form: FormGroup;
  @Input('formFieldWithId') formFieldWithId: string;
  @Input('formFieldWithName') formFieldWithName: string;
  @Input('initialIconClass') initialIconClass: string;

  constructor(
    readonly iconsService: IconsService
  ) { }

  ngOnInit() {
  }

  public onClick() {
    this.form?.patchValue({
      [this.formFieldWithId]: null,
      [this.formFieldWithName]: '',
    });
  }
}