import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { ConfirmationService, SelectItem } from "primeng/api";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthorizationService } from "src/app/services/authorization/authorization.service";
import { ConsoleMessageService } from "src/app/services/messages/console-message.service";
import { DialogMessageService } from "src/app/services/messages/dialog-message.service";
import { ErrorService } from "src/app/services/errors/error.service";
import { FormBuilder, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { SelectOptionsService } from "src/app/services/select-options/select-options.service";
import { TranslateService } from "@ngx-translate/core";
import { UserPermissionEnum } from "src/app/enums/user-permission-enum";
import { ApiRoutes } from "src/app/api-routes";
import { ClientTypeEnum } from "src/app/enums/client-type-enum";
import { ClientDetailsModel } from "src/app/interfaces/client";
import { AddressComponent } from "../addresses/address";
import { CompanyClientAddressComponent } from "../addresses/company-client-address";
import { PrivateClientAddressComponent } from "../addresses/private-client-address";
import { PrivateClientComponent } from "./private-client";
import { ClientAddress, Country, addressFormFields } from "src/app/interfaces/address";
import { AccessControlFormComponent } from "../abstract/forms/access-control-form";
import { FormModeEnum } from "src/app/enums/form-mode-enum";
import { Routes } from "src/app/routes";

@Component({
  selector: "client-details",
  templateUrl: "./client-details.html"
})
export class ClientDetailsComponent
  extends AccessControlFormComponent<ClientDetailsModel>
  implements OnInit, AfterViewInit {

  public override readonly beforeSubmitionCustomOperationsHandler = this.prepareClientDetailsModel;

  protected override afterSubmitionCustomOperationsHandler = undefined;
  protected override readonly deletedEntityInstanceIdentificationInitializer = this.getEntityInstanceName;
  protected override readonly entityId: string;

  activeTab: number = 0;
  client: ClientDetailsModel;
  clientTypes: SelectItem[];
  routes = Routes;

  readonly clientAddressRequiredFields: string[] = [
    addressFormFields.City,
    addressFormFields.Country,
    addressFormFields.PostalCode,
    addressFormFields.StreetName,
    addressFormFields.StreetNumber
  ];
  readonly clientType: typeof ClientTypeEnum = ClientTypeEnum;

  public override get shouldActionsBeDisabled(): boolean {
    return super.shouldActionsBeDisabled ||
      (this.addressForm?.form.invalid ?? false) ||
      (this.companyClientAddressForm?.form.invalid ?? false) ||
      (this.privateClientAddressForm?.form.invalid ?? false) ||
      (this.privateClientForm?.form.invalid ?? false);
  }

  @ViewChild('addressForm') addressForm: AddressComponent;
  @ViewChild('companyClientAddressForm') companyClientAddressForm?: CompanyClientAddressComponent;
  @ViewChild('privateClientAddressForm') privateClientAddressForm?: PrivateClientAddressComponent;
  @ViewChild('privateClientForm') privateClientForm?: PrivateClientComponent;

  constructor(
    protected override readonly activatedRoute: ActivatedRoute,
    protected override readonly authorizationService: AuthorizationService,
    protected override readonly confirmationService: ConfirmationService,
    protected override readonly consoleMessageService: ConsoleMessageService,
    protected override readonly dialogMessageService: DialogMessageService,
    protected override readonly errorService: ErrorService,
    protected override readonly formBuilder: FormBuilder,
    protected override readonly httpClient: HttpClient,
    protected override readonly router: Router,
    private readonly selectOptionsService: SelectOptionsService,
    public override readonly translate: TranslateService) {

    super(
      activatedRoute,
      authorizationService,
      confirmationService,
      consoleMessageService,
      'deleteClient',
      ApiRoutes.client.delete,
      dialogMessageService,
      'Client',
      errorService,
      formBuilder,
      httpClient,
      FormModeEnum.Edition,
      router,
      ApiRoutes.client.put,
      translate,
      [UserPermissionEnum.Clients_CanModify],
      Routes.clients.navigations.list);

    this.createForm({
      ClientTypeId: null,
      Name: ['', Validators.required]
    });

    this.loadClient();
  }

  ngOnInit() {
    this.populateDropdowns();
  }

  ngAfterViewInit(): void {
    const activeTab = this.activatedRoute.snapshot.params['activeTab'];
    if (activeTab) {
      this.switchActiveTab(Number(activeTab));
    }
  }

  public onBack() {
    this.router.navigate([Routes.clients.navigations.list]);
  }

  public switchActiveTab(tabIndex: number) {
    this.activeTab = tabIndex;
  }

  private getClientNationalId(): string {
    switch (Number(this.form.value.ClientTypeId)) {
      case ClientTypeEnum.Private:
        return this.privateClientAddressForm?.form.value.NationalCitizenId;
      case ClientTypeEnum.Company:
        return this.companyClientAddressForm?.form.value.NationalCompanyId;
      default:
        return '';
    }
  }

  private getEntityInstanceName(): string {
    return this.client.Name;
  }

  private loadClient() {
    if (!this.entityId)
      return;

    this.httpClient
      .get<ClientDetailsModel>(ApiRoutes.client.getById(this.entityId))
      .subscribe(result => {
        this.client = result;

        this.updateForm({
          ClientTypeId: this.client.TypeId.toString(),
          Name: this.client.Name,
        });
      });
  }

  private populateDropdowns() {
    this.selectOptionsService
      .getClientTypes()
      .subscribe(options => {
        this.clientTypes = options;
      });
  }

  private prepareClientDetailsModel(): ClientDetailsModel {
    const clientAddress = <ClientAddress>{
      ApartmentNumber: this.addressForm.form.value.ApartmentNumber,
      City: this.addressForm.form.value.City,
      Country: <Country>{
        Id: this.addressForm.form.value.CountryId
      },
      Email: this.addressForm.form.value.Email,
      Id: this.addressForm.form.value.Id,
      NationalId: this.getClientNationalId(),
      PhoneNumber: this.addressForm.form.value.PhoneNumber,
      PostalCode: this.addressForm.form.value.PostalCode,
      StreetName: this.addressForm.form.value.StreetName,
      StreetNumber: this.addressForm.form.value.StreetNumber
    };
    const client = <ClientDetailsModel>{
      Addresses: [clientAddress],
      FirstName: this.privateClientForm?.form.value.FirstName,
      Id: this.client.Id,
      LastName: this.privateClientForm?.form.value.LastName,
      Name: this.form.value.Name,
      TypeId: this.form.value.ClientTypeId
    };

    return client;
  }
}