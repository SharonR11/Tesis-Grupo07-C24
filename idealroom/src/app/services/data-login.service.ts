import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
