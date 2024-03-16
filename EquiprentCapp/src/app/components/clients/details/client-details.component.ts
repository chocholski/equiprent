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
import { UserPermissionEnum } from "src/app/enums/user-permission.enum";
import { API_ROUTES } from "src/app/constants/api-routes.constants";
import { ClientTypeEnum } from "src/app/enums/client-type.enum";
import { ClientDetailsModel } from "src/app/interfaces/client";
import { AddressComponent } from "../../addresses/address/address.component";
import { CompanyClientAddressComponent } from "../../addresses/company-client-address/company-client-address.component";
import { PrivateClientAddressComponent } from "../../addresses/private-client-address/private-client-address.component";
import { PrivateClientComponent } from "../private-client/private-client.component";
import { AccessControlForm } from "../../abstract/forms/access-control-form";
import { FormModeEnum } from "src/app/enums/form-mode.enum";
import { ROUTES } from "src/app/constants/routes.constants";
import { CLIENT_DETAILS_CONTROL_NAMES } from "./client-details.constants";
import { ADDRESS_CONTROL_NAMES } from "../../addresses/address/address.constants";
import { ClientAddress, Country } from "src/app/interfaces/address";
import { PRIVATE_CLIENT_CONTROL_NAMES } from "../private-client/private-client.constants";
import { PRIVATE_CLIENT_ADDRESS_CONTROL_NAMES } from "../../addresses/private-client-address/private-client-address.constants";
import { COMPANY_CLIENT_ADDRESS_CONTROL_NAMES } from "../../addresses/company-client-address/company-client-address.constants";

@Component({
  selector: "client-details",
  templateUrl: "./client-details.component.html"
})
export class ClientDetailsComponent
  extends AccessControlForm<ClientDetailsModel>
  implements OnInit, AfterViewInit {

  public override readonly beforeSubmitionCustomOperationsHandler = this.prepareClientDetailsModel;

  protected override afterSubmitionCustomOperationsHandler = undefined;
  protected override readonly deletedEntityInstanceIdentificationInitializer = this.getEntityInstanceName;
  protected override readonly entityId: string;

  activeTab: number = 0;
  client: ClientDetailsModel;
  clientTypes: SelectItem[];
  routes = ROUTES;

  readonly clientAddressRequiredFields: string[] = [
    ADDRESS_CONTROL_NAMES.ApartmentNumber,
    ADDRESS_CONTROL_NAMES.City,
    ADDRESS_CONTROL_NAMES.Country,
    ADDRESS_CONTROL_NAMES.PostalCode,
    ADDRESS_CONTROL_NAMES.StreetName,
    ADDRESS_CONTROL_NAMES.StreetNumber
  ];
  readonly clientType: typeof ClientTypeEnum = ClientTypeEnum;

  public override get shouldActionsBeDisabled(): boolean {
    return super.shouldActionsBeDisabled ||
      !this.client ||
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
      API_ROUTES.client.delete,
      dialogMessageService,
      'Client',
      errorService,
      formBuilder,
      httpClient,
      FormModeEnum.Edition,
      router,
      API_ROUTES.client.put,
      translate,
      [UserPermissionEnum.Clients_CanModify],
      ROUTES.clients.navigations.list);

    this.createForm({
      [CLIENT_DETAILS_CONTROL_NAMES.ClientType]: null,
      [CLIENT_DETAILS_CONTROL_NAMES.Name]: ['', Validators.required]
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
    this.router.navigate([ROUTES.clients.navigations.list]);
  }

  public switchActiveTab(tabIndex: number) {
    this.activeTab = tabIndex;
  }

  private getClientNationalId(): string {
    switch (Number(this.form.value.ClientTypeId)) {
      case ClientTypeEnum.Private:
        return this.privateClientAddressForm?.form.value[PRIVATE_CLIENT_ADDRESS_CONTROL_NAMES.NationalCitizenId];
      case ClientTypeEnum.Company:
        return this.companyClientAddressForm?.form.value[COMPANY_CLIENT_ADDRESS_CONTROL_NAMES.NationalCompanyId];
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
      .get<ClientDetailsModel>(API_ROUTES.client.getById(this.entityId))
      .subscribe(result => {
        this.client = result;

        this.updateForm({
          [CLIENT_DETAILS_CONTROL_NAMES.ClientType]: this.client.TypeId.toString(),
          [CLIENT_DETAILS_CONTROL_NAMES.Name]: this.client.Name,
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
      ApartmentNumber: this.addressForm.form.value[ADDRESS_CONTROL_NAMES.ApartmentNumber],
      City: this.addressForm.form.value[ADDRESS_CONTROL_NAMES.City],
      Country: <Country>{
        Id: this.addressForm.form.value[ADDRESS_CONTROL_NAMES.Country],
      },
      Email: this.addressForm.form.value[ADDRESS_CONTROL_NAMES.Email],
      Id: this.addressForm.form.value[ADDRESS_CONTROL_NAMES.Id],
      NationalId: this.getClientNationalId(),
      PhoneNumber: this.addressForm.form.value[ADDRESS_CONTROL_NAMES.PhoneNumber],
      PostalCode: this.addressForm.form.value[ADDRESS_CONTROL_NAMES.PostalCode],
      StreetName: this.addressForm.form.value[ADDRESS_CONTROL_NAMES.StreetName],
      StreetNumber: this.addressForm.form.value[ADDRESS_CONTROL_NAMES.StreetNumber],
    };
    const client = <ClientDetailsModel>{
      Addresses: [clientAddress],
      FirstName: this.privateClientForm?.form.value[PRIVATE_CLIENT_CONTROL_NAMES.FirstName],
      Id: this.client.Id,
      LastName: this.privateClientForm?.form.value[PRIVATE_CLIENT_CONTROL_NAMES.LastName],
      Name: this.form.value[CLIENT_DETAILS_CONTROL_NAMES.Name],
      TypeId: this.form.value[CLIENT_DETAILS_CONTROL_NAMES.ClientType]
    };

    return client;
  }
}