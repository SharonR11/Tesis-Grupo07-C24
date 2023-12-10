import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateCuartoComponent } from './pages/cuarto/create-cuarto/create.component';
// import { EditarProductosComponent } from './pages/productos/editar-productos/editar-productos.component';
import { ListarComponent } from './pages/cuarto/listar/listar.component';
import { CreateComponent } from './pages/usuario/create/create.component';
import { LoginComponent } from './pages/usuario/login/login.component';
// import { TiendasComponent } from './pages/tiendas/tiendas.component';

const routesInicio: Routes = [
   { path: '', component: LoginComponent },
//    { path: '', component: CreateComponent },
   { path: 'listar-cuartos', component: ListarComponent },
  { path: 'crear-cuarto', component: CreateCuartoComponent },
//   { path: 'editar-producto/:id', component: EditarProductosComponent },
//   { path: 'tiendas', component: TiendasComponent },
  { path: '**', redirectTo: '', pathMatch: 'full'}
];



@NgModule({
  imports: [RouterModule.forRoot(routesInicio)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
