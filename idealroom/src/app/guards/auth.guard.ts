import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { DataLoginService } from './../services/data-login.service';
import { Observable,of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private dataLoginService: DataLoginService,
     private router: Router) {}
  

  // canActivate(): Observable<boolean> {
  //   return this.dataLoginService.isLoggedIn().pipe(
  //     map((loggedIn: boolean) => {
  //       if (!loggedIn) {
  //         this.router.navigate(['/login']);
  //         return false;
  //       }
  //       return true;
  //     })
  //   );
  // }

  canActivate(): Observable<boolean> {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      return of(false);
    }
  
    return this.dataLoginService.validateToken(token).pipe(
      map((isValid: boolean) => {
        if (!isValid) {
          this.router.navigate(['/login']);
          return false;
        }
        return true;
      })
    );
  }
  
}
