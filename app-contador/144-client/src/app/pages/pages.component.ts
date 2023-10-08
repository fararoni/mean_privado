import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuService } from '../services/menu.service';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  public usuario: any;
  public menu: any[] = [];

  /*menu: any[] = [
    {
      titulo: 'Mi Perfil',
      icono: 'mdi mdi-account-alert',
      url: '/dashboard/perfil'
    },
    {
      titulo: 'Usuarios',
      icono: 'mdi mdi-account-alert',
      url: '/dashboard/usuarios'
    },
    {
      titulo: 'Nuevo Documento',
      icono: 'mdi mdi-folder-lock-open',
      url: '/dashboard/nuevo-documento'
    },
    {
      titulo: 'Documentos Generales',
      icono: 'mdi mdi-folder-lock-open',
      url: '/dashboard/documentos'
    },
  ]*/

  constructor(private router:Router, private usuarioService: UsuarioService, public menuService: MenuService) {    
    this.usuario = usuarioService.usuario;
    console.log('Estoy desde pages compoenent', this.usuario);
  }

  ngOnInit() {
    this.menuService.cargarMenu();
  }

  logout() {
    this.usuarioService.logout();
    this.router.navigateByUrl('/login');
  }

}
