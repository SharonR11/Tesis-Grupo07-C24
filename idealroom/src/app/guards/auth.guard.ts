import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserRoles } from '.././models/user-roles-enum';
import { DataLoginService } from '../../app/services/data-login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard   {
  constructor(
    private dataLoginService: DataLoginService, 
    private router: Router) {}

  // canActivate(): boolean {
  //   if (!this.dataLoginService.getToken() || !this.dataLoginService.getUserRoles()) {
  //     this.router.navigate(['/login']);
  //     return false;
  //   }
  canActivate(): boolean {
    const userRoles = this.dataLoginService.getUserRoles();
    const isAuthenticated = this.dataLoginService.getToken();

    if (isAuthenticated && userRoles.includes(UserRoles.Alumno)) {
      return true; // Permite el acceso si está autenticado y es alumno
    } else {
      this.router.navigate(['/']); // Redirige a una ruta por defecto si no cumple las condiciones
      return false;
    }
  }

  //   const userRoles = this.dataLoginService.getUserRoles();

  //   if (userRoles.includes(UserRoles.Admin)) {
  //     return this.canActivateAdmin();
  //   } else if (userRoles.includes(UserRoles.Arrendador)) {
  //     return this.canActivateArrendador();
  //   } else if (userRoles.includes(UserRoles.Alumno)) {
  //     return this.canActivateAlumno();
  //   }

  //   // Si no tiene roles válidos, redirigir a una ruta por defecto o bloquear el acceso
  //   this.router.navigate(['/']);
  //   return false;
  // }

  // canActivateAdmin(): boolean {
  //   // Verificar si el usuario tiene permisos de admin y redirigir al dashboard
  //   if (this.dataLoginService.hasAdminPermissions()) {
  //     this.router.navigate(['/dashboard']);
  //     return true;
  //   }
  //   // Si no tiene permisos de admin, redirigir a una ruta por defecto o bloquear el acceso
  //   this.router.navigate(['/']);
  //   return false;
  // }

  // canActivateArrendador(): boolean {
  //   if (this.dataLoginService.hasArrendadorPermissions()) {
  //     // Aquí, limita el acceso a ciertas páginas para el rol de arrendador
  //     if (this.router.url === '/crear-cuarto' || this.router.url === '/modificar-cuarto') {
  //       return true;
  //     } else {
  //       // Redirige a una ruta por defecto si intenta acceder a una ruta no permitida
  //       this.router.navigate(['/crear-cuarto']);
  //       return false;
  //     }
  //   }
  //   this.router.navigate(['/']);
  //   return false;
  // }

  // canActivateAlumno(): boolean {
  //   if (this.dataLoginService.hasAlumnoPermissions()) {
  //     // Aquí, limita el acceso a ciertas páginas para el rol de alumno
  //     if (
  //       this.router.url === '/listar-cuartos' ||
  //       this.router.url === '/detalle-cuarto' ||
  //       this.router.url === '/reserva-cuarto'
  //     ) {
  //       return true;
  //     } else {
  //       // Redirige a una ruta por defecto si intenta acceder a una ruta no permitida
  //       this.router.navigate(['/listar-cuartos']);
  //       return false;
  //     }
  //   }
  //   this.router.navigate(['/']);
  //   return false;
  // }
}

