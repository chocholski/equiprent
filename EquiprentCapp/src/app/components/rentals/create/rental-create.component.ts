import { Component, OnInit, ViewChild } from "@angular/core";
import { Form } from "../../abstract/forms/form";
import { RentalCreationModel } from "src/app/interfaces/rental";
import { ConsoleMessageService } from "src/app/services/messages/console-message.service";
import { DialogMessageService } from "src/app/services/messages/dialog-message.service";
import { ErrorService } from "src/app/services/errors/error.service";
import { FormBuilder, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { SelectOptionsService } from "src/app/services/select-options/select-options.service";
import { TranslateService } from "@ngx-translate/core";
import { FormModeEnum } from "src/app/enums/form-mode.enum";
import { API_ROUTES } from "src/app/constants/api-routes.constants";
import { ROUTES } from "src/app/constants/routes.constants";
import { RENTAL_CREATE_CONTROL_NAMES } from "./rental-create.constants";
import { SelectItem } from "primeng/api";
import { DateService } from "src/app/services/dates/date.service";
import { SelectResult } from "src/app/interfaces/selection";
import { Menus } from "src/app/layout/services/menus";
import { IconsService } from "src/app/services/icons/icons.service";
import { RentalCreationCalendarComponent } from "./calendar/rental-create-calendar.component";

@Component({
  selector: "rental-create",
  templateUrl: "./rental-create.component.html"
})
export class RentalCreationComponent
  extends Form<RentalCreationModel>
  implements OnInit {

  public override beforeSubmitionCustomOperationsHandler = this.prepareRentalCreationModel;

  public readonly Menus: typeof Menus = Menus;

  categories: SelectItem[];
  displayEquipmentSelectionDialog = false;
  displayRenterSelectionDialog = false;
  displayRentierSelectionDialog = false;
  displayUserSelectionDialog = false;

  private readonly _startDateIndex = 0;
  private readonly _endDateIndex = 1;

  @ViewChild('calendar') calendar: RentalCreationCalendarComponent;

  constructor(
    protected override readonly consoleMessageService: ConsoleMessageService,
    private readonly dateService: DateService,
    protected override readonly dialogMessageService: DialogMessageService,
    protected override readonly errorService: ErrorService,
    protected override readonly formBuilder: FormBuilder,
    protected override readonly httpClient: HttpClient,
    public readonly iconsService: IconsService,
    protected override readonly router: Router,
    private readonly selectOptionsService: SelectOptionsService,
    public override readonly translate: TranslateService
  ) {
    super(
      consoleMessageService,
      dialogMessageService,
      'Rental',
      errorService,
      formBuilder,
      httpClient,
      FormModeEnum.Creation,
      router,
      API_ROUTES.rental.post,
      translate,
      ROUTES.rentals.navigations.list
    );

    this.createForm({
      [RENTAL_CREATE_CONTROL_NAMES.Category]: null,
      [RENTAL_CREATE_CONTROL_NAMES.Equipment]: null,
      [RENTAL_CREATE_CONTROL_NAMES.EquipmentName]: ['', Validators.required],
      [RENTAL_CREATE_CONTROL_NAMES.Renter]: null,
      [RENTAL_CREATE_CONTROL_NAMES.RenterName]: ['', Validators.required],
      [RENTAL_CREATE_CONTROL_NAMES.Rentier]: null,
      [RENTAL_CREATE_CONTROL_NAMES.RentierName]: ['', Validators.required],
      [RENTAL_CREATE_CONTROL_NAMES.StartEnd]: undefined,
      [RENTAL_CREATE_CONTROL_NAMES.UserResponsibleForHandling]: null,
      [RENTAL_CREATE_CONTROL_NAMES.UserResponsibleForHandlingName]: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.populateDropdowns();
  }

  public onBack() {
    this.router.navigate([ROUTES.rentals.navigations.list]);
  }

  public onSelectedEquipment(equipment: SelectResult) {
    if (!equipment.Id)
      return;

    this.displayEquipmentSelectionDialog = false;
    this.form.patchValue({
      [RENTAL_CREATE_CONTROL_NAMES.Equipment]: equipment.Id,
      [RENTAL_CREATE_CONTROL_NAMES.EquipmentName]: equipment.Name,
    });
    this.calendar.onSelectedEquipment(equipment.Id as string);
  }

  public onSelectedRenter(renter: SelectResult) {
    if (!renter.Id)
      return;

    this.displayRenterSelectionDialog = false;
    this.form.patchValue({
      [RENTAL_CREATE_CONTROL_NAMES.Renter]: renter.Id,
      [RENTAL_CREATE_CONTROL_NAMES.RenterName]: renter.Name,
    });
  }

  public onSelectedRentier(rentier: SelectResult) {
    if (!rentier.Id)
      return;

    this.displayRentierSelectionDialog = false;
    this.form.patchValue({
      [RENTAL_CREATE_CONTROL_NAMES.Rentier]: rentier.Id,
      [RENTAL_CREATE_CONTROL_NAMES.RentierName]: rentier.Name,
    });
  }

  public onSelectedUserResponsibleForHandling(user: SelectResult) {
    if (!user.Id)
      return;

    this.displayUserSelectionDialog = false;
    this.form.patchValue({
      [RENTAL_CREATE_CONTROL_NAMES.UserResponsibleForHandling]: user.Id,
      [RENTAL_CREATE_CONTROL_NAMES.UserResponsibleForHandlingName]: user.Name,
    });
  }

  private populateDropdowns() {
    this.selectOptionsService
      .getRentalCategories()
      .subscribe(result => this.categories = result);
  }

  private prepareRentalCreationModel(): RentalCreationModel {
    const startEndRange = this.form.value[RENTAL_CREATE_CONTROL_NAMES.StartEnd];
    const rental = <RentalCreationModel>{
      CategoryId: this.form.value[RENTAL_CREATE_CONTROL_NAMES.Category],
      End: this.dateService.getDateFromCalendar(startEndRange[this._endDateIndex]),
      EquipmentId: this.form.value[RENTAL_CREATE_CONTROL_NAMES.Equipment],
      RenterId: this.form.value[RENTAL_CREATE_CONTROL_NAMES.Renter],
      RentierId: this.form.value[RENTAL_CREATE_CONTROL_NAMES.Rentier],
      Start: this.dateService.getDateFromCalendar(startEndRange[this._startDateIndex]),
      UserResponsibleForHandlingId: this.form.value[RENTAL_CREATE_CONTROL_NAMES.UserResponsibleForHandling],
    };
    return rental;
  }
}