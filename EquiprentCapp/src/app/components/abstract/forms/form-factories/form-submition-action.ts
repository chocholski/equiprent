import { Observable } from "rxjs";
import { FormComponent } from "../form";

export interface FormSubmitionAction<T> {
  getConsoleMessage: (entity: string, result: string) => string;
  execute(formComponent: FormComponent<T>): Observable<string>;
  successMessageTag: string;
}