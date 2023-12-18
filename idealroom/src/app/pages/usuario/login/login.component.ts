import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataLoginService } from '../../../services/data-login.service';
import { UserRoles } from '../../../models/user-roles-enum';
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
    // Verificar si el usuario ya está autenticado
    // this.checkUserAuthentication();
  }

  loginUser(): void {
    if (this.loginForm.valid) {
      const userData = this.loginForm.value;
      this.dataLoginService.signin(userData).subscribe({
        next: (response) => {
          if (response && response.token) {
            const userId = response.user.id;
            // Almacenar roles en el servicio después del inicio de sesión
            this.dataLoginService.setUserRoles(response.user.roles);
            this.redirectBasedOnRole(response.user.roles);
          }
        },
        error: (error) => {
          console.error('Error during login:', error);
          // Manejar el error o mostrar un mensaje al usuario
        }
      });
    }
  }
  // checkUserAuthentication(): void {
  //   if (this.dataLoginService.getToken()) {
  //     // Si ya tiene un token, redirigir al dashboard o a otra ruta
  //     this.redirectBasedOnRole(); // Cambia '/dashboard' por la ruta que necesites
  //   }
  // }
  redirectBasedOnRole(userRoles: string[]): void {
    if (userRoles && userRoles.length > 0) {
      if (userRoles.includes(UserRoles.Admin)) {
        this.router.navigate(['/dashboard']); // Redirigir al dashboard si es admin
      } else if (userRoles.includes(UserRoles.Arrendador)) {
        this.router.navigate(['/crear-cuarto']); // Redirigir a la creación de cuartos
      } else if (userRoles.includes(UserRoles.Alumno)) {
        this.router.navigate(['/listar-cuartos']); // Redirigir a la lista de cuartos si es alumno
      } else {
        this.router.navigate(['/']); // Redirigir a una ruta por defecto si no tiene un rol válido
      }
    } else {
      console.error('User roles not found');
      this.router.navigate(['/']); // Redirigir a una ruta por defecto si los roles no se obtienen correctamente
    }
  }

  // redirectBasedOnRole(): void {
  //   const userRoles = this.dataLoginService.getUserRoles();
  //   const isAuthenticated = this.dataLoginService.getToken(); // Verifica si el usuario está autenticado
  //   console.log('User Roles:', userRoles); // Agregar esta línea para verificar los roles obtenidos
  
  //   if (isAuthenticated) {
  //     if (userRoles && userRoles.length > 0) {
  //       if (userRoles.includes(UserRoles.Admin)) {
  //         this.router.navigate(['/dashboard']); // Redirigir al dashboard si es admin
  //       } else if (userRoles.includes(UserRoles.Arrendador)) {
  //         this.router.navigate(['/crear-cuarto']); // Redirigir a la creación de cuartos
  //       } else if (userRoles.includes(UserRoles.Alumno)) {
  //         this.router.navigate(['/listar-cuartos']); // Redirigir a la lista de cuartos solo si es alumno
  //       } else {
  //         this.router.navigate(['/']); // Redirigir a una ruta por defecto si no tiene un rol válido
  //       }
  //     } else {
  //       console.error('User roles not found'); // Mostrar un mensaje si los roles no se encuentran
  //       // Redirigir a una ruta por defecto si los roles no se obtienen correctamente
  //       this.router.navigate(['/']);
  //     }
  //   } else {
  //     this.router.navigate(['/']); // Si no está autenticado, redirigir a una ruta por defecto
  //   }
  // }
  
  
 
  // loginUser(): void {
  //   if (this.loginForm.valid) {
  //     const userData = this.loginForm.value;
  //     this.dataLoginService.signin(userData).subscribe(
  //       (response) => {
  //         console.log('Login successful:', response);
          
  //         // Verificar los roles obtenidos del servicio DataLoginService
  //         const userRoles = this.dataLoginService.getUserRoles();

  //         if (userRoles.includes('admin')) {
  //           this.router.navigate(['/dashboard']); // Ruta para el rol de admin
  //         } else if (userRoles.includes('arrendador')) {
  //           this.router.navigate(['/crear-cuarto']); // Ruta para el rol de arrendador
  //         } else if (userRoles.includes('alumno')) {
  //           this.router.navigate(['/listar-cuartos']); // Ruta para el rol de alumno
  //         } else {
  //           // En caso de que el usuario no tenga un rol específico, redirigir a una página de error o a la página principal
  //           this.router.navigate(['/']); // Ruta por defecto
  //         }
  //       },
  //       (error) => {
  //         console.error('Login error:', error);
  //         // Manejar errores o mostrar mensajes al usuario
  //       }
  //     );
  //   }
  // }
}