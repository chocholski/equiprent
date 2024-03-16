import { Observable } from "rxjs";
import { Form } from "../form";

export interface FormSubmitionAction<T> {
  getConsoleMessage: (entity: string, result: string) => string;
  execute(formComponent: Form<T>): Observable<string>;
  successMessageTag: string;
}