import { Component, OnInit } from "@angular/core";
import { AccessControlForm } from "../../abstract/forms/access-control-form";
import { EquipmentDetailsModel } from "src/app/interfaces/equipment";
import { ConfirmationService, SelectItem } from "primeng/api";
import { ActivatedRoute, Router } from "@angular/router";
import { ConsoleMessageService } from "src/app/services/messages/console-message.service";
import { DialogMessageService } from "src/app/services/messages/dialog-message.service";
import { ErrorService } from "src/app/services/errors/error.service";
import { FormBuilder, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { SelectOptionsService } from "src/app/services/select-options/select-options.service";
import { TranslateService } from "@ngx-translate/core";
import { AuthorizationService } from "src/app/services/authorization/authorization.service";
import { API_ROUTES } from "src/app/constants/api-routes.constants";
import { FormModeEnum } from "src/app/enums/form-mode.enum";
import { UserPermissionEnum } from "src/app/enums/user-permission.enum";
import { ROUTES } from "src/app/constants/routes.constants";
import { RegexPatterns } from "src/app/tools/regexPatterns";
import { StringBuilder } from "src/app/tools/stringBuilder";
import { formatNumber } from "@angular/common";
import { ImageService } from "src/app/services/images/image.service";
import { EQUIPMENT_DETAILS_CONTROL_NAMES } from "./equipment-details.constants";

@Component({
  selector: "equipment-details",
  templateUrl: "./equipment-details.component.html"
})
export class EquipmentDetailsComponent
  extends AccessControlForm<EquipmentDetailsModel>
  implements OnInit {

  public override beforeSubmitionCustomOperationsHandler = this.prepareEquipmentDetailsModel;

  protected override afterSubmitionCustomOperationsHandler = undefined;
  protected override deletedEntityInstanceIdentificationInitializer = this.getEntityInstanceName;
  protected override entityId: string;

  equipment: EquipmentDetailsModel;
  manufacturers: SelectItem[];
  types: SelectItem[];

  public override get shouldActionsBeDisabled(): boolean {
    return super.shouldActionsBeDisabled ||
      !this.equipment;
  }

  constructor(
    protected override readonly activatedRoute: ActivatedRoute,
    protected override readonly authorizationService: AuthorizationService,
    protected override confirmationService: ConfirmationService,
    protected override readonly consoleMessageService: ConsoleMessageService,
    protected override readonly dialogMessageService: DialogMessageService,
    protected override readonly errorService: ErrorService,
    protected override readonly formBuilder: FormBuilder,
    protected override readonly httpClient: HttpClient,
    private readonly imageService: ImageService,
    protected override readonly router: Router,
    private readonly selectOptionsService: SelectOptionsService,
    public override readonly translate: TranslateService
  ) {
    super(
      activatedRoute,
      authorizationService,
      confirmationService,
      consoleMessageService,
      'deleteEquipment',
      API_ROUTES.equipment.delete,
      dialogMessageService,
      'Equipment',
      errorService,
      formBuilder,
      httpClient,
      FormModeEnum.Edition,
      router,
      API_ROUTES.user.put,
      translate,
      [UserPermissionEnum.Equipments_CanModify],
      ROUTES.equipments.navigations.list
    );

    this.createForm({
      [EQUIPMENT_DETAILS_CONTROL_NAMES.Description]: null,
      [EQUIPMENT_DETAILS_CONTROL_NAMES.Manufacturer]: null,
      [EQUIPMENT_DETAILS_CONTROL_NAMES.MarketValue]: ['', Validators.pattern(RegexPatterns.decimalNumber)],
      [EQUIPMENT_DETAILS_CONTROL_NAMES.Name]: ['', Validators.required],
      [EQUIPMENT_DETAILS_CONTROL_NAMES.PricePerDay]: ['', Validators.pattern(RegexPatterns.decimalNumber)],
      [EQUIPMENT_DETAILS_CONTROL_NAMES.SerialNumber]: ['', Validators.required],
      [EQUIPMENT_DETAILS_CONTROL_NAMES.Type]: null
    });

    this.loadEquipment();
  }

  ngOnInit() {
    this.populateDropdowns();
  }

  public onBack() {
    this.router.navigate([ROUTES.equipments.navigations.list]);
  }

  private getEntityInstanceName(): string {
    return new StringBuilder(this.equipment.Name)
      .append(' ')
      .append(this.equipment.SerialNumber)
      .toString();
  }

  private loadEquipment() {
    if (!this.entityId)
      return;

    this.httpClient
      .get<EquipmentDetailsModel>(API_ROUTES.equipment.getById(this.entityId))
      .subscribe(result => {
        this.equipment = result;

        for (const photo of this.equipment.Photos.filter(photo => photo.ThumbnailFile !== undefined)) {
          photo.ThumbnailUrl = this.imageService.getImageUrlForEncodedFile(photo.ThumbnailFile)!;
        }

        this.updateForm({
          [EQUIPMENT_DETAILS_CONTROL_NAMES.Description]: this.equipment.Description,
          [EQUIPMENT_DETAILS_CONTROL_NAMES.Manufacturer]: this.equipment.ManufacturerId,
          [EQUIPMENT_DETAILS_CONTROL_NAMES.MarketValue]: formatNumber(this.equipment.MarketValue, this.translate.getDefaultLang(), '1.2-2'),
          [EQUIPMENT_DETAILS_CONTROL_NAMES.Name]: this.equipment.Name,
          [EQUIPMENT_DETAILS_CONTROL_NAMES.PricePerDay]: formatNumber(this.equipment.PricePerDay, this.translate.getDefaultLang(), '1.2-2'),
          [EQUIPMENT_DETAILS_CONTROL_NAMES.SerialNumber]: this.equipment.SerialNumber,
          [EQUIPMENT_DETAILS_CONTROL_NAMES.Type]: this.equipment.TypeId.toString()
        });
      });
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

  private prepareEquipmentDetailsModel(): EquipmentDetailsModel {
    const equipment = <EquipmentDetailsModel>{
      Description: this.form.value[EQUIPMENT_DETAILS_CONTROL_NAMES.Description],
      ManufacturerId: this.form.value[EQUIPMENT_DETAILS_CONTROL_NAMES.Manufacturer],
      MarketValue: this.form.value[EQUIPMENT_DETAILS_CONTROL_NAMES.MarketValue].replace(/\s/g, '').replace(',', '.'),
      Name: this.form.value[EQUIPMENT_DETAILS_CONTROL_NAMES.Name],
      PricePerDay: this.form.value[EQUIPMENT_DETAILS_CONTROL_NAMES.PricePerDay].replace(/\s/g, '').replace(',', '.'),
      SerialNumber: this.form.value[EQUIPMENT_DETAILS_CONTROL_NAMES.SerialNumber],
      TypeId: this.form.value[EQUIPMENT_DETAILS_CONTROL_NAMES.Type]
    };

    return equipment;
  }
}