import { ChangeDetectorRef, Component, ViewChild } from "@angular/core";
import { ModalComponent } from "components/modal/modal.component";
import * as jsonModalPersonal from "./config/modal.json";
import {
  FormOutPutTemplate,
  FormTemplate,
  PatternTemplate,
} from "interfaces/FieldTemplate";
import { BaseComponent } from "utils/BaseComponent";
import { FormService } from "services/form/form.service";
import { FormComponent } from "components/form/form.component";
import { TaskTemplate } from "interfaces/TaskTemplate";
@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.css"],
})
export class MainComponent extends BaseComponent {
  @ViewChild("modal") modal: ModalComponent | undefined;
  @ViewChild("form_modal") formModal: FormComponent | undefined;
  templateModalPersonal: FormTemplate = jsonModalPersonal;
  data: any;
  form!: PatternTemplate;

  constructor(
    private cdr: ChangeDetectorRef,
    private formService: FormService
  ) {
    super();
    this.loadData();
    this.formService.getForm().subscribe((form: FormOutPutTemplate) => {
      // Escuchamos cualquier formulario modificado
      this.form = form.fields;
    });
  }

  add(): void {
    this.modal?.open();
  }

  addTask() {
    const { title, description } = this.form;
    this.data.push({
      id: Math.floor(Math.random() * 100),
      title,
      description,
    });
    // Cerramos la modal
    this.modal?.close();
    // Reseteamos el formulario de la modal
    this.formModal?.reset();
  }

  async loadData(): Promise<void> {
    // Recuperamos los datos
    this.data = await this.get("todos");
    // Obtenemos los 3 primeros
    this.data = this.data.slice(0, 3);
    this.cdr.detectChanges();
  }

  getId(num: number) {
    // Retornamos el id y eliminamos la tarea
    this.data = this.data.filter((item: TaskTemplate) => item.id !== num);
  }
}
