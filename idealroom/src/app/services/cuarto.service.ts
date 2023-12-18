import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable,throwError } from 'rxjs';
import { map,catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CuartoService {

  url = 'http://localhost:4000/api/cuarto/';


  constructor(private http: HttpClient) { 

  }
//   getCuartos(): Observable<any[]> {
//     return this.http.get<any[]>(this.url);
//   }

  getCuartos(): Observable<any[]> {
    const headers = new HttpHeaders().set('Cache-Control', 'no-cache');
    const options = { headers: headers };
    return this.http.get<any[]>(this.url, options);
  }

  
  createCuarto(cuartoData: any): Observable<any> {
    // Agregar el ID del usuario arrendador a los datos del cuarto
    const token = localStorage.getItem('userToken'); // Obtener el token del almacenamiento local
    if (!token) {
      return throwError('No se encontró el token');

    }
     // Obtener el token del almacenamiento local
    const headers = new HttpHeaders({
      'x-access-token': token,
      'Cache-Control': 'no-cache'
    });
    const data = {
      nombre: cuartoData.nombre,
      precio: cuartoData.precio,
      descripcion: cuartoData.descripcion,
      direccion: cuartoData.direccion,
      fotos: cuartoData.fotos, // Asegúrate de que la propiedad 'fotos' exista en cuartoData
      ubicacion: cuartoData.ubicacion, // Asegúrate de que la propiedad 'ubicacion' exista en cuartoData
      disponibilidad: cuartoData.disponibilidad,
      servicios: Array.isArray(cuartoData.servicios) ? cuartoData.servicios.join(', ') : cuartoData.servicios,
      
    };

    // return this.http.post<any>(`${this.url}create`, data);
    return this.http.post<any>(`${this.url}create`, data, { headers }).pipe(
      catchError((error: any) => {
        console.error('Error en la solicitud:', error);
        return throwError('Ocurrió un error al crear el cuarto');
      })
    );
  }
}
