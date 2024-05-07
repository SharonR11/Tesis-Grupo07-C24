import { Injectable } from '@angular/core';
import { BehaviorSubject,Observable } from 'rxjs';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  //private url = 'http://localhost:4000/api/auth'; // Aquí define tu URL de autenticación
  private url = 'http://localhost:8090/api/auth';

  constructor(private http: HttpClient) {
    // Verificar si hay un token almacenado al inicio
    this.checkToken();
  }
  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }
  // constructor(private http: HttpClient) {
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     this.loggedIn.next(true);
  //   }
  // }

  private checkToken() {
    const token = localStorage.getItem('token');
    if (token) {
      // Si hay un token, establecer loggedIn a true
      this.loggedIn.next(true);
    }
  }
  signupArrendador(data: any): Observable<any> {
    return this.http.post<any>(`${this.url}/signup-arrendador`, data);
  }

  signupEstudiante(data: any): Observable<any> {
    return this.http.post<any>(`${this.url}/signup-estudiante`, data);
  }

  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post<any>(`${this.url}/login`, credentials).pipe(
      map(response => {
        // Login exitoso si hay un token en la respuesta
        if (response && response.token) {
          // Guardar token en el almacenamiento local
          localStorage.setItem('token', response.token);
          this.loggedIn.next(true);
        }
        return response;
      })
    );
  }

  // logout(): Observable<any> {
  //   // Borrar token del almacenamiento local
  //   localStorage.removeItem('token');
  //   this.loggedIn.next(false);
  //   return this.http.post<any>(`${this.url}/logout`, {});
  // }
  logout(): Observable<any> {
    // Obtener el token del almacenamiento local
    const token = localStorage.getItem('token');

    // Verificar si hay un token almacenado
    if (!token) {
      // Si no hay token, retornar un observable con un mensaje de error
      return new Observable(observer => {
        observer.error('No hay token almacenado');
        observer.complete();
      });
    }

    // Construir los encabezados de la solicitud con el token
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };

    // Hacer la solicitud de cierre de sesión con los encabezados
    return this.http.post<any>(`${this.url}/logout`, {}, httpOptions).pipe(
      map(() => {
        // Borrar token del almacenamiento local
        localStorage.removeItem('token');
        // Establecer loggedIn a false
        this.loggedIn.next(false);
        return { message: 'Sesión cerrada exitosamente' };
      })
    );
  }





  // login() {
  //   this.loggedIn.next(true);
  //   localStorage.setItem('token', 'YOUR_TOKEN_HERE');
  // }

  // logout() {
  //   localStorage.removeItem('token');
  //   this.loggedIn.next(false);
  // }
  // authenticate(email: string, password: string): Observable<any> {
  //   // Hacer la solicitud al servidor para autenticar al usuario
  //   // Utiliza el HttpClient para realizar una solicitud al endpoint de autenticación
  //   return this.http.post<any>(`${this.url}/signin`, { email, password }).pipe(
  //     map(response => {
  //       // Verificar la respuesta del servidor y establecer el estado de autenticación si es exitosa
  //       if (response && response.token) {
  //         // Establecer el estado de autenticación como verdadero
  //         this.loggedIn.next(true);
  //         // Almacenar el token en el almacenamiento local
  //         localStorage.setItem('token', response.token);
  //       }
  //       return response;
  //     })
  //   );
  // }
}
