import { HttpClient } from "@angular/common/http";
import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ConsoleMessageService } from "src/app/services/messages/console-message.service";
import { ErrorService } from "src/app/services/errors/error.service";
import { DialogMessageService } from "src/app/services/messages/dialog-message.service";
import { Router } from "@angular/router";
import { SelectOptionsService } from "src/app/services/select-options/select-options.service";
import { TranslateService } from "@ngx-translate/core";
import { Routes } from "src/app/routes";
import { SelectItem } from "primeng/api";
import { ClientTypeEnum } from "src/app/enums/client-type-enum";
import { PrivateClientComponent } from "./private-client";
import { AddressComponent } from "../addresses/address";
import { PrivateClientAddressComponent } from "../addresses/private-client-address";
import { CompanyClientAddressComponent } from "../addresses/company-client-address";
import { ClientCreationModel } from "src/app/interfaces/client";
import { ClientAddress, Country, addressFormFields } from "src/app/interfaces/address";
import { ApiRoutes } from "src/app/api-routes";
import { FormComponent } from "../abstract/forms/form";
import { FormModeEnum } from "src/app/enums/form-mode-enum";

@Component({
  selector: "client-create",
  templateUrl: "./client-create.html"
})
export class ClientCreationComponent
  extends FormComponent<ClientCreationModel>
  implements OnInit {

  public override readonly beforeSubmitionCustomOperationsHandler = this.prepareClientCreationModel;

  @ViewChild('addressForm') addressForm: AddressComponent;
  @ViewChild('companyClientAddressForm') companyClientAddressForm?: CompanyClientAddressComponent;
  @ViewChild('privateClientAddressForm') privateClientAddressForm?: PrivateClientAddressComponent;
  @ViewChild('privateClientForm') privateClientForm?: PrivateClientComponent;

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
      ApiRoutes.client.post,
      translate,
      Routes.clients.navigations.list
    );

    this.createForm({
      ClientTypeId: null,
      Name: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.populateDropdowns();
  }

  public onBack() {
    this.router.navigate([Routes.clients.navigations.list]);
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

  private populateDropdowns() {
    this.selectOptionsService
      .getClientTypes()
      .subscribe(options => {
        this.clientTypes = options;
      });
  }

  private prepareClientCreationModel(): ClientCreationModel {
    const clientAddress = <ClientAddress>{
      ApartmentNumber: this.addressForm.form.value.ApartmentNumber,
      City: this.addressForm.form.value.City,
      Country: <Country>{
        Id: this.addressForm.form.value.CountryId
      },
      Email: this.addressForm.form.value.Email,
      NationalId: this.getClientNationalId(),
      PhoneNumber: this.addressForm.form.value.PhoneNumber,
      PostalCode: this.addressForm.form.value.PostalCode,
      StreetName: this.addressForm.form.value.StreetName,
      StreetNumber: this.addressForm.form.value.StreetNumber
    };
    const client = <ClientCreationModel>{
      Addresses: [clientAddress],
      FirstName: this.privateClientForm?.form.value.FirstName,
      LastName: this.privateClientForm?.form.value.LastName,
      Name: this.form.value.Name,
      TypeId: this.form.value.ClientTypeId
    };

    return client;
  }
}