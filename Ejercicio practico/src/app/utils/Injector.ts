import { Injector } from "@angular/core";

export class AppInjector {
  static injector: Injector;

  static setInjector(injector: Injector): void {
    AppInjector.injector = injector;
  }

  static getInjector(): Injector {
    return AppInjector.injector;
  }
}
