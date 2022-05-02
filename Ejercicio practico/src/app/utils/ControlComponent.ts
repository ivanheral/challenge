import { Component, Input, OnInit } from "@angular/core";
import { AbstractControl, FormGroup } from "@angular/forms";
import { FieldTemplate } from "interfaces/FieldTemplate";
import { ThemeTemplate } from "interfaces/ThemeTemplate";

@Component({
  selector: "app-utils",
  template: "",
})
export class ControlComponent implements OnInit {
  @Input()
  form!: FieldTemplate;
  @Input()
  theme: ThemeTemplate | undefined;
  @Input() group: FormGroup = new FormGroup({});
  set Group(group: FormGroup) {
    this.group = group || new FormGroup({});
  }

  public c!: AbstractControl | undefined;

  ngOnInit(): void {
    this.c = this.form?.control
      ? this.group?.controls[this.form?.control]
      : undefined;
  }
}
