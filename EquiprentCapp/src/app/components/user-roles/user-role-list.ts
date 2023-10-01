import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { Table } from 'primeng/table';
import { PngTableColumn } from 'src/app/interfaces/png';
import { UserRoleListItemModel, UserRoleListModel } from 'src/app/interfaces/user-role';
import { FilterService } from 'src/app/services/filter.service';
import { LazyLoadEvent, SelectItem } from 'primeng/api';
import { PngTableSearchQueryBuilder } from 'src/app/tools/png-table-search-query-builder';
import { SelectOptionsService } from 'src/app/services/select-options.service';
import { FilterTypeEnum } from 'src/app/enums/filterTypeEnum';
import { ApiRoutes } from 'src/app/api-routes';

@Component({
  selector: "user-role-list",
  templateUrl: "./user-role-list.html"
})
export class UserRoleListComponent implements OnInit {

  cols: PngTableColumn[];
  tempLazyLoadEvent: LazyLoadEvent;
  totalRecords: number;
  userRoleOptions: SelectItem[];
  userRoles: UserRoleListItemModel[];

  @ViewChild('dataTable') dataTable: Table;

  constructor(public filterService: FilterService,
    private httpClient: HttpClient,
    public selectOptionsService: SelectOptionsService,
    public translate: TranslateService) {
  }

  ngOnInit(): void {
    this.cols = [
      <PngTableColumn>{ field: 'Id', header: 'UserRole.Id', width: '10%', filterType: FilterTypeEnum.Numeric },
      <PngTableColumn>{ field: 'Name', header: 'UserRole.Name', width: '70%', replaceWith: "Id" },
      <PngTableColumn>{ field: 'Actions', header: '', width: '20%' }
    ];

    this.populateMultiSelects();
  }

  getData(event: LazyLoadEvent) {
    if (!event.sortField) {
      event.sortField = this.cols[0]?.field;
    }

    this.httpClient
      .get<UserRoleListModel>(ApiRoutes.userRole.getAll(event, this.cols))
      .subscribe(result => {
        this.totalRecords = result.TotalRowsCount;
        this.userRoles = result.List;
      });
  }

  loadUserRolesLazy(event: LazyLoadEvent) {
    this.tempLazyLoadEvent = event;

    setTimeout(() => {
      this.getData(event);
    }, 0);
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