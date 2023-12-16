import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataLoginService } from '../../../services/data-login.service';

@Component({
  selector: 'app-create-arrendador',
  templateUrl: './create-arrendador.component.html',
  styleUrl: './create-arrendador.component.css'
})
export class CreateArrendadorComponent implements OnInit{



  ngOnInit(): void {
  }
}
