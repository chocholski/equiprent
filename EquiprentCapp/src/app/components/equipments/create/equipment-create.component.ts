import { Component, OnInit } from "@angular/core";
import { Form } from "../../abstract/forms/form";
import { EquipmentCreationModel } from "src/app/interfaces/equipment";
import { SelectItem } from "primeng/api";
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
import { RegexPatterns } from "src/app/tools/regexPatterns";
import { EQUIPMENT_CREATE_CONTROL_NAMES } from "./equipment.constants";

@Component({
  selector: "equipment-create",
  templateUrl: "./equipment-create.component.html"
})
export class EquipmentCreationComponent
  extends Form<EquipmentCreationModel>
  implements OnInit {

  public override beforeSubmitionCustomOperationsHandler = this.prepareEquipmentCreationModel;

  manufacturers: SelectItem[];
  types: SelectItem[];

  constructor(
    protected override readonly consoleMessageService: ConsoleMessageService,
    protected override readonly dialogMessageService: DialogMessageService,
    protected override readonly errorService: ErrorService,
    protected override readonly formBuilder: FormBuilder,
    protected override readonly httpClient: HttpClient,
    protected override readonly router: Router,
    private readonly selectOptionsService: SelectOptionsService,
    public override readonly translate: TranslateService
  ) {
    super(
      consoleMessageService,
      dialogMessageService,
      'Equipment',
      errorService,
      formBuilder,
      httpClient,
      FormModeEnum.Creation,
      router,
      API_ROUTES.equipment.post,
      translate,
      ROUTES.equipments.navigations.list
    );

    this.createForm({
      [EQUIPMENT_CREATE_CONTROL_NAMES.Description]: null,
      [EQUIPMENT_CREATE_CONTROL_NAMES.Manufacturer]: null,
      [EQUIPMENT_CREATE_CONTROL_NAMES.MarketValue]: ['', Validators.pattern(RegexPatterns.decimalNumber)],
      [EQUIPMENT_CREATE_CONTROL_NAMES.Name]: ['', Validators.required],
      [EQUIPMENT_CREATE_CONTROL_NAMES.PricePerDay]: ['', Validators.pattern(RegexPatterns.decimalNumber)],
      [EQUIPMENT_CREATE_CONTROL_NAMES.SerialNumber]: ['', Validators.required],
      [EQUIPMENT_CREATE_CONTROL_NAMES.Type]: null
    });
  }

  ngOnInit() {
    this.populateDropdowns();
  }

  public onBack() {
    this.router.navigate([ROUTES.equipments.navigations.list]);
  }

  private populateDropdowns() {

    this.selectOptionsService
      .getManufacturers()
      .subscribe(options => {
        this.manufacturers = options;
      });

    this.selectOptionsService
      .getEquipmentTypes()
      .subscribe(options => {
        this.types = options;
      });
  }

  private prepareEquipmentCreationModel(): EquipmentCreationModel {
    const equipment = <EquipmentCreationModel>{
      Description: this.form.value[EQUIPMENT_CREATE_CONTROL_NAMES.Description],
      ManufacturerId: this.form.value[EQUIPMENT_CREATE_CONTROL_NAMES.Manufacturer],
      MarketValue: this.form.value[EQUIPMENT_CREATE_CONTROL_NAMES.MarketValue].replace(/\s/g, '').replace(',', '.'),
      Name: this.form.value[EQUIPMENT_CREATE_CONTROL_NAMES.Name],
      PricePerDay: this.form.value[EQUIPMENT_CREATE_CONTROL_NAMES.PricePerDay].replace(/\s/g, '').replace(',', '.'),
      SerialNumber: this.form.value[EQUIPMENT_CREATE_CONTROL_NAMES.SerialNumber],
      TypeId: this.form.value[EQUIPMENT_CREATE_CONTROL_NAMES.Type]
    };

    return equipment;
  }
}