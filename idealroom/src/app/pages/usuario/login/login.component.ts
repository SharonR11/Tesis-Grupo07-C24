import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { Usuario } from 'src/app/models/users';
import { DataLoginService } from '../../../services/data-login.service';
//import { DataLoginService } from 'src/app/services/data-login.service';
//import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private dataLoginService: DataLoginService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  

  ngOnInit(): void {
  }

  // loginUser(): void {
  //   if (this.loginForm.valid) {
  //     const userData = this.loginForm.value;
  //     this.dataLoginService.signin(userData).subscribe(
  //       (response) => {
  //         console.log('Login successful:', response);
  //         this.router.navigate(['/listar-cuartos']);
  //       },
  //       (error) => {
  //         console.error('Login error:', error);
  //         // Manejar errores o mostrar mensajes al usuario
  //       }
  //     );
  //   }
  // }
 
  loginUser(): void {
    if (this.loginForm.valid) {
      const userData = this.loginForm.value;
      this.dataLoginService.signin(userData).subscribe(
        (response) => {
          console.log('Login successful:', response);
          
          // Verificar los roles obtenidos del servicio DataLoginService
          const userRoles = this.dataLoginService.getUserRoles();

          if (userRoles.includes('admin')) {
            this.router.navigate(['/listar-cuartos']); // Ruta para el rol de admin
          } else if (userRoles.includes('arrendador')) {
            this.router.navigate(['/crear-cuarto']); // Ruta para el rol de arrendador
          } else if (userRoles.includes('alumno')) {
            this.router.navigate(['/listar-cuartos']); // Ruta para el rol de alumno
          } else {
            // En caso de que el usuario no tenga un rol específico, redirigir a una página de error o a la página principal
            this.router.navigate(['/']); // Ruta por defecto
          }
        },
        (error) => {
          console.error('Login error:', error);
          // Manejar errores o mostrar mensajes al usuario
        }
      );
    }}
}