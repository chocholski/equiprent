import { FormBuilder, FormGroup } from "@angular/forms";
import { FormModeEnum } from "src/app/enums/form-mode.enum";
import { FormValidator } from "src/app/ui-controls/form-validator";
import { FormSubmitionActionFactory as FormSubmitionActionFactory } from "./form-factories/form-submition-action-factory";
import { HttpClient } from "@angular/common/http";
import { ApiResultEnum } from "src/app/enums/api-result.enum";
import { Router } from "@angular/router";
import { DialogMessageService } from "src/app/services/messages/dialog-message.service";
import { TranslateService } from "@ngx-translate/core";
import { ConsoleMessageService } from "src/app/services/messages/console-message.service";
import { ErrorService } from "src/app/services/errors/error.service";

export abstract class Form<T> {

  public readonly beforeSubmitionCustomOperationsHandler: (...args: any[]) => T;
  public readonly formMode: typeof FormModeEnum = FormModeEnum;

  protected readonly afterSubmitionCustomOperationsHandler?: (...args: any[]) => void;
  protected readonly onAfterSubmitionSuccessNavigateUsingLinkHandler?: (link?: string) => void;
  protected readonly onBackNavigateUsingLinkHandler?: (link?: string) => void;

  private _formValidator: FormValidator;

  form: FormGroup;
  isDisabled: boolean = false;
  isExecuting: boolean = false;

  public get shouldActionsBeDisabled(): boolean {
    return this.form.invalid ||
      this.isDisabled ||
      this.isExecuting;
  }

  protected get formValidator(): FormValidator {
    return this._formValidator;
  }
  private set formValidator(validator: FormValidator) {
    this._formValidator = validator;
  }

  constructor(
    protected readonly consoleMessageService: ConsoleMessageService,
    protected readonly dialogMessageService: DialogMessageService,
    protected readonly entityName: string,
    protected readonly errorService: ErrorService,
    protected readonly formBuilder: FormBuilder,
    protected readonly httpClient: HttpClient,
    protected readonly mode: FormModeEnum,
    protected readonly router: Router,
    public readonly submitionLink: string,
    public readonly translate: TranslateService,
    protected readonly afterSubmitionNavigationLink?: string) {
  }

  protected createForm(formFieldGroup?: object) {
    this.form = this.formBuilder.group(formFieldGroup ?? {});
    this.formValidator = new FormValidator(this.form);
  }

  public onSubmit() {
    this.isExecuting = true;
    const onSubmitAction = new FormSubmitionActionFactory(this.consoleMessageService, this.httpClient)
      .getFormSubmitionAction<T>(this.mode);

    if (!onSubmitAction)
      return;

    onSubmitAction
      .execute(this)
      .subscribe({
        next: result => {
          if (result === ApiResultEnum[ApiResultEnum.OK]) {
            if (!this.onAfterSubmitionSuccessNavigateUsingLinkHandler) {
              this.router.navigate([this.afterSubmitionNavigationLink]);
            }
            else {
              this.onAfterSubmitionSuccessNavigateUsingLinkHandler(this.afterSubmitionNavigationLink);
            }

            this.dialogMessageService.addSuccess(this.translate.instant(`${this.entityName}.${onSubmitAction.successMessageTag}`));
          }
          else {
            this.dialogMessageService.addError(this.getErrorMessageForResult(result) ?? this.errorService.getDefaultErrorMessage());
          }

          console.log(onSubmitAction.getConsoleMessage(this.entityName, result));

          if (this.afterSubmitionCustomOperationsHandler) {
            this.afterSubmitionCustomOperationsHandler();
          }

          this.isExecuting = false;
        },
        error: error => {
          const firstTranslatedErrorMessage = this.errorService.getFirstTranslatedErrorMessage(error);
          if (firstTranslatedErrorMessage !== this.errorService.getDefaultErrorMessage()) {
            this.dialogMessageService.addError(this.errorService.getFirstTranslatedErrorMessage(error));
          }
          else {
            const requestValidationByDatabaseErrorMessage = this.getErrorMessageForResult(this.errorService.getFirstErrorMessageKey(error));
            this.dialogMessageService.addError(requestValidationByDatabaseErrorMessage ? this.translate.instant(requestValidationByDatabaseErrorMessage) : firstTranslatedErrorMessage);
          }
          this.isExecuting = false;
        }
      });
  }

  protected updateForm(obj?: { [key: string]: any }) {
    if (obj) {
      this.form.patchValue(obj);
    }
  }

  protected getErrorMessageForResult(result: string): string | undefined {
    if (Object.keys(ApiResultEnum).includes(result)) {
      const apiErrorKey = ApiResultEnum[Number(this.getApiResultKeyByValue(result))].toString();
      return `${this.entityName}.Messages.${apiErrorKey}`;
    }

    return undefined;
  }

  private getApiResultKeyByValue(value: string): keyof ApiResultEnum | undefined {
    const keys = Object.keys(ApiResultEnum).filter((key) => (ApiResultEnum as any)[key] === value);
    return keys.length > 0 ? keys[0] as keyof ApiResultEnum : undefined;
  }
}