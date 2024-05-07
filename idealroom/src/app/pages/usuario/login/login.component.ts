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

  redirectBasedOnRole(userRoles: string[]): void {
    if (userRoles && userRoles.length > 0) {
      if (userRoles.includes(UserRoles.ADMIN)) {
        this.router.navigate(['/dashboard']); 
      } else if (userRoles.includes(UserRoles.ARRENDADOR)) {
        this.router.navigate(['/crear-cuarto']); 
      } else if (userRoles.includes(UserRoles.ESTUDIANTE)) {
        this.router.navigate(['/listar-cuartos']); 
      } else {
        this.router.navigate(['/']); 
      }
    } else {
      console.error('User roles not found');
      this.router.navigate(['/']); 
    }
  }

  
}