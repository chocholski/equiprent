import { AccessControl } from "src/app/tools/access-control";
import { FormBuilder } from "@angular/forms";
import { AuthorizationService } from "src/app/services/authorization/authorization.service";
import { FormComponent } from "./form";
import { ConsoleMessageService } from "src/app/services/messages/console-message.service";
import { DialogMessageService } from "src/app/services/messages/dialog-message.service";
import { ErrorService } from "src/app/services/errors/error.service";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { Confirmation, ConfirmationService } from "primeng/api";
import { ApiResultEnum } from "src/app/enums/api-result-enum";
import { FormModeEnum } from "src/app/enums/form-mode-enum";

export abstract class AccessControlFormComponent<T>
  extends FormComponent<T> {

  protected abstract override readonly afterSubmitionCustomOperationsHandler?: (...args: any[]) => void;
  protected abstract readonly deletedEntityInstanceIdentificationInitializer: (...args: any[]) => string;
  protected readonly entityId: string | number;
  protected readonly onAfterDeletionSuccessNavigateUsingLinkHandler?: (link?: string) => void;
  protected override readonly onAfterSubmitionSuccessNavigateUsingLinkHandler?: (link?: string) => void;
  protected override readonly onBackNavigateUsingLinkHandler?: (link?: string) => void;

  private readonly deletionLink: string;
  private readonly accessControl: AccessControl;

  public get hasAccessToButtons(): boolean {
    return this.accessControl.hasAccessToButtons;
  }

  constructor(
    protected readonly activatedRoute: ActivatedRoute,
    protected readonly authorizationService: AuthorizationService,
    protected readonly confirmationService: ConfirmationService,
    protected override readonly consoleMessageService: ConsoleMessageService,
    public readonly deletionKey: string,
    protected readonly deletionLinkInitializer: (...args: any[]) => string,
    protected override readonly dialogMessageService: DialogMessageService,
    protected override readonly entityName: string,
    protected override readonly errorService: ErrorService,
    protected override readonly formBuilder: FormBuilder,
    protected override readonly httpClient: HttpClient,
    protected override readonly mode: FormModeEnum,
    protected override readonly router: Router,
    public override readonly submitionLink: string,
    public override readonly translate: TranslateService,
    public userPermissions: number[],
    protected override readonly afterSubmitionNavigationLink?: string) {

    super(
      consoleMessageService,
      dialogMessageService,
      entityName,
      errorService,
      formBuilder,
      httpClient,
      mode,
      router,
      submitionLink,
      translate);

    this.accessControl = new AccessControl(this.authorizationService, this.userPermissions);
    this.entityId = this.activatedRoute.snapshot.params["id"];
    this.deletionLink = deletionLinkInitializer(this.entityId);
    this.isDisabled = true;
  }

  public onDelete() {
    this.confirmationService.confirm(<Confirmation>{
      key: this.deletionKey,
      message: `${this.translate.instant(this.entityName + '.DeletionConfirmation')} ${this.deletedEntityInstanceIdentificationInitializer()}?`,
      accept: () => {
        this.isExecuting = true;
        this.deleteEntity();
      }
    });
  }

  protected override updateForm(obj?: { [key: string]: any }) {
    super.updateForm(obj);
    this.setAccess();

    if (!this.form.disabled) {
      this.formValidator.updateAllControlsToTouched();
    }
  }

  private deleteEntity() {
    this.httpClient
      .delete<string>(this.deletionLink)
      .subscribe({
        next: result => {
          if (result === ApiResultEnum[ApiResultEnum.OK]) {
            this.dialogMessageService.addSuccess(this.translate.instant(`${this.entityName}.Deleted`));

            if (!this.onAfterDeletionSuccessNavigateUsingLinkHandler) {
              this.router.navigate([this.afterSubmitionNavigationLink]);
            }
            else {
              this.onAfterDeletionSuccessNavigateUsingLinkHandler();
            }
          }
          else {
            this.dialogMessageService.addError(this.getErrorMessageForResult(result) ?? this.errorService.getDefaultErrorMessage());
          }

          console.log(this.consoleMessageService.getConsoleMessageWithResultForEntityAfterDeletion(this.entityName, result));
          this.isExecuting = false;
        },
        error: error => {
          this.dialogMessageService.addError(this.errorService.getFirstTranslatedErrorMessage(error));
          this.isExecuting = false;
        }
      });
  }

  private setAccess() {
    if (this.hasAccessToButtons) {
      this.form.enable();
    }
    else {
      this.form.disable();
    }

    this.isDisabled = !this.hasAccessToButtons;
  }
}