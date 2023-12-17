import { Component, OnInit, } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { DataLoginService } from '../../../services/data-login.service';
import { UserService } from '../../../services/user.service';
@Component({
  selector: 'app-create-alumno',
  templateUrl: './create-alumno.component.html',
  styleUrl: './create-alumno.component.css'
})
export class CreateAlumnoComponent implements OnInit{
  alumnoForm!: FormGroup;
  emailExists = false;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private dataLoginService: DataLoginService,
    private userService: UserService
  ) {}
  

 ngOnInit(): void {
    // Inicializar el FormGroup y definir validadores para los campos
    this.alumnoForm = this.formBuilder.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      username: ['', Validators.required],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern(/^[a-zA-Z0-9._%+-]+@tecsup\.edu\.pe$/)
        ]
      ],
      celular: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', [Validators.required, this.confirmPasswordValidator.bind(this)]]
    });
  }
  confirmPasswordValidator(control: FormControl): { [s: string]: boolean } | null {
    if (control.value !== this.alumnoForm?.get('password')?.value) {
      return { 'incorrect': true };
    }
    return null;
  }
  
  registrarUsuario() {
    if (this.alumnoForm.valid) {
      const email = this.alumnoForm.get('email')?.value;
  
      // Verifica si el correo ya está registrado
      this.userService.checkEmailExists(email).subscribe(
        (emailExists) => {
          if (emailExists) {
            this.emailExists = true; // Establece la variable a true si el correo ya está registrado
          } else {
            const userData = {
              ...this.alumnoForm.value,
              roles: ['alumno', 'user']
            };
            // Continúa con el registro si el correo no está en uso
            this.dataLoginService.signup(userData).subscribe(
              (response) => {
                console.log('Usuario registrado:', response);
                this.router.navigate(['/login']);
              },
              (error) => {
                console.error('Error al registrar usuario:', error);
              }
            );
          }
        },
        (error) => {
          console.error('Error al verificar el correo electrónico:', error);
        }
      );
    }
  }
  
  
}