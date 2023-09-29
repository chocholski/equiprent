import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { Table } from 'primeng/table';
import { PngTableColumn } from 'src/app/interfaces/png';
import { UserRoleListItemModel, UserRoleListModel } from 'src/app/interfaces/user-role';
import { FilterService } from 'src/app/services/filter.service';
import { LazyLoadEvent } from 'primeng/api';
import { PngTableSearchQueryBuilder } from 'src/app/tools/png-table-search-query-builder';
import { SearchOperatorEnum } from 'src/app/enums/searchOperatorEnum';

@Component({
  selector: "user-role-list",
  templateUrl: "./user-role-list.html"
})
export class UserRoleListComponent implements OnInit {

  cols: PngTableColumn[];
  tempLazyLoadEvent: LazyLoadEvent;
  totalRecords: number;
  userRoles: UserRoleListItemModel[];

  @ViewChild('dataTable') dataTable: Table;

  constructor(public filterService: FilterService,
    private httpClient: HttpClient,
    public translate: TranslateService) {
  }

  ngOnInit(): void {
    this.cols = [
      <PngTableColumn>{ field: 'Id', header: 'UserRole.Id', width: '10%', operator: SearchOperatorEnum.Like },
      <PngTableColumn>{ field: 'Name', header: 'UserRole.Name', width: '70%', operator: SearchOperatorEnum.Like },
      <PngTableColumn>{ field: 'Actions', header: '', width: '20%', operator: SearchOperatorEnum.None }
    ];
  }

  getData(event: LazyLoadEvent) {
    if (!event.sortField) {
      event.sortField = this.cols[0]?.field;
    }

    this.httpClient
      .get<UserRoleListModel>(`userRole${new PngTableSearchQueryBuilder(event, this.cols).create()}`)
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
}