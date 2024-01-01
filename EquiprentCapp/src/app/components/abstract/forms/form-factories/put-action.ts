import { Observable } from "rxjs";
import { FormSubmitionAction } from "./form-submition-action";
import { FormComponent } from "../form";
import { ConsoleMessageService } from "src/app/services/messages/console-message.service";
import { HttpClient } from "@angular/common/http";

export class PutAction<T>
  implements FormSubmitionAction<T> {

  constructor(
    private readonly consoleMessageService: ConsoleMessageService,
    private readonly httpClient: HttpClient) { }

  getConsoleMessage: (entity: string, result: string) => string = (entity: string, result: string) => {
    return this.consoleMessageService.getConsoleMessageWithResultForEntityAfterUpdate(entity, result);
  }

  execute(formComponent: FormComponent<T>): Observable<string> {
    const entity = formComponent.beforeSubmitionCustomOperationsHandler();
    return this.httpClient.put<string>(formComponent.submitionLink, entity);
  }

  successMessageTag: string = 'Updated';
}