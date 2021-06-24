import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";

export interface CanCompopnentDeactivate {
    canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

export class canDeactivateGuard implements CanDeactivate<CanCompopnentDeactivate>{
    canDeactivate(component: CanCompopnentDeactivate, 
        urrentRoute: ActivatedRouteSnapshot, 
        currentState: RouterStateSnapshot,
        nextState?: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
            return component.canDeactivate();
    }
}