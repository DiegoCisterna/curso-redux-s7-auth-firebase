import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup

  constructor(private fb: FormBuilder, private auth: AngularFireAuth, private _authService: AuthService, private _router: Router) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
       email:['', [Validators.required,Validators.email]],
       password:['', [Validators.required]]
    })
  }

  login(): void{
    console.log(this.loginForm);
    if (this.loginForm.invalid) return;

    const {email, password } = this.loginForm.value;
    this._authService.loginUsuario(email, password).then(data => {
      console.log(data);
      this._router.navigate(['/'])
    }).catch(e => {
      Swal.fire({
        title: 'Error!',
        text: 'Ha ocurrido un error al autenticar',
        icon: 'error',
        confirmButtonText: 'ok'
      })
    })
  }
}
