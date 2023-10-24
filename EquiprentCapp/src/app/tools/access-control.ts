import { TranslateService } from "@ngx-translate/core";
import { AuthorizationService } from "../services/authorization.service";

export class AccessControl {

  hasAccessToButtons: boolean = true;

  constructor(
    private authorizationService: AuthorizationService,
    private permissions: number[]) {
    this.determineWhetherUserHasAccessToButtons();
  }

  private determineWhetherUserHasAccessToButtons(): void {
    this.permissions.forEach(permission => {
      this.hasAccessToButtons = this.hasAccessToButtons && this.authorizationService.isAuthorized([permission]);
    });
  }
}