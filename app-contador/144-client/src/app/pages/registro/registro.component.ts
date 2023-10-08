import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: [
  ]
})
export class RegistroComponent implements OnInit {

  public registroForm = this.fb.group({
    nombre: [ '123', [Validators.required] ],
    email: [ '123@gmail.com', [Validators.required, Validators.email] ],
    password: [ '123', [Validators.required] ],
    password2: [ '123', [Validators.required] ]
  },{
    validators: this.passwordsIguales('password', 'password2')
  })

  formSubmit: boolean = false;

  constructor(private fb:FormBuilder, private usuarioService: UsuarioService, private router: Router) { }

  ngOnInit(): void {
  }

  crearUsuario() {
    this.formSubmit = true;

    if(this.registroForm.invalid) {
      return;
    }
    
    console.log(this.registroForm.value);
    this.usuarioService.crearUsuario(this.registroForm.value)
    .subscribe( resp => {
      Swal.fire( {
        icon: 'success',
        title: 'Registrado',
        text: 'Ahora puede iniciar sesion',
        timer: 2000
      })
      
      this.router.navigateByUrl('/login');
      
    }, err => {
      Swal.fire( {
        icon: 'error',
        title: 'Error',
        text: err.error.msg,
        timer: 3000
      })
    })
  }

  campoNoValido( campo: string ): boolean {
    if( this.registroForm.get(campo)?.invalid && this.formSubmit ) {
      return true;
    } else {
      return false;
    }
  }

  contrasenasNoValidas() {
    const pass1 = this.registroForm.get('password')?.value;
    const pass2 = this.registroForm.get('password2')?.value;

    if( pass1 !== pass2 && this.formSubmit ) {
      return true;
    } else {
      return false;
    }
  }

  passwordsIguales( dataPass1:string, dataPass2:string ) {
    return ( formGroup: FormGroup ) => {
      const pass1Control = formGroup.get(dataPass1);
      const pass2Control = formGroup.get(dataPass2);

      if( pass1Control?.value === pass2Control?.value ) {
        pass2Control?.setErrors(null);
      } else {
        pass2Control?.setErrors( { noEsIgual: true })
      }
    }
  }
}
