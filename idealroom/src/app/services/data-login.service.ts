import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,of,BehaviorSubject } from 'rxjs';
import { map,catchError } from 'rxjs/operators';
import { UserRoles } from '.././models/user-roles-enum';
@Injectable({
  providedIn: 'root'
})
export class DataLoginService {

  private userRolesSubject = new BehaviorSubject<string[]>([]);
  userRoles$ = this.userRolesSubject.asObservable();
  private userId: string = '';
  url = 'http://localhost:4000/api/auth/';
  private tokenKey = 'userToken';
  private rolesKey = 'userRoles';

  userRoles: string[] = [];

  constructor(private http: HttpClient) { 

  }
  signup(userData: any): Observable<any> {
    return this.http.post<any>(`${this.url}signup`, userData);
  }
  signin(userData: any): Observable<any> {
    const headers = {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    };

    return this.http.post<any>(`${this.url}signin`, userData, { headers }).pipe(
      map(response => {
        if (response && response.token && response.user && response.user.roles) {
          // Almacenar el token y los roles del usuario en localStorage
          localStorage.setItem(this.tokenKey, response.token);
          localStorage.setItem(this.rolesKey, JSON.stringify(response.user.roles));
          localStorage.setItem('userName', response.user.username);
          // Almacenar los roles en el servicio también
          this.setUserRoles(response.user.roles);
        }
        return response;
      })
    );
  }
  // signin(userData: any): Observable<any> {
  //   return this.http.post<any>(`${this.url}signin`, userData).pipe(
  //     map(response => {
  //       if (response && response.token && response.user && response.user.roles) {
  //         // Almacenar los roles del usuario en el servicio
  //         this.setUserRoles(response.user.roles);
  //       }
  //       return response;
  //     })
  //   );
  // }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
  // Método para limpiar el token y los roles almacenados al salir o cerrar sesión
  clearLocalStorage(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.rolesKey);
    this.userRoles = []; // También limpia los roles en el servicio
  }

  // logout(): Observable<any> {
  //   return this.http.post<any>(`${this.url}logout`, {});
  // }
  logout(): Observable<any> {
    const headers = {
      'Authorization': `Bearer ${localStorage.getItem(this.tokenKey)}`
    };
  
    return this.http.post<any>(`${this.url}logout`, {}, { headers }).pipe(
      map(() => {
        // Eliminar el token y roles del localStorage y del servicio
        localStorage.removeItem(this.tokenKey);
        localStorage.removeItem(this.rolesKey);
        this.setUserRoles([]);
        return true;
      }),
      catchError(error => {
        console.error('Error during logout:', error);
        return of(false);
      })
    );
  }
  
  getUserRoles(): string[] {
    return this.userRoles;
  }
  setUserRoles(roles: string[]): void {
    this.userRoles = roles;
    this.userRolesSubject.next(roles); // Actualiza el BehaviorSubject
  }

  // setUserId(userId: string): void {
  //   this.userId = userId;
  // }
  setUserId(userId: string): void {
    this.userId = userId;
    localStorage.setItem('userId', userId); // Almacena el ID del usuario en localStorage
  }

  // getUserId(): string | null {
  //   const userData = localStorage.getItem('userData');
  //   if (userData) {
  //     const parsedData = JSON.parse(userData);
  //     return parsedData.userId; // Ajusta la estructura según cómo se almacena el ID del usuario en tu app
  //   }
  //   return null;
  // }
  getUserId(): string | null {
    const userId = localStorage.getItem('userId');
    if (userId) {
      // Si el ID tiene el formato $oid, extrae el valor del ObjectId
      const parsedUserId = JSON.parse(userId);
      console.log('User ID:', userId);
      return parsedUserId['$oid'];
    }
    console.log('User ID:', userId);
    return null;
    }
  
  getUserName(): string | null {
    const userName = localStorage.getItem('userName');
    console.log('User Name:', userName);
    return userName;
  }
  
  
}
