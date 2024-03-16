import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { Table } from 'primeng/table';
import { PngTableColumn } from 'src/app/interfaces/png';
import { UserRoleListItemModel, UserRoleListModel } from 'src/app/interfaces/user-role';
import { FilterService } from 'src/app/services/filters/filter.service';
import { ConfirmationService, LazyLoadEvent, SelectItem } from 'primeng/api';
import { SelectOptionsService } from 'src/app/services/select-options/select-options.service';
import { FilterTypeEnum } from 'src/app/enums/filter-type.enum';
import { API_ROUTES } from 'src/app/constants/api-routes.constants';
import { ConsoleMessageService } from 'src/app/services/messages/console-message.service';
import { ErrorService } from 'src/app/services/errors/error.service';
import { DialogMessageService } from 'src/app/services/messages/dialog-message.service';
import { Router } from '@angular/router';
import { UserPermissionEnum } from 'src/app/enums/user-permission.enum';
import { ROUTES } from 'src/app/constants/routes.constants';
import { AccessControlComponent } from '../../abstract/access-controls/access-control';
import { AuthorizationService } from 'src/app/services/authorization/authorization.service';

@Component({
  selector: "user-role-list",
  templateUrl: "./user-role-list.component.html"
})
export class UserRoleListComponent
  extends AccessControlComponent<UserRoleListItemModel>
  implements OnInit {

  protected override deletedEntityInstanceIdentificationInitializer = this.getEntityInstanceName;

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
    protected override readonly authorizationService: AuthorizationService,
    protected override readonly confirmationService: ConfirmationService,
    protected override readonly consoleMessageService: ConsoleMessageService,
    protected override readonly dialogMessageService: DialogMessageService,
    protected override readonly errorService: ErrorService,
    public readonly filterService: FilterService,
    protected override readonly httpClient: HttpClient,
    protected override readonly router: Router,
    public readonly selectOptionsService: SelectOptionsService,
    public override readonly translate: TranslateService) {

    super(
      authorizationService,
      confirmationService,
      consoleMessageService,
      'deleteUserRole',
      API_ROUTES.userRole.delete,
      dialogMessageService,
      'UserRole',
      errorService,
      httpClient,
      () => {
        this._dataPopulator.userRoles
          .get(this.tempLazyLoadEvent)
          .subscribe(result => this._dataPopulator.userRoles.set(result));
      },
      router,
      translate,
      [UserPermissionEnum.UserRoles_CanModify]);
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

  public loadUserRolesLazy(event: LazyLoadEvent) {
    this.tempLazyLoadEvent = event;

    this._dataPopulator.userRoles
      .get(event)
      .subscribe(result => this._dataPopulator.userRoles.set(result));
  }

  public onCreate() {
    this.router.navigate([ROUTES.userRoles.navigations.creation]);
  }

  public onEdit(userRole: UserRoleListItemModel) {
    this.router.navigate([ROUTES.userRoles.navigations.edition(userRole.Id)]);
  }

  private getEntityInstanceName(userRole: UserRoleListItemModel): string {
    return userRole.Name;
  }

  private getUserRoleMultiSelectData() {
    return this.selectOptionsService.getUserRoles();
  }

  private getUserRoles(event: LazyLoadEvent) {
    event.sortField ??= this.cols[0]?.field;

    return this.httpClient
      .get<UserRoleListModel>(API_ROUTES.userRole.getAll(event, this.cols));
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