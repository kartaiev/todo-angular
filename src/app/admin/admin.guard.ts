import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  private isLogged: boolean;

  constructor(private authService: AuthService, private router: Router) {
    this.authService.isLogged$.subscribe(isLogged => this.isLogged = isLogged);
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.isLogged) {
      return true;
    } else {
      return this.router.parseUrl('/login');
    }
  }


}
