import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import { SelectItem } from "primeng/api";
import { NameInLanguage } from "src/app/interfaces/name-in-language";
import { SelectOptionsService } from "src/app/services/select-options.service";
import { FormValidator } from "src/app/ui-controls/form-validator";

@Component({
  selector: 'name-in-languages',
  templateUrl: './name-in-languages.html'
})
export class NameInLanguagesComponent implements OnInit {

  nameInLanguagesForm: FormGroup;
  formValidator: FormValidator;
  languages: SelectItem[];

  @Input('nameInLanguagesData') nameInLanguagesData: NameInLanguage[];
  @Input('disabled') disabled: boolean;

  @Output('isValid') isValid = new EventEmitter<boolean>();

  constructor(
    private selectOptionsService: SelectOptionsService,
    public translate: TranslateService) {
  }

  ngOnInit() {
    this.selectOptionsService
      .getLanguages()
      .subscribe(languages => {
        this.languages = languages;

        this.createForm();

        this.formValidator = new FormValidator(this.nameInLanguagesForm);

        if (this.nameInLanguagesData) {
          this.updateForm();
          this.isValid.emit(true);
        }

        if (this.disabled) {
          this.nameInLanguagesForm.disable();
        }
        else {
          this.nameInLanguagesForm.enable();
        }
      });
  }

  public getNameInLanguages(): NameInLanguage[] {
    let data: NameInLanguage[] = [];

    this.languages.forEach(l => {
      data.push(<NameInLanguage>{
        LanguageId: Number(l.value),
        Name: this.nameInLanguagesForm.controls[l.label!].value
      });
    });

    return data;
  }

  public onChangeInput(text: string) {
    let isFormValid = true;

    Object.keys(this.nameInLanguagesForm.controls)
      .forEach(key => {
        isFormValid = isFormValid && (this.nameInLanguagesForm.get(key)?.valid ?? true);
      });

    this.isValid.emit(isFormValid);
  }

  private createForm() {
    const group: { [key: string]: FormControl } = {};

    this.languages.forEach(l => {
      group[l.label!] = new FormControl('');
      group[l.label!].setValidators(Validators.required);
    });

    this.nameInLanguagesForm = new FormGroup(group);
  }

  private updateForm() {
    this.languages.forEach(l => {
      const data = this.nameInLanguagesData.find(d => d.LanguageId == l.value);

      this.nameInLanguagesForm.controls[l.label!].patchValue(data?.Name);
    });
  }
}