import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: Observable<firebase.User>;

  constructor(private fireAuth: AngularFireAuth) {
    this.userData = fireAuth.authState;
  }

  SignUp(email: string, password: string) {
    this.fireAuth
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        console.log('Successfully signed up!', res);
      })
      .catch(err => {
        console.log('Something is wrong:', err.message);
      });
  }

  SignIn(email: string, password: string) {
    this.fireAuth
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        console.log('Successfully signed in!', res);
      })
      .catch(err => {
        console.log('Something is wrong:', err.message);
      });
  }

  SignOut() {
    this.fireAuth
      .signOut().then(res => console.log('Signed out', res));
  }

}
