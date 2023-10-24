import { TranslateService } from "@ngx-translate/core";
import { AuthorizationService } from "../authorization.service";

export class AccessControl {

  permissions?: number[];
  hasAccessToButtons: boolean;

  constructor(public translate: TranslateService, private authorizationService: AuthorizationService) {
    this.hasAccessToButtons = true;
  }

  assignPermissions(userPermissions: number[]): void {
    this.permissions = userPermissions;
    this.hasAccessToButtons = true;

    this.permissions.forEach(permission => {
      this.hasAccessToButtons = this.hasAccessToButtons && this.authorizationService.isAuthorized([permission]);
    });
  }

  getOnEditLabel(additionalConditionStatement?: boolean): string {

    let label = undefined;

    if (this.hasAccessToButtons && (additionalConditionStatement == undefined || additionalConditionStatement)) {
      label = 'General.Edit';
    }
    else {
      label = 'General.Details';
    }

    return this.translate.instant(label);
  }
}