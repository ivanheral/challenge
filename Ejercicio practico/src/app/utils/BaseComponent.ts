import { Component } from "@angular/core";
import { ValidatorFn, Validators } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import {
  FieldTemplate,
  JsonValidatorTemplate,
  ValidatorJsonTemplate,
  ValidatorTemplate,
} from "interfaces/FieldTemplate";
import { GenericService } from "services/generic/generic.service";
import { StorageService } from "services/storage/storage.service";
import { AppInjector } from "./Injector";
// config validators
import jsonValidators from "config/validators";

@Component({
  selector: "app-utils",
  template: "",
})
export class BaseComponent {
  protected t: TranslateService;
  protected s: GenericService;
  protected storage: StorageService;
  protected json: JsonValidatorTemplate = jsonValidators;

  constructor() {
    const injector = AppInjector.getInjector();
    this.t = injector.get(TranslateService);
    this.s = injector.get(GenericService);
    this.storage = injector.get(StorageService);
    this.t.setDefaultLang("es");
    this.t.use("es");
  }

  async get(url: string): Promise<any> {
    return await this.s.get(url);
  }

  async post(url: string): Promise<void> {
    await this.s.get(url);
  }

  async put(url: string): Promise<void> {
    await this.s.get(url);
  }

  async delete(url: string): Promise<void> {
    await this.s.get(url);
  }

  addValidators(field: FieldTemplate): Array<ValidatorFn> {
    const validators: ValidatorFn[] = [];
    if (field.validators) {
      field.validators.map((validator: ValidatorTemplate) => {
        const { type, value } = validator;
        const typeValidator: ValidatorJsonTemplate = this.json[type];
        if (typeValidator) {
          const { type, message, pattern } = typeValidator;
          type == "required" && validators.push(Validators.required);
          type == "pattern" &&
            pattern &&
            validators.push(Validators.pattern(pattern));
          value &&
            validators.push(
              type === "maxLength"
                ? Validators.maxLength(value)
                : Validators.minLength(value)
            );
          validator.message = message;
        }
      });
    }
    return validators;
  }
}
