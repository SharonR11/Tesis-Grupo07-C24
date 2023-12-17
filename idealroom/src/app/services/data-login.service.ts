import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,of } from 'rxjs';
import { map,catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class DataLoginService {

  url = 'http://localhost:4000/api/auth/';

  userRoles: string[] = [];

  constructor(private http: HttpClient) { 

  }
  signup(userData: any): Observable<any> {
    return this.http.post<any>(`${this.url}signup`, userData);
  }

  // signin(userData: any): Observable<any> {
  //   return this.http.post<any>(`${this.url}signin`, userData);
  // }
  signin(userData: any): Observable<any> {
    return this.http.post<any>(`${this.url}signin`, userData).pipe(
      map(response => {
        // Verificar si hay datos de usuario y roles en la respuesta
        if (response && response.token && response.user && response.user.roles) {
          // Almacenar los roles del usuario en el servicio
          this.setUserRoles(response.user.roles);
        }
        return response;
      })
    );
  }
  isLoggedIn(): Observable<boolean> {
    const token = localStorage.getItem('token');
    return of(!!token); 
  }
  
  validateToken(token: string): Observable<boolean> {
    // Hacer una solicitud al servidor para validar el token
    // Deberías enviar el token al servidor y manejar la respuesta aquí
    return this.http.post<any>(`${this.url}/validateToken`, { token }).pipe(
      map(response => {
        // Aquí evalúas la respuesta del servidor
        // Si el token es válido, devuelve true; de lo contrario, false
        return response.isValid === true; // Por ejemplo, asumiendo que el servidor responde con un campo isValid
      }),
      catchError(error => {
        // Manejar cualquier error que surja durante la validación del token
        console.error('Error validating token:', error);
        return of(false); // Devolver false en caso de error
      })
    );
  }
  

  logout(): Observable<any> {
    return this.http.post<any>(`${this.url}logout`, {});
  }
  getUserRoles(): string[] {
    return this.userRoles;
  }

  // Método para establecer los roles del usuario
  setUserRoles(roles: string[]): void {
    this.userRoles = roles;
  }
  
}
