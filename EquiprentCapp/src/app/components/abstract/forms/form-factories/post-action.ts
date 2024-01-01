import { Observable } from "rxjs";
import { FormSubmitionAction } from "./form-submition-action";
import { ConsoleMessageService } from "src/app/services/messages/console-message.service";
import { FormComponent } from "../form";
import { HttpClient } from "@angular/common/http";

export class PostAction<T>
  implements FormSubmitionAction<T> {

  constructor(
    private readonly consoleMessageService: ConsoleMessageService,
    private readonly httpClient: HttpClient) {
  }

  getConsoleMessage: (entity: string, result: string) => string = (entity: string, result: string) => {
    return this.consoleMessageService.getConsoleMessageWithResultForEntityAfterCreation(entity, result);
  }

  execute(formComponent: FormComponent<T>): Observable<string> {
    const entity = formComponent.beforeSubmitionCustomOperationsHandler();
    return this.httpClient.post<string>(formComponent.submitionLink, entity);
  }

  successMessageTag: string = 'Created';
}