import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { Table } from 'primeng/table';
import { PngTableColumn } from 'src/app/interfaces/png';
import { UserRoleListItemModel, UserRoleListModel } from 'src/app/interfaces/user-role';
import { FilterService } from 'src/app/services/filter.service';
import { Confirmation, ConfirmationService, LazyLoadEvent, SelectItem } from 'primeng/api';
import { SelectOptionsService } from 'src/app/services/select-options.service';
import { FilterTypeEnum } from 'src/app/enums/filterTypeEnum';
import { ApiRoutes } from 'src/app/api-routes';
import { ButtonAccessService } from 'src/app/services/buttonAccessService';
import { ConsoleMessageService } from 'src/app/services/console-message.service';
import { ErrorService } from 'src/app/services/error.service';
import { DialogMessageService } from 'src/app/services/dialog-message.service';
import { Router } from '@angular/router';
import { UserPermissionEnum } from 'src/app/enums/userPermissionEnum';
import { Routes } from 'src/app/routes';
import { ApiResultEnum } from 'src/app/enums/apiResultEnum';

@Component({
  selector: "user-role-list",
  templateUrl: "./user-role-list.html"
})
export class UserRoleListComponent implements OnInit {

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

  private tempLazyLoadEvent: LazyLoadEvent;

  cols: PngTableColumn[];
  totalRecords: number;
  userRoleOptions: SelectItem[];
  userRoles: UserRoleListItemModel[];

  @ViewChild('dataTable') dataTable: Table;

  constructor(
    public buttonAccessService: ButtonAccessService,
    private confirmationService: ConfirmationService,
    private consoleMessageService: ConsoleMessageService,
    private dialogMessageService: DialogMessageService,
    private errorService: ErrorService,
    public filterService: FilterService,
    private httpClient: HttpClient,
    private router: Router,
    public selectOptionsService: SelectOptionsService,
    public translate: TranslateService) {

    this.buttonAccessService.assignPermissions([UserPermissionEnum.UserRoles_CanModify]);
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
        applyGlobalFiltering: true,
        replaceWith: 'Id'
      },
      <PngTableColumn>{
        field: 'Actions',
        header: '',
        width: '20%'
      }
    ];

    this.populateMultiSelects();
  }

  public loadUserRolesLazy(event: LazyLoadEvent) {
    this.tempLazyLoadEvent = event;

    this._dataPopulator.userRoles
      .get(event)
      .subscribe(result => this._dataPopulator.userRoles.set(result));
  }

  public onCreate() {
    this.router.navigate([Routes.userRoles.navigations.create]);
  }

  public onDelete(userRole: UserRoleListItemModel) {
    this.confirmationService.confirm(<Confirmation>{
      key: 'deleteUserRole',
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
            this.dialogMessageService.addError(this.errorService.getDefaultErrorMessage());
          }

          console.log(this.consoleMessageService.getConsoleMessageWithResultForEntityAfterDeletion('UserRole', result));
        },
        error: () => {
          this.dialogMessageService.addError(this.errorService.getDefaultErrorMessage());
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

  populateMultiSelects() {
    this._dataPopulator.multiSelects.userRoles
      .get()
      .subscribe(result => this._dataPopulator.multiSelects.userRoles.set(result));
  }

  private setUserRoleMultiSelectData(userRoles: SelectItem[]) {
    this.userRoleOptions = userRoles;

    const userRoleColumn = this.cols.find(c => c.field === "UserRoleName");

    if (userRoleColumn) {
      userRoleColumn.options = this.userRoleOptions;
    }
  }

  private setUserRoles(userRoles: UserRoleListModel) {
    this.totalRecords = userRoles.TotalRowsCount;
    this.userRoles = userRoles.List;
  }
}