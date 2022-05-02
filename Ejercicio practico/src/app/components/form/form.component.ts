import { Component, OnInit, Input } from "@angular/core";
import {
  FormGroup,
  FormControl,
  AbstractControl,
  FormArray,
  Validators,
} from "@angular/forms";
import {
  FieldTemplate,
  FormTemplate,
  PatternTemplate,
} from "interfaces/FieldTemplate";
import { BaseComponent } from "utils/BaseComponent";
import json from "config/theme.json";
import { ThemesTemplate, ThemeTemplate } from "interfaces/ThemeTemplate";
import { FormService } from "services/form/form.service";

@Component({
  selector: "app-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.css"],
})
export class FormComponent extends BaseComponent implements OnInit {
  @Input()
  state!: FormTemplate;
  formGroup!: FormGroup;
  formTemplate!: FormTemplate;
  theme: ThemeTemplate | undefined;
  jsonThemes: ThemesTemplate | undefined;
  fieldsNull!: PatternTemplate;

  constructor(private fservice: FormService) {
    super();
  }

  getTheme(): void {
    const { theme } = this.state;
    this.jsonThemes = json;
    this.theme = theme ? this.jsonThemes[theme] : this.jsonThemes["default"];
  }

  getClass(f: FieldTemplate): string {
    const className = f.class ? f.class : "w-full";
    const classGutter = `${className}`;

    return classGutter;
  }

  ngOnInit(): void {
    if (this.state != null) {
      this.getTheme();
      const group: { [key: string]: AbstractControl } = {};
      this.formTemplate = this.state;

      this.formTemplate.fields.forEach((field_template: FieldTemplate) => {
        const { control, type, value } = field_template;
        if (control) {
          if (type !== "multicheckbox" && type !== "multiselect") {
            group[control] = new FormControl(
              value,
              this.addValidators(field_template)
            );
          } else {
            group[control] = new FormArray(
              value && value instanceof Array
                ? value?.map((v: string) => new FormControl(v))
                : [],
              this.addValidators(field_template)
            );
          }
        }
      });
      this.formGroup = new FormGroup(group);
    }
    this.fieldsNull = this.formGroup?.value;
    this.formControlValueChanged();
    // this.formGroup.markAllAsTouched();
  }

  dirty(): boolean {
    return this.formGroup.dirty;
  }

  valid(): boolean {
    return this.formGroup.valid;
  }

  reset(): void {
    // warning! Resetear formarray
    for (const field in this.formGroup.controls) {
      try {
        (this.formGroup.get(field) as FormArray).clear();
      } catch (error) {
        /** */
      }
    }
    this.formGroup.reset(this.fieldsNull, { onlySelf: true, emitEvent: false });
  }

  updateForm(backup: PatternTemplate): void {
    this.formTemplate.fields.map((field: FieldTemplate) => {
      this.updateField(field.control, backup[field.control]);
    });
  }

  getPosition(control: string): number {
    let pos = 0;
    this.formTemplate.fields.map((field: FieldTemplate, index: number) => {
      if (field.control === control) pos = index;
    });
    return pos;
  }

  changeForm(control: string, show: boolean): void {
    this.formTemplate.fields[this.getPosition(control)].show = show;
  }

  updateData(control: string, data: any): void {
    this.formTemplate.fields[this.getPosition(control)].data = data;
  }

  changeRequired(control: string, required: boolean): void {
    required
      ? this.formGroup.controls[control].removeValidators(Validators.required)
      : this.formGroup.controls[control].addValidators(Validators.required);
    !required ? this.formGroup.controls[control].setValue(null) : null;
    this.formGroup.controls[control].updateValueAndValidity({
      emitEvent: false,
    });
  }

  updateField(control: string, field: any): void {
    try {
      this.formGroup.controls[control].setValue(field);
      this.formGroup.controls[control].updateValueAndValidity({
        emitEvent: true,
      });
      this.formGroup.controls[control].markAsTouched();
    } catch (error) {
      const data: FormArray = new FormArray(
        field && field instanceof Array
          ? [...field.map((item: string) => new FormControl(item))]
          : []
      );
      this.formGroup.setControl(control, data);
    }
  }

  formControlValueChanged(): void {
    // warning: los componentes custom no funcionan correctamente
    let old = { ...this.formGroup.value };
    let key: string | null | undefined = null;
    this.formGroup.valueChanges.subscribe((res) => {
      key = Object.keys(res).find(
        (k) => JSON.stringify(res[k]) != JSON.stringify(old[k])
      );
      old = { ...this.formGroup.value };
    });

    this.formGroup?.valueChanges.subscribe((value: PatternTemplate) => {
      key &&
        this.fservice.notify({
          nameForm: this.formTemplate.name,
          valid: this.formGroup.valid,
          controlChanged: key,
          fields: value,
        });
    });
  }
}
