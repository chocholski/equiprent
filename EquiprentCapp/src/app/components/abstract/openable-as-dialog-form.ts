import { Router } from "@angular/router";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { FormComponent } from "./form";
import { FormBuilder } from "@angular/forms";

export abstract class OpenableAsDialogForm<T>
  extends FormComponent {

  protected readonly _dialogConfigData: T | undefined;

  constructor(
    public openedAsDialogConfig: DynamicDialogConfig,
    public openedAsDialogRef: DynamicDialogRef,
    protected override formBuilder: FormBuilder,
    protected router: Router
  ) {
    super(formBuilder);
    this._dialogConfigData = this.getOpenedAsDialogData(openedAsDialogConfig?.data);
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