import { FormModeEnum } from "src/app/enums/form-mode.enum";
import { PostAction } from "./post-action";
import { PutAction } from "./put-action";
import { FormSubmitionAction } from "./form-submition-action";
import { ConsoleMessageService } from "src/app/services/messages/console-message.service";
import { HttpClient } from "@angular/common/http";

export class FormSubmitionActionFactory<T> {

  constructor(
    private readonly consoleMessageService: ConsoleMessageService,
    private readonly httpClient: HttpClient) { }

  public getFormSubmitionAction<T>(mode: FormModeEnum): FormSubmitionAction<T> | undefined {
    switch (mode) {
      case FormModeEnum.Creation:
        return new PostAction<T>(this.consoleMessageService, this.httpClient);

      case FormModeEnum.Edition:
        return new PutAction<T>(this.consoleMessageService, this.httpClient);

      default:
        return undefined;
    }
  }
}