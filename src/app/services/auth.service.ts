import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { observable, Subscription } from 'rxjs';
import { map, subscribeOn } from 'rxjs/operators';
import { AppState } from '../app.reducer';
import { Usuario } from '../models/user.model';
import * as actions from '../auth/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userSubcription: Subscription;
  constructor(private auth: AngularFireAuth, private firestore: AngularFirestore,
    private store: Store<AppState>) { }

  initAuthListener(){
    this.auth.authState.subscribe(fuser=>{
      if (fuser) {
      this.userSubcription = this.firestore.doc(`${fuser.uid}/usuario`).valueChanges()
        .subscribe((fbuser: any) => {
          const user = Usuario.getparse(fbuser);
          this.store.dispatch(actions.setUser({ user }));
        });
      } else {
        this.userSubcription.unsubscribe();
        this.store.dispatch(actions.unsetUser());
      }
    })
  }

  crearUsuario(nombre: string, email: string, password: string){

   return this.auth.createUserWithEmailAndPassword(email, password).then(({user})=>{
     const newUser = new Usuario(user.uid, nombre, user.email);
   return this.firestore.doc(`${user.uid}/usuario`)
      .set({...newUser})
   })

  }
  loginUsuario(email: string, password: string){
    return this.auth.signInWithEmailAndPassword(email, password);
   }
   logout(){
     return this.auth.signOut();
   }

   isAuth(){
     return this.auth.authState.pipe(
       map(fuser => fuser != null)
     )
   }
}
