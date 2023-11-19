import { AccessControl } from "src/app/tools/access-control";
import { AuthorizationService } from "src/app/services/authorization/authorization.service";

export abstract class AccessControlComponent {

  private accessControl: AccessControl;

  public get hasAccessToButtons(): boolean {
    return this.accessControl.hasAccessToButtons;
  }

  public get onEditLabelId(): string {
    return this.accessControl.hasAccessToButtons ? 'General.Edit' : 'General.Details';
  }

  public readonly onDeleteLabelId = 'General.Delete'

  constructor(
    protected authorizationService: AuthorizationService,
    public userPermissions: number[]) {

    this.accessControl = new AccessControl(this.authorizationService, this.userPermissions);
  }
}