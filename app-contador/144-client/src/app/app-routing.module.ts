import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { PagesRoutingModule } from './pages/pages.routing';
import { RegistroComponent } from './pages/registro/registro.component';

const routes: Routes = [
  { path:'login', component:LoginComponent },
  { path:'registro', component:RegistroComponent },
  { path:'', redirectTo:'/login', pathMatch:'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    PagesRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
