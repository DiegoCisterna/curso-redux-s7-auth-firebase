import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { isLoading, stopLoading } from '../../shared/ui.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit, OnDestroy {
registroForm: FormGroup;
cargando: boolean = false;
uiSubscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private _authService: AuthService,
    private _router: Router,
    private store: Store<AppState>
    ) { }

  ngOnInit(): void {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.uiSubscription = this.store.select('ui').subscribe(ui=>{
        this.cargando = ui.isLoading
    });
  }

  ngOnDestroy(): void{
    this.uiSubscription.unsubscribe();
  }

  crearUsuario() {
    this.store.dispatch(isLoading())
    if (this.registroForm.invalid) return;
    const { nombre, correo, password } = this.registroForm.value;
    // Swal.fire({     solo fines educativos
    //   title: 'Espere por favor',
    //   didOpen: () => {
    //     Swal.showLoading()
    //   },
    // })
    this._authService.crearUsuario(nombre, correo, password).then(data => {
     this.store.dispatch(stopLoading());
      this._router.navigate(['/']);

      // Swal.close();
    }).catch(e => {
      this.store.dispatch(stopLoading());
      Swal.fire({
        title: 'Error!',
        text: 'Ha ocurrido un error al registrar',
        icon: 'error',
        confirmButtonText: 'ok'
      })
    })
  }

}
