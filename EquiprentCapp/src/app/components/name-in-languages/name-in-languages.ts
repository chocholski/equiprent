import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import { SelectItem } from "primeng/api";
import { NameInLanguage } from "src/app/interfaces/name-in-language";
import { SelectOptionsService } from "src/app/services/select-options/select-options.service";
import { FormValidator } from "src/app/ui-controls/form-validator";
import { FormComponent } from "../abstract/formComponent";

@Component({
  selector: 'name-in-languages',
  templateUrl: './name-in-languages.html'
})
export class NameInLanguagesComponent
  extends FormComponent
  implements OnInit {

  languages: SelectItem[];

  @Input('nameInLanguages') nameInLanguages: NameInLanguage[];
  @Input('disabled') disabled: boolean;

  @Output('isValid') isValid = new EventEmitter<boolean>();

  constructor(
    protected override formBuilder: FormBuilder,
    private selectOptionsService: SelectOptionsService,
    public translate: TranslateService) {
    super(formBuilder);
  }

  ngOnInit() {
    this.selectOptionsService
      .getLanguages()
      .subscribe(languages => {
        this.languages = languages;

        this.createForm();

        if (this.nameInLanguages) {
          this.updateForm();
          this.isValid.emit(true);
        }

        if (this.disabled) {
          this.form.disable();
        }
        else {
          this.form.enable();
        }
      });
  }

  public getNameInLanguages(): NameInLanguage[] {
    let data: NameInLanguage[] = [];

    this.languages.forEach(l => {
      data.push(<NameInLanguage>{
        LanguageId: Number(l.value),
        Name: this.form.controls[l.label!].value
      });
    });

    return data;
  }

  public onChangeInput() {
    let isFormValid = true;

    Object.keys(this.form.controls)
      .forEach(key => {
        isFormValid = isFormValid && (this.form.get(key)?.valid ?? true);
      });

    this.isValid.emit(isFormValid);
  }

  protected override createForm() {
    const group: { [key: string]: FormControl } = {};

    this.languages.forEach(l => {
      group[l.label!] = new FormControl('');
      group[l.label!].setValidators(Validators.required);
    });

    this.form = new FormGroup(group);
    this.formValidator = new FormValidator(this.form);
  }

  protected override updateForm() {
    this.languages.forEach(l => {
      const data = this.nameInLanguages.find(d => d.LanguageId == l.value);

      this.form.controls[l.label!].patchValue(data?.Name);
    });
  }
}