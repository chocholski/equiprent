import { HttpClient } from "@angular/common/http";
import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ConsoleMessageService } from "src/app/services/messages/console-message.service";
import { ErrorService } from "src/app/services/errors/error.service";
import { DialogMessageService } from "src/app/services/messages/dialog-message.service";
import { Router } from "@angular/router";
import { SelectOptionsService } from "src/app/services/select-options/select-options.service";
import { TranslateService } from "@ngx-translate/core";
import { ROUTES } from "src/app/constants/routes.constants";
import { SelectItem } from "primeng/api";
import { ClientTypeEnum } from "src/app/enums/client-type.enum";
import { PrivateClientComponent } from "../private-client/private-client.component";
import { AddressComponent } from "../../addresses/address/address.component";
import { PrivateClientAddressComponent } from "../../addresses/private-client-address/private-client-address.component";
import { CompanyClientAddressComponent } from "../../addresses/company-client-address/company-client-address.component";
import { ClientCreationModel } from "src/app/interfaces/client";
import { API_ROUTES } from "src/app/constants/api-routes.constants";
import { Form } from "../../abstract/forms/form";
import { FormModeEnum } from "src/app/enums/form-mode.enum";
import { CLIENT_CREATE_CONTROL_NAMES } from "./client-create.constants";
import { ADDRESS_CONTROL_NAMES } from "../../addresses/address/address.constants";
import { ClientAddress, Country } from "src/app/interfaces/address";
import { PRIVATE_CLIENT_ADDRESS_CONTROL_NAMES } from "../../addresses/private-client-address/private-client-address.constants";
import { COMPANY_CLIENT_ADDRESS_CONTROL_NAMES } from "../../addresses/company-client-address/company-client-address.constants";
import { PRIVATE_CLIENT_CONTROL_NAMES } from "../private-client/private-client.constants";

@Component({
  selector: "client-create",
  templateUrl: "./client-create.component.html"
})
export class ClientCreationComponent
  extends Form<ClientCreationModel>
  implements OnInit {

  public override readonly beforeSubmitionCustomOperationsHandler = this.prepareClientCreationModel;

  @ViewChild('addressForm') addressForm: AddressComponent;
  @ViewChild('companyClientAddressForm') companyClientAddressForm?: CompanyClientAddressComponent;
  @ViewChild('privateClientAddressForm') privateClientAddressForm?: PrivateClientAddressComponent;
  @ViewChild('privateClientForm') privateClientForm?: PrivateClientComponent;

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
      (this.addressForm?.form.invalid ?? false) ||
      (this.companyClientAddressForm?.form.invalid ?? false) ||
      (this.privateClientAddressForm?.form.invalid ?? false) ||
      (this.privateClientForm?.form.invalid ?? false);
  }

  clientTypes: SelectItem[];

  constructor(
    protected override readonly consoleMessageService: ConsoleMessageService,
    protected override readonly dialogMessageService: DialogMessageService,
    protected override readonly errorService: ErrorService,
    protected override readonly formBuilder: FormBuilder,
    protected override readonly httpClient: HttpClient,
    protected override readonly router: Router,
    private readonly selectOptionsService: SelectOptionsService,
    public override readonly translate: TranslateService) {

    super(
      consoleMessageService,
      dialogMessageService,
      'Client',
      errorService,
      formBuilder,
      httpClient,
      FormModeEnum.Creation,
      router,
      API_ROUTES.client.post,
      translate,
      ROUTES.clients.navigations.list
    );

    this.createForm({
      [CLIENT_CREATE_CONTROL_NAMES.ClientType]: null,
      [CLIENT_CREATE_CONTROL_NAMES.Name]: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.populateDropdowns();
  }

  public onBack() {
    this.router.navigate([ROUTES.clients.navigations.list]);
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

  private populateDropdowns() {
    this.selectOptionsService
      .getClientTypes()
      .subscribe(options => {
        this.clientTypes = options;
      });
  }

  private prepareClientCreationModel(): ClientCreationModel {
    const clientAddress = <ClientAddress>{
      ApartmentNumber: this.addressForm.form.value[ADDRESS_CONTROL_NAMES.ApartmentNumber],
      City: this.addressForm.form.value[ADDRESS_CONTROL_NAMES.City],
      Country: <Country>{
        Id: this.addressForm.form.value[ADDRESS_CONTROL_NAMES.Country]
      },
      Email: this.addressForm.form.value[ADDRESS_CONTROL_NAMES.Email],
      NationalId: this.getClientNationalId(),
      PhoneNumber: this.addressForm.form.value[ADDRESS_CONTROL_NAMES.PhoneNumber],
      PostalCode: this.addressForm.form.value[ADDRESS_CONTROL_NAMES.PostalCode],
      StreetName: this.addressForm.form.value[ADDRESS_CONTROL_NAMES.StreetName],
      StreetNumber: this.addressForm.form.value[ADDRESS_CONTROL_NAMES.StreetNumber],
    };
    const client = <ClientCreationModel>{
      Addresses: [clientAddress],
      FirstName: this.privateClientForm?.form.value[PRIVATE_CLIENT_CONTROL_NAMES.FirstName],
      LastName: this.privateClientForm?.form.value[PRIVATE_CLIENT_CONTROL_NAMES.LastName],
      Name: this.form.value[CLIENT_CREATE_CONTROL_NAMES.Name],
      TypeId: this.form.value[CLIENT_CREATE_CONTROL_NAMES.ClientType],
    };

    return client;
  }
}