import { Injectable } from '@angular/core';
import { BehaviorSubject,Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  private url = 'http://localhost:4000/api/auth'; // Aquí define tu URL de autenticación

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(private http: HttpClient) {
    // Verificar si el usuario ya está autenticado (por ejemplo, mediante almacenamiento local)
    const token = localStorage.getItem('token');
    if (token) {
      this.loggedIn.next(true);
    }
  }



  login() {
    this.loggedIn.next(true);
    localStorage.setItem('token', 'YOUR_TOKEN_HERE');
  }

  logout() {
    localStorage.removeItem('token');
    this.loggedIn.next(false);
  }
  authenticate(email: string, password: string): Observable<any> {
    // Hacer la solicitud al servidor para autenticar al usuario
    // Utiliza el HttpClient para realizar una solicitud al endpoint de autenticación
    return this.http.post<any>(`${this.url}/signin`, { email, password }).pipe(
      map(response => {
        // Verificar la respuesta del servidor y establecer el estado de autenticación si es exitosa
        if (response && response.token) {
          // Establecer el estado de autenticación como verdadero
          this.loggedIn.next(true);
          // Almacenar el token en el almacenamiento local
          localStorage.setItem('token', response.token);
        }
        return response;
      })
    );
  }
}
