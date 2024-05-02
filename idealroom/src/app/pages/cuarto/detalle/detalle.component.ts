import { Component,OnInit  } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { DataLoginService } from '../../../services/data-login.service';
import { Router,ActivatedRoute  } from '@angular/router';
import { CuartoService } from '../../../services/cuarto.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrl: './detalle.component.css'
})
export class DetalleComponent implements OnInit {
  cuarto: any;

  constructor(
    private route: ActivatedRoute,
    private cuartoService: CuartoService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.cuartoService.getCuartoPorId(id).subscribe(cuarto => {
        this.cuarto = cuarto;
      });
    } else {
      console.error('ID del cuarto no encontrado en la URL');
    }
  }
}
