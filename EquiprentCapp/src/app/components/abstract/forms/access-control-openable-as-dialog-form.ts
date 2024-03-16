import { ActivatedRoute, Router } from "@angular/router";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { FormBuilder } from "@angular/forms";
import { AuthorizationService } from "src/app/services/authorization/authorization.service";
import { AccessControlForm } from "./access-control-form";
import { ConfirmationService } from "primeng/api";
import { ConsoleMessageService } from "src/app/services/messages/console-message.service";
import { DialogMessageService } from "src/app/services/messages/dialog-message.service";
import { ErrorService } from "src/app/services/errors/error.service";
import { HttpClient } from "@angular/common/http";
import { TranslateService } from "@ngx-translate/core";
import { DialogConfigData } from "../dialogs/dialog-config-data";
import { FormModeEnum } from "src/app/enums/form-mode.enum";

export abstract class AccessControlOpenableAsDialogForm<T extends DialogConfigData, U>
  extends AccessControlForm<U> {

  protected readonly _dialogConfigData: T | undefined;
  protected override readonly entityId: string | number;
  protected override readonly onAfterDeletionSuccessNavigateUsingLinkHandler = this.onAfterDeletionSuccessNavigateUsingLink;
  protected override readonly onAfterSubmitionSuccessNavigateUsingLinkHandler = this.onAfterSubmitSuccessNavigateUsingLink;
  protected override readonly onBackNavigateUsingLinkHandler = this.onBackNavigateUsingLink;

  constructor(
    protected override readonly activatedRoute: ActivatedRoute,
    protected override readonly authorizationService: AuthorizationService,
    protected override readonly confirmationService: ConfirmationService,
    protected override readonly consoleMessageService: ConsoleMessageService,
    public override readonly deletionKey: string,
    protected override readonly deletionLinkInitializer: (...args: any[]) => string,
    protected override readonly dialogMessageService: DialogMessageService,
    protected override readonly entityName: string,
    protected override readonly errorService: ErrorService,
    protected override readonly formBuilder: FormBuilder,
    protected override readonly httpClient: HttpClient,
    protected override readonly mode: FormModeEnum,
    public readonly openedAsDialogConfig: DynamicDialogConfig,
    public readonly openedAsDialogRef: DynamicDialogRef,
    protected override readonly router: Router,
    public override readonly submitionLink: string,
    public override readonly translate: TranslateService,
    public override readonly userPermissions: number[],
    protected override readonly afterSubmitionNavigationLink?: string
  ) {
    super(
      activatedRoute,
      authorizationService,
      confirmationService,
      consoleMessageService,
      deletionKey,
      deletionLinkInitializer,
      dialogMessageService,
      entityName,
      errorService,
      formBuilder,
      httpClient,
      mode,
      router,
      submitionLink,
      translate,
      userPermissions,
      afterSubmitionNavigationLink
    );

    this._dialogConfigData = this.getOpenedAsDialogData(openedAsDialogConfig?.data);
    this.entityId = this.getEntityId();
  }

  public onBack() {
    this.onBackNavigateUsingLink();
  }

  private onAfterDeletionSuccessNavigateUsingLink() {
    if (this.openedAsDialogRef) {
      this.openedAsDialogRef.close();
    }
    else {
      this.router.navigate([this.afterSubmitionNavigationLink]);
    }
  }

  private onAfterSubmitSuccessNavigateUsingLink() {
    if (this.openedAsDialogRef) {
      this.openedAsDialogRef.close();
    }
    else {
      this.router.navigate([this.afterSubmitionNavigationLink]);
    }
  }

  private onBackNavigateUsingLink() {
    if (this.openedAsDialogRef) {
      this.openedAsDialogRef.close();
    }
    else {
      this.router.navigate([this.afterSubmitionNavigationLink]);
    }
  }

  private getEntityId() {
    if (this.openedAsDialogRef) {
      return this._dialogConfigData?.Id;
    }
    else {
      return this.activatedRoute.snapshot.params["id"];
    }
  }

  private getOpenedAsDialogData(data: any) {
    return this.isOfTypeT(data) ? data : undefined;
  }

  private isOfTypeT(value: any): value is T {
    return typeof value === 'object' && value !== null;
  }
}