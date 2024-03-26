import { Component, OnInit, ViewChild } from '@angular/core';
import { PngTableColumn } from '../../../interfaces/png';
import { UserSelectListItemModel, UserSelectListModel } from 'src/app/interfaces/user';
import { Table } from 'primeng/table';
import { HttpClient } from '@angular/common/http';
import { LazyLoadEvent, SelectItem } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { FilterService } from '../../../services/filters/filter.service';
import { SelectOptionsService } from 'src/app/services/select-options/select-options.service';
import { API_ROUTES } from 'src/app/constants/api-routes.constants';
import { UserPermissionEnum } from 'src/app/enums/user-permission.enum';
import { AuthorizationService } from 'src/app/services/authorization/authorization.service';
import { FilterTypeEnum } from 'src/app/enums/filter-type.enum';
import { AccessControlSelectListComponent } from '../../abstract/access-controls/access-control-select-list';
import { SelectResult } from 'src/app/interfaces/selection';
import { StringBuilder } from 'src/app/tools/stringBuilder';

@Component({
  selector: "user-select-list",
  templateUrl: "./user-select-list.component.html"
})
export class UserSelectListComponent
  extends AccessControlSelectListComponent<UserSelectListItemModel>
  implements OnInit {

  protected override selectionHandler = this.userSelectionHandler;

  private readonly _dataPopulator = {
    multiSelects: {
      userRoles: {
        get: () => this.getUserRoleMultiSelectData(),
        set: (userRoles: SelectItem[]) => this.setUserRoleMultiSelectData(userRoles)
      }
    },
    users: {
      get: (event: LazyLoadEvent) => this.getUsers(event),
      set: (users: UserSelectListModel) => this.setUsers(users)
    }
  };

  private tempLazyLoadEvent: LazyLoadEvent;

  cols: PngTableColumn[];
  totalRecords: number;
  userRoles: SelectItem[];
  users: UserSelectListItemModel[];

  @ViewChild('dataTable') dataTable: Table;

  constructor(
    protected override readonly authorizationService: AuthorizationService,
    public readonly filterService: FilterService,
    private readonly httpClient: HttpClient,
    public readonly selectOptionsService: SelectOptionsService,
    public readonly translate: TranslateService
  ) {
    super(
      authorizationService,
      [UserPermissionEnum.Users_CanList]);
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

  private getUserRoleMultiSelectData() {
    return this.selectOptionsService.getUserRoles();
  }

  private getUsers(event: LazyLoadEvent) {
    event.sortField ??= this.cols[0]?.field;
    return this.httpClient
      .get<UserSelectListModel>(API_ROUTES.user.select(event, this.cols, this.ignoredIds as string[]));
  }

  private userSelectionHandler(user: UserSelectListItemModel): SelectResult {
    return <SelectResult>{
      Id: user.Id,
      Name: new StringBuilder(user.LastName)
        .append(' ')
        .append(user.FirstName)
        .toString()
    };
  }

  private setUserRoleMultiSelectData(userRoles: SelectItem[]) {
    this.userRoles = userRoles;
    const userRoleColumn = this.cols.find(c => c.field === "UserRoleName");
    if (userRoleColumn) {
      userRoleColumn.options = this.userRoles;
    }
  }

  private setUsers(users: UserSelectListModel) {
    this.totalRecords = users.TotalRowsCount;
    this.users = users.List;
  }
}