import { Component } from "@angular/core";
import { ControlComponent } from "utils/ControlComponent";

@Component({
  selector: "app-input",
  templateUrl: "./input.component.html",
  styleUrls: ["./input.component.css"],
})
export class InputComponent extends ControlComponent {
  constructor() {
    super();
  }
}
