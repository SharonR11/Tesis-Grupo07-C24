import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { CreateArrendadorComponent } from './pages/usuario/create-arrendador/create-arrendador.component';
import { CreateAlumnoComponent } from './pages/usuario/create-alumno/create-alumno.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/usuario/login/login.component';
import { CreateCuartoComponent } from './pages/cuarto/create-cuarto/create.component';
import { ListarComponent } from './pages/cuarto/listar/listar.component';
// import { CrearProductosComponent } from './pages/productos/crear-productos/crear-productos.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
// import { EditarProductosComponent } from './pages/productos/editar-productos/editar-productos.component';
// import { TiendasComponent } from './pages/tiendas/tiendas.component';
// import { GoogleMapsModule } from '@angular/google-maps';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CreateCuartoComponent,
    ListarComponent,
    CreateArrendadorComponent,
    CreateAlumnoComponent
    // CrearProductosComponent,
    // NavbarComponent,
    // EditarProductosComponent,
    // TiendasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    
    // GoogleMapsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
