import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { GuardService } from "./guard.service";

describe("GuardService", () => {
  let service: GuardService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
    }).compileComponents();

    service = TestBed.get(GuardService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
