import { Component, OnInit, } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { DataLoginService } from '../../../services/data-login.service';

@Component({
  selector: 'app-create-arrendador',
  templateUrl: './create-arrendador.component.html',
  styleUrl: './create-arrendador.component.css'
})
export class CreateArrendadorComponent implements OnInit{
  arrendadorForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private dataLoginService: DataLoginService
  ) {}
  

 ngOnInit(): void {
    // Inicializar el FormGroup y definir validadores para los campos
    this.arrendadorForm = this.formBuilder.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dni: ['', Validators.required],
      celular: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', [Validators.required, this.confirmPasswordValidator.bind(this)]]
    });
  }
  confirmPasswordValidator(control: FormControl): { [s: string]: boolean } | null {
    if (control.value !== this.arrendadorForm?.get('password')?.value) {
      return { 'incorrect': true };
    }
    return null;
  }
  
  registrarUsuario() {
    if (this.arrendadorForm.valid) {
      // Solo si el formulario es válido, procede con el registro
      const userData = {
        ...this.arrendadorForm.value,
        roles: ['arrendador', 'user'] // Definir los roles aquí
      };
      // Realiza la llamada al servicio para registrar al usuario
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
  }
  
}