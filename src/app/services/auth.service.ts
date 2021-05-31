import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Usuario } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth, private firestore: AngularFirestore) { }

  initAuthListener(){
    this.auth.authState.subscribe(fuser=>{
      console.log("fuser", fuser);
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