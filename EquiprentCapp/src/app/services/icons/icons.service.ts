import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable()
export class IconsService {

  constructor() { }

  public getIconForSelectableFormField(initialIconClass: string, form: FormGroup, fieldName: string) {
    const formField = form?.get(fieldName);
    return formField?.value ? 'fa fa-solid fa-xmark pointer' : (initialIconClass ?? '');
  }
}