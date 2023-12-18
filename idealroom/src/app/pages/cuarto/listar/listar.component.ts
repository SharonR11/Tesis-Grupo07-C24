import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { DataLoginService } from '../../../services/data-login.service';
import { Router } from '@angular/router';
import { CuartoService } from '../../../services/cuarto.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrl: './listar.component.css'
})
export class ListarComponent implements OnInit {

  cuartos: any[] = [];
  cuartoForm!: FormGroup;
  // userName: string | null = '';
  currentUser: string | null = null;
  userId: string | null = null;
  serviciosMap: { [key: string]: string } = {
    '657653ecef0d36869ea98421': 'Agua',
    '657653ecef0d36869ea98422': 'Luz',
    '657653ecef0d36869ea98423': 'Internet'
  };
  constructor(
    private cuartoService: CuartoService,
    private dataLoginService: DataLoginService, 
    private router: Router) { }

  ngOnInit(): void {
    this.fetchCuartos();
    this.currentUser = this.dataLoginService.getUserName();
    this.userId = this.dataLoginService.getUserId();
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
    this.dataLoginService.logout().subscribe({
      next: (data) => {
        // Limpiar el localStorage y redirigir a la página de inicio de sesión u otra página relevante
        this.dataLoginService.clearLocalStorage();
        this.router.navigate(['/login']); // Redirigir a la página de inicio de sesión después del cierre de sesión
      },
      error: (error) => {
        console.error('Error al cerrar sesión:', error);
      }
    });
  }
  getUserName(): string {
    const userName = this.dataLoginService.getUserName();
    return userName ? userName : ''; // Si userName es null, devuelve una cadena vacía
  }

  
}
