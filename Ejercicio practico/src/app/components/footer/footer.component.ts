import { Component, Input, OnInit } from "@angular/core";
import { FormTemplate } from "interfaces/FieldTemplate";
import json from "config/theme.json";
import { ThemesTemplate, ThemeTemplate } from "interfaces/ThemeTemplate";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.css"],
})
export class FooterComponent implements OnInit {
  @Input()
  state!: FormTemplate;
  @Input() align:
    | "justify-start"
    | "justify-end"
    | "justify-between"
    | "justify-center" = "justify-end";
  theme: ThemeTemplate | undefined;
  jsonThemes: ThemesTemplate | undefined;
  style = "";

  getTheme(): void {
    const { theme } = this.state;
    this.jsonThemes = json;
    this.theme = theme ? this.jsonThemes[theme] : this.jsonThemes["default"];
    this.style = `${this.theme?.gutter} w-full`;
  }

  ngOnInit(): void {
    this.state != null && this.getTheme();
  }
}
