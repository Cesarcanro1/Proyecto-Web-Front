import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../core/services/auth/auth';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {

    const expectedRole: string = route.data['role'];
    const currentRole: string | null = localStorage.getItem('role');

    console.log("Rol requerido:", expectedRole);
    console.log("Rol actual:", currentRole);

    if (currentRole && expectedRole === currentRole) {
      return true;
    }

    this.router.navigate(['/forbidden']);
    return false;
  }
}
