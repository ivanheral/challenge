import { Component, Input, OnInit } from "@angular/core";
import { AbstractControl } from "@angular/forms";
import {
  FieldTemplate,
  JsonValidatorTemplate,
  ValidatorJsonTemplate,
  ValidatorTemplate,
} from "interfaces/FieldTemplate";
import { BaseComponent } from "utils/BaseComponent";
// config validators
import jsonValidators from "config/validators";

@Component({
  selector: "app-validator",
  templateUrl: "./validator.component.html",
  styleUrls: ["./validator.component.css"],
})
export class ValidatorComponent extends BaseComponent implements OnInit {
  @Input()
  control: AbstractControl | undefined;
  @Input()
  field!: FieldTemplate;
  protected json: JsonValidatorTemplate = jsonValidators;

  constructor() {
    super();
  }
  ngOnInit(): void {
    /** */
  }

  getMessage(validator: ValidatorTemplate): string {
    const { type } = validator;
    const typeValidator: ValidatorJsonTemplate = this.json[type];
    return typeValidator.message;
  }

  reviewValidator(validator: ValidatorTemplate): boolean {
    const { type } = validator;
    const typeValidator: ValidatorJsonTemplate = this.json[type];
    const pattern = this.control?.errors?.pattern?.requiredPattern;
    const required = this.control?.errors?.required;
    const requiredLength = this.control?.errors?.minlength?.requiredLength;
    const actualLength = this.control?.errors?.minlength?.actualLength;

    if (!this.control?.errors) {
      return false;
    } else
      return (
        (required && validator.type === "required") ||
        (typeValidator.type === "pattern" && pattern) ||
        (typeValidator.type === "minLength" && actualLength < requiredLength) ||
        (typeValidator.type === "maxLength" && actualLength > requiredLength)
      );
  }
}
