import { Component, Input, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "deletion-dialog",
  templateUrl: "./deletion-dialog.component.html"
})
export class DeletionDialogComponent
  implements OnInit {

  @Input('deletionKey') deletionKey?: string;

  constructor(
    public translate: TranslateService) {
  }

  ngOnInit() {
  }
}