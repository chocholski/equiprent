import { Router } from "@angular/router";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { FormComponent } from "./form";
import { FormBuilder } from "@angular/forms";
import { AccessControlFormComponent } from "./access-control-form";
import { AuthorizationService } from "src/app/services/authorization/authorization.service";

export abstract class AccessControlOpenableAsDialogForm<T>
  extends AccessControlFormComponent {

  protected readonly _dialogConfigData: T | undefined;

  constructor(
    protected override authorizationService: AuthorizationService,
    public openedAsDialogConfig: DynamicDialogConfig,
    public openedAsDialogRef: DynamicDialogRef,
    protected override formBuilder: FormBuilder,
    protected router: Router,
    public override userPermissions: number[]
  ) {
    super(authorizationService, formBuilder, userPermissions);
    this._dialogConfigData = this.getOpenedAsDialogData(openedAsDialogConfig?.data);
  }

  protected onAfterDeletionSuccessNavigateUsingLink(onAfterDeletionSuccessNavigateLink: string) {
    if (this.openedAsDialogRef) {
      this.openedAsDialogRef.close();
    }
    else {
      this.router.navigate([onAfterDeletionSuccessNavigateLink]);
    }
  }

  protected onAfterSubmitSuccessNavigateUsingLink(onAfterSubmitSuccessNavigationLink: string) {
    if (this.openedAsDialogRef) {
      this.openedAsDialogRef.close();
    }
    else {
      this.router.navigate([onAfterSubmitSuccessNavigationLink]);
    }
  }

  protected onBackNavigateUsingLink(onBackNavigationLink: string) {
    if (this.openedAsDialogRef) {
      this.openedAsDialogRef.close();
    }
    else {
      this.router.navigate([onBackNavigationLink]);
    }
  }

  private getOpenedAsDialogData(data: any) {
    return this.isOfTypeT(data) ? data : undefined;
  }

  private isOfTypeT(value: any): value is T {
    return typeof value === 'object' && value !== null;
  }
}