import { CUSTOM_ELEMENTS_SCHEMA, Injector, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
// Forms
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { FormComponent } from "components/form/form.component";

import {
  TranslateLoader,
  TranslateModule,
  TranslateService,
} from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
// utils
import { BaseComponent } from "utils/BaseComponent";
import { ControlComponent } from "utils/ControlComponent";
import { AppInjector } from "utils/Injector";
// components
import { ValidatorComponent } from "components/validator/validator.component";
import { MenuComponent } from "components/menu/menu.component";
import { TexTaskComponent } from "components/textarea/textarea.component";
import { ButtonComponent } from "components/button/button.component";
import { ModalComponent } from "components/modal/modal.component";
import { InputComponent } from "components/input/input.component";
// services
import { GenericService } from "services/generic/generic.service";
import { StorageService } from "services/storage/storage.service";
import { GuardService } from "services/guard/guard.service";
import { FormService } from "services/form/form.service";
import { MainComponent } from "pages/main/main.component";
import { FooterComponent } from "components/footer/footer.component";
import { TaskComponent } from "./components/task/task.component";

@NgModule({
  declarations: [
    AppComponent,
    BaseComponent,
    ButtonComponent,
    ControlComponent,
    FooterComponent,
    FormComponent,
    InputComponent,
    MainComponent,
    MenuComponent,
    ModalComponent,
    TexTaskComponent,
    ValidatorComponent,
    TaskComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => {
          return new TranslateHttpLoader(http);
        },
        deps: [HttpClient],
      },
    }),
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    FormService,
    GenericService,
    GuardService,
    HttpClient,
    StorageService,
    TranslateService,
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {
  static InjectorInstance: Injector;

  constructor(injector: Injector) {
    AppInjector.setInjector(injector);
  }
}
