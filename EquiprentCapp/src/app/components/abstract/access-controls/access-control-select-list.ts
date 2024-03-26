import { AccessControl } from "src/app/tools/access-control";
import { AuthorizationService } from "src/app/services/authorization/authorization.service";
import { Directive, EventEmitter, Input, Output } from "@angular/core";
import { SelectResult } from "src/app/interfaces/selection";

@Directive({
})
export abstract class AccessControlSelectListComponent<T> {

  protected readonly selectionHandler: (entity: T) => SelectResult;

  private accessControl: AccessControl;

  public get hasAccessToButtons(): boolean {
    return this.accessControl.hasAccessToButtons;
  }

  public readonly onSelectLabelId = 'General.Select';

  @Input('ignoredIds') ignoredIds?: string[] | number[];

  @Output('onSelected') onSelected = new EventEmitter<SelectResult>();

  constructor(
    protected readonly authorizationService: AuthorizationService,
    protected readonly userPermissions: number[]
  ) {
    this.accessControl = new AccessControl(this.authorizationService, this.userPermissions);
  }

  public onSelect(selectedEntity: T) {
    this.onSelected.emit(this.selectionHandler(selectedEntity));
  }
}