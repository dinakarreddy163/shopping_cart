import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IsAuthGuard implements CanActivate {
  canActivate() {
    let isAuth = localStorage.getItem("isLogin");
    if(isAuth=="true")  return true;
    else return false;
  }
  
}
