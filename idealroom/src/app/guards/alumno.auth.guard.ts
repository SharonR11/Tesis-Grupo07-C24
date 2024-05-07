import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserRoles } from '.././models/user-roles-enum';
import { DataLoginService } from '../../app/services/data-login.service';

@Injectable({
  providedIn: 'root'
})
export class AlumnoAuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private dataLoginService: DataLoginService
  ) {}

  canActivate(): boolean {
    const userRoles = this.dataLoginService.getUserRoles();
    const isAuthenticated = this.dataLoginService.getToken();

    if (isAuthenticated && userRoles.includes(UserRoles.ESTUDIANTE)) {
      return true; // Permite el acceso si está autenticado y es alumno
    } else {
      this.router.navigate(['/']); // Redirige a una ruta por defecto si no cumple las condiciones
      return false;
    }
  }
}
