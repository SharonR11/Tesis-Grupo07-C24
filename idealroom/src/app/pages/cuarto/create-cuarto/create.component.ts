import { Component, OnInit, } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl,FormArray } from '@angular/forms';

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
    private formBuilder: FormBuilder,
    private cuartoService: CuartoService,
    private dataLoginService: DataLoginService, 
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.fetchCuartos();
    this.currentUser = this.dataLoginService.getUserName();
    this.userId = this.dataLoginService.getUserId();
  }


  initForm(): void {
    this.cuartoForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      precio: ['', Validators.required],
      descripcion: ['', Validators.required],
      direccion: ['', Validators.required],
      // foto: ['', Validators.required], // Adjust validators as needed
      fotos: this.formBuilder.array([]),
      latitud: ['', Validators.required], // Add validators as needed
      longitud: ['', Validators.required],
      disponibilidad: [false],
      servicios: ['']
    });
  }
  get fotosFormArray() {
    return this.cuartoForm.get('fotos') as FormArray | null;
  }
  
  registrarCuarto(): void {
    try{
      if (this.cuartoForm.valid) {
        const formValue = this.cuartoForm.value;
  
  
      const cuartoData = {
        nombre: formValue.nombre,
        precio: formValue.precio,
        descripcion: formValue.descripcion,
        direccion: formValue.direccion,
        fotos: formValue.fotos,//kk
        latitud: formValue.latitud,
        longitud: formValue.longitud,
        disponibilidad: formValue.disponibilidad,
        // servicios: formValue.servicios
        servicios: Array.isArray(formValue.servicios) 
        ? formValue.servicios.join(', ') : formValue.servicios
      };
      this.cuartoService.createCuarto(cuartoData).subscribe(
        response => {
          console.log('Cuarto registrado:', response);
          this.fetchCuartos();
        },
        error => {
          console.error('Error al registrar cuarto:', error);
          if (error.status === 500) {
            console.error('Error interno del servidor');
          } else {
            console.error('Error desconocido:', error);
          }
        }
      );
      } else {
        // El formulario es inválido, muestra un mensaje al usuario o realiza alguna acción
        console.error('El formulario es inválido. Verifica los campos obligatorios.');
      }
    }catch(error){
      console.error('Error al registrar cuarto:', error);
    }
  }

  addFoto(): void {
    const control = this.cuartoForm.controls['fotos'] as FormArray;
    control.push(this.formBuilder.control(''));
  }
  
  removeFoto(index: number): void {
    const control = this.cuartoForm.controls['fotos'] as FormArray;
    control.removeAt(index);
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


  getUserName(): string {
    const userName = this.dataLoginService.getUserName();
    return userName ? userName : ''; // Si userName es null, devuelve una cadena vacía
  }
}
