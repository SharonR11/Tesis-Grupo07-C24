import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataLoginService } from '../../../services/data-login.service';

@Component({
  selector: 'app-create-alumno',
  standalone: true,
  imports: [],
  templateUrl: './create-alumno.component.html',
  styleUrl: './create-alumno.component.css'
})
export class CreateAlumnoComponent implements OnInit{



  ngOnInit(): void {
  }
}