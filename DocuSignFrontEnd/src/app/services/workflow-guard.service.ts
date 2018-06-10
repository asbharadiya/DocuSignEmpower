import { Injectable } from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { ContractDataService } from './contract-data.service';

@Injectable()
export class WorkflowGuard implements CanActivate {

  constructor(private router: Router, private contractDataService: ContractDataService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const path: string = route.routeConfig.path;
    return this.verifyWorkFlow(path);
  }

  verifyWorkFlow(path): boolean {
    if (path === 'information' && this.contractDataService.getTemplate() === '') {
      this.router.navigate(['/home/template']);
      return false;
    } else if (path === 'done' && !this.contractDataService.isInfoValid()) {
      this.router.navigate(['/home/template']);
      return false;
    }
    return true;
  }
}
