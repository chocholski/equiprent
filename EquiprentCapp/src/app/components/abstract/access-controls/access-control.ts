import { AccessControl } from "src/app/tools/access-control";
import { AuthorizationService } from "src/app/services/authorization/authorization.service";
import { Confirmation, ConfirmationService } from "primeng/api";
import { TranslateService } from "@ngx-translate/core";
import { HttpClient } from "@angular/common/http";
import { ApiResultEnum } from "src/app/enums/api-result-enum";
import { DialogMessageService } from "src/app/services/messages/dialog-message.service";
import { Router } from "@angular/router";
import { ErrorService } from "src/app/services/errors/error.service";
import { ConsoleMessageService } from "src/app/services/messages/console-message.service";
import { Identifiable } from "src/app/interfaces/identifiable";

export abstract class AccessControlComponent<T extends Identifiable> {

  protected abstract readonly deletedEntityInstanceIdentificationInitializer: (deletedEntity: T) => string;

  private accessControl: AccessControl;

  public get hasAccessToButtons(): boolean {
    return this.accessControl.hasAccessToButtons;
  }

  public get onEditLabelId(): string {
    return this.accessControl.hasAccessToButtons ? 'General.Edit' : 'General.Details';
  }

  public readonly onDeleteLabelId = 'General.Delete';

  constructor(
    protected readonly authorizationService: AuthorizationService,
    protected readonly confirmationService: ConfirmationService,
    protected readonly consoleMessageService: ConsoleMessageService,
    public readonly deletionKey: string,
    protected readonly deletionLinkInitializer: (...args: any[]) => string,
    protected readonly dialogMessageService: DialogMessageService,
    protected readonly entityName: string,
    protected readonly errorService: ErrorService,
    protected readonly httpClient: HttpClient,
    protected readonly onAfterDeletionSuccessOperationsHandler: (...args: any[]) => void,
    protected readonly router: Router,
    public readonly translate: TranslateService,
    public readonly userPermissions: number[]) {

    this.accessControl = new AccessControl(this.authorizationService, this.userPermissions);
  }

  public onDelete(entity: T) {
    this.confirmationService.confirm(<Confirmation>{
      key: this.deletionKey,
      message: `${this.translate.instant(this.entityName + '.DeletionConfirmation')} ${this.deletedEntityInstanceIdentificationInitializer(entity)}?`,
      accept: () => {
        this.deleteEntity(entity);
      }
    });
  }

  private deleteEntity(entity: T) {
    this.httpClient
      .delete<string>(this.deletionLinkInitializer(entity.Id))
      .subscribe({
        next: result => {
          if (result === ApiResultEnum[ApiResultEnum.OK]) {
            this.dialogMessageService.addSuccess(this.translate.instant(`${this.entityName}.Deleted`));
          }
          else {
            this.dialogMessageService.addError(this.getErrorMessageForResult(result) ?? this.errorService.getDefaultErrorMessage());
          }

          this.onAfterDeletionSuccessOperationsHandler();

          console.log(this.consoleMessageService.getConsoleMessageWithResultForEntityAfterDeletion(this.entityName, result));
        },
        error: error => {
          this.dialogMessageService.addError(this.errorService.getFirstTranslatedErrorMessage(error));
        }
      });
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