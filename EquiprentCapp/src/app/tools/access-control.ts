import { TranslateService } from "@ngx-translate/core";
import { AuthorizationService } from "../services/authorization/authorization.service";

export class AccessControl {

  hasAccessToButtons: boolean = true;

  constructor(
    private readonly authorizationService: AuthorizationService,
    private readonly permissions: number[]) {
    this.determineWhetherUserHasAccessToButtons();
  }

  private determineWhetherUserHasAccessToButtons(): void {
    this.permissions.forEach(permission => {
      this.hasAccessToButtons = this.hasAccessToButtons && this.authorizationService.isAuthorized([permission]);
    });
  }
}