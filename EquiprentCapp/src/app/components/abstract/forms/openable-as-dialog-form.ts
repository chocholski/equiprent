import { Router } from "@angular/router";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { FormBuilder } from "@angular/forms";
import { Form } from "./form";
import { ConsoleMessageService } from "src/app/services/messages/console-message.service";
import { DialogMessageService } from "src/app/services/messages/dialog-message.service";
import { ErrorService } from "src/app/services/errors/error.service";
import { HttpClient } from "@angular/common/http";
import { TranslateService } from "@ngx-translate/core";
import { FormModeEnum } from "src/app/enums/form-mode.enum";

export abstract class OpenableAsDialogForm<T, U>
  extends Form<U> {

  protected readonly _dialogConfigData: T | undefined;
  protected readonly onAfterDeletionSuccessNavigateUsingLinkHandler: (...args: any[]) => void = this.onAfterDeletionSuccessNavigateUsingLink;
  protected override readonly onAfterSubmitionSuccessNavigateUsingLinkHandler = this.onAfterSubmitSuccessNavigateUsingLink;
  protected override readonly onBackNavigateUsingLinkHandler = this.onBackNavigateUsingLink;

  constructor(
    protected override readonly consoleMessageService: ConsoleMessageService,
    protected override readonly dialogMessageService: DialogMessageService,
    protected override readonly entityName: string,
    protected override readonly errorService: ErrorService,
    protected override readonly formBuilder: FormBuilder,
    protected override readonly httpClient: HttpClient,
    protected override readonly mode: FormModeEnum,
    public openedAsDialogConfig: DynamicDialogConfig,
    public openedAsDialogRef: DynamicDialogRef,
    protected override readonly router: Router,
    public override submitionLink: string,
    public override readonly translate: TranslateService,
    protected override afterSubmitionNavigationLink?: string) {

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
      translate,
      afterSubmitionNavigationLink
    );

    this._dialogConfigData = this.getOpenedAsDialogData(openedAsDialogConfig?.data);
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

  private getOpenedAsDialogData(data: any) {
    return this.isOfTypeT(data) ? data : undefined;
  }

  private isOfTypeT(value: any): value is T {
    return typeof value === 'object' && value !== null;
  }
}