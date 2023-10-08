import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Login } from '../interfaces/login.interface';
import { Registro } from '../interfaces/registro.interface';
import { Usuarios } from '../models/usuarios.model';

const url = environment.url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public usuario!: Usuarios;

  constructor(private http: HttpClient ) { }

  get token(): string {
    return localStorage.getItem('token') || ''
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  get uid(): string {
    return this.usuario.uid || '';
  }

  almacenarLocalStorage(token: string, menu: any) {
    localStorage.setItem('token', token);
    localStorage.setItem('menu', JSON.stringify(menu))
  }

  crearUsuario( data: Registro) {
    return this.http.post(`${url}/usuarios`, data)
    .pipe(
      tap( (resp: any ) => {
        this.almacenarLocalStorage(resp.token, resp.menu);
      })
    );
  }

  login( data: Login) {
    return this.http.post(`${url}/login/`, data)
    .pipe(
      tap( (resp: any ) => {
        this.almacenarLocalStorage(resp.token, resp.menu);
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
  }

  renovarToken(): Observable<boolean> {
    return this.http.get(`${url}/login/renovartoken`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      map( (resp: any) => {

        const { nombre, email, curp, telefono, password, password2, role, uid } = resp.usuario;
        
        this.almacenarLocalStorage( resp.token, resp.menu );

        this.usuario = new Usuarios(nombre, email, curp, telefono, '', '', role, uid);

        console.log(this.usuario);
        return true
      }),
      catchError( error => of(false))
    )
  }

  actualizarPerfil( data: { email: string, nombre: string, curp: string, telefono: string, role: any } ) {
    
    data = {
      ...data,
      role: this.usuario.role
    }

    return this.http.put( `${url}/usuarios/${this.uid}`, data, this.headers );
  }

}
