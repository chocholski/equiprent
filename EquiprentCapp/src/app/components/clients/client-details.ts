import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { AccessControlFormComponent } from "../abstract/accessControlFormComponent";
import { Confirmation, ConfirmationService, SelectItem } from "primeng/api";
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
import { Routes } from "src/app/routes";
import { ApiRoutes } from "src/app/api-routes";
import { ApiResultEnum } from "src/app/enums/api-result-enum";
import { ClientTypeEnum } from "src/app/enums/client-type-enum";
import { ClientDetailsModel } from "src/app/interfaces/client";
import { AddressComponent } from "../addresses/address";
import { CompanyClientAddressComponent } from "../addresses/company-client-address";
import { PrivateClientAddressComponent } from "../addresses/private-client-address";
import { PrivateClientComponent } from "./private-client";
import { ClientAddress } from "src/app/interfaces/address";

@Component({
  selector: "client-details",
  templateUrl: "./client-details.html"
})
export class ClientDetailsComponent
  extends AccessControlFormComponent
  implements OnInit, AfterViewInit {

  @ViewChild('addressForm') addressForm: AddressComponent;
  @ViewChild('companyClientAddressForm') companyClientAddressForm?: CompanyClientAddressComponent;
  @ViewChild('privateClientAddressForm') privateClientAddressForm?: PrivateClientAddressComponent;
  @ViewChild('privateClientForm') privateClientForm?: PrivateClientComponent;

  readonly clientType: typeof ClientTypeEnum = ClientTypeEnum;

  private clientId: string;

  activeTab: number = 0;
  client: ClientDetailsModel;
  clientTypes: SelectItem[];
  routes = Routes;

  constructor(
    private activatedRoute: ActivatedRoute,
    protected override authorizationService: AuthorizationService,
    private confirmationService: ConfirmationService,
    private consoleMessageService: ConsoleMessageService,
    private dialogMessageService: DialogMessageService,
    private errorService: ErrorService,
    protected override formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private router: Router,
    private selectOptionsService: SelectOptionsService,
    public translate: TranslateService
  ) {
    super(authorizationService, formBuilder, [UserPermissionEnum.Clients_CanModify]);

    this.clientId = this.activatedRoute.snapshot.params["id"];
    this.isDisabled = true;

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

  public onDelete() {
    this.confirmationService.confirm(<Confirmation>{
      key: 'deleteUser',
      message: `${this.translate.instant('Client.DeletionConfirmation')} '${this.client.Name}'?`,
      accept: () => {
        this.isExecuting = true;
        this.deleteClient();
      }
    });
  }

  public onSubmit() {
    this.isExecuting = true;

    const clientAddress = <ClientAddress>{
      ApartmentNumber: this.addressForm.form.value.ApartmentNumber,
      City: this.addressForm.form.value.City,
      CountryId: this.addressForm.form.value.CountryId,
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

    this.putClient(client);
  }

  switchActiveTab(tabIndex: number) {
    this.activeTab = tabIndex;
  }

  private deleteClient() {
    this.httpClient
      .delete<string>(ApiRoutes.client.delete(this.client.Id))
      .subscribe({
        next: result => {
          if (result === ApiResultEnum[ApiResultEnum.OK]) {
            this.dialogMessageService.addSuccess(this.translate.instant('Client.Deleted'));
            this.router.navigate([Routes.clients.navigations.list]);
          }
          else {
            this.dialogMessageService.addError(this.errorService.getDefaultErrorMessage());
          }

          console.log(this.consoleMessageService.getConsoleMessageWithResultForEntityAfterDeletion('Client', result));
        },
        error: e => {
          this.dialogMessageService.addError(this.errorService.getFirstTranslatedErrorMessage(e));
        },
        complete: () => {
          this.isExecuting = false;
        }
      });
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

  private loadClient() {
    if (!this.clientId)
      return;

    this.httpClient
      .get<ClientDetailsModel>(ApiRoutes.client.getById(this.clientId))
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

  private putClient(client: ClientDetailsModel) {
    this.httpClient
      .put<string>(ApiRoutes.client.put, client)
      .subscribe({
        next: result => {
          if (result === ApiResultEnum[ApiResultEnum.OK]) {
            this.router.navigate([Routes.clients.navigations.list]);
            this.dialogMessageService.addSuccess(this.translate.instant('Client.Updated'));
          }

          console.log(this.consoleMessageService.getConsoleMessageWithResultForEntityAfterUpdate('Client', result));
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