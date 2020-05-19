import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Observable} from 'rxjs';
import * as firebase from 'firebase';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: Observable<firebase.User>;

  constructor(private fireAuth: AngularFireAuth, private router: Router) {
    this.userData = fireAuth.authState;
  }

  SignUp(email: string, password: string) {
    this.fireAuth
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        localStorage.setItem('uid', JSON.stringify(res.user.uid));
        console.log('Successfully signed up!', res);
      })
      .catch(err => {
        console.log('Something is wrong:', err.message);
      });
  }

  facebookSignIn() {
    return new Promise<any>((resolve, reject) => {
      const provider = new firebase.auth.FacebookAuthProvider();
      this.fireAuth
        .signInWithPopup(provider)
        .then(res => {
          localStorage.setItem('uid', JSON.stringify(res.user.uid));
          resolve(res);
        }, err => {
          console.log(err);
          reject(err);
        });
    });
  }

  googleSignIn() {
    return new Promise<any>((resolve, reject) => {
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      this.fireAuth
        .signInWithPopup(provider)
        .then(res => {
          localStorage.setItem('uid', JSON.stringify(res.user.uid));
          resolve(res);
        });
    });
  }


  SignIn(email: string, password: string) {
    this.fireAuth
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        localStorage.setItem('uid', JSON.stringify(res.user.uid));
        console.log('Successfully signed in!', res);
      })
      .catch(err => {
        console.log('Something is wrong:', err.message);
      });
  }

  SignOut() {
    this.fireAuth.signOut().then(() => {
      localStorage.removeItem('uid');
      this.router.navigateByUrl('/login')
        .then(r => console.log('logged out', r));
    });
  }

}
