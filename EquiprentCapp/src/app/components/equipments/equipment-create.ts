import { Component, OnInit } from "@angular/core";
import { FormComponent } from "../abstract/forms/form";
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
import { FormModeEnum } from "src/app/enums/form-mode-enum";
import { ApiRoutes } from "src/app/api-routes";
import { Routes } from "src/app/routes";
import { RegexPatterns } from "src/app/tools/regexPatterns";

@Component({
  selector: "equipment-create",
  templateUrl: "./equipment-create.html"
})
export class EquipmentCreationComponent
  extends FormComponent<EquipmentCreationModel>
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
      ApiRoutes.equipment.post,
      translate,
      Routes.equipments.navigations.list
    );

    this.createForm({
      Description: null,
      ManufacturerId: null,
      MarketValue: ['', Validators.pattern(RegexPatterns.decimalNumber)],
      Name: ['', Validators.required],
      PricePerDay: ['', Validators.pattern(RegexPatterns.decimalNumber)],
      SerialNumber: ['', Validators.required],
      TypeId: null
    });
  }

  ngOnInit() {
    this.populateDropdowns();
  }

  public onBack() {
    this.router.navigate([Routes.equipments.navigations.list]);
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
      Description: this.form.value.Description,
      ManufacturerId: this.form.value.ManufacturerId,
      MarketValue: this.form.value.MarketValue.replace(/\s/g, '').replace(',', '.'),
      Name: this.form.value.Name,
      PricePerDay: this.form.value.PricePerDay.replace(/\s/g, '').replace(',', '.'),
      SerialNumber: this.form.value.SerialNumber,
      TypeId: this.form.value.TypeId
    };

    return equipment;
  }
}