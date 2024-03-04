import { Component, OnInit } from "@angular/core";
import { AccessControlFormComponent } from "../abstract/forms/access-control-form";
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
import { ApiRoutes } from "src/app/api-routes";
import { FormModeEnum } from "src/app/enums/form-mode-enum";
import { UserPermissionEnum } from "src/app/enums/user-permission-enum";
import { Routes } from "src/app/routes";
import { RegexPatterns } from "src/app/tools/regexPatterns";
import { StringBuilder } from "src/app/tools/stringBuilder";
import { formatNumber } from "@angular/common";
import { lastValueFrom } from "rxjs";
import { ImageService } from "src/app/services/images/image.service";

@Component({
  selector: "equipment-details",
  templateUrl: "./equipment-details.html"
})
export class EquipmentDetailsComponent
  extends AccessControlFormComponent<EquipmentDetailsModel>
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
      ApiRoutes.equipment.delete,
      dialogMessageService,
      'Equipment',
      errorService,
      formBuilder,
      httpClient,
      FormModeEnum.Edition,
      router,
      ApiRoutes.user.put,
      translate,
      [UserPermissionEnum.Equipments_CanModify],
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

    this.loadEquipment();
  }

  ngOnInit() {
    this.populateDropdowns();
  }

  public onBack() {
    this.router.navigate([Routes.equipments.navigations.list]);
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

    const equipment = this.httpClient
      .get<EquipmentDetailsModel>(ApiRoutes.equipment.getById(this.entityId))
      .subscribe(result => {
        this.equipment = result;

        for (const photo of this.equipment.Photos.filter(photo => photo.ThumbnailFile !== undefined)) {
          photo.ThumbnailUrl = this.imageService.getImageUrlForEncodedFile(photo.ThumbnailFile)!;
        }

        this.updateForm({
          Description: this.equipment.Description,
          ManufacturerId: this.equipment.ManufacturerId,
          MarketValue: formatNumber(this.equipment.MarketValue, this.translate.getDefaultLang(), '1.2-2'),
          Name: this.equipment.Name,
          PricePerDay: formatNumber(this.equipment.PricePerDay, this.translate.getDefaultLang(), '1.2-2'),
          SerialNumber: this.equipment.SerialNumber,
          TypeId: this.equipment.TypeId.toString()
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