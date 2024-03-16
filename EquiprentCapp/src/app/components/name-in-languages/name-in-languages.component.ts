import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import { SelectItem } from "primeng/api";
import { NameInLanguage } from "src/app/interfaces/name-in-language";
import { SelectOptionsService } from "src/app/services/select-options/select-options.service";
import { SimpleFormComponent } from "../abstract/forms/simple-form";

@Component({
  selector: 'name-in-languages',
  templateUrl: './name-in-languages.component.html'
})
export class NameInLanguagesComponent
  extends SimpleFormComponent
  implements OnInit {

  languages: SelectItem[];

  @Input('disabled') disabled: boolean;
  @Input('nameInLanguages') nameInLanguages: NameInLanguage[];

  @Output('isValid') isValid = new EventEmitter<boolean>();

  constructor(
    protected override readonly formBuilder: FormBuilder,
    private readonly selectOptionsService: SelectOptionsService,
    public readonly translate: TranslateService
  ) {
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
    const data: NameInLanguage[] = [];
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

    super.createForm(group, true);
  }

  protected override updateForm() {
    this.languages.forEach(l => {
      const data = this.nameInLanguages.find(d => d.LanguageId == l.value);
      this.form.controls[l.label!].patchValue(data?.Name);
    });
  }
}