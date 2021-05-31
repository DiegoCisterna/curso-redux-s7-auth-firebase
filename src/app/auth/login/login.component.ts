import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2'
import { isLoading, stopLoading } from '../../shared/ui.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup
  cargando: boolean= false;
  uiSubscription: Subscription;
  constructor(
    private fb: FormBuilder,
    private auth: AngularFireAuth,
    private _authService: AuthService,
    private _router: Router,
    private store: Store<AppState>
    ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
       email:['', [Validators.required,Validators.email]],
       password:['', [Validators.required]]
    });

  this.uiSubscription = this.store.select('ui').subscribe(ui => {
      this.cargando = ui.isLoading;
      console.log(ui);
      
    })
  }
  ngOnDestroy(): void{
    this.uiSubscription.unsubscribe();
  }

  login(): void{
   this.store.dispatch(isLoading())
    if (this.loginForm.invalid) return;

    const {email, password } = this.loginForm.value;
    this._authService.loginUsuario(email, password).then(data => {
      console.log(data);
      this.store.dispatch(stopLoading())
      this._router.navigate(['/'])
    }).catch(e => {
      this.store.dispatch(stopLoading());
      Swal.fire({
        title: 'Error!',
        text: 'Ha ocurrido un error al autenticar',
        icon: 'error',
        confirmButtonText: 'ok'
      })
    })
  }
}
