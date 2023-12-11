import { Component, OnInit } from '@angular/core';
import { DataLoginService } from '../../../services/data-login.service';
import { Router } from '@angular/router';
import { CuartoService } from '../../../services/cuarto.service';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateCuartoComponent implements OnInit {

  cuartos: any[] = [];
  constructor(
    private cuartoService: CuartoService,
    private dataLoginService: DataLoginService, 
    private router: Router) { }

  ngOnInit(): void {
    this.fetchCuartos();
  }
  fetchCuartos(): void {
    this.cuartoService.getCuartos().subscribe({
      next: (data) => {
        this.cuartos = data;
        console.log('Cuartos:', this.cuartos);
      },
      error: (error) => {
        console.error('Error al obtener los cuartos:', error);
      }
    });
    
  }

  logout(): void {
    this.dataLoginService.logout().subscribe(
      () => {
        console.log('Logout successful');
        // Redireccionar a la página de inicio después del logout
        this.router.navigate(['/']);
      },
      (error) => {
        console.error('Logout error:', error);
        // Manejar errores o mostrar mensajes al usuario
      }
    );
  }


}
