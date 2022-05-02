import { Component, Input, OnInit } from "@angular/core";
import * as json from "config/button.json";
import {
  ThemeButtonsTemplate,
  ThemeButtonTemplate,
} from "interfaces/ThemeTemplate";

@Component({
  selector: "app-button",
  templateUrl: "./button.component.html",
  styleUrls: ["./button.component.css"],
})
export class ButtonComponent implements OnInit {
  @Input()
  text = "ACCEPT";
  @Input()
  disabled: boolean | undefined = true;
  @Input()
  theme = "main";
  class = "";
  themeB: ThemeButtonTemplate | undefined;
  jsonThemes: ThemeButtonsTemplate = json;

  ngOnInit(): void {
    this.themeB = this.jsonThemes[this.theme];
    this.class = `${this.themeB.style} ${this.themeB.state}`;
  }
}
