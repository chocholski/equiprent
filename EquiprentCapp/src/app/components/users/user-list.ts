import { Component, OnInit, ViewChild } from '@angular/core';
import { PngTableColumn } from '../../interfaces/png';
import { UserListItemModel, UserListModel } from 'src/app/interfaces/user';
import { Table } from 'primeng/table';
import { HttpClient } from '@angular/common/http';
import { Confirmation, ConfirmationService, LazyLoadEvent, Message, MessageService, SelectItem } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { FilterService } from '../../services/filter.service';
import { SelectOptionsService } from 'src/app/services/select-options.service';
import { ApiRoutes } from 'src/app/api-routes';
import { Router } from '@angular/router';
import { StringBuilder } from 'src/app/tools/stringBuilder';
import { ButtonAccessService } from 'src/app/services/buttonAccessService';
import { UserPermissionEnum } from 'src/app/enums/userPermissionEnum';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: "user-list",
  templateUrl: "./user-list.html"
})
export class UserListComponent implements OnInit {

  cols: PngTableColumn[];
  tempLazyLoadEvent: LazyLoadEvent;
  totalRecords: number;
  userRoleOptions: SelectItem[];
  users: UserListItemModel[];

  @ViewChild('dataTable') dataTable: Table;

  constructor(
    public buttonAccessService: ButtonAccessService,
    private confirmationService: ConfirmationService,
    private errorService: ErrorService,
    public filterService: FilterService,
    private httpClient: HttpClient,
    private messageService: MessageService,
    private router: Router,
    public selectOptionsService: SelectOptionsService,
    public translate: TranslateService) {

    this.buttonAccessService.assignPermissions([UserPermissionEnum.Users_CanModify]);
  }

  ngOnInit() {
    this.cols = [
      <PngTableColumn>{
        field: 'Login',
        header: 'User.Login',
        width: '10%',
        applyGlobalFiltering: true
      },
      <PngTableColumn>{
        field: 'FirstName',
        header: 'User.FirstName',
        width: '20%',
        applyGlobalFiltering: true
      },
      <PngTableColumn>{
        field: 'LastName',
        header: 'User.LastName',
        width: '20%',
        applyGlobalFiltering: true
      },
      <PngTableColumn>{
        field: 'UserRoleName',
        header: 'User.UserRoleName',
        width: '20%',
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

    this.populateMultiSelects();
  }

  getData(event: LazyLoadEvent) {
    if (!event.sortField) {
      event.sortField = this.cols[0]?.field;
    }

    this.httpClient
      .get<UserListModel>(ApiRoutes.user.getAll(event, this.cols))
      .subscribe(result => {
        this.totalRecords = result.TotalRowsCount;
        this.users = result.List;
      });
  }

  loadUsersLazy(event: LazyLoadEvent) {
    this.tempLazyLoadEvent = event;

    setTimeout(() => {
      this.getData(event);
    }, 0);
  }

  onCreate() {
    this.router.navigate(['home/users/create']);
  }

  onDelete(user: UserListItemModel) {
    this.confirmationService.confirm(<Confirmation>{
      key: 'deleteUser',
      message: `${this.translate.instant('User.DeletionConfirmation')} '${new StringBuilder(user.LastName).append(' ').append(user.FirstName).toString()}'?`,
      accept: () => {
        this.httpClient
          .delete<string>(ApiRoutes.user.delete(user.Id))
          .subscribe({
            next: result => {
              if (result === "OK") {
                this.messageService.add(<Message>{ severity: 'success', summary: this.translate.instant('User.Deleted') });
                this.getData(this.tempLazyLoadEvent);
              }
              else {
                this.messageService.add(<Message>{ severity: 'error', summary: this.errorService.getDefaultErrorMessage() });
              }

              console.log(`The user has been deleted with result: ${result}`);
            },
            error: e => {
              this.messageService.add(<Message>{ severity: 'error', summary: this.errorService.getDefaultErrorMessage() });
            }
          });
      }
    });
  }

  onEdit(user: UserListItemModel) {
    this.router.navigate([`home/users/edit/${user.Id}`]);
  }

  populateMultiSelects() {
    this.selectOptionsService.getUserRoles().subscribe(options => {
      this.userRoleOptions = options;

      const userRoleField = this.cols.find(c => c.field == "UserRoleName");

      if (userRoleField) {
        userRoleField.options = this.userRoleOptions;
      }
    });
  }
}