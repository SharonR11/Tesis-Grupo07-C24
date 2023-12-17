import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = 'http://localhost:4000/api/users/';

  userRoles: string[] = [];

  constructor(private http: HttpClient) { 

  }
  
  checkEmailExists(email: string): Observable<boolean> {
    return this.http.get<any>(`${this.url}check-email/${email}`).pipe(
      map((response: any) => {
        return response.exists;
      })
    );
  }

}
