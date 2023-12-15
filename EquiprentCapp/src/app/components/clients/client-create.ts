import { HttpClient } from "@angular/common/http";
import { Component, OnInit, ViewChild } from "@angular/core";
import { FormComponent } from "../abstract/form";
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
import { ClientAddress, addressFormFields } from "src/app/interfaces/address";
import { ApiRoutes } from "src/app/api-routes";
import { ApiResultEnum } from "src/app/enums/api-result-enum";

@Component({
  selector: "client-create",
  templateUrl: "./client-create.html"
})
export class ClientCreationComponent
  extends FormComponent
  implements OnInit {

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

  clientTypes: SelectItem[];

  constructor(
    private consoleMessageService: ConsoleMessageService,
    private dialogMessageService: DialogMessageService,
    private errorService: ErrorService,
    protected override formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private router: Router,
    private selectOptionsService: SelectOptionsService,
    public translate: TranslateService) {

    super(formBuilder);
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

  public onSubmit() {
    this.isExecuting = true;

    const clientAddress = <ClientAddress>{
      ApartmentNumber: this.addressForm.form.value.ApartmentNumber,
      City: this.addressForm.form.value.City,
      CountryId: this.addressForm.form.value.CountryId,
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

    this.postClient(client);
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

  private postClient(client: ClientCreationModel) {
    this.httpClient
      .post<string>(ApiRoutes.client.post, client)
      .subscribe({
        next: result => {
          switch (result) {
            case ApiResultEnum[ApiResultEnum.OK]:
              this.router.navigate([Routes.clients.navigations.list]);
              this.dialogMessageService.addSuccess(this.translate.instant('Client.Created'));
              break;

            default:
              this.dialogMessageService.addError(this.errorService.getDefaultErrorMessage());
              break;
          }

          console.log(this.consoleMessageService.getConsoleMessageWithResultForEntityAfterCreation('Client', result));
        },
        error: e => {
          this.dialogMessageService.addError(this.errorService.getFirstTranslatedErrorMessage(e));
        },
        complete: () => {
          this.isExecuting = false;
        }
      });
  }
}