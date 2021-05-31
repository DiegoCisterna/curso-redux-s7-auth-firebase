import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {
registroForm: FormGroup;
  constructor(private fb: FormBuilder, private _authService: AuthService, private _router: Router) { }

  ngOnInit() {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    })
  }

  crearUsuario() {
    if (this.registroForm.invalid) return;
    const { nombre, correo, password } = this.registroForm.value;
    Swal.fire({
      title: 'Espere por favor',
      didOpen: () => {
        Swal.showLoading()
      },
    })
    this._authService.crearUsuario(nombre, correo, password).then(data => {
      this._router.navigate(['/']);
      Swal.close();
    }).catch(e => {
      Swal.fire({
        title: 'Error!',
        text: 'Ha ocurrido un error al registrar',
        icon: 'error',
        confirmButtonText: 'ok'
      })
    })
  }

}
