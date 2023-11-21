import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormComponent } from "../abstract/formComponent";
import { FormBuilder } from "@angular/forms";
import { ConsoleMessageService } from "src/app/services/messages/console-message.service";
import { ErrorService } from "src/app/services/errors/error.service";
import { DialogMessageService } from "src/app/services/messages/dialog-message.service";
import { Router } from "@angular/router";
import { SelectOptionsService } from "src/app/services/select-options/select-options.service";
import { TranslateService } from "@ngx-translate/core";
import { Routes } from "src/app/routes";
import { SelectItem } from "primeng/api";

@Component({
  selector: "client-create",
  templateUrl: "./client-create.html"
})
export class ClientCreationComponent
  extends FormComponent
  implements OnInit {

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

    this.createForm();
  }

  ngOnInit() {
    this.populateDropdowns();
  }

  public onBack() {
    this.router.navigate([Routes.clients.navigations.list]);
  }

  public onSubmit() {
    this.isExecuting = true;
  }

  private populateDropdowns() {

    this.selectOptionsService
      .getClientTypes()
      .subscribe(options => {
        this.clientTypes = options;
      });
  }
}