import { Component, OnInit, ViewChild } from '@angular/core';
import { PngTableColumn } from '../../interfaces/png';
import { UserListItemModel, UserListModel } from 'src/app/interfaces/user';
import { Table } from 'primeng/table';
import { HttpClient } from '@angular/common/http';
import { Confirmation, ConfirmationService, LazyLoadEvent, SelectItem } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { FilterService } from '../../services/filters/filter.service';
import { SelectOptionsService } from 'src/app/services/select-options/select-options.service';
import { ApiRoutes } from 'src/app/api-routes';
import { Router } from '@angular/router';
import { StringBuilder } from 'src/app/tools/stringBuilder';
import { UserPermissionEnum } from 'src/app/enums/user-permission-enum';
import { ErrorService } from 'src/app/services/errors/error.service';
import { DialogMessageService } from 'src/app/services/messages/dialog-message.service';
import { ConsoleMessageService } from 'src/app/services/messages/console-message.service';
import { Routes } from 'src/app/routes';
import { ApiResultEnum } from 'src/app/enums/api-result-enum';
import { AccessControlComponent } from '../abstract/access-control';
import { AuthorizationService } from 'src/app/services/authorization/authorization.service';
import { FilterTypeEnum } from 'src/app/enums/filter-type-enum';

@Component({
  selector: "user-list",
  templateUrl: "./user-list.html"
})
export class UserListComponent
  extends AccessControlComponent
  implements OnInit {

  private readonly _dataPopulator = {
    multiSelects: {
      userRoles: {
        get: () => this.getUserRoleMultiSelectData(),
        set: (userRoles: SelectItem[]) => this.setUserRoleMultiSelectData(userRoles)
      }
    },
    users: {
      get: (event: LazyLoadEvent) => this.getUsers(event),
      set: (users: UserListModel) => this.setUsers(users)
    }
  };

  private tempLazyLoadEvent: LazyLoadEvent;

  cols: PngTableColumn[];
  totalRecords: number;
  userRoleOptions: SelectItem[];
  users: UserListItemModel[];

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

    super(authorizationService, [UserPermissionEnum.Users_CanModify]);
  }

  ngOnInit() {
    this.cols = [
      <PngTableColumn>{
        field: 'Login',
        header: 'User.Login',
        width: '10%',
        filterType: FilterTypeEnum.Text,
        applyGlobalFiltering: true
      },
      <PngTableColumn>{
        field: 'FirstName',
        header: 'User.FirstName',
        width: '20%',
        filterType: FilterTypeEnum.Text,
        applyGlobalFiltering: true
      },
      <PngTableColumn>{
        field: 'LastName',
        header: 'User.LastName',
        width: '20%',
        filterType: FilterTypeEnum.Text,
        applyGlobalFiltering: true
      },
      <PngTableColumn>{
        field: 'UserRoleName',
        header: 'User.UserRoleName',
        width: '20%',
        filterType: FilterTypeEnum.Text,
        applyGlobalFiltering: true,
        replaceWith: 'UserRoleId'
      },
      <PngTableColumn>{
        field: 'IsActive',
        header: 'User.IsActive',
        width: '10%'
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

  public loadUsersLazy(event: LazyLoadEvent) {
    this.tempLazyLoadEvent = event;

    this._dataPopulator.users
      .get(event)
      .subscribe(result => this._dataPopulator.users.set(result));
  }

  public onCreate() {
    this.router.navigate([Routes.users.navigations.creation]);
  }

  public onDelete(user: UserListItemModel) {
    this.confirmationService.confirm(<Confirmation>{
      key: 'deleteUser',
      message: `${this.translate.instant('User.DeletionConfirmation')} '${new StringBuilder(user.LastName).append(' ').append(user.FirstName).toString()}'?`,
      accept: () => {
        this.deleteUser(user);
      }
    });
  }

  public onEdit(user: UserListItemModel) {
    this.router.navigate([Routes.users.navigations.edition(user.Id)]);
  }

  private deleteUser(user: UserListItemModel) {
    this.httpClient
      .delete<string>(ApiRoutes.user.delete(user.Id))
      .subscribe({
        next: result => {
          if (result === ApiResultEnum[ApiResultEnum.OK]) {
            this.dialogMessageService.addSuccess(this.translate.instant('User.Deleted'));

            this._dataPopulator.users
              .get(this.tempLazyLoadEvent)
              .subscribe(result => this._dataPopulator.users.set(result));
          }
          else {
            this.dialogMessageService.addError(this.errorService.getDefaultErrorMessage());
          }

          console.log(this.consoleMessageService.getConsoleMessageWithResultForEntityAfterDeletion('User', result));
        },
        error: () => {
          this.dialogMessageService.addError(this.errorService.getDefaultErrorMessage());
        }
      });
  }

  private getUserRoleMultiSelectData() {
    return this.selectOptionsService.getUserRoles();
  }

  private getUsers(event: LazyLoadEvent) {
    event.sortField ??= this.cols[0]?.field;

    return this.httpClient
      .get<UserListModel>(ApiRoutes.user.getAll(event, this.cols));
  }

  private setUserRoleMultiSelectData(userRoles: SelectItem[]) {
    this.userRoleOptions = userRoles;

    const userRoleColumn = this.cols.find(c => c.field === "UserRoleName");
    if (userRoleColumn) {
      userRoleColumn.options = this.userRoleOptions;
    }
  }

  private setUsers(users: UserListModel) {
    this.totalRecords = users.TotalRowsCount;
    this.users = users.List;
  }
}