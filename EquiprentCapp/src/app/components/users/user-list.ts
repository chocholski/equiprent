import { Component, OnInit, ViewChild } from '@angular/core';
import { PngTableColumn } from '../../interfaces/png';
import { UserListItemModel, UserListModel } from 'src/app/interfaces/user';
import { Table } from 'primeng/table';
import { HttpClient } from '@angular/common/http';
import { LazyLoadEvent } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { PngTableSearchQueryBuilder } from 'src/app/tools/png-table-search-query-builder';
import { FilterService } from '../../services/filter.service';
import { SearchOperatorEnum } from 'src/app/enums/searchOperatorEnum';

@Component({
  selector: "user-list",
  templateUrl: "./user-list.html"
})
export class UserListComponent implements OnInit {

  cols: PngTableColumn[];
  tempLazyLoadEvent: LazyLoadEvent;
  totalRecords: number;
  users: UserListItemModel[];

  @ViewChild('dataTable') dataTable: Table;

  constructor(public filterService: FilterService,
    private httpClient: HttpClient,
    public translate: TranslateService) {
  }

  ngOnInit() {
    this.cols = [
      <PngTableColumn>{ field: 'Login', header: 'User.Login', width: '10%', operator: SearchOperatorEnum.Like },
      <PngTableColumn>{ field: 'FirstName', header: 'User.FirstName', width: '20%', operator: SearchOperatorEnum.Like },
      <PngTableColumn>{ field: 'LastName', header: 'User.LastName', width: '20%', operator: SearchOperatorEnum.Like },
      <PngTableColumn>{ field: 'UserRoleName', header: 'User.UserRoleName', width: '20%', operator: SearchOperatorEnum.None },
      <PngTableColumn>{ field: 'IsActive', header: 'User.IsActive', width: '10%', operator: SearchOperatorEnum.BoolEqual },
      <PngTableColumn>{ field: 'Actions', header: '', width: '20%', operator: SearchOperatorEnum.None }
    ];
  }

  getData(event: LazyLoadEvent) {
    if (!event.sortField) {
      event.sortField = this.cols[0]?.field;
    }

    this.httpClient
      .get<UserListModel>(`user${new PngTableSearchQueryBuilder(event, this.cols).create()}`)
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
}