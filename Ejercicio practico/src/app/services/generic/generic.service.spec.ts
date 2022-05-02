import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { AppInjector } from "utils/Injector";

import { GenericService } from "./generic.service";

describe("GenericService", () => {
  let service: GenericService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    }).compileComponents();

    service = TestBed.get(GenericService);
  });

  it("should be created", () => {
    AppInjector.injector = TestBed;
    expect(service).toBeTruthy();
  });
});
