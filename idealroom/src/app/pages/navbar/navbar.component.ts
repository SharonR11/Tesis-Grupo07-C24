import { Component,OnInit } from '@angular/core';
import { DataLoginService } from '../../services/data-login.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  currentUser: string | null = null;
  userId: string | null = null;
  constructor(
    private dataLoginService: DataLoginService, 
    private router: Router
    ) { }

  ngOnInit(): void {
    this.currentUser = this.dataLoginService.getUserName();
    this.userId = this.dataLoginService.getUserId();
  }
  logout(): void {
    this.dataLoginService.logout().subscribe({
      next: (data) => {
        // Limpiar el localStorage y redirigir a la página de inicio de sesión u otra página relevante
        this.dataLoginService.clearLocalStorage();
        this.router.navigate(['/']); // Redirigir a la página de inicio de sesión después del cierre de sesión
      },
      error: (error) => {
        console.error('Error al cerrar sesión:', error);
      }
    });
  }
}
