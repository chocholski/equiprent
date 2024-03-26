import { Component, OnInit, ViewChild } from "@angular/core";
import { AccessControlComponent } from "../../abstract/access-controls/access-control";
import { RentalListItemModel, RentalListModel } from "src/app/interfaces/rental";
import { ConfirmationService, LazyLoadEvent, SelectItem } from "primeng/api";
import { PngTableColumn } from "src/app/interfaces/png";
import { Table } from "primeng/table";
import { AuthorizationService } from "src/app/services/authorization/authorization.service";
import { ConsoleMessageService } from "src/app/services/messages/console-message.service";
import { DialogMessageService } from "src/app/services/messages/dialog-message.service";
import { ErrorService } from "src/app/services/errors/error.service";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { SelectOptionsService } from "src/app/services/select-options/select-options.service";
import { TranslateService } from "@ngx-translate/core";
import { API_ROUTES } from "src/app/constants/api-routes.constants";
import { UserPermissionEnum } from "src/app/enums/user-permission.enum";
import { FilterTypeEnum } from "src/app/enums/filter-type.enum";
import { ROUTES } from "src/app/constants/routes.constants";
import { FilterService } from "src/app/services/filters/filter.service";

@Component({
  selector: 'rental-list',
  templateUrl: "./rental-list.component.html"
})
export class RentalListComponent
  extends AccessControlComponent<RentalListItemModel>
  implements OnInit {

  protected override deletedEntityInstanceIdentificationInitializer = this.getEntityInstanceName;

  private readonly _dataPopulator = {
    multiSelects: {
      categories: {
        get: () => this.getRentalCategoryMultiSelectData(),
        set: (categories: SelectItem[]) => this.setRentalCategoryMultiSelectData(categories)
      },
      renters: {
        get: () => this.getRenterMultiSelectData(),
        set: (renters: SelectItem[]) => this.setRenterMultiSelectData(renters)
      },
      rentiers: {
        get: () => this.getRentierMultiSelectData(),
        set: (rentiers: SelectItem[]) => this.setRentierMultiSelectData(rentiers)
      },
      usersResponsibleForHandling: {
        get: () => this.getUserResponsibleForHandlingMultiSelectData(),
        set: (users: SelectItem[]) => this.setUserResponsibleForHandlingMultiSelectData(users)
      }
    },
    rentals: {
      get: (event: LazyLoadEvent) => this.getRentals(event),
      set: (rentals: RentalListModel) => this.setRentals(rentals)
    }
  };

  private tempLazyLoadEvent: LazyLoadEvent;

  cols: PngTableColumn[];
  rentalCategoryOptions: SelectItem[];
  rentals: RentalListItemModel[];
  renterOptions: SelectItem[];
  rentierOptions: SelectItem[];
  totalRecords: number;
  userResponsibleForHandlingOptions: SelectItem[];

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
    private readonly selectOptionsService: SelectOptionsService,
    public override readonly translate: TranslateService
  ) {
    super(
      authorizationService,
      confirmationService,
      consoleMessageService,
      'deleteRental',
      API_ROUTES.rental.delete,
      dialogMessageService,
      'Rental',
      errorService,
      httpClient,
      () => {
        this._dataPopulator.rentals
          .get(this.tempLazyLoadEvent)
          .subscribe(result => this._dataPopulator.rentals.set(result));
      },
      router,
      translate,
      [UserPermissionEnum.Rentals_CanModify]);
  }

  ngOnInit() {
    this.cols = [
      <PngTableColumn>{
        field: 'Number',
        header: 'Rental.Number',
        width: '10%',
        filterType: FilterTypeEnum.Text,
        applyGlobalFiltering: true,
      },
      <PngTableColumn>{
        field: 'CategoryName',
        header: 'Rental.CategoryName',
        width: '10%',
        filterType: FilterTypeEnum.Text,
        applyGlobalFiltering: true,
        replaceWith: 'CategoryId'
      },
      <PngTableColumn>{
        field: 'RenterName',
        header: 'Rental.RenterName',
        width: '10%',
        filterType: FilterTypeEnum.Text,
        applyGlobalFiltering: true,
        replaceWith: 'RenterId'
      },
      <PngTableColumn>{
        field: 'RentierName',
        header: 'Rental.RentierName',
        width: '10%',
        filterType: FilterTypeEnum.Text,
        applyGlobalFiltering: true,
        replaceWith: 'RentierId'
      },
      <PngTableColumn>{
        field: 'UserResponsibleForHandlingName',
        header: 'Rental.UserResponsibleForHandlingName',
        width: '10%',
        filterType: FilterTypeEnum.Text,
        applyGlobalFiltering: true,
        replaceWith: 'UserResponsibleForHandlingId'
      },
      <PngTableColumn>{
        field: 'Start',
        header: 'Rental.Start',
        width: '10%',
        filterType: FilterTypeEnum.Date,
      },
      <PngTableColumn>{
        field: 'End',
        header: 'Rental.End',
        width: '10%',
        filterType: FilterTypeEnum.Date,
      },
      <PngTableColumn>{
        field: 'Actions',
        header: '',
        width: '20%'
      }
    ];

    this._dataPopulator.multiSelects.categories
      .get()
      .subscribe(categories => this._dataPopulator.multiSelects.categories.set(categories));

    this._dataPopulator.multiSelects.renters
      .get()
      .subscribe(renters => this._dataPopulator.multiSelects.renters.set(renters));

    this._dataPopulator.multiSelects.rentiers
      .get()
      .subscribe(rentiers => this._dataPopulator.multiSelects.rentiers.set(rentiers));

    this._dataPopulator.multiSelects.usersResponsibleForHandling
      .get()
      .subscribe(users => this._dataPopulator.multiSelects.usersResponsibleForHandling.set(users));
  }

  public loadRentalsLazy(event: LazyLoadEvent) {
    this.tempLazyLoadEvent = event;
    this._dataPopulator.rentals
      .get(event)
      .subscribe(result => this._dataPopulator.rentals.set(result));
  }

  public onCreate() {
    this.router.navigate([ROUTES.rentals.navigations.creation]);
  }

  public onEdit(rental: RentalListItemModel) {
    this.router.navigate([ROUTES.rentals.navigations.edition(rental.Id)]);
  }

  private getEntityInstanceName(rental: RentalListItemModel): string {
    return rental.Number;
  }

  private getRentalCategoryMultiSelectData() {
    return this.selectOptionsService.getRentalCategories();
  }

  private getRentals(event: LazyLoadEvent) {
    event.sortField ??= this.cols[0]?.field;

    return this.httpClient
      .get<RentalListModel>(API_ROUTES.rental.getAll(event, this.cols));
  }

  private getRenterMultiSelectData() {
    return this.selectOptionsService.getRenters();
  }

  private getRentierMultiSelectData() {
    return this.selectOptionsService.getRentiers();
  }

  private getUserResponsibleForHandlingMultiSelectData() {
    return this.selectOptionsService.getUsersResponsibleForHandlingRentals();
  }

  private setRentalCategoryMultiSelectData(categories: SelectItem[]) {
    this.rentalCategoryOptions = categories;
    const rentalCategoryColumn = this.cols.find(c => c.field === "CategoryName");
    if (rentalCategoryColumn) {
      rentalCategoryColumn.options = this.rentalCategoryOptions;
    }
  }

  private setRentals(rentals: RentalListModel) {
    this.totalRecords = rentals.TotalRowsCount;
    this.rentals = rentals.List;
  }

  private setRenterMultiSelectData(renters: SelectItem[]) {
    this.renterOptions = renters;
    const renterColumn = this.cols.find(c => c.field === "RenterName");
    if (renterColumn) {
      renterColumn.options = this.renterOptions;
    }
  }

  private setRentierMultiSelectData(rentiers: SelectItem[]) {
    this.rentierOptions = rentiers;
    const rentierColumn = this.cols.find(c => c.field === "RentierName");
    if (rentierColumn) {
      rentierColumn.options = this.rentierOptions;
    }
  }

  private setUserResponsibleForHandlingMultiSelectData(users: SelectItem[]) {
    this.userResponsibleForHandlingOptions = users;
    const userResponsibleForHandlingColumn = this.cols.find(c => c.field === "UserResponsibleForHandlingName");
    if (userResponsibleForHandlingColumn) {
      userResponsibleForHandlingColumn.options = this.userResponsibleForHandlingOptions;
    }
  }
}