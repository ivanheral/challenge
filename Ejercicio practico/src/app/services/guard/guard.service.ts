import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class GuardService implements CanActivate {
  constructor(private router: Router) {
    /** */
  }

  canActivate(): //route: ActivatedRouteSnapshot,
  //state: RouterStateSnapshot
  boolean {
    //console.log(route);
    //console.log(state);
    //console.log(this.router);
    if (environment.production) {
      // this.router.navigate(["404"]);
    }
    return true;
  }
}
