import { Injectable } from "@angular/core";
import { FormOutPutTemplate } from "interfaces/FieldTemplate";
import { Observable, Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class FormService {
  private form$: Subject<FormOutPutTemplate> =
    new Subject<FormOutPutTemplate>();

  constructor() {
    /** */
  }

  getForm(): Observable<FormOutPutTemplate> {
    return this.form$.asObservable();
  }

  notify(dataForm: FormOutPutTemplate): void {
    this.form$.next(dataForm);
  }
}
