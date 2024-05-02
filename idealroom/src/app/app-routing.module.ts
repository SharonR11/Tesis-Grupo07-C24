import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {InicioComponent} from './pages/inicio/inicio.component'
import { CreateCuartoComponent } from './pages/cuarto/create-cuarto/create.component';
// import { EditarProductosComponent } from './pages/productos/editar-productos/editar-productos.component';
import { ListarComponent } from './pages/cuarto/listar/listar.component';
import { CreateArrendadorComponent } from './pages/usuario/create-arrendador/create-arrendador.component';
import { CreateAlumnoComponent } from './pages/usuario/create-alumno/create-alumno.component';
import { LoginComponent } from './pages/usuario/login/login.component';
import { AuthGuard } from './../app/guards/auth.guard';
import { AlumnoAuthGuard } from './../app/guards/alumno.auth.guard';
import { DetalleComponent } from './pages/cuarto/detalle/detalle.component';
import {MenuEstudianteComponent} from './pages/menu/menu-estudiante/menu-estudiante.component'
const routesInicio: Routes = [
    // { path: '', component: LoginComponent },
  
  { path: '', component: InicioComponent },
  { path: 'crear-arrendador', component: CreateArrendadorComponent },
  { path: 'crear-alumno', component: CreateAlumnoComponent},
  { path: 'detalle/:id', component: DetalleComponent},
  { path: 'login', component: LoginComponent },
  { path: 'menu-estudiante', component: MenuEstudianteComponent },
  // { path: 'listar-cuartos', component: ListarComponent},
  {
    path: 'listar-cuartos',
    component: ListarComponent // Usa el guardia para proteger esta ruta
  },
  { path: 'crear-cuarto', component: CreateCuartoComponent},

  { path: '**', redirectTo: '', pathMatch: 'full'}
];



@NgModule({
  imports: [RouterModule.forRoot(routesInicio)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
