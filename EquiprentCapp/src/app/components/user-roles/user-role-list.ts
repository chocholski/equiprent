import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { Table } from 'primeng/table';
import { PngTableColumn } from 'src/app/interfaces/png';
import { UserRoleListItemModel, UserRoleListModel } from 'src/app/interfaces/user-role';
import { FilterService } from 'src/app/services/filters/filter.service';
import { Confirmation, ConfirmationService, LazyLoadEvent, SelectItem } from 'primeng/api';
import { SelectOptionsService } from 'src/app/services/select-options/select-options.service';
import { FilterTypeEnum } from 'src/app/enums/filter-type-enum';
import { ApiRoutes } from 'src/app/api-routes';
import { ConsoleMessageService } from 'src/app/services/messages/console-message.service';
import { ErrorService } from 'src/app/services/errors/error.service';
import { DialogMessageService } from 'src/app/services/messages/dialog-message.service';
import { Router } from '@angular/router';
import { UserPermissionEnum } from 'src/app/enums/user-permission-enum';
import { Routes } from 'src/app/routes';
import { ApiResultEnum } from 'src/app/enums/api-result-enum';
import { AccessControlComponent } from '../abstract/access-controls/access-control';
import { AuthorizationService } from 'src/app/services/authorization/authorization.service';

@Component({
  selector: "user-role-list",
  templateUrl: "./user-role-list.html"
})
export class UserRoleListComponent
  extends AccessControlComponent
  implements OnInit {

  private readonly _dataPopulator = {
    multiSelects: {
      userRoles: {
        get: () => this.getUserRoleMultiSelectData(),
        set: (userRoles: SelectItem[]) => this.setUserRoleMultiSelectData(userRoles)
      }
    },
    userRoles: {
      get: (event: LazyLoadEvent) => this.getUserRoles(event),
      set: (userRoles: UserRoleListModel) => this.setUserRoles(userRoles)
    }
  };

  public override readonly deletionKey: string = 'deleteUserRole';

  private tempLazyLoadEvent: LazyLoadEvent;

  cols: PngTableColumn[];
  totalRecords: number;
  userRoleOptions: SelectItem[];
  userRoles: UserRoleListItemModel[];

  @ViewChild('dataTable') dataTable: Table;

  constructor(
    protected override authorizationService: AuthorizationService,
    private confirmationService: ConfirmationService,
    private consoleMessageService: ConsoleMessageService,
    private dialogMessageService: DialogMessageService,
    private errorService: ErrorService,
    public filterService: FilterService,
    private httpClient: HttpClient,
    private router: Router,
    public selectOptionsService: SelectOptionsService,
    public translate: TranslateService) {

    super(authorizationService, [UserPermissionEnum.UserRoles_CanModify]);
  }

  ngOnInit(): void {
    this.cols = [
      <PngTableColumn>{
        field: 'Id',
        header: 'UserRole.Id',
        width: '10%',
        filterType: FilterTypeEnum.Numeric
      },
      <PngTableColumn>{
        field: 'Name',
        header: 'UserRole.Name',
        width: '70%',
        filterType: FilterTypeEnum.Text,
        applyGlobalFiltering: true,
        replaceWith: 'Id'
      },
      <PngTableColumn>{
        field: 'Actions',
        header: '',
        width: '20%'
      }
    ];

    this._dataPopulator.multiSelects.userRoles
      .get()
      .subscribe(userRoles => this._dataPopulator.multiSelects.userRoles.set(userRoles));
  }

  handleErrors(withResult: string): string {
    switch (withResult) {
      case ApiResultEnum[ApiResultEnum.AssignedRoleDeletionAttempt]:
      case ApiResultEnum[ApiResultEnum.TheOnlyAssignedRoleDeletionAttempt]:
        return this.translate.instant('UserRole.AssignedRoleDeletionAttempt');

      default:
        return this.errorService.getDefaultErrorMessage();
    }
  }

  public loadUserRolesLazy(event: LazyLoadEvent) {
    this.tempLazyLoadEvent = event;

    this._dataPopulator.userRoles
      .get(event)
      .subscribe(result => this._dataPopulator.userRoles.set(result));
  }

  public onCreate() {
    this.router.navigate([Routes.userRoles.navigations.creation]);
  }

  public onDelete(userRole: UserRoleListItemModel) {
    this.confirmationService.confirm(<Confirmation>{
      key: this.deletionKey,
      message: `${this.translate.instant('UserRole.DeletionConfirmation')} '${userRole.Name}'?`,
      accept: () => {
        this.deleteUserRole(userRole);
      }
    });
  }

  public onEdit(userRole: UserRoleListItemModel) {
    this.router.navigate([Routes.userRoles.navigations.edition(userRole.Id)]);
  }

  private deleteUserRole(userRole: UserRoleListItemModel) {
    this.httpClient
      .delete<string>(ApiRoutes.userRole.delete(userRole.Id))
      .subscribe({
        next: result => {
          if (result === ApiResultEnum[ApiResultEnum.OK]) {
            this.dialogMessageService.addSuccess(this.translate.instant('UserRole.Deleted'));

            this._dataPopulator.userRoles
              .get(this.tempLazyLoadEvent)
              .subscribe(result => this._dataPopulator.userRoles.set(result));
          }
          else {
            this.dialogMessageService.addError(this.handleErrors(result));
          }

          console.log(this.consoleMessageService.getConsoleMessageWithResultForEntityAfterDeletion('UserRole', result));
        },
        error: e => {
          this.dialogMessageService.addError(this.errorService.getFirstTranslatedErrorMessage(e));
        }
      });
  }

  private getUserRoleMultiSelectData() {
    return this.selectOptionsService.getUserRoles();
  }

  private getUserRoles(event: LazyLoadEvent) {
    event.sortField ??= this.cols[0]?.field;

    return this.httpClient
      .get<UserRoleListModel>(ApiRoutes.userRole.getAll(event, this.cols));
  }

  private setUserRoleMultiSelectData(userRoles: SelectItem[]) {
    this.userRoleOptions = userRoles;

    const userRoleColumn = this.cols.find(c => c.field === "Name");

    if (userRoleColumn) {
      userRoleColumn.options = this.userRoleOptions;
    }
  }

  private setUserRoles(userRoles: UserRoleListModel) {
    this.totalRecords = userRoles.TotalRowsCount;
    this.userRoles = userRoles.List;
  }
}