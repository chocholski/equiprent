import { Component, OnInit, ViewChild } from '@angular/core';
import { PngTableColumn, SearchOperatorEnum } from '../../interfaces/png';
import { UserListItemModel, UserListModel } from 'src/app/interfaces/user';
import { Table } from 'primeng/table';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { PngTableSearchQueryBuilder } from 'src/app/tools/png-table-search-query-builder';
import { FilterService } from '../../services/filter.service';

@Component({
  selector: "user-list",
  templateUrl: "./user-list.html"
})
export class UserListComponent implements OnInit {

  cols: PngTableColumn[];
  users: UserListItemModel[];

  tempLazyLoadEvent: any;
  totalRecords: number;

  @ViewChild('dataTable') dataTable: Table;

  constructor(public filterService: FilterService,
    private httpClient: HttpClient,
    private messageService: MessageService,
    private router: Router,
    public translate: TranslateService) {
  }

  ngOnInit(): void {
    this.cols = [
      { field: 'Login', header: 'User.Login', width: '10%', operator: SearchOperatorEnum.Like },
      { field: 'FirstName', header: 'User.FirstName', width: '20%', operator: SearchOperatorEnum.Like },
      { field: 'LastName', header: 'User.LastName', width: '20%', operator: SearchOperatorEnum.Like },
      { field: 'UserRoleName', header: 'User.UserRoleName', width: '20%', operator: SearchOperatorEnum.Like },
      { field: 'IsActive', header: 'User.IsActive', width: '10%', operator: SearchOperatorEnum.BoolEqual },
      { field: 'Actions', header: '', width: '20%', operator: SearchOperatorEnum.None }
    ];
  }

  loadUsersLazy(event: LazyLoadEvent, dataTable: Table): void {
    this.tempLazyLoadEvent = event;

    setTimeout(() => {
      this.getData(event);
    }, 0);
  }

  getData(event: LazyLoadEvent): void {
    if (!event.sortField) {
      event.sortField = this.cols[0]?.field;
    }

    this.httpClient.get<UserListModel>(`user${new PngTableSearchQueryBuilder(event, this.cols).build()}`)
      .subscribe(result => {
        this.totalRecords = result.TotalRowsCount;
        this.users = result.List;
      });
  }
}