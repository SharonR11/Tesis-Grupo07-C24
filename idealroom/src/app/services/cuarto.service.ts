import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
    return this.http.post<any>(this.url, cuartoData);
  }
}
